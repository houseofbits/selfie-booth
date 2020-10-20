<template>
    <div v-if="isActive" class="window">

        <div class="header-row">
            <span v-if="emailInputValid">Email is valid</span>
        </div>

        <keyboard-email-input @change="inputChanged"></keyboard-email-input>

    </div>
</template>

<script>

import KeyboardEmailInput from "./TheKeyboard/TheKeyboardEmailInput.vue";
import EmailService from "../Services/EmailService.js";

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
        KeyboardEmailInput
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
        }
    }
};
</script>

<style scoped>
.window {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 1000px;
    width: 1080px;
    height: 650px;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
}

.header-row {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    vertical-align: middle;
    color: white;
    font-size: 40px;
}
</style>