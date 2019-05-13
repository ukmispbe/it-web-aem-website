package com.waters.aem.automationtests.bobcat.webdriver;

import com.cognifide.qa.bb.constants.ConfigKeys;
import com.cognifide.qa.bb.frame.FrameSwitcher;
import com.cognifide.qa.bb.guice.ThreadScoped;
import com.cognifide.qa.bb.provider.selenium.webdriver.WebDriverRegistry;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.ClosingAwareWebDriver;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.ClosingAwareWebDriverWrapper;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.WebDriverClosedListener;
import com.cognifide.qa.bb.provider.selenium.webdriver.modifiers.WebDriverModifiers;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.name.Named;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.events.EventFiringWebDriver;
import org.openqa.selenium.support.events.WebDriverEventListener;

import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@ThreadScoped
public class ChromeDriverProvider implements Provider<WebDriver> {

    private ClosingAwareWebDriver cachedWebDriver;

    @Inject
    @Named(ConfigKeys.WEBDRIVER_REUSABLE)
    private boolean reusable;

    @Inject
    @Named(ConfigKeys.WEBDRIVER_MOBILE)
    private boolean mobile;

    @Inject
    private FrameSwitcher frameSwitcher;

    @Inject
    @Named(ConfigKeys.WEBDRIVER_MAXIMIZE)
    private boolean maximize;

    @Inject
    private Capabilities capabilities;

    @Inject
    private WebDriverRegistry registry;

    @Inject
    private WebDriverModifiers webDriverModifiers;

    @Inject
    private Set<WebDriverClosedListener> closedListeners;

    @Inject
    private Set<WebDriverEventListener> listeners;

    @Inject(optional = true)
    @Named("webdriver.arguments")
    private String arguments;

    @Override
    public WebDriver get() {
        if (cachedWebDriver == null || !cachedWebDriver.isAlive()) {
            cachedWebDriver = create();
        }

        return cachedWebDriver;
    }

    private ClosingAwareWebDriver create() {
        final Capabilities modifiedCapabilities = webDriverModifiers.modifyCapabilities(capabilities);

        final ChromeDriverService service = new ChromeDriverService.Builder()
            .usingDriverExecutable(new File("/usr/local/bin/chromedriver"))
            .usingPort(9515)
            .build();

        final ChromeOptions options = new ChromeOptions()
            .addArguments(getArguments())
            .merge(modifiedCapabilities);

        //final WebDriver raw = new ChromeDriver(service, options);

        WebDriver driver = new ChromeDriver();
        driver.get("http://www.google.com");


        final WebDriver modified = webDriverModifiers.modifyWebDriver(driver);

        final ClosingAwareWebDriverWrapper closingAwareWebDriver = wrapInClosingAwareWebDriver(modified);

        registerEventListeners(closingAwareWebDriver);

        registry.add(closingAwareWebDriver);

        return closingAwareWebDriver;
    }

    private ClosingAwareWebDriverWrapper wrapInClosingAwareWebDriver(final WebDriver webDriver) {
        final ClosingAwareWebDriverWrapper closingWebDriver = new ClosingAwareWebDriverWrapper(webDriver, frameSwitcher,
            maximize, reusable, mobile);

        closedListeners.forEach(closingWebDriver :: addListener);

        return closingWebDriver;
    }

    private void registerEventListeners(final EventFiringWebDriver closingWebDriver) {
        listeners.forEach(closingWebDriver :: register);
    }

    private List<String> getArguments() {
        return Optional.ofNullable(arguments)
            .map(arguments -> Arrays.asList(arguments.split(",")))
            .orElse(Collections.emptyList());
    }
}
