<template>
    <div :class="frameClass" class="relative-items">
        <div :class="backDropClass" class="static-backdrop" @click="closeImage"></div>
        <gallery-image v-for="(image, index) in images"
                       :key="image.id"
                       :collapse="collapseImages"
                       :collapsed-type="imagesSize"
                       :image="image"
                       :selected="selected"
                       @action="imageAction"/>
    </div>
</template>

<script>
import GalleryImage from './GalleryImage.vue';
import {GalleryActions} from './Constants.js';

export default {
    name: "Gallery",
    components: {
        GalleryImage
    },
    props: {
        images: {
            type: Array
        },
        collapseImages: {
            type: Boolean
        },
        imagesSize: {
            type: Number
        },
        selected: {
            type: Object
        }
    },
    data() {
        return {};
    },
    computed: {
        backDropClass() {
            return {
                active: this.collapseImages && this.imagesSize === 1
            };
        },
        frameClass() {
            return {
                'background-hide-transition': this.collapseImages,
                'background-show-transition': !this.collapseImages,
            };
        }
    },
    methods: {
        closeImage() {
            this.imageAction(GalleryActions.MinimizeImage)
        },
        imageAction(action, image) {
            this.$emit('image-action', action, image);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.relative-items {
    pointer-events: auto;
    position: absolute;
    top: 0;
    background: linear-gradient(to right, rgba(157, 213, 58, 0) 0%, rgba(92, 145, 55, 0.36) 21%, rgba(93, 148, 53, 0.39) 23%, rgba(112, 191, 22, 0.39) 49%, rgba(72, 156, 10, 0.39) 75%, rgba(69, 153, 9, 0.36) 77%, rgba(69, 153, 9, 0) 100%);
    width: 100%;
    height: 100%;
    text-align: center;
    transition: all 0.2s linear;

    .static-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: $screen-width+px;
        height: $screen-height+px;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        display: none;
        transition: all 0.2s linear;
        z-index: 4;

        &.active {
            display: block;
            opacity: 1;
        }
    }

    &.background-hide-transition {
        animation-name: background-hide-transition;
        animation-duration: 500ms;
        animation-timing-function: linear;
        animation-fill-mode: both;
    }

    &.background-show-transition {
        animation-name: background-show-transition;
        animation-duration: 500ms;
        animation-timing-function: linear;
        animation-fill-mode: both;
    }
}

@keyframes background-hide-transition {
    0% {
    //    background-color: rgba(0, 0, 0, 0.5);
    }
    40% {
     //   background-color: rgba(0, 0, 0, 0.4);
    }
    60% {
    //    background-color: rgba(0, 0, 0, 0);
    }
    100% {
    //    background-color: rgba(0, 0, 0, 0);
    }
}

@keyframes background-show-transition {
    0% {

    }
    30% {

    }
    100% {

    }
}


</style>
