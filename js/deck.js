/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);

	var App = Lfin.App;
	(function(){
	  var Areas = App.areas = {
	    index: function(me, evts){
	    }
	  }

	  var name;
	  var dashboard = __webpack_require__(2);
	  for (var name in dashboard) {
	    Areas[name] = dashboard[name];
	  }

	  Areas.setting = __webpack_require__(12);

	  var hasTimelines = false;
	  try {
	    hasTimelines = localStorage.getItem('timelines').length > 0;
	  } catch(e) {}

	  App.config('contentBody', hasTimelines ? 'deck' : 'intro');
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Lfin"] = factory();
		else
			root["Lfin"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "../dist";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		/*
		* Lfin is lightweight fullstack framework for SPA
		*
		* @namespace Lfin
		*/
		var Lfin = {};
		
		Lfin.Core  = __webpack_require__(1);
		Lfin.View  = __webpack_require__(2);
		Lfin.TemplateView  = __webpack_require__(4);
		Lfin.ListView  = __webpack_require__(5);
		Lfin.FormView  = __webpack_require__(6);
		Lfin.AreaView  = __webpack_require__(7);
		Lfin.App   = __webpack_require__(8);
		Lfin.Http = __webpack_require__(3);
		Lfin.MemoryCache = __webpack_require__(9);
		Lfin.Model = __webpack_require__(10);
		
		module.exports = Lfin;


	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		'use strict';
		/**
		* Core
		*
		* @class
		* @memberOf Lfin
		* @constructor
		*/
		function Core(){
		  this.__obsrvs = {};
		}
		
		/**
		 * Define properties easily
		 *
		 * @param {string} name - property name
		 * @param {(object|function)} mapOrGetter - function map or getter function
		 * @param {function} [setter] - setter function (when 1st argument is getter)
		 * @example
		 * foo.prop('age', {
		 *   get: function(){
		 *     return this._age;
		 *   },
		 *   set: function(val){
		 *     this._age = value;
		 *   }
		 * })
		 * @example
		 * foo.prop('age', function(){
		 *   return this._age;
		 * }, function(val){
		 *   this._age = value;
		 * })
		 */
		Core.prototype.prop = function(name, mapOrGetter, setter){
		  var params;
		  if (this._isFunc(getter)) {
		    params = { get: getter };
		    if (this._isFunc(setter)) params.set = setter;
		  } else {
		    params = getter;
		  }
		  Object.defineProperty(this, name, params);
		},
		
		/**
		 * Watch a message
		 *
		 * @param {string} name - message name
		 * @param {function} handler - handler called on message received
		 */
		Core.prototype.watch = function(name, handler){
		  if (!handler) {
		    for (var key in name) {
		      var val = name[key];
		      this._watch(key, val);
		    }
		  } else {
		    this._watch(name, handler);
		  }
		}
		
		/**
		 * Unwatch a message
		 *
		 * @param {string} name - message name
		 * @param {function} handler - handler registered
		 */
		Core.prototype.unwatch = function(name, handler){
		  if (name in this.__obsrvs) {
		    var handlers = this.__obsrvs[name];
		    var idx = handlers.indexOf(handler);
		    if (idx === -1) return;
		    handlers.splice(idx, 1);
		  }
		}
		
		/**
		 * Cast a message
		 *
		 * @param {string} name - message name
		 * @param {*} ctx - passing value
		 */
		Core.prototype.cast = function(name, ctx) {
		  if (!(name in this.__obsrvs)) return;
		  var me = this;
		  me.__obsrvs[name].forEach(function(handler){
		    handler.call(me, ctx);
		  });
		}
		
		Core.prototype._watch = function(name, handler) {
		  if (name in this.__obsrvs) {
		    this.__obsrvs[name].push(handler);
		  } else {
		    this.__obsrvs[name] = [handler];
		  }
		}
		
		Core.prototype._callR = function(args, cName, fName, pName) {
		  var t = pName ? this[pName] : this;
		  if (t) t = t[fName];
		  if (t) t.apply(this, args);
		
		  var children = this[cName];
		  if (!children) return;
		
		  for (var name in children){
		    var c = children[name];
		    if (c._callR) c._callR(args, cName, fName, pName);
		  }
		}
		Core.prototype._clone = function(value) {
		  function __clone(obj){
		    if (null == obj || 'object' !== typeof obj) return obj;
		    var copy = obj.constructor();
		    for (var attr in obj) {
		      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		    }
		    return copy;
		  }
		  return __clone(value);
		}
		Core.prototype._default = function(target, field, value) {
		  var r = target || {};
		  if (!(field in r)) r[field] = value;
		  return r;
		}
		Core.prototype._isStr = function(v) {
		  return (typeof v === 'string')
		}
		Core.prototype._isFunc = function(f) {
		  return (typeof f === 'function')
		}
		
		module.exports = Core;


	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var Core = __webpack_require__(1);
		var Http = __webpack_require__(3);
		
		/**
		* View
		*
		* @class
		* @memberOf Lfin
		* @constructor
		* @extends Lfin.Core
		* @param {(string|Element)} root - Root element ID or root node
		* @param {object} [props] - Properties
		* @param {function} [init] - Initializer
		*/
		function View(root, props, init){
		  var me = this;
		
		  Core.call(me);
		
		  me.__bindedEvents = [];
		  me.embeddable = false;
		  me.isView = true;
		  me.views = {};
		  me.states = {};
		  me.load = function(done){ done() };
		
		  if (root) {
		    if (me._isStr(root)) {
		      me.id = root;
		      me.el = me._el(root);
		      if (!me.el) {
		        throw new Error('Failed to create View because element not found ID:' + me.id);
		      }
		    } else if (root) {
		      me.el = root;
		      me.id = root.id;
		    } else {
		      if (!me.el) {
		        throw new Error('Failed to create View because element not specified');
		      }
		    }
		
		    if (jQuery) me.$el = jQuery(me.el);
		  }
		
		  var defaultData = null;
		  if (props) {
		    defaultData = props.data;
		    if (defaultData) delete props.data;
		
		    for (var key in props) {
		      me[key] = props[key];
		    }
		  }
		
		  if (init) {
		    var evts = {};
		    init.call(me, me, evts);
		    me._initEvents(evts);
		  }
		
		  if (defaultData) me.data = defaultData;
		}
		
		/**
		* Create a sub class of View
		*
		* @static
		* @param {function} init - Initializer
		* @example
		* ```
		* var SubClassView = Lfin.View.extend(function(me, evts){});
		* var instance = new SubClassView(root, props);
		* ```
		*/
		View.extend = function(initializer){
		  function SubView(root, props){
		    View.call(this, root, props, initializer);
		  }
		  SubView.prototype = Object.create(this.prototype);
		  return SubView;
		}
		
		/**
		 * data to elements text or value, innerHTML of elements
		 *
		 * @property {object} data
		 * @example
		 * view.data = { name: 'Mike', inputAge: { value: 24 }, message: { html: "<p>Hello!</p>" } };
		 */
		View.prototype = Object.create(Core.prototype, {
		  data: {
		    get: function(){
		      if (this._data == null) return null;
		      if (typeof this._data === 'object') {
		        var d = this._clone(this._data);
		        for (var key in this.views) {
		          var val = this.views[key]
		          if (val) d[key] = val.data;
		        }
		        return d;
		      } else {
		        return this._data;
		      }
		    },
		    set: function(value){
		      this._data = value;
		      this._render(value);
		    },
		    enumerable: true,
		    configurable: false
		  }
		});
		
		View.prototype.constructor = View;
		
		/**
		 * Root element ID
		 * @member {string}
		 */
		View.prototype.id = {};
		
		/**
		 * Root element
		 * @member {Node}
		 */
		View.prototype.el = {};
		
		/**
		 * views children of view
		 * @member {object}
		 */
		View.prototype.views = {};
		
		/**
		 * states of view
		 * @member {object}
		 * @property {function} _key_ state name fired function on set state
		 */
		View.prototype.states = {};
		
		/**
		 * Set state of view
		 *
		 * @param {string} name - state name
		 * @example
		 * view.setState('loggedIn');
		 */
		View.prototype.setState = function(name){
		  this.states[name].call(this, this.data);
		}
		
		/**
		 * Shortcut method to call 'querySelector' from root element
		 *
		 * @param selector selector
		 * @example
		 * view.findEl('#childElementId');
		 * view.findEl('.childElementClass');
		 */
		View.prototype.findEl = function(selector){
		  return this.el.querySelector(selector);
		}
		
		/**
		 * Add child view
		 *
		 * @param name {string} child name
		 * @param view {View} child view
		 * @example
		 * view.add('child', view);
		 */
		View.prototype.add = function(name, view){
		  var me = this;
		  me.views[name] = view;
		  view.load(function(){
		    me.el.appendChild(view.el);
		  });
		}
		
		/**
		 * Fire event
		 *
		 * @param name {string} event name
		 * @param context {object} event context
		 * @example
		 * view.fire('move', { newPosition: 1 });
		 */
		View.prototype.fire = function(name, ctx){
		  var e = ctx ? new CustomEvent(name, { detail: ctx, bubbles: true })
		              : new Event(name, { bubbles: true });
		  this.el.dispatchEvent(e);
		}
		
		View.prototype._render = function(data){
		  this._embed(data);
		  this._expand(data);
		}
		
		View.prototype._expand = function(data){
		  for (var name in data) {
		    var val = data[name];
		
		    if (name in this.views) {
		      this.views[name].data = val;
		      continue;
		    }
		
		    var el = this._el(name);
		    if (!el) continue;
		
		    if (val instanceof Object) {
		      for (var key in val) {
		        var fieldVal = val[key];
		        if (key === 'html') {
		          el.innerHTML = fieldVal;
		        } else if (key === 'value') {
		          el.value = fieldVal;
		        } else {
		          el.textContent = fieldVal;
		        }
		      }
		    } else {
		      el.textContent = val;
		    }
		  }
		}
		
		View.prototype._embed = function(data){
		  if (this.embeddable && !this.__embedded) {
		    this._walkForReplacingEmbed(this.el, data);
		    this.__embedded = true;
		    return true;
		  }
		  return false;
		}
		View.prototype._replaceTextEmbed = function(text, data){
		  var me = this;
		  if (!me._isStr(text)) return text;
		  return text.replace(/\{\{(.*?)\}\}/g, function(all, field){
		    return me._embedData(field, data);
		  });
		}
		View.prototype._replaceURLEmbed = function(url, data){
		  var me = this, abs = null, founds = 0;
		  var newUrl = decodeURIComponent(url);
		  newUrl = newUrl.replace(/\{\{(.*?)\}\}/g, function(all, field, offset){
		    var val = me._embedData(field, data);
		    if (val.length > 9 && val.lastIndexOf('//', 9) > -1) {
		      abs = offset; // http:// or //domain
		    } else if (!val) {
		      abs = newUrl.length; // remove absurl if empty
		    }
		    founds++;
		    return val;
		  });
		  if (founds === 0) return null;
		  return (abs != null) ? newUrl.substr(abs) : newUrl;
		}
		View.prototype._embedData = function(field, data){
		  if (!field) return data != null ? data : "";
		
		  var d = data, fs = field.split('.');
		  fs.forEach(function(attr){
		      if (d === undefined) return;
		      d = d[attr];
		    });
		  return d != null ? d : "";
		}
		View.prototype._walkForReplacingEmbed = function(node, data){
		  var me = this;
		
		  if (node.nodeType === Node.TEXT_NODE) {
		    node.nodeValue = me._replaceTextEmbed(node.nodeValue, data);
		    return;
		  }
		
		  if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE ||
		      node.nodeType === Node.COMMENT_NODE) return;
		
		  ['id', 'name', 'value', 'className', 'alt'].forEach(function(attr){
		    if (node[attr]) {
		      node[attr] = me._replaceTextEmbed(node[attr], data);
		    }
		  });
		
		  ['href', 'src'].forEach(function(attr){
		    if (node[attr]) {
		      var newval = me._replaceTextEmbed(node.getAttribute(attr), data);
		      if (newval != null) node.setAttribute(attr, newval);
		    }
		  });
		
		  var c = node.childNodes;
		  if (c) {
		    for (var i = 0, len = c.length; i < len; i++) {
		      me._walkForReplacingEmbed(c[i], data);
		    }
		  }
		
		  return node;
		}
		View.prototype._el = function(id){
		  return document.getElementById(id);
		}
		View.prototype._bind = function(el, type, handler){
		  if (type === 'click' || type === 'submit') {
		    el['on'+type] = handler;
		  } else {
		    el.addEventListener(type, handler);
		  }
		  this.__bindedEvents.push([el, type, handler]);
		}
		View.prototype._initEvents = function(handlers){
		  for (var hname in handlers) {
		    var pos = hname.lastIndexOf('_');
		    if (pos == -1) {
		      this._bind(this.el, hname, handlers[hname]);
		      continue;
		    }
		
		    var id = hname.substr(0, pos);
		    var en = hname.substr(pos + 1);
		    this._bind(this._el(id), en, handlers[hname]);
		  }
		}
		View.prototype._loadHtml = function(url, cb){
		  return new Http().get(url)
		    .then(function(res){
		      var docf = document.createElement('div');
		      docf.innerHTML = res.body;
		      cb(docf);
		    });
		}
		View.prototype._firstElement = function(el){
		  var fec = el.firstElementChild;
		  if (fec !== undefined) return fec;
		
		  // for Safari, Edge
		  var nodes = el.childNodes;
		  for (var i = 0, len = nodes.length; i < len; i++) {
		    var child = nodes[i];
		    if (child.nodeType === Node.ELEMENT_NODE) return child;
		  }
		  return null;
		}
		View.prototype._destroy = function(){
		  for (var name in this.views) {
		    var cvw = this.views[name];
		    cvw._destroy();
		  }
		  this.views = {};
		
		  this.__bindedEvents.forEach(function(be) {
		    var type = be[1];
		    if (type === 'click' || type === 'submit') {
		      be[0]['on'+type] = null;
		    } else {
		      be[0].removeEventListener(type, be[2]);
		    }
		  });
		  this.__bindedEvents = [];
		}
		
		var __incrLfinId = 0;
		View.prototype._getLfinId = function(){
		  return "_Lfin_" + __incrLfinId++;
		}
		
		module.exports = View;


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		'use strict';
		
		
		function httpReq(method, path, headers, query, body) {
		  function formatParams(params){
		    return Object.keys(params).map(function(key){
		          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
		        }).join("&");
		  }
		
		  var reqBody, header = headers || {};
		
		  if (body) {
		    var contentType = header['Content-Type'];
		    if (contentType.match(/\/form-data/)) {
		      reqBody = new FormData();
		      for (var field in body) {
		        reqBody.append(field, body[field]);
		      }
		    } else if (contentType.match(/\/json/)) {
		      reqBody = JSON.stringify(body);
		    } else {
		      reqBody = formatParams(body);
		    }
		  } else {
		    reqBody = undefined;
		  }
		
		  var url = path;
		  if (query) url += '?' + formatParams(query);
		
		  return new Promise(function(resolve, reject){
		      var xhr = new XMLHttpRequest();
		      xhr.open(method, url, true);
		
		      for (var name in header) {
		        xhr.setRequestHeader(name, header[name]);
		      }
		
		      xhr.onload = function(evt) {
		        var resBody, resCttType = this.getResponseHeader('Content-Type');
		        if (resCttType.match(/\/json/)) {
		          resBody = JSON.parse(this.response);
		        } else if (resCttType.match(/\/form/)) {
		          resBody = {};
		          this.response.split('&').forEach(function(item){
		            var s = item.split('=');
		            resBody[s[0]] = decodeURIComponent(s[1]);
		          });
		        } else {
		          resBody = this.response;
		        }
		
		        resolve({
		          status: this.status,
		          headers: this.getAllResponseHeaders(),
		          body: resBody
		        });
		      }
		
		      xhr.onabort = function(err){ reject('abort') };
		      xhr.onerror = function(err){ reject('error') };
		      xhr.ontimeout = function(err){ reject('timeout') };
		
		      xhr.send(reqBody);
		    });
		}
		
		/**
		 * Http Error
		 */
		function HttpError(req, resOrErr) {
		  this.req = req;
		
		  if (typeof resOrErr === 'string') {
		    this.res = null;
		
		    this.isTimeout = (resOrErrType === 'timeout');
		    this.isAborted = (resOrErrType === 'abort');
		    this.isNetworkError = (resOrErrType === 'error');
		  } else {
		    this.res = resOrErr;
		
		    var code = this.res.status;
		    this.isBadRequest   = (code === 400);
		    this.isForbidden    = (code === 403);
		    this.isUnauthorized = (code === 401);
		    this.isNotFound     = (code === 404);
		    this.isConflict     = (code === 409);
		    this.isServerError  = (code >= 500);
		  }
		}
		
		/**
		 * HTTP Client
		 *
		 * @class Http
		 * @memberOf Lfin
		 */
		function Http(opts) {
		  var me = this, opt = opts || {};
		
		  me.afterError = function(){};
		  me.authorize = function(){} || opt.authorize;
		  me.unauthorized = opt.unauthorized || null;
		
		  me.exec = function(method, path, query, body, headers) {
		    opt.headers = headers || {};
		    me.authorize(opt.headers, query, body);
		
		    var req = {
		      method: method,
		      path: path,
		      headers: headers
		    };
		
		    return httpReq(method, path, headers, query, body)
		      .then(function(res){
		        var stCode = res.status;
		
		        if (stCode < 400) {
		          return res;
		        }
		
		        var httpErr = new HttpError(req, res);
		
		        if (stCode === 401 && me.unauthorized != null) {
		          me.unauthorized(httpErr);
		          return;
		        }
		
		        return Promise.reject(httpErr);
		      })
		      .catch(function(errType){
		        return Promise.reject(new HttpError(req, errType));
		      });
		  }
		
		  me.get = function(path, query, headers) {
		    return me.exec('GET', path, query, null, headers);
		  }
		
		  me.post = function(path, query, bodyType, body, headers) {
		    var head = headers || {};
		    if (!('Content-Type' in head)) {
		      head['Content-Type'] = bodyType || 'application/json;charset=UTF-8';
		    }
		    return me.exec('POST', path, query, body, head);
		  }
		
		  me.put = function(path, query, bodyType, body, headers) {
		    var head = headers || {};
		    if (!('Content-Type' in head)) {
		      head['Content-Type'] = bodyType || 'application/json;charset=UTF-8';
		    }
		    return me.exec('PUT', path, query, body, head);
		  }
		
		  me.del = function(path, query, headers) {
		    return me.exec('DELETE', path, query, null, headers);
		  }
		}
		
		module.exports = Http;


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var View = __webpack_require__(2);
		
		/**
		* Template View
		*
		* @class
		* @memberof Lfin
		* @constructor
		* @extends Lfin.View
		* @param {(string|Node)} idOrNodeOrURL Template ID or Node or HTML file URL
		* @param {object} [props] - Properties
		* @param {function} [init] - Initializer
		* @example
		* var instance = new Lfin.TemplateView('tmplID', { name: 'foo' }, function(me, evts){});
		*/
		function TemplateView(idOrNodeOrURL, props, init){
		  var me = this;
		  me._loadTmpl(idOrNodeOrURL, function(tmpl){
		      var df = document.importNode(tmpl, true);
		      me.__embedded = false;
		      props = me._default(props, 'embeddable', true);
		      View.call(me, me._firstElement(df), props, init);
		    });
		}
		
		/**
		* Create a sub class of TemplateView
		*
		* @static
		* @param {(string|Node)} idOrNodeOrURL - Template ID or Node or HTML file URL
		* @param {function} [init] - Initializer
		* @example
		* var SubTemplateViewA = Lfin.TemplateView.extend('tmplID', function(me, evts){});
		* var SubTemplateViewB = Lfin.TemplateView.extend('template-item.html');
		*/
		TemplateView.extend = function(idOrNodeOrURL, init){
		  function SubTemplateView(props){
		    TemplateView.call(this, idOrNodeOrURL, props, init);
		  }
		  SubTemplateView.prototype = Object.create(this.prototype);
		  SubTemplateView.prototype._loadTmpl(idOrNodeOrURL, function(){});
		  return SubTemplateView;
		}
		
		TemplateView.prototype = Object.create(View.prototype);
		TemplateView.prototype.constructor = TemplateView;
		TemplateView.prototype._render = function(data){
		  if (this._embed(data)) {
		    this._bindEvts(this.el);
		  }
		  this._expand(data);
		}
		TemplateView.prototype._loadTmpl = function(tmplId, cb){
		  if (this._tmpl == null) {
		    var me = this;
		    if (tmplId instanceof Node) {
		      me._tmpl = tmplId.content;
		    } else if (tmplId.indexOf('.html', tmplId.length - 5) !== -1) {
		      me._loadHtml(tmplId, function(df){
		          me._tmpl = me._firstElement(df).content;
		          cb(me._tmpl);
		        });
		      return;
		    } else {
		      me._tmpl = me._el(tmplId).content;
		    }
		  }
		  cb(this._tmpl);
		}
		TemplateView.prototype._initEvents = function(handlers){
		  var evts = {};
		
		  for (var hname in handlers) {
		    var pos = hname.lastIndexOf('_');
		    if (pos === -1) {
		      this._bind(this.el, hname, handlers[hname]);
		      continue;
		    }
		
		    var cl = hname.substr(0, pos);
		    var en = hname.substr(pos + 1);
		    evts[cl] = { name: en, handler: handlers[hname] };
		  }
		
		  this._evts = evts;
		}
		TemplateView.prototype._bindEvts = function(root){
		  var evt, evts = this._evts;
		  if (root.tagName == 'FORM') {
		    for (var ctrl in evts) {
		      evt = evts[ctrl];
		      this._bind(root[ctrl], evt.name, evt.handler);
		    }
		  } else {
		    for (var cls in evts) {
		      evt = evts[cls];
		      this._bind(root.querySelector('.'+cls), evt.name, evt.handler);
		    }
		  }
		}
		
		module.exports = TemplateView;


	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var View = __webpack_require__(2);
		var TemplateView = __webpack_require__(4);
		
		/**
		* View for loop item
		*
		* @class
		* @memberOf Lfin
		* @constructor
		* @extends Lfin.View
		* @param {(string|Element)} rootIdOrNode - Root element ID or Root node
		* @param {(string|TemplateView)} [template] - Item Template ID or an sub class of TemplateView
		* @param {object} [props] - Properties
		* @param {function} [init] - Initializer with arguments (me, evts)
		* @example
		* var instanceView = new Lfin.ListView('listRootID', 'listItemID'
		*           {
		*             data: [
		*               { title: 'foo' },
		*               { ttile: 'bar' }
		*             ]
		*           },
		*           function(me, evts){
		*             // define logics or event handlers...
		*           });
		*/
		function ListView(rootIdOrNode, template, props, init){
		  this._itemSet = {};
		  this.itemLoad = function(el, item){};
		
		  View.call(this, rootIdOrNode, props, function(me, evts){
		    if (me._isStr(template)) {
		      var tmplEl = me.el.querySelector('#'+template);
		      me._tmpl = tmplEl.content;
		      me._tmplDf = true;
		      tmplEl.parentNode.removeChild(tmplEl);
		    } else if (template) {
		      me._tmpl = template;
		      me._tmplDf = false;
		    } else {
		      me._tmpl = null;
		      me._tmplDf = false;
		    }
		    if (init) init(me, evts)
		  });
		}
		
		/**
		 * Create a sub class of ListView
		 *
		 * @static
		 * @param {(string|TemplateView)} [defaultItemTmpl] - Item Template ID or an sub class of TemplateView
		 * @param {object} [defaultProps] - default properties
		 * @param {function} [init] - Initializer with arguments (me, evts)
		 * @example
		 * var SubClassListViewA = Lfin.ListView.extend('childItem', { group: 'people' },
		 *                             function(me, evts){
		 *                               // define event handlers...
		 *                             });
		 *
		 * var SubClassListViewB = Lfin.ListView.extend('childItem', function(me, evts){
		 *                               // define event handlers...
		 *                             });
		 *
		 * var SubClassListViewC = Lfin.ListView.extend('childItem');
		 *
		 * var SubClassListViewD = Lfin.ListView.extend(function(me, evts){
		 *                               // define event handlers...
		 *                             });
		 *
		 * var list = new SubClassListViewD('peopleList', 'ItemTemplate ID', {
		 *         data: [
		 *           { name: "Taro", age: 16 },
		 *           { name: "Hanako", age: 15 }
		 *         ]
		 *       });
		 */
		ListView.extend = function(defaultItemTmpl, defaultProps, init){
		  function isF(v){ return (typeof v === 'function') }
		  if (isF(defaultItemTmpl)) {
		    init = defaultItemTmpl;
		    defaultProps = {};
		    defaultItemTmpl = null;
		  } else if (isF(defaultProps)) {
		    init = defaultProps;
		    defaultProps = {};
		  }
		
		  function SubListView(rootIdOrNode, template, props){
		    props = props || {};
		
		    for (var key in defaultProps) {
		      if (!(key in props)) {
		        props[key] = defaultProps[key];
		      }
		    }
		
		    ListView.call(this, rootIdOrNode,
		                  template || defaultItemTmpl || null,
		                  props, init);
		  }
		  SubListView.prototype = Object.create(this.prototype);
		  return SubListView;
		}
		
		ListView.prototype = Object.create(TemplateView.prototype, {
		  data: {
		    get: function(){
		      var data = [];
		      var c = this.el.children;
		      for (var i = 0; i < c.length; i++) {
		        var finId = c[i].getAttribute('LfinId');
		        if (!finId) continue;
		        var item = this._itemSet[finId];
		        if (item.isView) {
		          data.push(item.data);
		        } else {
		          data.push(item);
		        }
		      }
		      return data;
		    },
		    set: function(newData){
		      this._render(newData);
		    }
		  }
		});
		ListView.prototype.constructor = ListView;
		
		/**
		 * Get item data at index
		 *
		 * @param {number} index - item position
		 */
		ListView.prototype.getItemAt = function(index){
		  var el = this.el.children[index],
		      finId = el.getAttribute('LfinId');
		  return this._itemSet[finId];
		}
		
		/**
		 * add an item to list
		 *
		 * @param {(object|View)} item - an item
		 */
		ListView.prototype.addItem = function(item){
		  var me = this,
		      finId = me._getLfinId();
		
		  if (me._tmplDf) {
		    var el = me._createFromTmpl(item);
		    me._itemSet[finId] = item;
		    el.setAttribute('LfinId', finId);
		    me._appendEl(el);
		    me.itemLoad(el, item);
		  } else {
		    var view = me._tmpl ? new me._tmpl({ data: item }) : item;
		    me._itemSet[finId] = view;
		    me.views[finId] = view;
		    view.el.setAttribute('LfinId', finId);
		    view.load(function(){
		      me._appendEl(view.el);
		    });
		    return view;
		  }
		}
		
		/**
		 * Insert an item to list at index
		 *
		 * @param {(object|View)} item - an item
		 * @param {number} index - inserted position
		 */
		ListView.prototype.insertItem = function(item, index){
		  var me = this,
		      finId = me._getLfinId();
		
		  if (me._tmplDf) {
		    var el = me._createFromTmpl(item);
		    me._itemSet[finId] = item;
		    el.setAttribute('LfinId', finId);
		    me._insertElBefore(el, me.el.children[index]);
		    me.itemLoad(el, item);
		  } else {
		    var view = me._tmpl ? new me._tmpl({ data: item }) : item;
		    me._itemSet[finId] = view;
		    me.views[finId] = view;
		    view.el.setAttribute('LfinId', finId);
		    view.load(function(){
		      me._insertElBefore(view.el, me.el.children[index]);
		    });
		  }
		}
		
		/**
		 * Remove item from list at index
		 *
		 * @param {number} index - removed at position
		 */
		ListView.prototype.removeItemAt = function(index){
		  var el = this.el.children[index];
		  this.removeItemByEl(el);
		}
		
		/**
		 * Remove item from list by element
		 *
		 * @param {element} el - removed element
		 */
		ListView.prototype.removeItemByEl = function(el){
		  var finId = el.getAttribute('LfinId');
		  delete this._itemSet[finId];
		  delete this.views[finId];
		  this._removeEl(el);
		}
		
		/**
		 * Remove view with item
		 *
		 * @param {view} vw - removed view
		 */
		ListView.prototype.removeView = function(vw){
		  this.removeItemByEl(vw.el);
		}
		
		ListView.prototype._appendEl = function(el){
		  this.el.appendChild(el);
		  this._bindEvts(el);
		}
		ListView.prototype._insertElBefore = function(newEl, refEl){
		  this.el.insertBefore(newEl, refEl);
		  this._bindEvts(newEl);
		}
		ListView.prototype._removeEl = function(el){
		  this.el.removeChild(el);
		}
		
		ListView.prototype._render = function(data){
		  if (!data) data = [];
		  var me = this;
		
		  var c = me.el.children;
		  for (var i = c.length - 1; i >= 0; i--) {
		    me.el.removeChild(c[i]);
		  }
		
		  var newItemSet = {};
		
		  if (me._tmplDf) {
		    data.forEach(function(item){
		      var finId = me._getLfinId();
		      var entity = me._createFromTmpl(item);
		      newItemSet[finId] = item;
		      entity.setAttribute('LfinId', finId);
		      me._appendEl(entity);
		      me.itemLoad(entity, item);
		    });
		  } else {
		    data.forEach(function(item){
		      var finId = me._getLfinId();
		      var view = me._tmpl ? new me._tmpl({ data: item }) : item;
		      newItemSet[finId] = view;
		      view.el.setAttribute('LfinId', finId);
		      view.load(function(){
		        me._appendEl(view.el);
		      });
		    });
		  }
		
		  me._itemSet = newItemSet;
		}
		ListView.prototype._createFromTmpl = function(item){
		  var el = document.importNode(this._tmpl, true);
		  this._walkForReplacingEmbed(el, item);
		  return this._firstElement(el);
		}
		
		module.exports = ListView;


	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var View = __webpack_require__(2);
		
		/**
		* A FormView is data fields to bind input, select or textarea by theirs names.
		*
		* @class
		* @memberof Lfin
		* @constructor
		* @extends Lfin.View
		* @param {(string|Element)} idOrNode - Root element ID or root node
		* @param {object} [props] - Properties
		* @param {function} [init] - Initializer
		* @example
		* // Create a FormView bound to loginForm
		* var form = new Lfin.FormView('loginForm',
		*       { fields: 'email password' },
		*       function(me, evts){
		*         // define logics or event handlers...
		*         evts.submit = function(){
		*           var body = me.data;
		*           http.post('/login', body);
		*           return false;
		*         }
		*       });
		* @example {@lang xml}
		* <form id="loginForm">
		*   <input type="text" name="email">
		*   <input type="password" name="password">
		*   <button type="submit">Sign in</button>
		* </form>
		*/
		function FormView(idOrNode, props, init){
		  var me = this;
		
		  function complete(node) {
		    props = me._default(props, 'embeddable', true);
		
		    View.call(me, node, props, init);
		
		    me._bindEvts();
		  }
		
		  if (idOrNode instanceof Node) {
		    complete(idOrNode);
		    return;
		  }
		
		  var rootEl = me._el(idOrNode);
		  if (rootEl == null) throw new Error('Not found form root element')
		  complete(rootEl);
		}
		
		/**
		* Create a sub class of FormView
		*
		* @static
		* @param {object} [defaultProps] - default properties
		* @param {function} init - Initializer
		* @example
		* var SubFormView = Lfin.FormView.extend(
		*        { fields: 'name age' },
		*        function(me, evts){
		*          // define logics or event handlers...
		*        });
		*/
		FormView.extend = function(defaultProps, init){
		  if (init === undefined) {
		    init = defaultProps;
		    defaultProps = {};
		  }
		
		  function SubFormView(idOrNode, props){
		    for (var key in defaultProps) {
		      if (!(key in props)) {
		        props[key] = defaultProps[key];
		      }
		    }
		    FormView.call(this, idOrNode, props, init);
		  }
		  SubFormView.prototype = Object.create(this.prototype);
		  return SubFormView;
		}
		
		FormView.prototype = Object.create(View.prototype, {
		  data: {
		    get: function(){
		      return this._getFields();
		    },
		    set: function(value){
		      this._data = value;
		      this._render(value);
		    }
		  },
		  /**
		   * Specify field names of the form
		   * If a value is String, it is splitted by whitespace.
		   * @type {(Array|String)}
		   * @memberof Lfin.FormView
		   * @instance
		   * @example
		   * form.fields = ['name', 'age', 'gender'];
		   * form.fields = 'name age gender'; // same as above
		   */
		  fields: {
		    get: function(){
		      return this._fields;
		    },
		    set: function(value){
		      var fields = value;
		      if (this._isStr(fields)) {
		        fields = fields.split(/\s+/);
		      }
		      this._fields = fields || [];
		    }
		  }
		});
		FormView.prototype.constructor = FormView;
		
		FormView.prototype._expand = function(data){
		  this._setFields(data);
		}
		
		/**
		 * Generate data from elements value
		 *
		 * @param {(string|array)} fields - target element IDs(= data field names)
		 * @param {string} [prefix] - prefix of target element IDs
		 * @example
		 * var data = view._getFields('name age', 'user');
		 * console.log(data);
		 * { name: "Mike", age: 24 }
		 */
		FormView.prototype._getFields = function(){
		  var me = this, result = {};
		
		  me._fields.forEach(function(field){
		    var el = me.el[field] || me._el(field);
		    if (el) {
		      result[field] = el.value;
		      return;
		    }
		
		    var vw = me.views[field];
		    if (vw) {
		      result[field] = vw.value;
		      return;
		    }
		  });
		  return result;
		}
		
		/**
		 * set data to elements value or textContent
		 *
		 * @param {(string|array)} fields - target element IDs(= data field names)
		 * @param {object} data - set textContent or value to target element
		 * @param {string} [prefix] - prefix of target element IDs
		 * @example
		 * view.setFields('name age', { name: "Mike", age: 24 }, 'user');
		 */
		FormView.prototype._setFields = function(data){
		  var me = this;
		
		  me._fields.forEach(function(field){
		    if (!(field in data)) return;
		
		    var val = data[field] || null,
		        el = me.el[field] || me._el(field);
		    if (el) {
		      if ('value' in el) {
		        el.value = val;
		      } else if ('textContent' in el) {
		        el.textContent = val || "";
		      }
		      return;
		    }
		
		    var vw = me.views[field];
		    if (vw) {
		      if ('value' in vw) vw.value = val;
		      else if ('value' in vw.el) vw.el.value = val
		      return;
		    }
		  });
		}
		
		FormView.prototype._initEvents = function(handlers){
		  var evtSet = {};
		
		  for (var hname in handlers) {
		    var pos = hname.lastIndexOf('_');
		    if (pos === -1) {
		      this._bind(this.el, hname, handlers[hname]);
		      continue;
		    }
		
		    var cl = hname.substr(0, pos);
		    var en = hname.substr(pos + 1);
		    evtSet[cl] = { name: en, handler: handlers[hname] };
		  }
		
		  this._evtSet = evtSet;
		}
		FormView.prototype._bindEvts = function(){
		  var me = this, evtSet = this._evtSet,
		      evt, node;
		  for (var ctrl in evtSet) {
		    evt = evtSet[ctrl];
		    node = me.el[ctrl] || me._el(ctrl);
		    this._bind(node, evt.name, evt.handler);
		  }
		}
		
		module.exports = FormView;


	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var View = __webpack_require__(2);
		
		/**
		* View for Area with external HTML
		*
		* @class
		* @memberOf Lfin
		* @constructor
		* @extends Lfin.View
		* @param {(string|Element)} nodeOrUrl - Root node or HTML URL path
		* @param {object} props - Properties
		* @param {function} init - Initializer with arguments (me, evts)
		* @param {function} onload - call it after view has loaded
		* @example
		* var instanceView = new Lfin.ListView('Template ID', { name: 'listItem' }, function(me, evts){});
		*/
		function AreaView(nodeOrUrl, props, init, onload){
		  var me = this;
		  me.box = null;
		  me._ctx = props._ctx;
		  me.parent = props.parent;
		
		  if (nodeOrUrl instanceof Node) {
		    View.call(me, nodeOrUrl, props, init);
		    if (onload) onload.call(me, me);
		  } else {
		    me._loadHtml(nodeOrUrl, function(docf){
		      var box = me._el(me.parent.box);
		      var child = box.firstElementChild;
		      if (child) box.replaceChild(docf, child);
		      else box.appendChild(docf);
		
		      View.call(me, docf, props, init);
		      if (onload) onload.call(me, me);
		    });
		  }
		}
		
		/**
		* Create a sub class of AreaView
		*
		* @static
		* @param {function} init Initializer with arguments (me, evts)
		* @example
		* var subclass = new Lfin.AreaView(function(me, evts){ ... });
		*/
		AreaView.extend = function(init){
		  var subClass = function(nodeOrUrl, props, onload){
		    AreaView.call(this, nodeOrUrl, props, init, onload);
		  }
		  subClass.prototype = Object.create(this.prototype);
		  return subClass;
		}
		
		AreaView.prototype = Object.create(View.prototype);
		AreaView.prototype.constructor = AreaView;
		
		/**
		* View context fetched from me or parent recursively
		*
		* @param {string} name - key stored context
		* @param {*} value - set a value
		* @example
		* var value = view.context('key');
		* view.context('key', value);
		*/
		AreaView.prototype.context = function(name, value){
		  if (value === undefined) {
		    for (var vw = this; vw != null; vw = vw.parent) {
		      if (name in vw._ctx) return vw._ctx[name];
		    }
		  } else if (!this.unloading) {
		    this._ctx[name] = value;
		  } else {
		    if (this.parent) this.parent._ctx[name] = value;
		  }
		}
		
		/**
		* Cast a message to all children of view
		*
		* @param {string} name - message name
		* @param {*} ctx - passing value
		*/
		AreaView.prototype.broadcast = function(name, ctx){
		  this._callR([name, ctx], 'views', 'cast');
		}
		
		module.exports = AreaView;


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var AreaView = __webpack_require__(7)
		
		/*
		 * App
		 *
		 * .go
		 * .load
		 */
		var App = new function(){
		  var me = this;
		  me.PATH_HEAD = '#!';
		  me.ID_SEP = ':';
		  me.defaultPath = '';
		  me.viewDir = 'views/';
		
		  me.areas = { index: function(){} };
		  me._layers = null;
		  me._preCtx = null;
		
		  me._hashChanged = false;
		  me.onhashchange = function(){
		    me._hashChanged = true;
		    if (this.location.hash.substr(0, 2) == me.PATH_HEAD) {
		      setTimeout(function(){
		        me.load(null, me._preCtx);
		        me._preCtx = null;
		      }, 0);
		    }
		  }
		
		  me.onload = function(){
		    var rootAreaView = AreaView.extend(me.areas.index),
		        rootArea = new rootAreaView(document.body, { _ctx:{} });
		    rootArea.box = me._rootBox || null;
		    me._layers = [{ name: "", area: rootArea }];
		
		    var h = window.location.hash;
		    if (!h && me.defaultPath) {
		      window.location.hash = me.PATH_HEAD+me.defaultPath;
		    } else if (h) me.load();
		  }
		
		  me.config = function(box, defaultPath){
		    if (me._layers) {
		      me._layers[0].area.box = box;
		    } else {
		      me._rootBox = box;
		    }
		    me.defaultPath = defaultPath || me.defaultPath;
		
		    window.onhashchange = me.onhashchange;
		    window.onload = me.onload;
		  }
		
		  me.broadcast = function(name, ctx){
		    me._layers.forEach(function(lyr){
		      lyr.area.broadcast(name, ctx);
		    });
		  }
		
		  me.leafArea = function(){
		    var lyrs = me._layers;
		    return lyrs[lyrs.length-1].area;
		  }
		
		  me.addLayer = function(path, area){
		    me._layers.push({ name: path.name, id: path.id, area: area });
		  }
		
		  me.dropLayers = function(paths){
		    var lv = 0, lyrs = me._layers;
		    if (lyrs.length == 1)  return 1;
		
		    while (lv < lyrs.length - 1 && lv < paths.length) {
		      if (lyrs[lv + 1].name != paths[lv].name) {
		        lv++;
		        var rmvdLayers = lyrs.splice(lv, lyrs.length - lv);
		        for (var i = rmvdLayers.length - 1; i >= 0; i--) {
		          var area = rmvdLayers[i].area;
		          area.unloading = true;
		          if (area.unload) area.unload();
		          area._destroy();
		          area.parent = null;
		        }
		        return lv;
		      }
		      if (++lv === lyrs.length) return lv;
		    }
		    return null;
		  }
		
		  me.go = function(path, ctx, isTemp){
		    if (!isTemp) {
		      me._preCtx = ctx;
		      var prehash = window.location.hash;
		      window.location.hash = me.PATH_HEAD+path;
		      if (!me._hashChanged && prehash) {
		        me._hashChanged = false;
		        me.load(null, me._preCtx); // because not call hashchange event
		        me._preCtx = null;
		      }
		    } else {
		      me.load(path, ctx);
		    }
		  }
		
		  me.back = function(){
		    window.history.back();
		    return false;
		  }
		
		  me.load = function(path, ctx){
		    var paths, hash = window.location.hash;
		    if (path) {
		      paths = path;
		    } else if (hash && hash.substr(0, me.PATH_HEAD.length) == me.PATH_HEAD) {
		      paths = hash.substr(2);
		    } else {
		      paths = me.defaultPath;
		    }
		    paths = me._parsePath(paths);
		
		    var level = me.dropLayers(paths);
		    if (level == null) {
		      var leafArea = me.leafArea();
		      leafArea.context('id', paths[paths.length-1].id);
		      if (ctx) me._merge(leafArea._ctx, ctx)
		      if (leafArea.load) leafArea.load(function(){});
		      return;
		    }
		
		    var nextPaths = paths;
		    var loadAreaR = function(index){
		      var isLast = (index === nextPaths.length);
		      me._loadArea(nextPaths.slice(0, index), isLast ? ctx : null, function(){
		        if (!isLast) loadAreaR(index + 1);
		      });
		    }
		    loadAreaR(level);
		  }
		
		  me._snakeToCamel = function(s){
		    return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
		  }
		
		  me._parsePath = function(path){
		    return path.split('/').map(function(res){
		      var r = res.split(me.ID_SEP);
		      if (r.length === 2) {
		        return { name: r[0], id: r[1] };
		      } else {
		        return { name: r[0] };
		      }
		    });
		  }
		
		  me._loadArea = function(paths, ctx, done){
		    var lastPath = paths[paths.length-1];
		
		    var init = (function(){
		        var res = me.areas;
		        paths.forEach(function(path){
		          var name = me._snakeToCamel(path.name);
		          res = res[name];
		        });
		        if (res === undefined) return function(){};
		        return (typeof res === 'function') ? res : res.index;
		      })();
		
		    var props = { parent: me.leafArea(), _ctx: { id: lastPath.id } };
		    var url = me.viewDir + paths.map(function(p){ return p.name }).join('/') + '.html';
		
		    if (ctx) me._merge(props._ctx, ctx);
		
		    var newArea = new AreaView(url, props, init,
		      function(area){
		        if (area.load) area.load(done);
		        else done();
		        me._loadSubview(area);
		      });
		
		    me.addLayer(lastPath, newArea);
		  }
		
		  me._loadSubview = function(root){
		    var views = root.views;
		    for (var name in views){
		      var subvw = views[name];
		      if (subvw.load) {
		        subvw.load(function(){
		          me._loadSubview(subvw);
		        });
		      } else {
		        me._loadSubview(subvw);
		      }
		    }
		  }
		
		  me._merge = function(dest, src) {
		    for (var key in src) dest[key] = src[key];
		  }
		}
		
		module.exports = App;


	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		'use strict';
		
		/**
		 * Cache
		 *
		 * @class Cache
		 * @memberOf Lfin
		 */
		var Cache = {
		  _key: null,
		  _expires: 5000,
		  _listCache: { expires: 0 },
		  _setCache: {},
		  get now(){
		    return new Date().getTime();
		  },
		  get expires(){
		    return new Date().getTime() + this._expires;
		  },
		  getAll: function(){
		    var me = this;
		    if (me.now >= me._listCache.expires) return null;
		
		    var result = [];
		    me._listCache.data.some(function(key){
		      var item = me.get(key);
		      if (item === null) return true;
		      result.push(item); return false;
		    });
		
		    if (result.length < me._listCache.data.length) return null;
		    return result;
		  },
		  get: function(key){
		    var entry = this._setCache[key];
		    if (!entry) return null;
		
		    if (this.now < entry[1]) {
		      return entry[0];
		    } else {
		      delete this._setCache[key];
		      return null;
		    }
		  },
		  setAll: function(field, data){
		    var EXP = this.expires;
		    var setCache = this._setCache = {};
		
		    var list = [];
		    data.forEach(function(item){
		      var key = item[field],
		          entry = [ item, EXP ];
		
		      setCache[key] = entry;
		      list.push(key);
		    });
		
		    this._listCache = {
		      data: list,
		      expires: EXP
		    };
		  },
		  set: function(key, item){
		    this._setCache[key] = [ item, this.expires ];
		  },
		  del: function(key){
		    delete this._setCache[key];
		  }
		}
		
		
		function MemoryCache(key, expires) {
		  this._key = key;
		  this._expires = (expires || 120) * 1000;
		}
		MemoryCache.prototype = Object.create(Cache);
		MemoryCache.prototype.constructor = MemoryCache;
		
		module.exports = MemoryCache;


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		var Core = __webpack_require__(1);
		var Http = __webpack_require__(3);
		
		/**
		 * Model
		 *
		 * @class Model
		 * @memberOf Lfin
		 * @extends Lfin.Core
		 * @constructor
		 * @param rootPath {string} rootPath
		 * @param opts {Object} Options
		 * @property {string} [idField] - Field of data as primary ID (the default is 'id')
		 * @property {string} [dataField] - Main data field of list result, null expressed that a root is array (the default is null)
		 * @property {Cache} [cache] - Cache store
		 */
		function Model(rootPath, opts){
		  this._defineProps = null;
		  this.rootPath = rootPath;
		
		  var opt = opts || {};
		  this.idField = opt.idField || 'id';
		  this.dataField = opt.dataField || null;
		  this.cache = opt.cache || null;
		}
		Model.prototype = Object.create(Core.prototype);
		Model.prototype.constructor = Model;
		
		Model.prototype._path = function(params) {
		  return this.rootPath.replace(/\:(\w+)/g,
		    function(str, m){
		      return params[m];
		    });
		}
		
		/**
		 * Fetch all
		 *
		 * @param {Object} [opts] - options
		 * @return {Promise} Promise
		 */
		Model.prototype.all = function(opts){
		  var me = this, opt = opts || {};
		
		  if (me.cache && !opt.force) {
		    var data = me.cache.getAll();
		    if (data) {
		      return Promise.resolve(data);
		    }
		  }
		
		  var http = new Http();
		  return http.get(opt.path || me._path(opt),
		                  opt.query || null,
		                  opt.headers || null)
		    .then(function(res){
		      var data = res.body;
		      var result = {};
		      var list;
		      if (me.dataField) {
		        list = data[me.dataField];
		        delete data[me.dataField];
		
		        for (var field in data) {
		          result[field] = data[field];
		        }
		      } else {
		        list = data;
		      }
		
		      var items = list.map(function(item){
		        return me.toEntity(item);
		      });
		      result.items = items;
		
		      if (me.cache) {
		        me.cache.setAll(me.idField, items);
		      }
		
		      return result;
		    });
		}
		
		/**
		 * Lfind an entity
		 * GET /entity
		 * GET /entities/:id
		 *
		 * @param {(string|number)} id - entity ID
		 * @param opts {Object} options
		 * @return {Promise} Promise
		 */
		Model.prototype.find = function(id, opts){
		  var me = this, http = new Http();
		
		  var path, opt, mid;
		  if (me._isStr(id)) {
		    opt = opts || {};
		    path = me._path(opt) + '/' + id;
		    mid = id;
		  } else {
		    opt = id || {};
		    path = me._path(opt);
		    mid = '__SELF__';
		  }
		
		  if (me.cache && !opt.force) {
		    var cache = me.cache.get(mid);
		    if (cache) {
		      return Promise.resolve(cache);
		    }
		  }
		
		  return http.get(path, opt.query || null,
		                  opt.headers || null)
		    .then(function(res){
		      var data = res.body;
		      var entity = me.toEntity(data);
		      if (me.cache) {
		        me.cache.set(mid, entity);
		      }
		      return entity;
		    })
		    .catch(function(err){
		      if (err && err.isNotFound) {
		        return Promise.resolve(null);
		      }
		
		      return Promise.reject(err);
		    })
		}
		
		/**
		 * Post new entity data
		 * POST /entities
		 *
		 * @param sendData {Object} item data
		 * @param {Object} [opts] - options
		 * @return {Promise} Promise
		 */
		Model.prototype.create = function(sendData, opts){
		  var me = this, opt = opts || {},
		      http = new Http();
		
		  return http.post(me._path(opt), opt.query || null,
		                   null, sendData,
		                   opt.headers || null)
		    .then(function(res){
		      var data = res.body;
		      if (me.cache) {
		        me.cache.set(data[me.idField], data);
		      }
		      return data;
		    });
		}
		
		/**
		 * Update an entity
		 * PUT /entity
		 * PUT /entities/:id
		 *
		 * @param {(string|number)} [id] - entity ID
		 * @param {object} sendData - item data
		 * @param {Object} [opts] - options
		 * @return {Promise} Promise
		 */
		Model.prototype.update = function(id, sendData, opts){
		  var me = this, http = new Http();
		
		  var path, body, opt, mid;
		  if (me._isStr(id)) {
		    opt = opts || {};
		    body = sendData;
		    path = me._path(opt) + '/' + id;
		    mid = id;
		  } else {
		    opt = sendData || {};
		    body = id;
		    path = me._path(opt);
		    mid = '__SELF__';
		  }
		
		  return http.put(path, opt.query || null,
		                  null, body,
		                  opt.headers || null)
		    .then(function(res){
		      var data = res.body;
		      if (me.cache) {
		        me.cache.set(mid, data);
		      }
		      return data;
		    });
		}
		
		/**
		 * Delete an entity
		 * DELETE /entity
		 * DELETE /entities/:id
		 *
		 * @param {(string|number)} [id] - entity ID
		 * @param {Object} [opts] - options
		 * @return {Promise} Promise
		 */
		Model.prototype.destroy = function(id, opts){
		  var me = this, http = new Http();
		
		  var path, opt, mid;
		  if (me._isStr(id)) {
		    opt = opts || {};
		    path = me._path(opt) + '/' + id;
		    mid = id;
		  } else {
		    opt = id || {};
		    path = me._path(opt);
		    mid = '__SELF__';
		  }
		
		  return http.del(path, opt.query || null,
		                  opt.headers || null)
		    .then(function(res){
		      if (me.cache) {
		        me.cache.del(mid);
		      }
		      return null;
		    });
		}
		
		/**
		 * Define a getter property
		 *
		 * @param {string} name - property name
		 * @param {Function} getter - getter with argument (value) and return result
		 */
		Model.prototype.defProp = function(name, getter, setter){
		  this._defProps = this._defProps || {};
		
		  var newProp = {
		    configurable: false,
		    get: getter
		  };
		
		  if (setter) {
		    newProp.set = setter;
		  }
		
		  this._defProps[name] = newProp;
		}
		
		/**
		 * Define a method
		 *
		 * @param name {String} property name
		 * @param func {Function} method function
		 */
		Model.prototype.defMethod = function(name, func){
		  var me = this;
		  me[name] = function(opt){
		    return func.apply(me, [opt]);
		  }
		}
		
		/**
		 * Save entity
		 *
		 * @return {Promise} promise
		 */
		Model.prototype.save = function(){
		  var model = this.__model;
		  if (!model) throw new Error("Need to call from entity");
		
		  if (model.idField in this) {
		    var id = this[model.idField];
		    return model.update(id, this);
		  } else {
		    return model.create(this);
		  }
		}
		
		/**
		 * Convert to an entity
		 *
		 * @param {object} data - data
		 * @return {object} entity
		 */
		Model.prototype.toEntity = function(data){
		  var entity;
		  if (this._defProps) {
		    entity = Object.create(data, this._defProps);
		  } else {
		    entity = data;
		  }
		  Object.defineProperty(data, "__model", this);
		  Object.defineProperty(data, "save", { value: this.__proto__.save });
		  return entity;
		}
		
		module.exports = Model;


	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=lfin.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var App = Lfin.App;
	var NewArrival = __webpack_require__(3);

	var Backlog = __webpack_require__(4);
	var GitHub  = __webpack_require__(9);

	/**
	 * DeckView
	 */
	var DeckView = Lfin.ListView.extend(function(me, evts){
	    me.newArrival = new NewArrival();
	    me.newArrival.watch('clear', function(){
	      for (var name in me.views) {
	        me.views[name].clearNewArrival();
	      }
	    });

	    // change scrollbar style for Window PC
	    (function(ua){
	      if (ua.indexOf('windows') > -1 && ua.indexOf('phone') === -1
	       && ua.indexOf('touch') === -1) {
	        me.el.className = 'windowsScroller';
	      }
	    })(window.navigator.userAgent.toLowerCase());

	    // Under events for Mobile
	    var deckWidth = document.documentElement.clientWidth;
	    if (deckWidth > 440) {
	      me.$el.addClass('bounding');
	    } else {
	      var clmnIdx = 0, startX = 0, startY = 0, preX, preY;

	      evts.touchstart = function() {
	        preX = startX = event.touches[0].pageX;
	        preY = startY = event.touches[0].pageY;
	      }

	      evts.touchmove = function() {
	        var nowX = event.touches[0].pageX,
	            nowY = event.touches[0].pageY;

	        if (startY < 0 || Math.abs(nowY - startY) > Math.abs(nowX - startX) / 2) {
	          startY = -1; // Cancel
	          return;
	        }

	        this.scrollLeft += preX - nowX;
	        preX = nowX; preY = nowY;
	      }

	      evts.touchend = function() {
	        if (startY === -1) {
	          me.$el.animate({ scrollLeft: clmnIdx * deckWidth }, 120);
	          return;
	        };

	        if (Math.abs(preX - startX) >= 30) {
	          if (preX > startX) {
	            if (this.scrollLeft > 0) clmnIdx--;
	          } else {
	            if (this.scrollLeft < this.scrollWidth - deckWidth) clmnIdx++;
	          }
	        }

	        if (this.scrollLeft !== clmnIdx * deckWidth) {
	          me.$el.animate({ scrollLeft: clmnIdx * deckWidth }, 80);
	        }
	      }
	    }
	  });


	var ColumnViewInitializer = function(me, evts){
	    me.load = function(done){
	      var d = me.data;
	      if (d.width) me.$el.addClass(d.width);
	      done();
	    }

	    me.applyEvents = function() {
	      var body = me.findEl('.timelineBody');
	      $('.timeline > header', me.el).click(function(event) {
	        $(body).animate({ scrollTop: 0 });
	      });
	    }

	    me.clearNewArrival = function(){
	      me.$el.find('> .timeline > header').removeClass('newArrival');
	      me.$el.find('> .timeline > .timelineBody > div').removeClass('newArrival');
	    }
	  };

	var areas = {};

	/**
	 * deck
	 */
	areas.deck = function(me, evts){
	  var ColumnView = Lfin.TemplateView.extend('deckColumn', ColumnViewInitializer);
	  var deckView = new DeckView('deck', null, null);
	  var models = [];

	  me.load = function(done){
	    var columns = localStorage.getItem('timelines');
	    columns = columns ? JSON.parse(columns) : [];

	    if (columns.length === 0) {
	      done();
	      App.go('intro')
	      return;
	    }

	    window.history.replaceState({}, document.title, window.location.pathname);

	    columns.forEach(function(col){
	        var columnView = new ColumnView({ data: { width: col.width } });
	        deckView.addItem(columnView);

	        var loader;
	        if (col.service == 'backlog') {
	          loader = Backlog;
	        } else if (col.service == 'github') {
	          loader = GitHub;
	        }

	        loader.loadActivities(columnView, deckView.newArrival, col,
	          function callback(model, timeline) {
	            models.push(model);
	            columnView.applyEvents();
	          });
	      });

	    done();
	  }

	  me.unload = function() {
	    models.forEach(function(model){
	        model.stopAutoLoad();
	      });
	    models = [];
	  }
	}


	/**
	 * demo
	 */
	areas.demo = function(me, evts){
	  var ColumnView = Lfin.TemplateView.extend('deckColumn', ColumnViewInitializer);
	  var deckView = new DeckView('deck', null, null);
	  var timeoutId = 0;

	  me.load = function(done){
	    var columns = [{
	      service: 'github',
	      width: 'wide', notify: 'off',
	      kind:'public_timeline',
	      caption: 'Public Timeline',
	      token: null, endpoint: null
	    }, {
	      service: 'github',
	      width: 'narrow', notify: 'off',
	      kind: 'repo', owner: 'facebook', repo: 'react',
	      caption: 'facebook/react',
	      token: null, endpoint: null
	    }, {
	      service: 'github',
	      width: 'normal', notify: 'off',
	      kind: 'org', org: 'microsoft',
	      caption: 'microsoft',
	      token: null, endpoint: null
	    }, {
	      service: 'github',
	      width: 'normal', notify: 'off',
	      kind: 'org', org: 'google',
	      caption: 'google',
	      token: null, endpoint: null
	    }];

	    var demoColumnModels = [];

	    columns.forEach(function(col){
	        var columnView = new ColumnView({ data: { width: col.width } });
	        deckView.addItem(columnView);

	        var loader;
	        if (col.service == 'backlog') {
	          loader = Backlog;
	        } else if (col.service == 'github') {
	          loader = GitHub;
	        }

	        loader.loadActivities(columnView, deckView.newArrival, col,
	          function callback(model, timeline) {
	            columnView.applyEvents();
	            demoColumnModels.push(model);
	          });
	      });

	    me.stop = function() {
	      demoColumnModels.forEach(function(model){
	        model.stopAutoLoad();
	      });
	    }

	    timeoutId = setTimeout(function(){
	      me.stop();
	      alert('Demo exiting and return introduction page');
	      App.go('intro');
	    }, 60000 * 2);

	    done();
	  }

	  me.unload = function() {
	    me.stop();
	    if (timeoutId) clearTimeout(timeoutId);
	  }
	}

	areas.intro = function(me, evts){
	  window.history.replaceState({}, document.title, window.location.pathname);
	}

	module.exports = areas;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);

	function NewArrival() {
	  var me = this;
	  Lfin.Core.call(me);

	  me.watch('notify', function(ctx){
	      if (!me.hasNewArrival && ctx.notify) {
	        var favicon = document.querySelector('#favicon');
	        me.hasNewArrival = true;

	        favicon.href = "img/favicon-new.ico";
	        document.body.addEventListener('click', function(evt){
	            me.cast('clear');
	            document.body.removeEventListener('click', arguments.callee, false);
	          });
	      }

	      if ('notify' in ctx && ctx.notify !== 'off' && ('Notification' in window)) {
	        if (Notification.permission === "granted") {
	          var body;
	          if (ctx.mentions) {
	            body = 'Your are mentioned ' + ctx.message;
	          } else if (ctx.notify === 'mentioned') {
	            return;
	          } else {
	            body = ctx.message;
	          }

	          var notification = new Notification(ctx.title, {
	              body: body,
	              icon: 'img/apple-touch-icon-180x180.png'
	            });

	          notification.onclick = function(){ window.focus(); };
	          setTimeout(notification.close.bind(notification), 6000);
	        }
	      }
	    });

	  me.watch('clear', function(ctx){
	      var favicon = document.querySelector('#favicon');
	      favicon.href = "img/favicon-default.ico";
	      me.hasNewArrival = false;
	    });
	}
	NewArrival.prototype = Object.create(Lfin.Core.prototype);

	module.exports = NewArrival;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var BacklogTimeline = __webpack_require__(5);
	var BacklogEventViewFactory = __webpack_require__(7);

	var BacklogTimelineView = Lfin.TemplateView.extend("views/backlog.html",
	      function(me, evts){
	        var eventFactory = new BacklogEventViewFactory(me.model.rootUrl,
	          function(tmplId){
	            return me.findEl('#'+tmplId);
	          });

	        var BacklogItemView = Lfin.TemplateView.extend(
	            me.findEl('#BacklogItem'),
	            function(me, evts){
	              me.load = function(done){
	                me.add('item', eventFactory.createView(me.data));
	                if (me.data.newArrival) {
	                  me.$el.addClass('newArrival');
	                }
	                done();
	              }
	            });

	        var eventList = new Lfin.ListView(me.findEl('.timelineBody'), BacklogItemView);
	        me.views.eventList = eventList;

	        me.loadMore = function(newItems){
	          if (me.destroyed()) return;

	          newItems.reverse().forEach(function(item){
	            item.newArrival = true;
	            eventList.insertItem(item, 0);
	          });

	          me.$el.find('> header').addClass('newArrival');
	        }

	        me.destroyed = function(){
	          return !me.el.parentNode;
	        }
	      });


	exports.loadActivities = function(parentView, newArrival, col, cb){
	  var params = {
	    token: col.token,
	    endpoint: col.endpoint
	  };

	  var tlModel = new BacklogTimeline(params.token, params.endpoint);
	  tlModel.activate(col)
	  .then(function(result){
	    var timeline = new BacklogTimelineView(result);

	    tlModel.watch('newArrived', function(data){
	        if (data.notify) {
	          newArrival.cast('notify', data.notify);
	        }
	        if (data.newItems.length > 0) {
	          timeline.loadMore(data.newItems);
	        }
	      });

	    parentView.add('timeline', timeline);
	    cb(tlModel, timeline);
	  })
	  .fail(function(){
	    alert("Can't fetch Backlog information");
	  });
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var BacklogClient = __webpack_require__(6);

	function BacklogTimeline(token, rootUrl) {
	  Lfin.Core.call(this);

	  this.client = new BacklogClient(token, rootUrl);
	  this.rootUrl = rootUrl;
	  this.latestId = 0;
	}

	BacklogTimeline.prototype = Object.create(Lfin.Core.prototype);

	BacklogTimeline.prototype.activate = function(tlinfo) {
	  var me = this;
	  me.tlinfo = tlinfo;
	  me.interval = 60*1000;

	  var proj = tlinfo.project;
	  me.fetchPath = "/api/v2/" + (proj == 'space' ? 'space' : 'projects/' + proj) + '/activities';
	  me.webUrl = this.rootUrl + (proj == 'space' ? '/dashboard' : '/projects/' + proj);

	  return me.client.fetch({ path: me.fetchPath, count: 40 })
	    .then(function(results){
	      me.latestId = results.length > 0 ? parseInt(results[0].id, 10) : 0;

	      var data = {
	        name: tlinfo.caption,
	        url: me.webUrl,
	        eventList: results,
	        notify: tlinfo.notify || 'off'
	      };

	      setTimeout(function(){
	        me.loadNew()
	      }, me.interval);

	      return {
	        model: me,
	        data: data,
	        name: data.name,
	        notify: data.notify || 'off'
	      };
	    });
	}

	BacklogTimeline.prototype.loadNew = function() {
	  var me = this;
	  if (me.interval === 0) return false;

	  me.client.fetch({
	    path: me.fetchPath,
	    minId: me.latestId + 1
	  })
	  .then(function(results){
	    var id, newCount = 0;
	    for (var i = 0, len = results.length; i < len; i++) {
	      id = parseInt(results[i].id, 10);
	      if (id <= me.latestId) break;
	      newCount++;
	    }

	    var notify = null;
	    if (newCount > 0) {
	      me.latestId = results.length > 0 ? parseInt(results[0].id, 10) : 0;

	      notify = {
	        notify: me.tlinfo.notify || 'off',
	        title: 'Backlog ' +  me.tlinfo.caption,
	        message: newCount + ' new event(s)'
	      };
	    }

	    if (me.interval > 0) {
	      setTimeout(function(){
	        me.loadNew();
	      }, me.interval);
	    }

	    me.cast('newArrived', {
	      newItems: results.slice(0, newCount),
	      notify: notify
	    });
	  });
	}

	BacklogTimeline.prototype.stopAutoLoad = function() {
	  this.interval = 0;
	}

	module.exports = BacklogTimeline;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function BacklogClient(token, rootUrl) {
	  this.token = token;
	  this.rootUrl = rootUrl ;
	}

	BacklogClient.prototype.loadProjects = function(cb) {
	  var defer = jQuery.Deferred();
	  jQuery.ajax({
	    url: this.rootUrl + '/api/v2/projects',
	    data: { apiKey: this.token },
	    dataType: 'json'
	  })
	  .done(function(data){
	    defer.resolve(data.filter(function(item){ return !item.archived; }));
	  })
	  .fail(function(err){
	    console.log(err);
	    defer.reject(err);
	  });
	  return defer;
	}

	BacklogClient.prototype.fetch = function(params, cb) {
	  var q = {
	    apiKey: this.token
	  };
	  if (params.latestId) q.minId = params.latestId + 1;
	  if (params.count) q.count = params.count;

	  var defer = jQuery.Deferred();
	  jQuery.ajax({
	    url: this.rootUrl + params.path,
	    data: q,
	    dataType: 'json'
	  })
	  .done(function(data){
	    defer.resolve(data.filter(function(item){ return !item.archived; }));
	  })
	  .fail(function(err){
	    console.log(err);
	    defer.reject(err);
	  });
	  return defer;
	}

	module.exports = BacklogClient;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var dateFormat = __webpack_require__(8);
	var Lfin = __webpack_require__(1);

	function BacklogEventViewFactory(rootUrl, findSubviewElFunc) {
	  this.rootUrl = rootUrl;
	  this.views = loadBacklogSubEventViews(findSubviewElFunc);
	}
	BacklogEventViewFactory.prototype = {
	  Wiki: function(item) {
	    var data = {
	      projectUrl: this.rootUrl + '/projects/' + item.project.projectKey,
	      action: this.typeCaption[item.type],
	      createdAt: dateFormat(item.created),
	      actor: item.createdUser,
	      project: item.project,
	      file: item.content.name,
	      diff: item.content.diff || item.content.content
	    };
	    return new this.views.WikiView({ data: data });
	  },

	  File: function(item) {
	    var data = {
	      projectUrl: this.rootUrl + '/projects/' + item.project.projectKey,
	      action: this.typeCaption[item.type],
	      createdAt: dateFormat(item.created),
	      actor: item.createdUser,
	      project: item.project,
	      file: item.content.dir + item.content.name
	    };
	    return new this.views.FileView({ data: data });
	  },

	  Join: function(item) {
	    var data = {
	      projectUrl: this.rootUrl + '/projects/' + item.project.projectKey,
	      action: this.typeCaption[item.type],
	      createdAt: dateFormat(item.created),
	      actor: item.createdUser,
	      project: item.project,
	      move: item.type == 15 ? 'に加わりました。' : 'から外れました。',
	      users: item.content.users.map(function(u){ return u.name }).join(', ')
	    };
	    return new this.views.JoinView({ data: data });
	  },

	  GitPush: function(item) {
	    function convertCommits(repoUrl, revisions){
	      return revisions.map(function(commit){
	          return {
	            sha: commit.rev.substr(0, 6),
	            commitUrl: repoUrl + "/commit/" + commit.rev,
	            message: commit.comment
	          }
	        });
	    }

	    var data = {
	      projectUrl: this.rootUrl + '/projects/' + item.project.projectKey,
	      action: this.typeCaption[item.type],
	      createdAt: dateFormat(item.created),
	      actor: item.createdUser,
	      project: item.project,
	      projectKey: item.project.projectKey,
	      repoName: item.content.repository.name
	    };

	    var repoUrl = this.rootUrl + "/git/" + data.projectKey + "/" + data.repoName;
	    data.repoUrl = repoUrl;
	    data.branch = item.content.ref.replace(/^refs\/heads\//, '');
	    data.branchUrl = repoUrl + "/tree/" + data.branch;
	    data.commits = convertCommits(repoUrl, item.content.revisions);
	    return new this.views.GitPushView({ data: data });
	  },

	  Event: function(item) {
	    var data = {
	      projectUrl: this.rootUrl + '/projects/' + item.project.projectKey,
	      action: this.typeCaption[item.type],
	      createdAt: dateFormat(item.created),
	      actor: item.createdUser,
	      project: item.project,
	      projectKeyId: item.project.projectKey + "-" + item.content.key_id,
	      summary: item.content.summary,
	      desc: item.content.description
	    };

	    this.analyzeChanges(data, item.content.changes);

	    if (item.content.attachments) {
	      data.attachments = this.convertAttachments(this.rootUrl, item.content.attachments);
	    }

	    data.url = this.rootUrl + "/view/" + data.projectKeyId;

	    if (item.content.comment) {
	      data.desc = item.content.comment.content;
	    }

	    return new this.views.EventView({ data: data });
	  },

	  typeCaption: [ null,
	    /* 1 */ "課題の追加",
	    /* 2 */ "課題の更新",
	    /* 3 */ "課題にコメント",
	    /* 4 */ "課題の削除",
	    /* 5 */ "Wikiを追加",
	    /* 6 */ "Wikiを更新",
	    /* 7 */ "Wikiを削除",
	    /* 8 */ "共有ファイルを追加",
	    /* 9 */ "共有ファイルを更新",
	    /*10 */ "共有ファイルを削除",
	    /*11 */ "Subversionコミット",
	    /*12 */ "GITプッシュ",
	    /*13 */ "GITリポジトリ作成",
	    /*14 */ "課題をまとめて更新",
	    /*15 */ "プロジェクトに参加",
	    /*16 */ "プロジェクトから脱退",
	    /*17 */ "コメントにお知らせを追加",
	    /*18 */ "プルリクエストの追加",
	    /*19 */ "プルリクエストの更新",
	    /*20 */ "プルリクエストにコメント"
	  ],
	  statuses: [null,
	    /*1*/ "未対応",
	    /*2*/ "処理中",
	    /*3*/ "処理済み",
	    /*4*/ "完了"
	  ],
	  resolutions: [
	    /*0*/ "対応済み",
	    /*1*/ "対応しない",
	    /*2*/ "無効",
	    /*3*/ "重複"
	  ],
	  priorities: [null,null,
	    /*2*/ "高",
	    /*3*/ "中",
	    /*4*/ "低"
	  ],

	  convertChange: function(item) {
	    var result;
	    if (item.field == "status") {
	      result = {
	        field: "状態",
	        newValue: this.statuses[parseInt(item.new_value)],
	        mark: "→",
	        oldValue: this.statuses[parseInt(item.old_value)]
	      };
	    } else if (item.field == "resolution") {
	      result = {
	        field: "完了理由",
	        newValue: this.resolutions[parseInt(item.new_value)],
	        mark: "→",
	        oldValue: this.resolutions[parseInt(item.old_value)]
	      };
	    } else if (item.field == "priority") {
	      result = {
	        field: "優先度",
	        newValue: this.priorities[parseInt(item.new_value)],
	        mark: "→",
	        oldValue: this.priorities[parseInt(item.old_value)]
	      };
	    } else if (item.field == "attachment") {
	      result = {
	        field: "添付ファイル",
	        newValue: item.new_value,
	        mark: "",
	        oldValue: item.old_value
	      };
	    } else if (item.field == "assigner") {
	      result = {
	        field: "担当",
	        oldValue: item.old_value,
	        mark: "→",
	        newValue: item.new_value
	      };
	    } else if (item.field == "description") {
	      result = {
	        field: "diff",
	        oldValue: item.old_value,
	        mark: "→",
	        newValue: item.new_value
	      };
	    } else if (item.field == "limitDate") {
	      result = {
	        field: "期限日",
	        oldValue: item.old_value,
	        mark: "→",
	        newValue: item.new_value
	      };
	    } else if (item.field == "issueType") {
	      result = {
	        field: "種別",
	        oldValue: item.old_value,
	        mark: "→",
	        newValue: item.new_value
	      };
	    }

	    if (result) {
	      if (!result.oldValue) result.mark = "";
	    } else {
	      result = {};
	    }

	    return result;
	  },

	  analyzeChanges: function(data, changes) {
	    if (!changes) return;

	    var me = this;
	    data.changes = [];
	    changes.forEach(function(item){
	      var chg = me.convertChange(item);
	      if (chg.field == "diff") {
	        data.diff = chg;
	      } else {
	        data.changes.push(chg);
	      }
	    });
	  },

	  convertAttachments: function(endpoint, items) {
	    var results = [];
	    items.forEach(function(item){
	      try {
	        var fileName = item.name;
	        var ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
	        if (ext == "png" || ext == "jpg" || ext == "gif") {
	          results.push({
	              imageUrl: endpoint + "/ViewAttachmentImage.action?attachmentId=" + item.id,
	              id: item.id,
	              name: fileName,
	              size: item.size
	            });
	        }
	      } catch (err) {
	      }
	    });
	    return results;
	  },

	  createView: function(item) {
	    switch (item.type) {
	      case 5:
	      case 6:
	      case 7:
	        return this['Wiki'](item);
	      case 12:
	        return this['GitPush'](item);
	      case 8:
	      case 9:
	      case 10:
	      case 11:
	      case 13:
	        return this['File'](item);
	      case 15:
	      case 16:
	        return this['Join'](item);
	      default:
	        return this['Event'](item);
	    }
	  }
	}

	function loadBacklogSubEventViews(getTmplFunc){
	  var views = {};

	  views.EventView = Lfin.TemplateView.extend(getTmplFunc('BacklogEvent'),
	      function(me, evts){
	        me.views.changes =
	          new Lfin.ListView(me.findEl('.issueChanges'), 'issueChange');

	        me.views.attachments =
	          new Lfin.ListView(me.findEl('.issueAttachments'), 'imageAttachment');

	        me.load = function(done){
	          var cmtBody = me.findEl('.commentBody');
	          var diff = me.data.diff;
	          if (diff) {
	            cmtBody.innerHTML = marked(diff.newValue);
	          } else {
	            cmtBody.innerHTML = marked(me.data.desc || "");
	          }

	          done();
	        }
	      });

	  views.FileView = Lfin.TemplateView.extend(getTmplFunc('BacklogFileEvent'));

	  views.WikiView = Lfin.TemplateView.extend(getTmplFunc('BacklogWikiEvent'),
	      function(me, evts){
	        me.load = function(done){
	          var cmtBody = me.findEl('.commentBody');
	          cmtBody.innerHTML = marked(me.data.diff || "");
	          done();
	        }
	      });

	  views.JoinView = Lfin.TemplateView.extend(getTmplFunc('BacklogJoinEvent'));

	  views.GitPushView = Lfin.TemplateView.extend(getTmplFunc('BacklogGitPushEvent'),
	      function(me, evts){
	        me.views.commits =
	          new Lfin.ListView(me.findEl('.pushCommits'), 'pushCommit');
	      });

	  return views;
	}

	module.exports = BacklogEventViewFactory;


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function dateFormat(datestr) {
	  var NOW = new Date().getTime();
	  var dt = new Date(datestr);

	  var hour = dt.getHours();
	  var min = dt.getMinutes();
	  if (hour < 10) hour = " " + hour;
	  if (min < 10) min = "0" + min;

	  if (NOW - dt.getTime() < 3600000 * 12) {
	    return hour + ":" + min;
	  } else {
	    return (dt.getMonth() + 1) + "." + dt.getDate()
	      + " " + hour + ":" + min;
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var GithubTimeline = __webpack_require__(10);
	var GithubEventViewFactory = __webpack_require__(11);

	var GithubTimelineView = Lfin.TemplateView.extend("views/github.html",
	    function(me, evts){
	      var eventFactory = new GithubEventViewFactory(me.model.webUrl,
	        function(tmplId){
	          return me.findEl('#'+tmplId);
	        });

	      var ItemView = Lfin.TemplateView.extend(
	          me.findEl('#GitHubItem'),
	          function(me, evts){
	            me.load = function(done){
	              var eventView = eventFactory.createView(me.data);
	              if (eventView) {
	                me.add('item', eventView);
	                if (me.data.newArrival) {
	                  me.$el.addClass('newArrival');
	                }
	              }
	              done();
	            }
	          });

	      var eventList = new Lfin.ListView(me.findEl('.timelineBody'), ItemView);
	      me.views.eventList = eventList;

	      me.loadMore = function(newItems){
	        if (me.destroyed()) return;

	        newItems.reverse().forEach(function(item){
	          item.newArrival = true;
	          eventList.insertItem(item, 0);
	        });

	        me.$el.find('> header').addClass('newArrival');
	      }

	      me.destroyed = function() {
	        return !me.el.parentNode;
	      }
	    });


	exports.loadActivities = function(parentView, newArrival, col, cb){
	  var params = {
	    token: col.token,
	    endpoint: col.endpoint
	  };

	  if (params.endpoint && params.endpoint.match(/^https?\:\/\/github\.com\/?$/)) {
	    params.endpoint = null;
	  }

	  var tlModel = new GithubTimeline(params.token, params.endpoint);
	  tlModel.activate(col)
	  .then(function(result){
	    var timeline = new GithubTimelineView(result);

	    tlModel.watch('newArrived', function(data){
	        if (data.notify) {
	          newArrival.cast('notify', data.notify);
	        }
	        if (data.newItems.length > 0) {
	          timeline.loadMore(data.newItems);
	        }
	      });

	    parentView.add('timeline', timeline);
	    cb(tlModel, timeline);
	  })
	  .fail(function(){
	    alert("Can't fetch GitHub information");
	  });
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);

	function GithubTimeline(token, enterprizeUrl) {
	  Lfin.Core.call(this);

	  var params = { token: token };
	  if (enterprizeUrl) {
	    params.rootURL = enterprizeUrl + '/api/v3';
	  }

	  this.octo = new Octokat(params);
	  this.loginUser = null;
	  this.fetcher = null;
	  this.latestId = 0;
	  this.isPublic = !token;
	  this.webUrl = enterprizeUrl || 'https://github.com';
	}

	GithubTimeline.prototype = Object.create(Lfin.Core.prototype);

	GithubTimeline.prototype.activate = function(tlinfo) {
	  var me = this;
	  me.tlinfo = tlinfo;
	  me.interval = 60*1000;

	  var f = me.isPublic ? jQuery.Deferred().resolve(null) : me.octo.me.fetch();

	  return f.then(function(loginUser){
	      me.loginUser = loginUser || null;

	      if (tlinfo.kind == 'my_timeline') {
	        me.fetcher = me.octo.users(loginUser.login).receivedEvents;
	        tlinfo.value = loginUser.login;
	      } else if (tlinfo.kind == 'org') {
	        me.fetcher = me.octo.orgs(tlinfo.org).events;
	      } else if (tlinfo.kind == 'repo') {
	        me.fetcher = me.octo.repos(tlinfo.owner, tlinfo.repo).events;
	      } else if (tlinfo.kind == 'private') {
	        me.fetcher = me.octo.users(loginUser.login).events.orgs(tlinfo.value);
	      } else if (tlinfo.kind == 'public_timeline') {
	        me.fetcher = me.octo.events;
	        tlinfo.value = 'Public';
	      }
	      return me.fetcher.fetch({ per_page: 60 });
	    })
	    .then(function done(results){
	      me.latestId = results.length > 0 ? parseInt(results[0].id, 10) : 0;

	      var mentions = me.applyMention(results);
	      var data = {
	        name: tlinfo.caption,
	        url: "https://github.com/" + tlinfo.value,
	        eventList: results,
	        notify: tlinfo.notify || 'off'
	      };

	      setTimeout(function(){
	        me.loadNew()
	      }, me.interval);

	      return {
	        model: me,
	        data: data,
	        name: data.name,
	        notify: data.notify || 'off'
	      };
	    });
	}

	GithubTimeline.prototype.loadNew = function() {
	  var me = this;
	  if (me.interval === 0) return false;

	  me.fetcher.fetch()
	  .then(function(results){
	    var id, newCount = 0;
	    for (var i = 0, len = results.length; i < len; i++) {
	      id = parseInt(results[i].id, 10);
	      if (id <= me.latestId) break;
	      newCount++;
	    }

	    if (me.interval > 0) {
	      setTimeout(function(){
	        me.loadNew();
	      }, me.interval);
	    }

	    if (newCount === 0) return;

	    me.latestId = results.length > 0 ? parseInt(results[0].id, 10) : 0;

	    var newItems = results.slice(0, newCount);
	    var mentions = me.applyMention(newItems);

	    var notify = {
	      notify: me.tlinfo.notify || 'off',
	      title: 'GitHub ' +  me.tlinfo.caption,
	      message: newCount + ' new event(s)',
	      mentions: mentions
	    };

	    me.cast('newArrived', {
	      newItems: newItems,
	      notify: notify
	    });
	  });
	}

	GithubTimeline.prototype.stopAutoLoad = function() {
	  this.interval = 0;
	}

	const MENTION_BODIES = ['issue', 'comment', 'pullRequest'];

	GithubTimeline.prototype.applyMention = function(items) {
	  var mentions = 0;
	  var mention = '@' + this.loginUser.login;

	  items.forEach(function(item){
	    var d = item.payload;

	    if (d.body) {
	      if (d.body.indexOf(mention) > -1) {
	        item.mention = true; mentions++;
	        return;
	      }
	    }

	    MENTION_BODIES.some(function(field){
	      if (d[field] && d[field].body) {
	        if (d[field].body.indexOf(mention) > -1) {
	          item.mention = true; mentions++;
	          return true;
	        }
	      }
	    });
	  });

	  return mentions;
	}

	module.exports = GithubTimeline;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dateFormat = __webpack_require__(8);
	var Lfin = __webpack_require__(1);

	function GithubEventViewFactory(rootUrl, findSubviewElFunc) {
	  this.rootUrl = rootUrl;
	  this.views = loadGithubSubEventViews(findSubviewElFunc);
	}
	GithubEventViewFactory.prototype = {
	  createView: function(ghevt){
	    if (ghevt.type in this) {
	      return this[ghevt.type](ghevt);
	    } else {
	      //console.log('Unimplement type:' + ghevt.type);
	      //console.log(ghevt);
	      return null;
	    }
	  },
	  CommitCommentEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.mention = ghevt.mention;
	    data.rootUrl = this.rootUrl;
	    data.actor = data.comment.user;
	    data.repo = ghevt.repo;
	    data.sha = data.comment.commitId.substr(0, 6),
	    data.comment.createdAt = dateFormat(data.comment.createdAt);
	    return new this.views.CommitCommentView({ data: data });
	  },
	  CreateEvent: function(ghevt){
	    var data = ghevt.payload;
	    if (data.refType !== 'repository') return;

	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.repo.rootUrl = 'https://github.com';
	    data.createdAt = dateFormat(ghevt.createdAt);
	    data.octicon = 'repo';
	    return new this.views.CreateView({ data: data });
	  },
	  ForkEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.ForkView({ data: data });
	  },
	  GollumEvent: function(ghevt){
	    function convertPages(repoUrl, pages){
	      return pages.map(function(page){
	          return {
	            sha: page.sha.substr(0, 6),
	            action: page.action,
	            octicon: page.action === 'created' ? 'book' : 'pencil',
	            title: page.title,
	            htmlUrl: repoUrl + page.htmlUrl
	          }
	        });
	    }

	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    data.pages = convertPages('https://github.com', data.pages);
	    return new this.views.GollumView({ data: data });
	  },
	  IssuesEvent: function(ghevt){
	    var data = ghevt.payload.issue;
	    data.mention = ghevt.mention;
	    data.rootUrl = this.rootUrl;
	    data.octicon = 'issue-' + ghevt.payload.action;
	    data.action = ghevt.payload.action;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.IssuesView({ data: data });
	  },
	  IssueCommentEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.mention = ghevt.mention;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.octicon = data.issue.pullRequest ? 'git-pull-request' : 'issue-opened';
	    data.createdAt = dateFormat(ghevt.createdAt);
	    data.comment.createdAt = dateFormat(data.comment.createdAt);
	    return new this.views.IssueCommentView({ data: data });
	  },
	  MemberEvent: function(ghevt) {
	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.MemberView({ data: data });
	  },
	  PublicEvent: function(ghevt) {
	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.PublicView({ data: data });
	  },
	  PullRequestEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.mention = ghevt.mention;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    data.pullRequest.createdAt = dateFormat(data.pullRequest.createdAt);

	    if (data.action == 'opened') {
	      data.octicon = 'git-pull-request';
	    } else if (data.action == 'closed' && data.pullRequest.merged) {
	      data.action = 'merged';
	      data.octicon = 'git-merge';
	    } else {
	      data.octicon = 'circle-slash';
	    }

	    return new this.views.PullRequestView({ data: data });
	  },
	  PullRequestReviewCommentEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.mention = ghevt.mention;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    data.comment.createdAt = dateFormat(data.comment.createdAt);
	    return new this.views.PullRequestReviewCommentView({ data: data });
	  },
	  PushEvent: function(ghevt){
	    function convertCommits(repoUrl, commits){
	      return commits.map(function(commit){
	          return {
	            sha: commit.sha.substr(0, 6),
	            commitUrl: repoUrl + "/commit/" + commit.sha,
	            message: commit.message
	          }
	        });
	    }

	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.branch = data.ref.replace(/^refs\/heads\//, '');
	    data.shortSha = data
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.commits = convertCommits(this.rootUrl + "/" + data.repo.name, data.commits);
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.PushView({ data: data });
	  },
	  ReleaseEvent: function(ghevt){
	    console.log(ghevt)
	    var data = ghevt.payload.release;
	    data.rootUrl = this.rootUrl;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(data.publishedAt);
	    return new this.views.ReleaseView({ data: data });
	  },
	  WatchEvent: function(ghevt){
	    var data = ghevt.payload;
	    data.rootUrl = this.rootUrl;
	    data.actor = ghevt.actor;
	    data.repo = ghevt.repo;
	    data.createdAt = dateFormat(ghevt.createdAt);
	    return new this.views.WatchView({ data: data });
	  }
	};

	function loadGithubSubEventViews(getTmplFunc){
	  var views = {};

	  views.CommitCommentView
	    = Lfin.TemplateView.extend(getTmplFunc('CommitCommentEvent'),
	        function(me, evts){
	          me.load = function(done){
	            if (me.data.comment.diffHunk) {
	              me.findEl('.diffBody').innerHTML = convertDiffHunk(me.data.comment.diffHunk);
	            }
	            me.findEl('.commentBody').innerHTML = mark2Html(me.data.comment.body || '');
	            done();
	          }
	        });

	  views.CreateView = Lfin.TemplateView.extend(getTmplFunc('CreateEvent'));
	  views.ForkView = Lfin.TemplateView.extend(getTmplFunc('ForkEvent'));

	  views.IssuesView
	    = Lfin.TemplateView.extend(getTmplFunc('IssuesEvent'),
	        function(me, evts){
	          me.load = function(done){
	            var body = me.findEl('.issueBody');
	            if (me.data.action == 'opened') {
	              body.innerHTML = mark2Html(me.data.body || '');
	              if (me.data.mention) $(body).addClass('mentioned');
	            } else {
	              me.el.removeChild(body);
	            }
	            done();
	          }
	        });

	  views.IssueCommentView
	    = Lfin.TemplateView.extend(getTmplFunc('IssueCommentEvent'),
	        function(me, evts){
	          var issueBody = me.findEl('.issueBody');

	          $(issueBody).click(function(){
	            $(this).toggleClass('full');
	          });

	          me.load = function(done){
	            if (me.data.comment.body) {
	              if (me.data.issue.body) {
	                issueBody.innerHTML = mark2Html(me.data.issue.body);
	                if (me.data.mention) $(issueBody).addClass('mentioned');
	              }

	              var commentBody = me.findEl('.commentBody');
	              commentBody.innerHTML = mark2Html(me.data.comment.body || '');
	              if (me.data.mention) $(commentBody).addClass('mentioned');
	            } else if (me.data.issue.labels != null) {
	              var label = me.data.issue.labels[0];
	              issueBody.innerHTML = '<span style="background-color:#' + label.color + '">' + label.name + '</span>';
	            } else {
	              console.log(me.data.issue);
	            }
	            done();
	          }
	        });

	  views.MemberView = Lfin.TemplateView.extend(getTmplFunc('MemberEvent'));

	  views.PublicView = Lfin.TemplateView.extend(getTmplFunc('PublicEvent'));

	  views.PullRequestView
	    = Lfin.TemplateView.extend(getTmplFunc('PullRequestEvent'),
	        function(me, evts){
	          me.load = function(done){
	            var body = me.findEl('.pullReqBody');
	            if (me.data.action !== 'closed') {
	              if (me.data.pullRequest.body) {
	                body.innerHTML = mark2Html(me.data.pullRequest.body || '');
	                if (me.data.mention) $(body).addClass('mentioned');
	              }
	            } else {
	              me.el.removeChild(body);
	            }
	            done();
	          }
	        });

	  views.PullRequestReviewCommentView
	    = Lfin.TemplateView.extend(getTmplFunc('PullRequestReviewCommentEvent'),
	        function(me, evts){
	          var issueBody = me.findEl('.issueBody');

	          $(issueBody).click(function(){
	            $(this).toggleClass('full');
	          });

	          me.load = function(done){
	            me.findEl('.diffBody').innerHTML = convertDiffHunk(me.data.comment.diffHunk);

	            var commentBody = me.findEl('.commentBody');
	            commentBody.innerHTML = mark2Html(me.data.comment.body || '');
	            if (me.data.mention) $(commentBody).addClass('mentioned');
	            done();
	          }
	        });

	  views.ReleaseView = Lfin.TemplateView.extend(getTmplFunc('ReleaseEvent'));
	  views.WatchView = Lfin.TemplateView.extend(getTmplFunc('WatchEvent'));
	  views.PushView = Lfin.TemplateView.extend(getTmplFunc('PushEvent'),
	      function(me, evts){
	        me.views.commits =
	          new Lfin.ListView(me.findEl('.pushCommits'), 'pushCommit', null,
	            function(me, evts){
	              me.itemLoad = function(el, item) {
	                $('.msg', el).click(function(){
	                  $(this).toggleClass('expanded');
	                });
	              }
	            });
	      });

	  views.GollumView = Lfin.TemplateView.extend(getTmplFunc('GollumEvent'),
	      function(me, evts){
	        me.views.pages =
	          new Lfin.ListView(me.findEl('.gollumPageUpdates'), 'gollumPageUpdate');
	      });

	  return views;
	}

	function convertDiffHunk(dh) {
	  var lines = dh.split("\n");
	  var html = ['<p class="head">' + lines[0] + '</p>'];
	  for (var i = 1, len = lines.length; i < len; i++) {
	    var pm = lines[i].charAt(0);
	    if (pm === '+') {
	      html.push('<p class="plus">' + lines[i] + '</p>');
	    } else if (pm === '-') {
	      html.push('<p class="minus">' + lines[i] + '</p>');
	    } else {
	      html.push('<p class="normal">' + lines[i] + '</p>');
	    }
	  }
	  return html.join('');
	}

	var renderer = new marked.Renderer();
	renderer.heading = function(text, level, raw) {
	  return '<h'+level+'>'+text+'</h'+level+ '>\n';
	}

	function mark2Html(text) {
	  return marked(text, { renderer: renderer })
	}

	module.exports = GithubEventViewFactory;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var App = Lfin.App;
	var areas = {};

	areas.github  = __webpack_require__(13);
	areas.backlog = __webpack_require__(16);

	areas.index = function(me, evts){
	  me.box = 'subContentBox';
	}

	areas.timeline = function(me, evts){
	  var ColumnView =
	    Lfin.TemplateView.extend('column',
	      function(me, evts){
	        evts.remove_click = function() {
	          me.$el.fadeOut(300, function(){ me.$el.remove() });
	        }

	        evts.moveLeft_click = function() {
	          me.fire('move', { pos: -1, el: this.parentElement.parentElement });
	        }

	        evts.moveRight_click = function() {
	          me.fire('move', { pos: 1, el: this.parentElement.parentElement });
	        }

	        evts.widthSelect_change = function(){
	          me._data.width = this.value;
	        }

	        evts.notifySelect_change = function(){
	          me._data.notify = this.value;
	        }

	        me.load = function(done){
	          me.findEl('.widthSelect').value = me._data.width;
	          me.findEl('.notifySelect').value = me._data.notify || 'off';
	          me.findEl('.project').innerHTML = me._data.caption.split('/').join('/<wbr>');
	          done();
	        }
	      });

	  var showcase = me.views.showcase =
	      new Lfin.ListView('showcase', ColumnView, null,
	          function(me, evts){
	            evts.move = function(e){
	              var ctx = e.detail;

	              if (ctx.pos > 0) {
	                var nextEl = ctx.el.nextElementSibling;
	                if (nextEl) {
	                  me._removeEl(ctx.el);
	                  me.el.insertBefore(ctx.el, nextEl.nextElementSibling);
	                }
	              } else {
	                var prevEl = ctx.el.previousElementSibling;
	                if (prevEl) {
	                  me._removeEl(ctx.el);
	                  me.el.insertBefore(ctx.el, prevEl);
	                }
	              }
	            }
	          });

	  me.load = function(done) {
	    var timelines = me.context('timelines');
	    var newTimeline = me.context('newTimeline');

	    if (timelines) {
	      // Back from added timeline
	      if (newTimeline) timelines.push(newTimeline);
	    } else {
	      // Open at first
	      var timelines;
	      try {
	        var json = localStorage.getItem("timelines");
	        timelines = json ? JSON.parse(json) : [];
	      } catch(e) {
	        timelines = [];
	      }
	      me.context('timelines', timelines);
	    }

	    showcase.data = timelines;
	    done();
	  }

	  me.unload = function(){
	    var timelines = showcase.data;
	    if (me.needSave) {
	      localStorage.setItem("timelines", JSON.stringify(timelines));

	      var notifying = timelines.some(function(clumn){
	          return (clumn.notify != 'off');
	        });

	      if (notifying && ('Notification' in window)) {
	        Notification.requestPermission();
	      }
	    } else {
	      me.context('timelines', timelines);
	    }
	  }

	  evts.cancelButton_click = function(){
	    me.needSave = false;
	    App.go('setting/list');
	  }

	  evts.saveButton_click = function(){
	    me.needSave = true;
	    App.go('deck');
	  }
	}

	areas.port = function(me, evts){
	  evts.importButton_click = function(){
	    try {
	      var data = JSON.parse(me.el.querySelector('#snippet').value);
	      if (data.timelines) {
	        localStorage.setItem("defaults", JSON.stringify(data.defaults));
	        localStorage.setItem("timelines", JSON.stringify(data.timelines));
	        App.go('deck');
	      } else {
	        alert('Invalid data');
	      }
	    } catch (e) {
	      alert('Invalid JSON format');
	    }
	    return false;
	  }

	  evts.exportButton_click = function(){
	    var defaults = localStorage.getItem("defaults");
	        timelines = localStorage.getItem("timelines");
	    me.el.querySelector('#snippet').value = '{"defaults":'
	      + defaults + ',"timelines":' + timelines + '}';
	    return false;
	  }

	  evts.snippet_focus = function(){
	    this.select();
	  }
	}

	module.exports = areas;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var GithubClient = __webpack_require__(14);
	var Defaults = __webpack_require__(15);

	var App = Lfin.App;

	module.exports = function(me, evts) {
	  var client, clientParams = {};

	  var accountForm = me.views.accountForm =
	    new Lfin.FormView('accountForm', {
	      fields: 'githubToken gheUrl'
	    },
	    function(me, evts){
	      var selectList = new Lfin.ListView('githubTimelineSelect', 'githubTimelineItem');

	      evts.submit = function(e){
	        // Chop /
	        var gheUrlInput = me.findEl('input[name="gheUrl"]');
	        gheUrlInput.value = gheUrlInput.value.replace(/\/$/, '');

	        var d = me.data;
	        clientParams = {
	          token: d.githubToken,
	          gheUrl: d.gheUrl
	        };

	        client = new GithubClient(clientParams.token, clientParams.gheUrl);
	        client.activate()
	        .then(function(result){
	          var data = [{
	            caption: 'My Timeline',
	            value: 'my_timeline'
	          }];
	          result.orgs.forEach(function(org){
	              data.push({
	                  caption: org.login,
	                  value: org.login
	                });
	            });

	          selectList.data = data;
	          $('fieldset', repositoryForm.el).removeAttr('disabled');
	          $('fieldset', timelineForm.el).removeAttr('disabled');
	          $('fieldset', publicTimelineForm.el).removeAttr('disabled');
	        })
	        .fail(function(err){
	          selectList.data = [];
	          $('fieldset', repositoryForm.el).attr('disabled', 'disabled');
	          $('fieldset', timelineForm.el).attr('disabled', 'disabled');
	          $('fieldset', publicTimelineForm.el).attr('disabled', 'disabled');

	          clientParams = null;
	          alert('Failed to authenticate GitHub account by token');
	        });

	        return false;
	      }
	    });

	  var register = function(me, data) {
	    data.token = clientParams.token || null;
	    data.endpoint = clientParams.gheUrl || null;
	    data.service = 'github';
	    data.width = 'normal';
	    data.caption = data.value;

	    var arr = data.value.split('/');
	    if (arr.length === 1) {
	      data.org = arr[0];
	      data.kind = 'org';
	    } else {
	      data.owner = arr[0];
	      data.repo = arr[1];
	      data.kind = 'repo';
	    }

	    saveDefaults(clientParams);
	    App.go('setting/timeline', { newTimeline: data });
	  }

	  var repositoryForm = me.views.repositoryForm =
	    new Lfin.FormView('repositoryForm', {
	      fields: 'value'
	    },
	    function(me, evts){
	      evts.submit = function(e){
	        var data = me.data;
	        var parts = data.value.split('/');
	        var owner = parts[0],
	            repo = parts.length > 1 ? parts[1] : null;

	        client.fetchTarget(owner, repo)
	        .then(function(data){
	          register(me, me.data);
	        })
	        .fail(function(err){
	          alert('Failed to access repository');
	        })

	        return false;
	      }
	    });

	  var timelineForm = me.views.timelineForm =
	    new Lfin.FormView('yourTimelineForm', {
	      fields: 'value'
	    },
	    function(me, evts){
	      evts.submit = function(){
	        var data = me.data;
	        data.token = clientParams.token || null;
	        data.endpoint = clientParams.gheUrl || null;
	        data.service = 'github';
	        data.width = 'normal';
	        data.notify = 'off';
	        if (data.value !== 'my_timeline') {
	          data.kind = 'private';
	          data.caption = data.value;
	        } else {
	          data.kind = 'my_timeline';
	          data.caption = 'My Timeline';
	        }

	        saveDefaults(clientParams);
	        App.go('setting/timeline', { newTimeline: data });
	        return false;
	      }
	    });

	  var publicTimelineForm = me.views.publicTimelineForm =
	    new Lfin.FormView('publicTimelineForm', {
	      fields: 'value'
	    },
	    function(me, evts){
	      evts.submit = function(){
	        var data = {
	          service: 'github',
	          width: 'normal',
	          notify: 'off',
	          kind: 'public_timeline',
	          caption: 'Public Timeline',
	          token: clientParams.token || null,
	          endpoint: clientParams.gheUrl || null
	        };

	        saveDefaults(clientParams);
	        App.go('setting/timeline', { newTimeline: data });
	        return false;
	      }
	    });

	  evts.cancelButton_click = function(){
	    App.go('setting/timeline');
	  }

	  me.load = function(done) {
	    var data = Defaults.load().github || {};

	    accountForm.data = {
	      githubToken: data.token || null,
	      gheUrl: data.gheUrl || null
	    };

	    done();
	  }

	  var saveDefaults = function(params) {
	    if (params) {
	      Defaults.save('github', params);
	    }
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	function GithubClient(token, enterprizeUrl) {
	  var params = { token: token };
	  if (enterprizeUrl) {
	    params.rootURL = enterprizeUrl + '/api/v3';
	  }

	  this.octo = new Octokat(params);
	  this.loginUser = null;
	}

	GithubClient.prototype.activate = function(cb) {
	  var self = this;
	  return self.octo.me.fetch()
	    .then(function(user){
	      self.loginUser = user;
	      return self.octo.user.orgs.fetch();
	    })
	    .then(function(data){
	      return {
	        user: self.loginUser,
	        orgs: data
	      };
	    });
	}

	GithubClient.prototype.fetchTarget = function(owner, repo, cb) {
	  var self = this, fetcher;
	  if (repo) {
	    fetcher = this.octo.repos(owner, repo)
	  } else {
	    fetcher = this.octo.orgs(owner);
	  }

	  return fetcher.fetch()
	    .then(function(data){
	      return {
	        user: self.loginUser,
	        target: data
	      };
	    });
	}

	module.exports = GithubClient;


/***/ },
/* 15 */
/***/ function(module, exports) {

	var Defaults = {
	  load: function() {
	    var data = null;
	    try {
	      var json = localStorage.getItem('defaults');
	      if (json) data = JSON.parse(json);
	    } catch(e) {}
	    return data || {};
	  },
	  save: function(key, value) {
	    var defaults = this.load();
	    if (value !== undefined) {
	      defaults[key] = value;
	    } else if (key in defaults) {
	      delete defaults[key];
	    }
	    localStorage.setItem('defaults', JSON.stringify(defaults));
	  }
	}

	module.exports = Defaults;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Lfin = __webpack_require__(1);
	var BacklogClient = __webpack_require__(6);
	var Defaults = __webpack_require__(15);

	var App = Lfin.App;

	module.exports = function(me, evts){
	  var clientParams = {};
	  var projectList = null;

	  var selectList = new Lfin.ListView('projectSelect', 'projectItem');

	  var accountForm = me.views.accountForm =
	    new Lfin.FormView('accountForm', {
	      fields: 'backlogToken backlogUrl'
	    },
	    function(me, evts){
	      evts.submit = function(){
	        // Chop /
	        var blUrlInput = me.findEl('input[name="backlogUrl"]');
	        blUrlInput.value = blUrlInput.value.replace(/\/$/, '');

	        var d = me.data;
	        clientParams = {
	          token: d.backlogToken,
	          url: d.backlogUrl
	        };

	        var blClient = new BacklogClient(clientParams.token, clientParams.url);
	        blClient.loadProjects()
	        .then(function(projects){
	          projectList = [{
	            caption: 'My Timeline',
	            value: "space"
	          }];

	          projects.forEach(function(proj){
	              projectList.push({
	                  caption: proj.name,
	                  value: proj.projectKey
	                });
	            });

	          selectList.data = projectList;
	          $('fieldset', projectForm.el).removeAttr('disabled');
	        },
	        function(err){
	          selectList.data = [];
	          $('fieldset', projectForm.el).attr('disabled', 'disabled');

	          clientParams = null;
	          alert('Failed to authenticate Backlog account by token');
	          return;
	        });

	        return false;
	      }
	    });

	  var projectForm = me.views.projectForm =
	    new Lfin.FormView('projectForm', {
	      fields: 'value'
	    },
	    function(me, evts){
	      evts.submit = function(){
	        var data = me.data;

	        var tlinfo = {
	          token: clientParams.token || null,
	          endpoint: clientParams.url || null,
	          service: 'backlog',
	          width: 'normal',
	          notify: 'off'
	        }

	        if (data.value !== 'my_timeline') {
	          projectList.some(function(proj){
	              tlinfo.caption = proj.caption;
	              return (proj.value === data.value);
	            });

	          tlinfo.kind = 'project';
	          tlinfo.project = data.value;
	        } else {
	          tlinfo.kind = 'my_timeline';
	          tlinfo.caption = 'My Timeline';
	        }

	        saveDefaults(clientParams);
	        App.go('setting/timeline', { newTimeline: tlinfo });
	        return false;
	      }
	    });

	  evts.cancelButton_click = function(){
	    App.go('setting/timeline');
	  }

	  me.load = function(done) {
	    var data = Defaults.load().backlog || {};

	    accountForm.data = {
	      backlogToken: data.token || null,
	      backlogUrl: data.url || null
	    };

	    done();
	  }

	  var saveDefaults = function(params) {
	    if (params) {
	      Defaults.save('backlog', params);
	    }
	  }
	}


/***/ }
/******/ ]);