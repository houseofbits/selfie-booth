<template>
    <div :class="{visible:isActive}" class="window">

        <div class="gradient-underlay"></div>

        <static-item class="leaf leaf-pos-3" image-id="2"></static-item>
        <static-item class="leaf leaf-pos-1" image-id="1"></static-item>
        <static-item class="leaf leaf-pos-2" image-id="1"></static-item>

        <div :class="{hidden: emailInputValid}" class="info-row"><span><i
            class="fas fa-info-circle"></i> {{ lang('capture.enter-email-address') }}</span></div>

        <div v-if="emailAddress.length === 0" class="placeholder-row">email@address.lv</div>
        <div :class="{valid:emailInputValid}" class="input-row">{{ emailAddress }}</div>
        <div :class="{'non-valid':!emailInputValid}" class="input-row">{{ emailAddress }}</div>

        <keyboard-email-input v-if="isActive" :email-address.sync="emailAddress"></keyboard-email-input>

        <text-button :class="{'button-disabled': !isSendButtonAvailable}" class="send-button green" icon="fas fa-envelope"
                     @click="sendEmail">{{ lang('capture.send-mail-button') }}</text-button>

        <div v-if="isActive" :class="{visible: isMessageBlockVisible}" class="message-overlay">
            <div :class="{visible: isError}" class="error-row">
                <span>
                    <i class="fas fa-exclamation-triangle"></i> {{ lang('capture.send-error') }}
                </span>
            </div>
            <div :class="{visible: isEmailSubmitted}" class="loading"><i class="fas fa-hourglass-half"></i></div>
            <div :class="{visible: isSuccess}" class="success-row">
                <span>
                    <i class="fas fa-thumbs-up"></i> {{ lang('capture.send-success') }}
                </span>
            </div>
        </div>

        <text-button class="back-button orange" icon="fas fa-arrow-circle-left"
                     @click="closeView">{{ lang('capture.back-button') }}</text-button>

    </div>
</template>

<script>

import KeyboardEmailInput from "../TheKeyboard/TheKeyboardEmailInput.vue";
import EmailService from "../Services/EmailService.js";
import TextButton from '../TextButton.vue';
import StaticItem from '../DynamicBackground/StaticItem.vue';

export default {
    name: "SharingViewEmail",
    inject: ['lang'],
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        isError: {
            type: Boolean,
            required: true,
        },
        isSuccess: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        KeyboardEmailInput,
        TextButton,
        StaticItem
    },
    data: function () {
        return {
            emailInputValid: false,
            emailAddress: '',
            isEmailSubmitted: false,
            successTimer: null
        }
    },
    watch: {
        emailAddress(val) {
            const emailService = new EmailService();
            emailService.validate(val, (result) => this.emailInputValid = result);
            this.$emit('update:isError', false);
        },
        isActive(val) {
            this.emailAddress = '';
            this.emailInputValid = false;
            this.isEmailSubmitted = false;
            this.clearSuccessTimeout();
        },
        isError() {
            this.isEmailSubmitted = false;
            this.clearSuccessTimeout();
        },
        isSuccess(val) {
            this.clearSuccessTimeout();
            this.isEmailSubmitted = false;
            if (val && this.isActive) {
                this.successTimer = setTimeout(this.successTimeoutHandler, 3000);
            }
        }
    },
    computed: {
        isMessageBlockVisible() {
            return this.isEmailSubmitted || this.isError || this.isSuccess;
        },
        isSendButtonAvailable() {
            return this.emailInputValid && !this.isError && !this.isEmailSubmitted && !this.isSuccess;
        }
    },
    methods: {
        closeView() {
            this.$emit('close');
        },
        sendEmail() {
            if (this.emailInputValid) {
                this.isEmailSubmitted = true;
                this.$emit('send', this.emailAddress);
            }
        },
        successTimeoutHandler() {
            this.$emit('reset');
        },
        clearSuccessTimeout() {
            clearTimeout(this.successTimer);
            this.successTimer = null;
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
        width: 280px;
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
        width: 860px;
        height: 100px;
        left: -10px;
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

.message-overlay {
    pointer-events: auto;
    position: absolute;
    left: -30px;
    top: -150px;
    width: 900px;
    height: 840px;
    background: linear-gradient(to bottom, rgba(98, 125, 77, 0) 0%, rgba(31, 59, 8, 0.58) 10%, rgba(31, 59, 8, 0.8) 18%, rgba(31, 59, 8, 0.8) 80%, rgba(31, 59, 8, 0) 100%);
    transition: all 400ms linear;
    display: none;
    opacity: 0;

    &.visible {
        opacity: 1;
        display: block;
        transition: all 400ms linear;
    }

    .error-row {
        position: absolute;
        top: 450px;
        width: 800px;
        height: 100px;
        left: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 35px;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.61));
        opacity: 0;
        transition: opacity 500ms linear;

        span {
            background: linear-gradient(to bottom, #feccb1 0%, #f95a04 100%);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }

    .success-row {
        position: absolute;
        top: 450px;
        width: 800px;
        height: 100px;
        left: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 41px;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.61));
        opacity: 0;
        transition: opacity 500ms linear;

        span {
            background: linear-gradient(to bottom, rgba(254,252,234,1) 0%,rgba(241,218,54,1) 100%);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }

    .loading{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 200ms linear;
        opacity: 0;

        i {
            display: inline-block;
            font-size: 100px;
            animation: rotation 2s infinite linear;
            color:white;
            opacity: 0.7;
        }

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }

}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

</style>