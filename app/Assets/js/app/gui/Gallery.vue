<template>
    <div :class="{active:!collapse}" class="relative-items">
        <div :class="{active:collapse}" class="static-backdrop"></div>
        <gallery-image v-for="(image, index) in items"
                       :key="image.id"
                       :collapse="isCollapsed"
                       :collapsed-type="collapsedType"
                       :image="image"
                       :selected="selected"
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
    props: {
        images: {
            type: Array
        },
        collapseImages: {
            type: Boolean
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
            collapsedType: 1
        };
    },
    computed: {
        isCollapsed() {
            return this.collapse || this.collapseImages;
        }
    },
    watch:{
        collapseImages(val){
            if(val){
                this.collapsedType = 2;
            }
        }
    },
    methods: {
        selectImage(index) {
            if (this.selected === index) {
                this.collapse = false;
                this.selected = null;
                return;
            }
            this.selected = index;
        },
        deleteImage(image) {
            const index = this.items.findIndex(element => element.id === image.id);
            if (index >= 0) {
                this.items.splice(parseInt(index), 1);
            }
        },
        imageAction(action) {
            this.collapsedType = 1;
            this.collapse = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.relative-items {
    pointer-events: auto;
    position: absolute;
//    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    text-align: center;
//    vertical-align: bottom;
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

        &.active {
            display: block;
            opacity: 1;
        }
    }

    &.active {
        background-color: rgba(0, 0, 0, 0.6);
    }
}
</style>
