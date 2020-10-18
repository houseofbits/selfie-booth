<template>
    <div class="snap" v-if="imageData" :class="transitionClass">
        <img :src="imageData.base64data" @load="imageLoaded" width="100%" height="100%" alt=""/>
    </div>
</template>

<script>
export default {
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

<style scoped>
.snap {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    transform: scale(1.0);
    box-shadow: -1px 17px 38px 9px rgba(0, 0, 0, 0.6);
}

.transition {
    animation-name: moving-snap;
    animation-duration: 1s;
    animation-timing-function: ease-out;
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
    }
    60% {
        opacity: 1.0;
    }
    100% {
        transform: translate(470px, 880px) scale(0.05);
        opacity: 0;
    }
}

</style>