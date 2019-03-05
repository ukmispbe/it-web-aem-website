package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.SiteContext;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Share",
    touchFileName = "_cq_design_dialog",
    listeners = {
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Share.class, ComponentExporter.class },
    resourceType = Share.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Share implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/share";

    private static final Logger LOG = LoggerFactory.getLogger(Share.class);

    private static final String RESOURCE_NAME_LOCALES = "shareLocales";

    private static final List<String> DEFAULT_SERVICE_CODES = Arrays.asList(
        "twitter",
        "linkedin"
    );

    @Self
    private SiteContext siteContext;

    @Inject
    private ContentPolicy contentPolicy;

    @Inject
    private PageDecorator currentPage;

    @Inject
    private Externalizer externalizer;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    @DialogField(fieldLabel = "Locales", fieldDescription = "Mapping of country codes to AddThis service codes.")
    @MultiField(composite = true)
    public List<ShareLocale> getShareLocales() {
        final List<ShareLocale> shareLocales = new ArrayList<>();

        if (contentPolicy != null) {
            final Resource contentPolicyResource = contentPolicy.adaptTo(Resource.class);

            if (contentPolicyResource != null) {
                shareLocales.addAll(Optional.ofNullable(contentPolicyResource.getChild(RESOURCE_NAME_LOCALES))
                    .map(Resource :: getChildren)
                    .map(resources -> StreamSupport.stream(resources.spliterator(), false)
                        .map(resource -> resource.adaptTo(ShareLocale.class))
                        .filter(Objects :: nonNull)
                        .collect(Collectors.toList()))
                    .orElse(Collections.emptyList()));
            }
        }

        LOG.debug("share locales : {}", shareLocales);

        return shareLocales;
    }

    public List<String> getServiceCodes() {
        final Locale locale = siteContext.getLocale();

        return getShareLocales()
            .stream()
            .filter(shareLocale -> shareLocale.getCountry().equalsIgnoreCase(locale.getCountry()))
            .findFirst()
            .map(ShareLocale :: getServiceCodes)
            .orElse(DEFAULT_SERVICE_CODES);
    }

    public String getBaseUrl() {
        return StringUtils.removeEnd(externalizer.externalLink(currentPage.getContentResource().getResourceResolver(),
            Externalizer.PUBLISH, "/"), "/");
    }
}
