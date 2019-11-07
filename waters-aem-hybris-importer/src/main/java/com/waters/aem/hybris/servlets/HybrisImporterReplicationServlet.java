package com.waters.aem.hybris.servlets;

import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.replication.HybrisImporterReplicationService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletResponse;

@SlingServletPaths("/bin/importer/replicate")
@Component(service = Servlet.class)
public final class HybrisImporterReplicationServlet extends AbstractJsonResponseServlet {

    @Reference
    private HybrisImporterAuditService auditService;

    @Reference
    private HybrisImporterReplicationService replicationService;

    @Override
    protected void doPost(@Nonnull final SlingHttpServletRequest request,
                          @Nonnull final SlingHttpServletResponse response) {
        final String suffix = request.getRequestPathInfo().getSuffix();

        if (suffix != null) {
            replicationService.replicate(auditService.getAuditRecord(suffix).getResults(), true);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}
