package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Image {

    String altText

    String format

    Integer galleryIndex

    ImageType imageType

    String url
}
