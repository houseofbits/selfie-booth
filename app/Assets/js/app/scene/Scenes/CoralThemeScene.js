import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BgMap from '@images/coral/background.png';
import CoralMaterial from "@app/scene/Materials/CoralMaterial";

export default class CoralThemeScene extends BaseScene {
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
        this.material = new CoralMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setCameraTexture(new BABYLON.Texture(BgMap, this.scene));
        this.material.setDiffuseMap(BgMap);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }
}