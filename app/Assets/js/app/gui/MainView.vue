<template>
    <div>
<!--        <face-position-configurator/>-->

        <div :class="{expanded:isConfirmationButtonVisible, hidden:isCaptureViewVisible}" class="gradient-under"></div>
        <start-button :is-visible="isStartButtonVisible" @start="start"/>
        <confirm-button :is-visible="isConfirmationButtonVisible" @confirm="confirm"/>
        <languages :is-visible="!isCaptureViewVisible"/>
        <capture-view :class="{visible: isCaptureViewVisible}" :open="isCaptureViewVisible" class="capture-view"
                      @captureViewClose="reset"/>

<!--        <face-detection-debug />-->
        <loading-view/>
    </div>
</template>

<script>

import CaptureView from "./CaptureView.vue";
import Languages from "./Languages.vue";
import StartButton from "./StartButton.vue";
import ConfirmButton from "./ConfirmButton.vue";
import MainSceneInstance from '/js/app/scene/MainInstance';
import FaceDetectionDebug from './FaceDetectionDebug.vue';
import LoadingView from './LoadingView.vue';
import FacePositionConfigurator from "./FacePositionConfigurator.vue";

export default {
    name: "MainView",
    components: {
        FacePositionConfigurator,
        CaptureView,
        Languages,
        StartButton,
        ConfirmButton,
        FaceDetectionDebug,
        LoadingView
    },
    data() {
        return {
            isCaptureViewVisible: false,
            isConfirmationVisible: false,
            confirmTimer: null,
        };
    },
    computed: {
        isStartButtonVisible() {
            return !this.isCaptureViewVisible && !this.isConfirmationVisible;
        },
        isConfirmationButtonVisible() {
            return !this.isCaptureViewVisible && this.isConfirmationVisible;
        }
    },
    methods: {
        start() {
            this.isConfirmationVisible = true;
            clearTimeout(this.confirmTimer);
            this.confirmTimer = setTimeout(() => {
                this.isConfirmationVisible = false;
            }, 10000);
        },
        confirm() {
            clearTimeout(this.confirmTimer);
            this.isConfirmationVisible = false;
            this.isCaptureViewVisible = true;
            MainSceneInstance.onThemeSelected('AmberScene');
        },
        reset() {
            this.isCaptureViewVisible = false;
            this.isConfirmationVisible = false;
            MainSceneInstance.onThemeSelected('DemoScene');
        }
    },
    mounted() {
        MainSceneInstance.init(document.getElementById('renderCanvas'));
    }
}
</script>

<style lang="scss" scoped>

.gradient-under {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 900px;
    background: linear-gradient(to bottom, rgba(98, 125, 77, 0) 0%, rgba(31, 59, 8, 0.84) 50%, rgba(31, 59, 8, 0.84) 100%);
    transition: height, opacity 300ms linear;
    visibility: visible;
    opacity: 0.9;

    &.hidden {
        visibility: hidden;
    }

    &.expanded {
        height: 1400px;
        transition: height, opacity 300ms linear;
        opacity: 1.0;
    }
}

.capture-view {
    //opacity: 0;
    visibility: hidden;
    //transition: all 300ms linear;
    z-index: -10;

    &.visible {
        //opacity: 1;
        visibility: visible;
        //transition: all 300ms linear;
        z-index: 0;
    }
}
</style>


<style>
@font-face {
    font-family: "customFont";
    src: url("../../../fonts/Arimo-SemiBold.ttf");
}

body {
    font-family: "customFont", serif;
    user-select: none;
    background-color: black;
    overflow: hidden;

    cursor:crosshair;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -ms-user-drag: none;
    user-drag: none;
}
</style>