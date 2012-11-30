/**
 * Controls global alerts
 * @author Jeroen Coumans
 * @class alert
 * @namespace APP
 */
APP.alert = (function () {

    // variables
    var pageAlert,
        hasAlert;

    /**
     * Show alert
     * @method show
     * @param {String} msg the message of the alert
     */
    function show(msg) {

        if (msg) {
            pageAlert.html(msg);
            pageAlert.show();
            hasAlert = true;
        }
    }

    /**
     * Hide alert
     * @method hide
     */
    function hide() {

        pageAlert.hide();
        hasAlert = false;
    }

    /**
     * Status of alert
     * @method status
     */
    function status() {

        return hasAlert;
    }

    /**
     * Attach event listeners
     * @private
     * @method attachListeners
     */
    function attachListeners() {

        // Calls hide() when .action-hide-alert is clicked
        APP.events.attachClickHandler(".action-hide-alert", function (event) {

            hide();
        });
    }

    /**
     * Initialize variables and attach listeners
     * @method init
     */
    function init() {

        // assign variables
        pageAlert = $("#page-alert");
        hasAlert = false;

        attachListeners();
    }

    return {
        "init": init,
        "show": show,
        "hide": hide,
        "status": status
    };

})();