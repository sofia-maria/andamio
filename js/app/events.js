/**
 * Module for dealing with events, esp. preventing click events to happen multiple times during animation or while content is loading.
 * @author Jeroen Coumans
 * @class events
 * @namespace APP
 */
APP.events = (function () {

    // declare variables
    var EVENT_LOCK_TIMEOUT,
        EVENT_LOCK_LOCKED,
        EVENT_LOCK_UNLOCKED,
        eventLock,
        body;

    /**
     * Enable or disables the event lock. The event lock prevents double tapping during animation.
     * @method setEventLock
     * @param {Boolean} lock Whether to lock or unlock events: `EVENT_LOCK_LOCKED` or `EVENT_LOCK_UNLOCKED`
     * @param {Integer} timeout The timeout before the lock will automatically unlock.
     * Set to 0 to disable
     */
    function setEventLock(lock, timeout) {

        eventLock = lock;
        if (eventLock === EVENT_LOCK_LOCKED && timeout !== 0) {
            setTimeout(function () {
                eventLock = EVENT_LOCK_UNLOCKED;
            }, timeout || EVENT_LOCK_TIMEOUT);
        }
    }

    /**
     * Locks all click events
     * @method lock
     * @param {Integer} timeout Optional timeout before lock will automatically unlock.
     * Default is 500ms, set to 0 to disable
     */
    function lock(timeout) {

        setEventLock(EVENT_LOCK_LOCKED, timeout);
    }

    /**
     * Unlocks click events lock
     * @method unlock
     */
    function unlock() {

        setEventLock(EVENT_LOCK_LOCKED);
    }

    /**
     * @method isLocked
     * @return {Boolean} Whether click events are currently locked
     */
    function isLocked() {

        return  eventLock === EVENT_LOCK_LOCKED;
    }

    /**
     * Attaches a 'click' handler to elements with the given
     * selector. Will use 'tap' events if supported by the browser.
     *
     * @method attachClickHandler
     * @param {String} selector element selector
     * @param {Function} fn the function to call when clicked
     * @param {Boolean} [bubbles] Whether the event will bubble up. Default: false
     */
    function attachClickHandler(selector, fn, bubbles) {

        body.on("click", selector, function(event) {
            if (!APP.events.isLocked()) {
                fn(event);
                if (bubbles !== true) {
                    return false;
                }
            }
        });
    }

    /**
     * Initialize variables and ftFastClick
     * @method init
     */
    function init() {

        // initialize variables
        EVENT_LOCK_TIMEOUT = 500,
        EVENT_LOCK_LOCKED = true,
        EVENT_LOCK_UNLOCKED = false,

        eventLock = EVENT_LOCK_UNLOCKED,

        body = $(document.body);

        if (APP.config.ftfastclick) {
            var fastclick = new FastClick(document.body);
        }
    }

    return {
        "init": init,
        "lock": lock,
        "unlock": unlock,
        "isLocked": isLocked,
        "attachClickHandler": attachClickHandler
    };
})();
