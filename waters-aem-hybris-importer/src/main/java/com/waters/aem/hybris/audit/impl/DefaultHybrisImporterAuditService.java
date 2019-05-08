package com.waters.aem.hybris.audit.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.commons.jcr.JcrUtil;
import com.google.common.base.Joiner;
import com.waters.aem.hybris.audit.HybrisImporterAuditRecord;
import com.waters.aem.hybris.audit.HybrisImporterAuditService;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static com.google.common.base.Preconditions.checkArgument;

@Component(service = HybrisImporterAuditService.class)
public final class DefaultHybrisImporterAuditService implements HybrisImporterAuditService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisImporterAuditService.class);

    private static final Joiner.MapJoiner MAP_JOINER = Joiner.on("|").withKeyValueSeparator(":");

    private static final String DATE_FORMAT = "yyyy/MM/dd";

    private static final String NAME_AUDIT = "audit";

    private static final String NAME_PREFIX_RECORD = "record";

    private static final String PATH_AUDIT = HybrisImporterConstants.PATH_COMMERCE + "/" + NAME_AUDIT;

    private static final String DATE_FORMAT_YEAR = "yyyy";

    private static final String DATE_FORMAT_MONTH = "MM";

    private static final String DATE_FORMAT_DAY = "dd";

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public void createAuditRecord(final HybrisImporterExecutionResult result) {
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Node auditRecordNode = createAuditRecordNode(resourceResolver);

            auditRecordNode.setProperty(HybrisImporterConstants.PROPERTY_RESULTS, result.getResults()
                .stream()
                .map(HybrisImporterResult :: toMap)
                .map(MAP_JOINER :: join)
                .toArray(String[] :: new));
            auditRecordNode.setProperty(HybrisImporterConstants.PROPERTY_DURATION, result.getDuration());

            LOG.info("created audit record : {}", auditRecordNode.getPath());

            resourceResolver.commit();
        } catch (LoginException | RepositoryException | PersistenceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void createAuditRecord(final Throwable throwable) {
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Node auditRecordNode = createAuditRecordNode(resourceResolver);

            auditRecordNode.setProperty(HybrisImporterConstants.PROPERTY_EXCEPTION_STACK_TRACE,
                ExceptionUtils.getStackTrace(throwable));

            LOG.info("created audit record : {}", auditRecordNode.getPath());

            resourceResolver.commit();
        } catch (LoginException | RepositoryException | PersistenceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public HybrisImporterAuditRecord getAuditRecord(final String path) {
        final HybrisImporterAuditRecord auditRecord;

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource auditRecordResource = resourceResolver.getResource(path);

            auditRecord = auditRecordResource == null ? null :
                auditRecordResource.adaptTo(HybrisImporterAuditRecord.class);
        } catch (LoginException e) {
            throw new RuntimeException(e);
        }

        return auditRecord;
    }

    @Override
    public List<HybrisImporterAuditRecord> getAuditRecords() {
        final List<HybrisImporterAuditRecord> auditRecords;

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource auditResource = resourceResolver.getResource(PATH_AUDIT);

            auditRecords = findAuditRecords(auditResource);
        } catch (LoginException e) {
            throw new RuntimeException(e);
        }

        return auditRecords;
    }

    @Override
    public List<HybrisImporterAuditRecord> getAuditRecords(final Calendar startDate, final Calendar endDate) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

        checkArgument(!startDate.after(endDate), "start date %s must not be after end date %s",
            dateFormat.format(startDate.getTime()), dateFormat.format(endDate.getTime()));

        final List<HybrisImporterAuditRecord> auditRecords = new ArrayList<>();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource auditResource = resourceResolver.getResource(PATH_AUDIT);

            Calendar currentDate = startDate;

            while (!currentDate.after(endDate)) {
                final String currentDateRelativePath = dateFormat.format(startDate.getTime());

                final Resource currentDateResource = auditResource.getChild(currentDateRelativePath);

                if (currentDateResource != null) {
                    for (final Resource child : currentDateResource.getChildren()) {
                        auditRecords.add(child.adaptTo(HybrisImporterAuditRecord.class));
                    }
                }

                currentDate.add(Calendar.DAY_OF_MONTH, 1);
            }
        } catch (LoginException e) {
            throw new RuntimeException(e);
        }

        return auditRecords;
    }

    @Activate
    protected void activate() throws RepositoryException, LoginException {
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            createAuditNode(resourceResolver);
        }
    }

    private List<HybrisImporterAuditRecord> findAuditRecords(final Resource resource) {
        final List<HybrisImporterAuditRecord> auditRecords = new ArrayList<>();

        for (final Resource child : resource.getChildren()) {
            if (child.getName().startsWith(NAME_PREFIX_RECORD)) {
                auditRecords.add(child.adaptTo(HybrisImporterAuditRecord.class));
            }

            auditRecords.addAll(findAuditRecords(child));
        }

        return auditRecords;
    }

    private Node createAuditRecordNode(final ResourceResolver resourceResolver) throws RepositoryException {
        final Calendar date = Calendar.getInstance();

        final String year = new SimpleDateFormat(DATE_FORMAT_YEAR).format(date.getTime());
        final String month = new SimpleDateFormat(DATE_FORMAT_MONTH).format(date.getTime());
        final String day = new SimpleDateFormat(DATE_FORMAT_DAY).format(date.getTime());

        final Session session = resourceResolver.adaptTo(Session.class);

        final String parentNodePath = new StringBuilder()
            .append(PATH_AUDIT)
            .append("/")
            .append(year)
            .append("/")
            .append(month)
            .append("/")
            .append(day)
            .toString();

        final Node auditRecordFolder = JcrUtil.createPath(parentNodePath, JcrResourceConstants.NT_SLING_FOLDER,
            session);

        final Node auditRecordNode = JcrUtil.createUniqueNode(auditRecordFolder, NAME_PREFIX_RECORD,
            JcrConstants.NT_UNSTRUCTURED, session);

        auditRecordNode.addMixin(JcrConstants.MIX_CREATED);

        return auditRecordNode;
    }

    private void createAuditNode(final ResourceResolver resourceResolver) throws RepositoryException {
        final Session session = resourceResolver.adaptTo(Session.class);
        final Node commerceRootNode = session.getNode(HybrisImporterConstants.PATH_COMMERCE);

        if (!commerceRootNode.hasNode(NAME_AUDIT)) {
            LOG.info("audit folder node does not exist, adding");

            commerceRootNode.addNode(NAME_AUDIT, JcrResourceConstants.NT_SLING_FOLDER);

            session.save();
        }
    }
}
