define('market:static/js/utils/datamodel', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _staticJsPromiseJs = require('market:static/js/promise');
  
  var _staticJsUtilsAuth = require('static/js/utils/auth');
  
  var _staticJsUtilsAuth2 = _interopRequireDefault(_staticJsUtilsAuth);
  
  var _staticJsUtilsUtil = require('market:static/js/utils/util');
  
  var _staticJsUtilsUtil2 = _interopRequireDefault(_staticJsUtilsUtil);
  
  var clearUnvalidToken = function clearUnvalidToken(expireToken) {
      if (expireToken === _staticJsUtilsAuth2['default'].getToken()) {
          _staticJsUtilsAuth2['default'].setToken('');
      }
  };
  
  var dataModel = function dataModel(url, data) {
      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  
      opts = $.extend({
          type: 'POST',
          timeout: 5000,
          headers: {}
      }, opts);
  
      if (opts.headers.Authorization && opts.headers.Authorization.trim() === 'JWT') {
          // invalid JWT token
          delete opts.headers.Authorization;
      }
      var p = new _staticJsPromiseJs.Promise();
      $.ajax({
          url: url,
          data: data,
          type: opts.type,
          timeout: opts.timeout,
          dataType: 'json',
          cache: false,
          headers: opts.headers,
          beforeSend: function beforeSend(xhr) {
              xhr.withCredentials = true;
          },
          success: function success(ret, textStatus, request) {
              clearUnvalidToken(ret['gpj.expire_token']);
              if (ret.status === 'success') {
                  p.done(null, ret.result || ret.data, ret);
              } else {
                  if (ret.login_required === 'yes') {
                      _staticJsUtilsUtil2['default'].login({ type: 'direct' });
                  } else {
                      p.done(ret.message || ret.msg || '服务似乎有点问题，请重试');
                  }
              }
          },
          error: function error(request) {
              p.done('网络似乎有点问题，请重试');
          }
      });
  
      return p;
  };
  
  exports['default'] = dataModel;
  module.exports = exports['default'];

});
