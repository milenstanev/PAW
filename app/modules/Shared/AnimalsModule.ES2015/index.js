/**
 * Created by milenstanev on 2/11/16.
 */
import ModuleGenerator from './ModuleGenerator.js'; //TODO: change it to generic names

  export default class Module {
    constructor() {
      this.config = undefined;
    }

    get asd() {
      console.log('asd');
    }

    set asd(str) {
      this.asd = str;
      console.log(this.asd)
    }

    init() {

      let moduleConfig = (() => {
        /**
         * because of this we are able to handle object and JSON at same time
         */
        return typeof this.config === "object" ? this.config : JSON.parse(this.config)
      })();

      let modulesStringCollection = [];
      let linksDataCollection = [];
      let mainModule = moduleConfig.mainModule;
      let mainState = moduleConfig.mainState;

      (() => {
        let configChildModules;
        let categories = moduleConfig.categories;
        let len = moduleConfig.categories.length;

        while(len--) {
          /**
           * The constructor/class will instantiate angular modules for each category|animal
           */
          configChildModules = {
            category: categories[len].cat,
            Category: categories[len].cat.charAt(0).toUpperCase() + categories[len].cat.slice(1),
            mainModule: mainModule,
            mainState: mainState
          };

          //TODO: check whats happened here after latest update
          new ModuleGenerator().init(configChildModules);

          /**
           * Generate Modules Names in order to be assigned as dependencies on current module "`PAW.${mainModule}Module`"
           */
          modulesStringCollection.push(
            `PAW.${mainModule}.${configChildModules.Category}Module`
          );

          /**
           * url's assigned to the category link list
           */
          linksDataCollection.push({
            title: categories[len].title,
            description: categories[len].categoryDescription,
            url: mainState,
            id: configChildModules.category
          });
        }

      })();

      //region Old way of instantiating modules
      /**
       * Cats Angular Module
       * instantiate "PAW.lostAnimalsModule.lostCatsModule"
       */
      /*new LostAnimal().init({
       animal: "cats",
       Animal: "Cats",
       mainModule: mainModule,
       mainState: mainState
       });*/

      /**
       * Dogs Angular Module
       * instantiate "PAW.lostAnimalsModule.lostCatsModule"
       */
      /*new LostAnimal().init({
       animal: "dogs",
       Animal: "Dogs",
       mainModule: mainModule,
       mainState: mainState
       });*/
      //endregion

      angular.module(`PAW.${mainModule}Module`, modulesStringCollection/*[
         `PAW.${mainModule}.CatsModule`,
         `PAW.${mainModule}.DogsModule`
         ]*/)
        .config(($stateProvider, $urlRouterProvider) => {
          $stateProvider.state(`tab.${mainState}`, {
            url: `/${mainState}`,
            views: (() => {
              let views = {};
              views[`${mainState}`] = {};
              views[`${mainState}`][`templateUrl`] = 'templates/links-list.html';
              views[`${mainState}`][`controller`] = `${mainModule}Ctrl as ctrl`;

              return views;
            })()
          });

          $urlRouterProvider.otherwise(`/tab/${mainState}`);
        })
        .controller(`${mainModule}Ctrl`, class {
          constructor($rootScope) {

            this.viewTtitle = $rootScope.i18n[mainState] || mainState;
            this.links = linksDataCollection;
          }
        });
    }
  }
