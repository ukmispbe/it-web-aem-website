package com.waters.aem.core.library.injector;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.structure.page.LibraryPage;
import com.waters.aem.core.library.asset.LibraryAsset;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;
import java.util.Optional;

/**
 * Injects library assets into model objects on library pages.
 */
@Component(service = Injector.class)
public final class LibraryAssetInjector implements Injector {

    private static final String NAME = "library-asset";

    private static final Logger LOG = LoggerFactory.getLogger(LibraryAssetInjector.class);

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @CheckForNull
    @Override
    public Object getValue(@Nonnull final Object adaptable, final String name, @Nonnull final Type type,
        @Nonnull final AnnotatedElement annotatedElement,
        @Nonnull final DisposalCallbackRegistry disposalCallbackRegistry) {
        LibraryAsset libraryAsset = null;

        if (type == LibraryAsset.class) {
            final Resource resource = getResource(adaptable);

            if (resource != null) {
                final PageDecorator currentPage = resource.getResourceResolver().adaptTo(PageManagerDecorator.class)
                    .getContainingPage(resource);

                if (Templates.isLibraryPage(currentPage)) {
                    libraryAsset = Optional.ofNullable(currentPage.getContentResource().adaptTo(LibraryPage.class))
                        .map(LibraryPage :: getLibraryAsset)
                        .orElse(null);

                    LOG.debug("returning library asset : {} for page : {}", libraryAsset, currentPage);
                }
            }
        }

        return libraryAsset;
    }

    private Resource getResource(final Object adaptable) {
        Resource resource = null;

        if (adaptable instanceof SlingHttpServletRequest) {
            resource = ((SlingHttpServletRequest) adaptable).getResource();
        } else if (adaptable instanceof Resource) {
            resource = (Resource) adaptable;
        }

        return resource;
    }
}
