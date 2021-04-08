<template>
    <div class="alert">

        <div class="ring-layer-stroke"></div>
        <div class="ring-layer-under"></div>
        <div class="ring-layer"></div>

        <div class="info-text"><span>{{ lang('capture.session-alert') }}</span></div>

        <text-button class="continue-btn green" icon="fas fa-camera" @click="cancel">{{ lang('demo.confirm-button') }}</text-button>
        <text-button class="finish-btn red" icon="fas fa-backspace" @click="finish">{{ lang('capture.finish-button') }}</text-button>
    </div>
</template>

<script>
import TextButton from './TextButton.vue';
export default {
    name: 'SessionAlert',
    inject: ['lang'],
    components: {
        TextButton
    },
    data() {
        return {
            timer: null,
        };
    },
    methods: {
        cancel() {
            this.$emit('continue');
        },
        finish() {
            this.$emit('finish');
        }
    },
    mounted() {
        this.timer = setTimeout(this.finish, 15000);
    }
};
</script>

<style lang="scss" scoped>

.continue-btn {
    bottom: 710px;
    left: 530px;
    width: 270px;
}

.finish-btn {
    bottom: 710px;
    left: 280px;
    width: 220px;
}

.alert {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1080px;
    height: 1920px;
    background-color: rgba(31, 59, 8, 0.65);
    z-index: 10;
    pointer-events: auto;
}

.info-text {
    position: absolute;
    bottom: 840px;
    width: 900px;
    left: 90px;
    display: inline-block;
    line-height: 40px;
    margin-top: 15px;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.9));
    text-align: center;

    span {
        display: inline;
        font-weight: normal;
        background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 35px;
    }

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.ring-layer {
    pointer-events: none;
    position:absolute;
    bottom: 900px;
    left: 400px;
    width: 265px;
    height: 230px;
    background-image: url('@images/record_button/record-button-ring.png');
    animation: load 15s infinite;
    animation-timing-function: linear;
}

.ring-layer-under {
    pointer-events: none;
    position:absolute;
    bottom: 900px;
    left: 400px;
    width: 265px;
    height: 230px;
    background-image: url('@images/record_button/record-button-ring.png');
    opacity: 0.3;
}

.ring-layer-stroke {
    pointer-events: none;
    position:absolute;
    bottom: 921px;
    left: 433px;
    width: 195px;
    height: 195px;
    border-radius: 50%;
    border: solid 1px black;
    box-shadow: 0 5px 5px rgba(0,0,0, 0.6);
    opacity: 0.6;
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
