[![Build Status](https://travis-ci.org/funkensturm/statuspage.svg?branch=master)](https://travis-ci.org/funkensturm/statuspage)

# Statuspage

Haunted by the thought "how to create a status page **backend** that will **never** fail",
it became clear that **no backend at all** means it can never become unavailable.

Basically you get take files, one HTML, one CSS and one JS.
Add your `config.json` and [this is what you get](http://www.funkensturm.com/statuspage).

As long as you can reliably host a small static page and point a domain to it, you have a robust status page, separate from your production environment.



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

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* `ember build --environment production`
* Manually remove the two occurrences of `///` from `dist/index.html`
* Upload everything in `dist` to your webserver
