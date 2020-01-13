package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.NumberField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component(value = "Category Listing (SEO)",
    description = "This is the Button component for Waters site",
    tabs = {
        @Tab(title = "Sku List"),
        @Tab(title = "Related Categories")
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { CategoryListing.class, ComponentExporter.class },
    resourceType = CategoryListing.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CategoryListing implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/categorylisting";

    public static final int DEFAULT_ITEMS_PER_PAGE = 24;

    public static final String PARAMETER_PAGE = "page";

    @OSGiService
    private SkuRepository skuRepository;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Sku Items Per Page",
        fieldDescription = "The Number of Sku items to display per page. " +
                "Defaults to " + DEFAULT_ITEMS_PER_PAGE + " if left blank.",
        ranking = 1)
    @NumberField
    @Inject
    @Default(intValues = DEFAULT_ITEMS_PER_PAGE)
    private int itemsPerPage;

    @DialogField(fieldLabel = "Sku Numbers",
        fieldDescription = "List of Skus to display on this page",
        renderReadOnly = false,
        required = true,
        ranking = 1)
    @MultiField
    @TextField
    @Inject
    private String [] skuCodes = new String[0];

    @DialogField(fieldLabel = "Related Categories",
        fieldDescription = "List of related categories",
        renderReadOnly = false,
        tab = 2,
        ranking = 1)
    @MultiField
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @Inject
    private String[] categoryPaths = new String[0];

    public String[] getSkuCodes() {
        return skuCodes;
    }

    public String[] getCategoryPaths() {
        return categoryPaths;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    //Sku List
    public List<DisplayableSku> getDisplayableSkuSubList() {
        final int nextPage = getPageParamOrDefault();
        final int startingIndex = getStartingIndex(nextPage);
        final int endingIndex = startingIndex + itemsPerPage;
        final int listSize = getDisplayableSkus().size();

        return listSize >= endingIndex ? getDisplayableSkus().subList(startingIndex, endingIndex) :
            getDisplayableSkus().subList(startingIndex, listSize);
    }

    //Pagination
    public List<Integer> getPageList() {
        return IntStream.rangeClosed(1, getTotalPages()).boxed().collect(Collectors.toList());
    }

    public String getCurrentPagePath() {
        return currentPage.getPath();
    }

    public int getCurrentPageNumber() {
        return getPageParamOrDefault();
    }

    public boolean getHasNextPage() {
        return getCurrentPageNumber() < getPageList().size();
    }

    public boolean getHasPreviousPage() {
        return getCurrentPageNumber() > 1;
    }

    public String getCurrentPageHref() {
        return getCurrentPageNumber() == 1 ? getPageOneHref() : LinkBuilderFactory.forPath(currentPage.getPath())
            .addSelector(String.valueOf(getPageParamOrDefault()))
            .setExtension("html")
            .addParameter(PARAMETER_PAGE, String.valueOf(getPageParamOrDefault()))
            .build()
            .getHref();
    }

    public String getNextPageHref() {
        return LinkBuilderFactory.forPath(currentPage.getPath())
            .addSelector(String.valueOf(getPageParamOrDefault() + 1))
            .setExtension("html")
            .addParameter(PARAMETER_PAGE, String.valueOf(getPageParamOrDefault() + 1))
            .build()
            .getHref();
    }

    public String getPreviousPageHref() {
        return getCurrentPageNumber() == 2 ? getPageOneHref() : LinkBuilderFactory.forPath(currentPage.getPath())
            .addSelector(String.valueOf(getPageParamOrDefault() - 1))
            .setExtension("html")
            .addParameter(PARAMETER_PAGE, String.valueOf(getPageParamOrDefault() - 1))
            .build()
            .getHref();
    }



    //Category List
    public List<Link> getCategoryLinks() {
        return Arrays.stream(categoryPaths)
            .map(path -> resource.getResourceResolver().adaptTo(PageManagerDecorator.class).getPage(path))
            .filter(Objects::nonNull)
            .map(page -> LinkBuilderFactory.forPage(page, true).setTitle(page.getTitle()).build())
            .collect(Collectors.toList());
    }

    private int getPageParamOrDefault() {
        return request != null && request.getParameter(PARAMETER_PAGE) != null ?
                Integer.parseInt(request.getParameter(PARAMETER_PAGE)) : 1;
    }

    private int getStartingIndex(final int nextPage) {
        int startingIndex = 0;

        if (nextPage != 1) {
            startingIndex = ((nextPage - 1) * itemsPerPage);
        }

        return startingIndex;
    }

    private List<DisplayableSku> getDisplayableSkus() {
        return Arrays.stream(skuCodes)
            .map(skuNumber -> skuRepository.getSku(resource.getResourceResolver(), skuNumber))
            .filter(Objects::nonNull)
            .map(relatedSku -> new DisplayableSku(relatedSku, siteContext))
            .collect(Collectors.toList());
    }

    private int getTotalItems() {
        return getDisplayableSkus().size();
    }

    private int getTotalPages() {
        final int totalItems = getTotalItems();

        if (itemsPerPage > 0) {
            return totalItems > itemsPerPage ? (int) Math.ceil((double) totalItems / (double) itemsPerPage) : 1;
        } else {
            return 0;
        }
    }

    private String getPageOneHref() {
        return LinkBuilderFactory.forPath(currentPage.getPath())
        .setExtension("html")
        .build()
        .getHref();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
