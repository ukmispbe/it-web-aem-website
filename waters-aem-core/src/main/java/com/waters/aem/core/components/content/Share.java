package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Share {

    private static final Logger LOG = LoggerFactory.getLogger(Share.class);

    private static final String RESOURCE_NAME_LOCALES = "shareLocales";

    private static final List<String> DEFAULT_SERVICE_CODES = Arrays.asList(
        "twitter",
        "linkedin"
    );

    @Inject
    private ContentPolicy contentPolicy;

    @Inject
    private PageDecorator currentPage;

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
        final Locale locale = currentPage.getLanguage(false);

        return getShareLocales()
            .stream()
            .filter(shareLocale -> shareLocale.getCountry().equalsIgnoreCase(locale.getCountry()))
            .findFirst()
            .map(ShareLocale :: getServiceCodes)
            .orElse(DEFAULT_SERVICE_CODES);
    }
}
