import * as BABYLON from 'babylonjs';
import MainSceneInstance from "./MainInstance";

export default class BaseScene {
    constructor(sceneMnager, name, targetCanvas) {
        this.canvas = targetCanvas || null;
        this.name = name || 'Scene';
        this.scene = new BABYLON.Scene(sceneMnager.engine);
        this.videoTexture = null;
        this.sceneManager = sceneMnager;
        this.isStreaming = false;
        this.view = null;
    }

    registerView(camera, canvas) {
        this.view = this.sceneManager.engine.registerView(canvas, camera);
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
        }, {maxWidth: 1080, maxHeight: 1920});
    }

    update(dt) {
    }

    onOptionSelected(optionName) {
    }

    onVideoTextureCreated() {
    }

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

    deviceEnumerationProcess() {
        if (!this.isStreaming) {
            this.detectDevice('Virtual Webcam');
        }
        setTimeout(this.deviceEnumerationProcess.bind(this), 1000);
    }

    detectDevice(name) {
        const mediaDevices = navigator.mediaDevices;

        if (!mediaDevices) {
            MainSceneInstance.logLoadingMessage('! Media devices not found (navigator.mediaDevices)');

            return;
        }

        mediaDevices.enumerateDevices().then((result) => {
            for (const mediaDeviceInfo of result) {
                if (mediaDeviceInfo.label === name) {
                    navigator.mediaDevices.getUserMedia({
                        video: {
                            deviceId: mediaDeviceInfo.deviceId
                        }
                    }).then((stream) => this.createSource(stream));
                    return;
                }
            }
        });
    }

    createSource(stream) {
        BABYLON.VideoTexture.CreateFromStreamAsync(this.scene, stream).then((videoTexture) => {
            this.videoTexture = videoTexture;
            this.isStreaming = true;
            stream.addEventListener('inactive', () => {
                this.isStreaming = false;
            });
            this.onVideoTextureCreated();
        });
    }
}