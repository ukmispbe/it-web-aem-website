package com.waters.aem.core.commerce.services.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.Predicate;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.eval.JcrPropertyPredicateEvaluator;
import com.day.cq.search.eval.PathPredicateEvaluator;
import com.day.cq.search.result.Hit;
import com.day.cq.wcm.api.NameConstants;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.TextUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static com.day.cq.search.eval.TypePredicateEvaluator.TYPE;

@Component(service = SkuRepository.class)
public final class DefaultSkuRepository implements SkuRepository {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSkuRepository.class);

    @Reference
    private QueryBuilder queryBuilder;

    @Override
    public Sku getSku(final PageDecorator page) {
        return page.get(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, String.class)
            .transform(productResourcePath -> getSkuForProductResourcePath(
                page.getContentResource().getResourceResolver(), productResourcePath))
            .orNull();
    }

    @Override
    public Sku getSku(final ResourceResolver resourceResolver, final String productCode) {
        final String productResourcePath = getProductResourcePath(productCode);

        return getSkuForProductResourcePath(resourceResolver, productResourcePath);
    }

    @Override
    public Sku getSkuForGtin(ResourceResolver resourceResolver, String gtin) {
        final Resource productsResource = resourceResolver.getResource(WatersCommerceConstants.PATH_COMMERCE_PRODUCTS);

        int count = 0;

        for (final Iterator<Resource> it = productsResource.listChildren(); it.hasNext();) {
            final Resource folder = it.next();

            for (final Iterator<Resource> iter = folder.listChildren(); iter.hasNext();) {
                final Resource skuResource = iter.next();

                count++;

                if (gtin.equalsIgnoreCase((String) skuResource.getValueMap().get("hybris:gtin"))) {
                    LOG.debug("traversed over {} nodes", count);

                    return skuResource.adaptTo(Sku.class);
                }
            }
        }

        LOG.warn("no product found for gtin {}. traversed over {} nodes", gtin, count);

        return null;
    }

    @Override
    public Sku getRelatedSku(final Resource productReferenceResource) {
        final String productCode = productReferenceResource.getValueMap()
            .get(WatersCommerceConstants.PROPERTY_CODE, "");

        return getSku(productReferenceResource.getResourceResolver(), productCode);
    }

    @Override
    public PageDecorator getSkuPage(final PageDecorator currentPage, final String productCode) {
        return findSkuPage(currentPage, productCode);
    }

    @Override
    public PageDecorator getSkuPage(final PageDecorator currentPage, final Sku sku) {
        return findSkuPage(currentPage, sku.getCode());
    }

    @Override
    public Map<String, String> getSkuCodeToPagePathMap(final PageDecorator currentPage) throws RepositoryException {
        final Map<String, String> skuCodeToPagePathMap = new HashMap<>();

        final PredicateGroup skuPagePredicate = buildSkuCodeToPagePathPredicate(currentPage);

        final ResourceResolver resourceResolver = currentPage.getContentResource().getResourceResolver();
        final Query query = queryBuilder.createQuery(skuPagePredicate, resourceResolver.adaptTo(Session.class));

        query.setHitsPerPage(0);

        final List<Hit> hits = query.getResult().getHits();

        if (!hits.isEmpty()) {
            for (final Hit hit : hits) {
                String code = hit.getResource().getChild(JcrConstants.JCR_CONTENT).getValueMap()
                    .get(WatersCommerceConstants.PROPERTY_CODE, String.class);
                String path = hit.getPath();

                skuCodeToPagePathMap.put(code, path);
            }
        }

        return skuCodeToPagePathMap;
    }

    private Sku getSkuForProductResourcePath(final ResourceResolver resourceResolver,
        final String productResourcePath) {
        final Resource skuResource = resourceResolver.getResource(productResourcePath);

        return skuResource == null ? null : skuResource.adaptTo(Sku.class);
    }

    private String getProductResourcePath(final String productCode) {
        final String productCodeNodeName = TextUtils.getValidJcrName(productCode);

        return new StringBuilder(WatersCommerceConstants.PATH_COMMERCE_PRODUCTS)
            .append("/")
            .append(productCodeNodeName, 0, WatersCommerceConstants.PRODUCT_CODE_PREFIX_LENGTH)
            .append("/")
            .append(productCodeNodeName)
            .toString();
    }

    private PageDecorator findSkuPage(final PageDecorator currentPage, final String productCode) {
        // build a query predicate to find the sku page using the product code property value
        final PredicateGroup skuPagePredicate = buildSkuPagePredicate(currentPage, productCode);

        final ResourceResolver resourceResolver = currentPage.getContentResource().getResourceResolver();
        final Query query = queryBuilder.createQuery(skuPagePredicate, resourceResolver.adaptTo(Session.class));

        PageDecorator skuPage = null;

        final List<Hit> hits = query.getResult().getHits();

        if (!hits.isEmpty()) {
            try {
                // return first hit since there should be one unique sku page for a given product code per language
                skuPage = hits.get(0).getResource().adaptTo(PageDecorator.class);
            } catch (RepositoryException e) {
                LOG.error("error getting resource for sku page hit, returning null", e);
            }
        }

        return skuPage;
    }

    private PredicateGroup buildSkuPagePredicate(final PageDecorator currentPage, final String productCode) {
        final PredicateGroup predicateGroup = new PredicateGroup();

        final String rootPath = currentPage.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT).getPath();

        predicateGroup.add(new Predicate(TYPE).set(TYPE, NameConstants.NT_PAGE));
        predicateGroup.add(new Predicate(PathPredicateEvaluator.PATH)
            .set(PathPredicateEvaluator.PATH, rootPath));
        predicateGroup.add(new Predicate(JcrPropertyPredicateEvaluator.PROPERTY)
            .set(JcrPropertyPredicateEvaluator.PROPERTY,
                JcrConstants.JCR_CONTENT + "/" + WatersCommerceConstants.PROPERTY_CODE)
            .set(JcrPropertyPredicateEvaluator.VALUE, productCode));

        return predicateGroup;
    }

    private PredicateGroup buildSkuCodeToPagePathPredicate(final PageDecorator currentPage) {
        final PredicateGroup predicateGroup = new PredicateGroup();

        final String rootPath = currentPage.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT).getPath();

        predicateGroup.add(new Predicate(TYPE).set(TYPE, NameConstants.NT_PAGE));
        predicateGroup.add(new Predicate(PathPredicateEvaluator.PATH)
            .set(PathPredicateEvaluator.PATH, rootPath));
        predicateGroup.add(new Predicate(JcrPropertyPredicateEvaluator.PROPERTY)
            .set(JcrPropertyPredicateEvaluator.PROPERTY,
                JcrConstants.JCR_CONTENT + "/" + NameConstants.NN_TEMPLATE)
            .set(JcrPropertyPredicateEvaluator.VALUE, WatersConstants.TEMPLATE_SKU_PAGE));

        return predicateGroup;
    }
}
