/**
 * Created by milenstanev on 2/13/16.
 */
import io from 'lib/socket.io-client/socket.io.js';
import {ExtArray} from './lib/custom.ES2015.helpers/helper.js';

export function ChatsService($http, $timeout) {
  let URL = "";
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  let lostAnimals = new ExtArray();
  let foundAnimals = new ExtArray();
  let messages = new ExtArray();
  
  var socket = io.connect('10.0.1.2:3003');

  socket.on('connection', function (data) {
    console.log(data);
    //socket.emit('my other event', { my: 'data' });
  });

  socket.on('broadcastMsg', function (data) {
    if(data.secondaryId === currentCategory) {
      $timeout(() => {
        messages.push(data);
      });
    } else {
      console.log('mseg: ' + JSON.stringify(data));
    }
  });

  socket.on('disconnect', function () {
    console.log('disconnected');
  });

  let currentCategory;

  let service = {
    all: () => {
      return chats;
    },
    remove: (chat) => {
      chats.splice(chats.indexOf(chat), 1);
    },
    /**
     * TODO: implementation
     * @returns {*[]}
     */
    getCategory: (animal) => {
      switch (animal) {
        default:
          return [{
            id: 0,
            name: 'Lost dog ...',
            lastText: 'Lorem ipsum ...',
            face: 'img/ben.png'
          }]
      }
    },
    get: (chatId) => {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getDogs: () => {
      return [{
        id: 0,
        name: 'Lost dog ...',
        lastText: 'Lorem ipsum ...',
        face: 'img/ben.png'
      }]
    },

    getCategoriesLostAnimals: () => { // Categories
      return new Promise((resolve, reject) => {
        /*let res = [
         {
         cat: "cats",
         categoryDescription: "Lorem ipsum ..."
         },
         {
         cat: "dogs",
         categoryDescription: "Lorem ipsum ..."
         },
         {
         cat: "aa",
         categoryDescription: "dsfsdfsfdsf"
         }
         ];*/

        setTimeout(() => {
          resolve(res);
        }, 0);

      });
    },

    lostAnimals: lostAnimals,
    get_lostAnimals: (category) => {
      return new Promise((resolve, reject) => {
        lostAnimals.shiftAll();

        $http.get(`http://10.0.1.2:3003/api/lost-animals/${category}`)
          .then((res) => {
            lostAnimals.pushAll(res.data);
            resolve(lostAnimals);
          }, (error) => {
            reject(error);
          });
      });
    },

    foundAnimals: foundAnimals,
    get_foundAnimals: (category) => {
      return new Promise((resolve, reject) => {
        foundAnimals.shiftAll();

        $http.get(`http://10.0.1.2:3003/api/found-animals/${category}`)
          .then((res) => {
            foundAnimals.pushAll(res.data);
            resolve(foundAnimals);
          }, (error) => {
            reject(error);
        });

      });
    },

    add_lostAnimals: (category, data) => {
      data.animal = category;
      data.user = "tiulenski";

      return $http({
        url: `http://10.0.1.2:3003/api/lost-animals/${category}`,
        method: "POST",
        data: data,
        headers: {'Content-Type': 'application/json'}
      });
    },

    add_foundAnimals: (category, data) => {
      data.animal = category;
      data.user = "tiulenski";

      return $http({
        url: `http://10.0.1.2:3003/api/found-animals/${category}`,
        method: "POST",
        data: data,
        headers: {'Content-Type': 'application/json'}
      });
    },

    messages: messages,
    getMessages: (category) => {
      currentCategory = category;
      messages.shiftAll();

      $http({
        url: `http://10.0.1.2:3003/api/messages/${category}`,
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
        .success((res) => {
          messages.pushAll(res, true);
        })
        .error(() => {
          //TODO: implement errors
        })

    },
    sendMessages: (category, message, callBack) => {
      $http({
        url: `http://10.0.1.2:3003/api/messages/${category}`,
        method: "POST",
        data: {
          message: message,
          user: 'tiulenski'
        },
        headers: {'Content-Type': 'application/json'}
      })
        .success((res) => {
          socket.emit('message', res);
          callBack.call();
        })
        .error(() => {
          //TODO: implement errors
        })
    }

  };

  return service;
}

export function InternationalizationService($rootScope) {
  let defaultLang = "bg-BG";

  let langs = {
    "bg-BG": {
      "home": "Начало",
      "lost-animals": "Изгубени животни",
      "found-animals": "Намерени животни",
      "lost-dogs": "Изгубени кучета",
      "lost-cats": "Изгубени котки",
      "found-dogs": "Намерени кучета",
      "found-cats": "Намерени котки",
      "leave-message": "Изпратете съобщение",
      "submit": "Изпрати",
      "created-on": "Създадено на",
      "add-new": "Добави ново",
      "Dogs": "Kучета",
      "Cats": "Котки",
      "Back": "Назад"
    },
    "en-GB": {
      "lost-animals": "Lost animals"
    }
  };

  return {
    defaultLanguage: () => {
      $rootScope.i18n = langs[defaultLang];
    },
    changeLanguage: (lang) => {
      if(langs.hasOwnProperty(lang)) {
        $rootScope.i18n = langs[lang];
      } else { $log.warn(lang + ' do not exist') }
    }
  };
}

export class User {
  constructor($timeout) {
    this.$timeout = $timeout;

    this.userId = 0;
    this.nickname = "";
    this.userName = {
      surname: "",
      givenName: ""
    };
    this.userLanguage = "";
    this.token = "asd";
    this.isLoggedIn = false;

    this.checkIsLoggedIn();
  }

  checkIsLoggedIn() {
    let self = this;

    function applayChange(booleanParam) {
      self.$timeout(() => {
        self.isLoggedIn = booleanParam;

        return booleanParam;
      });
    }

    if(this.token) {
      if(!this.isLoggedIn) {
        applayChange(true);
      }
    } else {
      if(this.isLoggedIn) {
        applayChange(false);
      }
    }
  }
}
