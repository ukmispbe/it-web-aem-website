package com.waters.aem.core.servlets;

import com.adobe.granite.ui.components.rendercondition.RenderCondition;
import com.adobe.granite.ui.components.rendercondition.SimpleRenderCondition;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
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
 * Render condition to evaluate if the current page is at the country level.
 */
@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = WatersConstants.RENDER_CONDITION_COMMERCE_TAB,
    methods = "GET"
)
public final class CommerceTabRenderConditionServlet extends SlingSafeMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(CommerceTabRenderConditionServlet.class);

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
                         @Nonnull final SlingHttpServletResponse response) {
        final String path = request.getParameter("item");

        boolean isCountryPage = false;
        boolean isLanguagePage = false;

        if (path != null) {
            final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);
            final PageDecorator currentPage = pageManager.getPage(path);

            isCountryPage = currentPage.getAbsoluteParent(WatersConstants.LEVEL_SITE_ROOT).getPath()
                                .equals(currentPage.getPath());

            final PageDecorator languagePage = currentPage.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT);

            if (languagePage != null) {
                isLanguagePage = languagePage.getPath().equals(currentPage.getPath());
            }
        }

        LOG.debug("current page : {}, is country page: {}, is language page: {}", path, isCountryPage, isLanguagePage);

        request.setAttribute(RenderCondition.class.getName(),
                new SimpleRenderCondition(isCountryPage || isLanguagePage));
    }
}