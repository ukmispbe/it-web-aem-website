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
			var category= $dialog.find("coral-select[name='./category']");
			var supportLibrary = $(category).children("coral-select-item[value='support%20library:Support%2520Library']");
			var library = $(category).children("coral-select-item[value='library:Library']");

			if (listType == "Tags") {			
				contentType.parent().show();
				tags.parent().show();
				docNumber.parent().hide();
				contentType.attr('required','');
				library.attr('selected','');


			} else if (listType == "docNumber") {
				contentType.parent().hide();
				tags.parent().hide();
				docNumber.parent().show();
				contentType.removeAttr('required','');
				supportLibrary.attr('selected','');
			}

		}


	});


})(document, Granite.$, Coral);