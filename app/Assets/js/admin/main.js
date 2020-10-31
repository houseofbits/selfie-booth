import '../../css/admin-theme.scss';
import '@fortawesome/fontawesome-free/js/all.js';
// import axios from 'axios';
import 'bootstrap';

import Vue from 'vue';
import VueRouter from 'vue-router'
import AdminApp from './AdminApp.vue'
import EmailConfigView from './EmailConfigView.vue'
import HomeView from './HomeView.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/email",
        name: "email",
        component: EmailConfigView,
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    el: "#admin-app",
    router: router,
    render: h => h(AdminApp)
})
