<%@include file="/libs/foundation/global.jsp" %><%
%><%@page session="false"%><%
%><div class="acs-section">
	<div ng-controller="MainCtrl" ng-init="app.uri = '${resourcePath}';">
	    <p>Enter the page path to be indexed.</p>
	    <cq:include script="includes/form.jsp"/>
	</div>
</div>