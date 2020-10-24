import '@fortawesome/fontawesome-free/js/all.js';
import Vue from 'vue';
import App from './gui/GuiOverlay.vue';

if(document.getElementById('gui')) {
    const AppRoot = Vue.extend(App);
    new AppRoot({
        el: '#gui',
    });
}