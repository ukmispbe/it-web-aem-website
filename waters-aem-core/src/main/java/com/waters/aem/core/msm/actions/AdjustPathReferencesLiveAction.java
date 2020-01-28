package com.waters.aem.core.msm.actions;

import com.day.cq.commons.LanguageUtil;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.ActionConfig;
import com.day.cq.wcm.msm.api.LiveAction;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.io.JSONWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.PropertyType;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import java.util.ArrayList;
import java.util.List;

public class AdjustPathReferencesLiveAction implements LiveAction {

    private static final Logger LOG = LoggerFactory.getLogger(AdjustPathReferencesLiveAction.class);
    protected final String name;

    public AdjustPathReferencesLiveAction(final String name) {
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

            final String destinationLanguage = LanguageUtil.getLanguageRoot(target.getPath());

            final String destinationLanguageCode = destinationLanguage.substring(destinationLanguage.lastIndexOf("/"));

            final String sourceLanguageRoot = LanguageUtil.getLanguageRoot(source.getPath());

            final String sourceLanguageCode = sourceLanguageRoot.substring(sourceLanguageRoot.lastIndexOf("/"));

            if (shouldAdjustLanguage(sourceLanguageCode, destinationLanguageCode)) {
                try {

                    final PropertyIterator properties = target.adaptTo(Node.class).getProperties();

                    while (properties.hasNext()) {
                        final Property prop = properties.nextProperty();

                        if(prop.getType() == PropertyType.STRING) {
                            if (prop.isMultiple()) {
                                final  List<String> adjustedValues = new ArrayList<>();

                                for (final Value value : prop.getValues()) {
                                    final String valueString = value.getString();

                                    if (isPossiblePath(valueString)) {
                                        final String languageCode = getPropertyLanguageCode(valueString);

                                        if (shouldAdjustLanguage(languageCode, destinationLanguageCode)) {
                                            adjustedValues.add(valueString.replace(languageCode, destinationLanguageCode));
                                        } else {
                                            adjustedValues.add(valueString);
                                        }
                                    }
                                }
                                prop.setValue(adjustedValues.toArray(new String[0]));
                            } else {
                                final String value = prop.getString();

                                if (isPossiblePath(value)) {
                                    final String languageCode = getPropertyLanguageCode(value);

                                    if (shouldAdjustLanguage(languageCode, destinationLanguageCode)) {
                                        prop.setValue(value.replace(languageCode, destinationLanguageCode));
                                    }
                                }
                            }
                        }
                    }
                } catch (RepositoryException e) {
                    LOG.error("Error getting properties.", e);
                }
            }

            if (autoSave) {
                try {
                    source.getResourceResolver().commit();
                } catch (final PersistenceException e) {
                    LOG.error("Error persisting changes to rolled out copy.", e);
                }
            }
        }
    }

    private boolean shouldAdjustLanguage(final String languageCode, final String destinationLanguageCode) {
        return !languageCode.equals(destinationLanguageCode);
    }

    private String getPropertyLanguageCode(final String value) {
        final String lang = LanguageUtil.getLanguageRoot(value);
        return lang.substring(lang.lastIndexOf("/"));
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