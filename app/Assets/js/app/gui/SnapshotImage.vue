<template>
    <div v-if="imageData" :class="transitionClass" class="snap">
        <img :src="imageData.base64data" alt="" height="100%" width="100%" @load="imageLoaded"/>
    </div>
</template>

<script>
export default {
    name: 'SnapshotImage',
    props: {
        capturedImageData: {
            type: Array,
            required: true,
        }
    },
    data: function () {
        return {
            previousCapturedImageIndex: 0,
            capturedImageIndex: null,
            showTransition: false,
            timerId: null
        }
    },
    watch: {
        capturedImageData(newData) {
            if (this.previousCapturedImageIndex < newData.length && newData.length > 0) {
                this.capturedImageIndex = newData.length - 1;
                this.showTransition = false;
            }
            this.previousCapturedImageIndex = newData.length;
        }
    },
    computed: {
        imageData() {
            if (this.capturedImageIndex === null) {
                return null;
            }
            return this.capturedImageData[this.capturedImageIndex];
        },
        transitionClass() {
            return this.showTransition ? 'transition' : '';
        }
    },
    methods: {
        imageLoaded() {
            this.showTransition = true;
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                this.showTransition = false;
                this.capturedImageIndex = null;
                this.timerId = null;
            }, 1000)
        }
    }
};
</script>

<style lang="scss" scoped>

@import '/css/app/variables.scss';

.snap {
    position: absolute;
    top: 0;
    left: 0;
    width: $screen-width+px;
    height: $screen-height+px;
    transform: translate(0px, 0px) scale(1.0);
    box-shadow: -1px 17px 38px 9px rgba(0, 0, 0, 0.6);
    overflow: hidden;
    border: solid 2px black;
}

.transition {
    animation-name: moving-snap;
    animation-duration: 1000ms;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes moving-snap {
    0% {
        transform: translate(0px, 0px) scale(1);
        opacity: 1.0;
        filter: brightness(1.0);
    }
    40% {
        transform: translate(0px, 0px) scale(0.6);
        filter: brightness(2.0);
        border-radius: 0;
    }
    60% {
        opacity: 1.0;
        transform: translate(100px, 200px) scale(0.4, 0.23);
        border-radius: 40%;
    }
    100% {
        transform: translate(($gallery-icon-pos-left/2)+px, ($gallery-icon-pos-top/2)+px) scale(0.07, 0.03);
        opacity: 0.0;
        border-radius: 50%;
    }
}

</style>