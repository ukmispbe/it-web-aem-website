package com.waters.aem.core.servlets;

import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.core.services.notification.NotificationService;
import com.waters.aem.core.services.notification.SystemNotification;
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

@Component(service = Servlet.class)
@SlingServletPaths("/bin/waters/notifications")
public final class SystemNotificationsServlet extends AbstractJsonResponseServlet {

    private static final Logger LOG = LoggerFactory.getLogger(SystemNotificationsServlet.class);

    @Reference
    private NotificationService notificationService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        final SystemNotification notification = notificationService.getSystemNotification();

        writeJsonResponse(response, notification);
    }
}
