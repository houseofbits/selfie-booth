<template>
    <div :class="stateClass" class="static-fragment"></div>
</template>

<script>
export default {
    name: 'StaticItem',
    props: {
        imageId: {
            type: Number|String,
            default: 1,
        }
    },
    computed: {
        stateClass() {
            return [
                'image-' + this.imageId
            ]
        }
    },
};
</script>

<style lang="scss" scoped>
.static-fragment {
    position: absolute;
    top:0;
    left:0;
    width: 200px;
    height: 200px;
    pointer-events: auto;
    margin-left: -100px;
    margin-top: -100px;
    background-repeat: round;

    &.image-1 {
        background-image: url('@images/leaf_1.png');
    }

    &.image-2 {
        background-image: url('@images/leaf_2.png');
    }
}
</style>