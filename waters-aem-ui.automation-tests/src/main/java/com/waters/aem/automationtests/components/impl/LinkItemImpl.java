package com.waters.aem.automationtests.components.impl;

import com.waters.aem.automationtests.components.LinkItem;


public class LinkItemImpl implements LinkItem {

    private String link;
    private String text;
    private boolean linkIcon;
    private boolean external;

    public LinkItemImpl(String link, boolean linkIcon) {
        this.link = link;
        this.linkIcon = linkIcon;
    }

    public LinkItemImpl(String text, String link, boolean external) {
        this.text = text;
        this.link = link;
        this.external = external;
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
    public boolean isExternal() {
        return external;
    }

}