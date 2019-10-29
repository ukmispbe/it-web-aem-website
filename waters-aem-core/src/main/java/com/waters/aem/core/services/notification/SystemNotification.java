package com.waters.aem.core.services.notification;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Calendar;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SystemNotification {

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String message;

    @ValueMapValue
    private Calendar onTime;

    @ValueMapValue
    private Calendar offTime;

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Long getOnTime() {
        return onTime == null ? null : onTime.getTimeInMillis();
    }

    public Long getOffTime() {
        return offTime == null ? null : offTime.getTimeInMillis();
    }
}
