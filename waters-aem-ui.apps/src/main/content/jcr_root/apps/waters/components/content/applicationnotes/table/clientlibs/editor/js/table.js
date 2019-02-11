(function ($) {
    "use strict";

    $(document).on("dialog-loaded", function (e) {
        var $dialog = e.dialog;
        var thumbnailImage = $dialog.find('coral-fileupload[name="./excelFile"] .cq-FileUpload-thumbnail-img img');

        // replace broken thumbnail with file name
        if (thumbnailImage.length) {
            var title = thumbnailImage.attr('title');

            thumbnailImage.parent().html('<p>' + title + '</p>');
        }
    });
})(jQuery);
