import '@fortawesome/fontawesome-free/js/all.js';
import MainScene from './scene/MainScene';
import Vue from 'vue'
import App from './gui/GuiOverlay.vue'

if(document.getElementById('gui')) {
    new Vue({
        el: '#gui',
        render: h => h(App)
    });
}

//let mainView = new MainScene(document.getElementById('renderCanvas'));