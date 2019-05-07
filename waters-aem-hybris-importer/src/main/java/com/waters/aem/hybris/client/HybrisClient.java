package com.waters.aem.hybris.client;

import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;

import java.io.IOException;
import java.net.URISyntaxException;

public interface HybrisClient {

    Category getRootCategory() throws URISyntaxException, IOException;

    Product getProduct(String productId) throws URISyntaxException, IOException;
}
