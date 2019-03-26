package com.waters.aem.core.services.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import com.google.common.collect.ImmutableList;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Base class for replication preprocessing.
 */
public abstract class AbstractReplicationPreprocessor<T> implements Preprocessor {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractReplicationPreprocessor.class);

    private static final List<ReplicationActionType> SUPPORTED_ACTION_TYPES = ImmutableList.of(
        ReplicationActionType.DEACTIVATE,
        ReplicationActionType.DELETE
    );

    @Override
    public final void preprocess(final ReplicationAction replicationAction, final ReplicationOptions replicationOptions)
        throws ReplicationException {
        final ReplicationActionType replicationActionType = replicationAction.getType();

        if (isEnabled() && SUPPORTED_ACTION_TYPES.contains(replicationAction.getType())) {
            try (final ResourceResolver resourceResolver = getResourceResolverFactory().getServiceResourceResolver(
                null)) {
                for (final T item : getItems(replicationAction, resourceResolver)) {
                    preprocessItem(replicationActionType, resourceResolver, item);
                }
            } catch (LoginException e) {
                LOG.error("error authenticating resource resolver", e);

                throw new ReplicationException(e);
            }
        }
    }

    /**
     * Check if the processor is enabled.
     *
     * @return true if enabled
     */
    protected abstract boolean isEnabled();

    /**
     * Process the replicated item.
     *
     * @param replicationActionType replication action type
     * @param resourceResolver admin resource resolver
     * @param item item to be processed
     * @throws ReplicationException if error occurs in processing
     */
    protected abstract void preprocessItem(final ReplicationActionType replicationActionType,
        final ResourceResolver resourceResolver, final T item) throws ReplicationException;

    /**
     * Get the list of items to process from the replication action.
     *
     * @param replicationAction replication action
     * @param resourceResolver admin resource resolver
     * @return list of items to process
     */
    protected abstract List<T> getItems(final ReplicationAction replicationAction,
        final ResourceResolver resourceResolver);

    /**
     * Get the resource resolver factory that is bound to the implementing service instance.
     *
     * @return resource resolver factory
     */
    protected abstract ResourceResolverFactory getResourceResolverFactory();
}
