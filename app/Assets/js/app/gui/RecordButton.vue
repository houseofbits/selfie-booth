<template>
    <div class="record-button" :class="{visible: enabled, animate:captureInProgress}">
        <div class="main-layer" @click="startCapture"></div>
        <div class="ring-layer" :class="{animate:captureInProgress}"></div>
        <div class="camera-layer" :class="{animate:captureInProgress}"></div>
    </div>
</template>

<script>
export default {
    name: "RecordButton",
    props: {
        timeout: {
            type: Number,
            default: 100,//5000
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            captureInProgress: false,
            captureTimer: null
        };
    },
    methods: {
        startCapture() {
            if (this.enabled && !this.captureInProgress) {
                this.captureInProgress = true;
                clearTimeout(this.captureTimer);
                this.captureTimer = setTimeout(this.capture, this.timeout + 20);
                this.$emit('capture');
            }
        },
        capture() {
            this.$emit('record');
            this.captureInProgress = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.record-button {
    pointer-events: auto;
    position: absolute;
    top: 1400px;
    left: 407px;
    width: 265px;
    height: 230px;
    opacity:0;
    visibility: hidden;
    transition: all 300ms linear;

    &.animate {
        filter: brightness(1.5);
    }

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 300ms linear;
    }

    .main-layer {
        pointer-events: auto;
        position: absolute;
        width: 265px;
        height: 230px;
        background-image: url('@images/record_button/record-button-main.png');
    }

    .ring-layer {
        pointer-events: none;
        position: absolute;
        width: 265px;
        height: 230px;
        opacity: 0;
        background-image: url('@images/record_button/record-button-ring.png');

        &.animate {
            opacity: 1;
            animation-name: load;
            animation-duration: 5000ms;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
        }
    }

    .camera-layer {
        pointer-events: none;
        position: absolute;
        width: 265px;
        height: 230px;
        background-image: url('@images/record_button/record-button-camera.png');
        opacity: 0;
        transition: all 1000ms linear;

        &.animate {
            opacity: 1;
            transition: all 200ms linear;
        }
    }

}

@keyframes load {
    0.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.0%, 0% 100%, 100% 100%, 100% 0.0%, 50.0% 0.0%); }
    2.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.8%, 0% 100%, 100% 100%, 100% 0.8%, 58.7% 0.8%); }
    5.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 3.0%, 0% 100%, 100% 100%, 100% 3.0%, 67.1% 3.0%); }
    8.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 6.7%, 0% 100%, 100% 100%, 100% 6.7%, 75.0% 6.7%); }
    11.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 11.7%, 0% 100%, 100% 100%, 100% 11.7%, 82.1% 11.7%); }
    13.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 17.9%, 0% 100%, 100% 100%, 100% 17.9%, 88.3% 17.9%); }
    16.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 25.0%, 0% 100%, 100% 100%, 100% 25.0%, 93.3% 25.0%); }
    19.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 32.9%, 0% 100%, 100% 100%, 100% 32.9%, 97.0% 32.9%); }
    22.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 41.3%, 0% 100%, 100% 100%, 100% 41.3%, 99.2% 41.3%); }
    25.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 50.0%, 0% 100%, 100% 100%, 100% 50.0%, 100.0% 50.0%); }
    27.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 58.7%, 0% 100%, 100% 100%, 100% 58.7%, 99.2% 58.7%); }
    30.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 67.1%, 0% 100%, 100% 100%, 100% 67.1%, 97.0% 67.1%); }
    33.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 75.0%, 0% 100%, 100% 100%, 100% 75.0%, 93.3% 75.0%); }
    36.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 82.1%, 0% 100%, 100% 100%, 100% 82.1%, 88.3% 82.1%); }
    38.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 88.3%, 0% 100%, 100% 100%, 100% 88.3%, 82.1% 88.3%); }
    41.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 93.3%, 0% 100%, 100% 100%, 100% 93.3%, 75.0% 93.3%); }
    44.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 97.0%, 0% 100%, 100% 100%, 100% 97.0%, 67.1% 97.0%); }
    47.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 99.2%, 0% 100%, 100% 100%, 100% 99.2%, 58.7% 99.2%); }
    50.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 100.0%, 50.0% 100.0%); }
    52.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 99.2%, 41.3% 99.2%); }
    55.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 97.0%, 32.9% 97.0%); }
    58.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 93.3%, 25.0% 93.3%); }
    61.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 88.3%, 17.9% 88.3%); }
    63.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 82.1%, 11.7% 82.1%); }
    66.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 75.0%, 6.7% 75.0%); }
    69.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 67.1%, 3.0% 67.1%); }
    72.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 58.7%, 0.8% 58.7%); }
    75.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 50.0%, 0.0% 50.0%); }
    77.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 41.3%, 0.8% 41.3%); }
    80.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 32.9%, 3.0% 32.9%); }
    83.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 25.0%, 6.7% 25.0%); }
    86.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 17.9%, 11.7% 17.9%); }
    88.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 11.7%, 17.9% 11.7%); }
    91.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 6.7%, 25.0% 6.7%); }
    94.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 3.0%, 32.9% 3.0%); }
    97.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.8%, 41.3% 0.8%); }
    100.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0%, 50% 0%); }
}

</style>