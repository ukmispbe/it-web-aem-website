package com.waters.aem.hybris.models

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonFormat.Shape
import com.google.common.base.Objects
import com.waters.aem.hybris.constants.HybrisImporterConstants

class Category {

    String id

    String name

    List<Category> subcategories = []

    @JsonFormat(shape = Shape.STRING, pattern = HybrisImporterConstants.DATE_FORMAT_PATTERN)
    Calendar lastModified

    @Override
    String toString() {
        Objects.toStringHelper(this)
            .add("id", id)
            .add("name", name)
            .add("subcategories", subcategories.size())
            .add("lastModified", lastModified.format(HybrisImporterConstants.DATE_FORMAT_PATTERN))
            .toString()
    }
}
