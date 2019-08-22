package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;

import java.util.List;

@PageObjectInterface
public interface Footer {

    String getLogo();

    String getLogoLink();

    String getLogoAltText();

    boolean isNewWindow();

    String getCookiesLink();

    String getCopyrightText();

    List<LinkItem> getLinkItems();
}
