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

@SuppressWarnings("all")
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

            final String destinationLanguageCode = destinationLanguage.substring(destinationLanguage.lastIndexOf('/'));

            final String sourceLanguageRoot = LanguageUtil.getLanguageRoot(source.getPath());

            final String sourceLanguageCode = sourceLanguageRoot.substring(sourceLanguageRoot.lastIndexOf('/'));

            final String destinationUrl = target.getPath();

            if (shouldAdjustLanguage(sourceLanguageCode, destinationLanguageCode) || destinationUrl.contains(WatersConstants.ORDER_ROOT_PATH)) {
                try {

                    final PropertyIterator properties = target.adaptTo(Node.class).getProperties();

                    while (properties.hasNext()) {
                        final Property prop = properties.nextProperty();

                        if(prop.getType() == PropertyType.STRING) {
                            if (prop.isMultiple()) {
                                adjustMultiValuedProperties(prop, destinationLanguageCode,destinationUrl);
                            } else {
                                adjustSingleValueProperty(prop, destinationLanguageCode,destinationUrl, target);
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

    private boolean shouldAdjustReferences(final String destinationUrl) {
        return destinationUrl.contains(WatersConstants.ORDER_ROOT_PATH);
    }

    private String getPropertyLanguageCode(final String value) {
        final String lang = LanguageUtil.getLanguageRoot(value);
        return lang.substring(lang.lastIndexOf('/'));
    }

    private boolean isPossiblePath(final String value) {
        return (value.startsWith(WatersConstants.ROOT_PATH)||(value.contains("/content/experience-fragments")));
    }

    private void adjustMultiValuedProperties(final Property prop, final String destinationLanguageCode, final String destinationUrl)
    throws RepositoryException {
        final  List<String> adjustedValues = new ArrayList<>();

        for (final Value value : prop.getValues()) {
            final String valueString = value.getString();

            if (isPossiblePath(valueString)) {
                final String languageCode = getPropertyLanguageCode(valueString);

                if (shouldAdjustLanguage(languageCode, destinationLanguageCode)) {
                    adjustedValues.add(valueString.replace(languageCode, destinationLanguageCode));
                } else if (shouldAdjustReferences(destinationUrl)){
                    adjustedValues.add(valueString.replace(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS, WatersConstants.ORDER_ROOT_PATH));
                } else {
                    adjustedValues.add(valueString);
                }
            }
        }
        if(adjustedValues.size() > 0) {
            prop.setValue(adjustedValues.toArray(new String[0]));
        }
    }

    private void adjustSingleValueProperty(final Property prop, final String destinationLanguageCode, final String destinationUrl, final Resource targetResource)
    throws RepositoryException {
        final String value = prop.getString();
        Node node = targetResource.adaptTo(Node.class);		

        if (isPossiblePath(value)) {
            final String languageCode = getPropertyLanguageCode(value);

            if (shouldAdjustLanguage(languageCode, destinationLanguageCode)) {
                if( !languageCode.equalsIgnoreCase("/zh_tw") && !languageCode.equalsIgnoreCase("/pt_br")){
                    prop.setValue(value.replace(languageCode, destinationLanguageCode));
                }

            }
            else if (shouldAdjustReferences(destinationUrl)){
                prop.setValue(value.replace(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS, WatersConstants.ORDER_ROOT_PATH));
            }
		} else if (shouldAdjustReferences(destinationUrl)) {
			if (prop.getParent().getName().equalsIgnoreCase("breadcrumb")) {
				node.setProperty("disableShadowing", "true");
				node.setProperty("startLevel", "3");
			} else if (prop.getParent().getName().equalsIgnoreCase("navigation")) {
				node.setProperty("disableShadowing", "true");
			} else if (prop.getParent().getPath().contains("/footer/par/experiencefragment")) {
				node.setProperty("fragmentPath", "");
			} else if (prop.getParent().getPath().contains("/root/sectioncontainer")) {
				if (node.getProperty("title").getString().equals("Product Support")) {
					node.setProperty("hideOnEproc", "true");
				}
			}
		}
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