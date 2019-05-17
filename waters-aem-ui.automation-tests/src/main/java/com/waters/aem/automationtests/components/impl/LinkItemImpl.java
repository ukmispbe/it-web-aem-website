package com.waters.aem.automationtests.components.impl;

import com.waters.aem.automationtests.components.LinkItem;


public class LinkItemImpl implements LinkItem {

    private String link;
    private String text;
    private boolean linkIcon;
    private boolean newWindow;

    public LinkItemImpl(String text, String link, boolean linkIcon, boolean newWindow){
        this.text = text;
        this.link = link;
        this.linkIcon = linkIcon;
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