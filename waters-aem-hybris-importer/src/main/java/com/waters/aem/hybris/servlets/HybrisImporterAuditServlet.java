package com.waters.aem.hybris.servlets;

import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import com.waters.aem.hybris.audit.HybrisImporterAuditRecord;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.ServletException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SlingServletPaths("/bin/importer/audit")
public final class HybrisImporterAuditServlet extends AbstractJsonResponseServlet {

    private static final String PARAMETER_START_DATE = "startDate";

    private static final String PARAMETER_END_DATE = "endDate";

    private static final String DATE_FORMAT = "yyyy-MM-dd";

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
            data = getAuditRecords(request)
                .stream()
                .map(auditRecord -> {
                    final String href = LinkBuilderFactory.forPath("")
                        .addSelector("audit")
                        .setSuffix(auditRecord.getPath())
                        .build()
                        .getHref();

                    final Map<String, Object> map = new HashMap<>();

                    map.put("href", href);
                    map.put("duration", auditRecord.getDuration());
                    map.put("date", new SimpleDateFormat(DATE_FORMAT_DISPLAY).format(auditRecord.getDate().getTime()));
                    map.put("success", auditRecord.getExceptionStackTrace().isEmpty());
                    map.put("exceptionStackTrace", auditRecord.getExceptionStackTrace());

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
                .map(result -> new HashMap<String, Object>(result.toMap()))
                .collect(Collectors.toList());
        }

        writeJsonResponse(response, Collections.singletonMap("data", data));

    }

    private List<HybrisImporterAuditRecord> getAuditRecords(SlingHttpServletRequest request) throws ServletException {
        final String startDateParameter = request.getParameter(PARAMETER_START_DATE);
        final String endDateParameter = request.getParameter(PARAMETER_END_DATE);

        final List<HybrisImporterAuditRecord> auditRecords;

        if (startDateParameter == null && endDateParameter == null) {
            auditRecords = auditService.getAuditRecords();
        } else {
            final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

            final Calendar startDate = Calendar.getInstance();
            final Calendar endDate = Calendar.getInstance();

            try {
                startDate.setTime(dateFormat.parse(startDateParameter));
                endDate.setTime(dateFormat.parse(endDateParameter));

                auditRecords = auditService.getAuditRecords(startDate, endDate);
            } catch (ParseException e) {
                throw new ServletException(e);
            }
        }

        auditRecords.sort(Comparator.comparing(auditRecord -> auditRecord.getDate().getTimeInMillis()));

        return auditRecords;
    }
}
