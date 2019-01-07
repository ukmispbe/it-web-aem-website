/*
 * #%L
 * ACS AEM Commons Bundle
 * %%
 * Copyright (C) 2017 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
package com.waters.aem.solr.servlets;

import com.icfolson.aem.library.core.constants.PathConstants;
import com.waters.aem.solr.index.SolrIndexService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

@Component(service = Servlet.class)
@SlingServletResourceTypes(
    resourceTypes = "waters/components/utilities/solr-recovery",
    methods = "GET",
    extensions = PathConstants.EXTENSION_JSON,
    selectors = { SolrRecoveryServlet.ADD, SolrRecoveryServlet.DELETE }
)
public final class SolrRecoveryServlet extends SlingSafeMethodsServlet {

    static final String ADD = "add";

    static final String DELETE = "delete";

    private static final Logger LOG = LoggerFactory.getLogger(SolrRecoveryServlet.class);

    @Reference
    private SolrIndexService solrIndexService;

    @Override
    protected void doGet(@Nonnull final SlingHttpServletRequest request,
        @Nonnull final SlingHttpServletResponse response) throws ServletException, IOException {
        final String pagePath = request.getParameter("pagePath");
        final boolean includeDescendants = Boolean.valueOf(request.getParameter("includeDescendants"));

        final String[] selectors = request.getRequestPathInfo().getSelectors();

        final boolean success;

        if (ADD.equals(selectors[0])) {
            LOG.info("adding path to solr index : {}, including descendants : {}", pagePath, includeDescendants);

            success = solrIndexService.addToIndex(pagePath, includeDescendants);
        } else {
            LOG.info("deleting path from solr index : {}", pagePath);

            success = solrIndexService.deleteFromIndex(pagePath);
        }

        if (!success) {
            throw new ServletException();
        }

        // writeJsonResponse(response, Collections.singletonMap("succeeded", success));
    }
}
