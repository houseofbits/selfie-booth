<template>
    <div>
        <div v-if="isActive">

        </div>
        <div>

        </div>
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
        imageId: {
            type: String,
            required: false,
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