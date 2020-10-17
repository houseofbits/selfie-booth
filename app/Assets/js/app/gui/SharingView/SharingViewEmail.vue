<template>
    <div v-if="isActive">

    </div>
</template>

<script>

import TheKeyboardEmailInput from "./TheKeyboard/TheKeyboardEmailInput.vue";

export default {
    name: "SharingViewEmail",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        TheKeyboardEmailInput
    },
    data: function () {
        return {

        }
    }
};
</script>

<style scoped>

</style>