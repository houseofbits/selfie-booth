<template>
    <div>
        <span @click="langService.setLanguage(0)">LV</span>|<span @click="langService.setLanguage(1)">EN</span>|<span
        @click="langService.setLanguage(2)">RU</span> => {{ lang('test-key') }}

        <div :class="galleryFrameClass" class="gallery-frame" @click.self="openGallery">
            <div class="close-button" @click.self="closeGallery"></div>
        </div>

        <div :class="themesFrameClass" class="themes-frame" @click.self="openThemes">
            <div class="close-button" @click.self="closeThemes"></div>
        </div>

        <!--        <div class="images-row">-->
        <!--            <div v-for="(item, index) in items" :key="item.id"-->
        <!--                 :class="{remove:item.remove, selected:(index===selected), 'not-selected': notSelected(index)}"-->
        <!--                 class="image-thumbnail">-->
        <!--                <div class="image-thumbnail-inner">-->
        <!--                    &lt;!&ndash;                    <div class="delete-image-button" @click.self="remove(index)"></div>&ndash;&gt;-->
        <!--                    <buttons-mockup :is-active="(index===selected)" class="delete-image-button buttons-block"-->
        <!--                                    @close="remove(index)"></buttons-mockup>-->
        <!--                    <img :src="'https://picsum.photos/200/300?random=' + item.id" alt="" height="100%"-->
        <!--                         width="100%" @click.self="select(index)"/>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

<!--        <div class="relative-items">-->
<!--            <div v-for="(item, index) in items" :key="item.id"-->
<!--                 :class="{remove:item.remove, selected:(index===selected), 'not-selected': notSelected(index), collapse:collapse}"-->
<!--                 class="image">-->
<!--                <buttons-mockup :is-visible="!collapse && !item.remove" :is-active="(index===selected && !collapse)" class="buttons-block"-->
<!--                                @delete="remove(index)"></buttons-mockup>-->
<!--                <img :src="'https://picsum.photos/200/300?random=' + item.id" alt="" height="100%"-->
<!--                     width="100%" @click.self="select(index)"/>-->
<!--            </div>-->
<!--        </div>-->

        <div class="relative-items">
            <gallery-image v-for="(image, index) in items"
                          :key="image.id"
                          :image="image"
                          :selected="selected"
                          :collapse="collapse"
                          @action="imageAction"
                          @select="selectImage"
                          @delete-image="deleteImage"/>
        </div>

    </div>
</template>

<script>
import GalleryImage from './GalleryImage.vue';

export default {
    name: "TransitionsMockup",
    components: {
        GalleryImage
    },
    data() {
        return {
            isGallerySelected: false,
            isThemesSelected: false,
            items: [
                {
                    id: 1,
                    remove: false
                },
                {
                    id: 2,
                    remove: false
                },
                {
                    id: 3,
                    remove: false
                },
                {
                    id: 4,
                    remove: false
                }
            ],
            selected: null,
            collapse: null,
        };
    },
    inject: ['lang', 'langService'],
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
        selectImage(index) {
            this.selected = index;
        },
        deleteImage(i) {
           // console.log(parseInt(i));
           // console.log(this.items.splice(parseInt(i), 1));
            this.items.splice(parseInt(i), 1);
        },
        imageAction(action){
            this.collapse = true;
        }
    }
}
</script>

<style lang="scss" scoped>
/**********************************************************************************/
.relative-items {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    width: 1080px;
    height: 600px;
    top: 100px;
    text-align: center;
    line-height: 600px;
    vertical-align: bottom;

    //.image {
    //    display: inline-block;
    //    position: relative;
    //    width: 200px;
    //    height: 380px;
    //    background-color: #6c6b6b;
    //    padding: 0;
    //    transition: all 0.2s linear;
    //    vertical-align: middle;
    //    margin: 0 15px;
    //
    //    .buttons-block {
    //        position: absolute;
    //        bottom: -40px;
    //        width: 100%;
    //        height: 80px;
    //        transition: all 0.2s linear;
    //    }
    //
    //    &.selected {
    //        width: 270px;
    //        height: 470px;
    //        transition: all 0.2s linear;
    //        z-index: 5;
    //    }
    //
    //    &.not-selected {
    //        width: 170px;
    //        height: 330px;
    //        transition: all 0.2s linear;
    //    }
    //
    //    &.collapse {
    //        margin: 0 0 0 -200px;
    //        transform: translateX(50%);
    //    }
    //
    //    &.not-selected.collapse {
    //        margin: 0 0 0 -170px;
    //        transform: translateX(50%);
    //    }
    //
    //    &.selected.collapse {
    //        margin: 0 0 0 -270px;
    //        transform: translateX(50%);
    //    }
    //
    //    &.remove {
    //        width: 0;
    //        margin-left: 0;
    //        margin-right: 0;
    //        transition: all 0.2s ease-in;
    //    }
    //}
}

/**********************************************************************************/
//.images-row {
//    pointer-events: auto;
//    position: absolute;
//    background-color: rgba(0, 0, 0, 0.6);
//    width: 1080px;
//    height: 600px;
//    top: 800px;
//    text-align: center;
//    line-height: 600px;
//}
//
//.image-thumbnail {
//    transition: all 0.2s linear;
//    display: inline-block;
//    vertical-align: middle;
//    margin-right: 15px;
//    margin-left: 15px;
//    width: 200px;
//    height: 380px;
//    border: solid 5px darkgray;
//}
//
//.image-thumbnail-inner {
//    position: relative;
//    width: 100%;
//    height: 100%;
//}
//
//.image-thumbnail.remove {
//    width: 0;
//    margin-left: 0;
//    margin-right: 0;
//    transition: all 0.2s ease-in;
//    //transition-delay: 400ms;
//}

//.image-thumbnail.selected {
//    width: 270px;
//    height: 470px;
//    transition: all 0.2s linear;
//}
//
//.image-thumbnail.not-selected {
//    width: 170px;
//    height: 330px;
//    transition: all 0.2s linear;
//}
//
//.images-reduce-enter-from,
//.images-reduce-leave-to {
//    opacity: 0;
//    transform: translateX(-100px) translateY(160px) scale(0.1);
//}
//
//.images-reduce-leave-active {
//    position: absolute;
//}
//
//.image-thumbnail.remove .delete-image-button {
//    transform: scale(0);
//    left: -40px;
//    transition: all 0.2s ease-in;
//}

//.image-thumbnail.remove .delete-image-button {
//    transform: scale(0);
//    transition: all 0.2s ease-in;
//    transition-delay: 400ms;
//}

//.image-thumbnail.selected .delete-image-button {
//    left: 95px;
//    transition: all 0.2s linear;
//}
//
//.image-thumbnail.not-selected .delete-image-button {
//    left: 45px;
//    transition: all 0.2s linear;
//}

/******************************************************************************************/

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
    //display: flex;
    //justify-content: stretch;
    //flex-direction: column;
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

//.items li:nth-child(1)  { transform: translate(0, 0%); }
//.items li:nth-child(2)  { transform: translate(0, 100%); }
//.items li:nth-child(3)  { transform: translate(0, 200%); }
//.items li:nth-child(4)  { transform: translate(0, 300%); }
//.items li:nth-child(5)  { transform: translate(0, 400%); }

</style>
