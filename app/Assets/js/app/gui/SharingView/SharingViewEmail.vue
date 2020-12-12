<template>
    <div :class="{visible:isActive}" class="window">

        <div :class="{hidden: emailInputValid}" class="info-row"><span><i class="fas fa-info-circle"></i> Ievadi e-pasta adresi uz kuru nosūtīt izvēlēto attēlu</span></div>
        <div :class="{visible: emailInputValid && isError}" class="error-row"><i class="fas fa-exclamation-triangle"></i> E-pastu nosūtīt neizdevās</div>

        <div v-if="emailAddress.length === 0" class="placeholder-row">email@address.lv</div>
        <div :class="{valid:emailInputValid}" class="input-row">{{ emailAddress }}</div>
        <div :class="{'non-valid':!emailInputValid}" class="input-row">{{ emailAddress }}</div>

        <keyboard-email-input :email-address.sync="emailAddress"></keyboard-email-input>

        <text-button class="back-button orange" icon="fas fa-arrow-circle-left" @click="closeView">ATPAKAĻ</text-button>
        <text-button :class="{'button-disabled': !emailInputValid}" class="send-button green" icon="fas fa-envelope"
                     @click="sendEmail">NOSŪTĪT</text-button>

    </div>
</template>

<script>

import KeyboardEmailInput from "../TheKeyboard/TheKeyboardEmailInput.vue";
import EmailService from "../Services/EmailService.js";
import TextButton from '../TextButton.vue';

export default {
    name: "SharingViewEmail",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        isError: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        KeyboardEmailInput,
        TextButton
    },
    data: function () {
        return {
            emailInputValid: false,
            emailAddress: '',
        }
    },
    watch: {
        emailAddress(val) {
            const emailService = new EmailService();
            emailService.validate(val, (result) => this.emailInputValid = result);
            this.$emit('update:isError', false);
        },
        isActive(val) {
            if(val) {
                this.emailAddress = '';
                this.emailInputValid = false;
            }
        }
    },
    methods: {
        closeView() {
            this.$emit('close');
        },
        sendEmail() {
            if (this.emailInputValid) {
                this.$emit('send', this.emailAddress);
            }
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
        transition: all 0.4s linear;
    }

    .back-button {
        position: absolute;
        top: 580px;
        left: 150px;
        width: 250px;
    }

    .send-button {
        position: absolute;
        top: 580px;
        left: 480px;
        width: 250px;
        opacity: 1;
        transition: opacity 300ms linear;
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
        filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.61));
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
        background: linear-gradient(to bottom, #feccb1 0%,#f95a04 100%);
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

</style>