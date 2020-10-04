<template>
    <div>
        <input id="input-text" spellcheck="false" type="text" v-model="inputText"/>
        <the-keyboard :layout="keyboardLayout" @key-press="keyPressEvent"></the-keyboard>
    </div>
</template>

<script>

import KeyLayout from "/json/keyLayout.json";
import TheKeyboard from "./TheKeyboard.vue";

export default {
    name: "TheKeyboardEmailInput",
    data: function () {
        return {
            keyboardLayout: KeyLayout,
            inputText: "",
        }
    },
    components: {TheKeyboard},
    methods: {
        keyPressEvent(key) {
            let el = document.getElementById('input-text');
            let start = el.selectionStart;
            let end = el.selectionEnd;
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

            this.$nextTick(() => {
                el.selectionStart = start;
                el.selectionEnd = start;
            });
        }
    },
    mounted: function () {

        let el = document.getElementById('input-text');

        el.focus();

        el.onblur = function () {
            setTimeout(function () {
                el.focus();
            });
        };

    }
}
</script>

<style scoped>
#input-text {
    color: #7e89b8;
    font: 50px "customFont";
    background-color: rgba(255,255,255,0);
    display: block;
    width:100%;
    text-align: center;
}
input {border:0;outline:0;}
input:focus {outline:none!important;}

</style>
