package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class ProductReferenceTarget {

    String code

    String name

    Boolean proprietary

    Boolean terminated

    String url
}