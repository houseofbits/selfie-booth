<template>
    <div class="gallery-frame">
        <div :class="backDropClass" class="static-backdrop"></div>
        <gallery-image v-for="(image, index) in images"
                       :index="index"
                       :key="image.id"
                       :collapse="collapseImages"
                       :image-number="images.length"
                       :image="image"
                       :selected="selected"
                       @select="clickedOnImage"
                       @delete="deleteImage"
        />
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
        },
        selected: {
            type: Object
        }
    },
    data() {
        return {};
    },
    computed: {
        backDropClass() {
            return {
                active: !!this.selected
            };
        }
    },
    methods: {
        clickedOnImage(image) {
            this.$emit('select-image', image);
        },
        deleteImage(image) {
            this.$emit('delete-image', image);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gallery-frame {
    pointer-events: none;
    position: absolute;
    opacity: 1;
    z-index: 3;
    top: 0;
    left: 0;
    width: $screen-width+px;
    height: $screen-height+px;

    .static-backdrop {
        pointer-events: auto;
        position: fixed;
        top: 0;
        left: 0;
        width: $screen-width+px;
        height: $screen-height+px;
        background-color: rgba(31,59,8,0.65);
        opacity: 0;
        display: none;
        transition: all 0.2s linear;
        z-index: 4;

        &.active {
            display: block;
            opacity: 1;
        }
    }
}

</style>
