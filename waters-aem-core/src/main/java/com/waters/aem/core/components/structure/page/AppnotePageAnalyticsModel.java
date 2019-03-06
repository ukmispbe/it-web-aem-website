package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    @Inject
    private PageDecorator currentPage;

    @Self
    private SiteContext siteContext;

    @Self
    private ApplicationNotes applicationNotes;

    public String getName() {
        return currentPage.getTitle();
    }

    public List<String> getTags() {
        return getLocalizedTitle(applicationNotes.getAllTags());
    }

    public List<String> getPublishYear() {
        return getLocalizedTitle(applicationNotes.getYearPublished());
    }

    public String getEditDate() {
        return new SimpleDateFormat(DATE_FORMAT).format(currentPage.getLastModified().getTime());
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public String getLitCode() {
        return currentPage.getProperties().get("literatureCode", "");
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public List<String> getType() {
        return getLocalizedTitle(applicationNotes.getContentType());
    }

    public List<String> getCategory() {
        return getLocalizedTitle(applicationNotes.getCategory());
    }

    private List<String> getLocalizedTitle(final List<Tag> tags) {
        return tags.stream().map(this :: getTagTitlePath).collect(Collectors.toList());
    }

    private String getTagTitlePath(final Tag tag) {
        final List<String> titlesInPath = new ArrayList<>();

        titlesInPath.add(tag.getTitle(siteContext.getLocale()));

        Tag parent = tag.getParent();

        while (parent != null) {
            titlesInPath.add(parent.getTitle(siteContext.getLocale()));
            parent = parent.getParent();
        }

        Collections.reverse(titlesInPath);

        return String.join("|", titlesInPath);
    }
}
