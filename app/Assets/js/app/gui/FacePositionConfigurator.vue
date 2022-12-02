<template>
    <div class="frame" v-if="allOptions">
        <div class="rect filled" :style="rectStyle">
            <video ref="video" autoplay/>
        </div>
        <img :src="img" alt=""/>
        <div v-if="isImageVisible" class="rect" :style="rectStyle"></div>
        <div class="controls">
            <button @click="isImageVisible=!isImageVisible">Show/Hide image</button>
            <button @click="selectedIndex--">Prev</button>
            <button @click="selectedIndex++">Next</button>
            <span>X:</span><input type="number" v-model="posx">
            <span>Y:</span><input type="number" v-model="posy">
            <span>W:</span><input type="number" v-model="width">
            <span>H:</span><input type="number" v-model="height">
        </div>
    </div>
</template>

<script>
import getPhotoSceneParams from "@app/scene/Scenes/PhotoSceneParams";
import BABYLON from "babylonjs";

export default {
    name: "FacePositionConfigurator",
    data() {
        return {
            isImageVisible: true,
            selectedIndex: 0,
            allOptions: null,
            width: 200,
            height: 200,
            posx: 200,
            posy: 200
        };
    },
    watch: {
        selectedIndex() {
            this.setTransformFromParams();
        }
    },
    computed: {
        img() {
            return this.allOptions[this.selectedIndex].texture;
        },
        rectStyle() {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
                left: this.posx + 'px',
                top: this.posy + 'px',
            };
        }
    },
    methods: {
        setTransformFromParams() {
            const params = this.allOptions[this.selectedIndex].faceParams;
            this.posx = params[0];
            this.posy = params[1];
            this.width = params[2];
            this.height = params[3];
        }
    },
    mounted() {
        this.allOptions = [];
        const params = getPhotoSceneParams();
        for (const theme in params) {
            for (const option in params[theme].options) {
                this.allOptions.push(params[theme].options[option]);
            }
        }

        this.setTransformFromParams();


        navigator.mediaDevices.enumerateDevices().then((result) => {
            for (const mediaDeviceInfo of result) {
                if (mediaDeviceInfo.label === 'Virtual Webcam') {
                    navigator.mediaDevices.getUserMedia({
                        video: {
                            deviceId: mediaDeviceInfo.deviceId
                        }
                    }).then((stream) => {
                        this.$refs.video.srcObject = stream;
                    });
                    return;
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.frame {
    position: absolute;
    background-color: red;
    width: 1080px;
    height: 1920px;
    top: 0;
    left: 0;

    & img {
        position: absolute;
        width: 1080px;
        height: 1920px;
        top: 0;
        left: 0;
        z-index: 2;
    }

    & .rect {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 200px;
        height: 200px;
        z-index: 3;
        border: solid 1px blue;

        &.filled {
            background-color: #5ab2ff;
            z-index: 1;

            & video {
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left: 0;
                object-fit: fill;
            }
        }
    }
    & .controls {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;

        & span {
            color: white;
        }
    }
}
</style>