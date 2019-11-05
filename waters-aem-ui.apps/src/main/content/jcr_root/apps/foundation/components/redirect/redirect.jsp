<%@page session="false"%><%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default redirect component.

  Sends a redirect to the location specified in "redirectTarget" if the WCM is
  disabled. Otherwise calls the super script.


  ***
  This script has been overlaid from /libs/foundation/components/redirect to add an additional conditional check of how the redirect URL is written.
  If the redirectTarget path is internal (/content) and contains a query parameter, we do *not* want to append ".html" to the end of the URL since
  this will be appended to the query param value, which is what the OOTB behavior was doing.
  ***

  ==============================================================================

--%><%@ page import="org.apache.commons.lang3.ArrayUtils,
                     com.day.cq.wcm.api.WCMMode,
                     com.day.cq.wcm.foundation.ELEvaluator,
                     com.day.cq.wcm.api.components.IncludeOptions,
                     com.day.cq.commons.Externalizer" %><%
%><%@include file="/libs/foundation/global.jsp" %><%

%><cq:include script="init.jsp"/><%

    // read the redirect target from the 'page properties'
    String location = properties.get("redirectTarget", "");
    // resolve variables in location
    location = ELEvaluator.evaluate(location, slingRequest, pageContext);
    Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);

    boolean internalRedirect = properties.get("redirectInternal", false);

    // legacy default is to only redirect in publish mode:
    String[] redirectModes = properties.get("redirectModes", new String[]{"DISABLED"});

    if (ArrayUtils.contains(redirectModes, WCMMode.fromRequest(request).name())) {
        // check for recursion
        if (currentPage != null && !location.equals(currentPage.getPath()) && location.length() > 0) {
            if (internalRedirect) {
                // Remove ourselves from the context stack so we start fresh with the redirect page:
                request.setAttribute(ComponentContext.CONTEXT_ATTR_NAME, null);
                // Force the redirect page's context to proxy for us:
                IncludeOptions.getOptions(request, true).forceCurrentPage(currentPage);

%><cq:include path="<%= location %>" resourceType="<%= resourceResolver.getResource(location).getResourceType() %>"/><%
            } else {
                // check for absolute path
                final int protocolIndex = location.indexOf(":/");
                final int queryIndex = location.indexOf('?');
                String wcmModeParam = request.getParameter("wcmmode");
                final boolean isWCMModeDisabledParameter = wcmModeParam != null && "disabled".equals(wcmModeParam);
                String redirectPath;

                if (protocolIndex > -1 && (queryIndex == -1 || queryIndex > protocolIndex)) {
                    redirectPath = location;
                } else if (protocolIndex == -1 && queryIndex > -1) {
                    // if this is an internal path (/content) and contains a query parameter, don't append .html at end
                    redirectPath = externalizer.externalLink(resourceResolver, Externalizer.PUBLISH, location);
                } else {
                    redirectPath = externalizer.externalLink(resourceResolver, Externalizer.PUBLISH, location + ".html");
                }

                if (isWCMModeDisabledParameter) {
                    if (queryIndex > 0) {
                        redirectPath += "&wcmmode=disabled";
                    } else {
                        redirectPath += "?wcmmode=disabled";
                    }
                }

                response.sendRedirect(redirectPath);
            }
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
        return;
    }

    // a little trick to call the super script
%><sling:include replaceSelectors="page" />
