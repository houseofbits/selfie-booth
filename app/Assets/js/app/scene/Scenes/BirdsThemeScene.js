import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/birds/bg1.png';
import BackgroundTexture2 from '@images/birds/bg2.png';
import BackgroundTexture3 from '@images/birds/bg3.png';
import BackgroundTexture4 from '@images/birds/bg4.png';
import BirdsMaterial from "@app/scene/Materials/BirdsMaterial";
import FaceDetectionServiceInstance from '@common/FaceDetectionService.js';

export default class BirdsThemeScene extends BaseScene {
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
        this.bg1Texture = new BABYLON.Texture(BackgroundTexture1, this.scene);
        this.bg2Texture = new BABYLON.Texture(BackgroundTexture2, this.scene);
        this.bg3Texture = new BABYLON.Texture(BackgroundTexture3, this.scene);
        this.bg4Texture = new BABYLON.Texture(BackgroundTexture4, this.scene);

        this.material = new BirdsMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setDiffuseTexture(this.bg1Texture);

        this.createFaceDetectorMaterialParams(this.material);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        this.targetFacePosition.x = 0.5;
        this.targetFacePosition.y = 0.45;
    }

    onFaceDetected(detectionService) {
        super.onFaceDetected(detectionService);
        this.material.setIntegerParam('isFaceDetectorEnabled', this.isFaceDetectorEnabled);
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'egg1':
                this.material.setDiffuseTexture(this.bg1Texture);
                break;
            case 'egg2':
                this.material.setDiffuseTexture(this.bg2Texture);
                break;
            case 'egg3':
                this.material.setDiffuseTexture(this.bg3Texture);
                break;
            case 'egg4':
                this.material.setDiffuseTexture(this.bg4Texture);
                break;
        }
    }
}