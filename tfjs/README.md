# cells-app-template

**cells-app-template** is a cells app template that provides bootstrap scripts and styles for your app.

## Installation

First at all, you must include this dependency at your cells app project `package.json`

```sh
npm i --save cells-app-template
```

## Configuration

Replace at your `index.tpl` the script `app-config.js` to `app-bootstrap.js`

```html
<!-- <script src="scripts/app-config.js"></script> -->
<script src="scripts/app-bootstrap.js"></script>
```

And remove all your `app.js` code to add this:

```js
(function(document) {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      // your map of routes
    }
  });

}(document));

```

_The `app-bootstrap.js` script load automagically your configuration from `config.json` (a.k.a. AppConfig)_

## Events
The `app-bootstrap.js` script dispatch some events to the body. You can listen to them to add your custom behaviour:

```js
document.body.addEventListener('componentsLoaded', function() {
    // The initial bundle of components and the polyfills are loaded
    enableSSLPinging();
});

document.body.addEventListener('componentsInTemplateLoaded', function() {
    // The components in the template are loaded
});
      
```

## Extra Configuration

You can redefine `removeSplashScreen` method to replace `app-bootstrap.js` default behavior.
You can redefine `updateCache` method to manage `app-bootstrap.js` cache behavior.

```js
window.CellsPolymer.start({
    'enableSSLPinning' : function() {/* do stuff */},
    'onNavigation' : function() {/* do stuff */},
    'removeSplashScreen': function() {/* do stuff */},
    'updateCache': function() {/* do stuff */},
    // ...
})
```
There are extra configuration if you want to customize the `CellsPolymerBridge` bootstrap.

If `skipInitialLoad` is set to true, `CellsPolymer` will not load app elements by default and you must call `loadElements` programatically.

```js
window.CellsPolymer.start({
    'binding':           'currentview',               
    'cache':              false,                      
    'componentsPath':     'components',               
    'debug':              false,
    'domMode':            'shadow',             
    'generateRequestUrl': function() {/* do stuff */},
    'headers':            {},                         
    'mainNode':           'app__content',             
    'onRender':           function() {/* do stuff */},
    'prplLevel':          0, 
    'skipInitialLoad':   false,                         
    // ...
})
```