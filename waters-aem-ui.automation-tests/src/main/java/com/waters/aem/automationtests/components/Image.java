package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;

@PageObjectInterface
public interface Image {

    String getSrc();

    String getAlt();

    String getTitle();

    String getLink();
}
