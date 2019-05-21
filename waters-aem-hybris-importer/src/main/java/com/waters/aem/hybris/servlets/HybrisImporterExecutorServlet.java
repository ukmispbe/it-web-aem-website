package com.waters.aem.hybris.servlets;

import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import com.waters.aem.hybris.executor.options.HybrisImporterOptions;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import java.io.IOException;

@SlingServletPaths("/bin/importer/executor")
@Component(service = Servlet.class)
public final class HybrisImporterExecutorServlet extends AbstractJsonResponseServlet {

    @Reference
    private HybrisImporterExecutorService executorService;

    @Override
    protected void doPost(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        executorService.execute(HybrisImporterOptions.fromRequest(request));

        response.sendRedirect(LinkBuilderFactory.forPath(HybrisImporterConstants.IMPORTER_PAGE_PATH)
            .build()
            .getHref());
    }
}
