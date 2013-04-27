express3_boilerplate
====================

# Overview
Inspired by jwietelmann's boilerplate.  https://github.com/jwietelmann/express3_boilerplate
- Removed the Passport integration
- Swapped out Backbone for AngularJS

# Installation
npm install

# Response Caching
While there is no caching out of the box, all user-specific UI elements (except in the ```/me``` routes) are handled with an AJAX call after the page loads. Continuing to keep user-specific UI out of the initial page load will make the application more caching-friendly when the time comes.

