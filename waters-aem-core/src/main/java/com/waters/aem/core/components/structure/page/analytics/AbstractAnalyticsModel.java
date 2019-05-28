package com.waters.aem.core.components.structure.page.analytics;

import com.day.cq.tagging.Tag;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractAnalyticsModel {

    private static final String FIRST_PUBLISH_DATE_FORMAT = "yyyy-MMM-dd";

    private static final String DEFAULT_DAY_NUMBER = "01";

    @Self
    private SiteContext siteContext;

    protected String getTagTitle(final List<Tag> tags) {
        return !tags.isEmpty() ? tags.get(0).getTitle(siteContext.getLocale()) : "";
    }

    protected String getFirstTagTitle(final List<Tag> tags) {
        return !tags.isEmpty() ? getTagTitles(tags).get(0) : "";
    }

    protected List<String> getTagTitles(final List<Tag> tags) {
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

    public String getFormattedPublishDate(String yearPublished, String monthPublished) {
        final String year = yearPublished;
        final String month = monthPublished;

        String formattedPublishDate = "";

        if (StringUtils.isNotEmpty(year) && StringUtils.isNotEmpty(month)) {
            try {
                final String dateString =  buildDateString(year, month);

                final Date date = new SimpleDateFormat(FIRST_PUBLISH_DATE_FORMAT).parse(dateString);

                formattedPublishDate = WatersConstants.DATE_FORMAT_ISO_8601.format(date);
            } catch (ParseException e) {
                // ignore
            }
        }

        return formattedPublishDate;
    }

    public String buildDateString(String year, String month){
        return new StringBuilder()
        .append(year)
        .append("-")
        .append(month)
        .append("-")
        .append(DEFAULT_DAY_NUMBER)
        .toString();
    }
}
