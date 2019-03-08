package com.waters.aem.core.components.structure.page;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel extends AbstractAnalyticsModel{

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

            if(!StringUtils.isEmpty(getMonthPublished())) {
                stringBuilder.append(getMonthPublished());
            }
            if(!StringUtils.isEmpty(getMonthPublished()) && !StringUtils.isEmpty(getYearPublished())) {
                stringBuilder.append("|");
            }
            if(!StringUtils.isEmpty(getYearPublished())) {
                stringBuilder.append(getYearPublished());
            }

            return stringBuilder.toString();
        }

        @JsonIgnore
        public String getYearPublished() {
            return getLocalizedTitle(applicationNotes.getYearPublished());
        }

        @JsonIgnore
        public String getMonthPublished() {
            return getLocalizedTitle(applicationNotes.getMonthPublished());
        }

        public String getLastPublishDate() {
            return new SimpleDateFormat(DATE_FORMAT).format(currentPage.getLastModified().getTime());
        }

        public List<String> getTags() {
            List<String> tagList = getLocalizedTitles(applicationNotes.getAuthor());
            tagList.addAll(getLocalizedTitles(applicationNotes.getAffiliations()));
            return tagList;
        }

        public String getTitle() {
            return currentPage.getTitle();
        }
    }
}
