<template>
    <div :class="{'visible': visible}" class="gallery">
        <div class="header-row">
            <span v-if="!isSelected">Select image to share it</span>
        </div>
        <div class="images-row">
            <div v-for="(imgData, index) in capturedImageData" :class="{'selected':isImageSelected(index)}"
                 class="image-thumbnail">
                <div class="image-thumbnail-static">
                    <img :src="imgData.base64data" alt="Thumbnail" height="100%" width="100%" @click="selectImage(index)"/>
                    <div class="image-delete-button" @click="deleteImage(index)">X</div>
                </div>
            </div>
        </div>
        <div class="button-row" :class="{'enabled':isSelected}">
            <div class="share-button" @click="shareFacebook">Share to Facebook</div>
            <div class="share-button" @click="shareEmail">Send to E-mail</div>
            <div class="share-button" @click="shareDownload">Download to smartphone</div>
        </div>
    </div>
</template>

<script>

import {SharingViewState} from '/js/app/gui/Constants';

export default {
    props: {
        capturedImageData: {
            type: Array,
            required: true,
        },
        selectedImage: {
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    computed:{
        isSelected(){
            return this.selectedImage !== null;
        }
    },
    methods: {
        isImageSelected(index) {
            return (index === this.selectedImage);
        },
        selectImage(index) {
            this.$emit('select', index);
        },
        deleteImage(index) {
            this.$emit('delete', index);
        },
        shareFacebook(){
            this.$emit('share', SharingViewState.FacebookView);
        },
        shareEmail(){
            this.$emit('share', SharingViewState.EmailView);
        },
        shareDownload(){
            this.$emit('share', SharingViewState.DownloadView);
        }
    }
};
</script>

<style scoped>

.gallery {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 1000px;
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
}

.visible {
    transform: translateX(0%);
    transition: transform 0.3s ease-in;
}

.header-row {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    vertical-align: middle;
    color: white;
    font-size: 40px;
}

.images-row {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.button-row {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
}

.share-button {
    height: 100px;
    border-radius: 50px;
    background-color: gray;
    text-align: center;
    font-size: 30px;
    line-height: 100px;
    vertical-align: middle;
    margin-right: 20px;
    color: white;
    padding-left: 30px;
    padding-right: 30px;
}

.enabled .share-button{
    background-color: darkblue;
}

.image-thumbnail {
    background: tomato;
    padding: 5px;
    width: 200px;
    height: 380px;
    margin-top: 10px;
    line-height: 150px;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
}

.image-thumbnail.selected {
    background-color: yellow;
}

.image-thumbnail-static {
    position: relative;
    width: 100%;
    height: 100%;
}

.image-delete-button {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 60px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: solid 3px white;
    color: white;
    background-color: red;
    font-size: 24px;
    font-weight: bold;
}
</style>