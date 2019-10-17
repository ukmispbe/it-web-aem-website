package com.waters.aem.core.components.structure.page


import com.waters.aem.core.WatersSpec
import com.waters.aem.core.components.content.Video
import spock.lang.Unroll

import static com.adobe.cq.xf.ExperienceFragmentsConstants.RT_EXPERIENCE_FRAGMENT_COMPONENT

@Unroll
class ScriptHelperSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            "experience-fragments"() {
                fragment1() {
                    "jcr:content"() {
                        video("sling:resourceType": Video.RESOURCE_TYPE)
                    }
                }
            }
            waters {
                one() {
                    "jcr:content"() {
                        video("sling:resourceType": Video.RESOURCE_TYPE)
                    }
                }
                two() {
                    "jcr:content"() {
                        xf("sling:resourceType": RT_EXPERIENCE_FRAGMENT_COMPONENT, fragmentPath: "/content/experience-fragments/fragment1")
                    }
                }
                three() {
                    "jcr:content"() {
                        text()
                    }
                }
            }
        }
    }

    def "page has video component"() {
        setup:
        def scriptHelper = getPage(path).contentResource.adaptTo(ScriptHelper)

        expect:
        scriptHelper.pageHasVideoComponent == hasVideoComponent

        where:
        path                    | hasVideoComponent
        "/content/waters/one"   | true
        "/content/waters/two"   | true
        "/content/waters/three" | false
    }
}
