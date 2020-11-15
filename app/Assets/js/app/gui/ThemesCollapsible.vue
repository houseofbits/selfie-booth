<template>
    <div>
        <div :class="themesFrameClass" class="themes-frame" @click.self="openThemes">
            <div class="close-button" @click.self="closeThemes"></div>

            <div v-for="(theme, index) in themes" class="theme-icon"></div>

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

.themes-frame {
    pointer-events: auto;
    position: absolute;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.4);
    //    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.23) 8%,rgba(0,0,0,0.4) 14%,rgba(0,0,0,0.4) 83%,rgba(0,0,0,0.38) 84%,rgba(0,0,0,0) 100%);
    transition: all 800ms linear;

    .theme-icon {
        display: inline-block;
        position: relative;
        width:200px;
        height:250px;
        background-color: rgba(0,255,0,0.3);
        border-radius: 20px;
        transition: all 800ms linear;
        vertical-align: top;
        margin: 20px 20px;
        padding: 0;

        //&.collapse{
        //    margin: 200px 0 0 -200px;
        //    transform: translateX(50%);
        //}
    }

    &.themes-transition-collapse{
        .theme-icon {
            margin: 200px 0 0 -200px;
            transform: translateX(50%);
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
