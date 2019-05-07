package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Price {

    String currencyIso

    String priceType

    Double value

    String formattedValue
}
