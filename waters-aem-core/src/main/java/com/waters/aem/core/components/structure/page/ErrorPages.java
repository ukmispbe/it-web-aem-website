package com.waters.aem.core.components.structure.page;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.core.constants.ComponentConstants;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Component(value = "Error Pages",
    group = ComponentConstants.GROUP_HIDDEN,
    path = WatersConstants.COMPONENT_PATH_STRUCTURE,
    name = WatersConstants.COMPONENT_NAME_PAGE,
    editConfig = false,
    fileName = ErrorPages.FILE_NAME,
    touchFileName = ErrorPages.FILE_NAME)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class ErrorPages {

    static final String FILE_NAME = "errorpages";

    @DialogField(fieldLabel = "Error Pages Path",
        fieldDescription = "Enter or Select The Path to Error Pages")
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @Inject
    @SuppressWarnings("squid:S1700")
    private String errorPages;

    public String getErrorPages() {
        return errorPages;
    }
}
