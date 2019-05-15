package com.waters.aem.hybris.models

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonFormat.Shape
import com.waters.aem.hybris.constants.HybrisImporterConstants
import groovy.transform.ToString

@ToString(includePackage = false, includeNames = true)
class Promotion {

    String code

    List<String> couldFireMessages = []

    String description

    Boolean enabled

    @JsonFormat(shape = Shape.STRING, pattern = HybrisImporterConstants.DATE_FORMAT_PATTERN)
    Calendar startDate

    @JsonFormat(shape = Shape.STRING, pattern = HybrisImporterConstants.DATE_FORMAT_PATTERN)
    Calendar endDate

    List<String> firedMessages = []

    Integer priority

    Image productBanner

    String promotionGroup

    String promotionType

    List<PromotionRestriction> restrictions = []

    String title
}
