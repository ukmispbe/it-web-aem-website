package com.waters.aem.core.components.content;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.LoggerFactory;

import static junitx.util.PrivateAccessor.setField;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@ExtendWith(MockitoExtension.class)
class TextTest {

    @InjectMocks
    private Text text;

    @BeforeEach
    public void setUp() throws NoSuchFieldException {
        Logger rootLogger = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.setLevel(Level.ERROR);
        setField(text, "title", "Title");
        setField(text, "indexed", false);
    }

    @Test
    void testGetTitle() {
        assertEquals("Title", text.getTitle());
    }

    @Test
    void testIsIndexed() {
        assertFalse(text.isIndexed());
    }

    @Test
    void testGetExportedType() {
        assertEquals(Text.RESOURCE_TYPE, text.getExportedType());
    }
}
