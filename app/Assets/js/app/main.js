import '@fortawesome/fontawesome-free/js/all.js';
import MainScene from './scene/MainScene';
import Vue from 'vue'
import App from './gui/GuiOverlay.vue'

let mainScene = new MainScene(document.getElementById('renderCanvas'));

if(document.getElementById('gui')) {
    const AppRoot = Vue.extend(App);
    new AppRoot({
        el: '#gui',
        propsData: {
            mainScene: mainScene
        }
    });
}