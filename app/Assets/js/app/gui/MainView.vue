<template>
    <div class="gui-frame">
        <gallery-collapsible :images="images"
                             :open="isGalleryOpen"
                             :selected-image="selectedImage"
                             @close="isGalleryOpen=false"
                             @open="openGallery"
                             @image-action="handleImageAction"/>
        <themes-collapsible :open="isThemesOpen" @close="isThemesOpen=false" @open="openThemes"/>
        <record-button @capture="startCapture" @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>
        <div class="gradient-under"></div>

<!--        <share-facebook :image-id="0" :is-active="true"></share-facebook>-->
        <share-email class="fade-hidden" :class="{visible: isEmailViewOpen}" :image-id="'sdsdsdsd'" :is-active="true" @close="closeEmailView"></share-email>
<!--        <share-download :image-id="0" :is-active="true"></share-download>-->

    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';
import CaptureImageData from "./Structures/CapturedImageData";
import GalleryCollapsible from './GalleryCollapsible.vue';
import ThemesCollapsible from './ThemesCollapsible.vue';
import SnapshotImage from './SnapshotImage.vue';
import RecordButton from './RecordButton.vue';
import ShareFacebook from './SharingView/SharingViewFacebook.vue';
import ShareEmail from './SharingView/SharingViewEmail.vue';
import ShareDownload from './SharingView/SharingViewDownload.vue';
import {GalleryActions} from './Constants.js';

export default {
    name: "MainView",
    data() {
        return {
            images: [],
            selectedImage: null,
            isGalleryOpen: false,
            isThemesOpen: false,
            isEmailViewOpen: false,
            isShareViewOpen: false,
            isDownloadViewOpen: false,
        }
    },
    components: {
        GalleryCollapsible,
        ThemesCollapsible,
        RecordButton,
        SnapshotImage,
        ShareFacebook,
        ShareEmail,
        ShareDownload,
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
        deleteImage(image) {
            const index = this.images.findIndex(element => element.id === image.id);
            if (index >= 0) {
                this.images.splice(parseInt(image), 1);
                if (this.images.length === 0) {
                    this.isGalleryOpen = false;
                }
            }
        },
        handleImageAction(action, image){
            switch (action) {
                case GalleryActions.SelectImage:
                    this.selectedImage = image;
                    break;
                case GalleryActions.DeleteImage:
                    this.deleteImage(image);
                    break;
                case GalleryActions.MinimizeImage:
                    this.selectedImage = null;
                    this.isEmailViewOpen = false;
                    this.isShareViewOpen = false;
                    this.isDownloadViewOpen = false;
                    break;
                case GalleryActions.ShareFacebook:
                    this.selectedImage = image;
                    this.isShareViewOpen = true;
                    break;
                case GalleryActions.ShareEmail:
                    this.selectedImage = image;
                    this.isEmailViewOpen = true;
                    break;
                case GalleryActions.ShareDownload:
                    this.selectedImage = image;
                    this.isDownloadViewOpen = true;
                    break;
            }

            //upload to server
        },
        closeEmailView(){
            this.isEmailViewOpen = false;
        //    this.selectedImage = null;
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

    .fade-hidden {
        opacity: 0;
        visibility:hidden;
        transition: all 0.4s linear;

        &.visible{
            opacity: 1;
            visibility: visible;
            transition: all 0.4s linear;
        }
    }
}

</style>