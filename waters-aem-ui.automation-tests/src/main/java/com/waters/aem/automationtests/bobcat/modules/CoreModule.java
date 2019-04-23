package com.waters.aem.automationtests.bobcat.modules;

import com.cognifide.qa.bb.cookies.CookiesModule;
import com.cognifide.qa.bb.guice.ThreadLocalScope;
import com.cognifide.qa.bb.guice.ThreadScoped;
import com.cognifide.qa.bb.modules.ActionsModule;
import com.cognifide.qa.bb.modules.BobcatWebElementModule;
import com.cognifide.qa.bb.modules.DefaultModifiersModule;
import com.cognifide.qa.bb.modules.DragAndDropModule;
import com.cognifide.qa.bb.modules.FrameModule;
import com.cognifide.qa.bb.modules.PageObjectsModule;
import com.cognifide.qa.bb.modules.PropertyModule;
import com.cognifide.qa.bb.modules.ProxyModule;
import com.cognifide.qa.bb.modules.WebdriverModule;
import com.google.inject.AbstractModule;

/**
 * This class contain all the core bindings required for Bobcat to work. You need to install this module in your own
 * Guice module. After installation, following features will be available:
 * <ul>
 * <li>property bindings,
 * <li>system type,
 * <li>webDriver provider,
 * <li>browser capabilities provider,
 * <li>current scope,
 * <li>frame switcher,
 * <li>ThreadScoped annotation,
 * <li>WebDriverEventListener,
 * <li>jcr session provider.
 * </ul>
 */
public class CoreModule extends AbstractModule {

    @Override
    protected void configure() {
        bindScope(ThreadScoped.class, new ThreadLocalScope());
        install(new PropertyModule());
        install(new SeleniumModule());
        install(new PageObjectsModule());
        install(new WebdriverModule());
        install(new BobcatWebElementModule());
        install(new FrameModule());
        install(new ProxyModule());
        install(new DefaultModifiersModule());
        install(new DragAndDropModule());
        install(new CookiesModule());
        install(new ActionsModule());
    }
}
