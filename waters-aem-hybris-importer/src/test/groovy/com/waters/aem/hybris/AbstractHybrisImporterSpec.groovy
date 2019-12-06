package com.waters.aem.hybris

import com.day.cq.wcm.api.WCMException
import com.day.cq.wcm.msm.api.LiveRelationship
import com.day.cq.wcm.msm.api.RolloutManager
import com.icfolson.aem.library.core.specs.AemLibrarySpec
import com.icfolson.aem.library.models.impl.EnumInjector
import com.waters.aem.core.commerce.services.SkuRepository
import com.waters.aem.core.services.SiteRepository
import com.waters.aem.core.services.impl.DefaultSiteRepository
import com.waters.aem.hybris.audit.HybrisImporterAuditService
import com.waters.aem.hybris.audit.mock.MockHybrisImporterAuditService
import com.waters.aem.hybris.client.HybrisClient
import com.waters.aem.hybris.client.MockHybrisClient
import com.waters.aem.hybris.importer.HybrisCatalogImporter
import com.waters.aem.hybris.importer.HybrisProductImporter
import com.waters.aem.hybris.importer.impl.DefaultHybrisCatalogImporter
import org.apache.sling.api.resource.ResourceResolver
import com.waters.aem.hybris.importer.impl.DefaultHybrisProductImporter
import com.waters.aem.hybris.mocks.MockSkuRepository

import spock.lang.Shared

import javax.jcr.Node
import javax.jcr.RepositoryException

abstract class AbstractHybrisImporterSpec extends AemLibrarySpec {

    @Shared
    HybrisCatalogImporter hybrisCatalogImporter

    @Shared
    HybrisProductImporter hybrisProductImporter

    def setupSpec() {
        slingContext.registerService(HybrisClient, new MockHybrisClient())
        slingContext.registerService(SkuRepository, new MockSkuRepository())
        slingContext.registerService(SiteRepository, new DefaultSiteRepository())
        slingContext.registerService(HybrisImporterAuditService, new MockHybrisImporterAuditService())
        slingContext.registerService(RolloutManager, new RolloutManager() {
            @Override
            void rollout(RolloutManager.RolloutParams rolloutParams) throws WCMException {

            }

            @Override
            void rollout(ResourceResolver resourceResolver, LiveRelationship liveRelationship, boolean b) throws WCMException {

            }

            @Override
            void rollout(ResourceResolver resourceResolver, LiveRelationship liveRelationship, boolean b, boolean b1) throws WCMException {

            }

            @Override
            void updateRolloutInfo(Node node, boolean b, boolean b1) throws WCMException {

            }

            @Override
            boolean isExcludedProperty(String s) {
                return false
            }

            @Override
            boolean isExcludedProperty(boolean b, String s) {
                return false
            }

            @Override
            boolean isExcludedPageProperty(String s) {
                return false
            }

            @Override
            boolean isExcludedParagraphProperty(String s) {
                return false
            }

            @Override
            boolean isExcludedNodeType(String s) {
                return false
            }

            @Override
            boolean isExcludedNode(Node node) throws RepositoryException {
                return false
            }

            @Override
            boolean isReservedProperty(String s) {
                return false
            }
        })

        slingContext.registerInjector(new EnumInjector(), Integer.MIN_VALUE)

        hybrisCatalogImporter = slingContext.registerInjectActivateService(new DefaultHybrisCatalogImporter())
        hybrisProductImporter = slingContext.registerInjectActivateService(new DefaultHybrisProductImporter())

    }

    def setup() {
        nodeBuilder.etc {
            commerce {
                products()
            }
        }
    }

    def cleanup() {
        removeAllNodes()
    }
}
