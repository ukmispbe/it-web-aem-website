package com.waters.aem.pdfgenerator.provider.impl;

import com.day.cq.commons.Externalizer;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.IBlockElement;
import com.itextpdf.layout.element.IElement;
import com.itextpdf.layout.element.ILeafElement;
import com.itextpdf.layout.element.Paragraph;
import com.waters.aem.core.components.content.Image;
import com.waters.aem.pdfgenerator.provider.PdfContentProvider;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.codehaus.plexus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = PdfContentProvider.class,
    resourceType = Image.RESOURCE_TYPE)
public final class ImageContentProvider implements PdfContentProvider {

    private static final Logger LOG = LoggerFactory.getLogger(ImageContentProvider.class);

    @Self
    private Image model;

    @OSGiService
    private Externalizer externalizer;

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        if (model.getSrc() != null) {
            final String imageUrl = externalizer.externalLink(request.getResourceResolver(), Externalizer.AUTHOR,
                model.getSrc());

            LOG.info("adding image to PDF : {}", imageUrl);

            final ImageData imageData = ImageDataFactory.create(imageUrl);
            final com.itextpdf.layout.element.Image image = new com.itextpdf.layout.element.Image(imageData);

            document.add(image);

            if (StringUtils.isNotEmpty(model.getTitle())) {
                final Paragraph caption = new Paragraph();

                for (final IElement element : HtmlConverter.convertToElements(model.getTitle(), converterProperties)) {
                    if (element instanceof IBlockElement) {
                        caption.add((IBlockElement) element);
                    } else if (element instanceof ILeafElement) {
                        caption.add((ILeafElement) element);
                    }
                }

                document.add(caption.setItalic());
            }
        }
    }
}
