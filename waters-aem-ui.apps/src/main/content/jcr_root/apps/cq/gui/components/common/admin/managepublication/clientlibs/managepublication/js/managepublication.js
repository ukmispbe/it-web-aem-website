/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
(function (document, Granite, $) {
    "use strict";

    var ns = ".manage-publication";

    var PACKAGE_SELECTOR = ".package";
    var TABLE_SELECTOR = ".cq-common-admin-sourcepages";
    var NUM_CHILDREN_CHECK = 20;

    var treeURL = Granite.HTTP.externalize("/bin/wcm/siteadmin/tree.json");
    var referencesURL = Granite.HTTP.externalize("/bin/wcm/references.json");

    var ui = $(window).adaptTo("foundation-ui");
    var registry = $(window).adaptTo("foundation-registry");
    var Paginator = $(window).adaptTo("foundation-util-paginator");
    var messenger = $(window).adaptTo("foundation-util-messenger");
    var authorizablesCache = {};
    var paginator;
    var table, wizard, form;

    // references management
    // list of aggregated references over all selected resources
    var AGGREGATED_REFERENCES_NAME = "refPathList";
    var references_aggregated = [];
    // list of the status of the aggregated resources
    var AGGREGATED_REFERENCES_STATUS_NAME = "refIncludeList";
    var references_status_aggregated = [];

    function getRow(data) {
        data.path = data.path || "";
        data.cache = data.cache || {};
        data.cache.thumbnailurl = data.cache.thumbnailurl || "";
        data.cache.title  = data.cache.title ? data.cache.title.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;") : "";
        var time = !!data.cache.isPublished ? `<foundation-time value="${data.cache.published}"></foundation-time>` : data.cache.published;
        var description = data.cache.references ? data.cache.references.description : '';
        var row = `<tr is="coral-table-row" itemprop="item" class="foundation-collection-item" data-foundation-collection-item-id="${data.path}">
                    <td is="coral-table-cell" class="select" coral-table-rowselect>
                        <img class="foundation-collection-item-thumbnail" src="${data.cache.thumbnailurl}" alt="">
                    </td>
                    <td class="foundation-collection-item-title" is="coral-table-cell" alignment="column">
                        <span>${data.cache.title}</span><div class="foundation-layout-util-subtletext">${data.path}</div>
                    </td>
                    <td class="foundation-collection-item-modified" is="coral-table-cell" alignment="column" value="${data.cache.modifieddate}">
                        <foundation-time value="${data.cache.modified}"></foundation-time>
                        <div class="foundation-layout-util-subtletext foundation-collection-item-user-info" user-info-id="${data.cache.modifiedbyuser}">
                            ${data.cache.modifiedby}
                        </div>
                    </td>
                    <td class="foundation-collection-item-published" is="coral-table-cell" alignment="column" value="${data.cache.publisheddate}">
                        ${time}
                        <div class="foundation-layout-util-subtletext foundation-collection-item-user-info" user-info-id="${data.cache.publishedbyuser}">
                            ${data.cache.publishedby}
                        </div>
                    </td>
                    <td class="foundation-collection-item-references" is="coral-table-cell" alignment="column">
                     <span> ${description} </span>
                    </td>
                  </tr>)`;
        return row;
    }

    var text = Granite.I18n.get("There is no item.");
    var emptyRow = `<tr is="coral-table-row" class="empty-row">
                        <td is="coral-table-cell" colspan="5" alignment="center">  ${text}  </td>
                    </tr>`;

    function _getItemFromPath(wizard, resourcePath) {
        var retVal = null;
        if (wizard.childResourcePageList && wizard.childResourcePageList.length > 0) {
            for (var index = 0; index < wizard.childResourcePageList.length; index++) {
                var currentItem = wizard.childResourcePageList[index];
                if (currentItem.path === resourcePath) {
                    retVal = currentItem;
                    break;
                }
            }
        }
        return retVal;
    };

    function _removeResourcePath(wizard, resourcePath) {
        if (wizard.childResourcePageList && wizard.childResourcePageList.length > 0) {
            for (var index = 0; index < wizard.childResourcePageList.length; index++) {
                var currentItem = wizard.childResourcePageList[index];
                if (currentItem.path == resourcePath) {
                    wizard.childResourcePageList.splice(index, 1);
                    wizard.childResourcePageList.forEach(function (resource) {
                        wizard.hasReplicationRights = wizard.hasReplicationRights || resource.cache.hasReplicationRights;
                    });
                    $("input[type=hidden][name=srcPathList][data-path='" + currentItem.path + "']").remove();
                    break;
                }
            }

            // recreate aggregated references, but keep the status
            _manageReferences('remove');
        }
    };

    function _appendResourcePage(wizard, resourcePath, bRefreshUI) {
        if (!wizard.childResourcePageList) {
            wizard.childResourcePageList = [];
        }
        var newItem = {};
        newItem.path = resourcePath;
        return _validateResourcePage(newItem).done(function() {
            if (newItem.valid) {
                var paginator = $(TABLE_SELECTOR).data("foundation-layout-table.internal.paginator");
                wizard.childResourcePageList.splice(paginator.offset, 0, newItem);
                var table = _getTable(wizard);
                _appendCurrentPage(wizard, table, newItem);
                paginator.offset = table.items.getAll().length - $(table).find(".empty-row").length;
                if (bRefreshUI) {
                    _refreshChildPageListUI(wizard);
                }
            }
        });
    };

    function _getTable(wizard) {
        if (typeof table === "undefined" || table === null || table.length === 0) {
            var table = wizard.find(TABLE_SELECTOR);
            return table[0];
        } else {
            return table[0];
        }

    };

    function _getSelectedItems(wizard) {
        var contentTable = _getTable(wizard);
        return contentTable.selectedItems;
    };

    function _refreshChildPageListUI(wizard) {

        _updateButtonStates(wizard);

        var table = _getTable(wizard);
        var scopeStepControls = $(wizard).find(".foundation-layout-wizard2-controls > coral-panel:nth-of-type(2)");
        var nextControl = scopeStepControls.find(".foundation-wizard-control[data-foundation-wizard-control-action='next']")[0];

        if (wizard.childResourcePageList.length === 0) {
            table.items.add($(emptyRow)[0]);
            // explicitly trigger event (this can be removed once CUI-6679 is resolved)
            $(table).trigger("coral-collection:add");
            nextControl.disabled = true;
        }
        var emptRow = $(table).find(".empty-row");
        if (wizard.childResourcePageList.length > 0 && emptRow.length > 0) {
            table.items.remove(emptRow[0]);
            nextControl.disabled = false;
        }
    };

    function _updateWorkflowsInfo() {
        if (wizard.requestMultiResourceSupport !== undefined && !wizard.requestMultiResourceSupport) {
            var check = $(".cq-sites-startbulkworkflows-keeppackage-request")[0];
            if (check !== undefined) {
                check.checked = false;
                check.disabled = true;
                $(check).trigger("change" + ns);
            }
        }

        if (wizard.scheduleMultiResourceSupport !== undefined && !wizard.scheduleMultiResourceSupport) {
            var check = $(".cq-sites-startbulkworkflows-keeppackage-schedule")[0];
            if (check !== undefined) {
                check.checked = false;
                check.disabled = true;
                $(check).trigger("change" + ns);
            }
        }

        var directPublishResNo = 0;
        var requestPublishResNo = 0;
        var schedulePublishResNo = 0;
        wizard.childResourcePageList.forEach(function (resource) {
            if (resource.cache.hasReplicationRights && !wizard.schedule) {
                directPublishResNo += 1;
            } if (!resource.cache.hasReplicationRights) {
                requestPublishResNo  +=1;
            } else if (wizard.schedule) {
                schedulePublishResNo += 1;
            }
        });

        var scheduleSection = $(".schedule-publication-info");
        var requestSection = $(".request-publication-info");
        var directSection = $(".direct-publication-info");

        if (!wizard.schedule || schedulePublishResNo === 0) {
            scheduleSection.hide();
        } else {
            scheduleSection.show();
            scheduleSection.find(".coral-Form-fieldlabel").first().html(Granite.I18n.get("{0} resource(s) will run through the workflow <b>{1}</b>.", [schedulePublishResNo, wizard.scheduleWorkflowTitle]));
        }

        var cmd = $(".cq-common-replication-type-group").val();
        var action = cmd === "Activate" ? "published" : "unpublished";
        if (directPublishResNo > 0) {
            directSection.show();
            directSection.find(".coral-Form-fieldlabel").html(Granite.I18n.get("{0} resource(s) will be {1} directly.", [directPublishResNo, action]));
        } else {
            directSection.hide();
        }

        if( requestPublishResNo > 0) {
            requestSection.show();
            requestSection.find(".coral-Form-fieldlabel").first().html(Granite.I18n.get("{0} resource(s) will run through the workflow <b>{1}</b>.", [requestPublishResNo, wizard.requestWorkflowTitle]));
        } else {
            requestSection.hide();
        }

        setSubmitButtonLabel($(".cq-common-replication-type-group").val(), wizard.hasReplicationRights, wizard.schedule);
    };

    function _validateResourcePage(currentItem) {
        var deferred = $.Deferred();
        //first find if we have all information about this item
        if (!currentItem.info) {
            var url = Granite.HTTP.externalize(currentItem.path + "/jcr:content.json", true);
            var data = Granite.HTTP.eval(url);
            currentItem.info = data;
        }
        currentItem.valid = !!currentItem.info;
        // Use case pages without title
        if (currentItem.valid && !currentItem.info["jcr:title"]) {
            currentItem.info["jcr:title"] = currentItem.path.substring(currentItem.path.lastIndexOf("/") + 1, currentItem.path.length);
        }
        if (currentItem.valid) {
            //process more data now
            if (!currentItem.cache) {
                currentItem.cache = {};
            }
            currentItem.cache.title = currentItem.info["jcr:title"];
            var publishedInfo = _getPublishedInfo(currentItem);
            var modifiedInfo = _getModifiedInfo(currentItem);
            currentItem.cache.isPublished = publishedInfo.isPublished;
            currentItem.cache.published = publishedInfo.state;
            currentItem.cache.publisheddate = publishedInfo.date;
            currentItem.cache.publishedby = publishedInfo.userName;
            currentItem.cache.publishedbyuser = publishedInfo.userId;
            currentItem.cache.modifieddate = modifiedInfo.date;
            currentItem.cache.modifiedby = modifiedInfo.userName;
            currentItem.cache.modified = modifiedInfo.state;
            currentItem.cache.modifiedbyuser = modifiedInfo.userId;
            currentItem.cache.thumbnailurl = Granite.HTTP.externalize(currentItem.path + ".thumb.48.48.png?ck=" + modifiedInfo.date);
            _checkReplicationPriviledge(currentItem);

            if (!currentItem.cache.references) {
                // get references
                currentItem.cache.references = {};
                currentItem.cache.references.all = {};
                currentItem.cache.references.total = 0;

                _getReferences([currentItem.path]).success(function (json) {
                    var refs = [];
                    for (var i = 0; i < json.assets.length; i++) {
                        refs.push(json.assets[i].path)
                    }

                    currentItem.cache.references = {};
                    currentItem.cache.references.all = refs;
                    currentItem.cache.references.total = refs.length;
                    currentItem.cache.references.description = _getReferencesInfo(currentItem);

                    deferred.resolve();
                });
            }
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return deferred.promise();
    }

    function _checkReplicationPriviledge(item) {
        var userId = item.info["cq:lastReplicatedBy"];
        var servletUrl = Granite.HTTP.externalize(item.path + ".permissions.json");
        var hasRights = false;
        $.ajax({
            url: servletUrl,
            type: "GET",
            dataType: "json",
            data: {
                "privileges": "crx:replicate"
            }
        }).done(function (responseJson) {

                if (responseJson.hasOwnProperty("crx:replicate")) {
                    hasRights = responseJson["crx:replicate"] || false;
                }
                item.cache.hasReplicationRights = hasRights;
                wizard.hasReplicationRights = wizard.hasReplicationRights && hasRights;

                _updateWizardSteps(wizard);
                _updateWorkflowsInfo();
            }
        );
    }

    function _getPublishedInfo(item) {
        var replicatedDate = item.info["cq:lastReplicated"];
        var lastReplicationAction = item.info["cq:lastReplicationAction"];
        var state = "";
        var userId = item.info["cq:lastReplicatedBy"];
        var userName = "";
        var date = "";
        var isPublished = true;

        if (replicatedDate) {
            var date = new Date(replicatedDate);
            state = date.toISOString();
            date = date.getTime();
        }
        if (lastReplicationAction !== "Activate") {
            isPublished = false;
            state = Granite.I18n.get("Not published");
            userName = "";
            userId = "";
        } else {
            if (userId) {
                userName = _resolveUserNameById(userId);
            }
        }
        return {
            isPublished: isPublished,
            state: state,
            userName: userName,
            userId: userId || "",
            date: date
        };
    }

    function _getModifiedInfo(item) {
        var lastModifiedDate = item.info["cq:lastModified"];
        var userId = item.info["cq:lastModifiedBy"];
        var userName = "";
        var state = "";
        var date = "";
        if (lastModifiedDate) {
            var date = new Date(lastModifiedDate);
            state = date.toISOString();
            date = date.getTime();
        }
        if (userId) {
            userName = _resolveUserNameById(userId);
        }
        return {
            state: state,
            userName: userName,
            userId: userId,
            date: date
        };
    }

    function _resolveUserNameById(userId) {
        var servletUrl = Granite.HTTP.externalize('/libs/granite/security/search/authorizables.json?query={"condition":[{"named":"' + userId + '"}]}');
        var userName = "";
        if (!authorizablesCache.hasOwnProperty(userId)) {
            authorizablesCache[userId] = "";
            $.ajax({
                url: servletUrl,
                type: "GET",
                dataType: "json",
                success: function (responseJson) {
                    authorizablesCache[userId] = userName;
                    var userData = {};
                    if (responseJson.hasOwnProperty("authorizables") && responseJson.authorizables.length) {
                        userData = responseJson.authorizables[0];
                        if (userData.hasOwnProperty("name")) {
                            userName = userData.name;
                            authorizablesCache[userId] = userName;
                            _updateSourceUserInfos();
                        }
                    }
                }
            });
        } else {
            userName = authorizablesCache[userId];
        }
        return userName;
    }

    function _updateSourceUserInfos() {
        var form = _getFormElement();
        var wizard = _getWizardFromForm(form);
        var table = _getTable(wizard);
        $(table).find('.foundation-collection-item-user-info[user-info-id]').each(function () {
            var userId = $(this).attr("user-info-id");
            var userName = authorizablesCache[userId];
            if (userName) {
                $(this).text(userName);
                $(this).removeAttr("user-info-id");
            }
        });
    }

    function _appendCurrentPage(wizard, table, currentItem) {
        table.variant = Coral.Table.variant.LIST;
        table.multiple = true;
        table.selectable = true;
        var $table_row = $(getRow(currentItem));

        table.items.add($table_row[0]);
        _appendHiddenField(wizard, 'srcPathList', currentItem.path, currentItem.path);
        // explicitly trigger event (this can be removed once CUI-6679 is resolved)
        $(table).trigger("coral-collection:add");
    }

    function _updateItemIncludeSubPages(wizard, resources) {
        //Add child resources in the table
        if (resources.length === 0) {
            return;
        }
        var bAdded = false;
        var bRootPath = false;
        var paginator = $(_getTable(wizard)).data("foundation-layout-table.internal.paginator");
        var initialOffset = paginator.offset;

        // get the misisng items to update the references
        var missingItems = [];
        resources.forEach(function (currentItem) {
            var path = currentItem.path;
            if (path != '/content') {
                var currentItem = _getItemFromPath(wizard, path);
                if (currentItem == null) {
                    missingItems.push(path);
                }
            }
        });
        // update the references in the aggregated list
        _manageReferences('update', {'path': missingItems});

        var promisses = [];
        resources.forEach(function (currentItem) {
            var newItem = _getItemFromPath(wizard, currentItem.path);
            if (newItem === null) {
                if (currentItem.path != '/content') {
                    var promise = _validateResourcePage(currentItem).done(function () {
                        wizard.childResourcePageList.push(currentItem);
                        var table = _getTable(wizard);
                        if (table.items.getAll().length - $(table).find(".empty-row").length <= (initialOffset + paginator.limit)) {
                            // append the child to the list of visible items in the table
                            _appendCurrentPage(wizard, _getTable(wizard), currentItem);
                            paginator.offset = table.items.getAll().length - $(table).find(".empty-row").length;
                        } else {
                            // only append the hidden fields so they are up to date
                            _appendHiddenField(wizard, 'srcPathList', currentItem.path, currentItem.path);
                        }
                    });
                    bAdded = true;
                    promisses.push(promise);
                } else {
                    bRootPath = true;
                }
            }
        });
        $.when.apply($, promisses).fail(function() {
            ui.prompt(Granite.I18n.get("Error"),
                Granite.I18n.get("Selected resources are not valid."),
                "error",
                [{
                    text: Granite.I18n.get("Ok"),
                    id: "no"
                }]
            );
        }).always(function() {
            ui.clearWait();
        });
        if (bAdded) {
            _refreshChildPageListUI(wizard);
        } else if (!bRootPath) {
            ui.prompt(Granite.I18n.get("Error"),
                Granite.I18n.get("Selected page already exist in the list."),
                "error",
                [{
                    text: Granite.I18n.get("Ok"),
                    id: "no"
                }]
            );
        }
    }

    /**
     * Get the information regarding references for the user
     * @param currentItem
     * @returns {*} the info as text
     * @private
     */
    function _getReferencesInfo(currentItem) {
        var total = currentItem.cache.references.total, selected = 0;
        var description = Granite.I18n.get("all");

        var references = currentItem.cache.references.all;
        for (var i = 0; i < references.length; i++) {
            var reference = references[i];
            if (_referenceIsSelected(reference)) {
                selected++;
            }
        }

        if (total === 0) {
            description = Granite.I18n.get("No references to publish");
        } else if (selected === 0) {
            description = Granite.I18n.get("Publishing none of {0} reference(s)", total);
        } else if (total > selected) {
            description = Granite.I18n.get("Publishing {0} of {1} reference(s)", [selected, total]);
        }

        return description;
    }

    function _updateReferenceInfo(currentItem) {
        var referencesColumn = wizard.find("[data-foundation-collection-item-id='" + currentItem.path + "']" +
            " .foundation-collection-item-references");
        if (referencesColumn.length) {
            referencesColumn.text(_getReferencesInfo(currentItem));
        }
    }

    /**
     * Update the references in the table
     * @param wizard
     * @param event
     * @private
     */
    function _updateItemReferences(wizard, event) {
        var selected = event.selectedReferences,
            unselected = event.unselectedReferences;

        // update the status of the aggregated references
        // selected references
        for (var index = 0; index < selected.length; index++) {
            var reference = selected[index];
            _updateReference(reference, true);
        }
        // unselected references
        for (var index = 0; index < unselected.length; index++) {
            var reference = unselected[index];
            _updateReference(reference, false);
        }

        // update the hidden fields holding the serialized information of the aggregated references
        _updateReferencesHiddenFields();

        // after selecting / unselecting a reference, the information regarding references for the user has to be
        // updated
        // update the reference info for all elements in the table
        var items = wizard.childResourcePageList;
        items.forEach(function (currentItem) {
            _updateReferenceInfo(currentItem);
        });
    }

    /**
     * Manage the references
     *
     * @param action 'update', 'remove'
     * @param params data for the references POST
     * @param preserveStatus preserve the status for the references
     * @private
     */
    function _manageReferences(action, params) {
        action = (action || 'update');
        if (!params) {
            var paths = [];
            for (var i = 0; i < wizard.childResourcePageList.length; i++) {
                paths.push(wizard.childResourcePageList[i].path);
            }
            params = (params || {'path': paths});
        }

        if (!params.path) {
            // nothing to do
            return;
        }

        _getReferences(params.path).success(function (json) {
            var references = [];
            if (json.assets) {
                var refs = [];
                var status = [];

                for (var i = 0; i < json.assets.length; i++) {
                    var path = json.assets[i].path;
                    if (!path) continue;

                    references.push(path);

                    if (action === 'remove') {
                        // rebuild the references but preserve the status

                        // get the current index
                        var oldIdx = _getReferenceIndex(path);

                        // copy reference to new object
                        var newIdx = refs.length;
                        refs[newIdx] = references_aggregated[oldIdx];
                        status[newIdx] = references_status_aggregated[oldIdx];
                    } else if (action === 'update') {
                        // when adding a new reference, reference is selected by default
                        _updateReference(path, true, true);
                    }
                }
                if (action === 'remove') {
                    references_aggregated = refs;
                    references_status_aggregated = status;
                }

                // take care of the hidden fields
                _updateReferencesHiddenFields();
                // take care of the references information in the table
                var items = wizard.childResourcePageList;
                items.forEach(function (currentItem) {
                    _updateReferenceInfo(currentItem);
                });
            }

            return references;
        });
    }

    /**
     * Update he status of a reference
     * @param path reference path
     * @param isSelectedByDefault default value for selected status
     * @param preserveStatus when updating, preserve the status of the reference
     * @returns {*}
     * @private
     */
    function _updateReference(path, isSelectedByDefault, preserveStatus) {
        var idx = _getReferenceIndex(path);

        // update or add a new reference to the aggregated list
        if (preserveStatus) {
            if (idx > -1) {
                // reference is already registered, nothing to do here, no rewriting of the reference status
                return idx;
            }
        }

        if (idx === -1) idx = references_aggregated.length;

        references_aggregated[idx] = path;
        references_status_aggregated[idx] = isSelectedByDefault;

        return idx;
    }

    /**
     * Add / update the hidden fields for the reference management
     * @private
     */
    function _updateReferencesHiddenFields() {
        // update / add the hidden fields
        var wizard_form = $(wizard[0]);
        // aggregated references
        var refPathList = wizard_form.find("input[type='hidden'][name='" + AGGREGATED_REFERENCES_NAME +"']");
        if (refPathList.length) {
            refPathList.val(JSON.stringify(references_aggregated));
        } else {
            _appendHiddenField(wizard, AGGREGATED_REFERENCES_NAME, "", JSON.stringify(references_aggregated));

        }

        // status of the aggregated references
        var refIncludeList = wizard_form.find("input[type='hidden'][name='" + AGGREGATED_REFERENCES_STATUS_NAME +"']");
        if (refIncludeList.length) {
            refIncludeList.val(JSON.stringify(references_status_aggregated));
        } else {
            _appendHiddenField(wizard, AGGREGATED_REFERENCES_STATUS_NAME, "", JSON.stringify(references_status_aggregated));

        }
    }

    /**
     * check if a reference is selected
     * a reference is selected by default
     * @param path reference path
     * @returns {boolean|*} reference is selected
     * @private
     */
    function _referenceIsSelected(path) {
        var idx = _getReferenceIndex(path);
        // if reference is already registered, check the status
        // otherwise return true by default
        return ((idx > -1 && references_status_aggregated[idx]) || (idx === -1));
    }

    /**
     * get the index of the reference
     * @param path
     * @returns {*}
     * @private
     */
    function _getReferenceIndex(path) {
        var idx = $.inArray(path, references_aggregated);
        if (idx > -1) {
            return idx;
        }
        return -1;
    }

    /**
     * Get the references from the server
     * @param paths array of paths to get references for
     * @returns {*}
     * @private
     */
    function _getReferences(paths) {
        if (!wizard.referencesUrl) {
            wizard.referencesUrl = form.data("referencesurl");
        }

        return $.ajax(Granite.URITemplate.expand(wizard.referencesUrl), {
            "type": "POST",
            "cache": false,
            "dataType": "json",
            // use data attribute to avoid HTTP Error 414: The request URL is too long
            // in case there are a lot of pages to be checked for references and would exceed the max URL length of 2000
            "data": {
                path: paths
            }
        });
    }

    function _appendHiddenField(wizard, name, pathInfo, value) {
        var wizard_form = $(wizard[0]);
        //check if the hidden field already exists
        if (wizard_form.find("input[type=hidden][name=" + name + "][value='" + value + "']").length > 0) {
            return;
        }
        var i;
        var $hiddenField = $("<input type='hidden'/>").attr("name", name);
        wizard_form.append($hiddenField);
        $hiddenField.attr('data-path', pathInfo);
        if (value !== undefined) {
            $hiddenField.attr("value", value);
        }
    };

    function _updateWizardSteps(wizard) {
        var workflowsStep = $(".cq-common-admin-publication-workflows");
        if (workflowsStep.length > 0 && !wizard.workflowsStepDetached && (wizard.hasReplicationRights && !wizard.schedule)) {
            removeWorkflowsStep(wizard, workflowsStep);
            wizard.workflowsStepDetached = true;
        } else if (wizard.workflowsStepDetached && (!wizard.hasReplicationRights || wizard.schedule)) {
            appendWorkflowsStep(wizard, wizard.workflowsStep);
            wizard.workflowsStepDetached = false;
        }
    }

    function _updateButtonStates(wizard) {
        $(_getTable(wizard)).trigger("foundation-selections-change");
        $(".cq-common-replication-type-group").trigger("change" + ns);
        $(".cq-common-scheduling-time").trigger("change" + ns);
    };

    function _handleDeleteBtnClick(wizard) {
        var selectedItems = _getSelectedItems(wizard);
        if (selectedItems != null && selectedItems.length > 0) {
            var selectedCount = selectedItems.length;
            for (var index = 0; index < selectedCount; index++) {
                var currentItem = $(selectedItems[index]);
                _removeResourcePath(wizard, currentItem.data('foundationCollectionItemId'));
                //remove selected
                _getTable(wizard).items.remove(currentItem[0]);
            }
            //paginate
            var paginator = $(_getTable(wizard)).data("foundation-layout-table.internal.paginator");
            var hasMore = paginator.hasNext;
            if (hasMore === undefined) {
                hasMore = selectedCount.length >= (paginator.offset + paginator.limit);
            }

            if (hasMore && table.items.getAll().length - $(table).find(".empty-row").length <= 0) {
                paginator.restart(paginator.offset, hasMore);
            }

            _refreshChildPageListUI(wizard);
            _updateWizardSteps(wizard);
            _updateWorkflowsInfo();
        }
    };

    function _parseUrlParams() {
        var search_string = location.search;

        function _parse_values_internal(params, pairs) {
            if(!pairs || pairs.length === 0) {
                return {};
            }
            var pair = pairs[0];
            var parts = pair.split('=');
            var key = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts.slice(1).join('='));

            // Handle multiple parameters of the same name
            if (typeof params[key] === "undefined") {
                params[key] = value;
            } else {
                params[key] = [].concat(params[key], value);
            }

            return pairs.length == 1 ? params : _parse_values_internal(params, pairs.slice(1))
        }

        return search_string.length == 0 ? {} : _parse_values_internal({}, search_string.substr(1).split('&'));
    };

    function _getFormElement() {
        if (typeof form === "undefined" || form === null || form.length === 0) {
            var form = $(".cq-sites-managepublication-form");
            return form;
        } else {
            return form;
        }

    };

    function _getWizardFromForm(form) {
        if (typeof wizard === "undefined" || wizard === null || wizard.length === 0) {
            var wizard = form.find(".cq-sites-managepublication-wizard");
            return wizard;
        } else {
            return wizard;
        }
    };

    function handlePagination(wizard, collection, config, paginator) {
        var src = collection[0].dataset.foundationCollectionSrc;
        var hasMore = collection[0].dataset.foundationLayoutTableHasmore;

        var paginate = function (wizard, scrollContainer, paginator) {

            paginator = new Paginator({
                el: scrollContainer,
                limit: config.limit || 20,
                wait: function(paginator) {
                    ui.wait();
                    return {
                        clear: function () {
                            ui.clearWait();
                        }
                    }
                },
                resolveURL: function (paginator) {
                    return "";
                },
                processResponse: function (paginator, html) {
                    var deferred = $.Deferred();
                    var items = wizard.childResourcePageList.slice(this.offset, this.offset + this.limit);
                    items.forEach(function (currentItem) {
                        _appendCurrentPage(wizard, _getTable(wizard), currentItem);
                    });

                    var hasMore = wizard.childResourcePageList.length > (this.offset + this.limit);

                    deferred.resolve({
                        length: items.length,
                        hasNext: hasMore
                    });

                    return deferred.promise();
                }
            });

            collection.data("foundation-layout-table.internal.paginator", paginator);

            Coral.commons.ready(collection[0], function() {
                var offset = collection.find(".foundation-collection-item").length;
                paginator.start(offset);
            });
        };

        var scrollContainer = collection.children("[coral-table-scroll]");

        if (scrollContainer.length) {
            paginate(wizard, scrollContainer, paginator);
        } else {
            requestAnimationFrame(function () {
                paginate(wizard, collection.children("[coral-table-scroll]"), paginator);
            });
        }

        return function () {
            if (paginator) {
                paginator.destroy();
                collection.removeData("foundation-layout-table.internal.paginator");
                collection.removeData("foundation-layout-table.internal.paginator.sort");
            }
        };
    };

    /**
     * Returns the promise of the total number of resources that are referencing the given paths.
     */
    function countReferences(paths) {
        return $.ajax({
            url: referencesURL,
            data: {
                path: paths,
                predicate: "wcmcontent"
            },
            "type": "POST",
            cache: false,
            dataType: "json"
        }).then(function(json) {
            if (!json.pages) {
                return 0;
            }
            return json.pages.reduce(function(memo, value) {
                if (value.published && (value.isPage === true || value.isPage === "true") && value.path !== value.srcPath) {
                    return memo + 1;
                }
                return memo;
            }, 0);
        });
    }

    /**
     * Returns the promise of the total count of the descendants of the given paths.
     *
     * The promise is rejected when both the total is "0" and there is an error.
     * i.e. when we are not sure if there is at least a descendant or not.
     */
    function countChildren(paths) {
        var total = 0;

        var promises = paths.map(function(path) {
            return $.ajax({
                url: treeURL,
                data: {
                    path: path,
                    ncc: NUM_CHILDREN_CHECK
                },
                cache: false,
                dataType: "json"
            }).then(function(children) {
                total += children.length;

                children.forEach(function(child) {
                    if (!child.leaf) {
                        total += child.sub;
                    }
                });

                return true;
            }, function() {
                return $.when(false);
            });
        });

        return $.when.apply(null, promises).then(function() {
            if (total > 0) {
                return total;
            }

            var allOK = Array.prototype.every.call(arguments, function(status) {
                return status;
            });

            if (allOK) {
                return total;
            }

            return $.Deferred().reject().promise();
        });
    }

    function startReplication(items) {
        var deferreds = [];

        // check for references to publish
        var referencesToPublish = [];
        if (form[0].elements.activationCommand.value === "Activate") {
            for (var i = 0; i < references_aggregated.length; i++) {
                if (_referenceIsSelected(references_aggregated[i])) {
                    referencesToPublish.push(references_aggregated[i]);
                }
            }
        }
        // add the references before the items so that references are replicated first
        items = referencesToPublish.concat(items);

        if (items.length > 0) {
            var url = null;
            var settings = null;

            var datepicker = form[0].elements.activationDate.parentElement;
            //check if the value of the activation date is filled in
            var absTime = datepicker.valueAsDate !== null ? datepicker.valueAsDate.getTime() : new Date().getTime();

            if (wizard.hasReplicationRights) {
                if (wizard.schedule) {
                    //schedule activation
                    if (wizard.scheduleMultiResourceSupport && items.length > 1) {
                        url = Granite.HTTP.externalize(wizard.workflowUrl + PACKAGE_SELECTOR);
                        settings = {
                            "type": form.attr("method") || "POST",
                            "data": {
                                "_charset_": "utf_8",
                                "workflowModel": wizard.scheduleActivationWorkflow,
                                "absoluteTime": absTime,
                                "workflowTitle": form[0].elements.scheduleWorkflowTitle.value,
                                "packageTitle": form[0].elements.schedulePackageTitle.value,
                                "srcPathList": items
                            }
                        };
                    } else {
                        url = Granite.HTTP.externalize(wizard.workflowUrl);
                        settings = {
                            "type": form.attr("method") || "POST",
                            "data": {
                                "_charset_": "UTF-8",
                                "model": wizard.scheduleActivationWorkflow,
                                "absoluteTime": absTime,
                                "workflowTitle": form[0].elements.scheduleWorkflowTitle.value,
                                "payload": items,
                                "payloadType": "JCR_PATH"
                            }
                        };
                    }
                } else {
                    //publish now
                    url = Granite.HTTP.externalize(wizard.replicationUrl);
                    var cmd = encodeURI(form[0].elements.activationCommand.value);
                    settings = {
                        "type": form.attr("method") || "POST",
                        "data": {
                            "_charset_": "utf-8",
                            "cmd": cmd,
                            "path": items
                        }
                    };
                }
                deferreds.push($.ajax(url, settings));
            } else {
                //request for activation
                var requestItems = [];
                items = [];
                wizard.childResourcePageList.forEach(function (resource) {
                    if (resource.path) {
                        if (resource.cache.hasReplicationRights) {
                            items.push(resource.path);
                        } else {
                            requestItems.push(resource.path);
                        }
                    }

                });

                // Add references selected by user into requestItems
                if (form[0].elements.activationCommand.value === "Activate") {
                    for (var i = 0; i < references_aggregated.length; i++) {
                        if (_referenceIsSelected(references_aggregated[i])) {
                            requestItems.push(references_aggregated[i]);
                        }
                    }
                }

                if (items.length > 0) {
                    wizard.combinedActions = true;
                    if (!wizard.schedule) {
                        url = Granite.HTTP.externalize(wizard.replicationUrl);
                        var cmd = encodeURI(form[0].elements.activationCommand.value);
                        settings = {
                            "type": form.attr("method") || "POST",
                            "data": {
                                "_charset_": "utf-8",
                                "cmd": cmd,
                                "path": items
                            }
                        };

                    } else {
                        //schedule activation
                        if (wizard.scheduleMultiResourceSupport && items.length > 1) {
                            url = Granite.HTTP.externalize(wizard.workflowUrl + PACKAGE_SELECTOR);
                            settings = {
                                "type": form.attr("method") || "POST",
                                "data": {
                                    "_charset_": "utf_8",
                                    "workflowModel": wizard.scheduleActivationWorkflow,
                                    "absoluteTime": absTime,
                                    "workflowTitle": form[0].elements.scheduleWorkflowTitle.value,
                                    "packageTitle": form[0].elements.schedulePackageTitle,
                                    "srcPathList": items
                                }
                            };
                        } else {
                            url = Granite.HTTP.externalize(wizard.workflowUrl);
                            settings = {
                                "type": form.attr("method") || "POST",
                                "data": {
                                    "_charset_": "UTF-8",
                                    "model": wizard.scheduleActivationWorkflow,
                                    "absoluteTime": absTime,
                                    "workflowTitle": form[0].elements.scheduleWorkflowTitle.value,
                                    "payload": items,
                                    "payloadType": "JCR_PATH"
                                }
                            };
                        }
                    }

                    deferreds.push($.ajax(url, settings));
                }
                if (wizard.requestMultiResourceSupport && requestItems.length > 1) {
                    url = Granite.HTTP.externalize(wizard.workflowUrl + PACKAGE_SELECTOR);
                    settings = {
                        "type": form.attr("method") || "POST",
                        "data": {
                            "_charset_": "utf_8",
                            "workflowModel": wizard.requestActivationWorkflow,
                            "absoluteTime": absTime,
                            "workflowTitle": form[0].elements.requestWorkflowTitle.value,
                            "packageTitle": form[0].elements.requestPackageTitle.value,
                            "srcPathList": requestItems
                        }
                    };
                } else {
                    url = Granite.HTTP.externalize(wizard.workflowUrl);
                    settings = {
                        "type": form.attr("method") || "POST",
                        "data": {
                            "_charset_": "UTF-8",
                            "model": wizard.requestActivationWorkflow,
                            "workflowTitle": form[0].elements.requestWorkflowTitle.value,
                            "absoluteTime": absTime,
                            "payload": requestItems,
                            "payloadType": "JCR_PATH"
                        }
                    };
                }
                deferreds.push($.ajax(url, settings));
            }
            $.when.apply($, deferreds).done(function() {
                var objects = [];
                if (!wizard.combinedActions) {
                    objects.push(Array.prototype.slice.call(arguments));
                } else {
                    objects = Array.prototype.slice.call(arguments);
                }
                var successMessages = [];
                for(var i=0; i< objects.length; i++) {
                    replicationStarted(objects[i], successMessages);
                }
                if(successMessages.length > 0) {
                    var message = successMessages.join("</br>");
                    var formResponse = form.find(".foundation-form-response-ui-success").data("foundationFormResponseUiSuccess");
                    // store message so that it can be displayed after the redirect
                    try {
                        messenger.put(null, message || Granite.I18n.get("The form has been submitted successfully"), "success");
                        location.href = formResponse.redirect;
                    } catch (e) {
                        if (window.console) {
                            console.warn("Error occur setting message", e);
                        }
                    }
                }
            }).fail(function() {
                var formResponse = form.find(".foundation-form-response-ui-success").data("foundationFormResponseUiSuccess");
                try {
                    messenger.put(null, Granite.I18n.get("Not enough rights to manage publication."), "error");
                    location.href = formResponse.redirect;
                } catch (e) {
                    if (window.console) {
                        console.warn("Error occur setting message", e);
                    }
                }
            });
        }
    };

    function removeWorkflowsStep(wizard, step) {
        wizard.workflowsStep = step.clone(true);
        var lastStepControls = $(wizard).find(".foundation-layout-wizard2-controls > coral-panel").last();
        wizard.workflowsStep.append(lastStepControls.find(".foundation-wizard-control").clone(true));
        var wizardApi = $(wizard).adaptTo("foundation-wizard");
        wizard.workflowsStep.attr("data-foundation-wizard-step-title", $(wizard).find("coral-steplist > coral-step:last-of-type coral-step-label")[0].textContent);
        wizardApi.remove(step);

        lastStepControls = $(wizard).find(".foundation-layout-wizard2-controls > coral-panel").last();
        var nextControl = lastStepControls.find(".foundation-wizard-control[data-foundation-wizard-control-action='next']")[0];
        nextControl.type = "submit";
    }

    function appendWorkflowsStep(wizard, step) {

        var wizardApi = $(wizard).adaptTo("foundation-wizard");
        var lastStepControls = $(wizard).find(".foundation-layout-wizard2-controls > coral-panel").last();
        var nextControl = lastStepControls.find(".foundation-wizard-control[data-foundation-wizard-control-action='next']")[0];
        nextControl.type = "button";
        nextControl.textContent = Granite.I18n.get("Next");

        wizardApi.append([step]);

        $(wizard).find("coral-steplist > coral-step:last-of-type coral-step-label")[0].textContent = step.attr("data-foundation-wizard-step-title");
        $(wizard).find(".foundation-wizard-control:submit").on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            form.submit();
        });
    };

    function replicationStarted(result, messages) {
        //Results argument structure [response, status, xhr]
        var status = result[1];
        var xhr = result[2];
        if (status === "success") {
            var formResponse = form.find(".foundation-form-response-ui-success").data("foundationFormResponseUiSuccess");
            var cmd = $(".cq-common-replication-type-group").val();
            var action = cmd === "Activate" ? "published" : "unpublished";
            var requestAction = cmd === "Activate" ? "publication" : "unpublication";
            var i18nScheduledPublication = Granite.I18n.get("Resource(s) have been scheduled for publication");
            var i18nScheduledUnpublication = Granite.I18n.get("Resource(s) have been scheduled for unpublication");
            var i18nRequestedPublication = Granite.I18n.get("Resource(s) have been requested for publication");
            var i18nRequestedUnpublication = Granite.I18n.get("Resource(s) have been requested for unpublication");

            var message = Granite.I18n.get(formResponse.message, Granite.I18n.getVar(action));
            // Easier to translate if a complete string
            if (formResponse.message === Granite.I18n.get("Resource(s) have been {0}.")) {
                if (action === "published") {
                    message = Granite.I18n.get("Resource(s) have been published.");
                } else {
                    message = Granite.I18n.get("Resource(s) have been unpublished.");
                }
            }

            if (wizard.combinedActions) {
                if (wizard.schedule) {
                    // message changes if activation date has been specified
                    message = requestAction === "publication" ? i18nScheduledPublication : i18nScheduledUnpublication;
                    messages.push(message);
                }
                if (!wizard.hasReplicationRights) {
                    message = requestAction === "publication" ? i18nRequestedPublication : i18nRequestedUnpublication;
                }
                wizard.combinedActions = false;
                messages.push(message);
            } else {
                if (wizard.schedule) {
                    // message changes if activation date has been specified
                    message = requestAction === "publication" ? i18nScheduledPublication : i18nScheduledUnpublication;
                } else if (!wizard.hasReplicationRights) {
                    message = requestAction === "publication" ? i18nRequestedPublication : i18nRequestedUnpublication;
                }
                messages.push(message);
            }
        } else {
            ui.clearWait();
            var errorMsg = "";
            if (wizard.hasReplicationRights && wizard.schedule) {
                errorMsg = Granite.I18n.get("Failed to schedule the selected resource(s).");
            } else if (!wizard.hasReplicationRights) {
                errorMsg = Granite.I18n.get("Failed to request publishing for the selected resource(s).");
            } else {
                errorMsg = Granite.I18n.getVar($(xhr.responseText).find("#Message").text());
            }
            ui.notify("", errorMsg ? Granite.I18n.getVar(errorMsg) : Granite.I18n.get(form.data("errormessage")), "error");
        }
    }

    function revalidateStep(step) {
        if (step.data("foundationWizardStepValidation") === false) {
            return true;
        }

        var allValid = true;

        step.adaptTo("foundation-validation-helper").getSubmittables().forEach(function(submittable) {
            var $submittable = $(submittable);

            if (!$submittable.is(":visible")) {
                return;
            }

            var fieldApi = $submittable.adaptTo("foundation-field");
            if (fieldApi) {
                if (fieldApi.isDisabled()) {
                    return;
                }
            } else if ($submittable.is(":disabled")) {
                return;
            }

            var validationApi = $submittable.adaptTo("foundation-validation");
            if (validationApi) {
                if (!validationApi.checkValidity()) {
                    allValid = false;
                }
                validationApi.updateUI();
            }
        });

        step.data("foundation-wizard-step.internal.valid", allValid);

        return allValid;
    }

    function defaultClearMessage(field) {
        var error = field.data("foundation-validation.internal.error");
        if (error) {
            var tooltip = $(error).data("foundation-validation.internal.error.tooltip");
            tooltip.hide();
            tooltip.remove();

            error.remove();
        }
        field.removeAttr("invalid");
        field.removeClass("is-invalid");
        field.attr("aria-invalid", false);
    }

    function validateHandler(e) {
        e.stopPropagation();
        e.preventDefault();

        var isValidStep = revalidateStep(wizard.find(".foundation-wizard-step-active"));
        wizard.adaptTo("foundation-wizard").toggleNext(isValidStep);
    }

    function setSubmitButtonLabel(replicationType, hasReplicationRights, isScheduled) {
        var submitBtn = $(".foundation-wizard-control:submit");
        if (hasReplicationRights) {
            if (isScheduled) {
                if (replicationType === "Activate") {
                    submitBtn.text(Granite.I18n.get("Publish later"));
                } else {
                    submitBtn.text(Granite.I18n.get("Unpublish later"));
                }
            } else {
                if (replicationType === "Activate") {
                    submitBtn.text(Granite.I18n.get("Publish"));
                } else {
                    submitBtn.text(Granite.I18n.get("Unpublish"));
                }
            }
        } else {
            if (replicationType === "Activate") {
                submitBtn.text(Granite.I18n.get("Request publication"));
            } else {
                submitBtn.text(Granite.I18n.get("Request unpublication"));
            }
        }
    }

    $(function () {
        form = _getFormElement();
        wizard = _getWizardFromForm(form);
        table = $(TABLE_SELECTOR)[0];

        wizard.worlflowsStepConfig;
        wizard.workflowsStepDetached = false;

        wizard.hasReplicationRights = true;

        //Publish Now or Later
        $(document).on("change" + ns, ".cq-common-scheduling-time", function(e) {
            // These is disabled field
            var activationDate = form[0].elements.activationDate;
            var datePickerElem = activationDate.parentElement;
            var datePicker = $(datePickerElem);

            var fieldAPI = datePicker.adaptTo("foundation-field");
            if (fieldAPI) {
                var childTarget = e.target.querySelector("coral-radio[checked]")
                var value = e.target.value !== undefined ? e.target.value : (childTarget !== null ? childTarget.value : "now");
                var isScheduled = value === "later";
                fieldAPI.setDisabled(!isScheduled);
                fieldAPI.setRequired(isScheduled);
            }

            wizard.schedule = !datePickerElem.disabled;
            _updateWizardSteps(wizard);
            _updateWorkflowsInfo();

            var submitBtn = $(".foundation-wizard-control:submit");
            var replicationType = $(".cq-common-replication-type-group");
            if (datePickerElem.disabled) {
                defaultClearMessage(datePicker);
            }
            setSubmitButtonLabel(replicationType.val(), wizard.hasReplicationRights, wizard.schedule);
            validateHandler(e);
        });

        //Publish Now vs Publish Later
        $(document).on("change" + ns, ".cq-common-replication-type-group", function (e) {
            $(_getTable(wizard)).trigger("foundation-selections-change");
            //toggle References column
            if ($(".cq-common-replication-type-group").val() === "Activate") {
                if (!wizard.schedule) {
                    $(".foundation-wizard-control:submit").text(Granite.I18n.get("Publish"));
                } else {
                    $(".foundation-wizard-control:submit").text(Granite.I18n.get("Publish later"));
                }
                table.querySelector("col[data-foundation-layout-table-column-name='column-refrences']").hidden = false;
                wizard.scheduleActivationWorkflow = form.data("scheduleactivationworkflow");
                wizard.requestActivationWorkflow = form.data("requestactivationworkflow");
            } else {
                if (!wizard.schedule) {
                    $(".foundation-wizard-control:submit").text(Granite.I18n.get("Unpublish"));
                } else {
                    $(".foundation-wizard-control:submit").text(Granite.I18n.get("Unpublish later"));
                }
                //hide references column
                table.querySelector("col[data-foundation-layout-table-column-name='column-refrences']").hidden = true;
                wizard.scheduleActivationWorkflow = form.data("scheduledeactivationworkflow");
                wizard.requestActivationWorkflow = form.data("requestdeactivationworkflow");
            }

            $.ajax({
                url: Granite.HTTP.internalize("/mnt/overlay/cq/gui/content/common/managepublicationwizard/workflowsresourceconfig.json" + wizard.scheduleActivationWorkflow),
                type: "GET",
                dataType: "json",
                success: function (responseJson) {
                    wizard.scheduleMultiResourceSupport = false;
                    if (responseJson.hasOwnProperty("multiResourceSupport")) {
                        wizard.scheduleMultiResourceSupport = responseJson.multiResourceSupport;
                    }
                    if (responseJson.hasOwnProperty("title")) {
                        wizard.scheduleWorkflowTitle = responseJson.title;
                    }
                }
            });

            $.ajax({
                url: Granite.HTTP.internalize("/mnt/overlay/cq/gui/content/common/managepublicationwizard/workflowsresourceconfig.json" + wizard.requestActivationWorkflow),
                type: "GET",
                dataType: "json",
                success: function (responseJson) {
                    wizard.requestMultiResourceSupport = false;
                    if (responseJson.hasOwnProperty("multiResourceSupport")) {
                        wizard.requestMultiResourceSupport = responseJson.multiResourceSupport;
                    } else {
                        var keepPackageCheck = $(".cq-sites-startbulkworkflows-keeppackage");

                        if (keepPackageCheck[0].checked) {
                            keepPackageCheck[0].checked = false;
                        }
                        keepPackageCheck[0].disabled = !wizard.requestMultiResourceSupport;
                        keepPackageCheck.trigger("change");
                    }
                    if (responseJson.hasOwnProperty("title")) {
                        wizard.requestWorkflowTitle = responseJson.title;
                    }
                    _updateWorkflowsInfo();
                }
            });
            validateHandler(e);
        });

        form.on("change" + ns, ".cq-sites-startbulkworkflows-keeppackage-request", function (e) {
            var packageTitle = form[0].elements.requestPackageTitle;
            var fieldAPI = $(packageTitle).adaptTo("foundation-field");
            if (fieldAPI) {
                fieldAPI.setDisabled(!this.checked);
                fieldAPI.setRequired(this.checked);

            }

            // This is a disabled field
            if (!this.checked) {
                fieldAPI.isValidated = false;
                defaultClearMessage($(packageTitle));
            }

            validateHandler(e);
        });

        form.on("change" + ns, ".cq-sites-startbulkworkflows-keeppackage-schedule", function (e) {
            var packageTitle = form[0].elements.schedulePackageTitle;
            var fieldAPI = $(packageTitle).adaptTo("foundation-field");
            if (fieldAPI) {
                fieldAPI.setDisabled(!this.checked);
                fieldAPI.setRequired(this.checked);

            }

            // This is a disabled field
            if (!this.checked) {
                fieldAPI.isValidated = false;
                defaultClearMessage($(packageTitle));
            }

            validateHandler(e);
        });

        form.on("change" + ns, "input[name=scheduleWorkflowTitle], input[name=schedulePackageTitle], input[name=requestWorkflowTitle], input[name=requestPackageTitle]", validateHandler);
        form.on("input" + ns, "input[name=scheduleWorkflowTitle], input[name=schedulePackageTitle], input[name=requestWorkflowTitle], input[name=requestPackageTitle]", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        //Include Children
        $(document).on("include-children-confirm", function (event) {
            _updateItemIncludeSubPages(wizard, event.resources);
        });

        $(document).on("publish-references-confirm", function (event) {
            _updateItemReferences(wizard, event);
        });

        //Submit form
        form.off("submit" + ns).on("submit" + ns, function (e) {
            e.preventDefault();
            e.stopPropagation();

            var items = [];

            var paths = $("input[type=hidden][name=srcPathList]").map(function(index, item) {
                return item.value;
            });

            if (!paths.length) return;

            ui.wait();

            // flatten the array
            items = [].concat.apply([], paths);

            //Unpublish warning when page is referenced from somewhere else
            //or it has published children
            if (form[0].elements.activationCommand.value === "Deactivate") {
                //check for references and children of the selected paths
                var countChildrenPromise = countChildren(items);
                var countRefsPromise = countReferences(items);

                countChildrenPromise.fail(function() {
                    ui.clearWait();

                    var title = Granite.I18n.get("Error");
                    var message = Granite.I18n.get("Failed to retrieve child items for selected items.");
                    ui.alert(title, message, "error");
                });

                countRefsPromise.fail(function() {
                    ui.clearWait();

                    var title = Granite.I18n.get("Error");
                    var message = Granite.I18n.get("Failed to retrieve references for selected items.");
                    ui.alert(title, message, "error");
                });

                $.when(countChildrenPromise, countRefsPromise).then(function(countChildren, countRefs) {
                    if (countRefs === 0 && countChildren === 0) {
                        startReplication(items);
                        return;
                    }

                    ui.clearWait();

                    if (countChildren > NUM_CHILDREN_CHECK) {
                        countChildren = NUM_CHILDREN_CHECK + "+";
                    }

                    var messageRefs = countRefs === 0 ? "" : Granite.I18n.get("Selected items are referenced by {0} item(s).", countRefs);
                    var messageChildren  = countChildren === 0 ? "" : Granite.I18n.get("Upon unpublishing, other {0} child item(s) will get unpublished.", countChildren);
                    var message = messageRefs + " <br> " + messageChildren;

                    ui.prompt(Granite.I18n.get("Unpublish"), message, "notice", [{
                        text: Granite.I18n.get("Cancel")
                    }, {
                        text: Granite.I18n.get("Continue"),
                        warning: true,
                        handler: function() {
                            ui.wait();
                            startReplication(items);
                        }
                    }]);
                });
            } else {
                startReplication(items);
            }
        });

        //Remove selection
        wizard.find(".foundation-collection-action-delete").click(function (e) {
            ui.prompt(Granite.I18n.get("Remove"),
                Granite.I18n.get("Do you really want to remove selected pages?"),
                "error",
                [{
                    text: Granite.I18n.get("Cancel"),
                    id: "no"
                },
                    {
                        text: Granite.I18n.get("Remove"),
                        id: "yes",
                        warning: true
                    }],
                function (btnId) {
                    if (btnId === "yes") {
                        _handleDeleteBtnClick(wizard);
                    }
                });
        });

        registry.register("foundation.picker.control.action", {
            name: "cq.commons.addcontent",
            handler: function (name, el, config, selections) {
                if ((selections.length > 0)) {
                    ui.wait();
                    var bAdded = false;
                    var bRootPath = false;

                    // get the misisng items to update the references
                    var missingItems = [];
                    selections.forEach(function (selection) {
                        var path = selection.value;
                        if (path != '/content') {
                            var currentItem = _getItemFromPath(wizard, path);
                            if (currentItem == null) {
                                missingItems.push(path);
                            }
                        }
                    });
                    var promisses = [];

                    selections.forEach(function (selection) {
                        var strResourcePath = selection.value;
                        if (strResourcePath != '/content') {
                            var currentItem = _getItemFromPath(wizard, strResourcePath);
                            if (currentItem == null) {
                                var promise = _appendResourcePage(wizard, strResourcePath, true);
                                promisses.push(promise);
                                bAdded = true;
                            }
                        } else {
                            bRootPath = true;
                        }
                    });

                    // update the references in the aggregated list
                    _manageReferences('update', {'path': missingItems});

                    $.when.apply($, promisses).fail(function() {
                        ui.prompt(Granite.I18n.get("Error"),
                            Granite.I18n.get("Selected resources are not valid."),
                            "error",
                            [{
                                text: Granite.I18n.get("Ok"),
                                id: "no"
                            }]
                        );
                    }).always(function() {
                        ui.clearWait();
                    });

                    if (!bAdded && !bRootPath) {
                        ui.prompt(Granite.I18n.get("Error"),
                            Granite.I18n.get("Selected page already exist in the list."),
                            "error",
                            [{
                                text: Granite.I18n.get("Ok"),
                                id: "no"
                            }]
                        );
                    }
                }
            }
        });

        registry.register("foundation.collection.action.activecondition", {
            name: "managepublication.action.hasReferences",
            handler: function (name, el, config, collection, selections) {
                var items = selections.map(function (item) {
                    return $(item).data("foundation-collection-item-id");
                });
                var isActivate = document.querySelector(".cq-common-replication-type-group").value === "Activate";
                if (!isActivate) {
                    return false;
                }
                _getReferences(items).done(function (json) {
                    if (json.assets.length > 0) {
                        $(el).removeClass("foundation-collection-action-hidden");
                    } else {
                        $(el).addClass("foundation-collection-action-hidden");
                    }
                });
                return false;
            }
        });

        // autoselect source page
        Coral.commons.ready(wizard[0], function () {
            handlePagination(wizard, $(_getTable(wizard)), {}, paginator);
            var path_array = [];
            var url_params = _parseUrlParams();
            if (url_params && url_params['item'] && url_params['item'].length > 0) {
                if (Object.prototype.toString.call(url_params['item']) === '[object Array]') {
                    path_array = url_params['item'];
                } else if (url_params['item'].length > 0) {
                    path_array.push(url_params['item']);
                }

            } else if (window.location.hash) {
                var path = window.location.hash.substring(1);
                path_array = path.split(',');
            }
            if (!wizard.childResourcePageList) {
                wizard.childResourcePageList = [];
            }
            wizard.replicationUrl = form.data("replicationurl");

            wizard.workflowUrl = form.data("workflowurl");

            Coral.commons.ready(table, function (el) {
                window.requestAnimationFrame(function () {
                    table = el;
                    table.items.remove(table.items.getAll()[0]);

                    if (path_array && path_array.length > 0) {
                        for (var index = 0; index < path_array.length; index++) {
                            $.when(_appendResourcePage(wizard, path_array[index], true)).fail(function() {
                                ui.prompt(Granite.I18n.get("Error"),
                                    Granite.I18n.get("Selected resources are not valid."),
                                    "error",
                                    [{
                                        text: Granite.I18n.get("Ok"),
                                        id: "no"
                                    }]
                                );
                                _refreshChildPageListUI(wizard);
                            });
                        }
                    } else {
                        _refreshChildPageListUI(wizard);
                    }

                    // get aggregated references for all items
                    _manageReferences('update', {'path': path_array});
                });
            });
        });

    });
})(document, Granite, Granite.$);