package com.waters.aem.core.components.structure.page;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel extends AbstractAnalyticsModel{

    Logger log = LoggerFactory.getLogger(AppnotePageAnalyticsModel.class);

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    @Self
    private SiteContext siteContext;

    @Inject
    private PageDecorator currentPage;

    @Self
    private ApplicationNotes applicationNotes;

    @Self
    private AnalyticsPageModel pageModel;

    public Document getDocument(){
        return new Document();
    }

    public AnalyticsPageModel getPage(){
        return pageModel;
    }

    public class Document {

        public String getId() {
            return currentPage.getProperties().get("literatureCode", "");
        }

        public String getFirstPublishYear() {
            StringBuilder stringBuilder = new StringBuilder();

            if(!StringUtils.isBlank(getMonthPublished())) {
                stringBuilder.append(getMonthPublished());
            }
            if(!StringUtils.isBlank(getMonthPublished()) && !StringUtils.isBlank(getYearPublished())) {
                stringBuilder.append("|");
            }
            if(!StringUtils.isBlank(getYearPublished())) {
                stringBuilder.append(getYearPublished());
            }

            return stringBuilder.toString();
        }

        @JsonIgnore
        public String getYearPublished() {
            return applicationNotes.getYearPublished().get(0).getTitle(siteContext.getLocale());
        }

        @JsonIgnore
        public String getMonthPublished() {
            return applicationNotes.getMonthPublished().get(0).getTitle(siteContext.getLocale());
        }

        public String getLastPublishDate() {
            return new SimpleDateFormat(DATE_FORMAT).format(currentPage.getLastModified().getTime());
        }

        public List<String> getTags() {
            List<String> tagList = getLocalizedTitle(applicationNotes.getAuthor());
            tagList.addAll(getLocalizedTitle(applicationNotes.getAffiliations()));
            return tagList;
        }

        public String getTitle() {
            return currentPage.getTitle();
        }
    }
}
