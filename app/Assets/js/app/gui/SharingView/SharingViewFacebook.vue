<template>
    <div class="window" v-if="isActive">
        <div class="header-row error" v-if="hasError">
            QR Code image not generated
        </div>
        <div class="header-row" v-else>
            <span>Share to Facebook</span>
        </div>

        <img v-if="!hasError" :src="qrCodeImage" @error="onError" alt="QR Code" class="qr-image">

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
            hasError:false,
        }
    },
    watch:{
        isActive(){
            this.hasError = false;
        }
    },
    computed:{
        qrCodeImage(){
            return '/api/qr/fb/' + this.imageId;
        }
    },
    methods:{
        onError(e){
            this.hasError = true;
            this.$emit('error');
        }
    }
};
</script>

<style scoped>
.window {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 1000px;
    width: 1080px;
    height: 650px;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
}
.header-row {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    vertical-align: middle;
    color: white;
    font-size: 40px;
}
.error{
    color:lightcoral;
}
.qr-image{
    display: block;
    width:500px;
    height:500px;
    position:absolute;
    top:100px;
    left:300px;
    border: dashed 2px yellow;
}
</style>