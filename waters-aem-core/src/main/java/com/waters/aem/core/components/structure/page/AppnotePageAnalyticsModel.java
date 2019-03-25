package com.waters.aem.core.components.structure.page;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class AppnotePageAnalyticsModel extends AbstractAnalyticsModel {

    @Inject
    private PageDecorator currentPage;

    @Self
    private ApplicationNotes applicationNotes;

    @Self
    private AnalyticsPageModel pageModel;

    public Document getDocument() {
        return new Document();
    }

    public AnalyticsPageModel getPage() {
        return pageModel;
    }

    public class Document {

        public String getId() {
            return currentPage.getProperties().get("literatureCode", "");
        }

        public String getFirstPublishDate() {
            return applicationNotes.getFormattedPublishDate();
        }

        @JsonIgnore
        public String getYearPublished() {
            return getTagTitle(applicationNotes.getYearPublished());
        }

        @JsonIgnore
        public String getMonthPublished() {
            return getTagTitle(applicationNotes.getMonthPublished());
        }

        public String getLastPublishDate() {
            return Optional.ofNullable(currentPage.getLastModified())
                .map(WatersConstants.DATE_FORMAT_ISO_8601 :: format)
                .orElse("");
        }

        public List<String> getTags() {
            final List<String> tagList = getTagTitles(applicationNotes.getAuthor());

            tagList.addAll(getTagTitles(applicationNotes.getAffiliations()));

            return tagList;
        }

        public String getTitle() {
            return currentPage.getTitle();
        }
    }
}
