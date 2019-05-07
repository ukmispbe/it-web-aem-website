package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true, excludes = ["images"])
class Product {

    String description

    String name

    String code

    String manufacturer

    Stock stock

    Price price

    List<Image> images = []
}
