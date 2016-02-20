export default ($rootScope) => {
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
            "Back": "Назад",
            "loading": "Зарежда"
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