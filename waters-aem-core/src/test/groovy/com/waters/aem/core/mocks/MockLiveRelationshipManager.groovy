package com.waters.aem.core.mocks

import com.day.cq.wcm.api.Page
import com.day.cq.wcm.api.WCMException
import com.day.cq.wcm.msm.api.LiveCopy
import com.day.cq.wcm.msm.api.LiveRelationship
import com.day.cq.wcm.msm.api.LiveRelationshipManager
import com.day.cq.wcm.msm.api.RolloutConfig
import com.day.cq.wcm.msm.api.RolloutManager.Trigger
import org.apache.sling.api.resource.Resource
import org.apache.sling.api.resource.ResourceResolver

import javax.jcr.RangeIterator

class MockLiveRelationshipManager implements LiveRelationshipManager {

    @Override
    boolean hasLiveRelationship(Resource resource) {
        throw new UnsupportedOperationException()
    }

    @Override
    boolean isSource(Resource resource) {
        throw new UnsupportedOperationException()
    }

    @Override
    Collection<LiveRelationship> getLiveRelationships(Page page, Trigger trigger, String[] strings,
        boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    Collection<LiveRelationship> getLiveRelationships(Resource resource, Trigger trigger, String[] strings,
        boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    RangeIterator getLiveRelationships(Resource resource, String s, Trigger trigger) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    LiveRelationship getLiveRelationship(Resource resource, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    RangeIterator getChildren(LiveRelationship liveRelationship,
        ResourceResolver resourceResolver) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    LiveRelationship establishRelationship(Page page, Page page1, boolean b, boolean b1,
        RolloutConfig... rolloutConfigs) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void endRelationship(Resource resource, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void cancelRelationship(ResourceResolver resourceResolver, LiveRelationship liveRelationship, boolean b,
        boolean b1) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void reenableRelationship(ResourceResolver resourceResolver, LiveRelationship liveRelationship,
        boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void cancelPropertyRelationship(ResourceResolver resourceResolver, LiveRelationship liveRelationship,
        String[] strings, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void reenablePropertyRelationship(ResourceResolver resourceResolver, LiveRelationship liveRelationship,
        String[] strings, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    Map<String, Page> getSkippedSourcePages(Page page) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void addSkippedPages(Page page, String[] strings, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    void removeSkippedPages(Page page, String[] strings, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    Map<String, LiveCopy> getLiveCopies() throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    LiveCopy getLiveCopy(Resource resource) throws WCMException {
        throw new UnsupportedOperationException()
    }

    @Override
    boolean isInBlueprint(Resource resource) {
        throw new UnsupportedOperationException()
    }

    @Override
    boolean isLiveCopy(Resource resource) {
        throw new UnsupportedOperationException()
    }

    @Override
    void detach(Resource resource, boolean b) throws WCMException {
        throw new UnsupportedOperationException()
    }
}
