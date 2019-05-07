package com.waters.aem.hybris.models

import com.fasterxml.jackson.annotation.JsonFormat
import groovy.transform.ToString

import static com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING

@ToString(includePackage = false, includeNames = true)
class Catalog {

    String id

    String name

    String url

    @JsonFormat(shape = STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    Calendar lastModified

    List<CatalogVersion> catalogVersions
}
