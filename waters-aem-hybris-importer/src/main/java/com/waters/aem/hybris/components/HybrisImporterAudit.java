package com.waters.aem.hybris.components;

import com.waters.aem.hybris.audit.HybrisImporterAuditRecord;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class)
public final class HybrisImporterAudit {

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private HybrisImporterAuditService auditService;

    private HybrisImporterAuditRecord auditRecord;

    @PostConstruct
    void init() {
        final String suffix = request.getRequestPathInfo().getSuffix();

        auditRecord = suffix == null ? null : auditService.getAuditRecord(suffix);
    }

    public Boolean isDisplayAuditRecord() {
        return auditRecord != null;
    }

    public HybrisImporterAuditRecord getAuditRecord() {
        return auditRecord;
    }
}
