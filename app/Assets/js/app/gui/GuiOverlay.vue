<template>
    <div>
        <div class="share-button">Send in E-mail</div>
        <div class="share-button">Share to Facebook</div>
        <div class="share-button">Download to smartphone</div>

        <the-keyboard-email-input></the-keyboard-email-input>
    </div>
</template>

<script>

import TheKeyboardEmailInput from "./TheKeyboard/TheKeyboardEmailInput.vue";

export default {
    name: "app",
    data: function () {
        return {

        }
    },
    props: {
        mainScene: {
            type: Object,
            required: true
        },
    },
    components: {TheKeyboardEmailInput},
    methods: {

    },
    mounted: function () {

    }
}
</script>

<style scoped>
.share-button{
    display: inline-block;
    width:100%;
    height:50px;
    line-height: 50px;
    border: solid 1px gray;
    border-radius: 10px;
    text-align: center;
    margin-top: 20px;
    background-color: #7e89b8;
}
</style>
<style>
@font-face {
    font-family: "customFont";
    src: url("../../../fonts/font.ttf");
}

body {
    font-family: "customFont", serif;
    user-select: none;
    background-color: #c7c7c7;
}
</style>