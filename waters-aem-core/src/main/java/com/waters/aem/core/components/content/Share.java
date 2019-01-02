package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.Listener;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Share", listeners = {
    @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PAGE),
    @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PAGE)
})
public final class Share {

}
