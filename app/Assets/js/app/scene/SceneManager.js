import * as BABYLON from 'babylonjs';
import DemoScene from "@app/scene/Scenes/DemoScene";
import PhotoScene from "@app/scene/Scenes/PhotoScene";
import CameraScene from "@app/scene/Scenes/CameraScene";
export default class SceneManager {
    constructor() {
        this.engine = null;
        // this.canvas = null;
        this.deltaTime = 0;
        this.loaderViewCallback = null;
        this.demoScene = null;
        this.isDemoSceneActive = true;
        this.selectedTheme = null;
        this.videoTexture = null;
    }

    async init() {
        document.getElementById('renderCanvas')

        const tmpCanvas = document.createElement("canvas");
        this.engine = new BABYLON.Engine(tmpCanvas, true, {preserveDrawingBuffer: false, stencil: false});

        const renderCanvas = document.getElementById('renderCanvas');
        const captureCanvas = document.getElementById('captureCanvas');

        this.photoScene = new PhotoScene(this);
        this.photoScene.init(renderCanvas);
        this.onThemeSelected('ShroomsScene');
        this.photoScene.onOptionSelected('shroom2');

        // this.demoScene = new DemoScene(this, 'DemoScene', renderCanvas);
        // await this.demoScene.onSceneActivated();
        // this.onThemeSelected('DemoScene');

        this.captureScene = new CameraScene(this);
        this.captureScene.init(captureCanvas);

        this.engine.runRenderLoop(() => this.render());

        this.logLoadingMessage('Application ready!', true);
    }

    render() {
        this.deltaTime = this.engine.getDeltaTime() / 1000.0;

        if (this.isDemoSceneActive) {
            // this.demoScene.update(this.deltaTime);
            // this.demoScene.render();
        } else {
            if (this.engine.activeView === this.photoScene.view) {
                this.photoScene.update(this.deltaTime);
                this.photoScene.render();
            } else if (this.engine.activeView === this.captureScene.view) {
                this.captureScene.update(this.deltaTime);
                this.captureScene.render();
            }
        }
    }

    captureScreenshot() {
        this.render();
        if (!this.isDemoSceneActive) {
            return BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(this.engine, this.photoScene.scene.activeCamera, {
                width: 1080,
                height: 1920,
                precision: 1.0
            });
        }
    }

    onOptionSelected(optionName) {
        this.photoScene.onOptionSelected(optionName);
    }

    onThemeSelected(themeName) {
        if (themeName === "DemoScene") {
            this.isDemoSceneActive = true;
        } else {
            this.isDemoSceneActive = false;
            this.photoScene.selectTheme(themeName);
            this.selectedTheme = themeName;
        }
    }

    getActiveTheme() {
        return this.selectedTheme;
    }

    logLoadingMessage(message, isLoaded) {
        if (this.loaderViewCallback) {
            this.loaderViewCallback(message, isLoaded || false);
        }
    }

    registerLoaderViewCallback(callback) {
        this.loaderViewCallback = callback;
    }
}

