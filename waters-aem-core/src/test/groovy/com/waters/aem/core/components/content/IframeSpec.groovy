package com.waters.aem.core.components.content

import com.day.cq.wcm.api.policies.ContentPolicyManager
import com.waters.aem.core.WatersSpec
import org.apache.sling.api.adapter.AdapterFactory
import org.apache.sling.api.resource.ResourceResolver
import spock.lang.Unroll

@Unroll
class IframeSpec extends WatersSpec {

    static class MockContentPolicyManagerAdapterFactory implements AdapterFactory {

        @Override
        <AdapterType> AdapterType getAdapter(Object adaptable, Class<AdapterType> type) {
            def adapter = null

            if (adaptable instanceof ResourceResolver && type == ContentPolicyManager) {
                adapter = [getPolicy: { null }] as ContentPolicyManager
            }

            adapter as AdapterType
        }
    }

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        iframe()
                    }
                }
                two {
                    "jcr:content" {
                        iframe(
                            source: "/content/dam/waters/pdf-test/test-pdf.pdf"
                        )
                    }
                }
            }
        }

        slingContext.registerAdapterFactory(new MockContentPolicyManagerAdapterFactory(),
            [ResourceResolver.name] as String[], [ContentPolicyManager.name] as String[])
    }

    def "get iframe source"() {
        setup:
        def iframe = requestBuilder.build {
            path = resourcePath
        }.adaptTo(Iframe)

        expect:
        iframe.source == source

        where:
        resourcePath                             | source
        "/content/waters/one/jcr:content/iframe" | null
        "/content/waters/two/jcr:content/iframe" | "/content/dam/waters/pdf-test/test-pdf.pdf"
    }
}
