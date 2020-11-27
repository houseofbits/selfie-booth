<template>
    <div :class="stateClass" :style="cssVars(200,200)" class="fragment">

    </div>
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
        return {};
    },
    computed: {
        stateClass() {
            return 'ts' + this.state;
        }
    },
    methods: {
        cssVars(posx, posy) {
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
    }
}
</script>

<style lang="scss" scoped>
.fragment {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: green;
    transform: var(--ts0);
    transition: all 500ms linear;
    pointer-events: auto;
    box-shadow: 5px 5px 15px 5px #000000;
    margin-left: -100px;
    margin-top: -100px;
    opacity: 0.7;
    border-radius: 50px;

    &.ts0 {
        transform: var(--ts0);
        transition: all 500ms linear;
    }

    &.ts1 {
        transform: var(--ts1);
        transition: all 500ms linear;
    }

    &.ts2 {
        transform: var(--ts2);
        transition: all 500ms linear;
    }

    &.ts3 {
        transform: var(--ts3);
        transition: all 500ms linear;
    }

    &.ts4 {
        transform: var(--ts4);
        transition: all 500ms linear;
    }
}
</style>