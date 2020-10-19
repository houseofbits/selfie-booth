<template>
    <div>
        <div v-if="isActive">
            <img :src="qrCodeImage" alt="QR Code">
        </div>
        <div>

        </div>
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
        imageId: {
            type: String,
            required: false,
        },
    },
    data: function () {
        return {

        }
    },
    computed:{
        qrCodeImage(){
            return '/api/qr/download/' + this.imageId;
        }
    }
};
</script>

<style scoped>

</style>