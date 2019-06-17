package com.waters.aem.hybris.servlets;

import com.day.cq.replication.ReplicationStatus;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SlingServletPaths("/bin/importer/audit")
@Component(service = Servlet.class)
public final class HybrisImporterAuditServlet extends AbstractJsonResponseServlet {

    private static final String DATE_FORMAT_DISPLAY = "yyyy-MM-dd HH:mm:ss z";

    @Reference
    private HybrisImporterAuditService auditService;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response)
        throws ServletException, IOException {
        final String suffix = request.getRequestPathInfo().getSuffix();

        final List<Map<String, Object>> data;

        if (suffix == null) {
            data = auditService.getAuditRecords()
                .stream()
                .sorted(Comparator.comparing(auditRecord -> auditRecord.getDate().getTimeInMillis()))
                .map(auditRecord -> {
                    final String href = LinkBuilderFactory.forPath(HybrisImporterConstants.IMPORTER_PAGE_PATH)
                        .addSelector("audit")
                        .setSuffix(auditRecord.getPath())
                        .build()
                        .getHref();

                    final Map<String, Object> map = new HashMap<>();

                    map.put("href", href);
                    map.put("duration", auditRecord.getDuration() + "s");
                    map.put("date", new SimpleDateFormat(DATE_FORMAT_DISPLAY).format(auditRecord.getDate().getTime()));
                    map.put("success", auditRecord.getExceptionStackTrace().isEmpty());
                    map.put("exceptionStackTrace", auditRecord.getExceptionStackTrace());
                    map.put("count", auditRecord.getResults().size());

                    for (final HybrisImportStatus status : HybrisImportStatus.values()) {
                        map.put(status.name().toLowerCase(), auditRecord.getResults()
                            .stream()
                            .filter(result -> result.getStatus() == status)
                            .count());
                    }

                    return map;
                })
                .collect(Collectors.toList());
        } else {
            data = auditService.getAuditRecord(suffix)
                .getResults()
                .stream()
                .map(result -> getResultMap(request.getResourceResolver(), result))
                .collect(Collectors.toList());
        }

        writeJsonResponse(response, Collections.singletonMap("data", data));
    }

    private Map<String, Object> getResultMap(final ResourceResolver resourceResolver,
        final HybrisImporterResult result) {
        final Map<String, Object> resultMap = new HashMap<>(result.toMap(true));

        final Resource resource = resourceResolver.getResource(result.getPath());

        String lastReplicated = "";

        if (resource != null) {
            final ReplicationStatus replicationStatus = resource.adaptTo(ReplicationStatus.class);

            if (replicationStatus != null && replicationStatus.getLastPublished() != null) {
                lastReplicated = new SimpleDateFormat(DATE_FORMAT_DISPLAY).format(
                    replicationStatus.getLastPublished().getTime());
            }
        }

        resultMap.put("lastReplicated", lastReplicated);

        return resultMap;
    }
}
