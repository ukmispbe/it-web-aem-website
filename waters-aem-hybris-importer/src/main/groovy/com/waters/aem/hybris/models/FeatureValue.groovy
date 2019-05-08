package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class FeatureValue {

    FeatureUnitValue featureUnitValue

    Integer position

    String value
}
