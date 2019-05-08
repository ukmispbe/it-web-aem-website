package com.waters.aem.hybris.audit;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.base.Splitter;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
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
    private String[] results;

    @ValueMapValue(name = HybrisImporterConstants.PROPERTY_EXCEPTION_STACK_TRACE)
    private String exceptionStackTrace;

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
        return Arrays.stream(results)
            .map(value -> HybrisImporterResult.fromMap(MAP_SPLITTER.split(value)))
            .collect(Collectors.toList());
    }

    public String getExceptionStackTrace() {
        return exceptionStackTrace;
    }
}
