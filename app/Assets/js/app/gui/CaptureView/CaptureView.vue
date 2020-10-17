<template>
    <div class="container" :class="{'active':isActive}">
        <gallery :captured-image-data="capturedImageData"
                 :selected-image="selectedImage"
                 :visible="thumbnailsVisible"
                 @delete="deleteImage"
                 @select="selectImage"
                 @share="share"></gallery>
        <record-button v-if="isImageCaptureAvailable"
                       @record="capture"></record-button>
        <images-button :captured-image-data="capturedImageData"
                       :images-is-open="thumbnailsVisible"
                       @open="toggleThumbnails"></images-button>
        <themes-button></themes-button>
        <snapshot :captured-image-data="capturedImageData"></snapshot>
    </div>
</template>

<script>

import Snapshot from "./CaptureViewSnapshot.vue";
import RecordButton from "./CaptureViewRecordButton.vue";
import ImagesButton from "./CaptureViewImagesButton.vue";
import ThemesButton from "./CaptureViewThemesButton.vue";
import Gallery from "./CaptureViewGallery.vue";

export default {
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        capturedImageData: {
            type: Array,
            required: true,
        },
        selectedImage: {
            required: true,
        },
    },
    components: {
        Snapshot,
        RecordButton,
        ImagesButton,
        ThemesButton,
        Gallery
    },
    data: function () {
        return {
            thumbnailsVisible: false,
        }
    },
    computed: {
        isImageCaptureAvailable() {
            return (this.capturedImageData.length < 4);
        },
        imageCunt() {
            return this.capturedImageData.length;
        }
    },
    methods: {
        toggleThumbnails() {
            this.thumbnailsVisible = !this.thumbnailsVisible;
        },
        capture() {
            this.thumbnailsVisible = false;
            this.$emit('capture');
        },
        share(type) {
            if (this.selectedImage === null) {
                this.thumbnailsVisible = true;
            } else {
                this.$emit('share', type);
            }
        },
        deleteImage(index) {
            this.$emit('delete', index);
            if (this.imageCunt === 0) {
                this.thumbnailsVisible = false;
            }
        },
        selectImage(index) {
            this.$emit('select', index);
        }
    }
};
</script>

<style scoped>

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1080px;
    height: 1920px;
    display: flex;
    flex-direction: column;
    transform: translateX(-1080px);
    transition: transform 0.5s;
}
.active{
    transform: translateX(0px);
    transition: transform 0.5s;
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

</style>