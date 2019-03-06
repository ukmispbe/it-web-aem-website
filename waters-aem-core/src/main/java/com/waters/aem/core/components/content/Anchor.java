package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.node.predicates.ComponentNodeResourceTypePredicate;
import com.waters.aem.core.components.content.applicationnotes.SectionContainer;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component(value = "Anchor",
    description = "This is the Anchor component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Anchor.class, ComponentExporter.class },
    resourceType = Anchor.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Anchor implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/anchor";

    @OSGiService
    private ModelFactory modelFactory;

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private PageDecorator currentPage;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public List<Link> getLinks() {
        // find all section container components on the current page and get the anchor link for each
        return currentPage.getComponentNode()
            .transform(contentNode -> contentNode.findDescendants(
                new ComponentNodeResourceTypePredicate(SectionContainer.RESOURCE_TYPE))
                .stream()
                .map(componentNode -> modelFactory.getModelFromWrappedRequest(request, componentNode.getResource(),
                    SectionContainer.class))
                .filter(Objects :: nonNull)
                .map(SectionContainer :: getAnchorLink)
                .filter(link -> link.getTitle() != null)
                .collect(Collectors.toList()))
            .or(Collections.emptyList());
    }
}
