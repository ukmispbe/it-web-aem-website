package com.waters.aem.akamai.client;

import java.io.IOException;
import java.net.URISyntaxException;

public interface AkamaiEdgeGridClient {

    void invalidate(String path) throws IOException, URISyntaxException;

    void delete(String path) throws IOException, URISyntaxException;
}
