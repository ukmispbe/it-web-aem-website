package com.waters.aem.core.utils;

import com.day.cq.commons.jcr.JcrUtil;

import static com.day.cq.commons.jcr.JcrUtil.HYPHEN_LABEL_CHAR_MAPPING;

public final class TextUtils {

    /**
     * Convert a title or arbitrary string value to a valid JCR name.
     *
     * @param title title value
     * @return valid JCR name
     */
    public static String getValidJcrName(final String title) {
        return JcrUtil.createValidName(title.trim().replaceAll("[^\\p{L}0-9\\-/ ]+", ""), HYPHEN_LABEL_CHAR_MAPPING);
    }

    private TextUtils() {

    }
}
