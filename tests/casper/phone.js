/***

    Phone module

***/

function runTest(context) {
    casper.test.info("*** Checking phone in " + context);

    casper.test.info("*** Finished phone");
}

/***

    Start running the tests
    First we run all tests in website mode, then in webapp mode

***/

casper.start(localSite, function () {
    setupBrowser()

    casper.test.info("*** Open website");
    runTest("website");
});

casper.thenOpen(localApp, function() {

    casper.test.info("*** Open webapp");
    runTest("webapp");
});


/*** End test ***/

casper.run(function() {
    this.test.done();
});