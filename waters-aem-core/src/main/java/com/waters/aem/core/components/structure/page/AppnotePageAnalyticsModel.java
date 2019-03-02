package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel {

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resolver;

    @Self
    private SiteContext siteContext;

    @Self
    private ApplicationNotes applicationNotes;

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    public String getName() {
        return currentPage.getTitle();
    }

    public List<String> getTags() {
        return getTagIds(applicationNotes.getAllTags());
    }

    public List<String> getPublishYear() {
        return getTagIds(applicationNotes.getYearPublished());
    }

    public String getEditDate() {
        Calendar calendar = currentPage.getLastModified();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_FORMAT);
        return simpleDateFormat.format(calendar.getTime());
    }

    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    public String getLitCode() {
        ValueMap valueMap = currentPage.getProperties();
        return valueMap.get("literatureCode", "");
    }

    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    public List<String> getType() {
        return getTagIds(applicationNotes.getContentType());
    }

    public List<String> getCategory() {
        return getTagIds(applicationNotes.getCategory());
    }

    public List<String> getTagIds(List<Tag> tags) {
        return tags.stream().map(tag -> tag.getLocalTagID()).collect(Collectors.toList());
    }
}
