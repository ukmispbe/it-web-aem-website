(function(document, $, Coral) {
	"use strict";


	$(document).on("foundation-contentloaded", function() {


		var $dialog = $(document).find('.cq-dialog');
		var listType = $dialog.find("coral-select[name='./listType']").get(0);
		showHideFields(showHideFields(listType.selectedItem.value));

		$(listType).on('change', function(e) {

			showHideFields(e.target.selectedItem.value);
		});

		function showHideFields(listType) {

			var contentType = $dialog.find("foundation-autocomplete[name='./contentType']")
			var tags = $dialog.find("foundation-autocomplete[name='./tags']")
			var docNumber = $dialog.find("coral-multifield[data-granite-coral-multifield-name='./docNumber']");

			if (listType == "Tags") {			
				contentType.parent().show();
				tags.parent().show();
				docNumber.parent().hide();


			} else if (listType == "docNumber") {
				contentType.parent().hide();
				tags.parent().hide();
				docNumber.parent().show();

			}

		}


	});


})(document, Granite.$, Coral);