<template>
    <div class="gui-frame">
        <gallery-collapsible :images="images" :open="isGalleryOpen"
                             @close="isGalleryOpen=false"
                             @delete="deleteImage"
                             @open="openGallery"
                             @share="openSharingView"/>
        <themes-collapsible :open="isThemesOpen" @close="isThemesOpen=false" @open="openThemes"/>
        <record-button @capture="startCapture" @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>
        <div class="gradient-under"></div>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';
import CaptureImageData from "./Structures/CapturedImageData";
import GalleryCollapsible from './GalleryCollapsible.vue';
import ThemesCollapsible from './ThemesCollapsible.vue';
import SnapshotImage from './SnapshotImage.vue';
import RecordButton from './RecordButton.vue';

export default {
    name: "MainView",
    data() {
        return {
            images: [],
            isGalleryOpen: false,
            isThemesOpen: false,
        }
    },
    components: {
        GalleryCollapsible,
        ThemesCollapsible,
        RecordButton,
        SnapshotImage,
    },
    methods: {
        openGallery() {
            this.isGalleryOpen = true;
            this.isThemesOpen = false;
        },
        openThemes() {
            this.isThemesOpen = true;
            this.isGalleryOpen = false;
        },
        deleteImage(image) {
            this.images.splice(parseInt(image), 1);
            if (this.images.length === 0) {
                this.isGalleryOpen = false;
            }
        },
        startCapture() {
            this.isGalleryOpen = false;
            this.isThemesOpen = false;
        },
        captureImage() {
            if (this.images.length < 4) {
                MainSceneInstance.captureScreenshot().then(this.imageCaptureFinished);
            }
        },
        imageCaptureFinished(base64Image) {
            if (this.images.length < 4) {
                this.images.push(new CaptureImageData(this.images.length, base64Image));
                this.isGalleryOpen = false;
                this.isThemesOpen = false;
            }
        },
        openSharingView(action, image){
            console.log(action);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gui-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: $screen-width+px;
    height: $screen-height+px;
    pointer-events: none;

    .gradient-under {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 200px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%);
    }
}

</style>