package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class ProductReference {

    ProductReferenceType referenceType

    ProductReferenceTarget target

    Boolean preselected

    String description
}