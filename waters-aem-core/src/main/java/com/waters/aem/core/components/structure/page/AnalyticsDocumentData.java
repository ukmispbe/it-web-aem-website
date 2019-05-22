package com.waters.aem.core.components.structure.page;

import com.drew.lang.annotations.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@JsonRootName(value = "document")
public class AnalyticsDocumentData extends AbstractAnalyticsModel{

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Self
    private ApplicationNotes applicationNotes;

    @Self
    private LibraryPage libraryPage;

    public String getId() {
        return Templates.isApplicationNotesPage(currentPage) ? applicationNotes.getLiteratureCode() : libraryPage.getLiteratureCode();
    }

    public String getFirstPublishDate() {
        return applicationNotes.getFormattedPublishDate();
    }

    @JsonIgnore
    public String getYearPublished() {
        return Templates.isApplicationNotesPage(currentPage) ? getTagTitle(applicationNotes.getYearPublished()) : getTagTitle(libraryPage.getYearPublished());
    }

    @JsonIgnore
    public String getMonthPublished() {
        return Templates.isApplicationNotesPage(currentPage) ? getTagTitle(applicationNotes.getMonthPublished()) : getTagTitle(libraryPage.getMonthPublished());
    }

    public String getLastPublishDate() {
        return Optional.ofNullable(currentPage.getLastModified())
        .map(WatersConstants.DATE_FORMAT_ISO_8601 :: format)
        .orElse("");
    }

    public List<String> getTags() {
        List<String> tagList = new ArrayList<>();
        if(Templates.isApplicationNotesPage(currentPage)){
            tagList = getTagTitles(applicationNotes.getAuthor());

            tagList.addAll(getTagTitles(applicationNotes.getAffiliations()));
        } else {
            tagList.addAll(getTagTitles(libraryPage.getAllTags()));
        }

        return tagList;
    }

    public String getTitle() {
        return currentPage.getTitle();
    }
}
