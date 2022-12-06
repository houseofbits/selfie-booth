import * as BABYLON from 'babylonjs';
import DemoScene from "@app/scene/Scenes/DemoScene";
import PhotoScene from "@app/scene/Scenes/PhotoScene";

export default class SceneManager {
    constructor() {
        this.engine = null;
        this.canvas = null;
        this.deltaTime = 0;
        this.loaderViewCallback = null;
        this.demoScene = null;
        this.isDemoSceneActive = true;
        this.selectedTheme = null;
    }

    async init(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: false, stencil: false});

        this.photoScene = new PhotoScene(this);
        this.photoScene.init();
        this.onThemeSelected('ShroomsScene');
        this.photoScene.onOptionSelected('shroom2');

        this.demoScene = new DemoScene(this, 'DemoScene', this.canvas);
        await this.demoScene.onSceneActivated();

        this.onThemeSelected('DemoScene');

        this.engine.runRenderLoop(() => this.render());

        this.logLoadingMessage('Application ready!', true);
    }

    render() {
        this.deltaTime = this.engine.getDeltaTime() / 1000.0;

        if (this.isDemoSceneActive) {
            this.demoScene.update(this.deltaTime);
            this.demoScene.render();
        } else {
            //this.photoScene.update(this.deltaTime);
            this.photoScene.render();
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

