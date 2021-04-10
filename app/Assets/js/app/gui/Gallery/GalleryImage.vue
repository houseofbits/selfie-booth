<template>
    <div class="gallery-image" :class="{remove: this.markedForRemoval}" :data-position="index" :data-count="imageNumber"
         :data-large="isSelected" :data-collapsed="isCollapsed">
        <round-button v-if="isButtonsVisible"
                      :class="deleteButtonClass"
                      class="delete-button red"
                      icon="fas fa-trash-alt"
                      @click="setForRemoval"/>

        <img :src="image.base64data" alt="Thumbnail" height="100%" width="100%" @click.self="click"/>
    </div>
</template>

<script>
import {GalleryActions} from '../Constants.js';
import RoundButton from '../RoundButton.vue';

export default {
    name: "GalleryImage",
    components: {
        RoundButton
    },
    props: {
        index: {
            type: Number,
            default: 0
        },
        selected: {
            type: Object
        },
        collapse: {
            type: Boolean,
            default: false
        },
        image: {
            type: Object,
        },
        imageNumber: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            isSelected: null,
            isCollapsed: true,
            markedForRemoval: false,
            isDeleteButtonVisible: false,
        };
    },
    watch: {
        collapse(val) {
            if (val) {
                this.isDeleteButtonVisible = false;
                setTimeout(() => this.isCollapsed = true, this.isSelected ? 600 : 0);
                this.isDeleteButtonVisible = false;
            } else {
                this.isCollapsed = false;
                setTimeout(() => this.isDeleteButtonVisible = true, this.isSelected ? 200 : 0);
            }
        },
        selected(val) {
            this.isSelected = val ? (val.id === this.$vnode.key) : false;
        }
    },
    computed: {
        isButtonsVisible() {
            return !this.markedForRemoval && !this.isSelected && !this.isCollapsed;
        },
        deleteButtonClass() {
            return {
                expanded: (this.isSelected || this.isCollapsed)
            };
        }
    },
    methods: {
        click() {
            this.$emit('select', this.image);
        },

        setSelected() {
            if (!this.collapse) {
                this.isDeleteButtonVisible = false;
                this.isSelected = true;
                this.selectAction(GalleryActions.SelectImage);
            }
        },
        setForRemoval() {
            this.isDeleteButtonVisible = false;
            this.markedForRemoval = true;
            setTimeout(() => this.deleteImage(this.image), 200);
        },
        deleteImage(image) {
            this.$emit('delete', this.image);
        },
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.gallery-image {
    pointer-events: auto;
    display: block;
    position: absolute;
    width: $image-default-width+px;
    height: $image-default-height+px;
    transition: all 0.2s linear;
    margin-left: -($image-default-width/2)+px;
    margin-top: -($image-default-height/2)+px;
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.78);

    &[data-count="1"] {
        &[data-position="0"] {
            transform: translate(540px, 1280px) scale(1.0);
        }
    }

    &[data-count="2"] {
        &[data-position="0"] {
            transform: translate(420px, 1280px) scale(1.0) rotate(-2deg);
        }

        &[data-position="1"] {
            transform: translate(660px, 1280px) scale(1.0) rotate(2deg);
        }
    }

    &[data-count="3"] {
        &[data-position="1"] {
            transform: translate(540px, 1270px) scale(1.0);
        }

        &[data-position="0"] {
            transform: translate(300px, 1280px) scale(1.0) rotate(-2deg);
        }

        &[data-position="2"] {
            transform: translate(780px, 1280px) scale(1.0) rotate(2deg);
        }
    }

    &[data-count="4"] {
        &[data-position="1"] {
            transform: translate(420px, 1280px) scale(1.0) rotate(-2deg);
        }

        &[data-position="2"] {
            transform: translate(660px, 1280px) scale(1.0) rotate(2deg);
        }

        &[data-position="0"] {
            transform: translate(190px, 1290px) scale(1.0) rotate(-3deg);
        }

        &[data-position="3"] {
            transform: translate(890px, 1290px) scale(1.0) rotate(3deg);
        }
    }

    &[data-large="true"] {
        transform: translate(540px, 900px) scale(4.5) !important;
        z-index: 5;
    }

    &[data-collapsed="true"] {
        transform: translate($image-collapsed-pos-x+px, $image-collapsed-pos-y+px)
                scale($image-collapsed-scale-x, $image-collapsed-scale-y) !important;
        border-radius: 50%;
        overflow: hidden;
        box-shadow:none !important;
    }

    &.remove {
        width: 0;
        margin-left: 0;
        margin-right: 0;
        transition: all 0.2s ease-in;
    }

    .delete-button {
        position: absolute;
        bottom: -40px;
        left: 60px;
        transition: all 0.2s linear;
    }

}
</style>
