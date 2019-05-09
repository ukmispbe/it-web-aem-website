package com.waters.aem.core.tagging;

import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.sling.api.adapter.AdapterFactory;
import org.apache.sling.api.resource.Resource;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;

@SuppressWarnings("ALL")
@Component(service = AdapterFactory.class, property = {
    AdapterFactory.ADAPTABLE_CLASSES + "=org.apache.sling.api.resource.Resource",
    AdapterFactory.ADAPTER_CLASSES + "=com.waters.aem.core.tagging.WatersTag",
    Constants.SERVICE_RANKING + "=" + Integer.MIN_VALUE
})
public final class WatersTagAdapterFactory implements AdapterFactory {

    private static final Logger LOG = LoggerFactory.getLogger(WatersTagAdapterFactory.class);

    @Reference
    private JcrTagManagerFactory tagManagerFactory;

    @CheckForNull
    @Override
    @SuppressWarnings("squid:S00119")
    public <AdapterType> AdapterType getAdapter(@Nonnull final Object adaptable,
        @Nonnull final Class<AdapterType> type) {
        AdapterType adapter = null;

        if (adaptable instanceof Resource && type == WatersTag.class) {
            final Resource resource = (Resource) adaptable;
            final Tag tag = getTagManager(resource).resolve(resource.getPath());

            adapter = (AdapterType) new WatersTag(tag);

            LOG.debug("adapted resource to waters tag : {}", adapter);
        } else {
            LOG.debug("unable to adapt object : {} to type : {}", adaptable, type);
        }

        return adapter;
    }

    private TagManager getTagManager(final Resource resource) {
        return tagManagerFactory.getTagManager(resource.getResourceResolver());
    }
}
