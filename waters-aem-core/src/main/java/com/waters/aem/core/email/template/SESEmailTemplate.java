package com.waters.aem.core.email.template;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableMap;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Map;

/**
 * An object representing a AWS SES Template object.
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#createTemplate-property
 */
public class SESEmailTemplate {

    public static SESEmailTemplate forHtmlPart(final String templateName, final String subject, final String htmlPart) {
        return forHtmlAndTextPart(templateName, subject, htmlPart, "");
    }

    public static SESEmailTemplate forHtmlAndTextPart(final String templateName, final String subject,
                                                        final String htmlPart, final String textPart) {
        return new SESEmailTemplate(new TemplateData(templateName, subject, htmlPart, textPart));
    }

    private TemplateData templateData;

    private SESEmailTemplate(final TemplateData templateData) {
        this.templateData = templateData;
    }

    public TemplateData getTemplateData() {
        return templateData;
    }

    public Map<String, Map<String, String>> toMap() {
        return new ImmutableMap.Builder<String, Map<String, String>>()
                .put("Template", templateData.toMap())
                .build();
    }

    @Override
    public boolean equals(final Object result) {
        return EqualsBuilder.reflectionEquals(this, result);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Override
    public String toString() {
        return Objects.toStringHelper(this)
                .add("Template", templateData)
                .toString();
    }
}
