<template>
    <div class="container">
        <div class="row header"></div>
        <div class="row content">
            <div v-if="thumbnailsVisible && showSelectImagePrompt" class="info-header">
                Please select one image to share.
            </div>
            <div v-if="thumbnailsVisible" class="image-box">
                <div v-for="(imgData, index) in capturedImageData" class="image-thumbnail"
                     :class="{'selected':isImageSelected(index)}">
                    <img alt="Thumbnail" :src="imgData" width="100%" height="100%" @click="selectImage(index)"/>
                    <div class="image-delete-button" @click="deleteImage(index)">X</div>
                </div>
            </div>
        </div>
        <div class="row footer">
            <div class="side flex-start">
                <div class="gallery-button">Theme</div>
            </div>
            <div class="center">
                <div v-if="isImageCaptureAvailable" class="capture-button" @click="capture">Capture</div>
            </div>
            <div class="side flex-end">
                <div v-if="isShareModeAvailable" class="share-button" @click="share">Share</div>
                <div v-if="imageCunt" class="gallery-button" @click="toggleThumbnails">Img
                    <div class="image-counter">{{ imageCunt }}/4</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        capturedImageData: {
            type: Array,
            required: true,
        },
        selectedImage: {
            required: true,
        },
    },
    data: function () {
        return {
            thumbnailsVisible: false,
            showSelectImagePrompt: false,
        }
    },
    watch:{
        capturedImageData(newData){
            console.log("New image was generated, congrats. Now do something with it");docker
        }
    },
    computed: {
        isImageCaptureAvailable() {
            return (this.capturedImageData.length < 4);
        },
        isShareModeAvailable() {
            return (this.capturedImageData.length > 0);
        },
        imageCunt() {
            return this.capturedImageData.length;
        }
    },
    methods: {
        toggleThumbnails() {
            this.thumbnailsVisible = !this.thumbnailsVisible;
            this.showSelectImagePrompt = false;
        },
        isImageSelected(index) {
            return (index === this.selectedImage);
        },
        capture() {
            this.$emit('capture');
        },
        share() {
            if (this.selectedImage === null) {
                this.showSelectImagePrompt = true;
                this.thumbnailsVisible = true;
            } else {
                this.$emit('share');
            }
        },
        deleteImage(index) {
            this.$emit('delete', index);
            if (this.imageCunt === 0) {
                this.thumbnailsVisible = false;
                this.showSelectImagePrompt = false;
            }
        },
        selectImage(index) {
            this.$emit('select', index);
            this.$nextTick(() => {
                if (this.showSelectImagePrompt) {
                    this.share();
                }
                this.showSelectImagePrompt = false;
            });
        }
    }
};
</script>

<style scoped>

.container {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.row.header {
    height: 500px;
}

.row.content {
    flex: 1;
    align-items: flex-end;
    padding-bottom: 150px;
    flex-direction: column;
    justify-content: flex-end;
}

.row.footer {
    height: 160px;
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
}

.footer div {
    border: solid 1px darkblue;
}

.footer .side {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.footer .center {
    width: 160px;
    height: 100%;
}

.flex-end {
    justify-content: flex-end;
}

.flex-start {
    justify-content: flex-start;
}

.share-button {
    width: 200px;
    height: 100px;
    border-radius: 50px;
    background-color: darkblue;
    text-align: center;
    font-size: 30px;
    line-height: 100px;
    vertical-align: middle;
    margin-right: 20px;
    color: white;
}

.gallery-button {
    width: 150px;
    height: 150px;
    border-radius: 80px;
    background-color: darkorange;
    text-align: center;
    font-size: 30px;
    line-height: 160px;
    vertical-align: middle;
    margin-right: 20px;
}

.capture-button {
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: crimson;
    text-align: center;
    font-size: 30px;
    line-height: 160px;
    vertical-align: middle;
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

.image-counter {
    position: relative;
    left: 0;
    top: -180px;
    line-height: 60px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: solid 3px white;
    color: white;
    background-color: darkblue;
    font-size: 24px;
    font-weight: bold;
}

.image-delete-button {
    position: relative;
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

.image-box {
    border: solid 1px white;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-evenly;
}

.info-header {
    color: white;
    text-align: center;
    width: 100%;
    font-size: 40px;
}
</style>