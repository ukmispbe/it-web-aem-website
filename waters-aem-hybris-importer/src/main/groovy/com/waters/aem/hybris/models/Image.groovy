package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Image {

    public static final FORMAT_PRODUCT = "product"

    public static final FORMAT_THUMBNAIL = "thumbnail"

    String imageType

    String format

    String altText

    String url
}