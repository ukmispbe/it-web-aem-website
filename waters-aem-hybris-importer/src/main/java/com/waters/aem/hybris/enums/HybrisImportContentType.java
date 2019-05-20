package com.waters.aem.hybris.enums;

public enum HybrisImportContentType {
    PRODUCT("Product"),
    SKU_PAGE("Sku Page"),
    CATEGORY_PAGE("Category Page"),
    TAG("Tag");

    private String description;

    HybrisImportContentType(final String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
