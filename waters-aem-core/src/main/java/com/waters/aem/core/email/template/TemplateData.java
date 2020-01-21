package com.waters.aem.core.email.template;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Map;

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#createTemplate-property
 */
public class TemplateData {

    private String templateName;

    private String subject;

    private String htmlPart;

    private String textPart;

    protected TemplateData(String templateName, String subject, String htmlPart, String textPart) {
        this.templateName = templateName;
        this.subject = subject;
        this.htmlPart = htmlPart;
        this.textPart = textPart;
    }

    public String getTemplateName() {
        return templateName;
    }

    public String getSubject() {
        return subject;
    }

    public String getHtmlPart() {
        return htmlPart;
    }

    public String getTextPart() {
        return textPart;
    }

    public Map<String, String> toMap() {
        final ImmutableMap.Builder<String, String> builder = new ImmutableMap.Builder<String, String>()
                .put("TemplateName", templateName)
                .put("SubjectPart", subject);

        if (StringUtils.isNotEmpty(htmlPart)) {
            builder.put("HtmlPart", htmlPart);
        }

        if (StringUtils.isNotEmpty(textPart)) {
            builder.put("TextPart", textPart);
        }

        return builder.build();
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
            .add("TemplateName", templateName)
            .add("SubjectPart", subject)
            .add("HtmlPart", htmlPart)
            .add("TextPart", textPart)
            .toString();
    }
}
