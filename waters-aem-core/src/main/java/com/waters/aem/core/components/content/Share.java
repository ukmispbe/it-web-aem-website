package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.day.cq.wcm.api.designer.Style;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Share",
    touchFileName = "_cq_design_dialog",
    listeners = {
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class)
public final class Share {

    @ScriptVariable
    private Style currentStyle;

    @Inject
    private PageDecorator currentPage;

    private Locale locale;

    @PostConstruct
    protected void init() {
        locale = currentPage.getLanguage(false);
    }

    @DialogField(fieldLabel = "Locales")
    @MultiField(composite = true)
    public List<ShareLocale> getLocales() {
        return new ArrayList<>();
    }

    public boolean isEnableWeChat() {
        return locale.equals(Locale.CHINA);
    }
}
