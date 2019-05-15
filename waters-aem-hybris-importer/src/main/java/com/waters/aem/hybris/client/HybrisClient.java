package com.waters.aem.hybris.client;

import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.models.ProductList;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Calendar;
import java.util.List;

/**
 * REST client for consuming catalog data from hybris OCC services.
 */
public interface HybrisClient {

    /**
     * Get the web root category.
     *
     * @return category model
     * @throws URISyntaxException if hybris OCC URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    Category getRootCategory() throws URISyntaxException, IOException;

    /**
     * Get a list of products.
     *
     * @param pageNumber result set page number (starting with 0)
     * @return product list model
     * @throws URISyntaxException if hybris OCC URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    ProductList getProductList(Integer pageNumber) throws URISyntaxException, IOException;

    /**
     * Get a list of products.
     *
     * @param pageNumber result set page number (starting with 0)
     * @param modifiedAfterTime if specified, only products updated after the given time will be included
     * @return product list model
     * @throws URISyntaxException if hybris OCC URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    ProductList getProductList(Integer pageNumber, Calendar modifiedAfterTime) throws URISyntaxException, IOException;

    /**
     * Get the product for the given product code.
     *
     * @param productCode product code
     * @return product model
     * @throws URISyntaxException if hybris OCC URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    Product getProduct(String productCode) throws URISyntaxException, IOException;

    /**
     * Get products for a given category.
     *
     * @param categoryId category identifier
     * @return list of products for category
     * @throws URISyntaxException if hybris OCC URI is invalid
     * @throws IOException if HTTP request returns an invalid response
     */
    List<Product> getProductsForCategory(String categoryId) throws IOException, URISyntaxException;
}
