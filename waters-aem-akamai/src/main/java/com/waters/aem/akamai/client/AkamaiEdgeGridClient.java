package com.waters.aem.akamai.client;

import java.io.IOException;
import java.net.URISyntaxException;

public interface AkamaiEdgeGridClient {

    boolean invalidate(String path) throws IOException, URISyntaxException;

    boolean delete(String path) throws IOException, URISyntaxException;
}
