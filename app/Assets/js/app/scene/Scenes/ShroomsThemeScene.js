import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BgMap from '@images/shrooms/background.png';
import ShroomsMaterial from "@app/scene/Materials/ShroomsMaterial";
import FaceDetectionServiceInstance from "@common/FaceDetectionService";

export default class ShroomsThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createVideoTexture();

        FaceDetectionServiceInstance.addDetectionCallback(this.onFaceDetected.bind(this));
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        this.material = new ShroomsMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setCameraTexture(new BABYLON.Texture(BgMap, this.scene));
        this.material.setDiffuseMap(BgMap);

        this.material.setVector2Param('faceSize', this.detectedFaceSize);
        this.material.setVector2Param('facePosition', this.detectedFacePosition);
        this.material.setVector2Param('targetFacePosition', this.targetFacePosition);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        this.targetFacePosition.x = 0.5;
        this.targetFacePosition.y = 0.3;
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }
}