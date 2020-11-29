<template>
    <div :class="{visible: images.length}" class="gallery-collapsible">
        <div class="icon-backdrop" :class="{visible: !isOpen}">
            <div class="shadow"></div>
            <div class="border"></div>
        </div>
        <div :class="galleryFrameClass" class="gallery-frame" @click.self="openGallery">
            <gallery :collapse-images="imageData.isImagesCollapsed"
                     :images="images"
                     :images-size="imageData.imagesSize"
                     :selected="selectedImage"
                     @image-action="imageAction"
            />
            <div v-if="imageData.isImagesCollapsed" class="gallery-icon-overlay" @click.self="openGallery"></div>
        </div>
        <div :class="{bounce: blinkImageCaptured, visible: !isOpen}" class="icon-overlay">
            <div class="highlight"></div>
            <div :class="{bounce: blinkImageCaptured}" class="info-box">
                <span>{{ images.length }}/4</span>
            </div>
        </div>
        <text-button :class="{visible: isOpen}" icon="fas fa-times-circle" class="close-button red" @click="closeGallery">AIZVĒRT</text-button>
    </div>
</template>

<script>
import Gallery from './Gallery.vue';
import TextButton from '../TextButton.vue';
import {GalleryActions, GalleryImageSize} from '../Constants.js';

export default {
    name: "GalleryCollapsible",
    components: {
        Gallery,
        TextButton
    },
    props: {
        open: {
            type: Boolean
        },
        images: {
            type: Array
        },
        selectedImage: {
            type: Object
        },
        maximizeSelectedImage: {
            type: Boolean
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
    inject: ['lang', 'langService'],
    watch: {
        open(val) {
            if (val) {
                this.openGallery();
            } else {
                this.closeGallery();
            }
        },
        maximizeSelectedImage(val){
            if(!val && this.imageData.imagesSize === GalleryImageSize.Expanded){
                this.imageData.imagesSize = GalleryImageSize.Normal;
                this.imageData.isImagesCollapsed = false;
            }
        },
        images(val) {
            clearTimeout(this.blinkImageCapturedTimer);
            this.blinkImageCaptured = true;
            this.blinkImageCapturedTimer = setTimeout(() => this.blinkImageCaptured = false, 500);
        }
    },
    computed: {
        galleryFrameClass() {
            return {
                'transition-expand': this.isOpen,
                'transition-collapse': !this.isOpen,
                'images-collapse': (this.imageData.isImagesCollapsed && this.imageData.imagesSize === GalleryImageSize.Minimized),
                'hidden': this.images.length === 0,
            };
        },
    },
    methods: {
        openGallery() {
            if (!this.isOpen) {
                this.isOpen = true;
                this.$emit('open');
                if (this.images.length > 1) {
                    setTimeout(() => this.imageData.imagesSize = GalleryImageSize.Normal, 30);
                    setTimeout(() => this.imageData.isImagesCollapsed = false, 160);
                } else {
                    this.imageData.imagesSize = GalleryImageSize.Normal;
                    this.imageData.isImagesCollapsed = false;
                }
            }
            this.isThemesSelected = false;
        },
        closeGallery() {
            if (this.isOpen) {
                this.$emit('close');
                this.imageData.isImagesCollapsed = true;
                this.imageData.imagesSize = GalleryImageSize.Normal;
                this.$emit('image-action', GalleryActions.SelectImage, null);
                if (this.images.length > 1) {
                    setTimeout(() => this.imageData.imagesSize = GalleryImageSize.Minimized, 300);
                    setTimeout(() => this.isOpen = false, 300);
                } else {
                    this.imageData.imagesSize = GalleryImageSize.Minimized;
                    this.isOpen = false;
                }
            }
        },
        imageAction(action, image) {
            switch (action) {
                case GalleryActions.ShareFacebook:
                case GalleryActions.ShareEmail:
                case GalleryActions.ShareDownload:
                    this.imageData.imagesSize = GalleryImageSize.Expanded;
                    this.imageData.isImagesCollapsed = true;
            }
            this.$emit('image-action', action, image);
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
        top: 1550px;
        left: 440px;
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
    width: $gallery-icon-size;
    height: $gallery-icon-size;
    border-radius: $gallery-icon-size/2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 34%, rgb(70, 107, 127) 100%);
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
        transition: all 200ms linear;
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
        background: linear-gradient(to bottom, rgba(254, 252, 234, 0.05) 0%, rgba(54, 225, 241, 0.6) 100%);
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
    width: $gallery-icon-size;
    height: $gallery-icon-size;
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
        background: linear-gradient(to bottom, rgba(184, 225, 252, 1) 0%, rgba(169, 210, 243, 1) 10%, rgba(144, 186, 228, 1) 25%, rgba(144, 188, 234, 1) 37%, rgba(144, 191, 240, 1) 50%, rgba(107, 168, 229, 1) 51%, rgba(52, 201, 189, 1) 100%);
    }
}

.gallery-icon-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: auto;
}

.gallery-frame {
    pointer-events: none;
    position: absolute;
    transition: all 200ms linear;
    opacity: 1;
    z-index: 3;

    &.hidden {
        opacity: 0;
    }

    &.images-collapse {
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0);
    }

    &.transition-collapse {
        animation-name: gallery-collapse;
        animation-duration: 300ms;
        animation-timing-function: ease-out;
        animation-fill-mode: both;
        animation-direction: alternate;
    }

    &.transition-expand {
        animation-name: gallery-expand;
        animation-duration: 300ms;
        animation-timing-function: ease-out;
        animation-fill-mode: both;
    }
}

.gallery-transition-collapse .close-button {
    display: none;
}

.gallery-transition-expand .close-button {
    display: block;
}

@mixin gallery-state-0 {
    top: $gallery-pos-top;
    left: 0;
    width: 1080px;
    height: $gallery-height;
}

@mixin gallery-state-100 {
    top: $gallery-icon-pos-top+px;
    left: $gallery-icon-pos-left+px;
    width: $gallery-icon-size;
    height: $gallery-icon-size;
    border-radius: $gallery-icon-size/2;
}

@keyframes gallery-collapse {
    0% {
        @include gallery-state-0;
    }
    100% {
        @include gallery-state-100;
    }
}

@keyframes gallery-expand {
    0% {
        @include gallery-state-100;
    }
    100% {
        @include gallery-state-0;
    }
}

</style>