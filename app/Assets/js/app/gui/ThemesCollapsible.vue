<template>
    <div>
        <div :class="{visible: !isOpen}" class="icon-backdrop">
            <div class="shadow"></div>
            <div class="border"></div>
        </div>
        <div :class="themesFrameClass" class="themes-frame">
            <div class="close-button" @click.self="closeThemes"></div>
            <div class="theme-icon r1c1" @click="select('DemoScene')">Demo scene</div>
            <div class="theme-icon r1c2" @click="select('AmberScene')">Amber scene</div>
            <div class="theme-icon r1c3">Work in progress</div>
            <div class="theme-icon r1c4">Work in progress</div>
            <div class="theme-icon r2c1">Work in progress</div>
            <div class="theme-icon r2c2">Work in progress</div>
            <div class="theme-icon r2c3">Work in progress</div>
            <div class="theme-icon r2c4">Work in progress</div>
        </div>

        <static-item :class="{visible: !isOpen}" class="leaf leaf-pos-1" image-id="2"></static-item>
        <static-item :class="{visible: !isOpen}" class="leaf leaf-pos-inside" image-id="1"></static-item>

        <div :class="{visible: !isOpen}" class="icon-overlay" @click.self="openThemes">
            <div class="highlight"></div>
        </div>


        <text-button :class="{visible: isOpen}" class="close-button red" icon="fas fa-times-circle"
                     @click="closeThemes">{{ lang('capture.close-button') }}</text-button>
    </div>
</template>

<script>

import TextButton from './TextButton.vue';
import StaticItem from './DynamicBackground/StaticItem.vue';
import MainSceneInstance from '/js/app/scene/MainInstance';

export default {
    name: "ThemesCollapsible",
    inject: ['lang'],
    components: {
        TextButton,
        StaticItem
    },
    props: {
        open: {
            type: Boolean
        }
    },
    data() {
        return {
            isOpen: false,
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
        select(themeName){
            MainSceneInstance.onThemeSelected(themeName);
            this.$emit('close');
        }
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
    transition: all 800ms linear;
    overflow: hidden;

    .theme-icon {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        margin-left: -100px;
        margin-top: -100px;
        width: 200px;
        height: 200px;
        //        background: linear-gradient(to bottom, rgba(206,220,231,0.43) 0%,rgba(89,106,114,0.65) 100%);
        background: linear-gradient(to bottom, #e6f0a3 0%, #d2e638 50%, #c3d825 51%, #dbf043 100%);
        border-radius: 20px;
        transition: all 200ms linear;
        transition-delay: 150ms;
        box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        color: #747474;

        &.r1c1 {
            transform: translate(icon-pos-x(0), 150px);
        }

        &.r1c2 {
            transform: translate(icon-pos-x(1), 150px);
        }

        &.r1c3 {
            transform: translate(icon-pos-x(2), 150px);
        }

        &.r1c4 {
            transform: translate(icon-pos-x(3), 150px);
        }

        &.r2c1 {
            transform: translate(icon-pos-x(0), 400px);
        }

        &.r2c2 {
            transform: translate(icon-pos-x(1), 400px);
        }

        &.r2c3 {
            transform: translate(icon-pos-x(2), 400px);
        }

        &.r2c4 {
            transform: translate(icon-pos-x(3), 400px);
        }
    }

    &.themes-transition-collapse {
        .theme-icon {
            transition: all 200ms linear;
            transform: translate(0, 0) scale(0.2);

            &.r1c1 {
                transform: translate(40px, 40px) scale(0.3);
            }

            &.r1c2 {
                transform: translate(40px, 40px) scale(0.3);
            }

            &.r1c3 {
                transform: translate(120px, 40px) scale(0.3);
            }

            &.r1c4 {
                transform: translate(120px, 40px) scale(0.3);
            }

            &.r2c1 {
                transform: translate(40px, 120px) scale(0.3);
            }

            &.r2c2 {
                transform: translate(40px, 120px) scale(0.3);
            }

            &.r2c3 {
                transform: translate(120px, 120px) scale(0.3);
            }

            &.r2c4 {
                transform: translate(120px, 120px) scale(0.3);
            }
        }
    }

}

.close-button {
    top: 1550px;
    left: 430px;
    width:220px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: all 100ms linear;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 400ms linear;
    }
}

.icon-backdrop {
    position: absolute;
    top: $theme-icon-pos-top+px;
    left: $theme-icon-pos-left+px;
    width: $theme-icon-size;
    height: $theme-icon-size;
    z-index: 1;
    transition: all 200ms linear;
    opacity: 0;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 200ms linear;
    }

    .shadow {
        display: block;
        position: absolute;
        top: 10px;
        bottom: -10px;
        right: -25px;
        left: -25px;
        border-radius: 50% 50% 100px 100px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.48) 100%);
    }

    .border {
        position: absolute;
        top: -5px;
        bottom: -5px;
        right: -5px;
        left: -5px;
        border-radius: 50%;
        box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.56);
        background: linear-gradient(to bottom,
            #ffffff 0%,
            rgba(169, 210, 243, 1) 10%,
            rgba(144, 186, 228, 1) 25%,
            rgba(144, 188, 234, 1) 37%,
            #91d271 50%,
            #57b975 56%,
            rgba(52, 201, 189, 1) 100%);
    }
}

.icon-overlay {
    position: absolute;
    top: $theme-icon-pos-top+px;
    left: $theme-icon-pos-left+px;
    width: $theme-icon-size;
    height: $theme-icon-size;
    border-radius: $gallery-icon-size/2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 34%, rgb(70, 107, 127) 100%);
    transition: all 500ms linear;
    filter: brightness(1.0);
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    pointer-events: auto;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 400ms linear;
    }

    .highlight {
        display: block;
        position: absolute;
        top: 10px;
        bottom: 55px;
        right: 7px;
        left: 7px;
        pointer-events: none;
        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        border-bottom-left-radius: 100px 40px;
        border-bottom-right-radius: 100px 40px;
        //background: linear-gradient(to bottom, rgba(254, 252, 234, 0.05) 0%, rgba(54, 225, 241, 0.6) 100%);
        background-image: url('@images/left-icon-hilight.png');
    }
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
    top: $theme-icon-pos-top+px;
    left: $theme-icon-pos-left+px;
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

.leaf {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 200ms linear;
        pointer-events: none;
    }
}

.leaf-pos-1 {
    transform: translate(90px, 1800px) rotate(-20deg);
}

.leaf-pos-inside {
    transform: translate(130px, 1800px) rotate(20deg) scale(0.8);
    z-index: 1;
}

</style>
