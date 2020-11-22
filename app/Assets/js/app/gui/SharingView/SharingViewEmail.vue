<template>
    <div v-if="isActive" class="window">

        <div class="info-row"></div>

        <div class="header-row">
            <span v-if="emailInputValid">Email is valid</span>
        </div>

        <div class="send-button"></div>

        <keyboard-email-input @change="inputChanged"></keyboard-email-input>

        <text-button class="back-button orange" icon="fas fa-arrow-circle-left" @click="closeView">ATPAKAĻ</text-button>
        <text-button class="send-button green" icon="fas fa-envelope" @click="closeView">NOSŪTĪT</text-button>

    </div>
</template>

<script>

import KeyboardEmailInput from "./TheKeyboard/TheKeyboardEmailInput.vue";
import EmailService from "../Services/EmailService.js";
import TextButton from '../TextButton.vue';

export default {
    name: "SharingViewEmail",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        imageId: {
            type: String,
            required: false,
        },
    },
    components: {
        KeyboardEmailInput,
        TextButton
    },
    data: function () {
        return {
            emailInputValid: false,
        }
    },
    methods: {
        inputChanged(input) {
            const emailService = new EmailService();
            emailService.validate(input, (val) => this.emailInputValid = val);
        },
        closeView() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
.window {
    position: absolute;
    //background-color: rgba(0, 0, 0, 0.6);
    top: 1000px;
    left: 120px;
    width: 840px;
    height: 550px;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    z-index: 8;

    .back-button {
        position:absolute;
        top: 580px;
        left: 150px;
        width: 250px;
    }
    .send-button {
        position:absolute;
        top: 580px;
        left: 480px;
        width: 250px;
    }
}

.header-row {
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
    vertical-align: middle;
    color: white;
    font-size: 40px;
}
</style>