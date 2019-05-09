package com.waters.aem.core.injectors;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.components.structure.page.LibraryPage;
import com.waters.aem.core.metadata.ContentClassification;
import com.waters.aem.core.utils.Templates;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.osgi.service.component.annotations.Component;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;

@Component(service = Injector.class)
public final class ContentClassificationInjector implements Injector {

    private static final String NAME = "content-classification";

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @CheckForNull
    @Override
    public Object getValue(@Nonnull final Object adaptable, final String name, @Nonnull final Type type,
        @Nonnull final AnnotatedElement element, @Nonnull final DisposalCallbackRegistry disposalCallbackRegistry) {
        ContentClassification contentClassification = null;

        if (type == ContentClassification.class) {
            final Resource resource = getResource(adaptable);

            if (resource != null) {
                final PageDecorator currentPage = resource.getResourceResolver().adaptTo(PageManagerDecorator.class)
                    .getContainingPage(resource);

                if (Templates.isLibraryPage(currentPage)) {
                    contentClassification = currentPage.getContentResource().adaptTo(LibraryPage.class);
                } else {
                    contentClassification = currentPage.getContentResource().adaptTo(ApplicationNotes.class);
                }
            }
        }

        return contentClassification;
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
