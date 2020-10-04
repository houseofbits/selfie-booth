import '@fortawesome/fontawesome-free/js/all.js';
import MainView from './main/webgl/MainView';
import Vue from 'vue'
import App from './main/gui/GuiOverlay.vue'

if(document.getElementById('gui')) {
    new Vue({
        el: '#gui',
        render: h => h(App)
    });
}

//let mainView = new MainView(document.getElementById('renderCanvas'));