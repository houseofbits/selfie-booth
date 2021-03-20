import ThemeStructure from "@app/scene/Structures/ThemeStructure";
import * as BABYLON from 'babylonjs';

export default class BaseScene {
    constructor(mainScene, name, targetCanvas) {
        this.canvas = targetCanvas || null;
        this.name = name;
        this.scene = new BABYLON.Scene(mainScene.engine);
        this.mainScene = mainScene;
        this.parentNode = new BABYLON.TransformNode(this.name + "Parent");
        this.videoTexture = null;
        this.view = null;
    }

    registerView(camera) {
        if (this.canvas) {
            this.view = this.mainScene.engine.registerView(this.canvas, camera);
        }
    }

    update(dt) {

    }

    render() {
        this.scene.render();
    }

    getTheme() {
        return this.name;
    }

    onOptionSelected(optionName) {

    }

    onSceneActivated() {

    }

    onSceneDeactivated() {

    }

    setAsChild(node) {
        node.parent = this.parentNode;
    }

    createVideoTexture() {
        this.videoTexture = null;
        BABYLON.VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.onVideoTextureCreated();
        }, {maxWidth: 1080, maxHeight: 1920});
    }

    onVideoTextureCreated() {

    }
}