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
