package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ResourceFileLocation;
import com.cognifide.qa.bb.api.actions.ActionException;
import com.cognifide.qa.bb.junit5.guice.Modules;
import com.cognifide.qa.bb.modules.BobcatRunModule;
import com.waters.aem.automationtests.pages.AbstractApplicationNotesPageTest;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Modules(BobcatRunModule.class)
@Epic("Waters Automation Tests")
@Feature("Text Component")
public class TextComponentTest extends AbstractApplicationNotesPageTest {

    @Override
    public void configureComponent() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Text", 0,
            new ResourceFileLocation("text.yaml")));
    }

    @Test
    public void getTitleAndText() {
        final Text textComponent = applicationNotesPage.getContent(Text.class, 0);

        assertThat(textComponent.getTitle().equals("Title Test"));
        assertThat(textComponent.getText().equals("Text Test"));
    }
}
