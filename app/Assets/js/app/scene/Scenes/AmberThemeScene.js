import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/leaf_1.png';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";

const EffectTypes = {
    Bg1: 1,
    Bg2: 2,
    Bg3: 3
};

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene) {
        super(mainScene);
        this.theme.name = "Amber theme";
        // this.theme.setImage("assets/images/themes/amber/icon.png");
        // this.theme.addEffect(EffectTypes.Bg1, "Background1", "icon1.png");
        // this.theme.addEffect(EffectTypes.Bg2, "Background2", "icon2.png");
        // this.theme.addEffect(EffectTypes.Bg3, "Background3", "icon3.png");

        this.amberMaterial = new BABYLON.StandardMaterial("mat", mainScene.scene);
        this.amberMaterial.diffuseColor = BABYLON.Color3.White();

//        this.background1Material = new BABYLON.StandardMaterial("mat", mainScene.scene);
//        this.background1Material.emissiveTexture = new BABYLON.Texture(BackgroundTexture1, mainScene.scene);

        this.background1Material = new BasicMaterial(mainScene.scene, 'bg1');
        this.background1Material.setDiffuseMap(BackgroundTexture1);

        this.createScene();
    }

    setVideoTexture(texture) {
        this.amberMaterial.diffuseTexture = texture;
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4, segments: 32}, this.getScene());
        sphere.position.y = 1;

        // let box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 1}, this.getScene());
        // box.position.x = 2;
        // box.position.y = 1.5;

        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.getScene());
        ground.material = this.background1Material.getMaterial();

        sphere.material = this.amberMaterial;
    }
}