package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Stock {

    Integer stockLevel

    String stockLevelStatus
}
