<template>
    <div>
        <div :class="{hidden: !isVisible}" class="info-row">
<!--            <div class="icon">-->
<!--                <span><i class="fas fa-question icon-size"></i></span>-->
<!--            </div>-->
            <div class="main-text">
                <span>{{ lang('demo.gdpr-message') }}</span>
            </div>
        </div>
<!--        <div :class="{hidden: !isVisible}" class="confirm-button" @click="confirm"><i-->
<!--            class="fas fa-clipboard-check"></i> {{ lang('demo.confirm-button') }}-->
<!--        </div>-->

        <text-button :class="{visible: isVisible}" class="confirm-button green" icon="fas fa-clipboard-check"
                     @click="confirm">{{ lang('demo.confirm-button') }}</text-button>

    </div>
</template>

<script>

import TextButton from './TextButton.vue';

export default {
    name: "ConfirmButton",
    inject: ['lang'],
    components: {
        TextButton
    },
    props: {
        isVisible: {
            type: Boolean
        },
    },
    methods: {
        confirm() {
            this.$emit('confirm');
        }
    }
}
</script>

<style lang="scss" scoped>
.confirm-button {
    width: 300px;
    top: 1550px;
    left: 390px;
    opacity: 0;
    visibility: hidden;
    transition: all 100ms linear;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 400ms linear;
    }
}

.info-row {
    position: absolute;
    top: 1000px;
    left: 80px;
    width: 900px;
    height: 500px;
    text-align: center;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 1.0));
    opacity: 1;
    visibility: visible;
    transition: opacity, visibility 500ms linear;
    display: flex;

    .icon {
        display: inline-block;
        line-height: 70px;

        span {
            display: inline;
            font-weight: normal;
            background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 70px;
        }
    }

    .main-text {
        display: inline-block;
        line-height: 40px;
        align-self: flex-end;

        span {
            display: inline;
            font-weight: normal;
            background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 45px;
        }
    }

    &.hidden {
        opacity: 0;
        visibility: hidden;
        transition: opacity, visibility 500ms linear;
    }
}
</style>