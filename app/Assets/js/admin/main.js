import '../../css/admin-theme.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router'
import AdminApp from './AdminApp.vue'
import EmailConfigView from './EmailConfigView.vue'
import SharingConfigView from './SharingConfigView.vue'
import ImagesConfigView from './ImagesConfigView.vue'
import TranslationsViewView from './TranslationsView.vue'
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
            path: "/sharing",
            name: "sharing",
            component: SharingConfigView,
        },
        {
            path: "/images",
            name: "images",
            component: ImagesConfigView,
        },
        {
            path: "/translate",
            name: "translate",
            component: TranslationsViewView,
        },
    ]
});

new Vue({
    el: "#admin-app",
    router: router,
    render: h => h(AdminApp)
})
