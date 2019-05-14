package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisProductImporter;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductCategory;
import com.waters.aem.hybris.result.HybrisImporterResult;
import com.waters.aem.hybris.utils.HybrisImporterUtils;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component(service = HybrisProductImporter.class)
public final class DefaultHybrisProductImporter implements HybrisProductImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisProductImporter.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public List<HybrisImporterResult> importProducts(final List<Product> products) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Session session = resourceResolver.adaptTo(Session.class);
            final Node productsNode = session.getNode(HybrisImporterConstants.PATH_COMMERCE_PRODUCTS);

            final Map<String, List<Product>> groupedProducts = products
                .stream()
                .collect(Collectors.groupingBy(this :: getProductCodePrefix));

            for (final Map.Entry<String, List<Product>> entry : groupedProducts.entrySet()) {
                final String productCodePrefix = entry.getKey();
                final String productCodePrefixNodeName = HybrisImporterUtils.getValidJcrName(productCodePrefix);

                final Node productCodePrefixNode = JcrUtils.getOrAddNode(productsNode, productCodePrefixNodeName,
                    JcrResourceConstants.NT_SLING_FOLDER);

                LOG.info("importing products for code prefix = {}", productCodePrefix);

                results.addAll(importProductsForProductCodePrefix(productCodePrefixNode, entry.getValue()));
            }

            resourceResolver.commit();
        } catch (LoginException | IOException | RepositoryException e) {
            LOG.error("error importing hybris products", e);

            throw new HybrisImporterException(e);
        }

        return results;
    }

    private List<HybrisImporterResult> importProductsForProductCodePrefix(final Node productCodePrefixNode,
        final List<Product> products) throws RepositoryException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        for (final Product product : products) {
            final String productNodeName = HybrisImporterUtils.getValidJcrName(product.getCode());

            final Node productNode;
            final HybrisImportStatus status;

            if (productCodePrefixNode.hasNode(productNodeName)) {
                productNode = productCodePrefixNode.getNode(productNodeName);

                status = HybrisImportStatus.UPDATED;
            } else {
                productNode = productCodePrefixNode.addNode(productNodeName, JcrConstants.NT_UNSTRUCTURED);
                productNode.addMixin(JcrConstants.MIX_CREATED);

                status = HybrisImportStatus.CREATED;
            }

            updateProductProperties(productNode, product);

            results.add(HybrisImporterResult.fromProduct(productNode, status));
        }

        return results;
    }

    private void updateProductProperties(final Node productNode, final Product product) throws RepositoryException {
        productNode.setProperty(JcrConstants.JCR_TITLE, product.getName());
        productNode.setProperty(JcrConstants.JCR_DESCRIPTION, product.getDescription());
        productNode.setProperty("code", product.getCode());
        productNode.setProperty("summary", product.getSummary());
        productNode.setProperty("categories", product.getCategories()
            .stream()
            .map(ProductCategory :: getCode)
            .toArray(String[] :: new));
        productNode.setProperty("url", product.getUrl());
        productNode.setProperty("purchasable", product.getPurchasable());
        productNode.setProperty("terminated", product.getTerminated());
    }

    private String getProductCodePrefix(final Product product) {
        return product.getCode().substring(0, HybrisImporterConstants.PRODUCT_CODE_PREFIX_LENGTH);
    }
}
