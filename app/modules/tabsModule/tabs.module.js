import tabsTpl from './defaultTpl.html!text';

(() => {
  "use strict";
  angular.module("PAW.tabsModule", [])
    .config(($stateProvider) => {
      $stateProvider
        .state('tab', { // setup an abstract state for the tabs directive
          url: '/tab',
          abstract: true,
          template: tabsTpl
        })
        .state('tab.user', {
          url: '/user',
          views: {
            'user': {
              templateUrl: 'templates/formTest.html',
              controller: function () {

              }
            }
          }
        })
    })
    .directive('markRequired', function ($compile) {
      return {
        restrict: 'A',
        require: "form",
        scope: true,
        link: function (scope, element, attr, form) {
          var labelBuffer,
              inputBuffer,
              formItems = element.find('fieldset');

          angular.forEach(formItems, function ($item, key) {
            labelBuffer = $item.getElementsByTagName('LABEL')[0];
            inputBuffer = $item.getElementsByTagName('INPUT')[0];

            inputBuffer.setAttribute("required", "required");
          });

          $compile(element.contents())(scope);
        }
      };
    });
})();
