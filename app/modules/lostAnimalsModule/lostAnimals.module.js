/**
 * Created by milenstanev on 2/11/16.
 */
import AnimalsModule from '../Shared/AnimalsModule.js';

class LostAnimals extends AnimalsModule {
  constructor() {
    super();

    this.config = {
      "moduleType": "Lost",
      "mainModule": "lostAnimals",
      "mainState": "lost-animals",
      "categories": [
        {
          "cat": "cats",
          "title": "lost-cats",
          "categoryDescription": "Lorem ipsum ..."
        },
        {
          "cat": "dogs",
          "title": "lost-dogs",
          "categoryDescription": "Lorem ipsum ..."
        },
        {
          "cat": "aa",
          "title": "lost-aa",
          "categoryDescription": "dsfsdfsfdsf"
        }
      ]
    };
  }
}

new LostAnimals().init();
