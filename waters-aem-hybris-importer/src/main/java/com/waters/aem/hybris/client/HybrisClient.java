package com.waters.aem.hybris.client;

import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductList;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Calendar;

public interface HybrisClient {

    Category getRootCategory() throws URISyntaxException, IOException;

    ProductList getProductList(Integer pageNumber) throws URISyntaxException, IOException;

    ProductList getProductList(Integer pageNumber, Calendar modifiedAfterTime) throws URISyntaxException, IOException;

    Product getProduct(String productCode) throws URISyntaxException, IOException;
}
