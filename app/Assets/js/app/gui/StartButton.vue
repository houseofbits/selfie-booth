<template>
    <div :class="{hidden: !isVisible}" class="start-button" @click="start">{{ lang('demo.start-button') }}</div>
</template>

<script>
export default {
    name: "StartButton",
    inject: ['lang'],
    props:{
        isVisible:{
            type: Boolean
        },
    },
    methods: {
        start() {
            this.$emit('start');
        }
    }
}
</script>

<style lang="scss" scoped>
.start-button {
    pointer-events: auto;
    position: absolute;
    top: 1200px;
    left: 460px;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: greenyellow;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    line-height: 160px;
    vertical-align: middle;
    opacity: 1;
    visibility: visible;
    transition: all 300ms linear;

    &.hidden {
        opacity: 0;
        visibility: hidden;
        transition: all 300ms linear;
    }
}
</style>