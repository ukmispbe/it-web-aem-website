package com.waters.aem.core.msm.actions;

import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveActionFactory;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Component;

@Component(property = { LiveActionFactory.LIVE_ACTION_NAME + "=" + AdjustPathReferencesLiveActionFactory.NAME })
public class AdjustPathReferencesLiveActionFactory implements LiveActionFactory<AdjustPathReferencesLiveAction> {
    static final String NAME = "adjustPathReferences";

    @Override
    public String createsAction() {
        return NAME;
    }

    @Override
    public AdjustPathReferencesLiveAction createAction(final Resource resource) throws WCMException {
        return new AdjustPathReferencesLiveAction(NAME);
    }
}
