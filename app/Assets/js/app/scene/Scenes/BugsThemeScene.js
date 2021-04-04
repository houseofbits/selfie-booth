import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/bugs/bg1.png';
import BackgroundTexture2 from '@images/bugs/bg2-2.png';
import BackgroundTexture3 from '@images/bugs/bg3-2.png';
import BasicCameraMaterial from "@app/scene/Materials/BasicCameraMaterial";
import FaceDetectionServiceInstance from "@common/FaceDetectionService";

export default class BugsThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createLogo(-160, 730);

        this.createVideoTexture();

        FaceDetectionServiceInstance.addDetectionCallback(this.onFaceDetected.bind(this));

        this.targetFacePosition.x = 0.45;
        this.targetFacePosition.y = 0.3;
    }

    createScene() {
        this.bg1Texture = new BABYLON.Texture(BackgroundTexture1, this.scene);
        this.bg2Texture = new BABYLON.Texture(BackgroundTexture2, this.scene);
        this.bg3Texture = new BABYLON.Texture(BackgroundTexture3, this.scene);

        this.material = new BasicCameraMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setDiffuseTexture(this.bg1Texture);

        this.createFaceDetectorMaterialParams(this.material);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.material.setCameraTexture(this.videoTexture);
    }

    onFaceDetected(detectionService) {
        super.onFaceDetected(detectionService);
        this.material.setIntegerParam('isFaceDetectorEnabled', this.isFaceDetectorEnabled);
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'bug1':
                this.material.setDiffuseTexture(this.bg1Texture);
                break;
            case 'bug2':
                this.material.setDiffuseTexture(this.bg2Texture);
                this.targetFacePosition.x = 0.68;
                this.targetFacePosition.y = 0.27;
                break;
            case 'bug3':
                this.material.setDiffuseTexture(this.bg3Texture);
                this.targetFacePosition.x = 0.4;
                this.targetFacePosition.y = 0.33;
                break;
        }
    }

    onSceneActivated() {
        this.onOptionSelected('bug1');
    }
}