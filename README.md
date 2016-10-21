[![Version](https://img.shields.io/github/tag/funkensturm/statuspage.svg?style=flat&label=version)](https://github.com/funkensturm/statuspage/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/funkensturm/statuspage/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/funkensturm/statuspage.svg?branch=master)](https://travis-ci.org/funkensturm/statuspage)

# Statuspage

Haunted by the thought "how to create a status page **backend** that will **never** fail",
it became clear that **no backend at all** means it can never become unavailable.

Basically you get 3 files, one HTML, one CSS and one JS.
Add your `config.json` and [this is what you get](http://www.funkensturm.com/statuspage).

As long as you can reliably host a small **static page** and point a domain to it, you have a robust status page, separate from your production environment.

For your convenience, you can download the ready-to-go files [here](https://github.com/funkensturm/statuspage/releases).

**NOTE:** Those files are configured to be located in your domain root (not in a sub path).
If you want to deploy your status page on a sub-directory, you'll have to go through the stuff described below.

## Development

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd statuspage`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Deploying

* Modify [the path prefix](https://github.com/funkensturm/statuspage/blob/master/config/environment.js#L7-L8) if you need to
* `ember build --environment production`
* Manually remove the two occurrences of `///` from `dist/index.html`
* Upload everything in `dist` to your webserver
