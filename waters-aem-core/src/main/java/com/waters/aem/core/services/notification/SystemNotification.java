package com.waters.aem.core.services.notification;

import com.day.cq.commons.jcr.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Calendar;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SystemNotification {

    @ValueMapValue
    private Calendar onTime;

    @ValueMapValue
    private Calendar offTime;

    @ValueMapValue(name = JcrConstants.JCR_DESCRIPTION)
    private String message;

    public String getMessage() {
        return message;
    }

    public Calendar getOnTime() {
        return onTime;
    }

    public Calendar getOffTime() {
        return offTime;
    }
}
