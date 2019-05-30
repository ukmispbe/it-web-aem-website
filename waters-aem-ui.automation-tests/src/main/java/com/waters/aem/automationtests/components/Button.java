package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;

@PageObjectInterface
public interface Button {

    String getButtonText();

    String getButtonToolTip();

    String getButtonHref();

    boolean isNewWindow();
}
