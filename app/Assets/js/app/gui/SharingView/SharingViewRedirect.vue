<template>
    <div :class="{visible:isActive}" class="window">

        <div class="info-row"><i class="fas fa-info-circle"></i> Lai dalītos ar savu attēlu Facebook, noskenē savā telefonā QR kodu.</div>
        <div :class="{visible: isError}" class="error-row"><i class="fas fa-exclamation-triangle"></i> Neizdevās izveidot QR codu</div>

        <img :src="qrCodeImage" @error="onError" alt="QR Code" class="qr-image">

        <text-button class="back-button orange" icon="fas fa-arrow-circle-left" @click="closeView">ATPAKAĻ</text-button>
    </div>
</template>

<script>

import TextButton from '../TextButton.vue';

export default {
    name: "SharingViewRedirect",
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        image: {
            type: Object,
        },
        type: {
            type: Number,
        },
    },
    components: {
        TextButton
    },
    data: function () {
        return {
            isError:false,
        }
    },
    watch:{
        isActive(){
            this.isError = false;
        }
    },
    computed:{
        qrCodeImage(){
            if(this.image && this.image.hash) {
                return '/api/qr/fb/' + this.image.hash;
            }
        }
    },
    methods:{
        onError(e){
            this.isError = true;
        },
        closeView() {
            this.$emit('close');
        },
    }
};
</script>

<style lang="scss" scoped>
.window {
    position: absolute;
    top: 1000px;
    left: 120px;
    width: 840px;
    height: 550px;
    z-index: 8;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s linear;

    &.visible {
         opacity: 1;
         visibility: visible;
         transition: all 0.4s linear;
     }

    .info-row {
        position: absolute;
        top: 350px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 35px;
        background: linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.61));
        opacity: 1;
        transition: opacity 500ms linear;

        &.hidden {
            opacity: 0;
            transition: opacity 500ms linear;
        }
    }

    .error-row {
        position: absolute;
        top: 470px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 35px;
        background: linear-gradient(to bottom, #feccb1 0%,#f95a04 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.8));
        opacity: 0;
        transition: opacity 200ms linear;

        &.visible {
            opacity: 1;
            transition: opacity 200ms linear;
        }
    }
    .back-button {
        position: absolute;
        top: 580px;
        left: 295px;
        width: 250px;
    }
    .qr-image{
        display: block;
        width:500px;
        height:500px;
        position:absolute;
        top:-150px;
        left:170px;
        //border: dashed 2px yellow;
        box-shadow: 0px 5px 15px 5px rgba(0,0,0,0.64);
    }
}

</style>