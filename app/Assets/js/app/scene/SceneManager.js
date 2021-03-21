import * as BABYLON from 'babylonjs';
import AmberThemeScene from "@app/scene/Scenes/AmberThemeScene";
import DemoScene from "@app/scene/Scenes/DemoScene";
import DinosaursThemeScene from "@app/scene/Scenes/DinosaursThemeScene";
import CoralThemeScene from "@app/scene/Scenes/CoralThemeScene";
import ShroomsThemeScene from "@app/scene/Scenes/ShroomsThemeScene";
import BirdsThemeScene from "@app/scene/Scenes/BirdsThemeScene";
import ArchiveThemeScene from "@app/scene/Scenes/ArchiveThemeScene";
import BugsThemeScene from "@app/scene/Scenes/BugsThemeScene";
import DisplayThemeScene from "./Scenes/DisplayThemeScene";
import FaceDetectorScene from "./Scenes/FaceDetectorScene";

export default class SceneManager {
    constructor(canvas) {
        const tmpCanvas = document.createElement("canvas");
        this.engine = new BABYLON.Engine(tmpCanvas, true, {preserveDrawingBuffer: false, stencil: false});
        this.canvas = tmpCanvas;
        this.deltaTime = 0;
        this.scenes = [];
        this.activeScene = null;

        const renderCanvas = document.getElementById('renderCanvas');
        const captureCanvas = document.getElementById('captureCanvas');

        this.addScene(new DemoScene(this, 'DemoScene', renderCanvas));
        this.addScene(new AmberThemeScene(this, 'AmberScene', renderCanvas));
        this.addScene(new DinosaursThemeScene(this, 'DinosaursScene', renderCanvas));
        this.addScene(new CoralThemeScene(this, 'CoralScene', renderCanvas));
        this.addScene(new ShroomsThemeScene(this, 'ShroomsScene', renderCanvas));
        this.addScene(new BirdsThemeScene(this, 'BirdsScene', renderCanvas));
        this.addScene(new ArchiveThemeScene(this, 'ArchiveScene', renderCanvas));
        this.addScene(new BugsThemeScene(this, 'BugsScene', renderCanvas));
        this.addScene(new DisplayThemeScene(this, 'DisplayScene', renderCanvas));

        this.faceDetectorScene = new FaceDetectorScene(this, 'FaceDetectorScene', captureCanvas);

        this.onThemeSelected('CoralScene');

        this.engine.runRenderLoop(() => this.render());
    }

    render() {
        this.deltaTime = this.engine.getDeltaTime() / 1000.0;

        if (this.activeScene && this.engine.activeView === this.activeScene.view) {
            this.activeScene.update(this.deltaTime);
            this.activeScene.render();
        } else if (this.engine.activeView === this.faceDetectorScene.view) {
            this.faceDetectorScene.update(this.deltaTime);
            this.faceDetectorScene.render();
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

