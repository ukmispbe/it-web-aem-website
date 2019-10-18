package com.waters.aem.core.form.captcha;

import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.core.servlets.AbstractJsonResponseServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import java.io.IOException;

@SlingServletPaths("/bin/waters/captcha")
@Component(service = Servlet.class)
public final class CaptchaPocServlet extends AbstractJsonResponseServlet {

    @Reference
    private CaptchaService captchaService;

    @Override
    protected void doPost(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws IOException {
        final String path = request.getParameter("path");
        final String token = request.getParameter("g-recaptcha-response");
        final String email = request.getParameter("email");

        final boolean verify = captchaService.verify(token);

        response.sendRedirect(LinkBuilderFactory.forPath(path)
                .addParameter("success", String.valueOf(verify))
                .addParameter("email", email)
                .addSelector("captchapoc")
                .build()
                .getHref());
    }
}
