import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/amber/bg1.png';
import BackgroundTexture2 from '@images/amber/bg2.png';
import BackgroundTexture3 from '@images/amber/bg3.png';
import BackgroundTexture4 from '@images/amber/bg4.png';
import FaceDetectionServiceInstance from "@common/FaceDetectionService";
import AmberMaterial from "@app/scene/Materials/AmberMaterial";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createLogo(-160, 730);

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

        this.material = new AmberMaterial(this.scene, this.name + 'MainMaterial');

        this.createFaceDetectorMaterialParams(this.material);

        this.plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        this.plane.material = this.material.getMaterial();
        this.plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        this.onSceneActivated();
    }

    onFaceDetected(detectionService) {
        super.onFaceDetected(detectionService);
        this.material.setIntegerParam('isFaceDetectorEnabled', this.isFaceDetectorEnabled);
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }

    onSceneActivated() {
        this.onOptionSelected('amber1');
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'amber1':
                this.material.setDiffuseTexture(this.bg1Texture);
                this.targetFacePosition.x = 0.5;
                this.targetFacePosition.y = 0.45;
                break;
            case 'amber2':
                this.material.setDiffuseTexture(this.bg2Texture);
                this.targetFacePosition.x = 0.5;
                this.targetFacePosition.y = 0.55;
                break;
            case 'amber3':
                this.material.setDiffuseTexture(this.bg3Texture);
                this.targetFacePosition.x = 0.65;
                this.targetFacePosition.y = 0.6;
                break;
            case 'amber4':
                this.material.setDiffuseTexture(this.bg4Texture);
                this.targetFacePosition.x = 0.5;
                this.targetFacePosition.y = 0.6;
                break;
        }
    }
}