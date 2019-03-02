package com.waters.aem.pdfgenerator.services.impl;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.itextpdf.io.font.FontConstants;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public final class FooterEventHandler implements IEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(FooterEventHandler.class);

    private final PageDecorator page;

    public FooterEventHandler(final PageDecorator page) {
        this.page = page;
    }

    @Override
    public void handleEvent(final Event event) {
        final PdfDocumentEvent docEvent = (PdfDocumentEvent) event;

        final PdfCanvas canvas = new PdfCanvas(docEvent.getPage());

        final Rectangle pageSize = docEvent.getPage().getPageSize();

        canvas.beginText();

        try {
            canvas.setFontAndSize(PdfFontFactory.createFont(FontConstants.HELVETICA_OBLIQUE), 5);
        } catch (IOException e) {
            LOG.error("error creating font for footer event", e);
        }

        canvas.moveText(0, (pageSize.getBottom() + 20))
            .showText(page.getPageTitle())
            .endText()
            .release();
    }
}
