<template>
    <div v-if="isActive">

    </div>
</template>

<script>

export default {
    name: "SharingViewDownload",
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