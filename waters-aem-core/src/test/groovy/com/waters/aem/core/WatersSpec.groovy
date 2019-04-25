package com.waters.aem.core

import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.injectors.ContentClassificationInjector
import com.waters.aem.core.tagging.WatersTagInjector

abstract class WatersSpec extends AemLibraryModelSpec {

    def setupSpec() {
        slingContext.registerInjector(new WatersTagInjector(), Integer.MIN_VALUE)
        slingContext.registerInjector(new ContentClassificationInjector(), Integer.MIN_VALUE)
    }
}
