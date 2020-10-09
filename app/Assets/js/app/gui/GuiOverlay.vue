<template>
    <div class="gui-frame">
        <div v-if="isDemoModeActive">
            <div class="share-button" @click="modeStart">Start</div>
        </div>
        <div v-if="isPreviewModeActive">
            <div class="share-button" @click="modeShare">Take picture</div>
        </div>

        <sharing-view v-if="isShareModeActive"></sharing-view>

    </div>
</template>

<script>

import SharingView from "/js/app/gui/SharingView.vue";
import {FlowState} from "/js/app/gui/Constants";

export default {
    name: "app",
    data: function () {
        return {
            flowState: FlowState.DemoMode,
        }
    },
    props: {
        mainScene: {
            type: Object,
            required: true
        },
    },
    computed: {
        isDemoModeActive() {
            return this.flowState === FlowState.DemoMode;
        },
        isPreviewModeActive() {
            return this.flowState === FlowState.PreviewMode;
        },
        isShareModeActive() {
            return this.flowState === FlowState.SharingMode;
        }
    },
    components: {SharingView},
    methods: {
        modeStart() {
            this.flowState = FlowState.PreviewMode;
        },
        modeShare() {
            this.flowState = FlowState.SharingMode;
        },
    },
    mounted: function () {

    }
}
</script>

<style scoped>
.gui-frame{
    position:absolute;
    top:0;
    left:0;
    width:1080px;
    height:1920px;
    border:solid 1px red;
}
.share-button {
    display: inline-block;
    width: 100%;
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
    margin-top: 1000px;
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
}
</style>