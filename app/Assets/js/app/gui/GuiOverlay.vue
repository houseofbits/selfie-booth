<template>
    <div>
        <div>Send in E-mail</div>
        <div>Share to Facebook</div>
        <div>Download to smartphone</div>

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
    components: {TheKeyboardEmailInput},
    methods: {

    },
    mounted: function () {

    }
}
</script>

<style scoped>

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