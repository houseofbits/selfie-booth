import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/test-image.jpg';
import MaskTexture from '@images/amber/test-mask.jpg';
import AmberMaterial from "@app/scene/Scenes/Materials/AmberMaterial";

const EffectTypes = {
    Bg1: 1,
    Bg2: 2,
    Bg3: 3
};

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);
        //camera.attachControl(mainScene.canvas, true);

        this.createScene();

        this.createVideoTexture();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {

        // let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        // light.intensity = 0.7;

        // this.amberMaterial = new BABYLON.StandardMaterial("mat", this.scene);
        // this.amberMaterial.diffuseColor = BABYLON.Color3.White();

//        this.background1Material = new BABYLON.StandardMaterial("mat", mainScene.scene);
//        this.background1Material.emissiveTexture = new BABYLON.Texture(BackgroundTexture1, mainScene.scene);

        // this.background1Material = new BasicMaterial(this.scene, 'bg1');
        // this.background1Material.setDiffuseMap(this.videoTexture);

        // let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4, segments: 32}, this.scene);
        // sphere.position.y = 1;

        // let box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 1}, this.getScene());
        // box.position.x = 2;
        // box.position.y = 1.5;

        this.amberMaterial = new AmberMaterial(this.scene, 'amber');
        this.amberMaterial.setCameraTexture(new BABYLON.Texture(BackgroundTexture1, this.scene));
        this.amberMaterial.setDiffuseMap(BackgroundTexture1);
        this.amberMaterial.setMaskMap(MaskTexture);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.amberMaterial.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.amberMaterial.setCameraTexture(this.videoTexture);
    }
}