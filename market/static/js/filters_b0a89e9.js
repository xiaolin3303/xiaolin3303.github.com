define('market:static/js/filters', function(require, exports, module) {

  'use strict';
  
  Vue.filter('price', function (value) {
      return (value / 10000).toFixed(2);
  });

});
