package com.waters.aem.hybris.enums;

public enum HybrisImportStatus {
    CREATED("Created"),
    UPDATED("Updated"),
    IGNORED("Ignored"),
    DELETED("Deleted");

    private String description;

    HybrisImportStatus(final String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}