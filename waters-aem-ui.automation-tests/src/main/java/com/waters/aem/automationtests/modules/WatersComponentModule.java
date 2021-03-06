package com.waters.aem.automationtests.modules;

import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.components.Anchor;
import com.waters.aem.automationtests.components.Button;
import com.waters.aem.automationtests.components.Footer;
import com.waters.aem.automationtests.components.Header;
import com.waters.aem.automationtests.components.Image;
import com.waters.aem.automationtests.components.Links;
import com.waters.aem.automationtests.components.Text;
import com.waters.aem.automationtests.components.Title;
import com.waters.aem.automationtests.components.Modal;
import com.waters.aem.automationtests.components.Iframe;
import com.waters.aem.automationtests.components.Notification;
import com.waters.aem.automationtests.components.SectionContainer;
import com.waters.aem.automationtests.components.impl.AnchorImpl;
import com.waters.aem.automationtests.components.impl.ButtonImpl;
import com.waters.aem.automationtests.components.impl.FooterImpl;
import com.waters.aem.automationtests.components.impl.HeaderImpl;
import com.waters.aem.automationtests.components.impl.LinksImpl;
import com.waters.aem.automationtests.components.impl.ImageImpl;
import com.waters.aem.automationtests.components.impl.TextImpl;
import com.waters.aem.automationtests.components.impl.TitleImpl;
import com.waters.aem.automationtests.components.impl.ModalImpl;
import com.waters.aem.automationtests.components.impl.IframeImpl;
import com.waters.aem.automationtests.components.impl.NotificationImpl;
import com.waters.aem.automationtests.components.impl.SectionContainerImpl;
/**
 * Module for Waters components.
 */
public class WatersComponentModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(Text.class).to(TextImpl.class);
        bind(Title.class).to(TitleImpl.class);
        bind(Anchor.class).to(AnchorImpl.class);
        bind(Image.class).to(ImageImpl.class);
        bind(Header.class).to(HeaderImpl.class);
        bind(Footer.class).to(FooterImpl.class);
        bind(Links.class).to(LinksImpl.class);
        bind(Button.class).to(ButtonImpl.class);
        bind(Modal.class).to(ModalImpl.class);
        bind(Iframe.class).to(IframeImpl.class);
        bind(Notification.class).to(NotificationImpl.class);
        bind(SectionContainer.class).to(SectionContainerImpl.class);



    }
}