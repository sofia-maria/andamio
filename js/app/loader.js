/**
 * Controls the global loader
 * @author Jeroen Coumans
 * @class loader
 * @namespace APP
 */
APP.loader = (function () {

    // Variables
    var spinnerType,
        loaderText,
        hasLoader;

    /**
     * Shows the loader on top of the page. When no message is given, it will use the text inside #loader .loader-text
     * @method show
     * @param {String} [msg] the message to show in the spinner
     */
    function show(msg) {

        var message = msg || loaderText.text();

        APP.dom.html.addClass("has-loader");
        hasLoader = true;

        if (spinnerType === "native") {

            navigator.spinner.show({"message": message});
        } else {

            APP.dom.pageLoader.show();
            loaderText.text(message);
        }

    }

    /**
     * Hides the loader
     * @method hide
     */
    function hide() {

        APP.dom.html.removeClass("has-loader");
        hasLoader = false;

        if (spinnerType === "native") {

            navigator.spinner.hide();
        } else {

            APP.dom.pageLoader.hide();
        }
    }

    /**
     * Returns wether the loader is active or not
     * @method status
     */
    function status() {

        return hasLoader;
    }

    /**
     * Check wether we use native or HTML spinner based on $.supports.cordova
     * @method init
     */
    function init() {

        hasLoader = APP.dom.html.hasClass("has-loader") ? true : false;
        loaderText = APP.dom.pageLoader.find(".loader-text");

        if ($.supports.cordova) {

            // only set the spinner to native when Cordova is injected
            navigator.bootstrap.addConstructor(function() {
                spinnerType = "native";
            });
        } else {

            spinnerType = "html";
            var img = APP.dom.pageLoader.find("img");

            if (!img.attr("src")) {
                img.attr("src", img.data("img-src"));
            }
        }

    }

    return {
        "init": init,
        "show": show,
        "hide": hide,
        "status": status
    };

})();
