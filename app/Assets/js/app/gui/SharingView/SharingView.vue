<template>
    <div class="container">
        <div class="row header">
            <div class="image-thumbnail">
                <img alt="Thumbnail" :src="capturedImageData[selectedImage]" width="100%" height="100%"/>
            </div>
        </div>
        <div class="row content">
            <div class="share-button" @click="back"><< Go back</div>
            <div class="share-button">Send in E-mail</div>
            <div class="share-button">Share to Facebook</div>
            <div class="share-button">Download to smartphone</div>
        </div>
        <div class="row footer">
            <the-keyboard-email-input v-if="isEmailVisible"></the-keyboard-email-input>
        </div>
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
    props: {
        capturedImageData: {
            type: Array,
            required: true,
        },
        selectedImage: {
            required: true,
        },
    },
    computed: {
        isMainViewVisible() {
            return this.state === SharingViewState.MainView;
        },
        isEmailVisible() {
            return true;//this.state === SharingViewState.EmailView;
        },

    },
    methods: {
        back() {
            this.$emit('back');
        }
    },
    components: {TheKeyboardEmailInput},
};
</script>

<style scoped>
.container {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.row.header {
    flex: 3;
    background-color: green;

    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.row.content {
    flex: 1;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-end;
}

.row.footer {
    flex: 1;
    margin-bottom: 50px;
    padding: 50px;
}

.container div {
    border: solid 1px darkblue;
}

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

.image-thumbnail {
    background: tomato;
    padding: 5px;
    width: 350px;
    height: 550px;
    margin-top: 10px;
    line-height: 150px;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
}
</style>