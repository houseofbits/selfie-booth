<template>
    <div>
        <div :class="themesFrameClass" class="themes-frame" @click.self="openThemes">
            <div class="close-button" @click.self="closeThemes"></div>
            <div class="theme-icon r1c1"></div>
            <div class="theme-icon r1c2"></div>
            <div class="theme-icon r1c3"></div>
            <div class="theme-icon r1c4"></div>
            <div class="theme-icon r2c1"></div>
            <div class="theme-icon r2c2"></div>
            <div class="theme-icon r2c3"></div>
            <div class="theme-icon r2c4"></div>

        </div>
    </div>
</template>

<script>

export default {
    name: "ThemesCollapsible",
    components: {},
    props: {
        open: {
            type: Boolean
        }
    },
    data() {
        return {
            isOpen: false,
            themes: [
                {a:1}, {a:1}, {a:1}, {a:1},
                {a:1}, {a:1}, {a:1}, {a:1}
            ]
        };
    },
    watch: {
        open(val) {
            this.isOpen = val;
        }
    },
    computed: {
        themesFrameClass() {
            if (this.isOpen) {
                return 'themes-transition-expand';
            }
            return 'themes-transition-collapse';
        },
    },
    methods: {
        openThemes() {
            this.$emit('open');
        },
        closeThemes() {
            this.$emit('close');
        },
    }
}
</script>

<style lang="scss" scoped>
@import '/css/app/variables.scss';

$theme-icon-width: 200;
$theme-icon-margin: 40;
$theme-icons-per-row: 4;

@function icon-pos-x($nth) {
    $pos: ($theme-icon-width / 2) + ($theme-icon-width * $nth) + ($theme-icon-margin * $nth);
    $full: ($theme-icon-width * $theme-icons-per-row) + ($theme-icon-margin * ($theme-icons-per-row - 1));
    $res: (1080 - $full) / 2 + $pos;
    @return $res+px;
}

.themes-frame {
    pointer-events: auto;
    position: absolute;
    text-align: center;
    //background-color: rgba(0, 0, 0, 0.4);
    border: dotted 1px black;
    transition: all 800ms linear;
    //overflow: hidden;

    .theme-icon {
        position: absolute;
        left:0;
        top:0;
        margin-left: -100px;
        margin-top: -100px;
        width:200px;
        height:200px;
        background: linear-gradient(to bottom, rgba(206,220,231,0.43) 0%,rgba(89,106,114,0.65) 100%);
        border-radius: 20px;
        transition: all 200ms linear;
        box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.38);

        &.r1c1 {
            transform: translate(icon-pos-x(0),50px);
        }
        &.r1c2 {
            transform: translate(icon-pos-x(1),50px);
        }
        &.r1c3 {
            transform: translate(icon-pos-x(2),50px);
        }
        &.r1c4 {
            transform: translate(icon-pos-x(3),50px);
        }

        &.r2c1 {
            transform: translate(icon-pos-x(0),350px);
        }
        &.r2c2 {
            transform: translate(icon-pos-x(1),350px);
        }
        &.r2c3 {
            transform: translate(icon-pos-x(2),350px);
        }
        &.r2c4 {
            transform: translate(icon-pos-x(3),350px);
        }
    }
    &.themes-transition-collapse{
        .theme-icon {
            transition: all 200ms linear;
            transform: translate(0, 0) scale(0.2);

            &.r1c1 {
                transform: translate(icon-pos-x(0),50px);
            }
            &.r1c2 {
                transform: translate(icon-pos-x(1),50px);
            }
            &.r1c3 {
                transform: translate(icon-pos-x(2),50px);
            }
            &.r1c4 {
                transform: translate(icon-pos-x(3),50px);
            }

            &.r2c1 {
                transform: translate(icon-pos-x(0),100px);
            }
            &.r2c2 {
                transform: translate(icon-pos-x(1),100px);
            }
            &.r2c3 {
                transform: translate(icon-pos-x(2),100px);
            }
            &.r2c4 {
                transform: translate(icon-pos-x(3),100px);
            }
        }
    }

}

.close-button {
    pointer-events: auto;
    position: absolute;
    background-color: rgba(255, 0, 0, 0.6);
    border: 2px solid red;
    width: 80px;
    height: 80px;
    top: -40px;
    right: 50px;
    border-radius: 50%;
}


.themes-transition-collapse {
    animation-name: themes-collapse;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
    animation-direction: alternate;
}

.themes-transition-expand {
    animation-name: themes-expand;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
}

.themes-transition-collapse .close-button {
    display: none;
}

.themes-transition-expand .close-button {
    display: block;
}

@mixin theme-state-0 {
    top: $theme-pos-top;
    left: 0;
    width: 1080px;
    height: $theme-height;
}

@mixin theme-state-100 {
    top: $theme-icon-pos-top;
    left: $theme-icon-pos-left;
    width: $theme-icon-size;
    height: $theme-icon-size;
    border-radius: $theme-icon-size/2;
}

@keyframes themes-collapse {
    0% {
        @include theme-state-0;
    }
    100% {
        @include theme-state-100;
    }
}

@keyframes themes-expand {
    0% {
        @include theme-state-100;
    }
    100% {
        @include theme-state-0;
    }
}
</style>
