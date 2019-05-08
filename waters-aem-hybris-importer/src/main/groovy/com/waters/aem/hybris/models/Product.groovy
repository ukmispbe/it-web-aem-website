package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Product {

    Boolean availableForPickup

    List<ProductCategory> categories = []

    List<Classification> classifications = []

    String code

    String description

    String name

    Integer numberOfReviews

    Object priceRange

    Boolean proprietary

    Boolean purchasable

    String salesStatus

    Stock stock

    String summary

    Boolean terminated

    String url
}
