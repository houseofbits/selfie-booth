<template>
    <div :class="{visible: images.length}" class="gallery-collapsible">

        <div :class="{visible: !isOpen}" class="icon-backdrop" @click.self="openGallery">
            <div class="shadow"></div>
            <div class="border"></div>
        </div>

        <gallery :collapse-images="imageData.isImagesCollapsed"
                 :images="images"
                 :selected="selectedImage"
                 @select-image="selectImage"
                 @delete-image="deleteImage"/>

        <div :class="{bounce: blinkImageCaptured, visible: !isOpen}" class="icon-overlay">
            <div class="highlight"></div>
            <div :class="{bounce: blinkImageCaptured}" class="info-box">
                <span>{{ images.length }}/4</span>
            </div>
        </div>

        <div :class="{visible:isInfoMessageVisible}" class="info-text"><span><i
            class="fas fa-info-circle"></i> {{ lang('capture.gallery-info') }}</span></div>

        <static-item :class="{visible: !isOpen}" class="leaf leaf-pos-1" image-id="1"></static-item>
        <static-item :class="{visible: !isOpen}" class="leaf leaf-pos-2" image-id="2"></static-item>

        <text-button :class="{visible: isOpen}" class="close-button red" icon="fas fa-times-circle"
                     @click="closeGallery">{{ lang('capture.close-button') }}</text-button>
    </div>
</template>

<script>
import Gallery from './Gallery.vue';
import TextButton from '../TextButton.vue';
import {GalleryActions, GalleryImageSize} from '../Constants.js';
import StaticItem from '../DynamicBackground/StaticItem.vue';

export default {
    name: "GalleryCollapsible",
    inject: ['lang', 'langService'],
    components: {
        Gallery,
        TextButton,
        StaticItem
    },
    props: {
        disabled: {
            type: Boolean
        },
        open: {
            type: Boolean
        },
        images: {
            type: Array
        },
        selectedImage: {
            type: Object
        }
    },
    data() {
        return {
            //Capture event blinker
            blinkImageCaptured: false,
            blinkImageCapturedTimer: null,

            isOpen: false,
            imageData: {
                isImagesCollapsed: true,
                imagesSize: GalleryImageSize.Minimized,
            },
        };
    },
    watch: {
        open(val) {
            if (val) {
                this.openGallery();
            } else {
                this.closeGallery();
            }
        },
        images(val) {
            clearTimeout(this.blinkImageCapturedTimer);
            this.blinkImageCaptured = true;
            this.blinkImageCapturedTimer = setTimeout(() => this.blinkImageCaptured = false, 500);
        }
    },
    computed: {
        isInfoMessageVisible() {
            return !this.selectedImage && this.open;
        }
    },
    methods: {
        openGallery() {
            if (!this.isOpen && !this.disabled) {
                this.isOpen = true;
                this.$emit('open');
                setTimeout(() => this.imageData.isImagesCollapsed = false, 160);
            }
        },
        closeGallery() {
            if (this.isOpen) {
                this.$emit('close');
                this.imageData.isImagesCollapsed = true;
                this.imageData.imagesSize = GalleryImageSize.Normal;
                this.$emit('image-action', GalleryActions.SelectImage, null);
                if (this.images.length > 1) {
                    setTimeout(() => this.isOpen = false, 300);
                } else {
                    this.isOpen = false;
                }
            }
        },
        selectImage(image) {
            if (!this.isOpen) {
                this.openGallery();
            } else {
                this.$emit('select-image', image);
            }
        },
        deleteImage(image) {
            this.$emit('delete-image', image);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gallery-collapsible {
    opacity: 0;
    transition: all 700ms linear;

    &.visible {
        opacity: 1;
        transition: all 700ms linear;
    }

    .close-button {
        top: 1570px;
        left: 430px;
        width: 220px;
        z-index: 2;
        opacity: 0;
        visibility: hidden;
        transition: all 100ms linear;

        &.visible {
            opacity: 1;
            visibility: visible;
            transition: all 400ms linear;
        }
    }
}

.icon-overlay {
    position: absolute;
    top: $gallery-icon-pos-top+px;
    left: $gallery-icon-pos-left+px;
    width: $gallery-icon-size+px;
    height: $gallery-icon-size+px;
    border-radius: ($gallery-icon-size/2)+px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(to bottom, rgba(0,0,0,0) 34%,rgba(67,109,61,1) 100%);
    transition: all 500ms linear;
    filter: brightness(1.0);
    z-index: 3;
    opacity: 0;
    visibility: hidden;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 400ms linear;
    }

    &.bounce {
        filter: brightness(3.0);
        transition: filter 200ms linear;
    }

    .highlight {
        display: block;
        position: absolute;
        top: 10px;
        bottom: 55px;
        right: 7px;
        left: 7px;
        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        border-bottom-left-radius: 100px 40px;
        border-bottom-right-radius: 100px 40px;
        background-image: url('@images/right-icon-hilight.png');
    }

    .info-box {
        position: absolute;
        margin-left: -25px;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        top: 15px;
        left: 15px;
        border-radius: 50%;
        background: linear-gradient(to bottom, rgba(254, 204, 177, 1) 0%, rgba(241, 116, 50, 1) 50%, rgba(241, 116, 50, 1) 50%, rgba(234, 85, 7, 1) 61%, rgba(234, 85, 7, 1) 61%, rgba(251, 149, 94, 1) 100%);
        line-height: 50px;
        text-align: center;
        font-size: 21px;
        font-weight: bold;
        box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.56);

        span {
            background: linear-gradient(to bottom, rgba(109, 0, 25, 1) 0%, rgba(193, 3, 7, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.bounce {
            animation-name: info-button-bounce;
            animation-duration: 500ms;
            animation-timing-function: ease-in-out;
        }
    }
}

@keyframes info-button-bounce {
    0% {
        width: 50px;
        height: 50px;
        margin-left: -25px;
        margin-top: -25px;
        line-height: 50px;
        font-size: 21px;
    }
    50% {
        width: 80px;
        height: 80px;
        margin-left: -40px;
        margin-top: -40px;
        line-height: 80px;
        font-size: 36px;
    }
    100% {
        width: 50px;
        height: 50px;
        margin-left: -25px;
        margin-top: -25px;
        line-height: 50px;
        font-size: 21px;
    }
}

.icon-backdrop {
    position: absolute;
    top: $gallery-icon-pos-top+px;
    left: $gallery-icon-pos-left+px;
    width: $gallery-icon-size+px;
    height: $gallery-icon-size+px;
    z-index: 1;
    transition: all 200ms linear;
    opacity: 0;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 200ms linear;
    }

    .shadow {
        display: block;
        position: absolute;
        top: 10px;
        bottom: -10px;
        right: -25px;
        left: -25px;
        border-radius: 50% 50% 100px 100px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.48) 100%);
    }

    .border {
        position: absolute;
        top: -5px;
        bottom: -5px;
        right: -5px;
        left: -5px;
        border-radius: 50%;
        box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.56);
        background: linear-gradient(to bottom,
            #ffffff 0%,
            rgba(169, 210, 243, 1) 10%,
            rgba(144, 186, 228, 1) 25%,
            rgba(144, 188, 234, 1) 37%,
            #91d271 50%,
            #57b975 56%,
            rgba(52, 201, 189, 1) 100%);
    }
}

.gallery-transition-collapse .close-button {
    display: none;
}

.gallery-transition-expand .close-button {
    display: block;
}

.leaf {
    opacity: 0;
    visibility: hidden;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 200ms linear;
    }
}

.leaf-pos-1 {
    transform: translate(990px, 1650px) rotate(15deg);
}

.leaf-pos-2 {
    transform: translate(910px, 1680px) rotate(-120deg);
}

.info-text {
    position: absolute;
    top: 910px;
    width: 1080px;
    left: 0;
    display: inline-block;
    line-height: 28px;
    margin-top: 15px;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.61));
    text-align: center;
    transition: all 300ms linear;
    opacity: 0;

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

</style>
