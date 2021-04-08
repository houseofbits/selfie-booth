<template>
    <div>
        <div class="container p-3">
            <p>Images count: {{ imageCount }}</p>
            <p>
                <button type="button" class="btn btn-success ml-auto" @click="deleteOldImages">Delete outdated images</button>
            </p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "HomeView",
    props: {},
    data() {
        return {
            imageCount: 0,
        };
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

<style scoped>

</style>