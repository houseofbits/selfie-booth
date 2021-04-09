<template>
    <div :class="{visible:isActive}" class="window">
        <text-button class="back-button green" icon="fas fa-arrow-circle-left" @click="closeView">{{ lang('capture.back-button') }}</text-button>

        <round-button class="delete-button red" icon="fas fa-trash-alt" @click="deleteSelectedImage"/>

        <round-button class="send-button orange"
                      icon="fas fa-envelope-open-text"
                      @click="openEmailView"/>

        <round-button class="download-button blue"
                      icon="fas fa-cloud-download-alt"
                      @click="openDownloadView"/>
    </div>
</template>

<script>

import KeyboardEmailInput from "../TheKeyboard/TheKeyboardEmailInput.vue";
import RoundButton from '../RoundButton.vue';
import TextButton from '../TextButton.vue';
import StaticItem from '../DynamicBackground/StaticItem.vue';

export default {
    name: "SharingViewOptions",
    inject: ['lang'],
    props: {
        isActive: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        KeyboardEmailInput,
        TextButton,
        StaticItem,
        RoundButton
    },
    data: function () {
        return {
            emailInputValid: false,
            emailAddress: '',
        }
    },
    watch: {
        isActive(val) {
            if (val) {
                this.emailAddress = '';
                this.emailInputValid = false;
            }
        }
    },
    methods: {
        closeView() {
            this.$emit('close');
        },
        openEmailView() {
            this.$emit('share-email');
        },
        openDownloadView() {
            this.$emit('share-download');
        },
        deleteSelectedImage() {
            this.$emit('delete');
        }
    }
};
</script>

<style lang="scss" scoped>
.window {
    position: absolute;
    top: 1000px;
    left: 120px;
    width: 840px;
    height: 550px;
    z-index: 8;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s linear;

    &.visible {
        opacity: 1;
        visibility: visible;
        transition: all 0.2s linear;
    }

    .back-button {
        position: absolute;
        top: 580px;
        left: 10px;
        width: 250px;
    }

    .delete-button {
        position: absolute;
        top: 580px;
        left: 280px;
        //width: 230px;
    }

    .send-button {
        position: absolute;
        top: 560px;
        right: 170px;
        transform: scale(1.6);
    }

    .download-button {
        position: absolute;
        top: 560px;
        right: 20px;
        transform: scale(1.6);
    }

    .button-disabled {
        opacity: 0.4;
        transition: opacity 300ms linear;
    }

    .input-row {
        position: absolute;
        top: -150px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 45px;
        background: linear-gradient(to bottom, #f5f6f6 0%, #dbdce2 21%, #c4c9d3 59%, #dddfe3 80%, #f5f6f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.61));
        transition: opacity 300ms linear;
        opacity: 0;
        border-bottom: 5px solid #c4c9d3;

        &.non-valid {
            background: linear-gradient(to bottom, #f5f6f6 0%, #dbdce2 21%, #c4c9d3 59%, #dddfe3 80%, #f5f6f6 100%);
            transition: opacity 300ms linear;
            opacity: 1;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
            border-bottom: 5px solid #c4c9d3;
        }

        &.valid {
            background: linear-gradient(to bottom, #e6f0a3 0%, #d2e638 50%, #c3d825 51%, #dbf043 100%);
            transition: opacity 300ms linear;
            opacity: 1;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
            border-bottom: 5px solid #c3d825;
        }
    }

    .placeholder-row {
        position: absolute;
        top: -150px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 45px;
        background: linear-gradient(to bottom, #f5f6f6 0%, #dbdce2 21%, #c4c9d3 59%, #dddfe3 80%, #f5f6f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.61));
        opacity: 0.4;
    }

    .info-row {
        position: absolute;
        top: 480px;
        width: 100%;
        height: 100px;
        line-height: 40px;
        text-align: center;
        font-size: 35px;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.61));
        opacity: 1;
        transition: opacity 500ms linear;

        span {
            background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.hidden {
            opacity: 0;
            transition: opacity 500ms linear;
        }
    }

    .error-row {
        position: absolute;
        top: 470px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 35px;
        background: linear-gradient(to bottom, #feccb1 0%, #f95a04 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.8));
        opacity: 0;
        transition: opacity 200ms linear;

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }
}

.leaf-pos-1 {
    opacity: 0.5;
    transform: translate(100px, 465px) rotate(-125deg) scale(1.2);
}

.leaf-pos-2 {
    opacity: 0.5;
    transform: translate(790px, 480px) rotate(125deg);
}

.leaf-pos-3 {
    opacity: 0.5;
    transform: translate(200px, 480px) rotate(-150deg) scale(1.4);
}

.gradient-underlay {
    position: absolute;
    left: -30px;
    top: -150px;
    width: 900px;
    height: 840px;
    //background-color: rgba(31, 59, 8, 0.84);
    background: linear-gradient(to bottom, rgba(98, 125, 77, 0) 0%, rgba(31, 59, 8, 0.58) 10%, rgba(31, 59, 8, 0.8) 18%, rgba(31, 59, 8, 0.8) 80%, rgba(31, 59, 8, 0) 100%);
}

</style>