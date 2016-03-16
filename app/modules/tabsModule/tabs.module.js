import tabsTpl from './defaultTpl.html!text';

(() => {
  "use strict";
  angular.module("PAW.tabsModule", [])
      .config(function ($stateProvider) {

          $stateProvider
              .state('users', {
                  url: "/users/:contactId",
                  template: 'contacts.detail.html',
                  controller: function ($stateParams) {
                      console.log($stateParams);
                  }
              })

          /*$routeProvider
            .when('/access_token=:accessToken', {
              template: '',
              controller: function ($location,$rootScope) {
                  debugger
                var hash = $location.path().substr(1);

                var splitted = hash.split('&');
                var params = {};

                for (var i = 0; i < splitted.length; i++) {
                  var param  = splitted[i].split('=');
                  var key    = param[0];
                  var value  = param[1];
                  params[key] = value;
                  $rootScope.accesstoken=params;
                }
                $location.path("/about");
              }
            })*/
      })
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
