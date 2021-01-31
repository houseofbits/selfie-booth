import ThemeStructure from "@app/scene/Structures/ThemeStructure";
import * as BABYLON from 'babylonjs';

export default class BaseScene {
    constructor(mainScene, name) {
        this.name = name;
        this.scene = new BABYLON.Scene(mainScene.engine);
        this.mainScene = mainScene;
        this.parentNode = new BABYLON.TransformNode(this.name + "Parent");
        this.videoTexture = null;
    }

    update(dt) {

    }

    render() {
        this.scene.render();
    }

    getTheme() {
        return this.theme;
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