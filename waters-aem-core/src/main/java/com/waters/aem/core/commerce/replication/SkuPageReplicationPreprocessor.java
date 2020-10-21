package com.waters.aem.core.commerce.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.wcm.api.NameConstants;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.replication.AbstractReplicationPreprocessor;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
* Replication preprocessor to modify sku page content, such as page properties, as it is being replicated.
*/
@Component(service = Preprocessor.class)
public final class SkuPageReplicationPreprocessor extends AbstractReplicationPreprocessor<PageDecorator> {

    private static final Logger LOG = LoggerFactory.getLogger(SkuPageReplicationPreprocessor.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;
    
    @Override
    protected boolean isEnabled() {
        // always enabled
        return true;
    }

    @Override
	protected List<ReplicationActionType> getSupportedActionTypes() {
		return ImmutableList.of(ReplicationActionType.ACTIVATE);
	}

    @Override
    protected void preprocessItem(final ReplicationActionType replicationActionType,
			final ResourceResolver resourceResolver, final PageDecorator page) throws ReplicationException {
		LOG.debug("Preprocessing replication action type : {} for page : {}", replicationActionType, page.getPath());

		try {
			if (page.getPath().contains(WatersConstants.ORDER_ROOT_PATH + "/en")) {
				setSkuVanityPath(page);
				resourceResolver.commit();
			}
		} catch (PersistenceException e) {
			LOG.error("Error updating vanityPath for : " + page.getPath() + ", aborting page activation", e);

			throw new ReplicationException(e);
		}
	}

    @Override
    protected List<PageDecorator> getItems(final ReplicationAction replicationAction,
			final ResourceResolver resourceResolver) {
		final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

		return Arrays.stream(replicationAction.getPaths()).map(pageManager::getPage).filter(Templates::isSkuPage)
				.collect(Collectors.toList());
	}

    @Override
	protected ResourceResolverFactory getResourceResolverFactory() {
		return resourceResolverFactory;
	}

	private void setSkuVanityPath(final PageDecorator page){
		final ModifiableValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);
		final String code = properties.get(WatersCommerceConstants.PROPERTY_CODE, String.class);
		if (code != null) {
			properties.put(NameConstants.PN_SLING_VANITY_PATH, WatersConstants.ORDER_ROOT_PATH + "/sku/" + code);
			properties.put("sling:redirect", true);
		}
	}
}
