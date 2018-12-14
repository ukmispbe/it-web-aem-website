package com.waters.aem.core.servlets;

import com.adobe.granite.ui.components.rendercondition.RenderCondition;
import com.adobe.granite.ui.components.rendercondition.SimpleRenderCondition;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;

/**
 * Render condition to evaluate if the current page is an Application Notes template.
 */
@SlingServlet(resourceTypes = WatersConstants.RENDER_CONDITION_APPLICATION_NOTES_TEMPLATE, methods = "GET")
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

            final String templatePath = currentPage.getTemplatePath();

            isApplicationNotesTemplate = WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(templatePath);
        }

        LOG.debug("current page : {}, is application notes template : {}", path, isApplicationNotesTemplate);

        request.setAttribute(RenderCondition.class.getName(), new SimpleRenderCondition(isApplicationNotesTemplate));
    }
}
