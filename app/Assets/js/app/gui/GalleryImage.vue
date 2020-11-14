<template>
    <div
        :class="getMainClass"
        :style="getMainStyle"
        class="image">
        <gallery-image-actions :is-expanded="isButtonsExpanded" :is-visible="isButtonsVisible"
                               class="buttons-block"
                               @action-delete="setForRemoval"
                               @action-download="selectDownload"
                               @action-email="selectEmail"
                               @action-share="selectShare"/>
<!--        <img :src="'https://picsum.photos/200/300?random=' + image.id" alt="" height="100%"-->
<!--             width="100%" @click.self="setSelected"/>-->
        <img :src="image.base64data" alt="Thumbnail" height="100%" width="100%" @click.self="setSelected"/>
    </div>
</template>

<script>
import GalleryImageActions from './GalleryImageActions.vue';
import {GalleryActions} from './Constants.js';

export default {
    name: "GalleryImage",
    components: {
        GalleryImageActions
    },
    props: {
        selected: {
            type: Object
        },
        collapse: {
            type: Boolean,
            default: false
        },
        collapsedType: {
            type: Number,
            default: false
        },
        image: {
            type: Object,
        }
    },
    data() {
        return {
            isSelected: null,
            isCollapsed: true,
            markedForRemoval: false,
            isButtonsExpanded: false,
            transformAngle: 0,
            transformScale: 0
        };
    },
    watch: {
        collapse(val) {
            if (val) {
                this.isButtonsExpanded = false;
                setTimeout(() => this.isCollapsed = true, this.isSelected ? 600 : 0);
            } else {
                this.isCollapsed = false;
            }
        },
        selected(val) {
            this.isSelected = val ? (val.id === this.$vnode.key) : false;
            if (!this.isSelected) {
                this.isButtonsExpanded = false;
                this.shuffle();
            }
        }
    },
    computed: {
        isButtonsVisible() {
            return !this.markedForRemoval && !this.isCollapsed;
        },
        isNotSelected() {
            return (this.selected !== null && this.$vnode.key !== this.selected.id);
        },
        getMainClass() {
            return {
                remove: this.markedForRemoval,
                selected: this.isSelected,
                'not-selected': this.isNotSelected,
                collapse: this.collapse,
                large: this.collapsedType === 1,
                small: this.collapsedType === 2,
            };
        },
        getMainStyle() {
            if(!this.markedForRemoval && !this.isCollapsed) {
                return {
                    transform: 'rotate('+this.transformAngle+'deg) scale('+this.transformScale+')',
                };
            }
            return null;
        }
    },
    methods: {
        setSelected() {
            this.isButtonsExpanded = true;
            this.isSelected = true;
            this.selectAction(GalleryActions.SelectImage);
        },
        setForRemoval() {
            this.isButtonsExpanded = false;
            setTimeout(() => this.markedForRemoval = true, this.isSelected ? 400 : 0);
            setTimeout(() => this.selectAction(GalleryActions.DeleteImage), this.isSelected ? 800 : 200);
        },
        selectShare() {
            this.selectAction(GalleryActions.ShareFacebook);
        },
        selectEmail() {
            this.selectAction(GalleryActions.ShareEmail);
        },
        selectDownload() {
            this.selectAction(GalleryActions.ShareDownload);
        },
        selectAction(action) {
            this.$emit('action', action, this.image);
        },
        shuffle(){
            this.transformAngle = 5 - Math.random() * 10;
            this.transformScale = 1 + (0.1 - Math.random() * 0.2);
        }
    },
    mounted() {
        this.shuffle();
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

.image {
    display: inline-block;
    position: relative;
    width: $image-default-width+px;
    height: $image-default-height+px;
    background-color: #6c6b6b;
    padding: 0;
    transition: all 0.2s linear;
    vertical-align: top;
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.38);
    margin: 80px 15px;

    .buttons-block {
        position: absolute;
        bottom: -40px;
        width: 100%;
        height: 80px;
        transition: all 0.2s linear;
    }

    &.selected {
        width: $image-selected-width+px;
        height: $image-selected-height+px;
        transition: all 0.2s linear;
        z-index: 5;
        box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.79);
        margin: 40px 15px 0;
    }

    &.not-selected {
        width: $image-not-selected-width+px;
        height: $image-not-selected-height+px;
        transition: all 0.2s linear;
    }

    &.collapse {
        margin: 100px 0 0 (-$image-default-width)+px;
        transform: translateX(50%);
    }

    &.not-selected.collapse {
        margin: 0 0 0 (-$image-not-selected-width)+px;
        opacity: 0;
        transform: translateX(50%);
    }

    &.selected.collapse {
        margin: 0 0 0 (-$image-selected-width)+px;
        transform: translateX(50%);
    }

    &.selected.collapse.large {
        margin: -900px 0 0 (-$image-large-width)+px;
        width: $image-large-width+px;
        height: $image-large-height+px;
        box-shadow: 0 3px 44px 5px rgba(0, 0, 0, 0.87);
    }

    &.collapse.small {
        margin: -60px 0 0 (-$image-collapsed-width)+px;
        width: $image-collapsed-width+px;
        height: $image-collapsed-height+px;
        box-shadow: none;
    }

    &.remove {
        width: 0;
        margin-left: 0;
        margin-right: 0;
        transition: all 0.2s ease-in;
    }
}
</style>
