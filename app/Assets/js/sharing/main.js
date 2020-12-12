import '../../css/sharing.scss';
import fontawesome from '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import MainView from './MainView.vue';
import LanguageService from '@common/LanguageService.js';

if (document.getElementById('sharing-app')) {
    const root_element = document.getElementById('sharing-app');
    const languageServiceObservable = Vue.observable(new LanguageService());
    languageServiceObservable.setLanguage(root_element.dataset.lang);
    const AppRoot = Vue.extend(MainView);
    new AppRoot({
        el: root_element,
        components: {
            MainView
        },
        provide: {
            langService: languageServiceObservable,
            lang: languageServiceObservable.translate.bind(languageServiceObservable)
        },
        propsData: {...root_element.dataset}
    });
}

