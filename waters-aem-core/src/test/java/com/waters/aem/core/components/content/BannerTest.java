package com.waters.aem.core.components.content;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
class BannerTest {

    @InjectMocks
    private Banner banner;

    @Test
    void testGetExportedType() {
        assertEquals(Banner.RESOURCE_TYPE, banner.getExportedType());
    }
}
