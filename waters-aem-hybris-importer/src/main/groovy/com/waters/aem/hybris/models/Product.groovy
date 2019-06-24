package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Product {

    Boolean coldStorage

    Boolean hazardousHandling

    String code

    String description

    String name

    Boolean proprietary

    String summary

    SalesStatus salesStatus

    Boolean terminated

    List<ProductCategory> categories = []

    List<Price> prices = []

    List<Classification> classifications = []

    List<Image> images = []

    List<ProductReference> productReferences = []
}
