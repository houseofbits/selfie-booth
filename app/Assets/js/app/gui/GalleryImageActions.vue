<template>
    <div :class="{active: isExpandedOrProcess, hide: hidden}">
        <div class="animated-button red" @click="buttonDelete">X</div>
        <div v-if="!isCollapsed" class="animated-button blue" @click="buttonShare">Share</div>
        <div v-if="!isCollapsed" class="animated-button green" @click="buttonEmail">Email</div>
        <div v-if="!isCollapsed" class="animated-button orange" @click="buttonDownload">Download</div>
    </div>
</template>

<script>
export default {
    name: "GalleryImageActions",
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isEnabled: true,
            isExpandedOrProcess: false,
            hidden: false,
            isCollapsed: true,
            transitionCollapseTimer: null,
            transitionInProcessTimer: null
        };
    },
    watch: {
        isExpanded(val) {
            this.setExpand(val);
        },
        isVisible(val) {
            this.setVisible(val);
        }
    },
    methods: {
        setVisible(visible) {
            this.hidden = !visible;
        },
        setExpand(expand) {
            this.isEnabled = false;
            this.isExpandedOrProcess = expand;
            clearTimeout(this.transitionCollapseTimer);
            if (!expand) {
                this.transitionCollapseTimer = setTimeout(() => this.isCollapsed = true, 600);
            } else {
                this.isCollapsed = false;
            }
            clearTimeout(this.transitionInProcessTimer);
            this.transitionInProcessTimer = setTimeout(() => {
                this.isEnabled = true;
                this.transitionInProcessTimer = null;
            }, 600);
        },
        buttonDelete() {
            if (this.isEnabled) {
                this.$emit('action-delete');
            }
        },
        buttonShare() {
            if (this.isEnabled) {
                this.$emit('action-share');
            }
        },
        buttonEmail() {
            if (this.isEnabled) {
                this.$emit('action-email');
            }
        },
        buttonDownload() {
            if (this.isEnabled) {
                this.$emit('action-download');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

@function calc-vert-pos($index) {
    @return -$start-top - ($vertical-step * $index);
}

@mixin animate-active($animation) {
    animation-name: $animation;
    animation-duration: $duration+ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
}

.animated-button {
    color: white;
    font-size: 25px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    margin-left: -($button-size/2)+px;
    margin-top: 0;
    left: 50%;
    width: $button-size+px;
    height: $button-size+px;
    border-radius: ($button-size/2)+px;
    overflow: hidden;
    transition: all 0.2s linear;
    opacity: 1;
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.38);

    &.red {
        background-color: red;
        z-index: 5;
        @include animate-active(close-red)
    }

    &.blue {
        background-color: blue;
        z-index: 4;
        @include animate-active(close-blue)
    }

    &.green {
        background-color: green;
        z-index: 3;
        @include animate-active(close-green)
    }

    &.orange {
        background-color: orange;
        z-index: 2;
        @include animate-active(close-orange)
    }

    .buttons-block.hide & {
        transition: all 0.2s linear;
        opacity: 0;
    }

    .buttons-block.active &.red {
        @include animate-active(activate-red)
    }

    .buttons-block.active &.blue {
        @include animate-active(activate-blue)
    }

    .buttons-block.active &.green {
        @include animate-active(activate-green)
    }

    .buttons-block.active &.orange {
        @include animate-active(activate-orange)
    }

    @mixin start-position {
        top: 0;
        width: $button-size+px;
        margin-left: -($button-size/2)+px;
    }
    @mixin middle-position($top) {
        top: $top+px;
        width: $button-size+px;
        margin-left: -($button-size/2)+px;
    }
    @mixin expand-position($top, $width) {
        top: $top+px;
        width: $width+px;
        height: $button-size-open+px;
        margin-left: -($width/2)+px;
    }

    @keyframes activate-red {
        0% {
            @include start-position
        }
        20% {
            @include middle-position(calc-vert-pos(0))
        }
        40% {
            @include middle-position(calc-vert-pos(1))
        }
        60% {
            @include middle-position(calc-vert-pos(2))
        }
        80% {
            @include middle-position(calc-vert-pos(3))
        }
        100% {
            @include expand-position(calc-vert-pos(3), $width)
        }
    }
    @keyframes activate-blue {
        0% {
            @include start-position
        }
        20% {
            @include middle-position(calc-vert-pos(0))
        }
        40% {
            @include middle-position(calc-vert-pos(1))
        }
        60% {
            @include middle-position(calc-vert-pos(2))
        }
        80% {
            @include expand-position(calc-vert-pos(2), $width)
        }
        100% {
            @include expand-position(calc-vert-pos(2), $width)
        }
    }
    @keyframes activate-green {
        0% {
            @include start-position
        }
        20% {
            @include middle-position(calc-vert-pos(0))
        }
        40% {
            @include middle-position(calc-vert-pos(1))
        }
        60% {
            @include expand-position(calc-vert-pos(1), $width)
        }
        100% {
            @include expand-position(calc-vert-pos(1), $width)
        }
    }
    @keyframes activate-orange {
        0% {
            @include start-position
        }
        20% {
            @include middle-position(calc-vert-pos(0))
        }
        40% {
            @include expand-position(calc-vert-pos(0), $width)
        }
        100% {
            @include expand-position(calc-vert-pos(0), $width)
        }
    }
    @keyframes close-red {
        0% {
            @include expand-position(calc-vert-pos(3), $width)
        }
        20% {
            @include middle-position(calc-vert-pos(3))
        }
        40% {
            @include middle-position(calc-vert-pos(2))
        }
        60% {
            @include middle-position(calc-vert-pos(1))
        }
        80% {
            @include middle-position(calc-vert-pos(0))
        }
        100% {
            @include start-position
        }
    }
    @keyframes close-blue {
        0% {
            @include expand-position(calc-vert-pos(2), $width)
        }
        20% {
            @include expand-position(calc-vert-pos(2), $width)
        }
        40% {
            @include middle-position(calc-vert-pos(2))
        }
        60% {
            @include middle-position(calc-vert-pos(1))
        }
        80% {
            @include middle-position(calc-vert-pos(0))
        }
        100% {
            @include start-position
        }
    }
    @keyframes close-green {
        100% {
            @include start-position
        }
        80% {
            @include middle-position(calc-vert-pos(0))
        }
        60% {
            @include middle-position(calc-vert-pos(1))
        }
        40% {
            @include expand-position(calc-vert-pos(1), $width)
        }
        0% {
            @include expand-position(calc-vert-pos(1), $width)
        }
    }
    @keyframes close-orange {
        100% {
            @include start-position
        }
        80% {
            @include middle-position(calc-vert-pos(0))
        }
        60% {
            @include expand-position(calc-vert-pos(0), $width)
        }
        0% {
            @include expand-position(calc-vert-pos(0), $width)
        }
    }
}

</style>
