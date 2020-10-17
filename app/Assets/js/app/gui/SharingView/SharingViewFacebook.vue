<template>
    <div v-if="isActive">

    </div>
</template>

<script>

export default {
    name: "SharingViewFacebook",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
    },
    data: function () {
        return {

        }
    }
};
</script>

<style scoped>

</style>