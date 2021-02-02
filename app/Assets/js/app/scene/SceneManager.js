import * as BABYLON from 'babylonjs';
import AmberThemeScene from "@app/scene/Scenes/AmberThemeScene";
import DemoScene from "@app/scene/Scenes/DemoScene";
import DinosaursThemeScene from "@app/scene/Scenes/DinosaursThemeScene";
import CoralThemeScene from "@app/scene/Scenes/CoralThemeScene";
import ShroomsThemeScene from "@app/scene/Scenes/ShroomsThemeScene";
import BirdsThemeScene from "@app/scene/Scenes/BirdsThemeScene";
import ArchiveThemeScene from "@app/scene/Scenes/ArchiveThemeScene";
import BugsThemeScene from "@app/scene/Scenes/BugsThemeScene";

export default class SceneManager {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: false, stencil: false});
        this.canvas = canvas;
        this.deltaTime = 0;
        this.scenes = [];
        this.activeScene = null;

        this.addScene(new DemoScene(this, 'DemoScene'));
        this.addScene(new AmberThemeScene(this, 'AmberScene'));
        this.addScene(new DinosaursThemeScene(this, 'DinosaursScene'));
        this.addScene(new CoralThemeScene(this, 'CoralScene'));
        this.addScene(new ShroomsThemeScene(this, 'ShroomsScene'));
        this.addScene(new BirdsThemeScene(this, 'BirdsScene'));
        this.addScene(new ArchiveThemeScene(this, 'ArchiveScene'));
        this.addScene(new BugsThemeScene(this, 'BugsScene'));

        this.onThemeSelected('DemoScene');
        //this.onThemeSelected('DinosaursScene');

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

    onOptionSelected(optionName) {
        if (this.activeScene) {
            this.activeScene.onOptionSelected(optionName);
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

