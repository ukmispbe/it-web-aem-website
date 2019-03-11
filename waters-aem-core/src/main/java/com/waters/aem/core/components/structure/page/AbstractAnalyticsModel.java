package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractAnalyticsModel {

    @Self
    private SiteContext siteContext;

    public String getLocalizedTitle(List<Tag> tags) {
        return !tags.isEmpty() ? tags.get(0).getTitle(siteContext.getLocale()) : "";
    }

    public String getFirstLocalizedTitle(List<Tag> tags) {
        return !tags.isEmpty() ? getLocalizedTitles(tags).get(0) : "";
    }

    public List<String> getLocalizedTitles(final List<Tag> tags) {
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
