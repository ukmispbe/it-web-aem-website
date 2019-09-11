package com.waters.aem.automationtests.components;

        import com.cognifide.qa.bb.qualifier.PageObjectInterface;

@PageObjectInterface
public interface SectionContainer {

    String getTitle();

    boolean isMobileCollapsed();

}
