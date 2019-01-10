<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="sling2" uri="http://sling.apache.org/taglibs/sling" %>
<form id="solr-recovery-form" ng-submit="updateIndex()">
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
            Action
        </label>
        <span>
			<div class="coral-Selector">
				<label class="coral-Selector-option">
					<input ng-model="form.action" type="radio" class="coral-Selector-input" name="action" value="add"/>
					<span class="coral-Selector-description">Add to Index</span>
				</label>
				<label class="coral-Selector-option">
					<input ng-model="form.action" type="radio" class="coral-Selector-input" name="action" value="delete"/>
					<span class="coral-Selector-description">Delete from Index</span>
				</label>
			</div>
		</span>
    </div>

    <div class="form-row">
        <label acs-coral-heading>
            Include Descendants?
        </label>
        <span>
			<div class="coral-Selector">
				<label class="coral-Selector-option">
					<input ng-model="form.includeDescendants" type="radio" class="coral-Selector-input" name="includeDescendants" value="true"/>
					<span class="coral-Selector-description">Yes</span>
				</label>
				<label class="coral-Selector-option">
					<input ng-model="form.includeDescendants" type="radio" class="coral-Selector-input" name="includeDescendants" value="false"/>
					<span class="coral-Selector-description">No</span>
				</label>
			</div>
		</span>
    </div>

    <div class="form-row">
        <div class="form-left-cell">&nbsp;</div>
        <button class="coral-Button coral-Button--primary">Submit</button>
    </div>
</form>
