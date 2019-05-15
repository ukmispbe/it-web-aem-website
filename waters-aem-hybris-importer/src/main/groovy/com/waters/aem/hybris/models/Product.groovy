package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Product {

    Boolean availableForPickup

    String baseProduct

    String code

    String manufacturer

    String description

    String name

    Integer numberOfReviews

    Boolean proprietary

    Boolean purchasable

    String salesStatus

    String summary

    Boolean terminated

    String url

    Stock stock

    List<ProductCategory> categories = []

    List<Price> prices = []

    List<Classification> classifications = []

    List<Image> images = []

    List<Promotion> potentialPromotions = []
}
