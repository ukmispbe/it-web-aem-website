package com.waters.aem.core.components.structure.page.analytics;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonRootName(value = "document")
public class DocumentObjectData extends AbstractAnalyticsModel{

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ContentClassification contentClassification;

    public String getId() {
        return contentClassification.getLiteratureCode();
    }

    public String getFirstPublishDate() {
        return getFormattedPublishDate(getYearPublished(), getMonthPublished());
    }

    @JsonIgnore
    public String getYearPublished() {
        return getTagTitle(contentClassification.getYearPublished());
    }

    @JsonIgnore
    public String getMonthPublished() {
        return getTagTitle(contentClassification.getMonthPublished());
    }

    public String getLastPublishDate() {
        return Optional.ofNullable(currentPage.getLastModified())
        .map(WatersConstants.DATE_FORMAT_ISO_8601 :: format)
        .orElse("");
    }

    public List<String> getTags() {
        List<String> tagList = getTagTitles(contentClassification.getAllTags());

        if(Templates.isApplicationNotesPage(currentPage)){
            tagList = tagList.stream().filter(tag -> tag.contains("Authors") || tag.contains("Affiliations")).collect(Collectors.toList());
        }

        return tagList;
    }

    public String getTitle() {
        return currentPage.getTitle();
    }
}
