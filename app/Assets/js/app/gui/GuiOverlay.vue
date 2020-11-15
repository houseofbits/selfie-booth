<template>
    <div class="gui-frame">

        <!--        <div v-if="isDemoModeActive">-->
        <!--            <div class="start-button" @click="modeStart">Start</div>-->
        <!--        </div>-->

        <!--        <capture-view :capturedImageData="capturedImageData"-->
        <!--                      :is-active="isPreviewModeActive"-->
        <!--                      :selectedImage="selectedImage"-->
        <!--                      @capture="captureImage"-->
        <!--                      @delete="deleteImage"-->
        <!--                      @select="selectImage"-->
        <!--                      @share="modeShare"></capture-view>-->

        <!--        <sharing-view :capturedImageData="capturedImageData"-->
        <!--                      :is-active="isShareModeActive"-->
        <!--                      :selectedImage="selectedImage"-->
        <!--                      :type="sharingType"-->
        <!--                      @back="modeStart"-->
        <!--                      @sync="syncImageData"></sharing-view>-->

        <main-view />
    </div>
</template>

<script>

import CaptureView from "/js/app/gui/CaptureView/CaptureView.vue";
import SharingView from "/js/app/gui/SharingView/SharingView.vue";
import {FlowState} from "/js/app/gui/Constants";
import CaptureImageData from "./Structures/CapturedImageData";
import ImageDataSyncService from "./Services/ImageDataSyncService";
import MainSceneInstance from '/js/app/scene/MainInstance';
import MainView from './MainView.vue';

export default {
    name: "app",
    data() {
        return {
            flowState: FlowState.CaptureMode,
            sharingType: 0,
            capturedImageData: [],
            selectedImage: null,
        }
    },
    computed: {
        isDemoModeActive() {
            return this.flowState === FlowState.DemoMode;
        },
        isPreviewModeActive() {
            return this.flowState === FlowState.CaptureMode;
        },
        isShareModeActive() {
            return this.flowState === FlowState.SharingMode;
        },
    },
    components: {
        SharingView,
        CaptureView,
        MainView,
    },
    methods: {
        modeStart() {
            this.flowState = FlowState.CaptureMode;
            MainSceneInstance.onModeSelected(FlowState.CaptureMode);
        },
        modeShare(type) {
            this.sharingType = type;
            this.flowState = FlowState.SharingMode;
            MainSceneInstance.onModeSelected(FlowState.SharingMode);
        },
        selectImage(index) {
            this.selectedImage = index;
        },
        deleteImage(index) {
            this.capturedImageData.splice(index, 1);
            if (index <= this.selectedImage) {
                this.selectedImage = null;
            }
        },
        captureImage() {
            MainSceneInstance.captureScreenshot().then(this.imageCaptureFinished);
        },
        imageCaptureFinished(base64Image) {
            this.capturedImageData.push(new CaptureImageData(base64Image));
        },
        syncImageData(imageIndex) {
            if (typeof this.capturedImageData[imageIndex] !== 'undefined') {
                const image = this.capturedImageData[imageIndex];
                if (image.id === null) {
                    const service = new ImageDataSyncService();
                    service.sync(image);
                }
            }
        }
    },
    mounted: function () {

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
/*    pointer-events: none;*/
}

.start-button {
    display: inline-block;
    width: 100%;
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
    margin-top: 1100px;
    background-color: #7e89b8;
    font-size: 50px;
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