package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;


@PageObjectInterface
public interface NotificationItems {

    String getText();

    String getLink();

    boolean hasLinkIcon();

    boolean isNewWindow();
}
