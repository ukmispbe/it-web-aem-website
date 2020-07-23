package com.waters.aem.core.msm.actions;

import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.ActionConfig;
import com.day.cq.wcm.msm.api.LiveAction;
import com.day.cq.wcm.msm.api.LiveRelationship;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.io.JSONWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import java.util.ArrayList;
import java.util.List;

import com.waters.aem.core.constants.WatersConstants;

public class AdjustOrderPathReferencesLiveAction implements LiveAction {

    private static final Logger LOG = LoggerFactory.getLogger(AdjustOrderPathReferencesLiveAction.class);
    protected final String name;

    public AdjustOrderPathReferencesLiveAction(final String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void execute(final Resource source, final Resource target, final LiveRelationship relation,
                        final boolean autoSave, final boolean isResetRollout) throws WCMException {
        if (source != null && target != null) {
            final String destinationUrl = target.getPath();

            if (destinationUrl.contains(WatersConstants.ORDER_ROOT_PATH)) {
                try {
                    final PropertyIterator properties = target.adaptTo(Node.class).getProperties();

                    while (properties.hasNext()) {
                        final Property prop = properties.nextProperty();

                        if (prop.getType() == PropertyType.STRING) {
                            if (prop.isMultiple()) {
                                adjustMultiValuedProperties(prop);
                            } else {
                                adjustSingleValueProperty(prop);
                            }
                        }
                    }
                } catch (RepositoryException e) {
                    LOG.error("Error getting properties.", e);
                }
            }
        }
    }

    private void adjustSingleValueProperty(final Property prop)
            throws RepositoryException {
        final String value = prop.getString();

        if (isPossiblePath(value)) {
            prop.setValue(value.replace(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS, WatersConstants.ORDER_ROOT_PATH));
        }
    }

    private void adjustMultiValuedProperties(final Property prop)
            throws RepositoryException {
        final List<String> adjustedValues = new ArrayList<>();

        for (final Value value : prop.getValues()) {
            final String valueString = value.getString();

            if (isPossiblePath(valueString)) {
                adjustedValues.add(valueString.replace(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS, WatersConstants.ORDER_ROOT_PATH));
            } else {
                adjustedValues.add(valueString);
            }
        }
        if (adjustedValues.size() > 0) {
            prop.setValue(adjustedValues.toArray(new String[0]));
        }
    }

    private boolean isPossiblePath(final String value) {
        return value.startsWith(WatersConstants.ROOT_PATH);
    }

    // deprecated methods

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public void execute(final ResourceResolver resolver, final LiveRelationship relation, final ActionConfig config,
                        final boolean autoSave) throws WCMException {
        //do nothing
    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public void execute(final ResourceResolver resolver, final LiveRelationship relation, final ActionConfig config,
                        final boolean autoSave, final boolean isResetRollout) throws WCMException {
        //do nothing

    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public String getTitle() {
        return null;
    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public int getRank() {
        return 0;
    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public String[] getPropertiesNames() {
        return new String[0];
    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public String getParameterName() {
        return null;
    }

    /**
     * @deprecated (when, why, refactoring advice...)
     */
    @Deprecated
    @Override
    public void write(final JSONWriter out) throws JSONException {
        //do nothing
    }

}
