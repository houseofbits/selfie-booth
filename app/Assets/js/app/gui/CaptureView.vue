<template>
    <div class="gui-frame">
        <text-button class="finish-button green" icon="fas fa-backspace"
                     @click="finishCapture">{{ lang('capture.finish-button') }}</text-button>

        <div :class="{expanded:(isGalleryOpen|isThemesOpen)}" class="gradient-under"></div>

        <options-collapsible :open="isOptionsOpen" :theme="selectedTheme" @open="openOptions" @select="selectOption"/>

        <dynamic-background :open="isDynamicBackgroundOpen" :state="dynamicBackgroundState"/>
        <gallery-collapsible :images="images"
                             :maximize-selected-image="isExpandedViewOpen"
                             :open="isGalleryOpen"
                             :selected-image="selectedImage"
                             :disabled="isCaptureInProgress"
                             @close="closeGallery"
                             @open="openGallery"
                             @image-action="handleImageAction"/>
        <themes-collapsible :open="isThemesOpen"
                            :theme="selectedTheme"
                            :disabled="isCaptureInProgress"
                            @close="closeThemes"
                            @select-theme="selectTheme"
                            @open="openThemes"/>
        <record-button :enabled="isCaptureAvailable" @capture="startCapture" @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>

        <sharing-view-redirect :image="selectedImage" :is-active="isShareViewOpen || isDownloadViewOpen"
                               :is-download-view="isDownloadViewOpen"
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
import TextButton from './TextButton.vue';
import OptionsCollapsible from './OptionsCollapsible.vue';

export default {
    name: "CaptureView",
    inject: ['lang'],
    data() {
        return {
            images: [],
            selectedImage: null,
            isGalleryOpen: false,
            isThemesOpen: false,
            isOptionsOpen: false,
            isEmailViewOpen: false,
            isShareViewOpen: false,
            isDownloadViewOpen: false,
            isDynamicBackgroundOpen: false,
            dynamicBackgroundState: 0,
            sendEmailError: false,
            isCaptureInProgress: false,
            selectedTheme: '',
        }
    },
    components: {
        GalleryCollapsible,
        ThemesCollapsible,
        RecordButton,
        SnapshotImage,
        SharingViewRedirect,
        SharingViewEmail,
        DynamicBackground,
        TextButton,
        OptionsCollapsible
    },
    props: {
        open: {
            type: Boolean
        }
    },
    computed: {
        isExpandedViewOpen() {
            return this.isEmailViewOpen || this.isShareViewOpen || this.isDownloadViewOpen;
        },
        isCaptureAvailable() {
            return (this.images.length < 4);
        }
    },
    watch: {
        images() {
            if (this.isGalleryOpen) {
                this.dynamicBackgroundState = this.images.length;
            }
        },
        open(val) {
            this.resetView();
            if (val) {
                this.openThemes();
            }
        }
    },
    methods: {
        finishCapture() {
            this.$emit('captureViewClose');
        },
        resetView() {
            this.selectedImage = null;
            this.isGalleryOpen = false;
            this.isThemesOpen = false;
            this.isEmailViewOpen = false;
            this.isShareViewOpen = false;
            this.isDownloadViewOpen = false;
            this.isDynamicBackgroundOpen = false;
            this.dynamicBackgroundState = 0;
            this.sendEmailError = false;
            this.images = [];
            this.isCaptureInProgress = false;
            this.isOptionsOpen = false;
            this.selectedTheme = MainSceneInstance.getActiveTheme()
        },
        openGallery() {
            if (!this.isCaptureInProgress) {
                this.isGalleryOpen = true;
                this.isOptionsOpen = false;
                this.isThemesOpen = false;
                this.isDynamicBackgroundOpen = true;
                this.dynamicBackgroundState = this.images.length;
            } else {
                this.closeAll();
            }
        },
        openThemes() {
            if (!this.isCaptureInProgress) {
                this.isThemesOpen = true;
                this.isGalleryOpen = false;
                this.isOptionsOpen = false;
                this.isDynamicBackgroundOpen = true;
                this.dynamicBackgroundState = 4;
            } else {
                this.closeAll();
            }
        },
        closeGallery() {
            this.isGalleryOpen = false;
            if (!this.isThemesOpen) {
                this.isDynamicBackgroundOpen = false;
            }
        },
        closeThemes() {
            this.isThemesOpen = false;
            if (!this.isGalleryOpen) {
                this.isDynamicBackgroundOpen = false;
            }
        },
        selectTheme(themeName) {
            this.selectedTheme = themeName;
            this.closeAll();
        },
        startCapture() {
            this.closeAll();
            this.isCaptureInProgress = true;
        },
        captureImage() {
            if (this.images.length < 4) {
                MainSceneInstance.captureScreenshot().then(this.imageCaptureFinished);
            }
            this.isCaptureInProgress = false;
        },
        imageCaptureFinished(base64Image) {
            if (this.images.length < 4) {
                this.images.push(new CaptureImageData(this.generateImageId(), base64Image));
                this.closeAll();
                this.openGalleryOnCaptureLimit();
            }
        },
        openGalleryOnCaptureLimit() {
            if (!this.isCaptureAvailable) {
                setTimeout(this.openGallery, 1000);
            }
        },
        deleteImage(image) {
            this.selectedImage = null;
            const index = this.images.findIndex(element => element.id === image.id);
            if (index >= 0) {
                this.images.splice(parseInt(index), 1);
                if (this.images.length === 0) {
                    this.closeAll();
                }
            }
        },
        closeAll() {
            this.isGalleryOpen = false;
            this.isThemesOpen = false;
            this.isDynamicBackgroundOpen = false;
            this.selectedImage = null;
            this.isEmailViewOpen = false;
            this.isShareViewOpen = false;
            this.isDownloadViewOpen = false;
            this.isOptionsOpen = false;
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
        },
        generateImageId() {
            return (Date.now().toString(36) + Math.random().toString(36).substr(2)).substr(4, 8);
        },
        selectOption(option) {
            this.isOptionsOpen = false;
        },
        openOptions() {
            if (!this.isCaptureInProgress) {
                this.isGalleryOpen = false;
                this.isThemesOpen = false;
                this.isDynamicBackgroundOpen = false;
                this.isOptionsOpen = true;
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
    overflow: hidden;

    .gradient-under {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -300px;
        height: 600px;
        //background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1.0) 100%);
        //background: linear-gradient(to bottom, rgba(98,125,77,0) 0%, rgba(31,59,8,0.84) 100%);
        background: linear-gradient(to bottom, rgba(98, 125, 77, 0) 0%, rgba(31, 59, 8, 0.84) 50%, rgba(31, 59, 8, 0.84) 100%);
        transition: height 300ms linear;

        &.expanded {
            height: 1600px;
            transition: height 300ms linear;
            bottom: 0;
        }
    }
}

.finish-button {
    top: 30px;
    left: 30px;
    width: 220px;
}
</style>
