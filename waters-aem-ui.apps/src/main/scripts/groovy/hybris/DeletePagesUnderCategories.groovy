getPage('/content/waters/language-masters/en/shop').listChildren().each { categoryPage ->
    println "Deleting pages below $categoryPage.title"

    categoryPage.listChildren().each  { childPage ->
        println "Deleting page at $childPage.path"
        pageManager.delete(childPage, false)
    }

    println ""
}
session.save()
