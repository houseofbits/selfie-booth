import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);
        this.theme.name = "Amber theme";

        this.amberMaterial = new BABYLON.StandardMaterial("mat", mainScene.scene);
        this.amberMaterial.diffuseColor = BABYLON.Color3.White();

        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {

        this.backdropMaterial = new BasicMaterial(this.getScene(), 'demoBackdrop');
        this.backdropMaterial.setDiffuseMap(BackdropTexture);

        this.backdrop = BABYLON.MeshBuilder.CreatePlane("plane", {width: 5, height:5}, this.getScene());
        this.backdrop.material = this.backdropMaterial.getMaterial();
        this.backdrop.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        this.backdrop.scaling.y = 1.0 / (1080 / 1920);
        this.setAsChild(this.backdrop);

        // let layer = new BABYLON.Layer('','https://i.imgur.com/mBBxGJH.jpg', this.getScene(), true);
        // layer.enabled = false;

        // let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4, segments: 32}, this.getScene());
        // sphere.position.y = 1;

        // let box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 1}, this.getScene());
        // box.position.x = 2;
        // box.position.y = 1.5;

        //let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.getScene());
       // ground.material = this.background1Material.getMaterial();

        //sphere.material = this.amberMaterial;

       // this.setAsChild(ground);
    }
}