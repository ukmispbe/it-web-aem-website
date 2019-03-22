package com.waters.aem.core.servlets;

import com.day.cq.commons.JSONWriterUtil;
import com.day.cq.commons.servlets.AbstractListServlet;
import com.day.cq.replication.ReplicationQueue;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.xss.XSSProtectionService;
import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.net.MediaType;
import com.icfolson.aem.library.core.constants.PathConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.io.JSONWriter;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * Override of default tag list servlet to prevent class cast exception from custom <code>TagManager</code>
 * implementation.
 */
@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = {
        "cq/tagging/components/tag",
        "sling:redirect"
    },
    selectors = "tags",
    extensions = PathConstants.EXTENSION_JSON,
    methods = "GET"
)
public final class TagListServlet extends AbstractListServlet {

    private static final Logger LOG = LoggerFactory.getLogger(TagListServlet.class);

    @Reference
    private XSSProtectionService xss;

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
        throws IOException, ServletException {
        response.setContentType(MediaType.JSON_UTF_8.withoutParameters().toString());
        response.setCharacterEncoding(Charsets.UTF_8.name());

        final Resource resource = request.getResource();

        final ResourceBundle bundle = request.getResourceBundle(null);

        final TagManager tagManager = resource.getResourceResolver().adaptTo(TagManager.class);

        final boolean doCount = getBool(request, "count", true);
        final boolean replicationStateRequired = getBool(request, "replicationStateRequired", true);

        final Writer out = response.getWriter();

        final JSONWriter writer = new JSONWriter(out);

        try {
            writer.object();
            writer.key("tags");
            writer.array();

            final Integer start = request.getParameter("start") != null ? Integer.parseInt(
                request.getParameter("start")) : null;
            final Integer limit = request.getParameter("limit") != null ? Integer.parseInt(
                request.getParameter("limit")) : null;

            final boolean isBasePath = resource.getPath().equals("/etc/tags");

            final Tag parentTag = resource.adaptTo(Tag.class);

            final int results;

            if (parentTag == null && !isBasePath) {
                final Tag[] tags = tagManager.getTags(resource);

                results = writeTags(Arrays.asList(tags), bundle, writer, doCount, replicationStateRequired, start,
                    limit);
            } else {
                final List<Tag> children = Lists.newArrayList(
                    isBasePath ? tagManager.getNamespacesIter() : parentTag.listChildren());

                results = writeTags(children, bundle, writer, doCount, replicationStateRequired, start, limit);
            }

            writer.endArray();
            writer.key("results").value(results);
            writer.endObject();
        } catch (JSONException e) {
            throw new ServletException("Could not list tags for resource : " + request.getResource().getPath());
        }
    }

    private int writeTags(final List<Tag> tags, final ResourceBundle bundle, final JSONWriter writer,
        final boolean doCount, final boolean replicationStateRequired, final Integer start, final Integer limit)
        throws JSONException {
        final int result;

        if (tags != null && !tags.isEmpty()) {
            final int startIndex = (start == null || start < 0) ? 0 : start;
            final int limitIndex = (limit == null || limit > tags.size()) ? tags.size() : limit;

            for (int i = startIndex; i < tags.size() && i < startIndex + limitIndex; i++) {
                final Tag tag = tags.get(i);

                writeTag(tag, bundle, writer, doCount, replicationStateRequired);
            }

            result = tags.size();
        } else {
            result = 0;
        }

        return result;
    }

    private void writeTag(final Tag tag, final ResourceBundle bundle, final JSONWriter writer, final boolean doCount,
        final boolean replicationStateRequired) throws JSONException {
        final ReplicationStatus replicationStatus = tag.adaptTo(Resource.class).adaptTo(ReplicationStatus.class);

        final String pubDate = getPublishInformation(bundle, replicationStatus, replicationStateRequired);
        final String publisher = getPublisher(replicationStatus);

        writer.object();

        writeTag(writer, tag, doCount);

        writer.key("lastModified").value(tag.getLastModified());
        writer.key("lastModifiedBy").value(tag.getLastModifiedBy());
        writer.key("pubDate").value(pubDate);
        writer.key("publisher").value(publisher);

        if (replicationStateRequired) {
            writeReplicationState(writer, replicationStatus);
        }

        writer.endObject();
    }

    private void writeTag(final JSONWriter writer, final Tag tag, final boolean writeCount) throws JSONException {
        writer.key("path").value(tag.getPath());
        writer.key("tagID").value(tag.getTagID());
        writer.key("name").value(tag.getName());

        JSONWriterUtil.write(writer, "title", tag.getTitle(), JSONWriterUtil.WriteMode.BOTH, xss);

        for (final Map.Entry<Locale, String> entry : tag.getLocalizedTitles().entrySet()) {
            writer.key("title." + entry.getKey().toString().toLowerCase()).value(entry.getValue());
        }

        JSONWriterUtil.write(writer, "description", tag.getDescription(), JSONWriterUtil.WriteMode.BOTH, xss);

        writer.key("titlePath").value(tag.getTitlePath());

        for (Map.Entry<Locale, String> entry : tag.getLocalizedTitlePaths().entrySet()) {
            writer.key("titlePath." + entry.getKey().toString().toLowerCase()).value(entry.getValue());
        }

        if (writeCount) {
            writer.key("count").value(tag.getCount());
        }

        try {
            final Node node = tag.adaptTo(Node.class);

            if (node.hasProperty("cq:movedTo")) {
                writer.key("cq:movedTo").value(node.getProperty("cq:movedTo").getString());
            }
        } catch (RepositoryException e) {
            LOG.error("error reading the tag property cq:movedTo", e);
        }
    }

    private String getPublishInformation(final ResourceBundle bundle, final ReplicationStatus replState,
        final boolean replicationStateRequired) {
        final String publishInformation;

        if (replState != null && replicationStateRequired) {
            if (replState.isDelivered()) {
                final Calendar lastPublished = replState.getLastPublished();

                publishInformation = lastPublished != null ? lastPublished.getTime().toString() : "";
            } else {
                publishInformation = replState.isPending() ? bundle.getString("Queued") : "";
            }
        } else {
            publishInformation = "";
        }

        return publishInformation;
    }

    private String getPublisher(final ReplicationStatus status) {
        return status != null && status.getLastPublished() != null ? status.getLastPublishedBy() : "";
    }

    private void writeReplicationState(final JSONWriter out, final ReplicationStatus replicationStatus)
        throws JSONException {
        out.key("replication").object();

        if (replicationStatus != null) {
            int maxQueuePos = -1;

            for (final ReplicationQueue.Entry entry : replicationStatus.getPending()) {
                if (entry.getQueuePosition() > maxQueuePos) {
                    maxQueuePos = entry.getQueuePosition();
                }
            }

            writeKey(out, "numQueued", maxQueuePos + 1);
            writeOptionalDateKey(out, "published", replicationStatus.getLastPublished());

            JSONWriterUtil.writeOptional(out, "publishedBy", replicationStatus.getLastPublishedBy(),
                JSONWriterUtil.WriteMode.BOTH, xss);

            if (replicationStatus.getLastReplicationAction() != null) {
                writeOptionalKey(out, "action", replicationStatus.getLastReplicationAction().name());
            }
        }

        out.endObject();
    }

    private boolean getBool(final HttpServletRequest request, final String name, final boolean def) {
        final String param = request.getParameter(name);

        if (param == null) {
            return def;
        } else if (def) {
            return !"false".equals(param);
        } else {
            return "true".equals(param);
        }
    }
}
