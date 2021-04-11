import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BasicCameraMaterial from "@app/scene/Materials/BasicCameraMaterial";
import BackgroundTexture1 from "@images/dinosaurs/bg1.png";
import BackgroundTexture2 from "@images/dinosaurs/bg2.png";
import BackgroundTexture3 from "@images/dinosaurs/bg3.png";
import BackgroundTexture4 from "@images/dinosaurs/bg4.png";
import FaceDetectionServiceInstance from "@common/FaceDetectionService";

export default class DinosaursThemeScene extends BaseScene {
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

        this.material = new BasicCameraMaterial(this.scene, this.name + 'MainMaterial');
        this.createFaceDetectorMaterialParams(this.material);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane2", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

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
        this.onOptionSelected('dinosaurs1');
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'dinosaurs1':
                this.material.setDiffuseTexture(this.bg1Texture);
                this.targetFacePosition.x = 0.43;
                this.targetFacePosition.y = 0.32;
                break;
            case 'dinosaurs2':
                this.material.setDiffuseTexture(this.bg2Texture);
                this.targetFacePosition.x = 0.32;
                this.targetFacePosition.y = 0.36;
                break;
            case 'dinosaurs3':
                this.material.setDiffuseTexture(this.bg3Texture);
                this.targetFacePosition.x = 0.34;
                this.targetFacePosition.y = 0.42;
                break;
            case 'dinosaurs4':
                this.material.setDiffuseTexture(this.bg4Texture);
                this.targetFacePosition.x = 0.37;
                this.targetFacePosition.y = 0.41;
                break;
        }
    }
}