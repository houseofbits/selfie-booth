<template>
    <div class="rect" :class="{detected: isDetected}" :style="transform"></div>
</template>

<script>

import FaceDetectionServiceInstance from '@common/FaceDetectionService.js';

export default {
    name: "FaceDetectionDebug",
    data() {
        return {
            width: 0,
            height: 0,
            left:0,
            top:0,
            isDetected: false
        };
    },
    methods: {
        objectDetected(detectionService) {
            this.width = detectionService.detectedWidth;
            this.height = detectionService.detectedHeight;
            this.left = detectionService.detectedX;
            this.top = detectionService.detectedY;
            this.isDetected = detectionService.isDetected;
        }
    },
    computed: {
        transform() {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
                left: this.left + 'px',
                top: this.top + 'px',
            };
        }
    },
    mounted() {
        FaceDetectionServiceInstance.setDetectionCallback(this.objectDetected);
    }
}
</script>

<style lang="scss" scoped>

.rect {
    position: absolute;
    border: solid 1px blue;
    background-color: rgba(255, 0, 0, 0.4);
    width: 100px;
    height: 100px;

    &.detected {
        background-color: rgba(0, 255, 0, 0.4);
    }
}

</style>