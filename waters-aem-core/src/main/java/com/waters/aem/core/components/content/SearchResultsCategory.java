package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.tagging.WatersTagInject;
import com.waters.aem.core.utils.SearchUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResultsCategory {

    @Self
    private SiteContext siteContext;

    @DialogField(fieldLabel = "Category",
            fieldDescription = "Select a tag corresponding to a top-level search category.",
            required = true,
            ranking = 1)
    @TagInputField(multiple = false)
    @WatersTagInject
    private Tag categoryTag;

    @DialogField(fieldLabel = "Sort By",
            fieldDescription = "Select tags for sort order of Search Results.",
            ranking = 3)
    @TagInputField(rootPath = "/content/cq:tags/waters/sort-by")
    @WatersTagInject
    private List<Tag> sortBy = Collections.emptyList();

    public String getCategoryFacetValue() {
        // always english
        return categoryTag == null ? null : categoryTag.getTitle();
    }

    public String getCategoryFacetName() {
        return categoryTag == null ? null : SearchUtils.getSolrFacetName(categoryTag.getName());
    }

    public String getCategoryFacetTranslation() {
        return categoryTag == null ? null : categoryTag.getTitle(siteContext.getLocale());
    }

    public List<Map<String, String>> getSortBy() {
        return sortBy.stream()
                .map(tag -> ImmutableMap.<String, String>builder()
                        .put("sortKey", tag.getName())
                        .put("sortValue", tag.getTitle())
                        .put("sortTranslation", tag.getTitle(siteContext.getLocale()))
                        .build())
                .collect(Collectors.toList());
    }
}
