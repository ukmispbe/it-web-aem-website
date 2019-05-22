package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Stopwatch;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.utils.TextUtils;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisProductImporter;
import com.waters.aem.hybris.models.Image;
import com.waters.aem.hybris.models.Price;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductCategory;
import com.waters.aem.hybris.models.ProductList;
import com.waters.aem.hybris.models.ProductReference;
import com.waters.aem.hybris.models.ProductReferenceTarget;
import com.waters.aem.hybris.models.ProductReferenceType;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
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
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component(service = HybrisProductImporter.class)
public final class DefaultHybrisProductImporter implements HybrisProductImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisProductImporter.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private HybrisClient hybrisClient;

    @Override
    public List<HybrisImporterResult> importProducts(final Boolean force) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource productsResource = resourceResolver.getResource(
                WatersCommerceConstants.PATH_COMMERCE_PRODUCTS);

            final Node productsNode = productsResource.adaptTo(Node.class);

            final Calendar lastImportDate = productsResource.getValueMap().get(
                HybrisImporterConstants.PROPERTY_LAST_IMPORT_DATE, Calendar.class);
            final Calendar currentImportDate = Calendar.getInstance();

            results.addAll(importProductLists(resourceResolver, productsNode, lastImportDate, force));

            // set last import date
            if (!force) {
                productsResource.adaptTo(ModifiableValueMap.class)
                    .put(HybrisImporterConstants.PROPERTY_LAST_IMPORT_DATE, currentImportDate);
            }


            resourceResolver.commit();

            LOG.info("imported {} products in {}ms", results.size(), stopwatch.elapsed(TimeUnit.MILLISECONDS));
        } catch (LoginException | IOException | RepositoryException | URISyntaxException e) {
            LOG.error("error importing hybris products", e);

            throw new HybrisImporterException(e);
        }

        return results;
    }

    @Override
    public List<HybrisImporterResult> importProducts(final List<String> productCodes) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource productsResource = resourceResolver.getResource(
                WatersCommerceConstants.PATH_COMMERCE_PRODUCTS);

            final Node productsNode = productsResource.adaptTo(Node.class);

            for (final String productCode : productCodes) {
                final Product product = hybrisClient.getProduct(productCode);

                final String productCodePrefix = getProductCodePrefix(product);
                final Node productCodePrefixNode = getProductCodePrefixNode(productsNode, productCodePrefix);

                results.add(importProduct(productCodePrefixNode, product));
            }

            resourceResolver.commit();

            LOG.info("imported {} products in {}ms", results.size(), stopwatch.elapsed(TimeUnit.MILLISECONDS));
        } catch (LoginException | IOException | RepositoryException | URISyntaxException e) {
            LOG.error("error importing hybris products", e);

            throw new HybrisImporterException(e);
        }

        return results;
    }

    private List<HybrisImporterResult> importProductLists(final ResourceResolver resourceResolver,
        final Node productsNode, final Calendar lastImportDate, final Boolean force)
        throws IOException, URISyntaxException, RepositoryException {
        if (lastImportDate == null || force) {
            LOG.info("no last import date or force=true, importing all products...");
        } else {
            LOG.info("importing products updated after last import date : {}",
                new SimpleDateFormat(HybrisImporterConstants.DATE_FORMAT_PATTERN).format(lastImportDate.getTime()));
        }

        final List<HybrisImporterResult> results = new ArrayList<>();

        ProductList productList = hybrisClient.getProductList(0, lastImportDate);

        final int totalPages = productList.getTotalPageCount();

        int currentPage = 0;

        while (currentPage < totalPages) {
            results.addAll(importProductsForProductList(productsNode, productList));

            currentPage++;

            productList = hybrisClient.getProductList(currentPage, lastImportDate);

            // periodically commit changes
            if (currentPage % 10 == 0) {
                LOG.info("committing changes...");

                resourceResolver.commit();
            }
        }

        return results;
    }

    private List<HybrisImporterResult> importProductsForProductList(final Node productsNode,
        final ProductList productList) throws RepositoryException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final List<Product> products = productList.getProducts();

        LOG.info("importing {} products for page number {} of {}", products.size(), productList.getCurrentPage(),
            productList.getTotalPageCount());

        final Map<String, List<Product>> groupedProducts = products
            .stream()
            .collect(Collectors.groupingBy(this :: getProductCodePrefix));

        for (final Map.Entry<String, List<Product>> entry : groupedProducts.entrySet()) {
            final String productCodePrefix = entry.getKey();
            final Node productCodePrefixNode = getProductCodePrefixNode(productsNode, productCodePrefix);

            LOG.info("importing products for code prefix : {}", productCodePrefix);

            for (final Product product : products) {
                results.add(importProduct(productCodePrefixNode, product));
            }
        }

        return results;
    }

    private HybrisImporterResult importProduct(final Node productCodePrefixNode, final Product product)
        throws RepositoryException {
        final String productNodeName = TextUtils.getValidJcrName(product.getCode());

        final Node productNode;
        final HybrisImportStatus status;

        if (productCodePrefixNode.hasNode(productNodeName)) {
            productNode = productCodePrefixNode.getNode(productNodeName);

            LOG.debug("found existing product node : {}", productNode.getPath());

            // TODO determine if product is actually updated, or if status should be 'IGNORED'
            status = HybrisImportStatus.UPDATED;
        } else {
            productNode = productCodePrefixNode.addNode(productNodeName, JcrConstants.NT_UNSTRUCTURED);
            productNode.addMixin(JcrConstants.MIX_CREATED);

            LOG.info("created product node : {}", productNode.getPath());

            status = HybrisImportStatus.CREATED;
        }

        updateProductProperties(productNode, product);

        return HybrisImporterResult.fromProduct(productNode, product.getName(), status);
    }

    private void updateProductProperties(final Node productNode, final Product product) throws RepositoryException {
        final Map<String, Object> properties = new HashMap<>();

        // TODO account for translatable properties
        // set modification timestamp
        properties.put(JcrConstants.JCR_LASTMODIFIED, Calendar.getInstance());

        properties.put(WatersCommerceConstants.PROPERTY_CODE, product.getCode());
        properties.put(WatersCommerceConstants.PROPERTY_NAME, product.getName());
        properties.put(WatersCommerceConstants.PROPERTY_SHORT_DESCRIPTION, product.getDescription());
        properties.put(WatersCommerceConstants.PROPERTY_LONG_DESCRIPTION, product.getSummary());
        properties.put(WatersCommerceConstants.PROPERTY_CATEGORIES, product.getCategories()
            .stream()
            .map(ProductCategory :: getCode)
            .toArray(String[] :: new));
        properties.put(WatersCommerceConstants.PROPERTY_TERMINATED, product.getTerminated());
        properties.put(WatersCommerceConstants.PROPERTY_PROPRIETARY, product.getProprietary());
        properties.put(WatersCommerceConstants.PROPERTY_COLD_STORAGE, product.getColdStorage());
        properties.put(WatersCommerceConstants.PROPERTY_HAZARDOUS_HANDLING, product.getHazardousHandling());

        setNodeProperties(productNode, properties);

        // remove existing nodes to prevent stale data from persisting
        removeProductNodes(productNode);

        setPrices(productNode, product.getPrices());
        setImages(productNode, product.getImages());
        setProductReferences(productNode, product.getProductReferences());
    }

    private void setProductReferences(final Node productNode, final List<ProductReference> productReferences)
        throws RepositoryException {
        if (!productReferences.isEmpty()) {
            final Node productReferencesNode = JcrUtils.getOrAddNode(productNode,
                WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCES);

            // filter references for 'OTHERS' type
            final List<ProductReference> validProductReferences = productReferences
                .stream()
                .filter(productReference -> productReference.getReferenceType().equals(ProductReferenceType.OTHERS))
                .collect(Collectors.toList());

            setItemNodes(productReferencesNode, WatersCommerceConstants.RESOURCE_NAME_PRODUCT_REFERENCE,
                validProductReferences, productReference -> {
                    final Map<String, Object> properties = new HashMap<>();

                    properties.put(WatersCommerceConstants.PROPERTY_PRESELECTED, productReference.getPreselected());
                    properties.put(WatersCommerceConstants.PROPERTY_DESCRIPTION, productReference.getDescription());

                    final ProductReferenceTarget target = productReference.getTarget();

                    properties.put(WatersCommerceConstants.PROPERTY_CODE, target.getCode());
                    properties.put(WatersCommerceConstants.PROPERTY_PROPRIETARY, target.getProprietary());
                    properties.put(WatersCommerceConstants.PROPERTY_TERMINATED, target.getTerminated());

                    return properties;
                });
        }
    }

    private void setPrices(final Node productNode, final List<Price> prices) throws RepositoryException {
        if (!prices.isEmpty()) {
            final Node pricesNode = JcrUtils.getOrAddNode(productNode, WatersCommerceConstants.RESOURCE_NAME_PRICES);

            for (final Price price : prices) {
                for (final String country : price.getCountries().split(",")) {
                    final String priceNodeName = price.getCurrencyIso() + "-" + country;
                    final Node priceNode = JcrUtils.getOrAddNode(pricesNode, priceNodeName);

                    final Map<String, Object> properties = new HashMap<>();

                    properties.put(WatersCommerceConstants.PROPERTY_COUNTRY, country);
                    properties.put(WatersCommerceConstants.PROPERTY_CURRENCY_ISO, price.getCurrencyIso());
                    properties.put(WatersCommerceConstants.PROPERTY_FORMATTED_VALUE, price.getFormattedValue());
                    properties.put(WatersCommerceConstants.PROPERTY_MAX_QUANTITY, price.getMaxQuantity());
                    properties.put(WatersCommerceConstants.PROPERTY_MIN_QUANTITY, price.getMinQuantity());
                    properties.put(WatersCommerceConstants.PROPERTY_PRICE_TYPE, price.getPriceType() == null ? null :
                        price.getPriceType().name());
                    properties.put(WatersCommerceConstants.PROPERTY_VALUE, price.getValue());

                    setNodeProperties(priceNode, properties);
                }
            }
        }
    }

    private void setImages(final Node productNode, final List<Image> images) throws RepositoryException {
        if (!images.isEmpty()) {
            final Node imagesNode = JcrUtils.getOrAddNode(productNode, WatersCommerceConstants.RESOURCE_NAME_IMAGES);

            setItemNodes(imagesNode, WatersCommerceConstants.RESOURCE_NAME_IMAGE, images, image -> {
                final Map<String, Object> properties = new HashMap<>();

                properties.put(WatersCommerceConstants.PROPERTY_URL, image.getUrl());
                properties.put(WatersCommerceConstants.PROPERTY_ALT_TEXT, image.getAltText());
                properties.put(WatersCommerceConstants.PROPERTY_FORMAT, image.getFormat());
                properties.put(WatersCommerceConstants.PROPERTY_GALLERY_INDEX, image.getGalleryIndex());
                properties.put(WatersCommerceConstants.PROPERTY_IMAGE_TYPE, image.getImageType().name());

                return properties;
            });
        }
    }

    private <T> void setItemNodes(final Node parentNode, final String itemNodeNamePrefix, final List<T> items,
        final Function<T, Map<String, Object>> itemPropertiesFunction) throws RepositoryException {
        int count = 1;

        for (final T item : items) {
            final Node itemNode = JcrUtils.getOrAddNode(parentNode, itemNodeNamePrefix + count);

            final Map<String, Object> properties = itemPropertiesFunction.apply(item);

            setNodeProperties(itemNode, properties);

            count++;
        }
    }

    private void setNodeProperties(final Node node, final Map<String, Object> properties) throws RepositoryException {
        for (final Map.Entry<String, Object> entry : properties.entrySet()) {
            setProperty(node, entry.getKey(), entry.getValue());
        }
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
            nodes.nextNode().remove();
        }
    }

    private String getProductCodePrefix(final Product product) {
        return product.getCode().substring(0, WatersCommerceConstants.PRODUCT_CODE_PREFIX_LENGTH);
    }

    private Node getProductCodePrefixNode(final Node productsNode, final String productCodePrefix)
        throws RepositoryException {
        final String productCodePrefixNodeName = TextUtils.getValidJcrName(productCodePrefix);

        return JcrUtils.getOrAddNode(productsNode, productCodePrefixNodeName, JcrResourceConstants.NT_SLING_FOLDER);
    }
}
