import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/bugs/bg1.png';
import BackgroundTexture2 from '@images/bugs/bg2.png';
import BackgroundTexture3 from '@images/bugs/bg3.png';
import BugsMaterial from "@app/scene/Materials/BugsMaterial";

export default class BugsThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.createScene();

        this.createVideoTexture();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        this.bg1Texture = new BABYLON.Texture(BackgroundTexture1, this.scene);
        this.bg2Texture = new BABYLON.Texture(BackgroundTexture2, this.scene);
        this.bg3Texture = new BABYLON.Texture(BackgroundTexture3, this.scene);

        this.material = new BugsMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setDiffuseTexture(this.bg1Texture);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'bug1':
                this.material.setDiffuseTexture(this.bg1Texture);
                break;
            case 'bug2':
                this.material.setDiffuseTexture(this.bg2Texture);
                break;
            case 'bug3':
                this.material.setDiffuseTexture(this.bg3Texture);
                break;
        }
    }
}