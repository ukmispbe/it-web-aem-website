package com.waters.aem.automationtests.core.sidepanel;

/**
 * Enum containing the Side Panel tabs.
 */
public enum SidePanelTabs {

    ASSETS("coral-Icon--asset"),
    COMPONENTS(""),
    CONTENT_TREE("coral-Icon--layers");

    private String cssClass;

    SidePanelTabs(String cssClass) {
        this.cssClass = cssClass;
    }

    public String getCssClass() {
        return cssClass;
    }
}
