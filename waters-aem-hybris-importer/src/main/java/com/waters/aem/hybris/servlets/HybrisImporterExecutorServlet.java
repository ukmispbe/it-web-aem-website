package com.waters.aem.hybris.servlets;

import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.executor.HybrisImporterExecutorService;
import com.waters.aem.hybris.executor.options.HybrisImporterOptions;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@SlingServletPaths("/bin/importer/executor")
@Component(service = Servlet.class)
public final class HybrisImporterExecutorServlet extends AbstractJsonResponseServlet {

    private static final String PARAMETER_REPLICATE = "replicate";

    private static final String PARAMETER_PRODUCT_CODE = "productCode";

    @Reference
    private HybrisImporterExecutorService executorService;

    @Override
    protected void doPost(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        final Boolean replicate = Boolean.valueOf(request.getParameter(PARAMETER_REPLICATE));
        final List<String> productCodes = Arrays.asList(
            ArrayUtils.nullToEmpty(request.getParameterValues(PARAMETER_PRODUCT_CODE)));

        final HybrisImporterOptions options = new HybrisImporterOptions()
            .withProductCodes(productCodes)
            .replicate(replicate);

        executorService.execute(options);

        response.sendRedirect(LinkBuilderFactory.forPath(HybrisImporterConstants.IMPORTER_PAGE_PATH)
            .build()
            .getHref());
    }
}
