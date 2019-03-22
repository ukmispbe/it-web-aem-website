package com.waters.aem.core.components.structure.page;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel extends AbstractAnalyticsModel {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    private static final String FIRST_PUBLISH_DATE_FORMAT = "yyyy-MMM-dd";

    private static final String DEFAULT_DAY_NUMBER = "01";

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

        public String getFirstPublishDate() throws ParseException {
            return !StringUtils.isEmpty(getMonthPublished()) && !StringUtils.isEmpty(getYearPublished()) ?
                new SimpleDateFormat(DATE_FORMAT)
                .format(new SimpleDateFormat(FIRST_PUBLISH_DATE_FORMAT).parse(getYearPublished() + "-" + getMonthPublished() + "-" + DEFAULT_DAY_NUMBER)) : "";
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
                .map(date -> new SimpleDateFormat(DATE_FORMAT).format(date.getTime()))
                .orElse("");
        }

        public List<String> getTags() {
            List<String> tagList = getTagTitles(applicationNotes.getAuthor());
            tagList.addAll(getTagTitles(applicationNotes.getAffiliations()));
            return tagList;
        }

        public String getTitle() {
            return currentPage.getTitle();
        }
    }
}
