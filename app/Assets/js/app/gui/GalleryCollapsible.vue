<template>
    <div>
        <span @click="langService.setLanguage(0)">LV</span>|<span @click="langService.setLanguage(1)">EN</span>|<span
        @click="langService.setLanguage(2)">RU</span> => {{ lang('test-key') }}

        <div :class="galleryFrameClass" class="gallery-frame" @click.self="openGallery">
<!--            <div class="close-button" @click.self="closeGallery"></div>-->
            <gallery :collapse-images="isImagesCollapsed" />
            <div v-if="isImagesCollapsed" class="gallery-icon-overlay" @click.self="openGallery"></div>
        </div>

        <div :class="themesFrameClass" class="themes-frame" @click.self="openThemes">
            <div class="close-button" @click.self="closeThemes"></div>
        </div>

    </div>
</template>

<script>
import Gallery from './Gallery.vue';

export default {
    name: "GalleryCollapsible",
    components: {
        Gallery
    },
    data() {
        return {
            isGallerySelected: false,
            isThemesSelected: false,
            isImagesCollapsed: true,
        };
    },
    inject: ['lang', 'langService'],
    computed: {
        galleryFrameClass() {
            return {
                'transition-expand': this.isGallerySelected,
                'transition-collapse': !this.isGallerySelected,
                'images-collapse': this.isImagesCollapsed
            };
        },
        themesFrameClass() {
            if (this.isThemesSelected) {
                return 'themes-transition-expand';
            }
            return 'themes-transition-collapse';
        },
    },
    methods: {
        openThemes() {
            this.isThemesSelected = true;
            this.closeGallery();
        },
        closeThemes() {
            this.isThemesSelected = false;
        },
        openGallery() {
            if(!this.isGallerySelected) {
                this.isGallerySelected = true;
                setTimeout(() => this.isImagesCollapsed = false, 160);
            } else{
                this.closeGallery();
            }
            this.isThemesSelected = false;
        },
        closeGallery() {
            if(this.isGallerySelected) {
                this.isImagesCollapsed = true;
                setTimeout(() => this.isGallerySelected = false, 250);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gallery-icon-overlay{
    position:absolute;
    width: 100%;
    height:100%;
    background-color: rgba(255,255,0, 0);
}

.gallery-frame, .themes-frame {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
//    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.23) 8%,rgba(0,0,0,0.4) 14%,rgba(0,0,0,0.4) 83%,rgba(0,0,0,0.38) 84%,rgba(0,0,0,0) 100%);
    transition: all 200ms linear;

    &.images-collapse{
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



.themes-transition-collapse {
    animation-name: themes-collapse;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-direction: alternate;
}

.themes-transition-expand {
    animation-name: themes-expand;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
}

.gallery-transition-collapse .close-button,
.themes-transition-collapse .close-button {
    display: none;
}

.gallery-transition-expand .close-button,
.themes-transition-expand .close-button {
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

@mixin theme-state-0 {
    top: $theme-pos-top;
    left: 0;
    width: 1080px;
    height: $theme-height;
}

@mixin theme-state-100 {
    top: $theme-icon-pos-top;
    left: $theme-icon-pos-left;
    width: $theme-icon-size;
    height: $theme-icon-size;
    border-radius: $theme-icon-size/2;
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

@keyframes themes-collapse {
    0% {
        @include theme-state-0;
    }
    100% {
        @include theme-state-100;
    }
}

@keyframes themes-expand {
    0% {
        @include theme-state-100;
    }
    100% {
        @include theme-state-0;
    }
}
</style>
