package com.waters.aem.core.servlets;

import com.adobe.granite.ui.components.rendercondition.RenderCondition;
import com.adobe.granite.ui.components.rendercondition.SimpleRenderCondition;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;

/**
 * Render condition to evaluate if the current page is an Application Notes template.
 */
@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = WatersConstants.RENDER_CONDITION_APPLICATION_NOTES_TEMPLATE,
    methods = "GET"
)
public final class ApplicationNotesTemplateRenderConditionServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationNotesTemplateRenderConditionServlet.class);

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) {
        final String path = request.getParameter("item");

        boolean isApplicationNotesTemplate = false;

        if (path != null) {
            final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);
            final PageDecorator currentPage = pageManager.getPage(path);

            isApplicationNotesTemplate = Templates.isApplicationNotesPage(currentPage);
        }

        LOG.debug("current page : {}, is application notes template : {}", path, isApplicationNotesTemplate);

        request.setAttribute(RenderCondition.class.getName(), new SimpleRenderCondition(isApplicationNotesTemplate));
    }
}
