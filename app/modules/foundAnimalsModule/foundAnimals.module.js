/**
 * Created by milenstanev on 2/11/16.
 */
import AnimalsModule from '../Shared/AnimalsModule.ES2015/index.js';

class FoundAnimals extends AnimalsModule {
  constructor() {
    super();

    this.config = {
      "moduleType": "Found",
      "mainModule": "foundAnimals",
      "mainState": "found-animals",
      "categories": [
        {
          "cat": "cats",
          "title": "found-cats",
          "categoryDescription": "Lorem ipsum ..."
        },
        {
          "cat": "dogs",
          "title": "found-dogs",
          "categoryDescription": "Lorem ipsum ..."
        }/*,
        {
          "cat": "aa",
          "title": "found-aa",
          "categoryDescription": "dsfsdfsfdsf"
        }*/
      ]
    };
  }
}

new FoundAnimals().init();
