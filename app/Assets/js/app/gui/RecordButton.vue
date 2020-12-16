<template>
    <div class="record-button">
        <div :class="{capture: captureInProgress}" class="button-target"></div>
        <div :class="{capture: captureInProgress}" class="button" @click="startCapture"><i
            class="fas fa-camera-retro"></i></div>
    </div>
</template>

<script>
export default {
    name: "RecordButton",
    props: {
        timeout: {
            type: Number,
            default: 1000
        }
    },
    data() {
        return {
            captureInProgress: false
        };
    },
    methods: {
        startCapture() {
            if (!this.captureInProgress) {
                this.$emit('capture');
                this.captureInProgress = true;
                setTimeout(this.capture, this.timeout);
            }
        },
        capture() {
            this.captureInProgress = false;
            this.$emit('record');
        }
    }
};
</script>

<style lang="scss" scoped>
.record-button {
    pointer-events: auto;
    position: absolute;
    top: 1800px;
    left: 540px;
    width: 160px;
    height: 160px;
}

.button {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -80px;
    margin-top: -80px;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: crimson;
    text-align: center;
    font-size: 80px;
    line-height: 160px;
    vertical-align: middle;
    color: white;
    transition: all 200ms linear;
    //box-shadow: 0px 0px 0px 5px #A0A0A0, inset 0px 10px 27px -8px #141414, inset 0px -10px 27px -8px #A31925, 5px 5px 15px 5px rgba(0,0,0,0);

    i {
        background: linear-gradient(to bottom, #6d0019 0%, #8f0222 56%, #a90329 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
        filter: drop-shadow(0 1px 3px rgba(255, 92, 92, 1));
    }

    &.capture {
        margin-left: -100px;
        margin-top: -100px;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        font-size: 110px;
        line-height: 200px;

        transition: all 1000ms linear;
    }

}

.button-target {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -100px;
    margin-top: -100px;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    font-size: 110px;
    line-height: 200px;
    border: solid 1px lightsalmon;
    opacity: 0;
    transition: all 200ms linear;

    &.capture {
        opacity: 1;
        transition: all 200ms linear;
    }
}
</style>