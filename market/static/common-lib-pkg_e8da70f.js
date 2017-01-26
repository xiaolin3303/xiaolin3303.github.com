;/*!/static/js/utils/url.js*/
define('market:static/js/utils/url', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var url = {
      /**
       获取get参数
       **/
      get: function get() {
  
          var getStr = location.href.split("?")[1].split("&");
          var param = [];
          getStr.forEach(function (item) {
              var key = item.split('=')[0];
              var value = item.split("=")[1];
              param[key] = value;
          });
          return param;
      },
      getHash: function getHash() {
  
          var hash = location.hash.match(/\?/) ? location.hash.split('?')[0] : location.hash;
          if (hash.substr(0, 1) == '#') {
              hash = hash.substr(1).split('/')[0];
          }
          return hash;
      },
  
      getPage: function getPage() {
          var hash = location.hash.match(/\?/) ? location.hash.split('?')[0] : location.hash;
          if (hash.substr(0, 1) == '#') {
              return hash.substr(1).split('/')[0];
          }
          return null;
      },
      /**
       * 将url参数部分解析成key/value形式
       * @param {string} url，格式key=value&key=value
       * @returns {Object} json对象{key:value,key:value}
       */
      urlToJSON: function urlToJSON(url) {
  
          // url = url || location.href.split('?')[1];
          // if(!url){
          //     return;
          // }
          // var result = {}, pairs = url.split('&'),
          //     i, keyValue, len;
          // for (i = 0, len = pairs.length; i < len; i++) {
          //     keyValue = pairs[i].split('=');
          //     result[keyValue[0]] = decodeURIComponent(keyValue[1]);
          // }
          // return result;
  
          var result = {};
          var hash = location.hash;
          var query = location.search;
  
          if (query) {
              query = query.replace(/^\?/, '');
  
              if (query) {
                  result = $.extend(result, this._parse(query));
              }
          }
  
          if (hash) {
              hash = hash.replace(/^#/, '');
              hash = String.prototype.split.call(hash, '?');
  
              if (hash[1]) {
                  result = $.extend(result, this._parse(hash[1]));
              }
          }
  
          return result;
      },
  
      _parse: function _parse(str) {
          var res = {};
          var pairs = str.split('&');
  
          for (var i = 0, len = pairs.length; i < len; i++) {
              var keyValue = pairs[i].split('=');
              res[keyValue[0]] = decodeURIComponent(keyValue[1]);
          }
  
          return res;
      },
  
      getHashParam: function getHashParam() {
          var result = {};
          var hash = location.hash;
  
          if (hash) {
              hash = hash.replace(/^#/, '');
              hash = String.prototype.split.call(hash, '?');
  
              if (hash[1]) {
                  result = this._parse(hash[1]);
              }
          }
  
          return result;
      },
      /**
       * json转换为url
       * @param {Object} json数据
       * @returns {string} url
       */
      jsonToUrl: function jsonToUrl(json) {
          if (!json) {
              return '';
          }
          var arr = [],
              key;
          for (key in json) {
              if (json.hasOwnProperty(key)) {
                  arr.push(key + '=' + encodeURIComponent(json[key]));
              }
          }
          return arr.join('&');
      },
      /**
       * 将json对象格式化为请求串
       * @param {Object} Json对象
       * @param {Function} 编码函数
       */
      jsonToQuery: function jsonToQuery(json, encode) {
          var s = [],
              n,
              value;
  
          encode = encode || function (v) {
              return v;
          };
          for (n in json) {
              if (json.hasOwnProperty(n)) {
                  value = json[n];
                  if (value) {
                      s.push(n + '=' + encode(value));
                  }
              }
          }
          return s.join('&');
      },
  
      navigate: function navigate(param) {
          var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
          opts = $.extend({
              extend: false,
              type: 'direct',
              replace: false,
              trigger: false
          }, opts);
  
          var url = '';
          var page = param.page || this.getPage() || 'main';
          delete param.page;
  
          if (param.url) {
              url = param.url;
          } else {
              var hashParam = param;
  
              if (opts.extend === true) {
                  hashParam = $.extend(this.getHashParam(), param);
              }
  
              url = "#" + page + "?" + this.jsonToUrl(hashParam);
          }
  
          if (opts.type === 'pushState') {
              if (opts.replace === true) {
                  if (window.history.replaceState) {
                      window.history.replaceState({ page: page }, '', url);
                  }
                  if (opts.trigger === true) {
                      listener.trigger('page', 'reload');
                  }
              } else {
                  if (window.history.pushState) {
                      window.history.pushState({ page: page }, '', url);
                  }
              }
          } else {
              location.hash = url;
          }
      }
      // ,
      //
      // /**
      //  * 无刷新改变地址栏
      //  * @param {Object} json 记录的页面状态对象
      //  * @param {string} page 页面名称
      //  */
      // changeUrl: function (json, page) {
      //     // hash 放在query后面,用了这个方法后,点返回,不会触发hashchange
      //     var url = '#' + page + '?' + this.jsonToUrl(json);
      //     if (window.history.replaceState) {
      //         window.history.replaceState({page: page}, '', url);
      //     }
      // }
      // /**
      //  * 把一个键值记录到url中
      //  * @param {string} key 记录的key
      //  * @param {string} value 记录的value
      //  */
      // recordByUrl: function (key, value, page) {
      //     var urlObject = this.urlToJSON();
      //     var hash = window.location.hash.split('?')[0].split('#')[1];
      //     var page = page || hash;
      //     urlObject[key] = value;
      //     this.changeUrl(urlObject, page);
      // }
  };
  
  exports["default"] = url;
  module.exports = exports["default"];

});

;/*!/static/js/controller.js*/
define('market:static/js/controller', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _staticJsUtilsUrl = require('market:static/js/utils/url');
  
  var _staticJsUtilsUrl2 = _interopRequireDefault(_staticJsUtilsUrl);
  
  var Control = (function () {
      function Control() {
          var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
          _classCallCheck(this, Control);
  
          // set default
          this.rootWrapper = data.wrapper || '#page-wrapper';
  
          $(this.rootWrapper).removeClass();
          this._page_ = _staticJsUtilsUrl2['default'].getPage();
          this.init && this.init(data);
      }
  
      _createClass(Control, [{
          key: '_isCurrentPage',
          value: function _isCurrentPage() {
              return _staticJsUtilsUrl2['default'].getPage() === this._page_;
          }
      }, {
          key: 'pageLoaded',
          value: function pageLoaded() {
              // must call this method when page is ready to hide loading animation
              // commonly when page data is ready to call
              if (this._isCurrentPage()) {
                  $('#page-loading').hide();
              }
          }
      }, {
          key: 'pageLoadError',
          value: function pageLoadError() {
              // call this method when error occurs on page loading
              // this method will append a page error tip and a retry mechanism
              // commonly when the interface is error to call
              if (this._isCurrentPage()) {
                  $('#page-loading').hide();
                  $('#page-wrapper').html('<div class="page-error">加载页面失败，点击重试</div>');
              }
          }
      }]);
  
      return Control;
  })();
  
  exports['default'] = Control;
  module.exports = exports['default'];

});

;/*!/static/js/filters.js*/
define('market:static/js/filters', function(require, exports, module) {

  'use strict';
  
  Vue.filter('price', function (value) {
      return (value / 10000).toFixed(2);
  });

});

;/*!/static/js/promise.js*/
define('market:static/js/promise', function(require, exports, module) {

  /*
   *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
   *  Licensed under the New BSD License.
   *  https://github.com/stackp/promisejs
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  function Promise() {
      this._callbacks = [];
  }
  
  Promise.prototype.then = function (func, context) {
      var p;
      if (this._isdone) {
          p = func.apply(context, this.result);
      } else {
          p = new Promise();
          this._callbacks.push(function () {
              var res = func.apply(context, arguments);
              if (res && typeof res.then === 'function') res.then(p.done, p);
          });
      }
      return p;
  };
  
  Promise.prototype.done = function () {
      this.result = arguments;
      this._isdone = true;
      for (var i = 0; i < this._callbacks.length; i++) {
          this._callbacks[i].apply(null, arguments);
      }
      this._callbacks = [];
  };
  
  function join(promises) {
      var p = new Promise();
      var results = [];
  
      if (!promises || !promises.length) {
          p.done(results);
          return p;
      }
  
      var numdone = 0;
      var total = promises.length;
  
      function notifier(i) {
          return function () {
              numdone += 1;
              results[i] = Array.prototype.slice.call(arguments);
              if (numdone === total) {
                  p.done(results);
              }
          };
      }
  
      for (var i = 0; i < total; i++) {
          promises[i].then(notifier(i));
      }
  
      return p;
  }
  
  function chain(funcs, args) {
      var p = new Promise();
      if (funcs.length === 0) {
          p.done.apply(p, args);
      } else {
          funcs[0].apply(null, args).then(function () {
              funcs.splice(0, 1);
              chain(funcs, arguments).then(function () {
                  p.done.apply(p, arguments);
              });
          });
      }
      return p;
  }
  
  /*
   * AJAX requests
   */
  
  function _encode(data) {
      var payload = "";
      if (typeof data === "string") {
          payload = data;
      } else {
          var e = encodeURIComponent;
          var params = [];
  
          for (var k in data) {
              if (data.hasOwnProperty(k)) {
                  params.push(e(k) + '=' + e(data[k]));
              }
          }
          payload = params.join('&');
      }
      return payload;
  }
  
  function new_xhr() {
      var xhr;
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          try {
              xhr = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
      }
      return xhr;
  }
  
  function ajax(method, url, data, headers) {
      var p = new Promise();
      var xhr, payload;
      data = data || {};
      headers = headers || {};
  
      try {
          xhr = new_xhr();
      } catch (e) {
          p.done(promise.ENOXHR, "");
          return p;
      }
  
      payload = _encode(data);
      if (method === 'GET' && payload) {
          url += '?' + payload;
          payload = null;
      }
  
      xhr.open(method, url);
  
      var content_type = 'application/x-www-form-urlencoded';
      for (var h in headers) {
          if (headers.hasOwnProperty(h)) {
              if (h.toLowerCase() === 'content-type') content_type = headers[h];else xhr.setRequestHeader(h, headers[h]);
          }
      }
      xhr.setRequestHeader('Content-type', content_type);
  
      function onTimeout() {
          xhr.abort();
          p.done(promise.ETIMEOUT, "", xhr);
      }
  
      var timeout = promise.ajaxTimeout;
      if (timeout) {
          var tid = setTimeout(onTimeout, timeout);
      }
  
      xhr.onreadystatechange = function () {
          if (timeout) {
              clearTimeout(tid);
          }
          if (xhr.readyState === 4) {
              var err = !xhr.status || (xhr.status < 200 || xhr.status >= 300) && xhr.status !== 304;
              p.done(err, xhr.responseText, xhr);
          }
      };
  
      xhr.send(payload);
      return p;
  }
  
  function _ajaxer(method) {
      return function (url, data, headers) {
          return ajax(method, url, data, headers);
      };
  }
  
  exports["default"] = {
      Promise: Promise,
      join: join,
      chain: chain,
      ajax: ajax,
      get: _ajaxer('GET'),
      post: _ajaxer('POST'),
      put: _ajaxer('PUT'),
      del: _ajaxer('DELETE'),
  
      /* Error codes */
      ENOXHR: 1,
      ETIMEOUT: 2,
  
      /**
       * Configuration parameter: time in milliseconds after which a
       * pending AJAX request is considered unresponsive and is
       * aborted. Useful to deal with bad connectivity (e.g. on a
       * mobile network). A 0 value disables AJAX timeouts.
       *
       * Aborted requests resolve the promise with a ETIMEOUT error
       * code.
       */
      ajaxTimeout: 0
  };
  module.exports = exports["default"];

});

;/*!/static/js/widget.js*/
define('market:static/js/widget', function(require, exports, module) {

  /* globals INTERFACE_FATAL_ERROR */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  var Widget = (function () {
      var self;
      var _init = function _init(data) {
          if (!data._containerDom_) {
              // console.log('widget container is not exists!');
              return;
          }
          self._containerDom_ = data._containerDom_;
          self._data_ = data;
          self._load_error = false;
          if (self._data_._error_ === INTERFACE_FATAL_ERROR) {
              self._load_error = true;
          }
  
          if (self.init && $.isFunction(self.init)) {
              self.init(data);
          }
      };
  
      function Widget(data) {
          _init(data);
      }
  
      Widget.prototype._setLoadError = function (flag) {
          var _data_ = this._data_;
          if (flag) {
              _data_._error_ = INTERFACE_FATAL_ERROR;
          } else {
              _data_._error_ = '';
          }
          this._load_error = !!flag;
      };
  
      Widget.prototype.display = function (data, tpl) {
          var type = arguments.length <= 2 || arguments[2] === undefined ? 'vue' : arguments[2];
  
          var me = this;
          var _data_ = this._data_;
          var container = this._containerDom_;
          var vm = null;
          container.empty();
  
          var errorTpl = '<div class="wrapper">\
                          <div class="error-img"></div>\
                          <p class="info">加载失败，点击重新加载</p>\
                          </div>';
  
          if (_data_._error_ === INTERFACE_FATAL_ERROR) {
              tpl.find('.content-wrapper').remove();
              tpl.find('.error-wrapper').empty().append($(errorTpl));
          } else if (type === 'vue') {
              vm = new Vue({
                  el: container.get(0),
                  data: data,
                  template: tpl,
                  methods: me.method,
                  watch: me.watch
              });
  
              return vm;
          } else if (type === 'native') {
              var tpl = $(tpl(data));
              container.empty();
              container.append(tpl);
              return tpl;
          }
  
          // tpl.appendTo(container);
  
          // container.find('.error-wrapper').on('click', function () {
          //     me._last_reload_time = +new Date();
          //     $(this).find('.info').text('重新加载中...');
          //     me.reload();
          // });
      };
  
      Widget.prototype.reload = function () {
          // throw new Error('must implement reload function in widget!');
      };
  
      Widget.prototype.revertErrorTip = function () {
          var _data_ = this._data_;
          var container = this._containerDom_;
  
          var currentTime = +new Date();
          var timeLimit = 500;
  
          var timeDiff = currentTime - this._last_reload_time;
          if (timeDiff >= timeLimit) {
              container.find('.error-wrapper .info').text('加载失败，点击重新加载');
          } else {
              setTimeout(function () {
                  container.find('.error-wrapper .info').text('加载失败，点击重新加载');
              }, timeLimit - timeDiff);
          }
      };
      /**
       * 根据传进来的对象实例扩展组件基类，会返回child而不是Widget是因为如果在Widget基类上直接扩展，多个组件会相互影响
       * @param  {Object} obj 组件对象实例
       * @return {function}  扩展Widget基类后的组件构造函数
       */
      Widget.extend = function (obj) {
          var parent = this;
          var child = function child() {
              self = this;
              return parent.apply(this, arguments);
          };
          var Surrogate = function Surrogate() {
              this.constructor = child;
          };
          Surrogate.prototype = parent.prototype;
          child.prototype = new Surrogate();
          Surrogate = null;
          $.extend(child.prototype, obj);
          child.createWidget = function (data) {
              new child(data);
          };
          return child;
      };
      return Widget;
  })();
  
  exports['default'] = Widget;
  module.exports = exports['default'];

});

;/*!/route/route.js*/
/**
 * 此处需要声明 require.async所有的可能值
 * @require.async market:controller/detail/detailControl.js
 * <!-- require resource map hook -->
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _staticJsUtilsUrlJs = require('market:static/js/utils/url');

var _staticJsUtilsUrlJs2 = _interopRequireDefault(_staticJsUtilsUrlJs);

var Router = (function () {
    function Router() {
        _classCallCheck(this, Router);

        this.DEFUALT_PAGE = 'main';
    }

    /**
    *  route init
    **/

    _createClass(Router, [{
        key: 'init',
        value: function init() {
            var me = this;
            this.navigation();

            listener.on('page', 'reload', function () {
                me.navigation();
            });

            window.addEventListener('hashchange', function () {
                listener.trigger('hash', 'change');
                me.navigation();
            }, false);
        }
    }, {
        key: 'navigation',
        value: function navigation() {
            var uri = location.hash.split('?');
            uri = uri[0].replace(/^#/, '');
            uri = '/' + uri;

            var currentPage = _staticJsUtilsUrlJs2['default'].getPage();
            $('#page-loading').show();
            var me = this;
            var page = _staticJsUtilsUrlJs2['default'].getPage() || this.DEFUALT_PAGE;
            var pageParam = page.split('_');
            var controller = pageParam.pop();
            var dir = pageParam.join('/');
            dir = dir ? dir + '/' : '';

            var path = 'market:controller/' + dir + controller + '/' + controller + 'Control.js';

            listener.trigger('page', 'change');

            _APP_HASH = _staticJsUtilsUrlJs2['default'].urlToJSON();
            require.async(path, function (controller) {
                if (_staticJsUtilsUrlJs2['default'].getPage() === currentPage) {
                    try {
                        new controller();
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        }
    }]);

    return Router;
})();