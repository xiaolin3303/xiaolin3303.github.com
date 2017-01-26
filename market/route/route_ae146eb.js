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