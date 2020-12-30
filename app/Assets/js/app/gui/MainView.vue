<template>
    <div>

        <start-button :is-visible="isStartButtonVisible" @start="start"/>

        <confirm-button :is-visible="isConfirmationButtonVisible" @confirm="confirm"/>

        <languages :is-visible="!isCaptureViewVisible"/>

        <capture-view :class="{visible: isCaptureViewVisible}" :open="isCaptureViewVisible" @captureViewClose="reset" class="capture-view"/>

    </div>
</template>

<script>
import CaptureView from "./CaptureView.vue";
import Languages from "./Languages.vue";
import StartButton from "./StartButton.vue";
import ConfirmButton from "./ConfirmButton.vue";
import MainSceneInstance from '/js/app/scene/MainInstance';

export default {
    name: "MainView",
    components: {
        CaptureView,
        Languages,
        StartButton,
        ConfirmButton
    },
    data() {
        return {
            isCaptureViewVisible: false,
            isConfirmationVisible: false,
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
        },
        confirm() {
            this.isConfirmationVisible = false;
            this.isCaptureViewVisible = true;
            MainSceneInstance.onThemeSelected('AmberScene');
        },
        reset() {
            this.isCaptureViewVisible = false;
            this.isConfirmationVisible = false;
            MainSceneInstance.onThemeSelected('DemoScene');
        }
    }
}
</script>

<style lang="scss" scoped>

.capture-view {
    opacity: 0;
    visibility: hidden;
    transition: all 300ms linear;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 300ms linear;
    }
}





</style>