/**
 * Created by milenstanev on 2/11/16.
 */
export default class LostCategorysAngularModule { //TODO: change it to something generic
  init(config) {
    angular.module(`PAW.${config.mainModule}.${config.Category}Module`, [])
      .config(($stateProvider) => {
        $stateProvider
          .state(`tab.${config.mainState}-${config.category}`, {
            url: `/${config.mainState}/${config.category}`,
            views: (() => {
              /**
               views: {
                  ${config.mainState}-${config.category}: {
                    templateUrl: tpl,
                    controller: ctrl'
                  }
                }
               */
              let views = {};
              views[`${config.mainState}`] = {};
              views[`${config.mainState}`][`templateUrl`] = 'templates/tab-chats.html';
              views[`${config.mainState}`][`controller`] = `${config.mainModule}.${config.Category}.ChatsCtrl as ctrl`;

              return views;
            })()
          })
          .state(`tab.${config.mainState}-${config.category}-add-new`, {
            url: `/${config.mainState}/${config.category}/add-new`,
            views: (() => {
              /**
               views: {
                  ${config.mainState}-${config.category}: {
                    templateUrl: tpl,
                    controller: ctrl'
                  }
                }
               */
              let views = {};
              views[`${config.mainState}`] = {};
              views[`${config.mainState}`][`templateUrl`] = 'templates/add-new-tab-chats.html';
              views[`${config.mainState}`][`controller`] = `${config.mainModule}.${config.Category}.ChatsAddNewCtrl as ctrl`;

              return views;
            })()
          })
          .state(`tab.${config.mainState}-${config.category}-chat`, {
            url: `/${config.mainState}/${config.category}/:chatId`,
            //TODO: could be constructor/class
            views: (() => {
              /**
               views: {
                  ${config.mainState}-${config.category}: {
                    templateUrl: tpl,
                    controller: ctrl'
                  }
                }
               */
              let views = {};
              views[`${config.mainState}`] = {};
              views[`${config.mainState}`][`templateUrl`] = 'templates/chat-detail.html';
              views[`${config.mainState}`][`controller`] = `${config.mainModule}.${config.Category}.ChatDetailCtrl as ctrl`;

              return views;
            })()
          });
      })
      .factory(`${config.mainModule}.${config.Category}.factory`, () => {

      })
      .controller(`${config.mainModule}.${config.Category}.ChatsCtrl`, class {
        constructor($scope, $rootScope, $timeout, Chats, UserService) {
          this.state = 'initial';
          this.chats = Chats[`${config.mainModule}`]; // Chats['foundAnimals' or 'foundAnimals']
          this.category = config.category;
          this.user = UserService;
          this.url = `${config.mainState}/${config.category}`;
          this.viewTtitle = $rootScope.i18n[config.Category] || config.Category; //should be i18n key at the end


          Chats[`get_${config.mainModule}`](config.category).then(
            (data) => {
              /**
               * The timeout is because the $scope don't make $digest for 'this.state' from time to time and we can't change the state in the template
               */
              $timeout(() => {
                if(!data.length) {
                  this.state = 'no-data';
                } else {
                  this.state = 'ready';
                }
              });
            },
            (error) => {
              this.state = 'error';
            }
          );

          $scope.$on('$destroy', () => {
            if(this.chats)
              this.chats.shiftAll();
          });

          this.states = {
            toggleAddNew: false
          }
        }
      })
      .controller(`${config.mainModule}.${config.Category}.ChatsAddNewCtrl`, class {
        constructor(Chats) {
          //TODO: require authentication
          this.fromData = undefined;

          this.add = () => {
            Chats[`add_${config.mainModule}`](config.category, this.fromData)
              .success((res) => {
                Chats[`${config.mainModule}`].unshift(res);
                history.back();
              })
              .error(() => {
                //TODO: implement errors
              })
          }
        }
      })
      .controller(`${config.mainModule}.${config.Category}.ChatDetailCtrl`, class {
        constructor($stateParams, Chats, $timeout) {
          this.state = 'initial';
          this.newMessage = '';
          this.messagesData = Chats.messages;

          Chats.getMessages($stateParams.chatId).then(
              // Success
              (data) => {
                $timeout(() => {
                  if(!data.length) {
                    this.state = 'no-data';
                  } else {
                    this.state = 'ready';
                  }
                });
              },
              // Error
              (error) => {
                //TODO: implementation
                this.state = 'error';
              }
          );

          //sendMessages
          this.send = () => {
            if(this.newMessage) {
              Chats.sendMessages(
                $stateParams.chatId,
                this.newMessage,
                () => {
                  this.newMessage = "";
                }
              );
            }
          }
        }
      });
  }
}
