import '../css/admin-theme.scss';
import '@fortawesome/fontawesome-free/js/all.js';
// import axios from 'axios';
import 'bootstrap';

import Vue from 'vue'
import App from './admin/CameraPreview.vue'

if(document.getElementById('react-camera-preview')) {
    new Vue({
        el: '#react-camera-preview',
        render: h => h(App)
    });
}