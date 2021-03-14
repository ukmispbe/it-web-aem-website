package com.waters.aem.core.components.content;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
public class TextTest {

    @Mock
    private Text text;
    private Page page;
    private Resource resource;

    @BeforeEach
    public void setUp() throws Exception {
        Logger rootLogger = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.setLevel(Level.ERROR);
    }

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        page = context.create().page("/content/mypage");
        resource = context.create().resource(page, "text",
                "sling:resourceType", "waters/components/text","title","Test Title","text","Sample");
        text = resource.adaptTo(Text.class);
    }

    @Test
    void testGetTitle() throws Exception {
        String expected ="Test Title";
        String title = text.getTitle();
        assertNotNull(title);
        assertEquals(expected,title);
    }
}
