import axios from "axios";

export default class LanguageService {

    constructor() {
        this.translations = [];
        this.languages = [
            {index: 0, name: 'lv'},
            {index: 1, name: 'en'},
            {index: 2, name: 'ru'},
        ];
        this.languageIndexMapping = {
            lv: 0,
            en: 1,
            ru: 2
        };
        this.currentLanguage = 0;
        this.loadTranslations();
    }

    translate(key) {
        if (typeof this.translations[key] !== 'undefined') {
            return this.translations[key].translations[this.currentLanguage];
        }
        return key;
    }

    setLanguageByIndex(languageIndex) {
        this.currentLanguage = languageIndex;
    }

    setLanguage(language) {
        if (typeof this.languageIndexMapping[language] !== 'undefined') {
            this.currentLanguage = this.languageIndexMapping[language];
        }
    }

    getLanguages() {
        return this.languages;
    }

    loadTranslations() {
        axios.get('/translations').then(response => {
            if (response.status === 200) {
                this.translations = response.data;
            }
        });
    }
}