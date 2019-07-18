package com.waters.aem.core.servlets

import com.adobe.granite.ui.components.rendercondition.RenderCondition
import com.day.cq.wcm.api.NameConstants
import com.waters.aem.core.WatersSpec
import com.waters.aem.core.constants.WatersConstants
import spock.lang.Unroll

@Unroll
class CatalogTemplateRenderConditionServletSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                en((NameConstants.PN_TEMPLATE): WatersConstants.TEMPLATE_CONTENT_PAGE) {
                    "shop"((NameConstants.PN_TEMPLATE): WatersConstants.TEMPLATE_CATALOG_PAGE)
                }
            }
        }
    }

    def "catalog template render condition"() {
        setup:
        def request = requestBuilder.build {
            parameterMap = ["item": path]
        }

        def response = responseBuilder.build()

        def servlet = new CatalogTemplateRenderConditionServlet()

        when:
        servlet.doGet(request, response)

        then:
        def renderCondition = request.getAttribute(RenderCondition.name) as RenderCondition

        renderCondition.check() == isCatalogTemplate

        where:
        path                                  | isCatalogTemplate
        "/content/waters/en"                  | false
        "/content/waters/en/shop"             | true
    }
}
