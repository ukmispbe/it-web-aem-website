package com.waters.aem.hybris.models

import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Price {

    String countries

    String currencyIso

    String formattedValue

    Integer maxQuantity

    Integer minQuantity

    PriceType priceType

    BigDecimal value
}
