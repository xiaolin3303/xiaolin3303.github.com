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
