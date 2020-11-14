<template>
    <div :class="galleryFrameClass" class="gallery-frame" @click.self="openGallery">
        <div class="close-button" @click.self="closeGallery"></div>
        <gallery :collapse-images="imageData.isImagesCollapsed"
                 :images="images"
                 :images-size="imageData.imagesSize"
                 :selected="imageData.selected"
                 @image-action="imageAction"
        />
        <div v-if="imageData.isImagesCollapsed" class="gallery-icon-overlay" @click.self="openGallery"></div>
    </div>
</template>

<script>
import Gallery from './Gallery.vue';
import {GalleryActions} from './Constants.js';

export default {
    name: "GalleryCollapsible",
    components: {
        Gallery
    },
    props: {
        open: {
            type: Boolean
        },
        images: {
            type: Array
        },
    },
    data() {
        return {
            isOpen: false,
            imageData: {
                selected: null,
                isImagesCollapsed: true,
                imagesSize: 2,
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
        // images(val){
        //     console.log();
        // }
    },
    computed: {
        galleryFrameClass() {
            return {
                'transition-expand': this.isOpen,
                'transition-collapse': !this.isOpen,
                'images-collapse': (this.imageData.isImagesCollapsed && this.imageData.imagesSize === 2),
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
                    setTimeout(() => this.imageData.imagesSize = 0, 30);
                    setTimeout(() => this.imageData.isImagesCollapsed = false, 160);
                } else {
                    this.imageData.imagesSize = 0;
                    this.imageData.isImagesCollapsed = false;
                }
            }
            this.isThemesSelected = false;
        },
        closeGallery() {
            if (this.isOpen) {
                this.$emit('close');
                this.imageData.isImagesCollapsed = true;
                this.imageData.imagesSize = 0;
                this.imageData.selected = null;
                if (this.images.length > 1) {
                    setTimeout(() => this.imageData.imagesSize = 2, 300);
                    setTimeout(() => this.isOpen = false, 300);
                } else {
                    this.imageData.imagesSize = 2;
                    this.isOpen = false;
                }
            }
        },
        deleteImage(image) {
            const index = this.images.findIndex(element => element.id === image.id);
            if (index >= 0) {
                this.$emit('delete', index);
            }
        },
        imageAction(action, image) {
            switch (action) {
                case GalleryActions.SelectImage:
                    this.imageData.selected = image;
                    break;
                case GalleryActions.DeleteImage:
                    this.deleteImage(image);
                    break;
                case GalleryActions.MinimizeImage:
                    this.imageData.selected = null;
                    this.imageData.imagesSize = 0;
                    this.imageData.isImagesCollapsed = false;
                    break;
                default:
                    this.imageData.imagesSize = 1;
                    this.imageData.isImagesCollapsed = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gallery-icon-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 0, 0);
    pointer-events: auto;
}

.gallery-frame {
    pointer-events: none;
    position: absolute;
    transition: all 200ms linear;
    opacity: 1;

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

.close-button {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(255, 0, 0, 0.6);
    border: 2px solid red;
    width: 80px;
    height: 80px;
    top: -40px;
    right: 50px;
    border-radius: 50%;
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
    top: $gallery-icon-pos-top;
    left: $gallery-icon-pos-left;
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
