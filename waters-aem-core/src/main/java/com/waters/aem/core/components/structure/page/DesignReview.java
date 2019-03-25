package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.AuthorizableAutocomplete;
import com.citytechinc.cq.component.annotations.widgets.authorizable.AuthorizableSelector;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "Design Review",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = DesignReview.FILE_NAME,
    touchFileName = DesignReview.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class DesignReview {

    static final String FILE_NAME = "designreview";

    @DialogField(fieldLabel = "Scientist ID",
        fieldDescription = "Enter Scientist")
    @AuthorizableAutocomplete(selector = AuthorizableSelector.USER)
    @Inject
    private String scientistId;

    @DialogField(fieldLabel = "Sci-Ops Manager ID",
        fieldDescription = "Enter Sci-Ops Manager Reviewer")
    @AuthorizableAutocomplete(selector = AuthorizableSelector.USER)
    @Inject
    private String sciOpsMgrId;

    @DialogField(fieldLabel = "Market Manager ID",
        fieldDescription = "Enter Market Manager Reviewer")
    @AuthorizableAutocomplete(selector = AuthorizableSelector.USER)
    @Inject
    private String marketMgrId;

    @DialogField(fieldLabel = "Legal Reviewer ID",
        fieldDescription = "Enter Legal Reviewer")
    @AuthorizableAutocomplete(selector = AuthorizableSelector.USER)
    @Inject
    private String legalReviewerId;

    @DialogField(fieldLabel = "Marcom Manager ID",
        fieldDescription = "Enter The Marcom Reviewer")
    @AuthorizableAutocomplete(selector = AuthorizableSelector.USER)
    @Inject
    private String marcomMgrId;

    public String getscientistId() {
        return scientistId;
    }

    public String getSciOpsMgrIdrId() {
        return sciOpsMgrId;
    }

    public String getMarcomMgrId() {
        return marcomMgrId;
    }

    public String getLegalReviewerId() {
        return legalReviewerId;
    }

    public String getMarketMgrId() {
        return marketMgrId;
    }
}
