<template>
    <div>
        <div v-if="isActive">
            <img :src="qrCodeImage" alt="QR Code" width="100%" height="100%">
        </div>
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
            return '/api/qr/fb/' + this.imageId;
        }
    }
};
</script>

<style scoped>

</style>