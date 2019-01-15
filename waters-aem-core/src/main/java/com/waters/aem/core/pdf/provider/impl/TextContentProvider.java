package com.waters.aem.core.pdf.provider.impl;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.IBlockElement;
import com.itextpdf.layout.element.IElement;
import com.itextpdf.layout.element.ILeafElement;
import com.itextpdf.layout.element.Paragraph;
import com.waters.aem.core.components.content.Text;
import com.waters.aem.core.pdf.provider.ContentProvider;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.io.IOException;

@Model(adaptables = SlingHttpServletRequest.class,
    adapters = ContentProvider.class,
    resourceType = Text.RESOURCE_TYPE)
public final class TextContentProvider implements ContentProvider {

    @Self
    private Text model;

    @Override
    public void writePdfContent(final SlingHttpServletRequest request, final Document document,
        final ConverterProperties converterProperties) throws IOException {
        if (StringUtils.isNotEmpty(model.getText())) {
            final Paragraph paragraph = new Paragraph();

            if (StringUtils.isNotEmpty(model.getTitle())) {
                paragraph.add(new com.itextpdf.layout.element.Text(model.getTitle()).setBold());
            }

            for (final IElement element : HtmlConverter.convertToElements(model.getText(), converterProperties)) {
                if (element instanceof IBlockElement) {
                    paragraph.add((IBlockElement) element);
                } else if (element instanceof ILeafElement) {
                    paragraph.add((ILeafElement) element);
                }
            }

            document.add(paragraph);
        }
    }
}
