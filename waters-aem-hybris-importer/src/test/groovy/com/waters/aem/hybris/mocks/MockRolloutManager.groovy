package com.waters.aem.hybris.mocks

import com.day.cq.wcm.api.WCMException
import com.day.cq.wcm.msm.api.LiveRelationship
import com.day.cq.wcm.msm.api.RolloutManager
import org.apache.sling.api.resource.ResourceResolver

import javax.jcr.Node
import javax.jcr.RepositoryException


class MockRolloutManager implements RolloutManager{

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
}
