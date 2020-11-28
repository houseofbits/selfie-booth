import fontawesome from '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
//import App from './gui/GuiOverlay.vue';
import MainView from './gui/MainView.vue';
import LanguageService from './gui/Services/LanguageService.js';

if(document.getElementById('gui')) {
    const languageServiceObservable = Vue.observable(new LanguageService());
    const AppRoot = Vue.extend(MainView);
    new AppRoot({
        el: '#gui',
        provide:{
            langService: languageServiceObservable,
            lang: languageServiceObservable.translate.bind(languageServiceObservable)
        },
    });
}