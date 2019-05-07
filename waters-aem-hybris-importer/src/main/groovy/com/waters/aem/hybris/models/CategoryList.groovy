package com.waters.aem.hybris.models

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonFormat.Shape
import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class CategoryList {

    String id

    @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    Calendar lastModified

    List<Category> categories
}
