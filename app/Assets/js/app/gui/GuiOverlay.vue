<template>
    <div class="gui-frame">

        <div v-if="isDemoModeActive">
            <div class="share-button" @click="modeStart">Start</div>
        </div>

        <div v-if="isPreviewModeActive">
            <div v-if="isImageCaptureAvailable" class="make-photo-button" @click="captureImage">Capture</div>
            <div class="captured-images">
                <div v-for="imgData in capturedImageData" class="image-thumbnail">
                    <img alt="Thumbnail" :src="imgData" width="100%" height="100%"/>
                </div>
            </div>
            <div v-if="isShareModeAvailable" class="share-button" @click="modeShare">Share</div>
        </div>

        <capture-view v-if="isPreviewModeActive"
                      :capturedImageData="capturedImageData"
                      @imageCapture="captureImage"></capture-view>

        <sharing-view v-if="isShareModeActive"></sharing-view>

    </div>
</template>

<script>

import CaptureView from "/js/app/gui/CaptureView/CaptureView.vue";
import SharingView from "/js/app/gui/SharingView.vue";
import {FlowState} from "/js/app/gui/Constants";

export default {
    name: "app",
    data: function () {
        return {
            flowState: FlowState.DemoMode,
            capturedImageData: [],
        }
    },
    props: {
        mainScene: {
            type: Object,
            required: true,
        },
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
        isImageCaptureAvailable() {
            return (this.capturedImageData.length < 4);
        },
        isShareModeAvailable() {
            return (this.capturedImageData.length > 0);
        }

    },
    components: {SharingView, CaptureView},
    methods: {
        modeStart() {
            this.flowState = FlowState.CaptureMode;
            this.mainScene.onModeSelected(FlowState.CaptureMode);
        },
        modeShare() {
            this.flowState = FlowState.SharingMode;
            this.mainScene.onModeSelected(FlowState.SharingMode);
        },
        captureImage() {
            this.mainScene.captureScreenshot().then(this.imageCaptureFinished);
        },
        imageCaptureFinished(base64Image) {
            this.capturedImageData.push(base64Image);
        }
    },
    mounted: function () {

    }
}
</script>

<style scoped>
.gui-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    border: solid 1px red;
}

.share-button {
    display: inline-block;
    width: 100%;
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
    margin-top: 30px;
    background-color: #7e89b8;
    font-size: 50px;
}

.make-photo-button {
    position: absolute;
    bottom: 30px;
    right: 450px;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: crimson;
    border: solid 5px lightcoral;
    text-align: center;
    font-size: 40px;
    line-height: 200px;
    vertical-align: middle;
}

.captured-images {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    margin-top:1100px;
    background-color: rgb(164, 165, 227);
}

.image-thumbnail {
    background: tomato;
    padding: 5px;
    width: 200px;
    height: 380px;
    margin-top: 10px;
    line-height: 150px;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
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
}
</style>