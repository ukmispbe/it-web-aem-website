package com.waters.aem.core.servlets;

import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.core.services.notification.NotificationService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/notifications")
public final class SystemNotificationsServlet extends AbstractJsonResponseServlet {
    @SuppressWarnings("squid:S1068")
    private static final Logger LOG = LoggerFactory.getLogger(SystemNotificationsServlet.class);

    @Reference
    private NotificationService notificationService;

    private static final String PARAMETER_CHANNEL = "channel";


    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
            throws ServletException, IOException {
        String language = "en";
        final String channel = Optional.ofNullable(request.getParameter(PARAMETER_CHANNEL)).orElse("");
        final String[] selectors = request.getRequestPathInfo().getSelectors();

        if (selectors.length == 1) {
            language = selectors[0];
        }

        final Locale locale = new Locale(language);

        final Map<String, Object> systemNotification = notificationService.getSystemNotification(locale,channel);

        writeJsonResponse(response, systemNotification);
    }
}
