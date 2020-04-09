package com.waters.aem.core.components.content;

import com.waters.aem.core.WatersSpec;

class LabelsSpec extends WatersSpec {

    def setupSpec() {
        pageBuilder.content {
            waters {
                one {
                    "jcr:content" {
                        labels()
                    }
                }
                two {
                    "jcr:content" {
                        labels(
                               
                        )
                    }
                }
            }
        }
    }

}

