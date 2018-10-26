(function(document) {
  'use strict';

  if (typeof Object.assign !== 'function') {
    // .length of function is 2
    Object.assign = function(target, varArgs) {
      if (target === null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        // Skip over if undefined or null
        if (nextSource !== null) {
          for (var nextKey in nextSource) {

            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }

  // Array.prototype.find ES6 polyfill for ES5 versions
  Array.prototype.find = Array.prototype.find || function(callback) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var element = list[i];
      if ( callback.call(thisArg, element, i, list) ) {
        return element;
      }
    }
  };

  window.AppConfig = {"deployEndpoint":"","i18nPath":"locales/","componentsPath":"./bower_components/","composerEndpoint":"./composerMocks/","appId":"","debug":true,"mocks":true,"coreCache":true,"routerLog":false,"cordovaScript":"cordova.js","prplLevel":1,"initialBundle":["login.json"],"transpile":true,"transpileExclude":["cells-rxjs","webcomponentsjs","moment","d3","bgadp*"],"once":true};

  function updateCache() {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache();
    }
  }

  function removeSplashScreen() {
    var loadEl = document.getElementById('splash');
    if (loadEl) {
      loadEl.parentNode.removeChild(loadEl);
      document.body.classList.remove('loading');
    }
  }

  function continueLoading() {
    if (isLoadingInitialPage()) {
      fireComponentsLoadEvent();
    } else {
      loadAppElements(fireComponentsLoadEvent);
    }
  }

  function fireComponentsLoadEvent() {
    var eventComponentsLoaded = new CustomEvent('componentsLoaded');
    document.body.dispatchEvent(eventComponentsLoaded);
  }

  function onScriptLoadError(file) {
    return function() {
      var customEvent = new CustomEvent('scriptLoadError', {
        detail: file
      });
      document.body.dispatchEvent(customEvent);
    };
  }

  function loadAppElements(cb) {
    var nextBundle = document.createElement('link');
    nextBundle.rel = 'import';
    nextBundle.href = window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'app-components.html';
    nextBundle.onload = cb;
    nextBundle.onerror = onScriptLoadError(nextBundle.href);
    nextBundle.setAttribute('async', '');
    document.head.appendChild(nextBundle);
  }

  function isLoadingInitialPage() {
    var initialPage;
    var hash;
    var isInitialPage = true;
    if (window.AppConfig.initialBundle && window.AppConfig.initialBundle.length > 0) {
      hash = window.location.hash;
      if (hash==='' || hash==='#!/') {
        isInitialPage = true;
      } else {
        initialPage = window.AppConfig.initialBundle[0].split('.')[0];
        isInitialPage = hash.indexOf(initialPage) > -1;
      }
    }
    return isInitialPage;
  }

  function loadElements() {
    var bundle = document.createElement('link');
    bundle.rel = 'import';
    bundle.href = window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'initial-components.html';
    bundle.onload = continueLoading;
    bundle.onerror = onScriptLoadError(bundle.href);
    document.head.appendChild(bundle);
  }

  function loadWebComponentPolyfill() {
    var polyfill = document.createElement('script');
    polyfill.src = window.AppConfig.deployEndpoint + window.AppConfig.componentsPath + 'webcomponentsjs/webcomponents-lite.js';
    polyfill.onload = loadElements;
    polyfill.onerror = onScriptLoadError(polyfill.src);
    document.head.appendChild(polyfill);
  }

  function onNavigation(msg) {
    var customEvent = new CustomEvent('aria-announce', {
      detail: msg.detail.detail.page
    });
    document.body.dispatchEvent(customEvent);
  }

  function onAnnounce(msg) {
    var announcer = document.querySelector('#announcer');
    if (announcer) {
      announcer.textContent = msg.detail;
    }
  }

  function detectPlatform(which, orelse) {
    return 'desktop';
    //return window.bowser[which] ? which : orelse;
  }

  //TODO: write a proper platform detection
  function getPlatform() {
    return detectPlatform('ios', detectPlatform('android', 'desktop'));
  }

  function shouldAddCordovaScript() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var ios = /iphone|ipod|ipad/.test(userAgent);
    var android = /android/.test(userAgent);
    var safari = /safari/.test(userAgent);
    var webViewWv = / wv\)/.test(userAgent);
    var crosswalk = /crosswalk/.test(userAgent);

    //var webViewVersion = /version/.test(userAgent);

    if (ios) {
      return !safari;
    }

    if (android) {
      return (webViewWv || crosswalk);
    }
  }

  function appendCordovaScript() {
    var script = document.createElement('script');
    script.setAttribute('src', window.AppConfig.cordovaScript);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.onerror = onScriptLoadError(window.AppConfig.cordovaScript);
    document.body.appendChild(script);
  }

  function generateRequestHeaders() {
    var composerHeader = {};
    if (window.AppConfig.composerHeaderKey && window.AppConfig.composerHeaderValue) {
      composerHeader[window.AppConfig.composerHeaderKey] = window.AppConfig.composerHeaderValue;
    }
    return composerHeader;
  }

  function onRender(template, fixed) {
    if (!template.parentNode) {
      document.getElementById(this.mainNode).appendChild(template);
      var eventComponentsLoaded = new CustomEvent('componentsInTemplateLoaded');
      document.body.dispatchEvent(eventComponentsLoaded);
    }
    if (fixed) {
      document.getElementById('external__header').innerHTML = '';
      document.getElementById('external__footer').innerHTML = '';
      fixed.forEach(function(component) {
        document.getElementById(component.zone).appendChild(component.node);
      });
    }
  }

  function startCore(options) {
    return function() {
      var reference = getBridgeEngineReference(options);

      new reference(options);
    };
  }

  function getBridgeEngineReference(options) {
    var enginesNamespace = { polymer: 'CellsPolymerBridge', native: 'CellsNativeBridge' };
    var defaultEngine = 'polymer';
    var engine = ( options.engine || defaultEngine ).toLowerCase();

    if (!enginesNamespace[engine]) {
      engine = defaultEngine;

      console.warn('Invalid value for AppConfig.engine. Using ' + defaultEngine);
    }

    var engineReference = enginesNamespace[engine];

    return window[engineReference];
  }

  function webComponentsSupported() {
    return ('registerElement' in document && 'import' in document.createElement('link')
      && 'content' in document.createElement('template'));
  }

  window.CellsPolymer = {
    start: function(options) {
      var config = Object.assign({
        binding: 'currentview',
        cache: window.AppConfig.coreCache || false,
        domMode: 'shadow',
        headers: generateRequestHeaders(),
        mainNode: 'app__content',
        onRender: onRender,
        getPlatform: getPlatform,
        preCache: false,
        preRender: false
      },
      window.AppConfig,
      options);

      var onNavigation = config.onNavigation || onNavigation;
      var removeSplash = config.removeSplashScreen || removeSplashScreen;
      var updateCache = config.updateCache || updateCache;

      window.Polymer = window.Polymer || {
        dom: config.domMode,
        lazyRegister: 'max',
        useNativeCSSProperties: true
      };

      document.body.addEventListener('aria-announce', onAnnounce);
      document.body.addEventListener('componentsInTemplateLoaded', removeSplash, { once: true });
      if (config.initialBundle && isLoadingInitialPage()) {
        document.body.addEventListener('componentsInTemplateLoaded', loadAppElements);
      }
      document.body.addEventListener('componentsLoaded', startCore(config), { once: true });

      if (options.enableSSLPinning) {
        document.body.addEventListener('componentsLoaded', options.enableSSLPinning, { once: true });
      }

      document.getElementById(config.mainNode).addEventListener('nav-request', onNavigation);
      window.applicationCache.addEventListener('updateready', updateCache);

      if (shouldAddCordovaScript()) {
        appendCordovaScript();
      }

      if (!config.skipInitialLoad) {
        this.loadElements();
      }
    },
    loadElements: function() {
      if (webComponentsSupported()) {
        loadElements();
      } else {
        loadWebComponentPolyfill();
      }
    }
  };
}(document));
