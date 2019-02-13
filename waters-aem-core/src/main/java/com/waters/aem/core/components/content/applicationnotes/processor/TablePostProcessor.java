package com.waters.aem.core.components.content.applicationnotes.processor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.content.applicationnotes.Table;
import com.waters.aem.core.services.ExcelTableParser;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.servlets.post.Modification;
import org.apache.sling.servlets.post.SlingPostProcessor;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component(service = SlingPostProcessor.class)
public final class TablePostProcessor implements SlingPostProcessor {

    private static final Logger LOG = LoggerFactory.getLogger(TablePostProcessor.class);

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Reference
    private ExcelTableParser excelTableParser;

    @Override
    public void process(final SlingHttpServletRequest request, final List<Modification> modifications)
        throws PersistenceException {
        final Resource resource = request.getResourceResolver().getResource(request.getResource().getPath());

        if (resource == null) {
            LOG.debug("table resource no longer exists, ignoring");
        } else {
            if (resource.isResourceType(Table.RESOURCE_TYPE)) {
                final Table table = resource.adaptTo(Table.class);

                try {
                    final String tableRowsJson = getTableRowsJson(table);

                    LOG.debug("persisting table rows JSON : {}", tableRowsJson);

                    resource.adaptTo(ModifiableValueMap.class).put(Table.PROPERTY_TABLE_ROWS_JSON, tableRowsJson);

                    // add modification to list
                    modifications.add(Modification.onModified(resource.getPath()));
                } catch (JsonProcessingException e) {
                    throw new PersistenceException("error writing table as JSON", e);
                }
            } else {
                LOG.debug("resource is not a table component, ignoring");
            }
        }
    }

    private String getTableRowsJson(final Table table) throws JsonProcessingException {
        final InputStream excelFileInputStream = table.getExcelFileInputStream();

        final Collection<Map<String, List<String>>> tableRows = excelTableParser.getTable(excelFileInputStream)
            .rowMap()
            .values();

        IOUtils.closeQuietly(excelFileInputStream);

        return MAPPER.writeValueAsString(tableRows);
    }
}
