define('market:controller/detail/detailControl', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _staticJsControllerJs = require('market:static/js/controller');
  
  var _staticJsControllerJs2 = _interopRequireDefault(_staticJsControllerJs);
  
  var style = ".market-detail-page .cover{width:100%;display:block}.market-detail-page .poetry{padding:30px 50px}.market-detail-page .poetry p{line-height:30px}.market-detail-page .poetry .end{display:inline-block;height:5px;width:5px;border:2px solid red;border-radius:50%}";
  var tpl = "<div class=\"market-detail-page\">\n\t<img src=\"https://xiaolin3303.github.io/market/static/img/collections/work1_7d3974b.png\" alt=\"\" class=\"cover\">\n\t<div class=\"poetry\">\n\t\t<p>渊池深</p>\n\t\t<p>北冥秋</p>\n\t\t<p>鱼鸟不分水与云</p>\n\t\t<p>水云不辨山和月</p>\n\t\t<p><i class=\"end\"></i></p>\n\t</div>\n</div>";
  
  require.loadCss({
      name: 'market-detail-page-style',
      content: style
  });
  
  var DetailControl = (function (_Control) {
      _inherits(DetailControl, _Control);
  
      function DetailControl() {
          var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
          _classCallCheck(this, DetailControl);
  
          _get(Object.getPrototypeOf(DetailControl.prototype), 'constructor', this).call(this, data);
      }
  
      _createClass(DetailControl, [{
          key: 'init',
          value: function init(data) {
              var me = this;
              new Vue({
                  el: this.rootWrapper,
                  template: tpl,
                  ready: function ready() {
                      me.pageLoaded();
                  }
              });
          }
      }]);
  
      return DetailControl;
  })(_staticJsControllerJs2['default']);
  
  exports['default'] = DetailControl;
  module.exports = exports['default'];

});
