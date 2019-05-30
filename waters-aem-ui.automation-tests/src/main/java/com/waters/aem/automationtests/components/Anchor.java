package com.waters.aem.automationtests.components;

import com.cognifide.qa.bb.qualifier.PageObjectInterface;

import java.util.List;

@PageObjectInterface
public interface Anchor {

    List<String> getLinkTitles();
}
