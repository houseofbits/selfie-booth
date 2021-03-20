import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import DetectorMaterial from "@app/scene/Materials/DetectorMaterial";

export default class FaceDetectorScene extends BaseScene {
    constructor(mainScene, name, targetCAnvas) {
        super(mainScene, name, targetCAnvas);

        this.scene.clearColor = new BABYLON.Color3(0.9, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createVideoTexture();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        this.material = new DetectorMaterial(this.scene, this.name + 'MainMaterial');
        this.plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        this.plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.material.setDiffuseTexture(this.videoTexture);
        this.plane.material = this.material.getMaterial();
    }
}