package com.waters.aem.automationtests.components;

import com.adobe.cq.wcm.core.components.models.Title;
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
@Feature("Title Component")
public class TitleComponentTest extends AbstractApplicationNotesPageTest {

    @Override
    public void configureComponent() throws ActionException {
        controller.execute(AemActions.CONFIGURE_COMPONENT, new ConfigureComponentData("container", "Title", 0,
            new ResourceFileLocation("title.yaml")));
    }

    @Test
    public void getTitleAndType() {
        final Title titleComponent = applicationNotesPage.getContent(Title.class, 0);

        assertThat(titleComponent.getText().equals("Title Test"));
        assertThat(titleComponent.getType().equals("h2"));
    }
}
