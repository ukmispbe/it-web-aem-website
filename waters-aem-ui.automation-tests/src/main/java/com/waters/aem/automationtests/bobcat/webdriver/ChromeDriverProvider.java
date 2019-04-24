package com.waters.aem.automationtests.bobcat.webdriver;

import com.cognifide.qa.bb.constants.ConfigKeys;
import com.cognifide.qa.bb.frame.FrameSwitcher;
import com.cognifide.qa.bb.guice.ThreadScoped;
import com.cognifide.qa.bb.provider.selenium.webdriver.WebDriverRegistry;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.ClosingAwareWebDriver;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.ClosingAwareWebDriverWrapper;
import com.cognifide.qa.bb.provider.selenium.webdriver.close.WebDriverClosedListener;
import com.cognifide.qa.bb.provider.selenium.webdriver.modifiers.WebDriverModifiers;
import com.google.common.collect.ImmutableList;
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

import java.util.List;
import java.util.Set;

@ThreadScoped
public class ChromeDriverProvider implements Provider<WebDriver> {

    private static final List<String> ARGUMENTS = ImmutableList.of(
        "--headless",
        "--disable-gpu",
        "--window-size=1280,800"
    );

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
            .usingPort(9515)
            .build();

        final ChromeOptions options = new ChromeOptions()
            .addArguments(ARGUMENTS)
            .merge(modifiedCapabilities);

        final WebDriver raw = new ChromeDriver(service, options);

        final WebDriver modified = webDriverModifiers.modifyWebDriver(raw);

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
}
