<template>
    <div :class="{'active':isActive}" class="container">

        <div class="image-preview">
            <img :src="imageDataCopy" alt="Thumbnail" height="100%" width="100%"/>
        </div>

        <share-facebook :is-active="isShareFacebookActive"></share-facebook>
        <share-email :is-active="isShareEmailActive"></share-email>
        <share-download :is-active="isShareDownloadActive"></share-download>

        <div class="back-button" @click="back">
            <div class="button">Go back</div>
        </div>

    </div>
</template>

<script>

import ShareFacebook from './SharingViewFacebook.vue';
import ShareEmail from './SharingViewEmail.vue';
import ShareDownload from './SharingViewDownload.vue';
import {SharingViewState} from "/js/app/gui/Constants";

export default {
    name: "SharingView",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
        capturedImageData: {
            type: Array,
            required: true,
        },
        selectedImage: {
            required: true,
        },
    },
    components: {
        ShareFacebook,
        ShareEmail,
        ShareDownload
    },
    data: function () {
        return {
            imageDataCopy: null
        }
    },
    watch: {
        isActive(value) {
            if (value === true) {
                this.imageDataCopy = this.capturedImageData[this.selectedImage];
            }
        }
    },
    computed: {
        isShareFacebookActive() {
            return this.type === SharingViewState.FacebookView;
        },
        isShareEmailActive() {
            return this.type === SharingViewState.EmailView;
        },
        isShareDownloadActive() {
            return this.type === SharingViewState.DownloadView;
        }
    },
    methods: {
        back() {
            this.$emit('back');
        }
    },
};
</script>

<style scoped>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    display: flex;
    flex-direction: column;
    transform: translateX(1080px);
    transition: transform 0.5s;
}

.active {
    transform: translateX(0px);
    transition: transform 0.5s;
}

.back-button {
    position: absolute;
    top: 1700px;
    left: 50px;
    width: 160px;
    height: 160px;
}

.button {
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: greenyellow;
    text-align: center;
    font-size: 30px;
    line-height: 160px;
    vertical-align: middle;
}

.image-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>