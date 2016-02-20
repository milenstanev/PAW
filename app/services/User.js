export default class User {
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