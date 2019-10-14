getResource("/etc/commerce/products").children.each { folder ->
    folder.children.each { skuResource ->
        def skuImages = skuResource.getChild("images")?.children

        if (skuImages) {
            skuImages.each { skuImage ->
                def imageUrl = skuImage.valueMap.get("hybris:url").replace(" ", "%20")

                if (imageUrl) {
                    def path = new URI(imageUrl).path

                    // check path in DAM
                    def imageExists = getResource(path) != null

                    if (!imageExists) {
                        println "No image in DAM for path $path"
                    }

                } else {
                    println "null imageUrl for skuImage $skuImage.path"
                }
            }
        } else {
            println "No images for SKU $skuResource.name"
        }
    }
}
