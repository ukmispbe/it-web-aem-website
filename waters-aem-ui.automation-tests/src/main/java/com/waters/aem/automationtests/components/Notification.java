package com.waters.aem.automationtests.components;
import com.cognifide.qa.bb.qualifier.PageObjectInterface;

import java.util.List;

@PageObjectInterface
public interface Notification {



    String getTitle();

    String getDescription();

    String getIcon();

    List<LinkItem> getNotificationItems();

}
