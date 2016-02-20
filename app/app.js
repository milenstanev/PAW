/**
 * Compile:
 *  babel --presets es2015 app.js --out-file app.compiled.js
 *  babel --presets es2015 app.js --out-file app.compiled.js --modules system
 * Bundle:
 *  jspm bundle app.js app.bundle.js
 */

//region imports
import './lib/ionic/js/ionic.bundle.js';
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
