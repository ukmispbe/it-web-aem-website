package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;
import com.waters.aem.automationtests.components.impl.LinkItemImpl;

import java.util.List;

@PageObjectInterface
public interface ExternalHeader {

    String getLogo();

    String getLogoLink();

    String getLogoAltText();

    boolean isNewWindow();

    String getSearchPath();

    List<LinkItemImpl> getLinkItems();
}