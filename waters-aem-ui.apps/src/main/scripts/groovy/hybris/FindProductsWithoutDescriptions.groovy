getResource("/etc/commerce/products").children.each { folder ->
    folder.children.each { skuResource ->

        if(!skuResource.valueMap.get("hybris:shortDescription") && !skuResource.valueMap.get("hybris:longDescription")){
            println "No description for SKU $skuResource.name"
        }

    }
}

