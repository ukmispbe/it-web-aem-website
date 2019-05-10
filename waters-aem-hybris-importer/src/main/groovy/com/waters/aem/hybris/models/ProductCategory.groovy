package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class ProductCategory {

    String code

    String url

    Image image
}