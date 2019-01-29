package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.models.annotations.TagInject;
import com.waters.aem.core.utils.SearchUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResultsCategory {

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "Category",
        fieldDescription = "Select a tag corresponding to a top-level search category.",
        ranking = 1)
    @TagInputField(multiple = false)
    @TagInject
    private Tag categoryTag;

    @DialogField(fieldLabel = "Ordered Facets",
        fieldDescription = "Select facet tags in the order that they should be displayed on the Search Results page.",
        ranking = 2)
    @TagInputField
    @TagInject
    private List<Tag> orderedFacetTags = Collections.emptyList();

    public String getCategory() {
        return categoryTag == null ? null : categoryTag.getTitle(currentPage.getLanguage(true));
    }

    public List<String> getOrderedFacets() {
        return orderedFacetTags.stream()
            .map(tag -> SearchUtils.getSolrFacetName(tag.getName()))
            .collect(Collectors.toList());
    }
}
