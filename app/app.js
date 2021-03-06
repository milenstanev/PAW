/**
 * Run:
 *  sudo nodemon ./node_modules/.bin/babel-node --presets es2015 index.js
 *
 * Compile:
 *  babel --presets es2015 app.js --out-file app.compiled.js
 *  babel --presets es2015 app.js --out-file app.compiled.js --modules system
 *
 * Bundle:
 *  !! before that have to be called "jspm unbundle"
 *  jspm bundle app.js app.bundle.js
 *  jspm bundle app.js app.bundle.js --inject --minify
 *  jspm bundle app.js app.bundle.js --inject --minify --no-mangle
 *  jspm bundle app.js - lib/ionic/js/ionic.bundle.min.js app.bundle.js --inject --minify --no-mangle
 */

//region imports
import './lib/ionic/js/ionic.bundle.min.js';
import './modules/tabsModule/tabs.module.js';
import './modules/homeModule/homeModule.js';
import './modules/lostAnimalsModule/lostAnimals.module.js';
import './modules/foundAnimalsModule/foundAnimals.module.js';

//global services
import {
  UserService,
  ChatsService,
  InternationalizationService
} from 'app.service.js';
//endregion

(() => {
  angular.module('PAW', [
    'ionic',
    'PAW.tabsModule',
    'PAW.homeModule',
    'PAW.lostAnimalsModule',
    'PAW.foundAnimalsModule'
  ])
      .run(function($ionicPlatform, i18n) {
        $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
          }
          if(window.StatusBar) {
            StatusBar.styleDefault();
          }
        });

        i18n.defaultLanguage();
      })
      .service('UserService', UserService)
      .factory('Chats', ChatsService)
      .factory('i18n', InternationalizationService);

})();
