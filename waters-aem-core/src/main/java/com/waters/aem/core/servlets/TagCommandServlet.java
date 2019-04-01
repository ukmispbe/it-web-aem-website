package com.waters.aem.core.servlets;

import com.day.cq.commons.servlets.AbstractCommandServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

@Component(service = Servlet.class)
@SlingServletPaths("/bin/tagcommand")
public final class TagCommandServlet extends AbstractCommandServlet {

    private static final Logger LOG = LoggerFactory.getLogger(TagCommandServlet.class);

    @Override
    protected void performCommand(final SlingHttpServletRequest slingHttpServletRequest,
        final SlingHttpServletResponse slingHttpServletResponse) throws ServletException, IOException {

    }
}
