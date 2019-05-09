package com.waters.aem.core.tagging;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.icfolson.aem.library.api.node.ComponentNode;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.spi.AcceptsNullName;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.AbstractInjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessorFactory2;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component(service = Injector.class, property = {
    Constants.SERVICE_RANKING + "=" + Integer.MIN_VALUE
})
public final class WatersTagInjector implements Injector, InjectAnnotationProcessorFactory2, AcceptsNullName {

    private static final Logger LOG = LoggerFactory.getLogger(WatersTagInjector.class);

    @Nonnull
    @Override
    public String getName() {
        return WatersTagInject.NAME;
    }

    @CheckForNull
    @Override
    @SuppressWarnings("squid:S2259")
    public Object getValue(@Nonnull final Object adaptable, final String name, @Nonnull final Type type,
        @Nonnull final AnnotatedElement element, @Nonnull final DisposalCallbackRegistry disposalCallbackRegistry) {
        final WatersTagInject annotation = element.getAnnotation(WatersTagInject.class);
        final Class clazz = getClassForType(type);

        Object value = null;

        if (clazz == WatersTag.class || clazz == Tag.class) {
            final Resource resource = getResource(adaptable);

            final TagManager tagManager = resource.getResourceResolver().adaptTo(TagManager.class);

            final List<Tag> tags = getTagIds(annotation, name, resource)
                .stream()
                .map(tagManager :: resolve)
                .filter(Objects :: nonNull)
                .map(WatersTag :: new)
                .collect(Collectors.toList());

            if (!tags.isEmpty()) {
                LOG.debug("setting {} tag(s) for field name : {}", tags.size(), name);

                value = isCollectionType(type) ? tags : tags.get(0);
            }
        }

        return value;
    }

    @Override
    public InjectAnnotationProcessor2 createAnnotationProcessor(final Object adaptable,
        final AnnotatedElement element) {
        final WatersTagInject annotation = element.getAnnotation(WatersTagInject.class);

        return annotation == null ? null : new TagAnnotationProcessor(annotation);
    }

    @SuppressWarnings("squid:S2259")
    private List<String> getTagIds(final WatersTagInject annotation, final String name, final Resource resource) {
        final ComponentNode componentNode = resource.adaptTo(ComponentNode.class);

        final List<String> tagIds;

        if (annotation != null && annotation.inherit()) {
            tagIds = componentNode.getAsListInherited(name, String.class);
        } else {
            tagIds = componentNode.getAsList(name, String.class);
        }

        return tagIds;
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

    private Class getClassForType(final Type type) {
        final Class clazz;

        if (isCollectionType(type)) {
            clazz = (Class) ((ParameterizedType) type).getActualTypeArguments()[0];
        } else {
            clazz = (Class) type;
        }

        return clazz;
    }

    private boolean isCollectionType(final Type type) {
        boolean result = false;

        if (type instanceof ParameterizedType) {
            final ParameterizedType parameterizedType = (ParameterizedType) type;
            final Class collectionType = (Class) parameterizedType.getRawType();

            result = Collection.class.isAssignableFrom(collectionType);
        }

        return result;
    }

    private static class TagAnnotationProcessor extends AbstractInjectAnnotationProcessor2 {

        private final WatersTagInject annotation;

        TagAnnotationProcessor(final WatersTagInject annotation) {
            this.annotation = annotation;
        }

        @Override
        public InjectionStrategy getInjectionStrategy() {
            return annotation.injectionStrategy();
        }
    }
}
