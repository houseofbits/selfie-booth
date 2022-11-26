import * as BABYLON from 'babylonjs';

export default class BaseScene {
    constructor(sceneMnager, name, targetCanvas) {
        this.canvas = targetCanvas || null;
        this.name = name || 'Scene';
        this.scene = new BABYLON.Scene(sceneMnager.engine);
        this.videoTexture = null;
        this.sceneManager = sceneMnager;
    }

    render() {
       this.scene.render();
    }

    getTheme() {
        return this.name;
    }

    createVideoTexture() {
        this.videoTexture = null;
        BABYLON.VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.onVideoTextureCreated();
        }, {deviceId: '', maxWidth: 1080, maxHeight: 1920});
    }

    update(dt) {    }

    onOptionSelected(optionName) {  }

    onVideoTextureCreated() {   }

    createVirtualCameraTexture(name) {
        navigator.mediaDevices.enumerateDevices().then((result) => {
            console.log(result);
            for (const mediaDeviceInfo of result) {
                if (mediaDeviceInfo.label === name) {
                    navigator.mediaDevices.getUserMedia({
                        video: {deviceId: mediaDeviceInfo.deviceId}
                    }).then((stream) => {
                        BABYLON.VideoTexture.CreateFromStreamAsync(this.scene, stream).then((videoTexture) => {
                            this.videoTexture = videoTexture;
                            this.onVideoTextureCreated();
                        });
                    });

                    return;
                }
            }
        });
    }
}