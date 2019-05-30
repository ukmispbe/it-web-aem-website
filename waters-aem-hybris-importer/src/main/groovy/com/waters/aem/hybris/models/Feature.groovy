package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Feature {

    String code

    Boolean comparable

    FeatureUnit featureUnit

    List<FeatureValue> featureValues = []

    Boolean internalOnly

    String name

    Integer position

    String publicWebLabel

    Boolean range
}