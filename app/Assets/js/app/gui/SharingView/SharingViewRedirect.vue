<template>
    <div :class="{visible:isActive}" class="window">

        <div class="gradient-underlay"></div>

        <static-item class="leaf leaf-pos-3" image-id="2"></static-item>
        <static-item class="leaf leaf-pos-1" image-id="1"></static-item>
        <static-item class="leaf leaf-pos-2" image-id="1"></static-item>

        <div class="info-row">
            <div class="main-text"><span><i class="fas fa-mobile-alt icon-size"></i> {{ infoText }}</span></div>
            <div class="secondary-text"><span><i class="fas fa-info-circle"></i> {{ detailInfoText }}</span></div>
        </div>
        <div :class="{visible: isError}" class="error-row"><i class="fas fa-exclamation-triangle"></i> {{ lang('capture.qr-error') }}
        </div>

        <div class="qr-image">
            <div class="loading"><i class="fas fa-hourglass-half"></i></div>
            <img :src="qrCodeImage" :class="{loaded:isLoaded}" @error="onError" @load="qrCodeLoaded">
        </div>

        <text-button class="back-button orange" icon="fas fa-arrow-circle-left"
                     @click="closeView">{{ lang('capture.back-button') }}</text-button>

    </div>
</template>

<script>

import TextButton from '../TextButton.vue';
import StaticItem from '../DynamicBackground/StaticItem.vue';

export default {
    name: "SharingViewRedirect",
    inject: ['lang', 'langService'],
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        isDownloadView: {
            type: Boolean,
        },
        image: {
            type: Object,
        },
        type: {
            type: Number,
        },
    },
    components: {
        TextButton,
        StaticItem
    },
    data: function () {
        return {
            isError: false,
            isLoaded: false,
        }
    },
    watch: {
        isActive() {
            this.isError = false;
        }
    },
    computed: {
        qrCodeImage() {
            if (this.image && this.image.hash) {
                if (this.isDownloadView) {
                    return '/api/qr/download/' + this.langService.getLanguage() + '/' + this.image.hash;
                } else {
                    return '/api/qr/fb/' + this.langService.getLanguage() + '/' + this.image.hash;
                }
            }
        },
        infoText() {
            return this.isDownloadView ?
                this.lang('capture.download-info') : this.lang('capture.share-info');
        },
        detailInfoText() {
            return this.isDownloadView ?
                this.lang('capture.download-detail') : this.lang('capture.share-detail');
        }
    },
    methods: {
        onError(e) {
            this.isError = true;
        },
        closeView() {
            this.$emit('close');
        },
        qrCodeLoaded(){
            this.isLoaded = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.window {
    position: absolute;
    top: 1000px;
    left: 120px;
    width: 840px;
    height: 550px;
    z-index: 8;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s linear;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 0.4s linear;
    }

    .info-row {
        position: absolute;
        top: 390px;
        width: 100%;
        height: 100px;
        text-align: center;
        font-size: 35px;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.75));
        opacity: 1;
        transition: opacity 500ms linear;

        .main-text {
            display: inline-block;
            line-height: 38px;

            span {
                display: inline;
                font-weight: normal;
                background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 35px;

                .icon-size {
                    font-size: 40px;
                }
            }
        }

        .secondary-text {
            display: inline-block;
            line-height: 28px;
            margin-top: 15px;

            span {
                font-size: 25px;
                font-weight: normal;
                display: inline;
                background: linear-gradient(to bottom, #eeeeee 0%, #cccccc 100%);
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }


        &.hidden {
            opacity: 0;
            transition: opacity 500ms linear;
        }
    }

    .error-row {
        position: absolute;
        top: 470px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 35px;
        background: linear-gradient(to bottom, #feccb1 0%, #f95a04 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.8));
        opacity: 0;
        transition: opacity 200ms linear;

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }

    .back-button {
        position: absolute;
        top: 580px;
        left: 295px;
        width: 250px;
    }

    .qr-image {
        display: block;
        width: 500px;
        height: 500px;
        position: absolute;
        top: -150px;
        left: 170px;
        box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.64);

        .loading{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255,255,255, 0.5);

            i {
                display: inline-block;
                font-size: 100px;
                animation: rotation 2s infinite linear;
                color:white;
            }
        }

        img {
            position:absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 200ms linear;

            &.loaded{
                opacity:1;
                transition: opacity 200ms linear;
            }
        }
    }
}

.leaf-pos-1 {
    opacity: 0.5;
    transform: translate(185px, 350px) rotate(-125deg) scale(1.2);
}

.leaf-pos-2 {
    opacity: 0.5;
    transform: translate(670px, 340px) rotate(125deg);
}

.leaf-pos-3 {
    opacity: 0.5;
    transform: translate(290px, 420px) rotate(155deg) scale(1.4);
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

.gradient-underlay {
    position: absolute;
    left: -30px;
    top: -100px;
    width: 900px;
    height: 840px;
    background: linear-gradient(to bottom, rgba(98, 125, 77, 0) 0%, rgba(31, 59, 8, 0.8) 65%, rgba(31, 59, 8, 0.8) 80%, rgba(31, 59, 8, 0) 100%);
}

</style>