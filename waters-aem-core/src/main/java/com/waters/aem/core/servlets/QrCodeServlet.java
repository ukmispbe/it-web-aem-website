package com.waters.aem.core.servlets;

import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.commons.AbstractImageServlet;
import com.day.image.Layer;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.google.zxing.qrcode.encoder.Encoder;
import com.google.zxing.qrcode.encoder.QRCode;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = WatersConstants.RESOURCE_TYPE_PAGE,
    selectors = "qrcode",
    methods = "GET",
    extensions = "png"
)
public final class QrCodeServlet extends AbstractImageServlet {

    private static final Logger LOG = LoggerFactory.getLogger(QrCodeServlet.class);

    private static final int DEFAULT_SIZE = 75;

    @Reference
    private Externalizer externalizer;

    @Override
    protected Layer createLayer(final ImageContext imageContext) throws IOException {
        final String externalizedPageUrl = getExternalizedPageUrl(imageContext);

        LOG.debug("creating QR code image for URL : {}", externalizedPageUrl);

        final QRCode qrcode = new QRCode();

        final Layer layer;

        try {
            Encoder.encode(externalizedPageUrl, ErrorCorrectionLevel.L, qrcode);

            final int qrBaseSize = qrcode.getMatrixWidth();
            final int baseSize = qrBaseSize + 4;

            int size = DEFAULT_SIZE;

            if (size < baseSize) {
                size = baseSize;
            }

            final int qrActualSize = size / baseSize;
            final int remainder = size % baseSize;
            final int startPos = (remainder > 0 ? remainder / 2 : qrActualSize) + 2 * qrActualSize;

            final BufferedImage qrCodeImage = new BufferedImage(size, size, 1);

            qrCodeImage.createGraphics();

            final Graphics2D graphics = (Graphics2D) qrCodeImage.getGraphics();

            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, size, size);
            graphics.setColor(Color.BLACK);

            for (int i = 0; i < qrBaseSize; ++i) {
                for (int j = 0; j < qrBaseSize; ++j) {
                    if (qrcode.at(i, j) == 1) {
                        graphics.fillRect(startPos + i * qrActualSize, startPos + j * qrActualSize, qrActualSize,
                            qrActualSize);
                    }
                }
            }

            layer = new Layer(qrCodeImage);
        } catch (WriterException e) {
            LOG.error("error encoding externalized page URL : " + externalizedPageUrl, e);

            throw new IOException(e);
        }

        return layer;
    }

    private String getExternalizedPageUrl(final ImageContext imageContext) {
        final ApplicationNotes applicationNotes = imageContext.currentPage.getContentResource().adaptTo(
            ApplicationNotes.class);

        return externalizer.externalLink(imageContext.resolver, Externalizer.PUBLISH,
            "/" + applicationNotes.getLiteratureCode());
    }
}
