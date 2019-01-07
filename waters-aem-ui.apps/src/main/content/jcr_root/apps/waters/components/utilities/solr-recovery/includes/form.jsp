<%@include file="/libs/foundation/global.jsp" %><%@taglib prefix="sling2" uri="http://sling.apache.org/taglibs/sling" %>
<form id="solr-recovery-form">
	<div class="form-row">
		<label acs-coral-heading>
			Page Path
		</label>
		<span>
			<input type="text" name="pagePath" class="coral-Textfield" ng-required="true" ng-pattern="/^\/.+$/" ng-model="form.pagePath" placeholder="Page path"/>
		</span>
	</div>

	<div class="form-row">
		<label acs-coral-heading>
			Include Descendants?
		</label>
		<span>
			<div class="coral-Selector">
				<label class="coral-Selector-option">
					<input ng-model="form.includeDescendants" type="radio" class="coral-Selector-input" name="includeDescendants" value="true" />
					<span class="coral-Selector-description">Yes</span>
				</label>
				<label class="coral-Selector-option">
					<input ng-model="form.includeDescendants" type="radio" class="coral-Selector-input" name="includeDescendants" value="false" />
					<span class="coral-Selector-description">No</span>
				</label>
			</div>
		</span>
	</div>

	<div class="form-row">
		<div class="form-left-cell">&nbsp;</div>
		<button class="coral-Button coral-Button--primary" ng-click="addToIndex();">Add To Index</button>
		<button class="coral-Button coral-Button--secondary" ng-click="deleteFromIndex();">Remove From Index</button>
	</div>
</form>
