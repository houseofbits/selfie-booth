<template>
    <div class="gui-frame">
        <dynamic-background :is-visible="isDynamicBackgroundVisible" :state="dynamicBackgroundState"/>
        <gallery-collapsible :images="images"
                             :maximize-selected-image="isExpandedViewOpen"
                             :open="isGalleryOpen"
                             :selected-image="selectedImage"
                             @close="isGalleryOpen=false"
                             @open="openGallery"
                             @image-action="handleImageAction"/>
        <themes-collapsible :open="isThemesOpen" @close="isThemesOpen=false" @open="openThemes"/>
        <record-button @capture="startCapture" @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>
        <div class="gradient-under"></div>

        <sharing-view-redirect :image="selectedImage" :is-active="isShareViewOpen || isDownloadViewOpen"
                               @close="closeRedirectView"/>
        <sharing-view-email :is-active="isEmailViewOpen" :is-error.sync="sendEmailError"
                            @close="closeEmailView" @send="sendEmail"/>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';
import CaptureImageData from "./Structures/CapturedImageData";
import GalleryCollapsible from './Gallery/GalleryCollapsible.vue';
import ThemesCollapsible from './ThemesCollapsible.vue';
import SnapshotImage from './SnapshotImage.vue';
import RecordButton from './RecordButton.vue';
import SharingViewRedirect from './SharingView/SharingViewRedirect.vue';
import SharingViewEmail from './SharingView/SharingViewEmail.vue';
import {GalleryActions} from './Constants.js';
import DynamicBackground from './DynamicBackground/DynamicBackground.vue';
import ImageDataSyncService from "./Services/ImageDataSyncService";
import EmailService from "./Services/EmailService.js";

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
            isDynamicBackgroundVisible: false,
            dynamicBackgroundState: 0,
            sendEmailError: false,
        }
    },
    components: {
        GalleryCollapsible,
        ThemesCollapsible,
        RecordButton,
        SnapshotImage,
        SharingViewRedirect,
        SharingViewEmail,
        DynamicBackground
    },
    computed: {
        isExpandedViewOpen() {
            return this.isEmailViewOpen || this.isShareViewOpen || this.isDownloadViewOpen;
        }
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
                this.images.push(new CaptureImageData(1 + this.images.length, base64Image));
                this.isGalleryOpen = false;
                this.isThemesOpen = false;
            }
        },
        deleteImage(image) {
            this.selectedImage = null;
            const index = this.images.findIndex(element => element.id === image.id);
            if (index >= 0) {
                this.images.splice(parseInt(index), 1);
                if (this.images.length === 0) {
                    this.isGalleryOpen = false;
                }
            }
        },
        handleImageAction(action, image) {
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
                    this.syncImageData();
                    this.isShareViewOpen = true;
                    break;
                case GalleryActions.ShareEmail:
                    this.selectedImage = image;
                    this.syncImageData();
                    this.isEmailViewOpen = true;
                    this.sendEmailError = false;
                    break;
                case GalleryActions.ShareDownload:
                    this.selectedImage = image;
                    this.syncImageData();
                    this.isDownloadViewOpen = true;
                    break;
            }
        },
        closeEmailView() {
            this.isEmailViewOpen = false;
            this.selectedImage = null;
        },
        closeRedirectView() {
            this.isDownloadViewOpen = false;
            this.isShareViewOpen = false;
            this.selectedImage = null;
        },
        syncImageData() {
            if (this.selectedImage) {
                const image = this.selectedImage;
                if (image.hash === null) {
                    const service = new ImageDataSyncService();
                    service.sync(image);
                }
            }
        },
        sendEmail(emailAddress) {
            const emailService = new EmailService();
            if (this.selectedImage && this.selectedImage.hash !== null) {
                this.sendEmailError = !emailService.send(emailAddress, this.selectedImage.hash);
            } else {
                this.sendEmailError = true;
            }
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

<style>
@font-face {
    font-family: "customFont";
    src: url("../../../fonts/font.ttf");
}

body {
    font-family: "customFont", serif;
    user-select: none;
    background-color: #c7c7c7;
    /*overflow: hidden;*/
}
</style>