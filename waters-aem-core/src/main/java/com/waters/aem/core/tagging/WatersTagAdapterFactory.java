package com.waters.aem.core.tagging;

import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.sling.api.adapter.AdapterFactory;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;

@Component(service = AdapterFactory.class, property = {
    AdapterFactory.ADAPTABLE_CLASSES + "=org.apache.sling.api.resource.Resource",
    AdapterFactory.ADAPTABLE_CLASSES + "=org.apache.sling.api.resource.ResourceResolver",
    AdapterFactory.ADAPTER_CLASSES + "=com.day.cq.tagging.Tag",
    AdapterFactory.ADAPTER_CLASSES + "=com.day.cq.tagging.TagManager",
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

        if (adaptable instanceof Resource && type == Tag.class) {
            final Resource resource = (Resource) adaptable;

            adapter = (AdapterType) getTagManager(resource).resolve(resource.getPath());

            LOG.debug("adapted resource to waters tag : {}", adapter);
        } else if (adaptable instanceof ResourceResolver && type == TagManager.class) {
            adapter = (AdapterType) getTagManager((ResourceResolver) adaptable);

            LOG.debug("adapted resource resolver to waters tag manager : {}", adapter);
        } else {
            LOG.debug("unable to adapt object : {} to type : {}", adaptable, type);
        }

        return adapter;
    }

    private TagManager getTagManager(final Resource resource) {
        return new WatersTagManager(tagManagerFactory.getTagManager(resource.getResourceResolver()));
    }

    private TagManager getTagManager(final ResourceResolver resourceResolver) {
        return new WatersTagManager(tagManagerFactory.getTagManager(resourceResolver));
    }
}
