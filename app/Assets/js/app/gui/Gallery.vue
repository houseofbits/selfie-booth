<template>
        <div class="relative-items" :class="{active:!collapse}">
            <div class="static-backdrop" :class="{active:collapse}"></div>
            <gallery-image v-for="(image, index) in items"
                          :key="image.id"
                          :image="image"
                          :selected="selected"
                          :collapse="collapse"
                           :collapsed-large="collapsedLarge"
                          @action="imageAction"
                          @select="selectImage"
                          @delete-image="deleteImage"/>
        </div>
</template>

<script>
import GalleryImage from './GalleryImage.vue';

export default {
    name: "Gallery",
    components: {
        GalleryImage
    },
    props:{
        images:{
            type:Array
        }
    },
    data() {
        return {
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
            collapsedLarge: true
        };
    },
    methods: {
        selectImage(index) {
            if(this.selected === index){
                this.collapse = false;
                this.selected = null;
                return;
            }
            this.selected = index;
        },
        deleteImage(image) {
            const index = this.items.findIndex(element => element.id === image.id);
            if(index >= 0) {
                this.items.splice(parseInt(index), 1);
            }
        },
        imageAction(action){
            this.collapse = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.relative-items {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    width: 1080px;
    height: 550px;
    top: 1000px;
    text-align: center;
    line-height: 550px;
    vertical-align: bottom;
    transition: all 0.2s linear;

    .static-backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 1080px;
        height: 1920px;
        background-color: rgba(0,0,0,0.5);
        opacity:0;
        display: none;
        transition: all 0.2s linear;

        &.active{
            display: block;
            opacity: 1;
        }
    }

    &.active{
        background-color: rgba(0, 0, 0, 0.6);
    }
}
</style>
