package com.waters.aem.hybris.client

import com.fasterxml.jackson.databind.ObjectMapper
import com.waters.aem.hybris.models.Category
import com.waters.aem.hybris.models.Product
import com.waters.aem.hybris.models.ProductList

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES

class MockHybrisClient implements HybrisClient {

    private static final ObjectMapper MAPPER = new ObjectMapper().configure(FAIL_ON_UNKNOWN_PROPERTIES, false)

    @Override
    Category getRootCategory() {
        getModel("category.json", Category)
    }

    @Override
    ProductList getProductList(Integer pageNumber) {
        getModel("productlist.${pageNumber}.json", ProductList)
    }

    @Override
    ProductList getProductList(Integer pageNumber, Calendar modifiedAfterTime) {
        getModel("productlist.${pageNumber}.json", ProductList)
    }

    @Override
    Product getProduct(String productCode) {
        getModel("product.${productCode}.json", Product)
    }

    private <T> T getModel(String jsonFileName, Class<T> clazz) {
        def stream = this.class.getResourceAsStream("/$jsonFileName")

        MAPPER.readValue(stream, clazz)
    }
}
