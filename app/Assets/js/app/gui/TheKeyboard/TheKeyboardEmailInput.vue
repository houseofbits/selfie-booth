<template>
    <the-keyboard :layout="keyboardLayout" @key-press="keyPressEvent"></the-keyboard>
</template>

<script>

import KeyLayout from "/json/keyLayout.json";
import TheKeyboard from "./TheKeyboard.vue";

export default {
    name: "TheKeyboardEmailInput",
    props: {
        emailAddress: {
            type: String,
        },
    },
    data: function () {
        return {
            keyboardLayout: KeyLayout,
            inputText: "",
        }
    },
    components: {TheKeyboard},
    watch: {
        inputText() {
            this.$emit('update:emailAddress', this.inputText);
        }
    },
    methods: {
        keyPressEvent(key) {
            let start = this.inputText.length;
            let end = start;
            let inputVal = this.inputText;

            if (end > start) {
                inputVal = inputVal.slice(0, start) + inputVal.slice(end, inputVal.length);
            }

            switch (key) {
                case "backspace":
                    if (start > 0 && start === end) {
                        inputVal = inputVal.slice(0, start - 1) + inputVal.slice(start, inputVal.length);
                        start = start - 1;
                    }
                    break;
                default:
                    inputVal = inputVal.slice(0, start) + key + inputVal.slice(start, inputVal.length);
                    start += key.length;
            }

            this.inputText = inputVal;
        }
    }
}
</script>

<style scoped>
input {
    border: 0;
    outline: 0;
}

input:focus {
    outline: none !important;
}

</style>
