<template>
    <div class="images-button" v-if="imageCunt">
        <div class="button" :class="selectedClass" @click="open">
            <img :src="lastImage.base64data" width="100%" height="100%" alt=""/>
        </div>
        <div class="image-counter">{{ imageCunt }}/4</div>
    </div>
</template>

<script>
export default {
    props: {
        capturedImageData: {
            type: Array,
            required: true,
        },
        imagesIsOpen:{
            type:Boolean,
            required: true
        }
    },
    computed: {
        imageCunt() {
            return this.capturedImageData.length;
        },
        lastImage() {
            if (this.imageCunt) {
                return this.capturedImageData[this.capturedImageData.length - 1];
            }
            return null;
        },
        selectedClass(){
            return this.imagesIsOpen ? 'selected' : null;
        }
    },
    methods: {
        open() {
            this.$emit('open');
        }
    }
};
</script>

<style scoped>
.images-button {
    pointer-events: auto;
    position: absolute;
    top: 1700px;
    right: 50px;
    width: 160px;
    height: 160px;
}

.button {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 80px;
    overflow: hidden;
    border: solid 5px green;
}

.selected{
    border: solid 5px yellow;
}

.button img {
    position: absolute;
    left: 0;
    top: 0;
    border: none;
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
</style>