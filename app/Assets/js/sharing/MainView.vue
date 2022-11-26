<template>
    <div class="container h-100">
        <div class="fixed-overlay bg-secondary"></div>
        <div class="row align-items-center h-100">
            <div class="col-12 mx-auto">
                <img :src='imageUrl' alt="Image" class="card-img-top">
            </div>
        </div>
        <div class="fixed-overlay">
            <div class="container h-100">
                <div class="row align-items-center h-100">
                    <div class="col-lg-6 col-sm-10 mx-auto text-center">

                        <log-in v-if="!download"/>

                        <hr class="divider" v-if="!download">

                        <download/>

                        <timer :time-left="timeLeft"/>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Timer from './Timer.vue';
import LogIn from './LogIn.vue';
import Download from './Download.vue';

export default {
    name: "MainView",
    props: {
        imageId: {
            type: String,
        },
        download: {
            type: String,
        },
        timeLeft: {
            type: String,
        },
    },
    components: {
        Timer,
        LogIn,
        Download
    },
    computed: {
        imageUrl() {
            return '/api/image/' + this.imageId;
        }
    },
}
</script>

<style scoped>

</style>