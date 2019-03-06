package com.waters.aem.core.components.structure.page;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;



@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel extends AbstractAnalyticsModel{

    @Inject
    private static PageDecorator currentPage;

    @Self
    private static SiteContext siteContext;

    @Self
    private static ApplicationNotes applicationNotes;

    @Self
    private static AnalyticsPageModel pageModel;

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    public Document getDocument(){
        return new Document();
    }

    public AnalyticsPageModel getPage(){
        return pageModel;
    }

    public static class Document {

        public String getId() {
            ValueMap valueMap = currentPage.getProperties();
            return valueMap.get("literatureCode", "");
        }

        public List<String> getFirstPublishDate() {
            return getLocalizedTitle(applicationNotes.getYearPublished());
        }

        public String getLastPublishDate() {
            Calendar calendar = currentPage.getLastModified();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_FORMAT);
            return simpleDateFormat.format(calendar.getTime());
        }

        public List<String> getTags() {
            return getLocalizedTitle(applicationNotes.getAllTags());
        }

        public String getTitle() {
            return currentPage.getTitle();
        }

    }
}
