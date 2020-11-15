<template>
    <div class="gui-frame">
        <gallery-collapsible :images="images" :open="isGalleryOpen" @close="isGalleryOpen=false" @delete="deleteImage"
                             @open="openGallery"/>
        <themes-collapsible :open="isThemesOpen" @close="isThemesOpen=false" @open="openThemes"/>
        <record-button @record="captureImage"/>
        <snapshot-image :captured-image-data="images"></snapshot-image>

        <div class="button-with-shadow" :class="{wide: isopen}" @click="isopen = !isopen">
            <div class="shadow"></div>
            <div class="button-delete">
                <div class="gradient"></div>
                <div class="highlight"></div>
                <div class="line"><i class="fas fa-trash-alt"></i> <span class="text">DZĒST</span></div>
            </div>
        </div>

        <div class="button-with-shadow" :class="{wide: isopen}" @click="isopen = !isopen">
            <div class="shadow"></div>
            <div class="button-delete">
                <div class="gradient"></div>
                <div class="highlight"></div>
                <div class="line"><i class="fab fa-facebook-square"></i> <span class="text">DALĪTIES</span></div>
            </div>
        </div>

        <div class="button-with-shadow" :class="{wide: isopen}" @click="isopen = !isopen">
            <div class="shadow"></div>
            <div class="button-delete">
                <div class="gradient"></div>
                <div class="highlight"></div>
                <div class="line"><i class="fas fa-envelope-open-text"></i> <span class="text small">SŪTĪT E-PASTĀ</span></div>
            </div>
        </div>

        <div class="button-with-shadow" :class="{wide: isopen}" @click="isopen = !isopen">
            <div class="shadow"></div>
            <div class="button-delete">
                <div class="gradient"></div>
                <div class="highlight"></div>
                <div class="line"><i class="fas fa-cloud-download-alt"></i> <span class="text small">LEJUPLĀDĒT</span></div>
            </div>
        </div>

    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';
import CaptureImageData from "./Structures/CapturedImageData";
import GalleryCollapsible from './GalleryCollapsible.vue';
import ThemesCollapsible from './ThemesCollapsible.vue';
import SnapshotImage from './SnapshotImage.vue';
import RecordButton from './RecordButton.vue';

export default {
    name: "MainView",
    data() {
        return {
            images: [],
            isGalleryOpen: false,
            isThemesOpen: false,

            isopen:false
        }
    },
    components: {
        GalleryCollapsible,
        ThemesCollapsible,
        RecordButton,
        SnapshotImage
    },
    methods: {
        openGallery() {
            this.isGalleryOpen = true;
            this.isThemesOpen = false;
        },
        openThemes() {
            this.isThemesOpen = true;
            this.isGalleryOpen = false;
        },
        deleteImage(image) {
            this.images.splice(parseInt(image), 1);
            if(this.images.length === 0) {
                this.isGalleryOpen = false;
            }
        },
        captureImage() {
            if (this.images.length < 4) {
                MainSceneInstance.captureScreenshot().then(this.imageCaptureFinished);
            }
        },
        imageCaptureFinished(base64Image) {
            if (this.images.length < 4) {
                this.images.push(new CaptureImageData(this.images.length, base64Image));
                this.isGalleryOpen = false;
                this.isThemesOpen = false;
            }
        },
    }
}
</script>

<style lang="scss">
@import '/css/app/variables.scss';

.gui-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: $screen-width+px;
    height: $screen-height+px;
    //border: solid 1px red;
    pointer-events: none;
}



.button-with-shadow {
    position: relative;
    margin-top:20px;
    margin-left:20px;
    width: 80px;
    height: 80px;
    transition: all 0.2s linear;
    //border: dotted 1px black;
    pointer-events: auto;

    &.wide {
        width: 250px;
        height: 60px;
    }
    .button-delete {
        pointer-events: none;
        display: inline-block;
        position: absolute;
        text-align: center;
        overflow: hidden;
        top:0;
        left: 0;
        width:100%;
        height:100%;
        border-radius: 40px;
        box-shadow: 0 5px 6px 3px rgba(0,0,0,0.56);
        background: linear-gradient(to bottom, #fcf0bd 0%,#968a75 100%);

        .gradient{
            display: block;
            position: absolute;
            top:2px;
            bottom:2px;
            right:2px;
            left: 2px;
            border-radius: 38px;
            background: linear-gradient(to bottom, #ff6759 0%,#a51010 63%,#d60404 100%);
        }
        .highlight{
            display: block;
            position: absolute;
            top:8px;
            bottom:25px;
            right:7px;
            left: 7px;
            border-radius: 40px 40px 50% 50%;
            background: linear-gradient(to bottom, rgba(254,187,187,0.15) 0%,rgba(254,144,144,0.20) 45%,rgba(255,92,92,0.5) 100%);
        }
        .line{
            display: inline;
            width:auto;
            line-height: 80px;
            text-align: center;
            white-space: nowrap;
            font-weight: bold;
            font-size: 45px;
            background: linear-gradient(to bottom, #6d0019 0%,#8f0222 56%,#a90329 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(0,0,0,0.3);
            filter: drop-shadow(0 1px 3px rgba(255,92,92,1));

            .text {
                line-height: 60px;
                font-size: 25px;
                white-space: pre-wrap;
                &.small {
                    font-size: 20px;
                }
            }
        }
    }
    & .line {
        font-size: 45px;
        line-height: 80px;
        transition: all 0.2s linear;
    }
    &.wide .line {
        font-size: 35px;
        line-height: 60px;
    }
    & .text{
        display:none;
        transition: all 0.2s linear;
    }
    &.wide .text{
        display:inline;
    }
    .shadow {
        display: block;
        position: absolute;
        top:10px;
        bottom:-4px;
        right:-13px;
        left: -13px;
        border-radius: 50% 50% 55px 55px;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 45%,rgba(0,0,0,0.48) 100%);
    }
}

</style>