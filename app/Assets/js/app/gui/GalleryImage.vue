<template>
    <div
        :class="getMainClass"
        class="image">
        <gallery-image-actions :is-expanded="isButtonsExpanded" :is-visible="isButtonsVisible"
                        class="buttons-block"
                        @action-delete="setForRemoval"
                        @action-download="selectDownload"
                        @action-email="selectEmail"
                        @action-share="selectShare"/>
        <img :src="'https://picsum.photos/200/300?random=' + image.id" alt="" height="100%"
             width="100%" @click.self="setSelected"/>
    </div>
</template>

<script>
import GalleryImageActions from './GalleryImageActions.vue';
import {SharingViewState} from './Constants.js';

export default {
    name: "GalleryImage",
    components: {
        GalleryImageActions
    },
    props: {
        selected: {
            type: Number
        },
        collapse: {
            type: Boolean,
            default: false
        },
        image: {
            type: Object,
        }
    },
    data() {
        return {
            isSelected: null,
            isCollapsed: false,
            markedForRemoval: false,
            isButtonsExpanded: false,
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
            this.isSelected = (val === this.$vnode.key);
            if (!this.isSelected) {
                this.isButtonsExpanded = false;
            }
        }
    },
    computed: {
        isButtonsVisible() {
            return !this.markedForRemoval && !this.isCollapsed;
        },
        isNotSelected() {
            return (this.$vnode.key !== this.selected && this.selected !== null);
        },
        getMainClass() {
            return {
                remove: this.markedForRemoval,
                selected: this.isSelected,
                'not-selected': this.isNotSelected,
                collapse: this.collapse
            };
        }
    },
    methods: {
        setSelected() {
            this.isButtonsExpanded = true;
            this.isSelected = true;
            this.$emit('select', this.$vnode.key);
        },
        setForRemoval() {
            this.isButtonsExpanded = false;
            setTimeout(() => this.markedForRemoval = true, this.isSelected ? 400 : 0);
            setTimeout(() => this.$emit('delete-image', this.$vnode.key), this.isSelected ? 800 : 200);
        },
        selectShare() {
            this.selectAction(SharingViewState.FacebookView);
        },
        selectEmail() {
            this.selectAction(SharingViewState.EmailView);
        },
        selectDownload() {
            this.selectAction(SharingViewState.DownloadView);
        },
        selectAction(action) {
            this.$emit('action', action);
        }
    }
}
</script>

<style lang="scss" scoped>
.image {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 380px;
    background-color: #6c6b6b;
    padding: 0;
    transition: all 0.2s linear;
    vertical-align: middle;
    margin: 0 15px;

    .buttons-block {
        position: absolute;
        bottom: -40px;
        width: 100%;
        height: 80px;
        transition: all 0.2s linear;
    }

    &.selected {
        width: 270px;
        height: 470px;
        transition: all 0.2s linear;
        z-index: 5;
    }

    &.not-selected {
        width: 170px;
        height: 330px;
        transition: all 0.2s linear;
    }

    &.collapse {
        margin: 0 0 0 -200px;
        transform: translateX(50%);
    }

    &.not-selected.collapse {
        margin: 0 0 0 -170px;
        transform: translateX(50%);
    }

    &.selected.collapse {
        margin: 0 0 0 -270px;
        transform: translateX(50%);
    }

    &.remove {
        width: 0;
        margin-left: 0;
        margin-right: 0;
        transition: all 0.2s ease-in;
    }
}
</style>
