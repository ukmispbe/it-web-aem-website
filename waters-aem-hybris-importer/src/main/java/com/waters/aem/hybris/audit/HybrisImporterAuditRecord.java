package com.waters.aem.hybris.audit;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Objects;
import com.google.common.base.Splitter;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class HybrisImporterAuditRecord {

    private static final Splitter.MapSplitter MAP_SPLITTER = Splitter.on("|").withKeyValueSeparator(":");

    @Self
    private Resource resource;

    @ValueMapValue(name = JcrConstants.JCR_CREATED)
    private Calendar date;

    @ValueMapValue(name = HybrisImporterConstants.PROPERTY_DURATION)
    @Default(longValues = 0)
    private Long duration;

    @ValueMapValue(name = HybrisImporterConstants.PROPERTY_RESULTS)
    @Default
    private String[] resultsValue;

    @ValueMapValue(name = HybrisImporterConstants.PROPERTY_EXCEPTION_STACK_TRACE)
    @Default(values = "")
    private String exceptionStackTrace;

    private List<HybrisImporterResult> results;

    @PostConstruct
    protected void init() {
        results = Arrays.stream(resultsValue)
            .map(value -> HybrisImporterResult.fromMap(MAP_SPLITTER.split(value)))
            .collect(Collectors.toList());
    }

    public String getPath() {
        return resource.getPath();
    }

    public Calendar getDate() {
        return date;
    }

    public Long getDuration() {
        return duration;
    }

    public List<HybrisImporterResult> getResults() {
        return results;
    }

    public Map<String, Long> getStatusCounts() {
        final Map<String, Long> statusCounts = new HashMap<>();

        for (final HybrisImportStatus status : HybrisImportStatus.values()) {
            statusCounts.put(status.name(), results.stream()
                .filter(result -> result.getStatus().equals(status))
                .count());
        }

        return statusCounts;
    }

    public String getExceptionStackTrace() {
        return exceptionStackTrace;
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
            .add("path", getPath())
            .add("date", new SimpleDateFormat(HybrisImporterConstants.DATE_FORMAT_PATTERN).format(date.getTime()))
            .add("duration", duration)
            .add("success", exceptionStackTrace.isEmpty())
            .add("results", results.size())
            .toString();
    }
}
