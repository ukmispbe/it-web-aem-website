package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.TagManager;
import com.fasterxml.jackson.annotation.JsonGetter;
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
import java.util.stream.Stream;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AppnotePageAnalyticsModel {

    @Inject
    private PageDecorator currentPage;

    @Inject
    private ResourceResolver resolver;

    @Self
    SiteContext siteContext;

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @JsonGetter
    public String getName() {
        return currentPage.getTitle();
    }

    @JsonGetter
    public List<String> getTags() {
        return Stream.of(getTagsAsList("cq:tags"), getType(), getCategory(), getTagsAsList("author"), getTagsAsList("affiliations")).
            flatMap(Collection :: stream)
            .collect(Collectors.toList());
    }

    @JsonGetter
    public String getPublishYear() {
        ValueMap valueMap = currentPage.getProperties();
        TagManager tagManager = resolver.adaptTo(TagManager.class);
        List<String> publishedDates = Arrays.asList(valueMap.get("yearPublished", new String[0]));

        String year = "";
        if(publishedDates.size() > 0){
            year =  tagManager.resolve(publishedDates.get(0)).getTitle();
        }

        return year;
    }

    @JsonGetter
    public String getEditDate() {
        Calendar calendar = currentPage.getLastModified();
        return simpleDateFormat.format(calendar.getTime());
    }

    @JsonGetter
    public String getLanguage() {
        return siteContext.getLocale().getLanguage();
    }

    @JsonGetter
    public String getLitCode() {
        ValueMap valueMap = currentPage.getProperties();
        return valueMap.get("literatureCode") != null ? valueMap.get("literatureCode").toString() : "";
    }

    @JsonGetter
    public String getCountry() {
        return siteContext.getLocale().getCountry();
    }

    @JsonGetter
    public List<String> getType() {
        return getTagsAsList("contentType");
    }

    @JsonGetter
    public List<String> getCategory() {
        return getTagsAsList("category");
    }

    public List<String> getTagsAsList(String param) {
        ValueMap valueMap = currentPage.getProperties();
        return Arrays.asList(valueMap.get(param, new String[0]));
    }
}
