import fontawesome from '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import MainView from './gui/MainView.vue';
import LanguageService from '@common/LanguageService.js';

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