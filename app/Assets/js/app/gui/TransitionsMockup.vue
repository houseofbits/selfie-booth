<template>
    <div>

<!--        <div :class="galleryFrameClass" class="gallery-frame" @click.self="openGallery">-->
<!--            <div class="close-button" @click.self="closeGallery"></div>-->
<!--        </div>-->

<!--        <div :class="themesFrameClass" class="themes-frame" @click.self="openThemes">-->
<!--            <div class="close-button" @click.self="closeThemes"></div>-->
<!--        </div>-->

<!--        <div class="images-row">-->
<!--            <transition-group name="images-reduce" tag="p">-->
<!--                <div v-for="(item, index) in items" :key="item" class="image-thumbnail">-->
<!--                    <div class="image-thumbnail-inner">-->
<!--                        <div class="delete-image-button" @click.self="remove(index)"></div>-->
<!--                        <img src="https://picsum.photos/200/350" width="100%" height="100%" @click.self="select(index)"/>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </transition-group>-->
<!--        </div>-->

<!--        <div class="images-row">-->
<!--            <div v-for="(item, index) in items" :key="item" class="image-thumbnail">-->
<!--                <div class="image-thumbnail-inner">-->
<!--                    <div class="delete-image-button" @click.self="remove(index)"></div>-->
<!--                    <img src="https://picsum.photos/200/350" width="100%" height="100%" @click.self="select(index)"/>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script>
export default {
    name: "TransitionsMockup",
    data() {
        return {
            isGallerySelected: false,
            isThemesSelected: false,
            items: [1, 2, 3, 4],
            selected: null,
        };
    },
    computed: {
        galleryFrameClass() {
            if (this.isGallerySelected) {
                return 'gallery-transition-expand';
            }
            return 'gallery-transition-collapse';
        },
        themesFrameClass() {
            if (this.isThemesSelected) {
                return 'themes-transition-expand';
            }
            return 'themes-transition-collapse';
        }
    },
    methods: {
        openThemes() {
            this.isThemesSelected = true;
            this.isGallerySelected = false;
        },
        closeThemes() {
            this.isThemesSelected = false;
        },
        openGallery() {
            this.isGallerySelected = true;
            this.isThemesSelected = false;
        },
        closeGallery() {
            this.isGallerySelected = false;
        },
        select(index){
            this.selected = index;
        },
        remove(i) {
            this.items.splice(i, 1);
        }
    }
}
</script>

<style lang="scss" scoped>

.images-row {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    width: 1080px;
    height: 600px;
    top: 1000px;

    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.image-thumbnail {
    transition: all 0.4s ease-out;
    display: inline-block;
    margin-right: 15px;
    margin-left: 15px;
    width: 200px;
    height: 380px;
    border: solid 5px darkgray;
}



.image-thumbnail-inner {
    position: relative;
    width: 100%;
    height: 100%;
}

.images-reduce-enter-from,
.images-reduce-leave-to {
    opacity: 0;
    transform: translateX(-100px) translateY(160px) scale(0.1);
}

.images-reduce-leave-active {
    position: absolute;
}

.delete-image-button {
    position: absolute;
    bottom: -40px;
    left: 60px;
    background-color: red;
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

$gallery-icon-pos-top: 1730px;
$gallery-icon-pos-left: 880px;
$gallery-icon-size: 160px;
$gallery-height: 650px;
$gallery-pos-top: 1000px;

$theme-icon-pos-top: 1730px;
$theme-icon-pos-left: 80px;
$theme-icon-size: 160px;
$theme-height: 650px;
$theme-pos-top: 1000px;

.gallery-frame, .themes-frame {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid red;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
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

.gallery-transition-collapse {
    animation-name: gallery-collapse;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-direction: alternate;
}

.gallery-transition-expand {
    animation-name: gallery-expand;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
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


//.items { position: relative; }
//.items li {
//position: absolute; top: ; left: ;
//transition: all 0.2s ease-out;
//}
 
.items li:nth-child(1)  { transform: translate(0, 0%); }
.items li:nth-child(2)  { transform: translate(0, 100%); }
.items li:nth-child(3)  { transform: translate(0, 200%); }
.items li:nth-child(4)  { transform: translate(0, 300%); }
.items li:nth-child(5)  { transform: translate(0, 400%); }

</style>
