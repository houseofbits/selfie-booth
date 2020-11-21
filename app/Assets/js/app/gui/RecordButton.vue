<template>
    <div class="record-button">
        <div class="button" @click="startCapture">Capture</div>
    </div>
</template>

<script>
export default {
    name: "RecordButton",
    props: {},
    methods:{
        startCapture(){
            this.$emit('capture');
            //setTimeout(this.capture, 1000);
            this.capture();
        },
        capture(){
            this.$emit('record');
        }
    }
};
</script>

<style scoped>
.record-button{
    pointer-events: auto;
    position:absolute;
    top:1700px;
    left:460px;
    width: 160px;
    height: 160px;
}
.button {
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: crimson;
    text-align: center;
    font-size: 30px;
    line-height: 160px;
    vertical-align: middle;
}
</style>