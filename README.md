andamio
=======


Andamio is a set of frontend design patterns. It's intended for primarily two
groups of users: # For interaction designers, it's easy to quickly create actual
prototypes by copy/pasting some HTML. # For frontend developers, it's a minimal,
flexible base framework to add your own visual designs to.


Requirements
============
For compiling the CSS, we use the Grunt LESS module.
* https://npmjs.org/package/grunt-contrib-less

If you want to compile the CSS, you need to install the following:

* http://nodejs.org/
* from the command line, install grunt: npm install -g grunt
* in the andamio directory, run this: npm install grunt-contrib-less

Compile the CSS by running the following command in the andamio directory:
<code>grunt less</code>


Getting started
===============

Andamio is setup to make it easy to include in your project and adding your own
CSS and Javascript to it.

I would suggest a directory structure like this:

<pre>
/project-name/
    |-- andamio/
    |-- style/
        |-- *main.less*
    |-- js/
</pre>

In the directory project-name/style/, add this file:
main.less

Add the following lines to main.less:

<pre>
@import "../andamio/style/main.less";
@import "mypattern.less"; // add your own patterns here
</pre>

Grunt tasks
===========

For developing, it's useful to use the grunt watch task. This will automatically
compile the LESS files into main.dev.css and the Javascript files in main.dev.js,
so you can include those in your templates.

Just run the following command in the andamio directory:
<code>grunt watch</code>

The default taks is to create development and production files:
<code>grunt</code>

Functional tests
================

To run the functional tests, you need CasperJS and PhantomJS. The tests are run
from a script and check Andamio running at http://localhost/andamio/.
The following command runs all current tests:

<code>./run_tests.sh</code>

Some tests generate a screenshot, you can inspect those in tests/screenshots.