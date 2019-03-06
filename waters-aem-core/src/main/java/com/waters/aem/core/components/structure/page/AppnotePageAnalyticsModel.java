package com.waters.aem.core.components.structure.page;

import com.icfolson.aem.library.api.page.PageDecorator;
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

        public String getLitCode() {
            return currentPage.getProperties().get("literatureCode", "");
        }

        public List<String> getFirstPublishDate() {
            return getLocalizedTitle(applicationNotes.getYearPublished());
        }

        public String getLastPublishDate() {
            return new SimpleDateFormat(DATE_FORMAT).format(currentPage.getLastModified().getTime());
        }

        public List<String> getTags() {
            return getLocalizedTitle(applicationNotes.getAllTags());
        }

        public String getTitle() {
            return currentPage.getTitle();
        }

    }
}
