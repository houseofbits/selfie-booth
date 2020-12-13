<template>
    <div>
        <div :class="{hidden: !isVisible}" class="info-row">
            <div class="icon">
                <span><i class="fas fa-question icon-size"></i></span>
            </div>
            <div class="main-text">
                <span>{{ lang('demo.gdpr-message') }}</span>
            </div>
        </div>
        <div :class="{hidden: !isVisible}" class="confirm-button" @click="confirm"><i
            class="fas fa-clipboard-check"></i> {{ lang('demo.confirm-button') }}
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmButton",
    inject: ['lang'],
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
    pointer-events: auto;
    position: absolute;
    top: 1200px;
    left: 380px;
    width: 350px;
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
    transition: all 500ms linear;

    i {
        font-size: 80px;
    }

    &.hidden {
        opacity: 0;
        visibility: hidden;
        transition: all 500ms linear;
    }
}

.info-row {
    position: absolute;
    top: 710px;
    left: 80px;
    width: 900px;
    height: 100px;
    text-align: center;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.9));
    opacity: 1;
    transition: opacity 500ms linear;

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
        transition: opacity 500ms linear;
    }
}
</style>