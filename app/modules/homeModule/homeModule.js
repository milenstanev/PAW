/**
 * Created by milenstanev on 2/11/16.
 */
import welcomeModuleTpl from './defaultTpl.html!text';

(() => {
  angular.module("PAW.homeModule", [])
    .config(($stateProvider, $urlRouterProvider) => {
      $stateProvider
        .state('tab.home', { // Each tab has its own nav history stack:
          url: '/home',
          views: {
            'tab-welcome': {
              template: welcomeModuleTpl,
              controller: angular.noop
            }
          }
        })

      $urlRouterProvider.otherwise('/tab/welcome');
    })

})()
