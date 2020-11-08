import '@fortawesome/fontawesome-free/js/all.js';
import Vue from 'vue';
import App from './gui/GuiOverlay.vue';
import LanguageService from './gui/Services/LanguageService.js';

if(document.getElementById('gui')) {
    const languageServiceObservable = Vue.observable(new LanguageService());
    const AppRoot = Vue.extend(App);
    new AppRoot({
        el: '#gui',
        provide:{
            langService: languageServiceObservable,
            lang: languageServiceObservable.translate.bind(languageServiceObservable)
        },
    });
}