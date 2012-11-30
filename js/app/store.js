/**
 * Provides methods for storing HTML documents offline
 * @author Jeroen Coumans
 * @class store
 * @namespace APP
 */
APP.store = (function() {

    var server,
        isLoading;

    /**
     * @method loading
     * @return {Boolean} wether we're currently loading
     */
    function loading() {

        return isLoading;
    }

    /**
     * Loads an URL from localStorage.
     * @method showUrl
     * @param {String} url the URL that will be loaded. The URL is used as the key. The value will be parsed as JSON.
     * @return {String} the value that was stored. Usually, this is raw HTML.
     */
    function showUrl(url) {

        var result = JSON.parse(localStorage.getItem(url));

        if (! url || ! result) return;
        return result;
    }

    /*
     * Does an AJAX call to URL and stores it with the URL as the key
     * @method storeUrl
     * @param {String} url the relative URL to be stored. Do not include the hostname!
     * @param {String} [host] the hostname. If not set, the server variable that is passed into init will be prefixed.
     * @param {Function} [callback] callback function when the AJAX call is complete
    */
    function storeUrl(url, host, callback) {

        if (! url || localStorage.getItem(url)) return;

        var fullUrl = host !== "" ? host + url : server + url;

        $.ajax({
            url: fullUrl,
            timeout: 5000,
            headers: { "X-PJAX": true },
            beforeSend: function() {

                isLoading = true;
            },
            success: function(response) {

                var result = JSON.stringify(response);
                localStorage.setItem(url, result);
            },
            complete: function() {

                isLoading = false;
                if ($.isFunction(callback)) callback();
            }
        });
    }

    /*
     * Wrapper around storeUrl to store an array of URL's
     */
    function storeUrlList(list, host, callback) {

        if (! list) return;

        if (! host) host = server;

        $(list).each(function(index, item) {

            storeUrl(item, host);
        });

        if ($.isFunction(callback)) callback();
    }

    /*
     * Returns an array of URL's
     * @param selector: the selector used to get the DOM elements, e.g. ".article-list .action-pjax"
     */
    function getUrlList(selector) {

        if (! selector) return;

        var urlList = [];

        $(selector).each(function(index, item) {

            var url = APP.util.getUrl(item);
            urlList.push(url);
        });

        return urlList;
    }

    /***
     * Initialize variables and settings
     */
    function init(params) {

        isLoading = false;
        server = params && params.server !== "" ? params.server : "http://localhost";
    }

    return {
        "init": init,
        "loading": loading,
        "storeUrl": storeUrl,
        "storeUrlList": storeUrlList,
        "getUrlList": getUrlList,
        "showUrl": showUrl
    };

})();
