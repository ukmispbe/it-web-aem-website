package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Classification {

    String code

    List<Feature> features = []

    String name
}
