/**
 * Those dependencies are global....
 */
import io from 'lib/socket.io-client/socket.io.js';
import {ExtArray} from 'lib/custom.ES2015.helpers/helper.js';

export default ($http, $timeout) => {
    let URL = "";

    let lostAnimals = new ExtArray();
    let foundAnimals = new ExtArray();
    let messages = new ExtArray();

    var socket = io.connect();

    socket.on('connection', function (data) {
        console.log(data);
        //socket.emit('my other event', { my: 'data' });
    });

    /**
     * @desc Watching about socket event 'broadcastMsg' and if it's currently used category will add message in the messages collection.
     */
    socket.on('broadcastMsg', function (data) {
        if(data.secondaryId === currentCategory) {
            $timeout(() => {
                messages.unshift(data);
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

                $http.get(`/api/lost-animals/${category}`)
                    .then((res) => {

                        lostAnimals.pushAll(res.data).then(() => {
                            resolve(lostAnimals);
                        });

                    }, (error) => {
                        reject(error);
                    });
            });
        },

        foundAnimals: foundAnimals,
        get_foundAnimals: (category) => {
            foundAnimals.shiftAll();

            return new Promise((resolve, reject) => {
                $http.get(`/api/found-animals/${category}`)
                    .then((res) => {

                        foundAnimals.pushAll(res.data).then(() => {
                            resolve(foundAnimals);
                        });

                    }, (error) => {
                        reject(error);
                    });

            });
        },

        add_lostAnimals: (category, data) => {
            data.animal = category;
            data.user = "tiulenski";

            return $http({
                url: `/api/lost-animals/${category}`,
                method: "POST",
                data: data,
                headers: {'Content-Type': 'application/json'}
            });
        },

        add_foundAnimals: (category, data) => {
            data.animal = category;
            data.user = "tiulenski";

            return $http({
                url: `/api/found-animals/${category}`,
                method: "POST",
                data: data,
                headers: {'Content-Type': 'application/json'}
            });
        },

        messages: messages,
        getMessages: (category) => {
            currentCategory = category;
            messages.shiftAll();

            return new Promise((resolve, reject) => {
                $http({
                    url: `/api/messages/${category}`,
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                })
                    .success((res) => {

                        messages.pushAll(res, true).then(() => {
                            resolve(messages);
                        });

                    })
                    .error((error) => {
                        console.log(error);
                    });
            });

        },
        sendMessages: (category, message, callBack) => {
            $http({
                url: `/api/messages/${category}`,
                method: "POST",
                data: {
                    message: message,
                    user: 'tiulenski'
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success((res) => {
                    socket.emit('message', res); //TODO: should be service
                    callBack.call();
                })
                .error(() => {
                    //TODO: implement errors
                })
        }

    };

    return service;
}