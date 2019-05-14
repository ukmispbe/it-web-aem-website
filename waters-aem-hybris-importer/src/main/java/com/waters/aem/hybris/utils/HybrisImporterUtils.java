package com.waters.aem.hybris.utils;

import com.day.cq.commons.jcr.JcrUtil;

import static com.day.cq.commons.jcr.JcrUtil.HYPHEN_LABEL_CHAR_MAPPING;

public final class HybrisImporterUtils {

    public static String getValidJcrName(final String title) {
        return JcrUtil.createValidName(title.trim().replaceAll("[^\\p{L}0-9\\-/ ]+", ""), HYPHEN_LABEL_CHAR_MAPPING);
    }

    private HybrisImporterUtils() {

    }
}
