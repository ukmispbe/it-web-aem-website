package com.waters.aem.core.servlets;

import com.adobe.acs.commons.dam.RenditionPatternPicker;
import com.adobe.acs.commons.images.ImageTransformer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.api.Rendition;
import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.wcm.foundation.Image;
import com.day.image.Layer;
import com.google.common.net.MediaType;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.OptingServlet;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.regex.Pattern;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = DamConstants.NT_DAM_ASSET,
    methods = "GET",
    extensions = ResizeImageServlet.RESIZE_EXTENSION
)
public final class ResizeImageServlet extends SlingSafeMethodsServlet implements OptingServlet {

    public static final String RESIZE_EXTENSION = "resize";

    public static final String SUFFIX_NAME = "img";

    private static final Logger LOG = LoggerFactory.getLogger(ResizeImageServlet.class);

    private static final String PARAM_WIDTH = "width";

    private static final Integer DEFAULT_QUALITY = 82;

    private static final double QUALITY_DENOMINATOR = 100D;

    private static final String DEFAULT_ASSET_RENDITION_PICKER_REGEX = "cq5dam\\.web\\.(.*)";

    private static final String SUFFIX_PATTERN_REGEX = "/" + SUFFIX_NAME + "\\.(.+)";

    private final RenditionPatternPicker renditionPatternPicker = new RenditionPatternPicker(
        Pattern.compile(DEFAULT_ASSET_RENDITION_PICKER_REGEX));

    @Reference(target = "(type=resize)")
    private ImageTransformer resizeImageTransformer;

    @Override
    public boolean accepts(@Nonnull final SlingHttpServletRequest request) {
        final String suffix = request.getRequestPathInfo().getSuffix();

        return StringUtils.isNotBlank(suffix) && Pattern.matches(SUFFIX_PATTERN_REGEX, suffix);
    }

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        // get the image object for the requested DAM asset
        final Image image = getImage(request);
        final String mimeType = getMimeType(image);

        LOG.debug("image : {}, mime type : {}", image, mimeType);

        // transform image using the resize transformer from ACS AEM Commons
        final Layer layer = transform(getLayer(image), request);

        response.setContentType(mimeType);

        // write resized image using default quality setting
        layer.write(mimeType, DEFAULT_QUALITY / QUALITY_DENOMINATOR, response.getOutputStream());

        response.flushBuffer();
    }

    // most of the logic below was lifted from the ACS AEM Commons Named Image Transform Servlet

    private Image getImage(final SlingHttpServletRequest request) {
        final Resource assetResource = request.getResource();

        final Asset asset = DamUtil.resolveToAsset(assetResource);

        // get the web rendition or the original if not found
        final Rendition rendition = Optional.ofNullable(asset.getRendition(renditionPatternPicker))
            .orElse(asset.getOriginal());

        final Image image = new Image(assetResource);

        image.set(Image.PN_REFERENCE, rendition.getPath());

        return image;
    }

    private String getMimeType(final Image image) {
        String mimeType;

        try {
            mimeType = image.getMimeType();
        } catch (RepositoryException e) {
            mimeType = MediaType.PNG.toString();
        }

        return mimeType;
    }

    private Layer getLayer(final Image image) throws IOException {
        final Layer layer;

        try {
            layer = image.getLayer(false, false, false);
        } catch (RepositoryException e) {
            LOG.error("error getting image layer", e);

            throw new IOException(e);
        }

        return layer;
    }

    private Layer transform(final Layer layer, final SlingHttpServletRequest request) {
        final String[] selectors = request.getRequestPathInfo().getSelectors();

        Layer transformedLayer = layer;

        if (selectors.length == 1) {
            try {
                final Integer width = Integer.parseInt(selectors[0]);
                final ValueMap transformParams = new ValueMapDecorator(Collections.singletonMap(PARAM_WIDTH, width));

                LOG.debug("resizing image to width : {}", width);

                transformedLayer = resizeImageTransformer.transform(layer, transformParams);
            } catch (NumberFormatException e) {
                LOG.error("invalid width selector : " + selectors[0] + ", returning original image", e);
            }
        } else {
            LOG.debug("no width selector provided, returning original image");
        }

        return transformedLayer;
    }
}
