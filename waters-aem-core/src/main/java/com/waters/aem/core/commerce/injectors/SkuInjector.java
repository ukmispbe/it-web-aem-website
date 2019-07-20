package com.waters.aem.core.commerce.injectors;

import com.adobe.cq.sightly.WCMBindings;
import com.day.cq.wcm.api.Page;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.utils.InjectorUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;

@Component(service = Injector.class)
public final class SkuInjector implements Injector {

    private static final String NAME = "sku";

    private static final Logger LOG = LoggerFactory.getLogger(SkuInjector.class);

    @Reference
    private SkuRepository skuRepository;

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @CheckForNull
    @Override
    public Object getValue(@Nonnull final Object adaptable, final String name, @Nonnull final Type type,
        @Nonnull final AnnotatedElement element, @Nonnull final DisposalCallbackRegistry disposalCallbackRegistry) {
        Sku sku = null;

        if (type == Sku.class) {
            final SlingHttpServletRequest request = InjectorUtils.getRequest(adaptable);

            if (request != null) {
                final PageDecorator currentPage = getCurrentPage(request);

                sku = skuRepository.getSku(currentPage);

                LOG.info("current page = {}, injecting SKU = {}", currentPage.getPath(), sku);
            }
        }

        return sku;
    }

    private PageDecorator getCurrentPage(final SlingHttpServletRequest request) {
        final SlingBindings bindings = (SlingBindings) request.getAttribute(SlingBindings.class.getName());

        PageDecorator currentPage = null;

        if (bindings != null && bindings.containsKey(WCMBindings.CURRENT_PAGE)) {
            final PageManagerDecorator pageManager = request.getResourceResolver().adaptTo(PageManagerDecorator.class);

            currentPage = pageManager.getPage((Page) bindings.get(WCMBindings.CURRENT_PAGE));
        }

        return currentPage;
    }
}
