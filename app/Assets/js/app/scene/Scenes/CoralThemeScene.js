import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/coral/bg1.png';
import BackgroundTexture2 from '@images/coral/bg2.png';
import BackgroundTexture3 from '@images/coral/bg3.png';
import CoralMaterial from "@app/scene/Materials/CoralMaterial";
import FaceDetectionServiceInstance from '@common/FaceDetectionService.js';
import BackgroundTexture4 from "@images/amber/bg4.png";

export default class CoralThemeScene extends BaseScene {
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

    createScene() {

        this.bg1Texture = new BABYLON.Texture(BackgroundTexture1, this.scene);
        this.bg2Texture = new BABYLON.Texture(BackgroundTexture2, this.scene);
        this.bg3Texture = new BABYLON.Texture(BackgroundTexture3, this.scene);
        this.bg4Texture = new BABYLON.Texture(BackgroundTexture4, this.scene);

        this.material = new CoralMaterial(this.scene, this.name + 'MainMaterial');

        this.createFaceDetectorMaterialParams(this.material);

        this.plane = BABYLON.MeshBuilder.CreatePlane("backplane", {
            width: 1000,
            height: 1770,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
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
        this.onOptionSelected('coral1');
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'coral1':
                this.material.setDiffuseTexture(this.bg1Texture);
                this.targetFacePosition.x = 0.4;
                this.targetFacePosition.y = 0.35;
                break;
            case 'coral2':
                this.material.setDiffuseTexture(this.bg2Texture);
                this.targetFacePosition.x = 0.4;
                this.targetFacePosition.y = 0.75;
                break;
            case 'coral3':
                this.material.setDiffuseTexture(this.bg3Texture);
                this.targetFacePosition.x = 0.85;
                this.targetFacePosition.y = 0.2;
                break;
        }
    }
}