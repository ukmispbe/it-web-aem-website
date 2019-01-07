<%@include file="/libs/foundation/global.jsp" %><%

    String favicon = component.getProperties().get("favicon", String.class);
    if (favicon != null) {
        pageContext.setAttribute("favicon",  xssAPI.getValidHref(resourceResolver.map(slingRequest, favicon)));
    }
%><c:set var="pageTitle"
       value="<%= xssAPI.encodeForHTML(currentPage.getTitle()) %>" />

<c:set var="pagePath"
       value="<%= xssAPI.getValidHref(resourceResolver.map(slingRequest, currentPage.getPath())) %>"
       scope="request"/>

<c:set var="resourcePath"
       value="<%= xssAPI.getValidHref(resourceResolver.map(slingRequest, resource.getPath())) %>"
       scope="request"/>

<c:set var="clientLib"
       value="<%= xssAPI.encodeForHTMLAttr("waters." + component.getName() + ".app") %>"
       scope="request"/>

<c:set var="app"
       value="<%= xssAPI.encodeForHTMLAttr("waters-" + component.getName() + "-app") %>"
       scope="request"/>

<!doctype html>
<html class="coral-App">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title>${pageTitle} | Waters</title>

        <c:if test="${not empty favicon}">
            <link rel="shortcut icon" href="${favicon}"/>
        </c:if>

        <cq:include script="/apps/acs-commons/components/utilities/app-page/includes/head-libs.jsp"/>
    </head>

    <body class="acs-commons-page coral--light">
        <div id="acs-commons-${component.name}-app">
            <header acs-coral-tools-header data-context-path="${request.contextPath}" data-page-path="${pagePath}.html" data-title="${pageTitle}"></header>

            <cq:include script="/apps/acs-commons/components/utilities/app-page/includes/notifications.jsp"/>

            <div class="page" role="main">
                <div class="content">
                    <div class="content-container">
                        <div class="content-container-inner">
                            <h1 class="coral-Heading coral-Heading--1">${pageTitle}</h1>

                            <cq:include script="content.jsp"/>
                        </div>
                    </div>
                </div>
            </div>

            <cq:include script="/apps/acs-commons/components/utilities/app-page/includes/footer-libs.jsp"/>
        </div>
    </body>
</html>