package com.waters.aem.automationtests.components.impl;


import com.waters.aem.automationtests.components.NotificationItems;

public class NotificationItemsImpl implements NotificationItems  {

    private String text;
    private String link;
    private boolean linkIcon;
    private boolean newWindow;

    public NotificationItemsImpl(String text, String link, boolean linkIcon, boolean newWindow) {
        this.text = text;
        this.link = link;
        this.linkIcon = linkIcon;
        this.newWindow = newWindow;
    }

    public NotificationItemsImpl(String text, String link, boolean newWindow) {
        this.text = text;
        this.link = link;
        this.newWindow = newWindow;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public String getLink() {
        return link;
    }

    @Override
    public boolean hasLinkIcon() {
        return linkIcon;
    }

    @Override
    public boolean isNewWindow() {
        return newWindow;
    }


}
