package com.waters.aem.automationtests.bobcat.modules;

import com.cognifide.qa.bb.actions.ActionsProvider;
import com.cognifide.qa.bb.javascriptexecutor.JavascriptExecutorProvider;
import com.cognifide.qa.bb.provider.selenium.DesiredCapabilitiesProvider;
import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.bobcat.webdriver.ChromeDriverProvider;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;

public class SeleniumModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(WebDriver.class).toProvider(ChromeDriverProvider.class);
        bind(Actions.class).toProvider(ActionsProvider.class);
        bind(Capabilities.class).toProvider(DesiredCapabilitiesProvider.class);
        bind(JavascriptExecutor.class).toProvider(JavascriptExecutorProvider.class);
    }
}
