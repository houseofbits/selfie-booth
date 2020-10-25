import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';

const EffectTypes = {
    Bg1: 1,
    Bg2: 2,
    Bg3: 3
};

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene) {
        super(mainScene);
        this.theme.name = "Amber theme";
        this.theme.setImage("assets/images/themes/amber/icon.png");
        this.theme.addEffect(EffectTypes.Bg1, "Background1", "icon1.png");
        this.theme.addEffect(EffectTypes.Bg2, "Background2", "icon2.png");
        this.theme.addEffect(EffectTypes.Bg3, "Background3", "icon3.png");
        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, this.getScene());
        sphere.position.y = 1;

        let box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 1}, this.getScene());
        box.position.x = 2;
        box.position.y = 1.5;

        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.getScene());
    }
}