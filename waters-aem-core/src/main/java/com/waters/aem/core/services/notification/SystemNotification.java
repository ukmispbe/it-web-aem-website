package com.waters.aem.core.services.notification;

import com.day.cq.i18n.I18n;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.commons.lang3.StringUtils;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

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

    @ValueMapValue
    private String eprocTitle;

    @ValueMapValue
    private String eprocMessage;

    @ValueMapValue
    private Calendar eprocOnTime;

    @ValueMapValue
    private Calendar eprocOffTime;

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, Object> toMap(final I18n i18n,final String channel) {
        final HashMap<String, Object> map = new HashMap<>();

        if(StringUtils.equalsIgnoreCase(channel,"EPROC")){
            map.put("title", i18n.get(getEprocTitle()));
            map.put("message", i18n.get(getEprocMessage()));
            map.put("onTime", eprocOnTime == null ? null : eprocOnTime.getTimeInMillis());
            map.put("offTime", eprocOffTime == null ? null : eprocOffTime.getTimeInMillis());

        }else {
            map.put("title", i18n.get(getTitle()));
            map.put("message", i18n.get(getMessage()));
            map.put("onTime", onTime == null ? null : onTime.getTimeInMillis());
            map.put("offTime", offTime == null ? null : offTime.getTimeInMillis());
        }

        return map;
    }

    public Long getOnTime() {
        return onTime == null ? null : onTime.getTimeInMillis();
    }

    public Long getOffTime() {
        return offTime == null ? null : offTime.getTimeInMillis();
    }

    public String getEprocTitle() {
        return eprocTitle;
    }

    public String getEprocMessage() {
        return eprocMessage;
    }

    public Long getEprocOnTime() {
        return eprocOnTime == null ? null : eprocOnTime.getTimeInMillis();
    }

    public Long getEprocOffTime() {
        return eprocOffTime == null ? null : eprocOffTime.getTimeInMillis();
    }
}
