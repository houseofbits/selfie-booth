import * as BABYLON from 'babylonjs';
import AmberThemeScene from "/js/app/scene/Scenes/AmberThemeScene";
import DemoScene from "/js/app/scene/Scenes/DemoScene";

export default class SceneManager {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: false, stencil: false});
        this.canvas = canvas;
        this.deltaTime = 0;
        this.scenes = [];
        this.activeScene = null;

        this.addScene(new DemoScene(this, 'DemoScene'));
        this.addScene(new AmberThemeScene(this, 'AmberScene'));

        this.onThemeSelected('DemoScene');
        //this.onThemeSelected('AmberScene');

        this.engine.runRenderLoop(() => this.render());
    }

    render() {
        this.deltaTime = this.engine.getDeltaTime() / 1000.0;
        if (this.activeScene) {
            this.activeScene.update(this.deltaTime);
            this.activeScene.render();
        }
    }

    captureScreenshot() {
        this.render();
        if (this.activeScene) {
            return BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(this.engine, this.activeScene.scene.activeCamera, {
                width: 1080,
                height: 1920,
                precision: 1.0
            });
        }
    }

    onThemeSelected(themeName) {
        const result = this.scenes.find((e) => e.name === themeName);
        if (result) {
            this.setSceneActive(result);
        }
    }

    getActiveTheme() {
        if (this.activeScene) {
            return this.activeScene.getTheme();
        }
        return null;
    }

    setSceneActive(s) {
        if(this.activeScene && this.activeScene !== s) {
            this.activeScene.onSceneDeactivated();
        }
        this.activeScene = s;
        this.activeScene.onSceneActivated();
    }

    addScene(scene) {
        this.scenes.push(scene);
    }
}

