package com.waters.aem.core.components.structure.page;

import com.day.cq.tagging.Tag;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by 35243 on 3/6/19.
 */
public abstract class AbstractAnalyticsModel {

    @Self
    private static SiteContext siteContext;

    public static List<String> getLocalizedTitle(List<Tag> tags) {
        return tags.stream().map(tag -> getTagTitlePath(tag)).collect(Collectors.toList());
    }

    public static String getTagTitlePath(Tag tag) {
        List<String> titlesInPath = new ArrayList<>();
        titlesInPath.add(tag.getTitle(siteContext.getLocale()));

        Tag parent = tag.getParent();

        while(parent != null) {
            titlesInPath.add(parent.getTitle(siteContext.getLocale()));
            parent = parent.getParent();
        }

        Collections.reverse(titlesInPath);
        return String.join("|", titlesInPath);
    }
}
