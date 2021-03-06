<template>
    <div>
        <div :class="{visible: !isOpen}" class="icon-backdrop">
            <div class="shadow"></div>
            <div class="border"></div>
        </div>

        <div class="themes-frame">
            <div class="close-button" @click.self="closeThemes"></div>

            <div v-for="(theme, index) in themeDefinitions" :key="index" class="theme-icon" :class="themeClass(theme)"
                 @click="select(theme.name)">
                <div class="icon-background" :class="[theme.iconClass]"></div>
            </div>
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

const ThemeDefinitions = [
    {
        name: 'AmberScene',
        positionClass: 'r1c1',
        iconClass: 'amber-icon',
    },
    {
        name: 'DinosaursScene',
        positionClass: 'r2c1',
        iconClass: 'dinosaurs-icon',
    },
    {
        name: 'CoralScene',
        positionClass: 'r1c2',
        iconClass: 'coral-icon',
    },
    {
        name: 'ShroomsScene',
        positionClass: 'r1c4',
        iconClass: 'shrooms-icon',
    },
    {
        name: 'BirdsScene',
        positionClass: 'r1c3',
        iconClass: 'birds-icon',
    },
    {
        name: 'ArchiveScene',
        positionClass: 'r2c2',
        iconClass: 'archive-icon',
    },
    {
        name: 'BugsScene',
        positionClass: 'r2c3',
        iconClass: 'bugs-icon',
    },
    {
        name: 'DisplayScene',
        positionClass: 'r2c4',
        iconClass: 'display-icon',
    },
];

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
        disabled: {
            type: Boolean
        },
        open: {
            type: Boolean
        },
        theme: {
            type: String
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
        themeDefinitions() {
            return ThemeDefinitions;
        },
    },
    methods: {
        themeClass(theme) {
            return {
                [theme.positionClass]: true,
                selected: (theme.name === this.theme),
                collapsed: !this.isOpen,
            };
        },
        openThemes() {
            if (!this.disabled) {
                this.$emit('open');
            }
        },
        closeThemes() {
            this.$emit('close');
        },
        select(themeName){
            MainSceneInstance.onThemeSelected(themeName);
            this.$emit('select-theme', themeName);
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
    pointer-events: none;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    width: $screen-width+px;
    height: $screen-height+px;

    .theme-icon {
        pointer-events: auto;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        overflow: hidden;
        margin-left: -($theme-image-width/2)+px;
        margin-top: -($theme-image-height/2)+px;
        width: $theme-image-width+px;
        height: $theme-image-height+px;
        background: linear-gradient(to bottom, rgba(180,221,180,1) 0%,rgba(131,199,131,1) 17%,rgba(82,177,82,1) 33%,rgba(0,138,0,1) 67%,rgba(0,132,46,1) 82%,rgba(0,170,88,1) 100%);

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
            transform: translate(icon-pos-x(0), ($theme-pos-top + 150)+px);
        }

        &.r1c2 {
            transform: translate(icon-pos-x(1), ($theme-pos-top + 150)+px);
        }

        &.r1c3 {
            transform: translate(icon-pos-x(2), ($theme-pos-top + 150)+px);
        }

        &.r1c4 {
            transform: translate(icon-pos-x(3), ($theme-pos-top + 150)+px);
        }

        &.r2c1 {
            transform: translate(icon-pos-x(0), ($theme-pos-top + 400)+px);
        }

        &.r2c2 {
            transform: translate(icon-pos-x(1), ($theme-pos-top + 400)+px);
        }

        &.r2c3 {
            transform: translate(icon-pos-x(2), ($theme-pos-top + 400)+px);
        }

        &.r2c4 {
            transform: translate(icon-pos-x(3), ($theme-pos-top + 400)+px);
        }

        &.collapsed {
            transform: translate($theme-image-collapsed-pos-x+px, $theme-image-collapsed-pos-y+px)
                    scale($theme-image-collapsed-scale-x, $theme-image-collapsed-scale-y);
            border-radius: 50%;
            box-shadow: none !important;
            opacity: 0.0;
        }

        &.collapsed.selected {
            opacity: 1.0;
        }

        &.selected {
            background: linear-gradient(to bottom, #e6f0a3 0%, #d2e638 50%, #c3d825 51%, #dbf043 100%);
            box-shadow: 0 9px 12px 7px rgba(0,0,0,0.63);
            z-index: 2;
        }

        .icon-background {
            position: absolute;
            left:3px;
            right: 3px;
            top: 3px;
            bottom: 3px;
            border-radius: 18px;
            transition: all 200ms linear;

            &.amber-icon {
                background-image: url('@images/amber/icon.png');
            }
            &.dinosaurs-icon {
                background-image: url('@images/dinosaurs/icon.png');
            }
            &.bugs-icon {
                background-image: url('@images/bugs/icon.png');
            }
            &.display-icon {
                background-image: url('@images/display/icon.png');
            }
            &.shrooms-icon {
                background-image: url('@images/shrooms/icon.png');
            }
            &.coral-icon {
                background-image: url('@images/coral/icon.png');
            }
            &.birds-icon {
                background-image: url('@images/birds/icon.png');
            }
            &.archive-icon {
                background-image: url('@images/archive/icon.png');
            }
        }

        &.collapsed.selected .icon-background {
            left:0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
}

.close-button {
    top: 1570px;
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
    width: $theme-icon-size+px;
    height: $theme-icon-size+px;
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
    width: $theme-icon-size+px;
    height: $theme-icon-size+px;
    border-radius: ($gallery-icon-size/2)+px;
    //background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%),
    //linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 34%, rgb(70, 107, 127) 100%);
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0) 34%,rgba(67,109,61,1) 100%);
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
        background-image: url('@images/left-icon-hilight.png');
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
    transform: translate(100px, 1680px) rotate(-160deg) scale(1.2);
}

.leaf-pos-inside {
    transform: translate(130px, 1640px) rotate(20deg) scale(0.8);
    z-index: 1;
}

</style>
