<template>
    <div :class="stateClass" :style="cssVars" class="fragment"></div>
</template>

<script>
export default {
    name: "BackgroundItem",
    props: {
        fragment: {
            type: Array
        },
        state: {
            type: Number
        }
    },
    data() {
        return {
            cssVars: this.formatCssVars(),
            imgId: 1,
        };
    },
    computed: {
        stateClass() {
            return [
                'ts' + this.state,
                'image-' + this.imgId
            ]
        }
    },
    methods: {
        formatCssVars() {
            let vars = {};
            for (let i = 0; i < 5; i++) {
                vars['--ts' + i] = this.formatTranslate(this.fragment[i].x, this.fragment[i].y)
                    + this.formatRotate(this.fragment[i].angle)
                    + this.formatScale(this.fragment[i].scale);
            }
            return vars;
        },
        formatTranslate(x, y) {
            return 'translate(' + x + 'px,' + y + 'px) ';
        },
        formatScale(s) {
            return 'scale(' + s + ') ';
        },
        formatRotate(a) {
            return 'rotate(' + a + 'deg) ';
        }
    },
    mounted() {
        this.imgId = (Math.random() > 0.5) ? 1 : 2;
    }
}
</script>

<style lang="scss" scoped>
.fragment {
    position: absolute;
    width: 200px;
    height: 200px;
    transform: var(--ts0);
    transition: all 500ms linear;
    pointer-events: auto;
    margin-left: -100px;
    margin-top: -100px;
    background-repeat: round;

    &.image-1 {
        background-image: url('../../../../images/leaf_1.png');
    }
    &.image-2 {
        background-image: url('../../../../images/leaf_2.png');
    }

    &.ts0 {
        transform: var(--ts0);
        transition: all 200ms linear;
    }

    &.ts1 {
        transform: var(--ts1);
        transition: all 200ms linear;
    }

    &.ts2 {
        transform: var(--ts2);
        transition: all 200ms linear;
    }

    &.ts3 {
        transform: var(--ts3);
        transition: all 200ms linear;
    }

    &.ts4 {
        transform: var(--ts4);
        transition: all 200ms linear;
    }
}
</style>