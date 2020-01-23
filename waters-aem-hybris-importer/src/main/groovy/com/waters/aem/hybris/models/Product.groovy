package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Product {

    Boolean coldChainShipping

    Boolean hazardous

    String code

    String description

    String name

    Boolean proprietary

    String summary

    SalesStatus salesStatus

    Boolean terminated

    String gtin

    List<ProductCategory> categories = []

    List<Price> prices = []

    List<Classification> classifications = []

    List<Image> images = []

    List<ProductReference> productReferences = []
}
