package com.waters.aem.akamai.client;

import java.io.IOException;

public interface AkamaiEdgeGridClient {

    void invalidate(String path) throws IOException;

    void delete(String path) throws IOException;
}
