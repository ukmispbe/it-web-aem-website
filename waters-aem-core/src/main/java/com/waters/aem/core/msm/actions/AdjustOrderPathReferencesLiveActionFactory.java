package com.waters.aem.core.msm.actions;

import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveActionFactory;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Component;

@Component(property = { LiveActionFactory.LIVE_ACTION_NAME + "=" + AdjustOrderPathReferencesLiveActionFactory.NAME })
public class AdjustOrderPathReferencesLiveActionFactory implements LiveActionFactory<AdjustOrderPathReferencesLiveAction>{
    static final String NAME = "adjustOrderPathReferences";

    @Override
    public String createsAction() {
        return NAME;
    }

    @Override
    public AdjustOrderPathReferencesLiveAction createAction(final Resource resource) throws WCMException {
        return new AdjustOrderPathReferencesLiveAction(NAME);
    }
}
