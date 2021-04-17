<template>
    <div>
        <div class="card-header p-2 font-weight-bolder">Logo (added to the captured image)</div>
        <div class="container p-3">
            <img :src="bannerImageUrl" alt="Logo image">
        </div>
        <div class="card-header p-2 font-weight-bolder">Current number of captured images: {{ imageCount }}</div>
        <div class="container p-3">
            <p>
                <button type="button" class="btn btn-success ml-auto" @click="deleteOldImages">Delete outdated images</button>
            </p>
            <p><strong>40</strong> newest images are reserved for the Demo Scene. All the rest will be deleted depending of the TTL (time-to-live) value.</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LogoTexture from "@images/LNDM175.jpg";

export default {
    name: "HomeView",
    props: {},
    data() {
        return {
            imageCount: 0,
        };
    },
    computed:{
        bannerImageUrl() {
            return LogoTexture;
        }
    },
    methods: {
        fetchImagesCount() {
            axios.get('conf/images-count').then(response => {
                if (response.status === 200) {
                    this.imageCount = response.data.count;
                }
            });
        },
        deleteOldImages() {
            axios.get('conf/clean-up-images').then(response => {
                if (response.status === 200) {
                    this.imageCount = response.data.count;
                }
            });
        }
    },
    mounted() {
        this.fetchImagesCount();
    }
}
</script>

<style scoped lang="scss">
    img {
        width: 100%;
    }
</style>