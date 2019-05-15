package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Stopwatch;
import com.google.common.collect.ImmutableList;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisProductImporter;
import com.waters.aem.hybris.models.Classification;
import com.waters.aem.hybris.models.Image;
import com.waters.aem.hybris.models.Price;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductCategory;
import com.waters.aem.hybris.models.Promotion;
import com.waters.aem.hybris.models.Stock;
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
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component(service = HybrisProductImporter.class)
public final class DefaultHybrisProductImporter implements HybrisProductImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisProductImporter.class);

    private static final List<String> PRODUCT_NODE_NAMES = new ImmutableList.Builder<String>()
        .add(WatersCommerceConstants.RESOURCE_NAME_CLASSIFICATIONS)
        .add(WatersCommerceConstants.RESOURCE_NAME_PRICES)
        .add(WatersCommerceConstants.RESOURCE_NAME_PROMOTIONS)
        .add(WatersCommerceConstants.RESOURCE_NAME_IMAGES)
        .add(WatersCommerceConstants.RESOURCE_NAME_STOCK)
        .build();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public List<HybrisImporterResult> importProducts(final List<Product> products) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

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

                LOG.info("importing products for code prefix : {}", productCodePrefix);

                results.addAll(importProductsForProductCodePrefix(productCodePrefixNode, entry.getValue()));
            }

            resourceResolver.commit();

            LOG.info("imported {} products in {}ms", results.size(), stopwatch.elapsed(TimeUnit.MILLISECONDS));
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
        final Map<String, Object> properties = new HashMap<>();

        properties.put(JcrConstants.JCR_TITLE, product.getName());
        properties.put(JcrConstants.JCR_DESCRIPTION, product.getDescription());
        properties.put(WatersCommerceConstants.PROPERTY_CODE, product.getCode());
        properties.put(WatersCommerceConstants.PROPERTY_SUMMARY, product.getSummary());
        properties.put(WatersCommerceConstants.PROPERTY_CATEGORIES, product.getCategories()
            .stream()
            .map(ProductCategory :: getCode)
            .toArray(String[] :: new));
        properties.put(WatersCommerceConstants.PROPERTY_URL, product.getUrl());
        properties.put(WatersCommerceConstants.PROPERTY_PURCHASABLE, product.getPurchasable());
        properties.put(WatersCommerceConstants.PROPERTY_TERMINATED, product.getTerminated());
        properties.put(WatersCommerceConstants.PROPERTY_PROPRIETARY, product.getProprietary());
        properties.put(WatersCommerceConstants.PROPERTY_AVAILABLE_FOR_PICKUP, product.getAvailableForPickup());
        properties.put(WatersCommerceConstants.PROPERTY_BASE_PRODUCT, product.getBaseProduct());
        properties.put(WatersCommerceConstants.PROPERTY_MANUFACTURER, product.getManufacturer());
        properties.put(WatersCommerceConstants.PROPERTY_NUMBER_OF_REVIEWS, product.getNumberOfReviews());
        properties.put(WatersCommerceConstants.PROPERTY_SALES_STATUS, product.getSalesStatus());

        setNodeProperties(productNode, properties);

        // remove existing nodes to prevent stale data from persisting
        removeProductNodes(productNode);

        setStock(productNode, product.getStock());
        setPrices(productNode, product.getPrices());
        setClassifications(productNode, product.getClassifications());
        setImages(productNode, product.getImages());
        setPromotions(productNode, product.getPotentialPromotions());
    }

    private void setStock(final Node productNode, final Stock stock) throws RepositoryException {
        if (stock != null) {
            setNodeProperties(productNode, WatersCommerceConstants.RESOURCE_NAME_STOCK, getStockProperties(stock));
        }
    }

    private void setPrices(final Node productNode, final List<Price> prices) throws RepositoryException {
        if (!prices.isEmpty()) {
            final Node pricesNode = JcrUtils.getOrAddNode(productNode, WatersCommerceConstants.RESOURCE_NAME_PRICES);

            for (final Price price : prices) {
                for (final String country : price.getCountries().split(",")) {
                    final String priceNodeName = price.getCurrencyIso() + "-" + country;
                    final Node priceNode = JcrUtils.getOrAddNode(pricesNode, priceNodeName);

                    setNodeProperties(priceNode, getPriceProperties(price, country));
                }
            }
        }
    }

    private void setClassifications(final Node productNode, final List<Classification> classifications) {
        if (!classifications.isEmpty()) {

        }
    }

    private void setImages(final Node productNode, final List<Image> images) {
        if (!images.isEmpty()) {

        }
    }

    private void setPromotions(final Node productNode, final List<Promotion> promotions) {
        if (!promotions.isEmpty()) {

        }
    }

    private Map<String, Object> getStockProperties(final Stock stock) {
        final Map<String, Object> properties = new HashMap<>();

        properties.put(WatersCommerceConstants.PROPERTY_STOCK_LEVEL, stock.getStockLevel());
        properties.put(WatersCommerceConstants.PROPERTY_STOCK_LEVEL_STATUS, stock.getStockLevelStatus());

        return properties;
    }

    private Map<String, Object> getPriceProperties(final Price price, final String country) {
        final Map<String, Object> properties = new HashMap<>();

        properties.put(WatersCommerceConstants.PROPERTY_COUNTRY, country);
        properties.put(WatersCommerceConstants.PROPERTY_CURRENCY_ISO, price.getCurrencyIso());
        properties.put(WatersCommerceConstants.PROPERTY_FORMATTED_VALUE, price.getFormattedValue());
        properties.put(WatersCommerceConstants.PROPERTY_MAX_QUANTITY, price.getMaxQuantity());
        properties.put(WatersCommerceConstants.PROPERTY_MIN_QUANTITY, price.getMinQuantity());
        properties.put(WatersCommerceConstants.PROPERTY_PRICE_TYPE, price.getPriceType() == null ? null :
            price.getPriceType().name());
        properties.put(WatersCommerceConstants.PROPERTY_VALUE, price.getValue());

        return properties;
    }

    private void setNodeProperties(final Node node, final Map<String, Object> properties) throws RepositoryException {
        for (final Map.Entry<String, Object> entry : properties.entrySet()) {
            setProperty(node, entry.getKey(), entry.getValue());
        }
    }

    private void setNodeProperties(final Node parentNode, final String nodeName, final Map<String, Object> properties)
        throws RepositoryException {
        final Node node = JcrUtils.getOrAddNode(parentNode, nodeName);

        setNodeProperties(node, properties);
    }

    private void setProperty(final Node node, final String name, final Object value) throws RepositoryException {
        if (value != null) {
            if (value instanceof String[]) {
                node.setProperty(name, (String[]) value);
            } else if (value instanceof String) {
                node.setProperty(name, (String) value);
            } else if (value instanceof Calendar) {
                node.setProperty(name, (Calendar) value);
            } else if (value instanceof Integer) {
                node.setProperty(name, (Integer) value);
            } else if (value instanceof Boolean) {
                node.setProperty(name, (Boolean) value);
            } else if (value instanceof BigDecimal) {
                node.setProperty(name, (BigDecimal) value);
            }
        }
    }

    private void removeProductNodes(final Node productNode) throws RepositoryException {
        final NodeIterator nodes = productNode.getNodes();

        while (nodes.hasNext()) {
            final Node node = nodes.nextNode();

            if (PRODUCT_NODE_NAMES.contains(node.getName())) {
                node.remove();
            }
        }
    }

    private String getProductCodePrefix(final Product product) {
        return product.getCode().substring(0, HybrisImporterConstants.PRODUCT_CODE_PREFIX_LENGTH);
    }
}
