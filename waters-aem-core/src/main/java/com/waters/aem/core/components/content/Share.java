package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;

@Component(value = "Share")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Share {

    @DialogField(fieldLabel = "Social Media Intro Text",
        fieldDescription = "Enter the text of the social media intro",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    @Default(values = "Connect with Waters")
    private String socialMediaIntro;

    @DialogField(fieldLabel = "Social Media Buttons",
        fieldDescription = "Configure the follow buttons",
        ranking = 2)
    @MultiField(composite = true)
    @Inject
    private List<SocialMediaButton> socialMediaButtons;

    public String getSocialMediaIntro() {
        return socialMediaIntro;
    }

    public List<SocialMediaButton> getSocialMediaButtons() {
        return socialMediaButtons;
    }
}
