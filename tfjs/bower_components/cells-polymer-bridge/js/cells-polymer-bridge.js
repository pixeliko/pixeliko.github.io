(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cellsPolymer"] = factory();
	else
		root["cellsPolymer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var toSubscriber_1 = __webpack_require__(98);
var observable_1 = __webpack_require__(14);
var pipe_1 = __webpack_require__(96);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// binding

var bindingCodes = exports.bindingCodes = {
  ALWAYS: "always",
  DELAYED: "delayed",
  UI: "ui",
  CURRENTVIEW: "currentview"
};

var binding = exports.binding = {
  DEFAULT: bindingCodes.ALWAYS,
  VALUES: Object.values(bindingCodes)
};

// external events

var externalEventsCodes = exports.externalEventsCodes = {
  PAGE_READY: "page-ready",
  PARSE_ROUTE: "parse-route",
  AFTER_PUBLISH: "after-publish",
  NAV_REQUEST: "nav-request",
  BEFORE_SET_ATTR_TO_NODE: "before-set-attr-to-node",
  AFTER_SET_ATTR_TO_NODE: "after-set-attr-to-node",
  BEFORE_CREATE_NODE: "before-create-node",
  AFTER_CREATE_NODE: "after-create-node",
  BEFORE_IMPORT: "before-import",
  AFTER_IMPORT: "after-import",
  PAGE_REQUEST: "page-request",
  PAGE_RESPONSE: "page-response",
  DATA_LOAD: "data-load",
  TEMPLATE_TRANSITION_END: "template-transition-end",
  TRACK_EVENT: "track-event",
  TEMPLATE_REGISTERED: "template-registered",
  ROUTER_BACKSTEP: "router-backstep",
  LOG_EVENT: "log-event"
};

var externalEvents = exports.externalEvents = Object.values(externalEventsCodes);

// componentsPath

var componentsPath = exports.componentsPath = "./bower_components/";

// composerEndpoint

var composerEndpoint = exports.composerEndpoint = "./composerMocks/";

// deployEndpoint

var deployEndpoint = exports.deployEndpoint = "";

// initialTemplate

var initialTemplate = exports.initialTemplate = "login";

// monitoring config

// const mrId = 'web';
var mrId = 'core';
// const nameSpace = 'com.bbva.es.channels';
var nameSpace = 'ether.cells';

var monitoring = exports.monitoring = {
  SEMAAS: {
    policy: 'ei_bbva_es',
    mrId: mrId,
    nameSpace: nameSpace,
    identifier: 'bridge',
    // consumerId: `${mrId}@${nameSpace}`,
    consumerId: 'core@ether.cells'
  }
};

// pagesPath

var pagesPath = exports.pagesPath = "./pages/";

// prpl

var prplCodes = exports.prplCodes = {
  NONE: "none",
  DEFER: "defer",
  PROGRESSIVE: "progressive",
  HERO: "hero"
};

var prpl = exports.prpl = {
  DEFAULT: prplCodes.DEFER,
  VALUES: Object.values(prplCodes)
};

// default

exports.default = {
  bindingCodes: bindingCodes,
  binding: binding,
  componentsPath: componentsPath,
  composerEndpoint: composerEndpoint,
  deployEndpoint: deployEndpoint,
  externalEvents: externalEvents,
  externalEventsCodes: externalEventsCodes,
  initialTemplate: initialTemplate,
  monitoring: monitoring,
  pagesPath: pagesPath,
  prplCodes: prplCodes,
  prpl: prpl
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(53);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maxNumListeners = 20;

var CustomEventEmitter = function (_EventEmitter) {
  _inherits(CustomEventEmitter, _EventEmitter);

  function CustomEventEmitter() {
    _classCallCheck(this, CustomEventEmitter);

    return _possibleConstructorReturn(this, (CustomEventEmitter.__proto__ || Object.getPrototypeOf(CustomEventEmitter)).apply(this, arguments));
  }

  _createClass(CustomEventEmitter, [{
    key: 'listenToOnce',
    value: function listenToOnce(node, name, callback) {
      var fn = function () {
        callback();
        node.removeEventListener(name, fn);
      }.bind(this);
      node.addEventListener(name, fn);
    }
  }]);

  return CustomEventEmitter;
}(_events2.default);

var eventManager = new CustomEventEmitter();

eventManager.setMaxListeners(maxNumListeners);

exports.default = eventManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(17);
var Subscription_1 = __webpack_require__(4);
var Observer_1 = __webpack_require__(26);
var rxSubscriber_1 = __webpack_require__(15);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(30);
var isObject_1 = __webpack_require__(32);
var isFunction_1 = __webpack_require__(17);
var tryCatch_1 = __webpack_require__(18);
var errorObject_1 = __webpack_require__(7);
var UnsubscriptionError_1 = __webpack_require__(93);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var ScalarObservable_1 = __webpack_require__(12);
var EmptyObservable_1 = __webpack_require__(11);
var isScheduler_1 = __webpack_require__(8);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(20);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellsBridgeComponent = function (_CellsBridgeManagerDo) {
  _inherits(CellsBridgeComponent, _CellsBridgeManagerDo);

  function CellsBridgeComponent(spec) {
    _classCallCheck(this, CellsBridgeComponent);

    // @TODO: Por qué almacenar spec en una propiedad y algunas de sus propiedades en otra.
    var _this = _possibleConstructorReturn(this, (CellsBridgeComponent.__proto__ || Object.getPrototypeOf(CellsBridgeComponent)).call(this));

    _this.type = '';
    _this.spec = null;
    _this.zone = null;
    _this.node = null;
    _this.fixed = null;
    _this.priority = null;
    _this.connections = null;
    _this.spec = spec;
    _this.type = spec.type;
    _this.zone = spec.zone;
    _this.fixed = spec.fixed;
    _this.priority = spec.priority;
    _this.node = _this.spec.node ? _this.spec.node : _this.createElement(_this.spec.tagName); // NOT WORKING CellsBridgeComponent
    _this.connections = spec.connections;
    return _this;
  }
  /**
   * Componen type. It could be TYPE_UI, TYPE_DM or TYPE_CC.
   *
   * @type {String}
   */


  _createClass(CellsBridgeComponent, [{
    key: 'setProps',
    value: function setProps() {
      var spec = this.spec;
      if (spec.connections && spec.connections.ignoreAttr) {
        for (var index = 0; index < spec.connections.ignoreAttr.length; index++) {
          var key = spec.connections.ignoreAttr[index];
          delete spec.properties[key];
        }
      }

      this.setAttrs(this.node, spec.properties);
    }
  }, {
    key: 'isUnresolved',
    value: function isUnresolved() {
      return this.node.tagName.indexOf('-') > -1 && this.node.constructor === HTMLElement;
    }
  }]);

  return CellsBridgeComponent;
}(_dom2.default);

exports.default = CellsBridgeComponent;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var fromEvent_1 = __webpack_require__(73);
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(7);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _Subscription = __webpack_require__(4);

var _Observable = __webpack_require__(0);

__webpack_require__(10);

var _ReplaySubject = __webpack_require__(58);

var _ObjectUnsubscribedError = __webpack_require__(16);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalEventsCodes = _constants2.default.externalEventsCodes;

/**
 * Channel ReplaySubject extension of Rx.ReplaySubject.
 * This is pretty hacky, but so far I'd found no better way of having
 * Channels that do no close on multicasted stream completion and on multiple errors.
 * For documentation refer to
 * [Rx.ReplaySubject docs](@link https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/replaysubject.md).
 * The only difference is that Channel never triggers '.onCompleted()' and
 * does not closes observers on errors (thus allowing to continuously dispatch them).
 */

var Channel = function Channel(buffer) {
  _ReplaySubject.ReplaySubject.call(this, buffer);
};

Channel.prototype = Object.create(_ReplaySubject.ReplaySubject.prototype);

Channel.prototype.hasObservers = function hasObservers() {
  if (this.closed) {
    throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
  }

  return this.observers.length > 0;
};

Channel.prototype.next = function next(value) {
  var generateUUID = function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  };
  if (!value.uuid) {
    value.uuid = generateUUID();
  }
  _ReplaySubject.ReplaySubject.prototype.next.call(this, value);
};

_extends(Channel.prototype, {
  /**
   * Dummy method override to prevent execution and Rx.Observable completion
   * @ignore
   */
  complete: function complete() {},

  /**
   * Dummy method override to prevent stop execution when error in Rx.Observable
   * @ignore
   */
  error: function error(_error) {
    this.error = _error;
    this.observers.forEach(function (o) {
      o.isStopped = false;
      o.onError(_error);
    });
  },

  /**
   * Removes a specific observer.
   *
   * @param  {Number} index  Position of observer in array
   * @example
   * channel.unsubscribe(1);
   */
  unsubscribe: function unsubscribe(index) {
    this.observers.splice(index, 1);
  },

  /**
   * Removes all observers.
   *
   * @example
   * channel.unsubscribe();
   */
  unsubscribeAll: function unsubscribeAll() {
    this.observers.splice(0, this.observers.length);
  },

  /**
   * Resets the channel.
   */
  clean: function clean() {
    this._events = [];
  }
});

/**
 * A subscriptor can publish to a channel and receive notifications
 * about changes from a channel.
 *
 * @param {HTMLElement/Object} node
 */
var Subscriptor = function Subscriptor(node) {
  this.node = node;
  this.subscriptions = []; //[] //*1prototype mixin clone problem
  this.publications = new _Subscription.Subscription();
};

Subscriptor.prototype = {
  node: null,
  subscriptions: null, //[] //*1prototype mixin clone problem
  publications: null,

  /**
   * Returns true if the subscriptor has already subscribed to a channel.
   *
   * @param  {Channel}  channel The channel to check the subscription
   * @return {Boolean}
   */
  hasSubscription: function hasSubscription(channel) {
    return this.subscriptions.filter(function (d) {
      return d.channel === channel;
    }).length > 0;
  },

  /**
   * Publish an event.sss
   *
   * @param  {Event} event
   */
  publish: function publish(event) {
    this.publications.add(event);
  },

  makeCallbackWithNoReplay: function makeCallbackWithNoReplay(channel, fn) {
    if (!fn.node.intervals) {
      fn.node.intervals = [];
    }
    if (!fn.node.ids) {
      fn.node.ids = [];
    }
    var getTimeFromNode = function getTimeFromNode(node) {
      return node.intervals[channel.name];
    };
    var setTimeForNode = function setTimeForNode(node, time) {
      node.intervals[channel.name] = time;
    };
    var getTimeFromChannel = function getTimeFromChannel(channel) {
      return channel._events.length > 0 ? channel._events[0].time : 1;
    };
    var getIdFromNode = function getIdFromNode(node) {
      return node.ids[channel.name];
    };
    var setIdForNode = function setIdForNode(node, id) {
      node.ids[channel.name] = id;
    };
    var getIdFromChannel = function getIdFromChannel(channel) {
      return channel._events.length > 0 ? channel._events[0].value.uuid : null;
    };
    var fnReplayOff = function () {
      var lastInterval = getTimeFromChannel(channel);
      var nodeInterval = getTimeFromNode(fn.node);
      var lastId = getIdFromChannel(channel);
      var nodeId = getIdFromNode(fn.node);
      if (!nodeInterval || nodeInterval < lastInterval || nodeInterval === lastInterval && nodeId != lastId) {
        setTimeForNode(fn.node, lastInterval);
        setIdForNode(fn.node, lastId);
        return fn.apply(this, arguments);
      }
      setTimeForNode(fn.node, lastInterval);
    }.bind(this);
    fnReplayOff.node = fn.node;
    return fnReplayOff;
  },

  /**
   * Subscribe to a channel.
   *
   * @param  {Channel}   channel  Channel to subscribe
   * @param  {Function}  fn       Callback function to run when a value from a channel changed
   */
  subscribe: function subscribe(channel, fn, previousState) {
    if (!this.hasSubscription(channel)) {
      var callback = fn;
      if (previousState === false) {
        callback = this.makeCallbackWithNoReplay(channel, fn);
      }

      var pos = this._firstInstanceOfObserver(callback.node, channel);
      if (pos === -1) {
        channel.subscribe(callback);
        pos = channel.observers.length - 1;
      }
      channel.observers[pos].node = callback.node;

      var subscription = {
        channel: channel,
        observer: channel.observers[pos]
      };

      this.subscriptions.push(subscription);
    }
  },

  /**
   * Remove all active subscriptions.
   */
  unsubscribe: function unsubscribe() {
    for (var i = this.subscriptions.length - 1; i >= 0; i--) {
      var subscription = this.subscriptions[i];
      var channel = subscription.channel;
      var observer = subscription.observer;
      var index = channel.observers.indexOf(observer);

      if (!channel.name.match(/\b__bridge_/)) {
        channel.unsubscribe(index);
      }
      // if(!channel.hasObservers()) {
      //   channel.clean();
      // }
    }

    this.publications.unsubscribe();
  },

  /**
   * Returns the position of the first occurrence of the observer's node in the channel.
   * If the node has none observer registered to the channel, it returns -1.
   *
   * @param {node}
   * @param {channel}
   */
  _firstInstanceOfObserver: function _firstInstanceOfObserver(node, channel) {
    var pos = -1;

    for (var index = 0; index < channel.observers.length; index++) {
      if (channel.observers[index].node === node) {
        pos = index;
        break;
      }
    }
    return pos;
  }
};

/**
 * Collection of channels.
 */
var ChannelManager = function ChannelManager() {
  this.channels = {}; //*1prototype mixin clone problem
};

ChannelManager.prototype = {
  channels: null, //{} //*1prototype mixin clone problem

  /**
   * Gets a channel by name.
   *
   * @param  {String} name
   *
   * @return {Channel}
   */
  get: function get(name) {
    var channel = this.channels[name];

    if (channel == null) {
      channel = this.create(name);
    }

    return channel;
  },

  /**
   * Gets a channel by name.
   *
   * @param  {String} name
   *
   * @return {Channel}
   */
  getUnsafe: function getUnsafe(name) {
    return this.channels[name];
  },

  /**
   * Creates a channel.
   *
   * @param  {String} name Channel name
   *
   * @return {Channel}
   */
  create: function create(name) {
    var channel = new Channel(1);
    channel.name = name;
    return this.channels[name] = channel;
  },

  /**
   * Removes a channel from the collection.
   *
   * @param  {String} name Name of the channel to remove.
   */
  remove: function remove(name) {
    delete this.channels[name];
  },

  /**
   * Returns true if there is a channel registered with the given name,
   *
   * @param {String} name Channel name,
   *
   * @return {Boolean}
   */
  has: function has(name) {
    return this.channels[name] != null;
  }
};

var ComponentConnector = function () {
  function ComponentConnector() {
    _classCallCheck(this, ComponentConnector);

    this.manager = null;
    this.subscriptors = null;
    this.bridgeChannelsPrefix = null;

    this.manager = new ChannelManager();
    this.subscriptors = new WeakMap();
    this.bridgeChannelsPrefix = /__bridge_(?!ch)/;
  }

  _createClass(ComponentConnector, [{
    key: 'getSubscriptor',
    value: function getSubscriptor(node) {
      var subscriptor = this.subscriptors.get(node);

      if (!subscriptor) {
        subscriptor = new Subscriptor(node);
        this.subscriptors.set(node, subscriptor);
      }

      return subscriptor;
    }

    /**
     * Register a node in pubsub
     *
     * @param  {HTMLElement}  node
     * @param  {Object}       connections
     */

  }, {
    key: 'register',
    value: function register(node, connections) {
      if (node && connections) {
        this._registerOutConnections(node, connections.out);
        this._registerInConnections(node, connections.in);
      }
    }

    /**
     * Registesr new connections of a node that may have other connections registered previously.
     *
     * @param  {HTMLElement}  node
     * @param  {Object}       connections
     */

  }, {
    key: 'progressiveRegister',
    value: function progressiveRegister(node, connections) {
      if (node && connections) {
        this._registerOutConnections(node, connections.out);
        this._updateInConnections(node, connections.in);
      }
    }
  }, {
    key: '_registerInConnections',
    value: function _registerInConnections(node, inConnections) {
      var channelName = void 0;
      var bindName = void 0;
      var previousState = void 0;

      if (inConnections) {
        for (channelName in inConnections) {
          bindName = inConnections[channelName].bind;
          previousState = inConnections[channelName].previousState || false;
          this.addSubscription(channelName, node, bindName, previousState);
        }
      }
    }
  }, {
    key: 'addSubscription',
    value: function addSubscription(channelName, node, bind) {
      var previousState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var callback = this._wrapCallbackWithNode(node, bind);
      var channel = this.manager.get(channelName); // @TODO ojo!!! CC this.isBridgeChannel(channelName) ? this.manager.getUnsafe(channelName) : this.manager.get(channelName);

      if (channel) {
        var subscriptor = this.getSubscriptor(node);

        subscriptor.subscribe(channel, callback, previousState);
      }
    }
  }, {
    key: '_updateInConnections',
    value: function _updateInConnections(node, inConnections) {
      var channelName = void 0;
      var bindName = void 0;
      var previousState = void 0;

      if (inConnections) {
        for (channelName in inConnections) {
          bindName = inConnections[channelName].bind;
          previousState = inConnections[channelName].previousState || false;
          this.updateSubscription(channelName, node, bindName, previousState);
        }
      }
    }
  }, {
    key: 'updateSubscription',
    value: function updateSubscription(channelName, node, bind) {
      var previousState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var subscriptor = this.getSubscriptor(node);

      if (this.isActiveBridgeChannel(channelName) || !this.isActiveBridgeChannel(channelName) && !this.hasSubscriptions(subscriptor, channelName)) {
        var channel = this.manager.get(channelName);
        var callback = this._wrapCallbackWithNode(node, bind);

        subscriptor.subscribe(channel, callback, previousState);
      }
    }
  }, {
    key: '_wrapCallbackWithNode',
    value: function _wrapCallbackWithNode(node, bindName) {
      var cb = this.wrapCallback(node, bindName);
      cb.node = node;
      return cb;
    }
  }, {
    key: '_hasPublisher',
    value: function _hasPublisher(subscriptor, node, channelName, bindName) {
      var hasPublisher = false;

      if (subscriptor.publications._subscriptions) {
        subscriptor.publications._subscriptions.forEach(function (publication) {
          if (publication.node === node && publication.channelName === channelName && publication.eventName === bindName) {
            hasPublisher = true;
          }
        });
      }
      return hasPublisher;
    }
  }, {
    key: '_registerOutConnections',
    value: function _registerOutConnections(node, outConnections) {
      var channelName = void 0;
      var bindName = void 0;

      if (outConnections) {
        for (channelName in outConnections) {
          bindName = outConnections[channelName].bind;

          this.addPublication(channelName, node, bindName, outConnections[channelName]);
        }
      }
    }
  }, {
    key: 'addPublication',
    value: function addPublication(channelName, node, bindName, outConnectionDefinition) {
      if (this.isBridgeChannel(channelName)) {
        console.warn('Forbidden operation. You are trying to write to a private channel (' + channelName + ').');
      } else {
        var subscriptor = this.getSubscriptor(node);
        var channel = this.manager.get(channelName);
        var hasPublisher = this._hasPublisher(subscriptor, node, channelName, bindName);

        if (!hasPublisher) {
          subscriptor.publish(this.wrapEvent(node, bindName, channel, outConnectionDefinition));
        }
      }
    }
  }, {
    key: 'publish',
    value: function publish(channelName, value) {
      if (this.isBridgeChannel(channelName)) {
        console.warn('Forbidden operation. You are trying to write to a private channel (' + channelName + ').');
      } else {
        var channel = this.manager.get(channelName);
        var customEventName = channelName + '-publish';

        channel.next(new CustomEvent(customEventName, { detail: value }));
      }
    }

    /**
     * Unregister a node from pubsub
     *
     * @param  {HTMLElement} node
     */

  }, {
    key: 'unregister',
    value: function unregister(node) {
      if (!node) {
        return;
      }

      var subscriptor = this.subscriptors.get(node);

      if (subscriptor) {
        subscriptor.unsubscribe();
        this.subscriptors.delete(node);
      }
    }

    // @TODO unificar con unregister

  }, {
    key: 'sleep',
    value: function sleep(node) {
      if (!node) {
        return;
      }

      var subscriptor = this.subscriptors.get(node);

      if (subscriptor) {
        console.log(subscriptor);
        //subscriptor.unsubscribe();
      }
    }

    /**
     * Wrap a callback.
     *
     * @param  {HTMLElement/Object} node
     * @param  {String} bindName Method or property name
     *
     * @return {Function}
     */

  }, {
    key: 'wrapCallback',
    value: function wrapCallback(node, bindName) {
      var wrappedCb = function wrappedCb(event) {
        if (typeof bindName === 'function') {
          bindName(event.detail);
        } else {
          if (typeof node[bindName] === 'function') {
            node[bindName](event.detail);
          } else {
            node[bindName] = event.detail;
          }
        }
      };

      return wrappedCb;
    }

    /**
     * Returns true if the event has reached the node that is listening the event
     *
     * @param {Event} event
     */

  }, {
    key: '_isEventAtTarget',
    value: function _isEventAtTarget(event) {
      var AT_TARGET = Event.AT_TARGET || Event.prototype.AT_TARGET;
      return event.eventPhase === AT_TARGET;
    }

    /**
     * Wrap an event.
     *
     * @param  {HTMLElement} node
     * @param  {String} eventName
     * @param  {Channel} channel
     *
     * @return {Function}
     */

  }, {
    key: 'wrapEvent',
    value: function wrapEvent(node, eventName, channel, connection) {
      var AFTER_PUBLISH = externalEventsCodes.AFTER_PUBLISH,
          NAV_REQUEST = externalEventsCodes.NAV_REQUEST,
          ROUTER_BACKSTEP = externalEventsCodes.ROUTER_BACKSTEP,
          TRACK_EVENT = externalEventsCodes.TRACK_EVENT,
          LOG_EVENT = externalEventsCodes.LOG_EVENT;


      var source = _Observable.Observable.fromEvent(node, eventName);
      var wrappedListener = source.subscribe(function (event) {
        if (!this._isEventAtTarget(event)) {
          // If the event bubbles up from a child element:
          return;
        }

        channel.next(event);
        _events2.default.emit(AFTER_PUBLISH, event);

        if (connection && connection.link) {

          var linkObject = connection.link;

          if (connection.link.page) {
            if (connection.link.page.hasOwnProperty('bind')) {
              linkObject.page = event.detail[connection.link.page.bind];
            }
          }

          _events2.default.emit(NAV_REQUEST, {
            event: event,
            detail: linkObject
          });
        }

        if (connection && connection.backStep) {
          _events2.default.emit(ROUTER_BACKSTEP, {
            event: event,
            detail: {}
          });
        }

        if (connection && connection.analytics) {
          _events2.default.emit(TRACK_EVENT, {
            event: event,
            detail: connection.analytics
          });
        }

        if (connection && connection.log) {
          _events2.default.emit(LOG_EVENT, {
            event: event,
            detail: connection.log
          });
        }

        if (this.wrapEventHandler) {
          this.wrapEventHandler(event, connection, channel);
        }
      }.bind(this));

      wrappedListener.node = node;
      wrappedListener.eventName = eventName;
      wrappedListener.channelName = channel.name;

      return wrappedListener;
    }

    /**
     * receive a channel name and change old private values.
     *
     * @param  {string} name
     *
     */

  }, {
    key: 'createEvent',
    value: function createEvent(name, value) {
      var evt = new Event(name);
      evt.detail = { value: value };
      return evt;
    }

    /**
     * returns true if there's a private channel with the given name
     *
     * @param {String} name
     *
     * @return {Boolean}
     */

  }, {
    key: 'isActiveBridgeChannel',
    value: function isActiveBridgeChannel(name) {
      return this.isBridgeChannel(name) && this.manager.getUnsafe(name);
    }

    /**
     * returns true if the given name matches a private channel's name
     *
     * @param {String} name
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBridgeChannel',
    value: function isBridgeChannel(name) {
      return this.bridgeChannelsPrefix.test(name);
    }

    /**
     * returns true if the subscriptor has been subscribed to the given channel.
     *
     * @param {Subscriptor} subscriptor
     * @param {String} channelName
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasSubscriptions',
    value: function hasSubscriptions(subscriptor, channelName) {
      return subscriptor.subscriptions.filter(function (d) {
        return d.channel.name === channelName;
      }).length > 0;
    }
  }]);

  return ComponentConnector;
}();

/**
 * ComponentConnector definition
 */
exports.default = ComponentConnector;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalEventsCodes = _constants2.default.externalEventsCodes;


var CellsManagerDom = function () {
  function CellsManagerDom() {
    _classCallCheck(this, CellsManagerDom);
  }

  _createClass(CellsManagerDom, [{
    key: 'createComponents',
    value: function createComponents(spec) {
      /* istanbul ignore if */
      if (!spec) {
        return;
      }
      var elements = [];
      var i = 0;
      for (var index = 0; index < spec.length; index++) {
        var element = spec[index];
        elements[i] = this.createElement(element.tagName);
        elements[i].__zone = element.zone;
        i++;
      }

      return elements;
    }
  }, {
    key: 'setAttrs',
    value: function setAttrs(node, attrs) {
      var BEFORE_SET_ATTR_TO_NODE = externalEventsCodes.BEFORE_SET_ATTR_TO_NODE,
          AFTER_SET_ATTR_TO_NODE = externalEventsCodes.AFTER_SET_ATTR_TO_NODE;


      if (attrs && (typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
        _events2.default.emit(BEFORE_SET_ATTR_TO_NODE, node.tagName);
        _extends(node, attrs);
        _events2.default.emit(AFTER_SET_ATTR_TO_NODE, node);
      }
    }
  }, {
    key: 'createElement',
    value: function createElement(tagName, properties) {
      var BEFORE_CREATE_NODE = externalEventsCodes.BEFORE_CREATE_NODE,
          AFTER_CREATE_NODE = externalEventsCodes.AFTER_CREATE_NODE;


      _events2.default.emit(BEFORE_CREATE_NODE, tagName);
      var node = document.createElement(tagName);
      _events2.default.emit(AFTER_CREATE_NODE, node);

      /* istanbul ignore else */
      if (properties) {
        this.setAttrs(node, properties);
      }

      return node;
    }
  }]);

  return CellsManagerDom;
}();

exports.default = CellsManagerDom;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(23);

var _template2 = _interopRequireDefault(_template);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bindingCodes = _constants2.default.bindingCodes,
    externalEventsCodes = _constants2.default.externalEventsCodes;


var CellsManagerTemplate = function () {
  function CellsManagerTemplate() {
    _classCallCheck(this, CellsManagerTemplate);

    this.cache = {};
    this.templates = {};
    this.selected = '';
  }

  _createClass(CellsManagerTemplate, [{
    key: 'create',
    value: function create(name, spec) {
      var template = this.get(name);

      if (!template) {
        template = this._createFromJSON(name, spec);
        this._storeTemplate(name, template);
      }

      return template;
    }

    /**
     * Create Bridge Template based on Polymer component.
     *
     * @param  {String}       name    [description]
     * @param  {HTMLElement}  element [description]
     * @return {CellsBridgeTemplate}         [description]
     */

  }, {
    key: 'createFromComponent',
    value: function createFromComponent(name, componentName) {
      var template = this._createCellsTemplate(name, { tagName: componentName });

      this._storeTemplate(name, template);
      return template;
    }

    /**
     * Register template from existing HTMLElement and stores it on memory.
     *
     * @param  {String}               name    Template name.
     * @param  {HTMLElement}          element Template element (existing DOM element)
     * @return {CellsBridgeTemplate}          Cells bridge template object.
     */

  }, {
    key: 'register',
    value: function register(name, element) {
      var template = this._createFromHTMLElement(name, element);

      this._storeTemplate(name, template);
      return template;
    }

    /**
     * Store given template on memory.
     *
     * @param  {String}               name     Template name.
     * @param  {CellsBridgeTemplate}  template Cells bridge template object.
     */

  }, {
    key: '_storeTemplate',
    value: function _storeTemplate(name, template) {
      var node = template.node;


      this.cache[name] = template;
      this.templates[name] = node;
    }

    /**
     * Create Bridge Template based on existing HTML Element.
     *
     * @param  {String}       name    [description]
     * @param  {HTMLElement}  element [description]
     * @return {CellsBridgeTemplate}         [description]
     */

  }, {
    key: '_createFromHTMLElement',
    value: function _createFromHTMLElement(name, element) {
      var template = this._createCellsTemplate(name, { node: element });

      return template;
    }
  }, {
    key: '_createFromJSON',
    value: function _createFromJSON(name, spec) {
      var template = this._createCellsTemplate(name, spec);

      return template;
    }

    // OJO!!!!
    // Debido a a la jerarquía de clases, esto debería ser implementado por cada manager

  }, {
    key: '_createCellsTemplate',
    value: function _createCellsTemplate(name, spec) {
      return new _template2.default(name, spec);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.cache[name];
    }
  }, {
    key: 'getNode',
    value: function getNode(name) {
      return this.templates[name];
    }
  }, {
    key: 'parseTemplateName',
    value: function parseTemplateName(name) {
      return name;
    }
  }, {
    key: 'parseTemplateId',
    value: function parseTemplateId(name) {
      return 'cells-template-' + name.replace(/\./g, '-');
    }
  }, {
    key: 'select',
    value: function select(name) {
      var bridgeChannelManager = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var binding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'always';
      var TEMPLATE_TRANSITION_END = externalEventsCodes.TEMPLATE_TRANSITION_END;
      var CURRENTVIEW = bindingCodes.CURRENTVIEW,
          UI = bindingCodes.UI;

      var template = this.get(name);
      var cache = this.cache;
      var oldPageName = void 0;

      for (var tplName in cache) {
        if (tplName === this.selected) {
          oldPageName = tplName;
          cache[tplName].deactivate();
        } else if (name !== tplName) {
          cache[tplName].cache();
        }
      }

      this.selected = name;
      template.activate();

      if (bridgeChannelManager && binding !== CURRENTVIEW && binding !== UI) {
        bridgeChannelManager.updateAppContext(oldPageName, name);
        bridgeChannelManager.initPrivateChannel(oldPageName, name);
      }

      _events2.default.emit(TEMPLATE_TRANSITION_END, template);
    }

    /**
     *
     * remove one template by name.
     * it remove the template from html and from the templates and cache nodes
     *
     * @param String templateName the name of the  template to remove
     */

  }, {
    key: 'removeTemplate',
    value: function removeTemplate(templateName) {
      if (this.templates[templateName]) {
        var node = document.querySelector('#' + this.templates[templateName].id);
        node.parentNode.removeChild(node);
        delete this.templates[templateName];
        delete this.cache[templateName];
      }
    }

    /**
     *
     * remove all templates except initial one and cross component one.
     *
     * @param String initialTemplate the name of the initial template
     * @param String crossContainerId the name of the cross component template
     */

  }, {
    key: 'removeTemplates',
    value: function removeTemplates(initialTemplate, crossContainerId) {
      for (var templateName in this.templates) {
        if (templateName !== initialTemplate && templateName !== crossContainerId) {
          this.removeTemplate(templateName);
        }
      }
    }

    /**
     *
     * remove all children of a template,
     * it is used, for example, for clear cross component template.
     *
     * @param String templateName the name of the  template
     */

  }, {
    key: 'removeTemplateChildrens',
    value: function removeTemplateChildrens(templateName) {
      var template = this.templates[templateName];
      if (template && template.children) {
        for (var i = template.children.length - 1; i >= 0; i--) {
          template.removeChild(template.children[i]);
        }
      }
    }
  }]);

  return CellsManagerTemplate;
}();

exports.default = CellsManagerTemplate;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(24);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dasherize = _utils2.default.dasherize;

/**
 * Get path for component retrieval based on component definition properties.
 *
 * @param  {Object} componentDefinition Raw component definition.
 * @return {String}                     Path for component retrieval.
 */

var getPathFromComponent = function getPathFromComponent(componentDefinition) {
  var familyPath = componentDefinition.familyPath,
      tag = componentDefinition.tag,
      tagName = componentDefinition.tagName;

  var _tag = tag || tagName;
  var firstPath = familyPath || _tag;

  return firstPath + '/' + _tag + '.html';
};

var CellsBridgeComposerSanitizer = function () {
  function CellsBridgeComposerSanitizer() {
    _classCallCheck(this, CellsBridgeComposerSanitizer);
  }

  _createClass(CellsBridgeComposerSanitizer, [{
    key: '_buildConfig',
    value: function _buildConfig(component) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UI';
      var componentType = component.type,
          tag = component.tag,
          tagName = component.tagName,
          zone = component.zone,
          fixed = component.fixed,
          priority = component.priority,
          properties = component.properties;

      var path = getPathFromComponent(component);
      var configType = componentType ? componentType.toUpperCase() : type;
      var config = {
        type: configType,
        tagName: tag || tagName,
        zone: zone,
        fixed: fixed,
        priority: priority,
        properties: properties,
        path: path
      };

      return this._parseConnections(config);
    }
  }, {
    key: 'parse',
    value: function parse(json) {
      var components = [];
      var LTRIM_SLASH = /^\/(\b)/;
      components.push.apply(components, _toConsumableArray(this._parseComponentsFromJson(json, 'components', 'UI')));
      var jsonTemplate = json.template;
      if (jsonTemplate) {
        jsonTemplate = this._buildConfig(jsonTemplate, 'TEMPLATE');
      }
      var pages = {};
      var jsonPages = json.pages;
      /* istanbul ignore if */
      if (jsonPages) {
        for (var index = 0; index < Object.keys(jsonPages).length; index++) {
          var page = Object.keys(jsonPages)[index];
          pages[page] = '/' + jsonPages[page].url.replace(LTRIM_SLASH, '');
        }
      }
      return {
        page: json.page,
        currentPage: json.currentPage || {},
        template: jsonTemplate,
        components: components,
        pages: pages
      };
    }
  }, {
    key: '_parseComponentsFromJson',
    value: function _parseComponentsFromJson(json, key, type) {
      var list = [];
      var components = json[key];

      /* istanbul ignore if */
      if (Array.isArray(components)) {
        for (var index = 0; index < components.length; index++) {
          var component = components[index];
          list.push(this._buildConfig(component, type));
        }
      }

      return list;
    }

    /**
     * Extend given component definition object with parsed component connections.
     *
     * @private
     * @method _parseConnections
     * @param  {Object} rawComponentDefinition  Raw component definition.
     * @return {Object}                         Component definition including connections.
     */

  }, {
    key: '_parseConnections',
    value: function _parseConnections(rawComponentDefinition) {
      var componentDefinition = this._normalizeComponentDefinition(rawComponentDefinition);
      var cellsConnections = componentDefinition.properties.cellsConnections;


      if (!cellsConnections || !Object.keys(cellsConnections).length > 0) {
        return componentDefinition;
      }

      var componentDefinitionWithConnections = _extends({}, componentDefinition);

      if (cellsConnections.params) {
        var params = this._parseConnectionsParams(cellsConnections.params);

        /* istanbul ignore if */
        if (!cellsConnections.in) {
          cellsConnections.in = {};
        }

        /* istanbul ignore if */
        if (!cellsConnections.out) {
          cellsConnections.out = {};
        }

        _extends(cellsConnections.in, params.in);
        _extends(cellsConnections.out, params.out);
      }

      componentDefinitionWithConnections.connections = cellsConnections;

      return componentDefinitionWithConnections;
    }

    /**
     * Normalizes given raw component definition. Safe-guard method.
     *
     * @private
     * @method _normalizeComponentDefinition
     * @param  {Object} rawComponentDefinition Raw component definition object.
     * @return {Object}                        Normalized component definition object.
     */

  }, {
    key: '_normalizeComponentDefinition',
    value: function _normalizeComponentDefinition(rawComponentDefinition) {
      var DEFAULT_PROPERTIES = { cellsConnections: { in: {}, out: {} } };
      var componentDefinition = _extends({}, rawComponentDefinition);

      componentDefinition.properties = componentDefinition.properties || DEFAULT_PROPERTIES;

      return componentDefinition;
    }

    /**
     * Parse params to appropiate connections.
     *
     * @private
     * @method _parseConnectionsParams
     * @param  {Object} params Params to be parsed.
     * @return {Object}        Parsed connections.
     */

  }, {
    key: '_parseConnectionsParams',
    value: function _parseConnectionsParams(params) {
      var connections = {
        in: {},
        out: {}
      };

      for (var prop in params) {
        var paramDef = params[prop];
        var outBind = dasherize(prop) + '-changed';

        connections.in[paramDef] = this._createConnection(prop);
        connections.out[paramDef] = this._createConnection(outBind);
      }

      return connections;
    }

    /**
     * Create connection object based on given parameters.
     *
     * @private
     * @method _createConnection
     * @param  {String}  bind          Property to bind to.
     * @param  {Boolean} [global=true] Global flag.
     * @return {Object}                Connection object.
     */

  }, {
    key: '_createConnection',
    value: function _createConnection(bind) {
      var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return {
        bind: bind,
        global: global
      };
    }
  }, {
    key: 'split',
    value: function split(data) {
      var response;
      /* istanbul ignore if */
      if (data) {
        response = {
          CC: [],
          UI: [],
          DM: []
        };
        for (var index = 0; index < data.length; index++) {
          var item = data[index];
          response[item.type].push(item);
        }
      }
      return response;
    }
  }]);

  return CellsBridgeComposerSanitizer;
}();

exports.default = CellsBridgeComposerSanitizer;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for managing templates
 *
 * A template is a component used in Cells apps for managing the components distribution
 *
 * A template has defined zones like app__header or app__main
 * where you can place your components.
 * The property zoneId (in the json page definition file) indicates the zone in wHich the
 * the component is appended.
 *
 * The components added to the template are the template's children. There are two kind of children:
 * the fixed children and the normal children. The normal ones are appended
 * to the asigned zone, the fixed ones are just stored in the fixedChildren property
 * and appended to an especial zone that is fixed.
 *
 * As the class extends from Component it has properties like node which refers to
 * the node the template is attached.
 *
 * The 'state' atributte in the node is used to know the actual state of the template
 * it can be active, cached or inactive.
 */
var CellsBridgeTemplate = function (_CellsComponent) {
  _inherits(CellsBridgeTemplate, _CellsComponent);

  function CellsBridgeTemplate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CellsBridgeTemplate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CellsBridgeTemplate.__proto__ || Object.getPrototypeOf(CellsBridgeTemplate)).call.apply(_ref, [this].concat(args))), _this), _this.children = [], _this.fixedChildren = [], _this.type = 'TEMPLATE', _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * children
   *
   * a list of all the components in the template (including the fixed ones)
   *
   * @type {Array}
   */

  /**
   * fixedChildren
   *
   * a list of the components in the template of type fixed, not attached to the template
   * but in a special fixed zone
   *
   * @type {Array}
   */

  /**
   * type
   *
   * indicates the type of this component
   *
   * @type {String}
   */


  _createClass(CellsBridgeTemplate, [{
    key: 'getZone',


    /**
     * returns the zone node in the template identified by the id.
     *
     * @param {String} zoneId
     *
     * @return {HTMLElement}
     */
    value: function getZone(zoneId) {
      var curTemplate = this.node;
      var node;
      if (!zoneId) {
        node = curTemplate;
      } else if (curTemplate.$ && curTemplate.$[zoneId]) {
        node = curTemplate.$[zoneId];
      } else {
        node = curTemplate.querySelector('#' + zoneId);
      }
      return node || curTemplate;
    }

    /**
     * sets the attribute cache in the template node to 'cached'
     * for not loading the template again the next time the template is used
     */

  }, {
    key: 'cache',
    value: function cache() {
      this._setAttribute('state', 'cached');
    }

    /**
     * sets the attribute cache in the template node to 'active'
     * so you can know which of the templates in html is the actual one
     */

  }, {
    key: 'activate',
    value: function activate() {
      this._setAttribute('state', 'active');
    }

    /**
     * sets the attribute cache in the template node to 'inactive'
     * so you can know which of the templates in html are not the actual one
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      this._setAttribute('state', 'inactive');
    }
  }, {
    key: 'native',
    value: function native() {
      this._setAttribute('state', 'native');
    }
  }, {
    key: 'resetNextNavigation',
    value: function resetNextNavigation() {
      this._getTemplate(this.node)._nextNavigation = undefined;
    }

    /**
     * Set given value to corresponding attribute name of current template.
     *
     * @private
     * @method _setAttribute
     * @param {String} name  Attribute name.
     * @param {String} value Attribute value.
     */

  }, {
    key: '_setAttribute',
    value: function _setAttribute(name, value) {
      var template = this._getTemplate(this.node);

      template.setAttribute(name, value);
    }

    /**
     * Returns current template based on node type.
     * If it's a routable component (page), we retrieve the first child element that matchs with cells-template.
     * Otherwise, we return directly the node (cells-template).
     *
     * @private
     * @method _getTemplate
     * @param  {HTMLElement} node Node for template retrieval.
     * @return {HTMLElement}      Associate template from given node.
     */

  }, {
    key: '_getTemplate',
    value: function _getTemplate(node) {
      var tagName = node.tagName;

      var isPage = tagName.toLowerCase().endsWith('-page');

      return isPage ? this._getCellsTemplateFromShadowRootChildNodes(node) : node;
    }

    /**
     * Returns first element from shadowRoot child nodes that matchs 'cells-template'.
     *
     * @private
     * @method _getCellsTemplateFromShadowRootChildNodes
     * @param  {HTMLElement} node First level component that contains cells-template inside shadowRoot childNodes.
     * @return {HTMLElement}      Cells template.
     */

  }, {
    key: '_getCellsTemplateFromShadowRootChildNodes',
    value: function _getCellsTemplateFromShadowRootChildNodes(node) {
      return Array.from(node.shadowRoot.childNodes).find(function (el) {
        return el && el.tagName && el.tagName.toLowerCase().indexOf('cells-template') !== -1;
      });
    }

    /**
     * recieves one component or a list of them, gets the new ones and append
     * them as child in the selected zone of the template
     *
     * @param {Array}/{Object} components
     *
     * @return {Boolean}
     */

  }, {
    key: 'append',
    value: function append(components) {
      /* istanbul ignore else */
      if (!components) {
        return;
      }
      /* istanbul ignore else */
      if (components.length === undefined) {
        components = [components];
      }

      var newContentComponents = components.filter(function (component) {
        return component.fixed !== true;
      });
      var newFixedChildren = components.filter(function (component) {
        return component.fixed === true;
      });
      this.fixedChildren = this.fixedChildren.concat(newFixedChildren);
      this.children = this.children.concat(components);
      var zoneCache = [];

      for (var index = 0; index < newContentComponents.length; index++) {
        var component = newContentComponents[index];
        // for backward compatibility with Polymer 1
        component.node.setAttribute('data-select', component.zone);
        // for the use of slots required by Polymer 2
        component.node.setAttribute('slot', component.zone);
        if (_typeof(zoneCache[component.zone]) !== 'object') {
          zoneCache[component.zone] = this.getZone(component.zone);
        }
        zoneCache[component.zone].appendChild(component.node);
      }
    }
  }, {
    key: 'config',
    value: function config(cellsTemplateConfig) {
      var name = cellsTemplateConfig.name,
          _cellsTemplateConfig$ = cellsTemplateConfig.template,
          templateId = _cellsTemplateConfig$.id,
          templateName = _cellsTemplateConfig$.name;


      this.name = name;
      this.node.id = templateId;
      this.node.name = templateName;

      this.setProps();
    }
  }]);

  return CellsBridgeTemplate;
}(_component2.default);

exports.default = CellsBridgeTemplate;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Taken from string.js npm package
// https://github.com/jprichardson/string.js

var dasherize = exports.dasherize = function dasherize(str) {
  return str.trim().replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
};
var camelize = exports.camelize = function camelize(str) {
  return str.trim().replace(/(-|_|\s)+(.)?/g, function (mathc, sep, c) {
    return c ? c.toUpperCase() : '';
  });
};

exports.default = {
  dasherize: dasherize,
  camelize: camelize
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPolymerElementUnresolved = isPolymerElementUnresolved;
function isPolymerElementUnresolved(node) {
  var isCustomElement = node.tagName.indexOf('-') > -1;
  var isPolymer1 = node.__isPolymerInstance__ === true;
  var isPolymer2 = Polymer.Element !== undefined && node instanceof Polymer.Element || Polymer.ElementMixin !== undefined && node instanceof Polymer.ElementMixin || Polymer.LegacyElementMixin !== undefined && node instanceof Polymer.LegacyElementMixin || node.is !== undefined && node.ready !== undefined && node.notifyPath !== undefined;

  return isCustomElement && !isPolymer1 && !isPolymer2;
}

exports.default = {
  isPolymerElementUnresolved: isPolymerElementUnresolved
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(4);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__(84);
var identity_1 = __webpack_require__(94);
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
}
exports.mergeAll = mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var Notification_1 = __webpack_require__(56);
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
exports.observeOn = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
exports.ObserveOnOperator = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
exports.ObserveOnSubscriber = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
exports.ObserveOnMessage = ObserveOnMessage;
//# sourceMappingURL=observeOn.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bridge = __webpack_require__(35);

var _bridge2 = _interopRequireDefault(_bridge);

var _componentConnector = __webpack_require__(47);

var _componentConnector2 = _interopRequireDefault(_componentConnector);

var _template = __webpack_require__(49);

var _template2 = _interopRequireDefault(_template);

var _component = __webpack_require__(48);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellsPolymerBridge = function (_CellsBridge) {
  _inherits(CellsPolymerBridge, _CellsBridge);

  function CellsPolymerBridge(config) {
    _classCallCheck(this, CellsPolymerBridge);

    var _this = _possibleConstructorReturn(this, (CellsPolymerBridge.__proto__ || Object.getPrototypeOf(CellsPolymerBridge)).call(this, config));

    if (config.avoidPolymerEventCache === true) {
      var origGetEvent = Polymer.Base._getEvent;
      Polymer.Base._getEvent = function (type, bubbles, cancelable) {
        return origGetEvent(type, bubbles, cancelable, false);
      };
    }
    return _this;
  }

  _createClass(CellsPolymerBridge, [{
    key: '_initDependencies',
    value: function _initDependencies(dependencies) {
      dependencies = _extends({
        ComponentConnector: _componentConnector2.default,
        TemplateManager: _template2.default
      }, dependencies);
      _get(CellsPolymerBridge.prototype.__proto__ || Object.getPrototypeOf(CellsPolymerBridge.prototype), '_initDependencies', this).call(this, dependencies);
    }
  }, {
    key: '_createCellsComponent',
    value: function _createCellsComponent(spec, context) {
      return new _component2.default(spec, context);
    }
  }]);

  return CellsPolymerBridge;
}(_bridge2.default);

exports.default = CellsPolymerBridge;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-next-line no-unused-vars


var _dom = __webpack_require__(20);

var _dom2 = _interopRequireDefault(_dom);

var _page = __webpack_require__(40);

var _page2 = _interopRequireDefault(_page);

var _componentConnector = __webpack_require__(19);

var _componentConnector2 = _interopRequireDefault(_componentConnector);

var _router = __webpack_require__(45);

var _router2 = _interopRequireDefault(_router);

var _sanitizer = __webpack_require__(22);

var _sanitizer2 = _interopRequireDefault(_sanitizer);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _import = __webpack_require__(39);

var _import2 = _interopRequireDefault(_import);

var _template = __webpack_require__(21);

var _template2 = _interopRequireDefault(_template);

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

var _bridgeChannels = __webpack_require__(38);

var _bridgeChannels2 = _interopRequireDefault(_bridgeChannels);

var _actionChannels = __webpack_require__(37);

var _actionChannels2 = _interopRequireDefault(_actionChannels);

var _utils = __webpack_require__(24);

var _utils2 = _interopRequireDefault(_utils);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _monitoring = __webpack_require__(42);

var _monitoring2 = _interopRequireDefault(_monitoring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dasherize = _utils2.default.dasherize,
    camelize = _utils2.default.camelize;
var bindingCodes = _constants2.default.bindingCodes,
    binding = _constants2.default.binding,
    componentsPath = _constants2.default.componentsPath,
    composerEndpoint = _constants2.default.composerEndpoint,
    externalEvents = _constants2.default.externalEvents,
    externalEventsCodes = _constants2.default.externalEventsCodes,
    DEFAULT_INITIAL_TEMPLATE = _constants2.default.initialTemplate,
    DEFAULT_PAGES_PATH = _constants2.default.pagesPath,
    prplCodes = _constants2.default.prplCodes,
    prpl = _constants2.default.prpl;
var ALWAYS = binding.DEFAULT;
var DEFER = prpl.DEFAULT;


var coreInstances = 0;
var globalChannel = {};

// @TODO: Agregar los imports y eliminar los `new this.*`
// @TODO: Revisar los métodos que manipulan templates. Quizás deban ser responsabilidad del TemplateManager

var CellsBridge = function () {

  /**
   * The list of templates that are remote and need to be fetched from a remote server
   * @type {Array}
   */


  /**
   * The lists of routes that are rendered through a WebComponent.
   *
   * @type {Array}
   */

  /**
   *  The node where the template will be rendered
   */

  /**
  * Max number of views
  *
  * Keeps this number of template alive.
  *
  * @type {Number}
  */

  /**
  * Prefix for LocalStorage keys
  *
  * @type {String}
  */

  /**
  * Proactive Cache.
  * Loads future pages definition.
  *
  * @type {Boolean}
  */

  /**
  * Cross container node Id
  *
  * @type {String}
  */

  /**
   * URL Components Path
   *
   * URL path to load components.
   *
   * @type {String}
   */

  /**
  * Pages Cache
  *
  * Saves page definitions into localstorage.
  *
  * @type {Boolean}
  */


  /**
  * Binding Type
  *
  * 'always'      => Register all components of all views. Never unregister them.
  * 'delayed'     => Like 'always' but waits for idle to start the animation.
  * 'ui'          => Register only ui and cross components of all views. Never
  *                  unregister them. Datamanagers are only connected when the
  *                  animation of the current view finishes.
  * 'currentview' => Register all components of the current view when the
  *                  animation finishes.
  *
  * @type {String}
  */
  function CellsBridge(config) {
    var _this = this;

    _classCallCheck(this, CellsBridge);

    this.ComponentConnector = null;
    this.DomManager = null;
    this.ImportManager = null;
    this.PageManager = null;
    this.Router = null;
    this.TemplateManager = null;
    this.Sanitizer = null;
    this.BridgeChannelManager = null;
    this.binding = ALWAYS;
    this.prplLevel = DEFER;
    this.cache = true;
    this.channel = 'global';
    this.componentsPath = componentsPath;
    this.templatesPath = '';
    this.crossContainerId = '__cross';
    this.debug = true;
    this.preCache = false;
    this.preRender = false;
    this.storagePrefix = '__bridge-';
    this.version = '3.4.5';
    this.viewLimit = 6;
    this.initialTemplate = DEFAULT_INITIAL_TEMPLATE;
    this.__mainNodeElement = null;
    this.externalEvents = externalEvents;
    this.pages = [];
    this.pagesPath = DEFAULT_PAGES_PATH;
    this.remoteTemplates = [];
    this.appId = '';
    this.composerEndpoint = composerEndpoint;
    this.templatesPath = '';
    this.monitoring = null;
    this.logs = false;
    var NAV_REQUEST = externalEventsCodes.NAV_REQUEST,
        ROUTER_BACKSTEP = externalEventsCodes.ROUTER_BACKSTEP;


    if (!config || (typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      config = {};
    }

    config.prplLevel = this._normalizePrplLevel(config.prplLevel);

    var dependencies = config.dependencies;
    delete config.dependencies;
    _extends(this, config);

    this._initDependencies(dependencies);

    if (this.channel === 'global') {
      this.ComponentConnector.manager.channels = globalChannel;
    }

    if (!this.mainNode) {
      console.warn('You should indicate the main node of your app');
    } else {
      this._plugExternalEvents();
    }

    this.id = coreInstances++;
    this._initCrossComponents();

    if (this.cache) {
      this.PageManager.persistent = true;
    }
    if (this.generateRequestUrl) {
      console.assert(typeof this.generateRequestUrl === 'function', 'generateRequestUrl has to be a function');
      this.PageManager.generateRequestUrl = this.generateRequestUrl;
    }
    if (this.onPageDefinitionNotFound) {
      console.assert(typeof this.onPageDefinitionNotFound === 'function', 'onPageDefinitionNotFound has to be a function');
      this.PageManager.onPageDefinitionNotFound = this.onPageDefinitionNotFound;
    }
    window.$core = window.$core || [];
    /* istanbul ignore else */
    if (this.debug) {
      window.$core.push(this);
      this.printDebugInfo();
    } else {
      window.$core.push({
        // @TODO extract to factory method
        // monitoring
        log: function log(_log2) {
          return _this.log(_log2);
        },
        ingest: function ingest(spans) {
          return _this.ingestSpans(spans);
        },
        createSpan: function createSpan(data) {
          return _this.createSpan(data);
        },
        createUUID: function createUUID() {
          return _this.createUUID();
        },

        logout: function logout() {
          return _this.logout();
        },
        subscribeToEvent: function subscribeToEvent(eventName, callback) {
          return _this.subscribeToEvent(eventName, callback);
        },
        registerInConnection: function registerInConnection(channel, node, callback) {
          return _this.registerInConnection(channel, node, callback);
        },
        registerOutConnection: function registerOutConnection(channelName, node, bindName) {
          return _this.registerOutConnection(channelName, node, bindName);
        },
        publish: function publish(channelName, value) {
          return _this.publish(channelName, value);
        },
        navigate: function navigate(page, params) {
          return _this.navigate(page, params);
        }
      });
    }
    window.cells = window.$core[0];

    this.BridgeChannelManager.initAppContextChannel();
    this.BridgeChannelManager.getCancelledBackNavigationChannel();
    this.ActionChannelManager.subscribeAll();

    // Bridge is ready - execute queued bridge commands
    this._executePendingBridgeQueue();

    if (this.logs) {
      this._logBridgeReady();
    }

    // 1. Listen for route changes
    // @TODO: Revisar este binding de un método de otro objeto a otro objeto
    this.Router.handler = function () {
      return _this.routeHandler();
    };
    this.Router.addRoutes(this.routes);
    this._initSkipNavigations();
    this.Router.start();

    _events2.default.on(NAV_REQUEST, function (info) {
      var event = info.event;
      var navigationDetail = info.detail;
      var page = navigationDetail.page;
      var params = navigationDetail.params;
      var skipHistory = navigationDetail.skipHistory;
      var replace = navigationDetail.replace || false;
      var p = {};
      if (!page && navigationDetail.paramPage && event.detail) {
        page = event.detail[navigationDetail.paramPage];
      }
      if (event.detail && params) {
        for (var param in params) {
          if (params.hasOwnProperty(param)) {
            p[params[param]] = event.detail[param];
          }
        }
      }
      this.Router.go(page, p, replace, skipHistory);
      _extends(this, config);
    }.bind(this));

    _events2.default.on(ROUTER_BACKSTEP, function (evt) {
      return _this.handleBack(evt);
    });
  }

  /**
   * Performs the go back action. This method is overriden by the CellsNativeBridge
   *
   * @return {Object} the executed navigation, an object with properties:
   *  - from
   *  - to
   */


  /**
   * The path to the folder that contains the components that renders a route.
   *
   * @type {String}
   */


  /**
  * Events to expose
  *
  *
  * @type {Array}
  */

  /**
   * The name of the initial template that gets rendered
   *
   * @type {String}
   */

  /**
  * Lib version.
  *
  * @type {string}
  */

  /**
  * Proactive Render
  * Render future pages.
  *
  * @type {Boolean}
  */

  /**
  * Prints debug info
  *
  * @type {Boolean}
  */

  /**
  * URL templates Path
  *
  * URL path to load templates.
  *
  * @type {String}
  */

  /**
  * PubSub Context
  *
  * 'global'   => Notifies all components of all bridge instances.
  * 'local'    => Notifies components created by the current bridge instance.
  *
  * @type {String}
  */

  /**
   *
   * @type {sting}
   *
   *  none => Don't use bundled pages
   *  defer => Use bundled pages. It renders the page once every component has been loaded.
   *  progressive => Use bundled pages. It renders the page inmediatelly while its component are loading.
   *  hero => Use bundled pages. It renders the page inmediatelly while its component are loading using priorities.
   */


  _createClass(CellsBridge, [{
    key: 'goBack',
    value: function goBack() {
      return this.Router.back();
    }

    /**
     * This method is executed when the event router-backstep is fired.
     * It calls the hook method for handling backward navigations and if that method
     * allows the continuation, it does the navegation. Otherwise it will cancel the navigation
     * and publish the response in the channel __bridge_cancelled_back_navigation.
     */

  }, {
    key: 'handleBack',
    value: function handleBack() {
      this.goBack();
    }

    /**
     * Execute queued bridge commands due to delayed instance of bridge and
     * premature execution of commands.
     *
     * @method
     * @private
     */

  }, {
    key: '_executePendingBridgeQueue',
    value: function _executePendingBridgeQueue() {
      if (!window.cellsBridgeQueue || !window.cellsBridgeQueue.length) {
        return;
      }

      for (var i = 0; i < window.cellsBridgeQueue.length; i++) {
        var queuedItem = window.cellsBridgeQueue[i];
        var command = queuedItem.command,
            parameters = queuedItem.parameters;

        var queuedCommand = this[command];

        if (!queuedCommand) {
          console.log('WARNING: Invalid cells bridge command execution: ' + command + ' (QUEUE).');
          return;
        }

        console.log('Executing queued command ' + command + '.');
        queuedCommand.apply(this, parameters);
      }

      delete window.cellsBridgeQueue;
    }
  }, {
    key: '_logBridgeReady',
    value: function _logBridgeReady() {
      var appId = this.appId,
          version = this.version,
          binding = this.binding,
          prplLevel = this.prplLevel,
          cache = this.cache,
          preCache = this.preCache,
          preRender = this.preRender;

      var message = 'cells-bridge::ready';
      var properties = {
        appId: appId,
        version: version,
        binding: binding,
        href: window.location.href,
        prplLevel: prplLevel,
        cache: cache,
        preCache: preCache,
        preRender: preRender
      };
      var log = { message: message, properties: properties };

      this.logBridge(log);
    }
  }, {
    key: '_initSkipNavigations',
    value: function _initSkipNavigations() {
      if (this.skipNavigations && this.skipNavigations.length > 0) {
        for (var i = 0; i < this.skipNavigations.length; i++) {
          this.skipNavigations[i].skipHistory = true;
        }
        this.Router.addSkipNavigations(this.skipNavigations);
      }
    }
  }, {
    key: '_normalizePrplLevel',
    value: function _normalizePrplLevel(prplLevelCode) {
      var prplList = prpl.VALUES;

      var normalizedCode = void 0;

      if (prplList.indexOf(prplLevelCode) > -1) {
        normalizedCode = prplLevelCode;
      } else {
        normalizedCode = prplList[prplLevelCode] || DEFER;
      }
      return normalizedCode;
    }
  }, {
    key: '_plugExternalEvents',
    value: function _plugExternalEvents() {
      var _this2 = this;

      var len = this.externalEvents.length;
      var mainNode = this.getMainNode();
      var setExternalEvent = function setExternalEvent(name, payload) {
        var event = payload ? new CustomEvent(name, { detail: payload }) : new CustomEvent(name);
        mainNode.dispatchEvent(event);
      };
      if (mainNode) {
        var _loop = function _loop(i) {
          var eventName = _this2.externalEvents[i];

          _events2.default.on(eventName, function (data) {
            setExternalEvent(eventName, data);

            if (_this2.logs) {
              _this2.monitor(eventName, data);
            }
          });
        };

        for (var i = 0; i < len; i++) {
          _loop(i);
        }
        this._initEventChannels();
      } else {
        console.warn('The defined main node does not exist');
      }
    }
  }, {
    key: 'monitor',
    value: function monitor(eventName, data) {
      var LOG_EVENT = externalEventsCodes.LOG_EVENT;

      var isApplicationLogEvent = eventName === LOG_EVENT;
      var isLoggable = isApplicationLogEvent || this.isBridgeLoggableEvent(eventName);

      if (isLoggable) {
        var log = this.monitoring.buildLog(eventName, data);
        var method = isApplicationLogEvent ? 'log' : 'logBridge';

        this[method](log);
      }
    }
  }, {
    key: 'isBridgeLoggableEvent',
    value: function isBridgeLoggableEvent(eventName) {
      return this.monitoring.isBridgeLoggableEvent(eventName);
    }
  }, {
    key: 'log',
    value: function log(_log) {
      this.hasApplicationLoggingEnabled() && this.monitoring.logApplication(_log);
    }
  }, {
    key: 'logBridge',
    value: function logBridge(log) {
      this.monitoring.logBridge(log);
    }
  }, {
    key: 'ingest',
    value: function ingest(spans) {
      this.hasApplicationLoggingEnabled() && this.monitoring.ingest(spans);
    }
  }, {
    key: 'createSpan',
    value: function createSpan(data) {
      if (!this.hasApplicationLoggingEnabled()) {
        return;
      }

      return this.monitoring.createSpan(data);
    }
  }, {
    key: 'createUUID',
    value: function createUUID() {
      return this.monitoring.createUUID();
    }
  }, {
    key: 'hasApplicationLoggingEnabled',
    value: function hasApplicationLoggingEnabled() {
      return this.monitoring.hasApplicationLoggingEnabled();
    }
  }, {
    key: '_initEventChannels',
    value: function _initEventChannels() {
      var mainNode = this.getMainNode();
      this.BridgeChannelManager.initEventChannels(mainNode, this.externalEvents);
      this._addInitialSubscribersToEvents();
    }
  }, {
    key: '_addInitialSubscribersToEvents',
    value: function _addInitialSubscribersToEvents() {
      if (this.eventSubscriptions && this.eventSubscriptions.length > 0) {
        this._subscribeToEvents(this.eventSubscriptions);
      }
    }
  }, {
    key: '_subscribeToEvents',
    value: function _subscribeToEvents(eventSubscriptions) {
      var _this3 = this;

      eventSubscriptions.forEach(function (subscription) {
        var event = subscription.event,
            callback = subscription.callback;


        _this3.subscribeToEvent(event, callback);
      });
    }

    /**
     * Initialization of cross components container.
     * Check if cross component container exists. Otherwise, it will be created.
     *
     * @private
     */

  }, {
    key: '_initCrossComponents',
    value: function _initCrossComponents() {
      var crossContainerTemplateId = this.TemplateManager.parseTemplateId(this.crossContainerId);
      var crossContainer = this.TemplateManager.get(crossContainerTemplateId);
      var crossContainerElement = document.getElementById(crossContainerTemplateId);

      // no cross container registered on memory
      if (!crossContainer) {
        if (!crossContainerElement) {
          // no html element for cross container, we build it from scratch
          crossContainer = this.TemplateManager.create(this.crossContainerId, { tagName: 'div' });
          document.body.appendChild(crossContainer.node);
        } else {
          // html element found. we register it
          this.TemplateManager.register(this.crossContainerId, crossContainerElement);
        }
      }
    }
  }, {
    key: '_initDependencies',
    value: function _initDependencies(dependencies) {
      dependencies = _extends({
        ComponentConnector: _componentConnector2.default,
        DomManager: _dom2.default,
        ImportManager: _import2.default,
        PageManager: _page2.default,
        TemplateManager: _template2.default,
        Router: _router2.default,
        Sanitizer: _sanitizer2.default,
        BridgeChannelManager: _bridgeChannels2.default,
        ActionChannelManager: _actionChannels2.default,
        monitoring: _monitoring2.default
      }, dependencies);
      for (var dependence in dependencies) {
        if (dependencies.hasOwnProperty(dependence)) {
          this[dependence] = new dependencies[dependence](this);
        }
      }
    }
  }, {
    key: '_createCellsComponent',
    value: function _createCellsComponent(spec, context) {
      return new _component2.default(spec, context);
    }
  }, {
    key: 'createCCComponent',
    value: function createCCComponent(spec) {
      var container = this.TemplateManager.get(this.crossContainerId);
      var node = container.node.querySelector(spec.tagName);
      if (!node) {
        var cmp = this._createCellsComponent(spec, this);
        cmp.__parentTemplate = container;
        this.ComponentConnector.register(cmp.node, cmp.spec.connections);
        return cmp;
      } else {
        this.ComponentConnector.progressiveRegister(node, spec.connections);
      }
    }
  }, {
    key: 'createUIComponent',
    value: function createUIComponent(spec) {
      var ALWAYS = bindingCodes.ALWAYS,
          DELAYED = bindingCodes.DELAYED,
          UI = bindingCodes.UI;

      var bindingType = this.binding;
      var cmp = this._createCellsComponent(spec, this);

      if (bindingType === ALWAYS || bindingType === DELAYED || bindingType === UI) {
        this.ComponentConnector.register(cmp.node, cmp.connections);
      }
      return cmp;
    }
  }, {
    key: 'createDMComponent',
    value: function createDMComponent(spec) {
      var ALWAYS = bindingCodes.ALWAYS,
          DELAYED = bindingCodes.DELAYED;

      var bindingType = this.binding;
      var cmp = this._createCellsComponent(spec, this);

      if (bindingType === ALWAYS || bindingType === DELAYED) {
        this.ComponentConnector.register(cmp.node, cmp.connections);
      }
      return cmp;
    }
  }, {
    key: '_createLocalComponent',
    value: function _createLocalComponent(type, items, template) {
      var collection = [];
      for (var i = 0, l = items.length; i < l; i++) {
        var spec = items[i];
        var cmp = this['create' + type + 'Component'](spec);
        if (cmp) {
          cmp.__parentTemplate = cmp.__parentTemplate || template;
          collection.push(cmp);
        }
      }
      return collection;
    }
  }, {
    key: 'createComponentsByType',
    value: function createComponentsByType(collection, template) {
      var itemsToInject = [];
      var sortedList = ['CC', 'UI', 'DM'];
      for (var j = 0, k = sortedList.length; j < k; j++) {
        var type = sortedList[j];
        var items = collection[type];
        itemsToInject = itemsToInject.concat(this._createLocalComponent(type, items, template));
      }
      return itemsToInject;
    }
  }, {
    key: '_createComponents',
    value: function _createComponents(response, template) {
      var _this4 = this;

      var isPreRendering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var PAGE_READY = externalEventsCodes.PAGE_READY;
      var page = response.page;


      var options = this;
      var collection = this.Sanitizer.split(response.components);
      var components = this.createComponentsByType(collection, template);
      var unresolvedComponents = [];
      var templateParents = [];

      for (var i = 0, l = components.length; i < l; i++) {
        // 9. Sets default attributes
        components[i].setProps();
        var component = components[i];
        var parentName = component.__parentTemplate.name;
        if (!templateParents[parentName]) {
          templateParents[parentName] = this.TemplateManager.get(parentName);
        }
        // 9.1 Append components to template
        templateParents[parentName].append(component);

        if (component.isUnresolved()) {
          unresolvedComponents.push(component);
        }
      }

      _events2.default.emit(PAGE_READY, { page: page, components: response.components.map(function (c) {
          return c.tagName;
        }).join(', ') });

      switch (this.prplLevel) {
        case prplCodes.NONE:
        case prplCodes.DEFER:
          this.ImportManager.loadComponent(unresolvedComponents, options.componentsPath).then(function () {
            _this4.selectTemplate(page, isPreRendering);
          });
          break;
        case prplCodes.PROGRESSIVE:
          this.ImportManager.loadComponent(unresolvedComponents, options.componentsPath);
          break;
        case prplCodes.HERO:
          this.selectTemplate(page, isPreRendering);
          this.ImportManager.loadComponentByPriority(unresolvedComponents, options.componentsPath);
          break;
      }
    }
  }, {
    key: 'createPageFromPolymerWebComponent',
    value: function createPageFromPolymerWebComponent(name) {
      var componentName = name + '-page';
      var node = this.TemplateManager.getNode(name);

      this.BridgeChannelManager.getPrivate(name);

      if (!node) {
        node = this.TemplateManager.createFromComponent(name, componentName);

        if (node.isUnresolved()) {
          // @TODO
          // OJO!!! hay que ver cómo integramos selectTemplate en lugar de selectPage...
          return this.loadPolymerWebComponent(name);
        }
      }

      // @TODO
      // OJO!!! hay que ver cómo integramos selectTemplate en lugar de selectPage...
      return Promise.resolve();
    }
  }, {
    key: '_isLocalTemplate',
    value: function _isLocalTemplate(templateName) {
      var isLocal = true;
      if (this.composerEndpoint && this.remoteTemplates) {
        isLocal = this.remoteTemplates.indexOf(templateName) === -1;
      }
      return isLocal;
    }
  }, {
    key: 'createTemplate',
    value: function createTemplate(response) {
      var _this5 = this;

      var isPreRendering = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var spec = response;
      var name = response.page;
      var node = this.TemplateManager.getNode(name);
      this.BridgeChannelManager.getPrivate(name);
      // Template is cached
      if (node) {
        this.selectTemplate(name, isPreRendering);
      } else {
        // Template not cached and has definition
        if (spec && spec.template) {
          if (this.prplLevel === prplCodes.DEFER && this._isLocalTemplate(name)) {
            this.ImportManager.loadBundleForTemplate(this.componentsPath, name).then(function () {
              _this5._createTemplateFromSpec(name, spec, isPreRendering);
            });
          } else {
            this._createTemplateFromSpec(name, spec, isPreRendering);
          }
        }
      }
      this._preRender(response, isPreRendering);
    }
  }, {
    key: '_preRender',
    value: function _preRender(response, isPreRendering) {
      var _this6 = this;

      if ((this.preCache === true || this.preRender === true) && response.pages) {
        for (var page in response.pages) {
          var pageAlreadyLoaded = page === name || this.TemplateManager.cache[page];
          if (pageAlreadyLoaded) {
            continue;
          }
          this.loadTemplate(page).then(function (templateResponse) {
            if (_this6.preRender) {
              if (isPreRendering === false) {
                var doPreRender = true;
                if (templateResponse.page) {
                  _this6._idleCallback(function () {
                    return _this6.createTemplate(templateResponse, doPreRender);
                  });
                } else {
                  console.warn('Missing page. ', templateResponse);
                }
              }
            }
          });
        }
      }
    }
  }, {
    key: '_createTemplateFromSpec',
    value: function _createTemplateFromSpec(name, spec) {
      var _this7 = this;

      var isPreRendering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // 4. Creates the new template
      var template = this.TemplateManager.create(name, spec.template);
      if (this.prplLevel === prplCodes.PROGRESSIVE) {
        this.selectTemplate(name, isPreRendering);
      }
      this.ComponentConnector.register(template.node, template.connections);
      // Add new routes in router
      if (spec.pages) {
        this.Router.addRoutes(spec.pages);
      }
      // 5. Import it when doesn't exists
      if (template.isUnresolved()) {
        switch (this.prplLevel) {
          case prplCodes.NONE:
          case prplCodes.DEFER:
            this.ImportManager.loadComponent(template, this.componentsPath).then(function () {
              _this7._createComponents(spec, template, isPreRendering);
            });
            break;
          case prplCodes.PROGRESSIVE:
          case prplCodes.HERO:
            this._createComponents(spec, template, isPreRendering);
            break;
        }
      } else {
        this._createComponents(spec, template, isPreRendering);
      }
    }

    /**
    * Id for template node
    *
    * @param  {String} name Template name
    *
    * @return {String}
    */

  }, {
    key: 'parseTemplateId',
    value: function parseTemplateId(name) {
      return 'cells-template-' + name.replace(/\./g, '-');
    }
  }, {
    key: 'parse',
    value: function parse(name, value) {
      name = camelize('parse-' + name);
      return typeof this[name] === 'function' ? this[name](value) : value;
    }
  }, {
    key: 'printDebugInfo',
    value: function printDebugInfo() {
      var getColor = function getColor(option, color) {
        var hexColor = option ? color : '#b0bec5';
        return 'background:' + hexColor + '; color:#fff; padding:2px 4px; margin-right: 5px;';
      };
      console.log('%cbridge version: ' + this.version + ' %cbinding: ' + this.binding + ' %cprplLevel: ' + this.prplLevel + ' %ccache: ' + this.cache + ' %cpreCache: ' + this.preCache + ' %cpreRender: ' + this.preRender + ' %clogs: ' + this.logs, getColor(this.version, '#003f8d'), getColor(this.binding, '#0065ba'), getColor(this.prplLevel, '#008ff2'), getColor(this.cache, '#0093e2'), getColor(this.preCache, '#00aeeb'), getColor(this.preRender, '#41cef8'), //#00aeeb
      getColor(this.logs, '#0025ad') //#00aeeb
      );

      if (this.id > 0) {
        console.log('%cWARNING: There are ' + (this.id + 1) + ' simultaneous instances of the Bridge running.', getColor(this.id, '#FF0000'));
      }
    }
  }, {
    key: 'routeHandler',
    value: function routeHandler() {
      var PARSE_ROUTE = externalEventsCodes.PARSE_ROUTE;

      var route = this.Router.currentRoute;

      _events2.default.emit(PARSE_ROUTE, route);

      // 2. Load a new page when route changes
      this._handleRouteLoading(route);

      // 3. Publish URL params to global params.
      for (var param in route.params) {
        if (route.params.hasOwnProperty(param)) {
          var eventData = {
            detail: {
              value: route.params[param]
            },
            type: dasherize(param) + '-changed'
          };

          this.ComponentConnector.manager.get(param).next(eventData);
        }
      }
    }

    /**
     * Determines if given route maps to a component.
     *
     * @param  {Object}  route  Route object.
     * @return {Boolean}
     */

  }, {
    key: 'isRoutableComponent',
    value: function isRoutableComponent(route) {
      return this.pages.indexOf(route.name) >= 0;
    }
  }, {
    key: 'loadTemplate',
    value: function loadTemplate(name, params) {
      var cache = this.cache,
          method = this.method,
          body = this.body,
          headers = this.headers,
          app = this.app,
          templates = this.templatesPath;

      var options = { cache: cache, params: params, method: method, body: body, headers: headers };
      var config = { app: app, templates: templates };

      return this.PageManager.get(name, options, config);
    }

    // @TODO DRY -> sanitizer lo usa también

  }, {
    key: 'loadPolymerWebComponent',
    value: function loadPolymerWebComponent(name) {
      var path = Array(2).fill(name + '-page').join('/');
      var component = { spec: { path: path + '.html' } };

      return this.ImportManager.loadComponent(component, this.pagesPath);
    }
  }, {
    key: '_handleRouteLoading',
    value: function _handleRouteLoading(route) {
      var _this8 = this;

      if (this.isRoutableComponent(route)) {
        this.createPageFromPolymerWebComponent(route.name).then(function () {
          return _this8.selectPage(route.name, route.params);
        });
      } else {
        this.loadTemplate(route.name, route.params).then(function (response) {
          return _this8.createTemplate(response);
        });
      }
    }
  }, {
    key: 'registerCurrentTemplate',
    value: function registerCurrentTemplate(currentTemplate, previousTemplate) {
      var TEMPLATE_REGISTERED = externalEventsCodes.TEMPLATE_REGISTERED;
      var UI = bindingCodes.UI;

      var options = this;

      this.registerChildren(currentTemplate, options.binding === UI ? 'DM' : null);

      if (previousTemplate && previousTemplate !== currentTemplate) {
        this.unregisterChildren(previousTemplate, options.binding === UI ? 'DM' : null);
      }

      this._updateChannels(previousTemplate, currentTemplate);
      _events2.default.emit(TEMPLATE_REGISTERED, { template: currentTemplate.name });
    }

    // this function MAY BE OVERRIDE on native bridge - not required due to internal router updateing the context

  }, {
    key: '_updateChannels',
    value: function _updateChannels(previousTemplate, currentTemplate) {
      if (this.BridgeChannelManager) {
        var oldName = previousTemplate ? previousTemplate.name : undefined;
        this.BridgeChannelManager.updateAppContext(oldName, currentTemplate.name);
        this.BridgeChannelManager.initPrivateChannel(oldName, currentTemplate.name);
      }
    }
  }, {
    key: 'registerChildren',
    value: function registerChildren(template, type) {
      for (var index = 0; index < template.children.length; index++) {
        var component = template.children[index];
        if (type && type === component.type || !type) {
          this.ComponentConnector.register(component.node, component.connections);
        }
      }
    }
  }, {
    key: 'unregisterChildren',
    value: function unregisterChildren(template, type) {
      for (var index = 0; index < template.children.length; index++) {
        var component = template.children[index];
        if (type && type === component.type || !type) {
          this.ComponentConnector.unregister(component.node);
        }
      }
    }
  }, {
    key: 'registerInConnection',
    value: function registerInConnection(channelName, node, callback) {
      this.ComponentConnector.addSubscription(channelName, node, callback);
    }
  }, {
    key: 'registerOutConnection',
    value: function registerOutConnection(channelName, htmlElement, bindName) {
      this.ComponentConnector.addPublication(channelName, htmlElement, bindName);
    }
  }, {
    key: 'publish',
    value: function publish(channelName, value) {
      this.ComponentConnector.publish(channelName, value);
    }
  }, {
    key: 'navigate',
    value: function navigate(page, params) {
      this.Router.go(page, params);
    }

    // used with createPage (@TODO DELETE) && createPageFromPolymerWebComponent
    // @TODO unificar con selectTemplate

  }, {
    key: 'selectPage',
    value: function selectPage(name, params) {
      var TEMPLATE_REGISTERED = externalEventsCodes.TEMPLATE_REGISTERED;

      var template = this.TemplateManager.get(name);
      var currentTemplate = this.TemplateManager.get(this.TemplateManager.selected);
      var oldTemplateName = currentTemplate ? currentTemplate.name : null;

      // manage of register & unregister channels current
      // this.registerCurrentTemplate(template, currentTemplate);

      // @TODO necessary?
      if (this.onRender) {
        this.onRender(template.node);
      }

      this._handleParams(template.node, params);
      this.TemplateManager.select(name, this.BridgeChannelManager, this.binding);

      if (this.BridgeChannelManager) {
        this.BridgeChannelManager.updateAppContext(oldTemplateName, name);
        this.BridgeChannelManager.initPrivateChannel(oldTemplateName, name);
      }

      _events2.default.emit(TEMPLATE_REGISTERED, { template: name });
    }
  }, {
    key: '_handleParams',
    value: function _handleParams(node, params) {
      var shouldBindParams = node.params && Object.keys(params).length > 0;

      if (shouldBindParams) {
        node.params = params;
      }
    }
  }, {
    key: 'selectTemplate',
    value: function selectTemplate(name) {
      var _this9 = this;

      var isPreRendering = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var TEMPLATE_TRANSITION_END = externalEventsCodes.TEMPLATE_TRANSITION_END;
      var CURRENTVIEW = bindingCodes.CURRENTVIEW,
          UI = bindingCodes.UI,
          DELAYED = bindingCodes.DELAYED;

      var options = this;
      var template = this.TemplateManager.get(name);

      if ((options.binding === CURRENTVIEW || options.binding === UI) && isPreRendering !== true) {
        // COMPROBAR 5 VECES
        var currentTemplate = this.TemplateManager.get(this.TemplateManager.selected);
        var onTemplateAnimationFinishes = function onTemplateAnimationFinishes() {
          return _this9.registerCurrentTemplate(template, currentTemplate);
        };

        if (template.node.animationCompleteEvent) {
          _events2.default.listenToOnce(template.node, template.node.animationCompleteEvent, onTemplateAnimationFinishes);
        } else {
          _events2.default.once(TEMPLATE_TRANSITION_END, onTemplateAnimationFinishes);
        }
      }
      if (options.onRender) {
        if (template.fixedChildren.length > 0) {
          options.onRender(template.node, template.fixedChildren);
        } else {
          options.onRender(template.node);
        }
      }
      // 10. Shows the template created
      if (isPreRendering !== true) {
        var animateTemplate = function animateTemplate() {
          return _this9.TemplateManager.select(name, _this9.BridgeChannelManager, options.binding);
        };

        if (options.binding === DELAYED) {
          this._idleCallback(animateTemplate);
        } else {
          animateTemplate();
        }
      }
    }
  }, {
    key: '_idleCallback',
    value: function _idleCallback(fn) {
      this.BridgeChannelManager.getIdleCallbackChannel().first().subscribe(fn);
    }

    /**
     *
     * It subscribe the main node to an event channel.
     *
     * @param {*} eventName is the name of the event to subscribe
     * @param {*} callback is the function to call when the event channel is activated with a new value
     */

  }, {
    key: 'subscribeToEvent',
    value: function subscribeToEvent(eventName, callback) {
      if (this.externalEvents.indexOf(eventName) < 0) {
        console.warn('Trying to subscribe to a non existing event: ', eventName);
        return;
      }
      if (typeof callback !== 'function') {
        console.warn('You must provide a function callback to subscribe to the event: ', eventName);
        return;
      }
      var mainNode = this.getMainNode();
      this.BridgeChannelManager.subscribeToEvent(mainNode, eventName, callback);
    }
  }, {
    key: 'getMainNode',
    value: function getMainNode() {
      if (!this.__mainNodeElement) {
        this.__mainNodeElement = document.querySelector('#' + this.mainNode);
      }
      return this.__mainNodeElement;
    }
  }, {
    key: '_resetBridgeChannels',
    value: function _resetBridgeChannels() {
      this.BridgeChannelManager.resetBridgeChannels(this.getMainNode());
    }

    /**
     *
     * Performs a logout action. It resets all channels, removes templates from DOM
     * and redirects to the initial page
     *
     */

  }, {
    key: 'logout',
    value: function logout() {
      var _this10 = this;

      var TEMPLATE_REGISTERED = externalEventsCodes.TEMPLATE_REGISTERED;


      if (this.TemplateManager.selected === this.initialTemplate) {
        return;
      }

      var removeTemplates = function removeTemplates() {
        return _this10.TemplateManager.removeTemplates(_this10.initialTemplate, _this10.crossContainerId);
      };
      var removeCrossComponents = function removeCrossComponents() {
        return _this10.TemplateManager.removeTemplateChildrens(_this10.crossContainerId);
      };
      var removeInitialTemplateToForceFreshLoadingAndCCRegistration = function removeInitialTemplateToForceFreshLoadingAndCCRegistration() {
        return _this10.TemplateManager.removeTemplate(_this10.initialTemplate);
      };

      this._resetBridgeChannels();
      removeCrossComponents();
      removeInitialTemplateToForceFreshLoadingAndCCRegistration();
      _events2.default.once(TEMPLATE_REGISTERED, removeTemplates);
      this._addInitialSubscribersToEvents();
      this.Router.init();
      this.Router.go(this.initialTemplate);
    }
  }]);

  return CellsBridge;
}();

exports.default = CellsBridge;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellsBridgeConnector = function () {
  function CellsBridgeConnector() {
    _classCallCheck(this, CellsBridgeConnector);
  }

  _createClass(CellsBridgeConnector, [{
    key: '_get',
    value: function _get(options, format) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        if (!options || !options.url) {
          reject(new Error('URL not defined'));
          return;
        }
        var method = (options.method || '').toUpperCase() || 'GET';
        xhr.addEventListener('load', function (e) {
          var xhr = e.target;
          var status = xhr.status;
          if (status >= 200 && status < 300 || status == 0 && xhr.responseText.length > 0) {
            if (format === 'json') {
              resolve(JSON.parse(xhr.response));
            } else {
              resolve(xhr.responseText);
            }
          } else {
            reject(new Error(xhr.statusText));
          }
        });
        xhr.addEventListener('error', function () {
          reject(new Error('Network Error'));
        });
        xhr.open(method, options.url);
        //
        var headers = options.headers;
        for (var header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }
        xhr.send(options.body);
      });
    }
  }, {
    key: 'getJSON',
    value: function getJSON(options) {
      return this._get(options, 'json');
    }
  }, {
    key: 'getHTML',
    value: function getHTML(options) {
      return this._get(options, 'html');
    }
  }]);

  return CellsBridgeConnector;
}();

exports.default = CellsBridgeConnector;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalEventsCodes = _constants2.default.externalEventsCodes;

/**
 * Class to define core private channels behavior
 */

var ActionChannelManager = function () {
  function ActionChannelManager(bridge) {
    _classCallCheck(this, ActionChannelManager);

    this.bridge = bridge;
    this.PageManager = bridge.PageManager;
    this.ChannelManager = bridge.BridgeChannelManager;
    this.TemplateManager = bridge.TemplateManager;
  }

  _createClass(ActionChannelManager, [{
    key: 'subscribeAll',
    value: function subscribeAll() {
      var _this = this;

      this.ChannelManager.getBridgeChannel('config').subscribe(function (evt) {
        return _this._configSubscriptor(evt);
      });
      this.ChannelManager.getBridgeChannel('locales').subscribe(function (evt) {
        return _this._localesSubscriptor(evt);
      });
      this.ChannelManager.getBridgeChannel('logout').subscribe(function (evt) {
        return _this._logoutSubscriptor(evt);
      });
    }
  }, {
    key: '_isAllowedProperty',
    value: function _isAllowedProperty(prop) {
      return typeof this.bridge[prop] !== 'function';
    }
  }, {
    key: '_configSubscriptor',
    value: function _configSubscriptor(evt) {
      var _this2 = this;

      var TEMPLATE_REGISTERED = externalEventsCodes.TEMPLATE_REGISTERED;

      var selected = this.TemplateManager.selected;

      if (evt.detail) {
        for (var prop in evt.detail) {
          if (this._isAllowedProperty(prop)) {
            this.bridge[prop] = evt.detail[prop];
          }
        }

        if (evt.detail.app || evt.detail.pagesPath) {
          this.PageManager.clear();
          this.TemplateManager.removeTemplates(selected, this.bridge.crossContainerId);
          _events2.default.once(TEMPLATE_REGISTERED, function () {
            return _this2.TemplateManager.removeTemplate(selected);
          });
        }
      }
    }
  }, {
    key: '_localesSubscriptor',
    value: function _localesSubscriptor(evt) {
      if (window.I18nMsg && evt.detail && evt.detail.lang) {
        window.I18nMsg.lang = evt.detail.lang;
      }
    }
  }, {
    key: '_logoutSubscriptor',
    value: function _logoutSubscriptor() {
      this.bridge.logout();
      this.subscribeAll();
    }
  }]);

  return ActionChannelManager;
}();

exports.default = ActionChannelManager;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable = __webpack_require__(0);

__webpack_require__(10);

__webpack_require__(63);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BridgeChannelManager = function () {
  function BridgeChannelManager(bridge) {
    _classCallCheck(this, BridgeChannelManager);

    this.componentConnector = bridge.ComponentConnector;
    this.privateChannels = new Set();
  }

  /**
   * Returns the name of the application context channel.
   */


  _createClass(BridgeChannelManager, [{
    key: 'getAppContextChannelName',
    value: function getAppContextChannelName() {
      return '__bridge_app';
    }

    /**
     * Returns the name of the channels that has cancelations of back navigations.
     */

  }, {
    key: 'getCancelledBackNavigationChannelName',
    value: function getCancelledBackNavigationChannelName() {
      return '__bridge_cancelled_back_navigation';
    }

    /**
     * Returns the prefix for private channels.
     */

  }, {
    key: 'getPrivateChannelPrefix',
    value: function getPrivateChannelPrefix() {
      return '__bridge_page_';
    }

    /**
     * Returns the prefix for event channels.
     */

  }, {
    key: 'getEventChannelPrefix',
    value: function getEventChannelPrefix() {
      return '__bridge_evt_';
    }

    /**
     * Returns the prefix for generic channels.
     */

  }, {
    key: 'getBridgeChannelPrefix',
    value: function getBridgeChannelPrefix() {
      return '__bridge_ch_';
    }

    /**
     * Gets a channel that is for exclusive use of the bridge.
     * If the channel doesn't exist, it creates one channel with.
     *
     * @param name of the channel to retrieve/create
     *
     * @return {Channel}
     *
     */

  }, {
    key: 'getBridgeChannel',
    value: function getBridgeChannel(channelName) {
      return this.componentConnector.manager.get(this.getBridgeChannelPrefix() + channelName);
    }
  }, {
    key: 'getIdleCallbackChannel',
    value: function getIdleCallbackChannel() {
      return _Observable.Observable.create(function (observer) {
        observer.next(true);
      });
    }

    /**
     * Gets the application context channel.
     *
     * @return {Channel}
     */

  }, {
    key: 'getAppContextChannel',
    value: function getAppContextChannel() {
      return this.componentConnector.manager.get(this.getAppContextChannelName());
    }

    /**
     * Gets the cancelled back navigations channel.
     *
     * @return {Channel}
     */

  }, {
    key: 'getCancelledBackNavigationChannel',
    value: function getCancelledBackNavigationChannel() {
      return this.componentConnector.manager.get(this.getCancelledBackNavigationChannelName());
    }

    /**
     * Gets the private channel that corresponds to a page.
     *
     * @param  {String} pageName
     *
     * @return {Channel}
     */

  }, {
    key: 'getPrivate',
    value: function getPrivate(pageName) {
      var newName = this.getPrivateChannelPrefix() + pageName;
      var channel = this.componentConnector.manager.get(newName);
      this.privateChannels.add(newName);
      return channel;
    }

    /**
     * Creates and initializes the application context channel.
     *
     */

  }, {
    key: 'initAppContextChannel',
    value: function initAppContextChannel() {
      this.getAppContextChannel();
    }

    /**
     * Creates and initializes the cancelled back navigation channel.
     *
     */

  }, {
    key: 'initCancelledBackNavigationChannel',
    value: function initCancelledBackNavigationChannel() {
      this.getCancelledBackNavigationChannel();
    }

    /**
     * Initializes the private chanel for the given page.
     *
     * @param {String} pageName
     *
     */

  }, {
    key: 'initPrivateChannel',
    value: function initPrivateChannel(oldPageName, newPageName) {
      // let oldPrivateChannelName;
      // let newPrivateChannelName;
      var channel = void 0;
      var evt = void 0;
      if (oldPageName) {
        // oldPrivateChannelName = this.getPrivateChannelPrefix() + oldPageName;
        // channel = this.componentConnector.manager.get(oldPrivateChannelName);
        channel = this.getPrivate(oldPageName);
        evt = this.componentConnector.createEvent('page-load', false);
        channel.next(evt);
      }
      // newPrivateChannelName = this.getPrivateChannelPrefix() + newPageName;
      // channel = this.componentConnector.manager.get(newPrivateChannelName);
      channel = this.getPrivate(newPageName);
      evt = this.componentConnector.createEvent('page-load', true);
      channel.next(evt);
    }

    /**
     * Updates the application context.
     * Puts in context the information of the current page and previous active page.
     *
     * @param {String} oldPage was the previous current page
     * @param {String} newPage is the page that becomes the current page
     *
     */

  }, {
    key: 'updateAppContext',
    value: function updateAppContext(oldPage, newPage) {
      var evt = this.componentConnector.createEvent('app-context', {
        currentPage: newPage,
        fromPage: oldPage
      });
      this.getAppContextChannel().next(evt);
    }
  }, {
    key: 'publishCancelledBackNavigation',
    value: function publishCancelledBackNavigation(navigation) {
      var evt = this.componentConnector.createEvent('back-nav-cancelled', navigation);
      this.getCancelledBackNavigationChannel().next(evt);
    }

    /**
     * returns true if the given name matches a private channel's name
     *
     * @param {String} name
     *
     * @return {Boolean}
     */

  }, {
    key: 'isPrivateChannel',
    value: function isPrivateChannel(name) {
      return name.indexOf(this.getPrivateChannelPrefix()) === 0;
    }

    /**
     * returns true if there's a private channel with the given name
     *
     * @param {String} name
     *
     * @return {Boolean}
     */

  }, {
    key: 'isActivePrivateChannel',
    value: function isActivePrivateChannel(name) {
      return this.privateChannels.has(name);
    }

    /**
     * resets all channels, including the private channels.
     * It removes all observers and publications.
     *
     */

  }, {
    key: 'resetBridgeChannels',
    value: function resetBridgeChannels(mainNode) {
      var bridgeChannels = Object.keys(this.componentConnector.manager.channels);

      bridgeChannels.forEach(function (chnlName) {
        var chnl = this.componentConnector.manager.get(chnlName);
        chnl.clean();
        chnl.unsubscribeAll();
      }.bind(this));

      this.componentConnector.unregister(mainNode);
    }
  }, {
    key: 'initEventChannels',
    value: function initEventChannels(node, externalEvents) {
      externalEvents.forEach(function (eventName) {
        var prefix = this.getEventChannelPrefix();
        var channelName = prefix + eventName;
        var channel = this.componentConnector.manager.get(channelName);
        var source = _Observable.Observable.fromEvent(node, eventName);
        source.subscribe(function (event) {
          channel.next(event);
        });
      }.bind(this));
    }
  }, {
    key: 'subscribeToEvent',
    value: function subscribeToEvent(node, eventName, callback) {
      var prefix = this.getEventChannelPrefix();
      var channelName = prefix + eventName;
      var subscriptor = this.componentConnector.getSubscriptor(node);
      var channel = this.componentConnector.manager.get(channelName);
      callback.node = node;
      subscriptor.subscribe(channel, callback);
    }
  }]);

  return BridgeChannelManager;
}();

/**
 * BridgeChannelManager definition
 */
exports.default = BridgeChannelManager;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalEventsCodes = _constants2.default.externalEventsCodes;


var _after = function _after(times, func) {
  return function () {
    if (--times < 1) {
      return func();
    }
  };
};

var CellsManagerImport = function () {
  function CellsManagerImport() {
    _classCallCheck(this, CellsManagerImport);
  }

  _createClass(CellsManagerImport, [{
    key: '_importElement',
    value: function _importElement(endPoint, componentPath, callback) {
      var node = document.createElement('link');
      node.rel = 'import';
      node.href = endPoint + componentPath;
      node.onload = callback;
      node.onerror = callback;
      node.setAttribute('async', '');

      document.head.appendChild(node);
    }
  }, {
    key: '_importElementPromise',
    value: function _importElementPromise(endPoint, componentPath) {
      var _this = this;

      return new Promise(function (resolve) {
        _this._importElement(endPoint, componentPath, resolve);
      });
    }
  }, {
    key: 'loadBundleForTemplate',
    value: function loadBundleForTemplate(baseUri, pageName, callback) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var finishComponentLoading = function finishComponentLoading() {
          if (callback) {
            callback.call(_this2);
          }

          resolve();
        };

        _this2._importElement(baseUri, pageName + '.html', finishComponentLoading);
      });
    }
  }, {
    key: 'loadComponent',
    value: function loadComponent(component, baseUri, callback) {
      var _this3 = this;

      var BEFORE_IMPORT = externalEventsCodes.BEFORE_IMPORT,
          AFTER_IMPORT = externalEventsCodes.AFTER_IMPORT;


      return new Promise(function (resolve) {
        var finishComponentLoading = function finishComponentLoading() {
          if (callback) {
            callback.call(_this3);
          }

          resolve();
        };

        var list = component;

        if (!Array.isArray(list)) {
          list = [component];
        }

        if (list.length === 0) {
          finishComponentLoading();
          return;
        }

        _events2.default.emit(BEFORE_IMPORT);

        var iCb = _after(list.length, function () {
          _events2.default.emit(AFTER_IMPORT);
          finishComponentLoading();
        });

        for (var index = 0; index < list.length; index++) {
          var item = list[index];
          _this3._importElement(baseUri, item.spec.path, iCb);
        }
      });
    }
  }, {
    key: 'loadComponentByPriority',
    value: function loadComponentByPriority(component, baseUri, callback) {
      var _this4 = this;

      var BEFORE_IMPORT = externalEventsCodes.BEFORE_IMPORT,
          AFTER_IMPORT = externalEventsCodes.AFTER_IMPORT;


      var list = component;
      if (!Array.isArray(list)) {
        list = [component];
      }

      if (list.length === 0) {
        if (callback) {
          callback.call(this);
        }
        return;
      }

      var priorityLists = this._createPriorityLists(list);

      _events2.default.emit(BEFORE_IMPORT);

      this._chainElementLoading(baseUri, priorityLists, 0).then(function () {
        _events2.default.emit(AFTER_IMPORT);
        if (callback) {
          callback.call(_this4);
        }
      });
    }
  }, {
    key: '_createSortedArratByPriorityAndUniqueElements',
    value: function _createSortedArratByPriorityAndUniqueElements(list) {
      list.sort(function (a, b) {
        var priorityA = a.priority || 1000;
        var priorityB = b.priority || 1000;
        if (priorityA === priorityB) {
          return a.spec.path <= b.spec.path ? -1 : 1;
        } else {
          return priorityA - priorityB;
        }
      });
      return list.filter(function (elem, pos, arr) {
        return pos === 0 || elem.spec.path !== arr[pos - 1].spec.path;
      });
    }
  }, {
    key: '_createPriorityLists',
    value: function _createPriorityLists(list) {
      var sortedList = this._createSortedArratByPriorityAndUniqueElements(list);
      var currentPriority = sortedList[0].priority;
      var priorityLists = [[]];
      var pivote = 0;
      for (var index = 0; index < sortedList.length; index++) {
        var item = sortedList[index];
        if (item.priority === currentPriority) {
          priorityLists[pivote].push(item);
        } else {
          currentPriority = item.priority;
          priorityLists.push([]);
          pivote = priorityLists.length - 1;
          priorityLists[pivote].push(item);
        }
      }
      return priorityLists;
    }
  }, {
    key: '_chainElementLoading',
    value: function _chainElementLoading(baseUri, elementPriorityLists, index) {
      var _this5 = this;

      var currentPromises = [];

      if (elementPriorityLists.length === index) {
        return Promise.resolve();
      }

      for (var j = 0; j < elementPriorityLists[index].length; j++) {
        currentPromises.push(this._importElementPromise(baseUri, elementPriorityLists[index][j].spec.path));
      }

      var count = index + 1; // OJO!!! Si no creamos variable intermedia / scoped, y hacemos count++, siempre cogerá el valor inicial.

      return Promise.all(currentPromises).then(function () {
        return _this5._chainElementLoading(baseUri, elementPriorityLists, count);
      });
    }
  }]);

  return CellsManagerImport;
}();

exports.default = CellsManagerImport;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(41);

var _storage2 = _interopRequireDefault(_storage);

var _connector = __webpack_require__(36);

var _connector2 = _interopRequireDefault(_connector);

var _sanitizer = __webpack_require__(22);

var _sanitizer2 = _interopRequireDefault(_sanitizer);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalEventsCodes = _constants2.default.externalEventsCodes;

/**
 * Class that retrieves pages either from the cache or by fetching them using http requests.
 * This class can handle:
 *  - dynamic pages: the one that are defined in json files.
 *  Also, dynamic pages can be localy located o remotely located.
 *  - static pages: the one that are defined in html files
 *
 * @param {CellsBridge} bridge
 *
 * The constructor receives a CellsBridge that has all the needed configuration:
 *
 * The property 'templatesPath' indicates the path where the local pages are located.
 * It must be defined only if there are local pages.
 *
 * The property 'composerEndpoint' indicates the url where the local pages are located.
 * This url must have the literals '{id}' and '{platform}'. It must be defined only if there are remote pages.
 *
 * The property 'remoteTemplates' is an array that contains the name of the remote templates
 * (just the name, not the extension).
 * It must be defined only if there are remote pages.
 *
  * The property 'htmlPagesPath' is the path to the folder that contains the html pages.
 *
 * The property 'htmlPages' is an array that contains the name of the static html pages
 * (just the name, not the extension).
 *
 * The property 'appId' is the application's id.
 *
 * The property 'getPlatform' is a function, usually defined in the app.js file, that returns
 * a string indicating the platform that runs the application (for instance: destkop, ios or android).
 */

var CellsManagerPage = function () {
  function CellsManagerPage(bridge) {
    _classCallCheck(this, CellsManagerPage);

    this._initCellsPageManager(bridge);
  }

  _createClass(CellsManagerPage, [{
    key: '_initCellsPageManager',
    value: function _initCellsPageManager(bridge) {
      var _bridge$htmlPagesPath = bridge.htmlPagesPath,
          htmlPagesPath = _bridge$htmlPagesPath === undefined ? './pages/' : _bridge$htmlPagesPath,
          htmlPages = bridge.htmlPages,
          templatesPath = bridge.templatesPath,
          composerEndpoint = bridge.composerEndpoint,
          remoteTemplates = bridge.remoteTemplates,
          appId = bridge.appId,
          getPlatform = bridge.getPlatform,
          cache = bridge.cache,
          prefix = bridge.storagePrefix;

      var storage = new _storage2.default({ prefix: prefix, persistent: cache });
      var connector = new _connector2.default();
      var sanitizer = new _sanitizer2.default();

      _extends(this, {
        storage: storage,
        htmlPagesPath: htmlPagesPath,
        htmlPages: htmlPages,
        templatesPath: templatesPath,
        composerEndpoint: composerEndpoint,
        remoteTemplates: remoteTemplates,
        appId: appId,
        getPlatform: getPlatform,
        cache: cache,
        connector: connector,
        sanitizer: sanitizer
      });
    }
  }, {
    key: '_remoteTemplate',
    value: function _remoteTemplate(page) {
      var replaced = this.composerEndpoint.replace(/{appId}/, this.appId);
      if (this.getPlatform) {
        replaced = replaced.replace(/{platform}/, this.getPlatform());
      }
      replaced = replaced.replace(/{page}/, page);
      return replaced;
    }
  }, {
    key: '_localTemplate',
    value: function _localTemplate(page) {
      var endpoint = !this.templatesPath ? this.composerEndpoint : this.templatesPath;

      return '' + endpoint + page + '.json';
    }
  }, {
    key: '_isLocalComposer',
    value: function _isLocalComposer(page) {
      var result = true;
      var hasTemplatePath = this.templatesPath && this.templatesPath.length > 0;
      var hasRemoteTemplates = this.remoteTemplates && this.remoteTemplates.length > 0;
      // legacy case when there was just composerEndpoint and
      // it could be a directory or an url
      var oldWayOnlyCompopserEndpointDefined = this.composerEndpoint && !hasTemplatePath && !hasRemoteTemplates;
      if (oldWayOnlyCompopserEndpointDefined) {
        result = this.composerEndpoint.indexOf('http') !== 0;
      } else {
        if (this.composerEndpoint && this.remoteTemplates) {
          result = this.remoteTemplates.indexOf(page) < 0;
        } else {
          result = true;
        }
      }
      return result;
    }
  }, {
    key: '_renderComposerEndpoint',
    value: function _renderComposerEndpoint(page) {
      if (this._isLocalComposer(page)) {
        return this._localTemplate(page);
      } else {
        return this._remoteTemplate(page);
      }
    }

    /**
     * Returns the url needed to retrieve a page. It handles theese cases:
     *  - page is dynamic (json file) and remote
     *  - page is dynamic (json file) and local
     *  - page is static (html file)
     *
     * @param {String} page is the name of the page to retrieve
     */

  }, {
    key: 'generateRequestUrl',
    value: function generateRequestUrl(page) {
      if (this.htmlPages && this.htmlPages.indexOf(page) >= 0) {
        return this.htmlPagesPath + page + '.html';
      } else {
        return this._renderComposerEndpoint(page);
      }
    }

    /**
     * @param {Object} page
     */
    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'onPageDefinitionNotFound',
    value: function onPageDefinitionNotFound(page) {
      // Overwrite to make something when page definition is not found.
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.storage.clear();
    }

    /**
     * Returns a promise that retrieves a dynamic page (json file).
     * The page may come from the cache or from a http request.
     *
     * @param {String} page name
     * @param {Object} options for http request
     * @param {Object} configuration
     */

  }, {
    key: 'get',
    value: function get(page, options, config) {
      var spec = this.storage.getItem(page);

      if (this.cache && spec) {
        return Promise.resolve(spec);
      } else {
        return this._getFromConnector(page, options, config);
      }
    }
  }, {
    key: '_getFromConnector',
    value: function _getFromConnector(page, options, config) {
      var _this = this;

      var PAGE_REQUEST = externalEventsCodes.PAGE_REQUEST;


      options = options || {};
      options.url = this.generateRequestUrl(page, options, config);

      _events2.default.emit(PAGE_REQUEST, options);

      return this.connector.getJSON(options).then(function (response) {
        return _this._onResponse(page, options, response);
      }).catch(function (error) {
        _this._onResponseFail(page);
        console.error(error);
        return error.message;
      });
    }

    /**
     * Returns a promise that retrieves a static page (html file).
     * The page comes from a http request.
     *
     * @param {String} page name
     * @param {Object} options for http request
     */

  }, {
    key: 'getPage',
    value: function getPage(page, options) {
      var _this2 = this;

      var PAGE_REQUEST = externalEventsCodes.PAGE_REQUEST;


      options = options || {};
      options.url = this.generateRequestUrl(page);

      _events2.default.emit(PAGE_REQUEST, options);

      return this.connector.getHTML(options).then(function (response) {
        return _this2._onResponseHTML(page, options, response);
      }).catch(function (error) {
        _this2._onResponseFail(page);
        console.error(error);
        return error.message;
      });
    }

    //getComponentPage(...)

  }, {
    key: '_onResponse',
    value: function _onResponse(page, options, response) {
      var PAGE_RESPONSE = externalEventsCodes.PAGE_RESPONSE,
          DATA_LOAD = externalEventsCodes.DATA_LOAD;


      response.page = page;

      _events2.default.emit(PAGE_RESPONSE, response);

      var sanitizedData = this.sanitizer.parse(response);
      // sanitizedData = this.bridge.parse('data', sanitizedData);

      this.storage.setItem(page, sanitizedData);

      _events2.default.emit(DATA_LOAD, sanitizedData);

      return sanitizedData;
    }
  }, {
    key: '_onResponseHTML',
    value: function _onResponseHTML(page, options, responseText) {
      var PAGE_RESPONSE = externalEventsCodes.PAGE_RESPONSE,
          DATA_LOAD = externalEventsCodes.DATA_LOAD;


      var response = {
        page: page,
        html: responseText
      };

      _events2.default.emit(PAGE_RESPONSE, response);

      var sanitizedData = {
        page: page,
        currentPage: {},
        template: {},
        components: [],
        pages: [],
        html: responseText
      };

      this.storage.setItem(page, sanitizedData);

      _events2.default.emit(DATA_LOAD, sanitizedData);

      return sanitizedData;
    }
  }, {
    key: '_onResponseFail',
    value: function _onResponseFail(page) {
      if (this.onPageDefinitionNotFound) {
        this.onPageDefinitionNotFound(page);
      }

      return Promise.reject(new Error('Definition file for page \'' + page + '\' not found.'));
    }
  }]);

  return CellsManagerPage;
}();

exports.default = CellsManagerPage;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InMemmoryStorage = function () {
  function InMemmoryStorage() {
    _classCallCheck(this, InMemmoryStorage);

    this.dictionary = {};
  }

  _createClass(InMemmoryStorage, [{
    key: 'getItem',
    value: function getItem(key) {
      return this.dictionary[key] || null;
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      this.dictionary[key] = value;
    }
  }]);

  return InMemmoryStorage;
}();

var CellsStorage = function () {
  function CellsStorage(options) {
    _classCallCheck(this, CellsStorage);

    this.prefix = '';
    this.persistent = false;
    this.internalStorage = new InMemmoryStorage();

    _extends(this, options);

    if (this.persistent) {
      this.clear();
    }
  }

  _createClass(CellsStorage, [{
    key: 'getItem',
    value: function getItem(key) {
      return JSON.parse(this.storage.getItem(this.prefix + key));
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      this.storage.setItem(this.prefix + key, JSON.stringify(value, '', true));
    }
  }, {
    key: 'clear',
    value: function clear() {
      var pattern = new RegExp('^(' + this.prefix + ')');

      for (var key in this.storage) {
        if (pattern.test(key)) {
          this.storage.removeItem(key);
        }
      }
    }
  }, {
    key: 'storage',
    get: function get() {
      var store = void 0;
      if (this.persistent) {
        store = window.localStorage;
      } else {
        store = window.sessionStorage;
      }
      try {
        store.setItem('_$_', {});
      } catch (error) {
        store = this.internalStorage;
      }
      return store;
    }
  }]);

  return CellsStorage;
}();

exports.default = CellsStorage;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cellsSemaasAdapter = __webpack_require__(51);

var _cellsSemaasAdapter2 = _interopRequireDefault(_cellsSemaasAdapter);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

var _dotProp = __webpack_require__(52);

var _dotProp2 = _interopRequireDefault(_dotProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var get = _dotProp2.default.get,
    set = _dotProp2.default.set;
var _Constants$monitoring = _constants2.default.monitoring.SEMAAS,
    mrId = _Constants$monitoring.mrId,
    nameSpace = _Constants$monitoring.nameSpace,
    identifier = _Constants$monitoring.identifier,
    consumerId = _Constants$monitoring.consumerId,
    externalEventsCodes = _constants2.default.externalEventsCodes;

// const flattenObject = (object, separator = '=', join = ', ') => Object.keys(object).map(key => `${key}${separator}${object[key]}`).join(join);

var PAGE_READY = externalEventsCodes.PAGE_READY,
    PARSE_ROUTE = externalEventsCodes.PARSE_ROUTE,
    AFTER_PUBLISH = externalEventsCodes.AFTER_PUBLISH,
    NAV_REQUEST = externalEventsCodes.NAV_REQUEST,
    BEFORE_SET_ATTR_TO_NODE = externalEventsCodes.BEFORE_SET_ATTR_TO_NODE,
    AFTER_SET_ATTR_TO_NODE = externalEventsCodes.AFTER_SET_ATTR_TO_NODE,
    BEFORE_CREATE_NODE = externalEventsCodes.BEFORE_CREATE_NODE,
    AFTER_CREATE_NODE = externalEventsCodes.AFTER_CREATE_NODE,
    BEFORE_IMPORT = externalEventsCodes.BEFORE_IMPORT,
    AFTER_IMPORT = externalEventsCodes.AFTER_IMPORT,
    PAGE_REQUEST = externalEventsCodes.PAGE_REQUEST,
    PAGE_RESPONSE = externalEventsCodes.PAGE_RESPONSE,
    DATA_LOAD = externalEventsCodes.DATA_LOAD,
    TEMPLATE_TRANSITION_END = externalEventsCodes.TEMPLATE_TRANSITION_END,
    TRACK_EVENT = externalEventsCodes.TRACK_EVENT,
    TEMPLATE_REGISTERED = externalEventsCodes.TEMPLATE_REGISTERED,
    ROUTER_BACKSTEP = externalEventsCodes.ROUTER_BACKSTEP,
    LOG_EVENT = externalEventsCodes.LOG_EVENT;

var Monitoring = function () {
  function Monitoring(bridge) {
    _classCallCheck(this, Monitoring);

    this.bridge = null;
    this.application = null;
    var _bridge$semaas = bridge.semaas,
        semaas = _bridge$semaas === undefined ? {} : _bridge$semaas,
        logs = bridge.logs;


    if (logs) {
      var bridgeSemaasConfiguration = this.getBridgeConfiguration(semaas);
      var applicationSemaasConfiguration = this.getApplicationConfiguration(semaas);

      this.bridge = this.initilizeSEMaaSAdapter(bridgeSemaasConfiguration);
      this.application = this.initilizeSEMaaSAdapter(applicationSemaasConfiguration);
    }
  }

  _createClass(Monitoring, [{
    key: 'getBridgeConfiguration',
    value: function getBridgeConfiguration(semaasConfiguration) {
      var environment = semaasConfiguration.environment,
          policy = semaasConfiguration.policy;


      return {
        policy: policy, // configuration object
        mrId: mrId, // bridge constant
        nameSpace: nameSpace, // bridge constant
        identifier: identifier, // bridge constant
        consumerId: consumerId, // bridge constant
        environment: environment // configuration object
      };
    }
  }, {
    key: 'getApplicationConfiguration',
    value: function getApplicationConfiguration(semaasConfiguration) {
      var environment = semaasConfiguration.environment,
          policy = semaasConfiguration.policy,
          mrId = semaasConfiguration.mrId,
          nameSpace = semaasConfiguration.nameSpace,
          consumerId = semaasConfiguration.consumerId;


      return {
        policy: policy, // configuration object
        mrId: mrId, // configuration object
        nameSpace: nameSpace, // configuration object
        identifier: 'application', // configuration object
        consumerId: consumerId, // configuration object
        environment: environment // configuration object
      };
    }
  }, {
    key: 'initilizeSEMaaSAdapter',
    value: function initilizeSEMaaSAdapter(configuration) {
      return new _cellsSemaasAdapter2.default(configuration);
    }
  }, {
    key: 'logBridge',
    value: function logBridge(log) {
      this.bridge.log(log);
    }
  }, {
    key: 'logApplication',
    value: function logApplication(log) {
      this.application.log(log);
    }
  }, {
    key: 'ingest',
    value: function ingest(spans) {
      this.application.ingest(spans);
    }
  }, {
    key: 'createSpan',
    value: function createSpan(data) {
      return this.application && this.application.createSpan(data);
    }
  }, {
    key: 'createUUID',
    value: function createUUID() {
      return this.application && this.application.createUUID();
    }
  }, {
    key: 'hasApplicationLoggingEnabled',
    value: function hasApplicationLoggingEnabled() {
      return !!this.application;
    }
  }, {
    key: 'buildLog',
    value: function buildLog(eventName, data) {
      var detail = data.detail;

      var DEFAULT_LOG = {
        message: 'cells-bridge::' + eventName,
        properties: {}
      };
      var log = _extends({}, detail, DEFAULT_LOG);

      switch (eventName) {
        case PAGE_READY:
          {
            var page = data.page,
                components = data.components;


            log.properties = {
              page: page,
              components: components
            };
            break;
          }
        case PARSE_ROUTE:
          {
            var name = data.name,
                params = data.params,
                pattern = data.pattern;
            //const normalizedParams = flattenObject(params);

            log.properties = {
              route: name,
              //params: normalizedParams,
              params: params,
              pattern: pattern
            };
            break;
          }
        case NAV_REQUEST:
          {
            var event = data.event,
                _detail = data.detail;
            var _page = _detail.page;

            var _params = event.detail;
            //const normalizedParams = flattenObject(params);

            //trace.description = `Page: ${page}, params: ${normalizedParams}`;
            log.properties = {
              page: _page,
              params: _params
            };
            break;
          }
        case PAGE_REQUEST:
          {
            var _params2 = data.params,
                url = data.url;


            log.properties = {
              params: _params2,
              url: url
            };

            break;
          }
        case PAGE_RESPONSE:
          {
            log.properties = _extends({}, data);
            break;
          }
        // Special case.
        // We canalize the log message through the rest of bridge events - as we need to deflate data from channels
        case LOG_EVENT:
          {
            var _detail2 = data.detail,
                _event = data.event;
            var message = _detail2.message,
                properties = _detail2.properties;
            var eventDetail = _event.detail;


            log.message = message;
            log.properties = this.unflattenData(properties, eventDetail); // unflatten(properties, event)
            break;
          }
        case AFTER_PUBLISH:
        case BEFORE_SET_ATTR_TO_NODE:
        case AFTER_SET_ATTR_TO_NODE:
        case BEFORE_CREATE_NODE:
        case AFTER_CREATE_NODE:
        case BEFORE_IMPORT:
        case AFTER_IMPORT:
        case DATA_LOAD:
        case TEMPLATE_TRANSITION_END:
        case TRACK_EVENT:
        case TEMPLATE_REGISTERED:
        case ROUTER_BACKSTEP:
          console.log(eventName + ' - ' + data);
          break;
      }

      return log;
    }
  }, {
    key: 'isBridgeLoggableEvent',
    value: function isBridgeLoggableEvent(eventName) {
      var LOGGABLE_EVENTS = [PAGE_READY, PARSE_ROUTE, NAV_REQUEST, PAGE_REQUEST, PAGE_RESPONSE];

      return LOGGABLE_EVENTS.includes(eventName);
    }
  }, {
    key: 'unflattenData',
    value: function unflattenData(properties, values) {
      var result = {};

      Object.keys(properties).forEach(function (key) {
        var property = properties[key];
        var value = null;

        if (property instanceof Object) {
          var valuePath = property.bind;


          value = get(values, valuePath);
        } else {
          value = property;
        }

        set(result, key, value);
      });

      return result;
    }
  }]);

  return Monitoring;
}();

exports.default = Monitoring;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationStack = function () {
  function NavigationStack() {
    _classCallCheck(this, NavigationStack);

    this.navStack = [];
    this.skipNav = {};
  }

  _createClass(NavigationStack, [{
    key: "addSkipNavigation",
    value: function addSkipNavigation(nav) {
      if (nav.skipHistory === true || nav.skipHistory === false) {
        this.skipNav[nav.from + ":" + nav.to] = nav.skipHistory;
      }
    }
  }, {
    key: "_reverseNavigation",
    value: function _reverseNavigation(nav) {
      return {
        from: nav.to,
        to: nav.from
      };
    }
  }, {
    key: "isSkipNavigation",
    value: function isSkipNavigation(nav) {
      return this.skipNav[nav.from + ":" + nav.to] === true;
    }
  }, {
    key: "lastNavigation",
    value: function lastNavigation() {
      var navCount = this.navStack.length;
      var from = void 0;
      var to = void 0;
      if (navCount === 1) {
        to = this.navStack[0];
      } else if (navCount > 1) {
        to = this.navStack[navCount - 1];
        from = this.navStack[navCount - 2];
      }
      return this.createNavigation(from, to);
    }
  }, {
    key: "createRoute",
    value: function createRoute(page) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return {
        page: page,
        params: params
      };
    }
  }, {
    key: "createNavigation",
    value: function createNavigation(routeFrom, routeTo) {
      return {
        from: routeFrom ? routeFrom.page : undefined,
        to: routeTo ? routeTo.page : undefined
      };
    }
  }, {
    key: "push",
    value: function push(route) {
      if (!this.top() || this.top().page !== route.page) {
        this.navStack.push(route);
      }
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.navStack.pop();
    }
  }, {
    key: "top",
    value: function top() {
      return this.navStack.length > 0 ? this.navStack[this.navStack.length - 1] : undefined;
    }
  }, {
    key: "isBackwardNavigation",
    value: function isBackwardNavigation(newNav) {
      var lastNav = this.lastNavigation();
      return lastNav && newNav.from === lastNav.to && newNav.to === lastNav.from;
    }
  }, {
    key: "update",
    value: function update(routeFrom, routeTo) {
      var nav = this.createNavigation(routeFrom, routeTo);
      if (this.isBackwardNavigation(nav)) {
        while (this.isSkipNavigation(this._reverseNavigation(this.lastNavigation()))) {
          this.pop();
        }
        this.pop();
      } else {
        this.push(routeTo);
      }
      return this.top();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.navStack = [];
    }
  }, {
    key: "replaceRoute",
    value: function replaceRoute(route) {
      if (this.navStack.length > 0) {
        this.navStack[this.navStack.length - 1] = route;
      } else {
        this.push(route);
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this.navStack.length;
    }
  }]);

  return NavigationStack;
}();

exports.default = NavigationStack;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
  // needed to discriminate between 404 and rest of pages with same pattern

  /**
   * @private
   * @param {String} routeName
   * * @param {String} pattern
   * @return {Object}
   */
  function Route(name, pattern) {
    _classCallCheck(this, Route);

    this.name = '';
    this.pattern = '';
    this.regexp = null;
    this.redirectPage = null;
    this.isAccessible = true;

    this.name = name;
    this.pattern = pattern;
    var regexp = pattern.replace(Route.PARAM, '([^/]+)').replace(Route.TRAILING_SLASHES, '/*');
    this.regexp = new RegExp('^' + regexp + '$');
    var parts;
    var keys = [];
    while ((parts = Route.PARAM.exec(pattern)) !== null) {
      keys.push(parts[1]);
    }
    this.keys = keys;
  }

  _createClass(Route, [{
    key: 'path',
    value: function path(params) {
      params = params || {};
      this.params = {};
      var parts;
      var path = this.pattern;
      while ((parts = Route.PARAM.exec(this.pattern)) !== null) {
        path = path.replace(parts[0], params[parts[1]]);
        this.params[parts[1]] = params[parts[1]];
      }
      var queryParams = [];
      for (var param in params) {
        if (!this.params.hasOwnProperty(param)) {
          queryParams.push(param + '=' + encodeURIComponent(params[param]));
        }
      }
      if (queryParams.length) {
        path += '?' + queryParams.join('&');
      }
      return path;
    }
  }, {
    key: 'matchPath',
    value: function matchPath(path) {
      return path.match(this.regexp);
    }
  }, {
    key: 'parsePath',
    value: function parsePath(path) {
      var match = this.matchPath(path);
      this.params = {};
      if (match) {
        var i = 1;
        var parts;
        while ((parts = Route.PARAM.exec(this.pattern)) !== null) {
          this.params[parts[1]] = this._parseParam(match[i]);
          i++;
        }
      }
    }
  }, {
    key: 'parseQuery',
    value: function parseQuery(query) {
      this.query = query;
      for (var queryParam in this.query) {
        this.params[queryParam] = this.query[queryParam];
      }
    }

    /**
     * @return {Boolean}
     */

  }, {
    key: 'is404',
    value: function is404() {
      return this.name === Route._404_PAGE_NAME;
    }

    /**
     * @private
     * @param {String} value
     * @return {Boolean}
     */

  }, {
    key: '_isNumber',
    value: function _isNumber(value) {
      return parseInt(value) + '' === value || parseFloat(value) + '' === value;
    }

    /**
     * @private
     * @param {String} param
     * @return {String|Number}
     */

  }, {
    key: '_parseParam',
    value: function _parseParam(param) {
      if (this._isNumber(param)) {
        param = +param;
      }

      return param;
    }
  }, {
    key: 'handler',
    value: function handler() {
      // Overwrite to make something with the current route
    }
  }]);

  return Route;
}();

Route.PARAM = /(?::([^/]+))/g;
Route.TRAILING_SLASHES = /\/*$/;
Route._404_PAGE_NAME = '404';
exports.default = Route;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _route = __webpack_require__(44);

var _route2 = _interopRequireDefault(_route);

var _Subscription2 = __webpack_require__(4);

var _Observable = __webpack_require__(0);

__webpack_require__(10);

__webpack_require__(61);

__webpack_require__(62);

__webpack_require__(64);

__webpack_require__(65);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _navigationStack = __webpack_require__(43);

var _navigationStack2 = _interopRequireDefault(_navigationStack);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY = _Subscription2.Subscription.EMPTY;
var externalEventsCodes = _constants2.default.externalEventsCodes;


var instance = null;

var _useHistory = false;
var _routes = {};
var _disposables = void 0;
var _currentRoute = void 0;
var _404Route = void 0;

/**
 * @class SerialSubscription
 * Mimics behavior of SerialDisposable in RxJS v4,
 * allows to add only single subscription. If new subscription's added,
 * existing subscription will be unsubscribed.
 *
 * By design of RxJS v5 it is no longer recommended to manage subscription
 * imperatively vis various kind of subscription, reason it only have single
 * kind of composite subscription. This implementation is for interop between
 * existing codebases.
 * @extends {Subscription}
 */

var SerialSubscription = function (_Subscription) {
  _inherits(SerialSubscription, _Subscription);

  function SerialSubscription() {
    _classCallCheck(this, SerialSubscription);

    var _this = _possibleConstructorReturn(this, (SerialSubscription.__proto__ || Object.getPrototypeOf(SerialSubscription)).call(this));

    _this._currentSubscription = EMPTY;
    return _this;
  }

  /**
   * Adds a tear down to be called during the unsubscribe() of this
   * Subscription.
   *
   * If there's existing subscription, it'll be unsubscribed and
   * removed.
   *
   * @param {TeardownLogic} teardown The additional logic to execute on
   * teardown.
   * @return {Subscription} Returns the Subscription used or created to be
   * added to the inner subscriptions list. This Subscription can be used with
   * `remove()` to remove the passed teardown logic from the inner subscriptions
   * list.
   */


  _createClass(SerialSubscription, [{
    key: 'add',
    value: function add(teardown) {
      if (this.closed) return;
      if (typeof teardown === 'function') teardown = new _Subscription2.Subscription(teardown);

      if (this._currentSubscription) {
        this.remove(this._currentSubscription);
        this._currentSubscription.unsubscribe();
        this._currentSubscription = null;
      }

      _get(SerialSubscription.prototype.__proto__ || Object.getPrototypeOf(SerialSubscription.prototype), 'add', this).call(this, this._currentSubscription = teardown);
    }
  }]);

  return SerialSubscription;
}(_Subscription2.Subscription);

var Router = function () {
  function Router() {
    var _this2 = this;

    _classCallCheck(this, Router);

    var TEMPLATE_TRANSITION_END = externalEventsCodes.TEMPLATE_TRANSITION_END;


    if (!instance) {
      instance = this;
    }

    this.navigationStack = this._createNavigationStack();

    _events2.default.on(TEMPLATE_TRANSITION_END, function () {
      _this2.isNavigationInProgress = false;
    });

    return instance;
  }

  _createClass(Router, [{
    key: '_createNavigationStack',
    value: function _createNavigationStack() {
      return new _navigationStack2.default();
    }

    /**
     * @param {Boolean} value
     */

  }, {
    key: 'handler',

    /**
     * @param {Object} route
     */
    // eslint-disable-next-line no-unused-vars
    value: function handler(route) {
      // Overwrite to make something after all matched routes
    }
  }, {
    key: 'addRoute',
    value: function addRoute(name, pattern) {
      this.routes[name] = new _route2.default(name, pattern);
      return this.routes[name];
    }
  }, {
    key: 'addRoutes',
    value: function addRoutes(routes) {
      var __routes = {};
      for (var routeName in routes) {
        __routes[routeName] = this.addRoute(routeName, routes[routeName]);
      }
      return __routes;
    }
  }, {
    key: 'addSkipNavigations',
    value: function addSkipNavigations(skipNavs) {
      for (var i = 0; i < skipNavs.length; i++) {
        this.navigationStack.addSkipNavigation(skipNavs[i]);
      }
    }

    /**
     * @private
     * @return {String}
     */

  }, {
    key: '_getHashPath',
    value: function _getHashPath() {
      return location.hash.replace(Router.HASH_PREFIX, '/').replace(Router.EMPTY, '/');
    }

    /**
     * @private
     * @return {Observable}
     */

  }, {
    key: '_observeHashChange',
    value: function _observeHashChange() {
      return _Observable.Observable.fromEvent(window, 'hashchange').map(this._getHashPath).startWith(this._getHashPath());
    }

    /**
     * @private
     * @return {String}
     */

  }, {
    key: '_getURLPath',
    value: function _getURLPath() {
      return location.pathname.replace(Router.PATH_PREFIX, '/');
    }

    /**
     * @private
     * @return {Observable}
     */

  }, {
    key: '_observeStateChange',
    value: function _observeStateChange() {
      return _Observable.Observable.merge(_Observable.Observable.fromEvent(window, 'popstate'), _Observable.Observable.fromEvent(window, 'pushstate')).map(this._getURLPath).startWith(this._getURLPath());
    }

    /**
     * @private
     * @param {String}
     * @return {Array}
     */

  }, {
    key: 'matchRoute',
    value: function matchRoute(fullPath) {
      var route;

      var _fullPath$split = fullPath.split('?'),
          _fullPath$split2 = _slicedToArray(_fullPath$split, 2),
          path = _fullPath$split2[0],
          query = _fullPath$split2[1];

      query = this._parseQuery(query);
      for (var routeName in this.routes) {
        route = this.routes[routeName];
        if ((!route.is404() || route.isAccessible) && route.matchPath(path)) {
          route.parsePath(path);
          route.parseQuery(query);
          return route;
        }
      }
    }
  }, {
    key: '_parseQuery',
    value: function _parseQuery(querystr) {
      var params = {};
      if (querystr) {
        // Split into key/value pairs
        var queries = querystr.split('&');
        if (queries) {
          // Convert the array of strings into an object
          var key = void 0,
              value = void 0,
              i = void 0,
              len = queries.length;
          for (i = 0; i < len; i++) {
            var _queries$i$split = queries[i].split('=');

            var _queries$i$split2 = _slicedToArray(_queries$i$split, 2);

            key = _queries$i$split2[0];
            value = _queries$i$split2[1];

            params[key] = decodeURIComponent(value);
          }
        }
      }
      return params;
    }
  }, {
    key: '_setup404',
    value: function _setup404() {
      var route404 = this.routes[_route2.default._404_PAGE_NAME];

      // We check if 404 route have a pattern...
      if (route404 && route404.pattern !== '') {
        var routeWithSamePattern = this.getRouteWithPattern(route404.pattern);

        // We set redirect page based on, if it's a repeated URL pattern or a unique one.
        // If it's unique, we set it accesible from the router.
        // Otherwise, it's going to NOT be accesible from the router (multiple router with same pattern)
        route404.redirectPage = routeWithSamePattern ? routeWithSamePattern.name : route404.name;
        route404.isAccessible = !routeWithSamePattern;
      }

      return route404;
    }
  }, {
    key: 'getRouteWithPattern',
    value: function getRouteWithPattern(patternToMath) {
      for (var routeName in this.routes) {
        var route = this.routes[routeName];

        // we only take care about routes with same patterns that aren't the same
        if (!route.is404() && route.pattern === patternToMath) {
          return route;
        }
      }

      return null;
    }

    /**
     *
     * @return {Subscription}
     */

  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      /* istanbul ignore else */
      if (!_disposables) {
        var active = new SerialSubscription();

        _404Route = this._setup404();

        var source = this.useHistory ? this._observeStateChange() : this._observeHashChange();

        var subscription = source.distinctUntilChanged().map(this.matchRoute.bind(this)).forEach(function (route) {
          if (route) {
            var currentRouteName = _this3.currentRoute ? _this3.currentRoute.name : undefined;
            var routeFrom = _this3.navigationStack.createRoute(currentRouteName);
            var routeTo = _this3.navigationStack.createRoute(route.name);
            var newRouteName = _this3.navigationStack.update(routeFrom, routeTo).page;
            if (newRouteName !== routeTo.page) {
              _this3.go(newRouteName, undefined, false);
              return;
            }
            _currentRoute = route;
            var disposable = new _Subscription2.Subscription(function () {
              return _this3.currentRoute;
            });
            active.add(disposable);
            _this3.currentRoute.handler();
            _this3.handler(_this3.currentRoute);
          } else if (_404Route && _404Route.redirectPage) {
            _this3.goReplacing(_404Route.redirectPage);
          }
        });

        _disposables = new _Subscription2.Subscription(subscription, active);
      }

      return _disposables;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (_disposables) {
        _disposables.unsubscribe();
        _disposables = null;
      }
      this.isNavigationInProgress = false;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.stop();
      this.routes = {};
    }
  }, {
    key: 'getPath',
    value: function getPath(routeName, params) {
      var route = this.routes[routeName];
      if (route) {
        return route.path(params);
      } else {
        console.error('Wrong route name: %s, valid route names: %s', routeName, Object.keys(this.routes).join(', '));
      }
    }
  }, {
    key: 'newNavigation',
    value: function newNavigation(name) {
      return {
        'from': this.currentRoute ? this.currentRoute.name : undefined,
        'to': name
      };
    }
  }, {
    key: 'reverseNavigation',
    value: function reverseNavigation(nav) {
      return {
        from: nav.to,
        to: nav.from
      };
    }
  }, {
    key: 'go',
    value: function go(name, params, replace, skipHistory) {
      if (this.isNavigationInProgress) {
        return;
      }

      if (skipHistory !== undefined) {
        var newNav = this.newNavigation(name);
        var reverseNav = this.reverseNavigation(newNav);
        reverseNav.skipHistory = skipHistory;
        this.navigationStack.addSkipNavigation(reverseNav);
      }

      var sanitizedName = name.replace(Router.LTRIM_SLASH, '');
      var path = this.getPath(sanitizedName, params);
      if (path !== this._getHashPath()) {
        this.isNavigationInProgress = true;
        this.updatePathInBrowser(path, replace);
      }
    }
  }, {
    key: 'back',
    value: function back() {
      var navigation = {};
      if (this.navigationStack.length > 1) {
        var fromRoute = this.navigationStack.pop();
        var auxFromRoute = fromRoute;
        var backRoute = this.getLastRoute();

        console.log('back::', fromRoute, backRoute);

        while (this.navigationStack.isSkipNavigation({ from: auxFromRoute.page, to: backRoute.page }) && this.navigationStack.length > 1) {
          auxFromRoute = this.navigationStack.pop();
          if (this.navigationStack.length > 0) {
            backRoute = this.getLastRoute();
          }
        }

        var page = backRoute.page;
        var params = backRoute.params;

        navigation.from = fromRoute;
        navigation.to = backRoute;

        this.go(page, params);
      } else {
        navigation.from = this.getLastRoute();
        navigation.to = this.getLastRoute();
      }
      return navigation;
    }
  }, {
    key: 'updatePathInBrowser',
    value: function updatePathInBrowser(path, replace) {
      if (this.useHistory) {
        if (replace) {
          this.historyReplaceState(path);
        } else {
          this.historyPushState(path);
        }
      } else {
        if (replace) {
          this.locationReplace(path);
        } else {
          this.locationHash(path);
        }
      }
    }
  }, {
    key: 'goReplacing',
    value: function goReplacing(name, params) {
      this.go(name, params, true);
    }
  }, {
    key: 'historyReplaceState',
    value: function historyReplaceState(path) {
      history.replaceState(null, null, path);
    }
  }, {
    key: 'historyPushState',
    value: function historyPushState(path) {
      history.pushState(null, null, path);
    }
  }, {
    key: 'locationReplace',
    value: function locationReplace(path) {
      location.replace('#!' + path);
    }
  }, {
    key: 'locationHash',
    value: function locationHash(path) {
      location.hash = '#!' + path;
    }

    /**
     * Get last route from stack.
     *
     * @returns {Object} Last route from stack.
     */

  }, {
    key: 'getLastRoute',
    value: function getLastRoute() {
      return this.navigationStack.top();
    }

    /**
     * Initialize router stack.
     */

  }, {
    key: 'init',
    value: function init() {
      _currentRoute = undefined;
      this._clearStack();
    }

    /**
     * Clear the router stack.
     */

  }, {
    key: '_clearStack',
    value: function _clearStack() {
      this.navigationStack.clear();
    }
  }, {
    key: 'useHistory',
    set: function set(value) {
      /* istanbul ignore else */
      if (Router.SUPPORTS_HISTORY_API) {
        _useHistory = value;
      }
    },
    get: function get() {
      return _useHistory;
    }
  }, {
    key: 'routes',
    set: function set(routes) {
      _routes = routes;
    },
    get: function get() {
      return _routes;
    }
  }, {
    key: 'currentRoute',
    get: function get() {
      return _currentRoute;
    },
    set: function set(route) {
      _currentRoute = route;
    }
  }]);

  return Router;
}();

Router.SUPPORTS_HISTORY_API = window.history && 'pushState' in window.history;
Router.PARAM = /(?::([^/]+))/g;
Router.LTRIM_SLASH = /^\/(\b)/;
Router.EMPTY = /^$/;
Router.HASH_PREFIX = /^#!?\/*/;
Router.PATH_PREFIX = /^\/*/;
Router.isNavigationInProgress = false;
exports.default = Router;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bridge = __webpack_require__(34);

var _bridge2 = _interopRequireDefault(_bridge);

var _constants = __webpack_require__(1);

var metadata = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TARGETS and BUILD_TARGET are injected through Webpack DefinePlugin,
// BUILD_TARGET import statement is replaced by NormalModuleReplacementPlugin at build time with desireed target.
// Possible values: core, native, polymer.
var TARGET_NAMESPACE = {"native":{"windowExport":"CellsNativeBridge","library":"cellsNative","file":"cells-native-bridge","version":"0.10.5"},"polymer":{"windowExport":"CellsPolymerBridge","library":"cellsPolymer","file":"cells-polymer-bridge","version":"3.4.5"},"core":{"windowExport":"CellsBridge","library":"cells","file":"cells-bridge","version":"1.0.0"}}["polymer"] || {"native":{"windowExport":"CellsNativeBridge","library":"cellsNative","file":"cells-native-bridge","version":"0.10.5"},"polymer":{"windowExport":"CellsPolymerBridge","library":"cellsPolymer","file":"cells-polymer-bridge","version":"3.4.5"},"core":{"windowExport":"CellsBridge","library":"cells","file":"cells-bridge","version":"1.0.0"}}['core'];
var windowExport = TARGET_NAMESPACE.windowExport;

// We expose Bridge to Browsers

window[windowExport] = _bridge2.default;

// We expose Bridge Metadata to Node
module.exports = {
  metadata: metadata
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _componentConnector = __webpack_require__(19);

var _componentConnector2 = _interopRequireDefault(_componentConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _getProperyChangedName = function _getProperyChangedName(name) {
  var propertyName;

  /* istanbul ignore else */
  if (!Polymer.Base._EVENT_CHANGED) {
    Polymer.Base._EVENT_CHANGED = '-changed';
  }
  /* istanbul ignore else */
  if (name.indexOf(Polymer.Base._EVENT_CHANGED, name.length - Polymer.Base._EVENT_CHANGED.length) !== -1) {
    propertyName = name.slice(0, -Polymer.Base._EVENT_CHANGED.length);
    propertyName = Polymer.CaseMap.dashToCamelCase(propertyName);
  }

  return propertyName;
};

// Hell to test:
var _parseActionInEvent = function _parseActionInEvent(evt, targetPath, target) {
  var path;
  var value;

  // Check if event is because of property changed.
  var propertyName = _getProperyChangedName(evt.type);

  if (propertyName && evt.detail && evt.detail.hasOwnProperty('value')) {
    value = evt.detail.value;
    targetPath = targetPath || propertyName;

    if (evt.detail.path) {
      path = evt.detail.path.replace(propertyName, targetPath);
    } else {
      path = targetPath;
    }
  } else {
    path = targetPath;
    value = evt.detail;
  }

  if (target !== undefined && target.is === undefined && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    if (Polymer.Element === undefined) {
      value = JSON.stringify(value);
    } else {
      /* istanbul ignore else */
      if (target instanceof Polymer.Element === false) {
        value = JSON.stringify(value);
      }
    }
  }

  return {
    path: path,
    value: value,
    property: targetPath
  };
};

var CellsPolymerComponentConnector = function (_CellsComponentConnec) {
  _inherits(CellsPolymerComponentConnector, _CellsComponentConnec);

  function CellsPolymerComponentConnector() {
    _classCallCheck(this, CellsPolymerComponentConnector);

    return _possibleConstructorReturn(this, (CellsPolymerComponentConnector.__proto__ || Object.getPrototypeOf(CellsPolymerComponentConnector)).apply(this, arguments));
  }

  _createClass(CellsPolymerComponentConnector, [{
    key: 'wrapCallback',
    value: function wrapCallback(node, bindName) {
      return function (evt) {
        var _idleCallback = function _idleCallback(fn) {
          setTimeout(function () {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(fn);
            } else {
              setTimeout(fn, 1);
            }
          }, 100);
        };

        var checkDispatchActionType = function (mutations, observerObject) {
          /* istanbul ignore else */
          if (this._isPolymerElement(node)) {
            if (typeof bindName === 'function') {
              this._dispatchActionFunction(evt, node, bindName);
            } else {
              if (typeof node[bindName] === 'function') {
                this._dispatchActionFunction(evt, node, bindName);
              } else {
                this._dispatchActionProperty(evt, node, bindName);
              }
            }

            /* istanbul ignore else */
            if (observerObject) {
              observerObject.disconnect();
            }
          } else {
            _idleCallback(checkDispatchActionType);
          }
        }.bind(this);

        if (this._isPolymerElement(node)) {
          checkDispatchActionType();
        } else {
          var observer = new MutationObserver(checkDispatchActionType);
          var config = { attributes: false, childList: true, characterData: true };
          observer.observe(node, config);

          _idleCallback(checkDispatchActionType, 100);
        }
      }.bind(this);
    }

    /**
     * Return the version of Polymer instance if the node is a Polymer element.
     * Return -1 if if the node is not a Polymer element.
     *
     * @param {Element} node
     */

  }, {
    key: '_whichPolymerVersion',
    value: function _whichPolymerVersion(node) {
      var version = -1;
      if (Polymer.Element !== undefined && (node instanceof Polymer.Element || node instanceof Polymer.LegacyElementMixin)) {
        version = 2;
      } else {
        /* istanbul ignore else */
        if (node.__isPolymerInstance__ !== undefined) {
          version = 1;
        }
      }
      return version;
    }

    /**
     * Return true if the node is instance of a Polymer element, otherwise return false.
     *
     * @param {Element} node
     */

  }, {
    key: '_isPolymerElement',
    value: function _isPolymerElement(node) {
      return this._whichPolymerVersion(node) > 0;
    }

    /**
     * Returns true if the event has reached the node that is listening the event
     *
     * @param {Event} event
     */

  }, {
    key: '_isEventAtTarget',
    value: function _isEventAtTarget(event) {
      var atTarget;
      if ( /** For Polymer 2 **/Polymer.Settings.hasShadow === false || /** For Polymer 2 **/Polymer.Settings.useShadow === false) {
        var normalizedEvent = Polymer.dom(event);
        atTarget = normalizedEvent.localTarget === event.currentTarget;
      } else {
        atTarget = _get(CellsPolymerComponentConnector.prototype.__proto__ || Object.getPrototypeOf(CellsPolymerComponentConnector.prototype), '_isEventAtTarget', this).call(this, event);
      }
      return atTarget;
    }
  }, {
    key: '_dispatchActionFunction',
    value: function _dispatchActionFunction(evt, target, method) {
      var propertyName = _getProperyChangedName(evt.type);
      var payload;

      if (propertyName && evt.detail && evt.detail.hasOwnProperty('value')) {
        if (Polymer.dom(evt).rootTarget) {
          payload = Polymer.dom(evt).rootTarget[propertyName];
        } else {
          payload = evt.detail.value;
        }
      } else {
        payload = evt.detail;
      }

      //TODO: Review to see if we actually want to show this warning.
      if (this.bridge && this.bridge.debug && this.bridge.parsePayload && ('' + target[method]).indexOf('.data') > -1) {
        payload = this.bridge.parsePayload(evt.detail);
        console.warn('%c' + target.tagName + '%c is using an incompatible payload data in ' + method, 'background: #ff9800; color: white; padding: 4px 4px 4px 10px', 'background: #ff9800; color: rgba(255,255,255,0.9); padding: 4px 10px 4px 0');
      }

      if (typeof method === 'function') {
        method(payload);
      } else {
        target[method](payload);
      }
    }
  }, {
    key: '_getTargetProperties',
    value: function _getTargetProperties(target) {
      var props = void 0;

      if (target.constructor.config) {
        props = target.constructor.config.properties;
      } else if (target.constructor._properties) {
        props = target.constructor._properties;
      }

      return props;
    }
  }, {
    key: '_dispatchActionProperty',
    value: function _dispatchActionProperty(evt, target, property) {
      var info;
      var data = _parseActionInEvent(evt, property, target);

      //check if target is an instance of Polymer Element to check if is a polymer 2 element
      if (target && target.getPropertyInfo || Polymer.Element !== undefined && target instanceof Polymer.Element === false) {
        if (target.getPropertyInfo) {
          info = target.getPropertyInfo(data.property);
        } else {
          info = this._getTargetProperties(target)[data.property];
        }

        /* istanbul ignore else */
        if (info && info.defined && !info.readOnly && !info.computed) {
          return target.set(data.path, data.value);
        }
      }
      //check if target is an instance of Polymer Element to check if is a polymer 2 element
      if (target && target.getPropertyInfo === undefined || Polymer.Element !== undefined && target instanceof Polymer.Element === false) {
        info = this._getTargetProperties(target) !== undefined ? this._getTargetProperties(target)[data.property] : undefined;

        /* istanbul ignore else */
        if (info && !info.readOnly && !info.computed) {
          return target.set(data.path, data.value);
        }
      }

      // check if target property is a boolean one and current value is false.
      // it expects to remove the attribute (as it's a boolean one)
      if (typeof data.value === 'boolean' && !data.value) {
        return target.removeAttribute(data.path);
      }

      return target.setAttribute(data.path, data.value);
    }
  }, {
    key: 'register',
    value: function register(node, connections) {
      _get(CellsPolymerComponentConnector.prototype.__proto__ || Object.getPrototypeOf(CellsPolymerComponentConnector.prototype), 'register', this).call(this, node, connections);

      if (!node || !connections) {
        return;
      }

      if (node.__isCellsConnected) {
        return;
      }

      /* istanbul ignore else */
      if (connections.in) {
        for (var action in connections.in) {
          /* istanbul ignore else */
          if (this.manager.get(action)._events[0]) {
            /* istanbul ignore else */
            if (connections.ignoreAttr) {
              connections.ignoreAttr.push(connections.in[action].bind);
            } else {
              connections.ignoreAttr = [connections.in[action].bind];
            }
          }
        }
      }

      /* istanbul ignore else */
      if (connections.out) {
        for (var _action in connections.out) {
          var attrName = _getProperyChangedName(connections.out[_action].bind);

          var polymerVersion = this._whichPolymerVersion(node);
          if (polymerVersion === 2) {
            /* istanbul ignore else */
            if (attrName && node.__data && !this.manager.get(_action)._events[0]) {
              /* istanbul ignore else */
              if (node && node._hasReadOnlyEffect) {
                /* istanbul ignore else */
                if (!node._hasReadOnlyEffect(attrName) && !node._hasComputedEffect(attrName)) {
                  var oldValue = node[attrName];
                  node.__data[attrName] = undefined;
                  node[attrName] = oldValue;
                }
              }
            }
          } else {
            /* istanbul ignore else */
            if (attrName && node.__data__ && !this.manager.get(_action)._events[0]) {
              /* istanbul ignore else */
              if (node && node.getPropertyInfo) {
                var info = node.getPropertyInfo(attrName);

                /* istanbul ignore else */
                if (info.defined && !info.readOnly && !info.computed) {
                  var _oldValue = node[attrName];
                  // remove polymer internal current value to trigger model changes
                  node.__data__[attrName] = undefined;
                  node[attrName] = _oldValue;
                }
              }
            }
          }
        }
      }

      node.__isCellsConnected = true;
    }
  }]);

  return CellsPolymerComponentConnector;
}(_componentConnector2.default);

exports.default = CellsPolymerComponentConnector;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

var _resolutionChecker = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolymerComponent = function (_CellsBridgeComponent) {
  _inherits(PolymerComponent, _CellsBridgeComponent);

  function PolymerComponent() {
    _classCallCheck(this, PolymerComponent);

    return _possibleConstructorReturn(this, (PolymerComponent.__proto__ || Object.getPrototypeOf(PolymerComponent)).apply(this, arguments));
  }

  _createClass(PolymerComponent, [{
    key: 'isUnresolved',
    value: function isUnresolved() {
      return (0, _resolutionChecker.isPolymerElementUnresolved)(this.node);
    }
  }]);

  return PolymerComponent;
}(_component2.default);

exports.default = PolymerComponent;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(21);

var _template2 = _interopRequireDefault(_template);

var _template3 = __webpack_require__(50);

var _template4 = _interopRequireDefault(_template3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolymerTemplateManager = function (_CellsManagerTemplate) {
  _inherits(PolymerTemplateManager, _CellsManagerTemplate);

  function PolymerTemplateManager() {
    _classCallCheck(this, PolymerTemplateManager);

    return _possibleConstructorReturn(this, (PolymerTemplateManager.__proto__ || Object.getPrototypeOf(PolymerTemplateManager)).apply(this, arguments));
  }

  _createClass(PolymerTemplateManager, [{
    key: '_createCellsTemplate',
    value: function _createCellsTemplate(name, spec) {
      var cellsTemplate = new _template4.default(spec);
      var cellsTemplateConfig = this._createCellsTemplateConfig(name);

      cellsTemplate.config(cellsTemplateConfig);
      return cellsTemplate;
    }
  }, {
    key: '_createCellsTemplateConfig',
    value: function _createCellsTemplateConfig(name) {
      return {
        name: name,
        template: {
          id: this.parseTemplateId(name),
          name: this.parseTemplateName(name)
        }
      };
    }
  }]);

  return PolymerTemplateManager;
}(_template2.default);

exports.default = PolymerTemplateManager;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(23);

var _template2 = _interopRequireDefault(_template);

var _resolutionChecker = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolymerTemplate = function (_CellsBridgeTemplate) {
  _inherits(PolymerTemplate, _CellsBridgeTemplate);

  function PolymerTemplate() {
    _classCallCheck(this, PolymerTemplate);

    return _possibleConstructorReturn(this, (PolymerTemplate.__proto__ || Object.getPrototypeOf(PolymerTemplate)).apply(this, arguments));
  }

  _createClass(PolymerTemplate, [{
    key: 'isUnresolved',
    value: function isUnresolved() {
      return (0, _resolutionChecker.isPolymerElementUnresolved)(this.node);
    }
  }]);

  return PolymerTemplate;
}(_template2.default);

exports.default = PolymerTemplate;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SEMaaS = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  !function (global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    var inModule = ( false ? "undefined" : _typeof(module)) === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function stop() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  function () {
    return this;
  }() || Function("return this")());

  var SEMAAS_REQUIRED_FIELDS = ['consumerId', 'policy', 'mrId', 'nameSpace', 'environment'];

  var SEMAAS = {
    DEFAULT_ADAPTER_IDENTIFIER: 'application',
    REQUIRED_FIELDS: SEMAAS_REQUIRED_FIELDS,
    ALLOWED_FIELDS: [].concat(SEMAAS_REQUIRED_FIELDS, ['identifier'])
  };

  var RHO = {
    HOST: function HOST(environment) {
      return 'https://rho.' + environment + '.es.platform.bbva.com/v1';
    },
    ALLOWED_FIELDS: ['mrId', 'spanId', 'startDate', 'finishDate', 'name', 'parentSpan', 'traceId', 'properties', 'duration', 'recordDate'],
    REQUIRED_FIELDS: []
  };

  var OMEGA = {
    HOST: function HOST(environment) {
      return 'https://omega.' + environment + '.es.platform.bbva.com/v1';
    },
    DEFAULT_LOG_LEVEL: 'DEBUG',
    ALLOWED_FIELDS: ['mrId', 'spanId', 'traceId', 'creationDate', 'level', 'message', 'properties'],
    MAXIMUM_BULK_SIZE: 1000,
    REQUIRED_FIELDS: []
  };

  var TSEC2JWT = {
    HOST: function HOST(environment) {
      return 'https://tsec2jwt.' + environment + '.global.platform.bbva.com/v1/Token';
    }
  };

  var Constants = {
    SEMAAS: SEMAAS,
    RHO: RHO,
    OMEGA: OMEGA,
    TSEC2JWT: TSEC2JWT
  };

  var sanitizeObj = function sanitizeObj(obj, allowedFields) {
    var result = _extends({}, obj);

    Object.keys(result).forEach(function (prop) {
      if (!allowedFields.includes(prop)) {
        delete result[prop];
      }
    });

    if (result.properties) {
      Object.keys(result.properties).forEach(function (prop) {
        var propValue = result.properties[prop];

        if ((typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) === 'object') {
          result.properties[prop] = JSON.stringify(propValue);
        }
      });
    }

    return result;
  };
  var hasProperty = function hasProperty(obj) {
    return function (field) {
      return Object.prototype.hasOwnProperty.call(obj, field) && !!obj[field];
    };
  };
  var hasProperties = function hasProperties(obj, expectedFields) {
    return expectedFields.every(hasProperty(obj));
  };
  var groupBy = function groupBy(items, value) {
    return items.reduce(function (prev, current) {
      var key = value instanceof Function ? value(current) : current[value];
      var itemsContainingKey = prev.find(function (r) {
        return r && r.key === key;
      });

      if (itemsContainingKey) {
        itemsContainingKey.values.push(current);
      } else {
        prev.push({ key: key, values: [current] });
      }

      return prev;
    }, []);
  };
  var createUUID = function createUUID() {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    var uuid = s.join('');
    return uuid;
  };

  var Utils = {
    sanitizeObj: sanitizeObj,
    hasProperty: hasProperty,
    hasProperties: hasProperties,
    groupBy: groupBy,
    createUUID: createUUID
  };

  var OMEGA$1 = Constants.OMEGA;
  var DEFAULT_LOG_LEVEL = OMEGA$1.DEFAULT_LOG_LEVEL,
      ALLOWED_FIELDS = OMEGA$1.ALLOWED_FIELDS;
  var sanitizeObj$1 = Utils.sanitizeObj;

  var Omega = function () {
    function Omega(mrId) {
      classCallCheck(this, Omega);
      this.mrId = null;

      this.mrId = mrId;
    }

    // @TODO renombrar a normalizeLog? buildLog?
    /*static*/

    createClass(Omega, [{
      key: 'createLog',
      value: function createLog(obj) {
        var mrId = this.mrId;

        var sanitizedData = sanitizeObj$1(obj, ALLOWED_FIELDS);
        var DEFAULT_LOG = {
          mrId: mrId,
          creationDate: Date.now() * 1000000,
          level: DEFAULT_LOG_LEVEL
        };

        return _extends({}, DEFAULT_LOG, sanitizedData);
      }
    }]);
    return Omega;
  }();

  var RHO$1 = Constants.RHO;
  var ALLOWED_FIELDS$1 = RHO$1.ALLOWED_FIELDS;
  var sanitizeObj$2 = Utils.sanitizeObj,
      _createUUID = Utils.createUUID;

  var Span = function () {
    function Span(config) {
      classCallCheck(this, Span);
      this.spanId = null;

      this.initialize(config);
    }

    createClass(Span, [{
      key: 'initialize',
      value: function initialize(config) {
        var _this = this;

        ALLOWED_FIELDS$1.forEach(function (field) {
          if (config[field]) {
            _this[field] = config[field];
          }
        });

        this.spanId = _createUUID();
        this.start();
      }
    }, {
      key: 'start',
      value: function start() {
        this.startDate = Date.now() * 1000000;
      }
    }, {
      key: 'finish',
      value: function finish() {
        this.finishDate = Date.now() * 1000000;
      }
    }]);
    return Span;
  }();

  var Rho = function () {
    function Rho(mrId) {
      classCallCheck(this, Rho);
      this.mrId = null;

      this.mrId = mrId;
    }

    createClass(Rho, [{
      key: 'createUUID',
      value: function createUUID() {
        return _createUUID();
      }
    }, {
      key: 'createSpan',
      value: function createSpan(rawData, childSpanPrefix) {
        var DEFAULT_MR_ID = this.mrId;
        var _rawData$mrId = rawData.mrId,
            mrId = _rawData$mrId === undefined ? DEFAULT_MR_ID : _rawData$mrId,
            parentSpan = rawData.parentSpan;

        var normalizedParentSpan = this.getParentSpan(parentSpan, mrId, childSpanPrefix);
        var data = _extends({}, rawData, {
          mrId: mrId,
          parentSpan: normalizedParentSpan
        });
        var span = new Span(data);

        return span;
      }
    }, {
      key: 'buildSpans',
      value: function buildSpans(data) {
        var iterableData = Array.isArray(data) ? [].concat(toConsumableArray(data)) : [data];

        return iterableData.map(function (item) {
          return sanitizeObj$2(item, ALLOWED_FIELDS$1);
        });
      }
    }, {
      key: 'getParentSpan',
      value: function getParentSpan(parentSpan, mrId, childSpanPrefix) {
        if (!parentSpan) {
          return null;
        }

        return [childSpanPrefix, mrId, 'spans', parentSpan].join('/');
      }
    }]);
    return Rho;
  }();

  var Adapters = {
    Omega: Omega,
    Rho: Rho
  };

  function request(method) {
    var _this = this;

    return function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var url, body, headers, configuration, response, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = options.url, body = options.body, headers = options.headers;
                configuration = {
                  method: method,
                  body: JSON.stringify(body),
                  headers: {
                    'content-type': 'application/json'
                  }
                };


                if (headers) {
                  Object.keys(headers).forEach(function (header) {
                    var headerValue = headers[header];

                    configuration.headers[header] = headerValue;
                  });
                }

                // OJO!!!
                // Interceptar aquí errores
                _context.next = 5;
                return fetch(url, configuration);

              case 5:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', null);

              case 8:
                result = {};
                _context.prev = 9;
                _context.next = 12;
                return response.json();

              case 12:
                result = _context.sent;
                _context.next = 17;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](9);

              case 17:
                return _context.abrupt('return', result);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[9, 15]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  var METHODS = {
    GET: request('get'),
    POST: request('post')
  };

  var Connector = function () {
    function Connector() {
      classCallCheck(this, Connector);
    }

    createClass(Connector, null, [{
      key: 'get',
      value: function () {
        var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, headers) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', METHODS.GET({ url: url, headers: headers }));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function get$$1(_x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return get$$1;
      }()
    }, {
      key: 'post',
      value: function () {
        var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url, body, headers) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', METHODS.POST({ url: url, body: body, headers: headers }));

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function post(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        }

        return post;
      }()
    }]);
    return Connector;
  }();

  /** Default debounce duration (in ms) */
  var DEFAULT_DEBOUNCE_DURATION = 500;

  /** Decorates a class method so that it is debounced by the specified duration */
  function outerDecorator(duration) {
    return function innerDecorator(target, key, descriptor) {
      return {
        configurable: true,
        enumerable: descriptor.enumerable,
        get: function getter() {
          // Attach this function to the instance (not the class)
          Object.defineProperty(this, key, {
            configurable: true,
            enumerable: descriptor.enumerable,
            value: debounce(descriptor.value, duration)
          });

          return this[key];
        }
      };
    };
  }

  /** Debounces the specified function and returns a wrapper function */
  function debounce(method) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_DEBOUNCE_DURATION;

    var timeoutId = void 0;

    function debounceWrapper() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      debounceWrapper.clear();

      timeoutId = setTimeout(function () {
        timeoutId = null;
        method.apply(_this, args);
      }, duration);
    }

    debounceWrapper.clear = function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return debounceWrapper;
  }

  var decorate = function decorate(decorators) {
    return function (obj, prop, descriptor) {
      var fn = descriptor.value;

      decorators.slice().reverse().forEach(function (decorator) {
        return fn = decorator(fn);
      });

      return _extends({}, descriptor, {
        value: fn
      });
    };
  };

  var Decorators = {
    outerDecorator: outerDecorator,
    decorate: decorate
  };

  var groupBy$1 = Utils.groupBy;


  var MAXIMUM_BULK_SIZE = 1000;

  var Queue = function () {

    // maximumBulkSize = null;

    function Queue(identifier) {
      classCallCheck(this, Queue);
      this.items = [];
      this.identifier = null;

      this.identifier = identifier;
    }

    createClass(Queue, [{
      key: 'add',
      value: function add(endpoint, data) {
        var _this = this;

        var iterableData = Array.isArray(data) ? [].concat(toConsumableArray(data)) : [data];

        iterableData.forEach(function (item) {
          var operation = {
            data: item,
            endpoint: endpoint
          };

          _this.items.push(operation);
        });
      }
    }, {
      key: 'dump',
      value: function dump() /*maximumBulkSize*/{
        if (!this.any()) {
          return null;
        }

        var queueGroupedByEndpoint = groupBy$1(this.items, 'endpoint');
        var firstQueueGroup = queueGroupedByEndpoint[0].values;

        var bulk = firstQueueGroup.slice(0, MAXIMUM_BULK_SIZE);
        var newQueue = this.items.filter(function (item) {
          return !bulk.includes(item);
        });

        console.log('Dumping ' + bulk.length + ' items from ' + this.identifier + ' queue (' + this.items.length + ')...');

        this.items = newQueue;

        return bulk;
      }
    }, {
      key: 'any',
      value: function any() {
        return this.items !== null && this.items.length > 0;
      }
    }]);
    return Queue;
  }();

  var _dec, _class;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Omega$1 = Adapters.Omega,
      Rho$1 = Adapters.Rho;
  var _Constants$SEMAAS = Constants.SEMAAS,
      REQUIRED_FIELDS = _Constants$SEMAAS.REQUIRED_FIELDS,
      ALLOWED_FIELDS$2 = _Constants$SEMAAS.ALLOWED_FIELDS,
      DEFAULT_ADAPTER_IDENTIFIER = _Constants$SEMAAS.DEFAULT_ADAPTER_IDENTIFIER,
      OMEGA_HOST = Constants.OMEGA.HOST,
      RHO_HOST = Constants.RHO.HOST,
      TSEC2JWT_HOST = Constants.TSEC2JWT.HOST;
  var hasProperties$1 = Utils.hasProperties;
  var outerDecorator$1 = Decorators.outerDecorator;
  var SEMaaS = (_dec = outerDecorator$1(5000), (_class = function () {

    // properties that belong to semaas life cycle and rely on configurable properties

    // configurable properties by constructor
    function SEMaaS(config) {
      classCallCheck(this, SEMaaS);
      this.nameSpace = null;
      this.identifier = DEFAULT_ADAPTER_IDENTIFIER;
      this.mrId = null;
      this.consumerId = null;
      this.policy = null;
      this.environment = null;
      this.apiKey = null;
      this.omega = null;
      this.rho = null;
      this.queue = null;

      this.setup(config);
    }

    // composition entitys


    createClass(SEMaaS, [{
      key: 'setup',
      value: function setup(config) {
        if (!config || !this.validateConfig(config, REQUIRED_FIELDS)) {
          throw new Error('Invalid setup for SEMaaS adapter (' + this.identifier + '). Required fields: ' + REQUIRED_FIELDS.join(', ') + '.');
        }

        this.initialize(config);
      }
    }, {
      key: 'validateConfig',
      value: function validateConfig(config, expectedFields) {
        return hasProperties$1(config, expectedFields);
      }
    }, {
      key: 'initialize',
      value: function initialize(config) {
        var _this = this;

        ALLOWED_FIELDS$2.forEach(function (field) {
          if (config[field]) {
            _this[field] = config[field];
          }
        });

        var nameSpace = this.nameSpace,
            identifier = this.identifier,
            mrId = this.mrId,
            environment = this.environment;


        this.omega = new Omega$1(mrId);
        this.rho = new Rho$1(mrId);
        this.queue = new Queue(identifier);

        console.info('SEMaaS adapter for ' + environment + ' (' + identifier + ' - ns: ' + nameSpace + ', mrId: ' + mrId + ') successfully initialized.');
      }
    }, {
      key: 'log',
      value: function log(obj) {
        var data = this.omega.createLog(obj);

        this.enqueue(this.omegaEndpoint, data);
      }
    }, {
      key: 'ingest',
      value: function ingest(spans) {
        var data = this.rho.buildSpans(spans);

        this.enqueue(this.rhoEndpoint, data);
      }
    }, {
      key: 'createSpan',
      value: function createSpan(data) {
        var span = this.rho.createSpan(data, this.prefixForChildSpan);

        return span;
      }
    }, {
      key: 'createUUID',
      value: function createUUID() {
        var UUID = this.rho.createUUID();

        return UUID;
      }
    }, {
      key: 'send',
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, body, headers) {
          var result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  result = void 0;
                  _context.prev = 1;
                  _context.next = 4;
                  return Connector.post(url, body, headers);

                case 4:
                  result = _context.sent;
                  _context.next = 9;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](1);

                case 9:

                  if (!result) {
                    console.log('There was a problem while sending data to SEMaaS - operation will be queued.');

                    this.enqueue(url, body);
                  }

                  return _context.abrupt('return', result);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 7]]);
        }));

        function send(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return send;
      }()
    }, {
      key: 'enqueue',
      value: function enqueue(url, body) {
        this.queue.add(url, body);
        this.flush();
      }

      // @decorate([tsec2jwt, outerDecorator(5000)])

    }, {
      key: 'flush',
      value: function () {
        var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          var validApiKey, bulk, endpoint, apiKey, body, headers;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.ensureValidApiKey();

                case 2:
                  validApiKey = _context2.sent;

                  if (validApiKey) {
                    _context2.next = 6;
                    break;
                  }

                  console.log('No valid API Key for SEMaaS adapter (' + this.identifier + ') - aborting operation');
                  return _context2.abrupt('return');

                case 6:
                  bulk = this.queue.dump();

                  if (bulk) {
                    _context2.next = 10;
                    break;
                  }

                  console.log('Empty queue for SEMaaS adapter (' + this.identifier + ')');
                  return _context2.abrupt('return');

                case 10:
                  endpoint = bulk[0].endpoint;
                  apiKey = this.apiKey;


                  console.log('Sending queued batch ' + endpoint + ' - ' + apiKey);

                  body = bulk.map(function (operation) {
                    return operation.data;
                  });
                  headers = { 'Api-Key': 'jwt ' + apiKey };

                  // if bulk send is OK, and there are more items, we try to flush the buffer

                  this.send(endpoint, body, headers).then(function () {
                    return _this2.queue.any() && _this2.flush();
                  });

                case 16:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function flush() {
          return _ref2.apply(this, arguments);
        }

        return flush;
      }()
    }, {
      key: 'ensureValidApiKey',
      value: function () {
        var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.hasApiKey) {
                    _context3.next = 5;
                    break;
                  }

                  console.log('ApiKey OK -> next()');
                  return _context3.abrupt('return', true);

                case 5:
                  if (!this.hasCredentials) {
                    _context3.next = 8;
                    break;
                  }

                  console.log('ApiKey KO, Credentials OK -> getApiKey()');
                  return _context3.abrupt('return', this.getApiKey());

                case 8:

                  console.log('No ApiKey && No Credentials -> KO');
                  return _context3.abrupt('return', false);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function ensureValidApiKey() {
          return _ref3.apply(this, arguments);
        }

        return ensureValidApiKey;
      }()
    }, {
      key: 'getApiKey',
      value: function () {
        var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var consumerId, policy, environment, headers, host, result, accessToken;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  consumerId = this.consumerId, policy = this.policy, environment = this.environment;
                  headers = {
                    'x-consumer-id': consumerId,
                    'x-tsec-token': window.sessionStorage.getItem('tsec'),
                    'x-validation-policy': policy
                  };
                  host = TSEC2JWT_HOST(environment);
                  _context4.next = 5;
                  return Connector.get(host, headers);

                case 5:
                  result = _context4.sent;

                  if (result) {
                    _context4.next = 8;
                    break;
                  }

                  return _context4.abrupt('return', null);

                case 8:
                  accessToken = result.accessToken;


                  this.apiKey = accessToken;
                  return _context4.abrupt('return', accessToken);

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getApiKey() {
          return _ref4.apply(this, arguments);
        }

        return getApiKey;
      }()
    }, {
      key: 'getEnvironmentEndpoint',
      value: function getEnvironmentEndpoint(host) {
        var environment = this.environment;


        return host(environment);
      }
    }, {
      key: 'hasApiKey',
      get: function get$$1() {
        // @TODO añadir lógica recuperación + persistencia sessionStorage jwt
        return !!this.apiKey;
      }
    }, {
      key: 'hasCredentials',
      get: function get$$1() {
        return !!this.consumerId && !!this.policy && !!this.tsec;
      }
    }, {
      key: 'initialized',
      get: function get$$1() {
        return !!this.omega && !!this.rho;
      }
    }, {
      key: 'omegaEndpoint',
      get: function get$$1() {
        var nameSpace = this.nameSpace;

        var host = this.getEnvironmentEndpoint(OMEGA_HOST);

        return host + '/ns/' + nameSpace + '/logs';
      }
    }, {
      key: 'rhoEndpoint',
      get: function get$$1() {
        var nameSpace = this.nameSpace;

        var host = this.getEnvironmentEndpoint(RHO_HOST);

        return host + '/ns/' + this.nameSpace + '/spans';
      }
    }, {
      key: 'prefixForChildSpan',
      get: function get$$1() {
        return 'ns/' + this.nameSpace + '/mrs';
      }
    }, {
      key: 'tsec',
      get: function get$$1() {
        return window.sessionStorage.getItem('tsec');
      }
    }]);
    return SEMaaS;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'flush', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'flush'), _class.prototype)), _class));

  return SEMaaS;

})));
//# sourceMappingURL=cells-semaas-adapter.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(100)(module)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(54);

function getPathSegments(path) {
	const pathArr = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArr.length; i++) {
		let p = pathArr[i];

		while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		parts.push(p);
	}

	return parts;
}

module.exports = {
	get(obj, path, value) {
		if (!isObj(obj) || typeof path !== 'string') {
			return value === undefined ? obj : value;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
				return value;
			}

			obj = obj[pathArr[i]];

			if (obj === undefined || obj === null) {
				// `obj` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `obj` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArr.length - 1) {
					return value;
				}

				break;
			}
		}

		return obj;
	},

	set(obj, path, value) {
		if (!isObj(obj) || typeof path !== 'string') {
			return obj;
		}

		const root = obj;
		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			const p = pathArr[i];

			if (!isObj(obj[p])) {
				obj[p] = {};
			}

			if (i === pathArr.length - 1) {
				obj[p] = value;
			}

			obj = obj[p];
		}

		return root;
	},

	delete(obj, path) {
		if (!isObj(obj) || typeof path !== 'string') {
			return;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			const p = pathArr[i];

			if (i === pathArr.length - 1) {
				delete obj[p];
				return;
			}

			obj = obj[p];

			if (!isObj(obj)) {
				return;
			}
		}
	},

	has(obj, path) {
		if (!isObj(obj) || typeof path !== 'string') {
			return false;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			if (isObj(obj)) {
				if (!(pathArr[i] in obj)) {
					return false;
				}

				obj = obj[pathArr[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(60);
var queue_1 = __webpack_require__(91);
var Subscription_1 = __webpack_require__(4);
var observeOn_1 = __webpack_require__(29);
var ObjectUnsubscribedError_1 = __webpack_require__(16);
var SubjectSubscription_1 = __webpack_require__(27);
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var Subscriber_1 = __webpack_require__(3);
var Subscription_1 = __webpack_require__(4);
var ObjectUnsubscribedError_1 = __webpack_require__(16);
var SubjectSubscription_1 = __webpack_require__(27);
var rxSubscriber_1 = __webpack_require__(15);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var merge_1 = __webpack_require__(74);
Observable_1.Observable.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var distinctUntilChanged_1 = __webpack_require__(76);
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var first_1 = __webpack_require__(77);
Observable_1.Observable.prototype.first = first_1.first;
//# sourceMappingURL=first.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var map_1 = __webpack_require__(78);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var startWith_1 = __webpack_require__(79);
Observable_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var ScalarObservable_1 = __webpack_require__(12);
var EmptyObservable_1 = __webpack_require__(11);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var tryCatch_1 = __webpack_require__(18);
var isFunction_1 = __webpack_require__(17);
var errorObject_1 = __webpack_require__(7);
var Subscription_1 = __webpack_require__(4);
var toString = Object.prototype.toString;
function isNodeStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node.js
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * `fromEvent` accepts as a first argument event target, which is an object with methods
     * for registering event handler functions. As a second argument it takes string that indicates
     * type of event we want to listen for. `fromEvent` supports selected types of event targets,
     * which are described in detail below. If your event target does not match any of the ones listed,
     * you should use {@link fromEventPattern}, which can be used on arbitrary APIs.
     * When it comes to APIs supported by `fromEvent`, their methods for adding and removing event
     * handler functions have different names, but they all accept a string describing event type
     * and function itself, which will be called whenever said event happens.
     *
     * Every time resulting Observable is subscribed, event handler function will be registered
     * to event target on given event type. When that event fires, value
     * passed as a first argument to registered function will be emitted by output Observable.
     * When Observable is unsubscribed, function will be unregistered from event target.
     *
     * Note that if event target calls registered function with more than one argument, second
     * and following arguments will not appear in resulting stream. In order to get access to them,
     * you can pass to `fromEvent` optional project function, which will be called with all arguments
     * passed to event handler. Output Observable will then emit value returned by project function,
     * instead of the usual value.
     *
     * Remember that event targets listed below are checked via duck typing. It means that
     * no matter what kind of object you have and no matter what environment you work in,
     * you can safely use `fromEvent` on that object if it exposes described methods (provided
     * of course they behave as was described above). So for example if Node.js library exposes
     * event target which has the same method names as DOM EventTarget, `fromEvent` is still
     * a good choice.
     *
     * If the API you use is more callback then event handler oriented (subscribed
     * callback function fires only once and thus there is no need to manually
     * unregister it), you should use {@link bindCallback} or {@link bindNodeCallback}
     * instead.
     *
     * `fromEvent` supports following types of event targets:
     *
     * **DOM EventTarget**
     *
     * This is an object with `addEventListener` and `removeEventListener` methods.
     *
     * In the browser, `addEventListener` accepts - apart from event type string and event
     * handler function arguments - optional third parameter, which is either an object or boolean,
     * both used for additional configuration how and when passed function will be called. When
     * `fromEvent` is used with event target of that type, you can provide this values
     * as third parameter as well.
     *
     * **Node.js EventEmitter**
     *
     * An object with `addListener` and `removeListener` methods.
     *
     * **JQuery-style event target**
     *
     * An object with `on` and `off` methods
     *
     * **DOM NodeList**
     *
     * List of DOM Nodes, returned for example by `document.querySelectorAll` or `Node.childNodes`.
     *
     * Although this collection is not event target in itself, `fromEvent` will iterate over all Nodes
     * it contains and install event handler function in every of them. When returned Observable
     * is unsubscribed, function will be removed from all Nodes.
     *
     * **DOM HtmlCollection**
     *
     * Just as in case of NodeList it is a collection of DOM nodes. Here as well event handler function is
     * installed and removed in each of elements.
     *
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console every time a click
     * // occurs on the document.
     *
     *
     * @example <caption>Use addEventListener with capture option</caption>
     * var clicksInDocument = Rx.Observable.fromEvent(document, 'click', true); // note optional configuration parameter
     *                                                                          // which will be passed to addEventListener
     * var clicksInDiv = Rx.Observable.fromEvent(someDivInDocument, 'click');
     *
     * clicksInDocument.subscribe(() => console.log('document'));
     * clicksInDiv.subscribe(() => console.log('div'));
     *
     * // By default events bubble UP in DOM tree, so normally
     * // when we would click on div in document
     * // "div" would be logged first and then "document".
     * // Since we specified optional `capture` option, document
     * // will catch event when it goes DOWN DOM tree, so console
     * // will log "document" and then "div".
     *
     * @see {@link bindCallback}
     * @see {@link bindNodeCallback}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOM EventTarget, Node.js
     * EventEmitter, JQuery-like event target, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(30);
var isArrayLike_1 = __webpack_require__(31);
var isPromise_1 = __webpack_require__(33);
var PromiseObservable_1 = __webpack_require__(70);
var IteratorObservable_1 = __webpack_require__(69);
var ArrayObservable_1 = __webpack_require__(6);
var ArrayLikeObservable_1 = __webpack_require__(66);
var iterator_1 = __webpack_require__(13);
var Observable_1 = __webpack_require__(0);
var observeOn_1 = __webpack_require__(29);
var observable_1 = __webpack_require__(14);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=FromObservable.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(5);
var Observable_1 = __webpack_require__(0);
var iterator_1 = __webpack_require__(13);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
                iterator.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1.iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1.iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1.iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(5);
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isScheduler_1 = __webpack_require__(8);
var of_1 = __webpack_require__(75);
var from_1 = __webpack_require__(72);
var concatAll_1 = __webpack_require__(80);
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from given
 * Observable and then moves on to the next.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * `concat` joins multiple Observables together, by subscribing to them one at a time and
 * merging their results into the output Observable. You can pass either an array of
 * Observables, or put them directly as arguments. Passing an empty array will result
 * in Observable that completes immediately.
 *
 * `concat` will subscribe to first input Observable and emit all its values, without
 * changing or affecting them in any way. When that Observable completes, it will
 * subscribe to then next Observable passed and, again, emit its values. This will be
 * repeated, until the operator runs out of Observables. When last input Observable completes,
 * `concat` will complete as well. At any given moment only one Observable passed to operator
 * emits values. If you would like to emit values from passed Observables concurrently, check out
 * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
 * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
 *
 * Note that if some input Observable never completes, `concat` will also never complete
 * and Observables following the one that did not complete will never be subscribed. On the other
 * hand, if some Observable simply completes immediately after it is subscribed, it will be
 * invisible for `concat`, which will just move on to the next Observable.
 *
 * If any Observable in chain errors, instead of passing control to the next Observable,
 * `concat` will error immediately as well. Observables that would be subscribed after
 * the one that emitted error, never will.
 *
 * If you pass to `concat` the same Observable many times, its stream of values
 * will be "replayed" on every subscription, which means you can repeat given Observable
 * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
 * you can always use {@link repeat}.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = Rx.Observable.concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 *
 * @example <caption>Concatenate an array of 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 *
 * @example <caption>Concatenate the same Observable to repeat it</caption>
 * const timer = Rx.Observable.interval(1000).take(2);
 *
 * Rx.Observable.concat(timer, timer) // concating the same Observable!
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('...and it is done!')
 * );
 *
 * // Logs:
 * // 0 after 1s
 * // 1 after 2s
 * // 0 after 3s
 * // 1 after 4s
 * // "...and it is done!" also after 4s
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} input1 An input Observable to concatenate with others.
 * @param {ObservableInput} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1 || (observables.length === 2 && isScheduler_1.isScheduler(observables[1]))) {
        return from_1.from(observables[0]);
    }
    return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromObservable_1 = __webpack_require__(68);
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromEventObservable_1 = __webpack_require__(67);
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var ArrayObservable_1 = __webpack_require__(6);
var isScheduler_1 = __webpack_require__(8);
var mergeAll_1 = __webpack_require__(28);
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
    }
    return mergeAll_1.mergeAll(concurrent)(new ArrayObservable_1.ArrayObservable(observables, scheduler));
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(6);
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var distinctUntilChanged_1 = __webpack_require__(81);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return distinctUntilChanged_1.distinctUntilChanged(compare, keySelector)(this);
}
exports.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var first_1 = __webpack_require__(82);
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return first_1.first(predicate, resultSelector, defaultValue)(this);
}
exports.first = first;
//# sourceMappingURL=first.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var map_1 = __webpack_require__(83);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return map_1.map(project, thisArg)(this);
}
exports.map = map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var startWith_1 = __webpack_require__(85);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the items you specify as arguments before it begins to emit
 * items emitted by the source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {...T} values - Items you want the modified Observable to emit first.
 * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
 * the emissions of the `next` notifications.
 * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    return startWith_1.startWith.apply(void 0, array)(this);
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeAll_1 = __webpack_require__(28);
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return mergeAll_1.mergeAll(1);
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var tryCatch_1 = __webpack_require__(18);
var errorObject_1 = __webpack_require__(7);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var EmptyError_1 = __webpack_require__(92);
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return function (source) { return source.lift(new FirstOperator(predicate, resultSelector, defaultValue, source)); };
}
exports.first = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=first.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(97);
var OuterSubscriber_1 = __webpack_require__(57);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(6);
var ScalarObservable_1 = __webpack_require__(12);
var EmptyObservable_1 = __webpack_require__(11);
var concat_1 = __webpack_require__(71);
var isScheduler_1 = __webpack_require__(8);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the items you specify as arguments before it begins to emit
 * items emitted by the source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {...T} values - Items you want the modified Observable to emit first.
 * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
 * the emissions of the `next` notifications.
 * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1) {
            return concat_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), source);
        }
        else if (len > 1) {
            return concat_1.concat(new ArrayObservable_1.ArrayObservable(array, scheduler), source);
        }
        else {
            return concat_1.concat(new EmptyObservable_1.EmptyObservable(scheduler), source);
        }
    };
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(4);
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(5);
var Action_1 = __webpack_require__(86);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(59);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__(87);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__(88);
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var QueueAction_1 = __webpack_require__(89);
var QueueScheduler_1 = __webpack_require__(90);
/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=queue.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = (function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return EmptyError;
}(Error));
exports.EmptyError = EmptyError;
//# sourceMappingURL=EmptyError.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function identity(x) {
    return x;
}
exports.identity = identity;
//# sourceMappingURL=identity.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(95);
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var isArrayLike_1 = __webpack_require__(31);
var isPromise_1 = __webpack_require__(33);
var isObject_1 = __webpack_require__(32);
var Observable_1 = __webpack_require__(0);
var iterator_1 = __webpack_require__(13);
var InnerSubscriber_1 = __webpack_require__(55);
var observable_1 = __webpack_require__(14);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(3);
var rxSubscriber_1 = __webpack_require__(15);
var Observer_1 = __webpack_require__(26);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=cells-polymer-bridge.js.map