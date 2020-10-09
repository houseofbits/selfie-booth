<template>
    <div>
        <div v-if="isMainViewVisible">
            <div class="share-button">Send in E-mail</div>
            <div class="share-button">Share to Facebook</div>
            <div class="share-button">Download to smartphone</div>
        </div>
        <the-keyboard-email-input v-if="isEmailVisible"></the-keyboard-email-input>
    </div>
</template>

<script>

import TheKeyboardEmailInput from "./TheKeyboard/TheKeyboardEmailInput.vue";
import {SharingViewState} from "/js/app/gui/Constants";

export default {
    name: "SharingView",
    data: function () {
        return {
            state: SharingViewState.MainView
        }
    },
    props: {},
    computed: {
        isMainViewVisible() {
            return this.state === SharingViewState.MainView;
        },
        isEmailVisible() {
            return this.state === SharingViewState.EmailView;
        },

    },
    components: {TheKeyboardEmailInput},
};
</script>

<style scoped>

.share-button {
    display: inline-block;
    width: 100%;
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
    margin-top: 20px;
    background-color: #7e89b8;
    font-size: 50px;
}

</style>