getPage("/content/waters/language-masters/en/library/application-notes").recurse { page ->
    def pageName = page.name
    if (pageName.contains(",") || pageName.contains(";") || pageName.contains(":") || pageName.contains("{")
            || pageName.contains("}")  || pageName.contains("[") || pageName.contains("]")|| pageName.contains("(")
            || pageName.contains(")")) {
                println page.path
    }
}

