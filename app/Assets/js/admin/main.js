import '../../css/admin-theme.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap';

import Vue from 'vue';
import VueRouter from 'vue-router'
import AdminApp from './AdminApp.vue'
import EmailConfigView from './EmailConfigView.vue'
import FacebookConfigView from './FacebookConfigView.vue'
import ImagesConfigView from './ImagesConfigView.vue'
import HomeView from './HomeView.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
        },
        {
            path: "/email",
            name: "email",
            component: EmailConfigView,
        },
        {
            path: "/facebook",
            name: "facebook",
            component: FacebookConfigView,
        },
        {
            path: "/images",
            name: "images",
            component: ImagesConfigView,
        },
    ]
});

new Vue({
    el: "#admin-app",
    router: router,
    render: h => h(AdminApp)
})
