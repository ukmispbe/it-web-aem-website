package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class ProductList {

    String catalog

    String version

    List<Product> products = []

    Integer currentPage

    Integer totalPageCount

    Integer totalProductCount
}
