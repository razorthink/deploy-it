var fileDrop;

var renderAppList = function () {
    $.get('/bundles', function (data) {
        // clear app list table
        $("#application-list").html('');

        var strVar="";
        var timestamp = 0;
        for (var i = 0; i < data.length; i++) {
            timestamp = parseInt(data[i].timestamp, 10);

            strVar += '<tr>';
            strVar += '<td class="name">';
            strVar += '<span class="title">' + data[i].appName + '</span> <br>';
            strVar += '<span class="author">' + data[i].author + '</span> |';
            strVar += '<span class="bundle">' + data[i].bundleName + '</span> <br>';
            strVar += '<span class="time">' + moment(timestamp).fromNow(); + '</span>';
            strVar += '</td>';

            strVar += '<td class="download-link">';
            // strVar += "<a href=\"itms-services:\/\/?action=download-manifest&url=" + "http://192.168.49.85:8030" + "/" + data[i].filePath.split(".")[0] + ".plist" + "\"></a>";
            strVar += "<a href=\"itms-services:\/\/?action=download-manifest&url=" + "http://54.205.219.186:8030" + "/" + data[i].filePath.split(".")[0] + ".plist" + "\"></a>";;
            strVar += '</td>';

            strVar += '<td class="delete">';
            strVar += '<button id="' + data[i]._id + '">x</button>';
            strVar += '</td>';
            strVar += '</tr>';
        }

        $("#application-list").html(strVar);
    });
};

var clearAppSubmitForm = function () {
    fileDrop.removeAllFiles();
    $("#description-author").val("");
    $("#description-app-name").val("");
    $("#description-bundle").val("");
};

$(function () {
    renderAppList();

    Dropzone.options.fileUpload = {
        maxFiles: 1,
        url: "/bundles/file",
        method: "POST",
        uploadMultiple: false,
        acceptedFiles: ".ipa",
        autoProcessQueue: false,
        dictInvalidFileType: "Please upload a valid iOS bundle"
    };
    fileDrop = new Dropzone("#fileUpload");

    fileDrop.on("complete", function(file) {
        clearAppSubmitForm();
        renderAppList();
        $(".description-form-container .message").hide();
    });

    $("#description-submit").on("click", function(e) {
        e.preventDefault();

        var author = $("#description-author").val(),
            appName = $("#description-app-name").val(),
            bundle = $("#description-bundle").val();

        if (fileDrop.files.length && author && appName && bundle) {
            fileDrop.processQueue();
            console.log("file uploaded");

            $.ajax({
                url: "/bundles",
                method: "POST",
                data: {
                    fileName: fileDrop.files[0].name,
                    author: author,
                    appName: appName,
                    bundle: bundle
                },
                success: function (res) {
                    console.log(res);
                }
            });

        } else {
            $(".description-form-container .message").show();
        }

    });

    $("#description-cancel").on("click", function(e) {
        e.preventDefault();
        clearAppSubmitForm();
    });

    $(".modal .close").on("click", function () {
        $(".modal").fadeOut(200);
    });

    $("#application-list").on("click", ".delete button", function (e) {
        e.preventDefault();

        var deleteButton = $(this),
            tr = deleteButton.closest("tr"),
            confirmation = $(".modal .confirmation"),
            input = confirmation.find("input"),
            message = confirmation.find(".message");

        // display confirmation
        confirmation.show();
        $(".modal").fadeIn(200);

        confirmation.find(".confirm").on("click", function (e) {
            e.preventDefault();

            $.ajax({
                url: "/bundles/" 
                        + deleteButton.attr("id")
                        + "/" + input.val(),
                method: "DELETE",
                success: function (res) {
                    // re render bundle list
                    renderAppList();

                    // clear input field and close modal
                    input.val("");
                    $(".modal").fadeOut(200);

                    console.log(res);
                },
                error: function (res) {
                    input.val("");
                    message.text("Please try again or cancel");
                }
            });
        });

    });

});