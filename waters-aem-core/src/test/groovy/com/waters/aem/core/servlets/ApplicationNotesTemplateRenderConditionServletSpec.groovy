package com.waters.aem.core.servlets

import com.adobe.granite.ui.components.rendercondition.RenderCondition
import com.day.cq.wcm.api.NameConstants
import com.icfolson.aem.library.models.specs.AemLibraryModelSpec
import com.waters.aem.core.constants.WatersConstants
import spock.lang.Unroll

@Unroll
class ApplicationNotesTemplateRenderConditionServletSpec extends AemLibraryModelSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                en((NameConstants.PN_TEMPLATE): WatersConstants.TEMPLATE_CONTENT_PAGE) {
                    "application-note"((NameConstants.PN_TEMPLATE): WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE)
                }
            }
        }
    }

    def "application notes template render condition"() {
        setup:
        def request = requestBuilder.build {
            parameterMap = ["item": path]
        }

        def response = responseBuilder.build()

        def servlet = new ApplicationNotesTemplateRenderConditionServlet()

        when:
        servlet.doGet(request, response)

        then:
        def renderCondition = request.getAttribute(RenderCondition.name) as RenderCondition

        renderCondition.check() == isApplicationNotesTemplate

        where:
        path                                  | isApplicationNotesTemplate
        "/content/waters/en"                  | false
        "/content/waters/en/application-note" | true
    }
}
