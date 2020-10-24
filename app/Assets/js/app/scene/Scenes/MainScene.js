import * as BABYLON from 'babylonjs';
import AmberThemeScene from "/js/app/scene/Scenes/AmberThemeScene";

export default class MainScene {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.createScene();

        this.videoTexture = null;
        BABYLON.VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
        }, {maxWidth: 256, maxHeight: 256});

        this.engine.runRenderLoop(() => this.render());

        this.deltaTime = 0;
        this.scenes = [];
        this.activeScene = null;

        this.addScene(new AmberThemeScene(this));

        this.activeScene = this.scenes[0];
    }

    render() {

        this.deltaTime = this.engine.getDeltaTime() / 1000.0;

        this.scene.activeCamera.alpha += 0.002;

        if (this.activeScene) {
            this.activeScene.update(this.deltaTime);
        }

        this.scene.render();
    }

    createScene() {
        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 45, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.setTarget(new BABYLON.Vector3(0, 1, 0));
        camera.attachControl(this.canvas, true);

        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

        // var mat = new BABYLON.StandardMaterial("mat", this.scene);
        // mat.diffuseColor = BABYLON.Color3.White();
    }

    captureScreenshot() {
        this.render();
        return BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(this.engine, this.scene.activeCamera, {
            width: 1080,
            height: 1920,
            precision: 1.0
        });
    }

    onModeSelected(state) {
        //Callback from gui state change
    }

    onThemeSelected(themeObject) {
        //Callback from gui state change
    }

    onEffectSelected(effectObject) {
        //Callback from gui state change
    }

    getThemes() {
        let themes = [];
        for (const key of Object.keys(this.scenes)) {
            let theme = this.scene[key].getTheme();
            if (theme) {
                themes.push(theme);
            }
        }
        return themes;
    }

    getActiveTheme() {
        if (this.activeScene) {
            return this.activeScene.getTheme();
        }
        return null;
    }

    addScene(scene) {
        this.scenes.push(scene);
    }
}

