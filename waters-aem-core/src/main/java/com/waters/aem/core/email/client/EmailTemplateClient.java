package com.waters.aem.core.email.client;

import com.waters.aem.core.email.template.SESEmailTemplate;

import java.io.IOException;
import java.net.URISyntaxException;

public interface EmailTemplateClient {

    /**
     * Creates or updates the provided email template in AWS SES.
     *
     * @param template object containing the template name, subject, and email body content
     * @throws URISyntaxException if AWS URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    void setTemplate(SESEmailTemplate template) throws URISyntaxException, IOException;

}
