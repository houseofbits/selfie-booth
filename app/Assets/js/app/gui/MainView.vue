<template>
    <div class="gui-frame">
        <gallery-collapsible :images="images" :open="isGalleryOpen" @close="isGalleryOpen=false" @delete="deleteImage"
                             @open="openGallery"/>
        <themes-collapsible :open="isThemesOpen" @close="isThemesOpen=false" @open="openThemes"/>
        <record-button @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>
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
        SnapshotImage
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
            if(this.images.length === 0) {
                this.isGalleryOpen = false;
            }
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
    //border: solid 1px red;
    pointer-events: none;
}
</style>