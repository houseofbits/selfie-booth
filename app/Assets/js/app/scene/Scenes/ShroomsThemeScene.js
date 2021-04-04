import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BackgroundTexture1 from '@images/shrooms/bg1-2.png';
import BackgroundTexture2 from '@images/shrooms/bg2-2.png';
import BasicCameraMaterial from "@app/scene/Materials/BasicCameraMaterial";
import FaceDetectionServiceInstance from "@common/FaceDetectionService";


export default class ShroomsThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createVideoTexture();

        this.createLogo(-160, 730);

        FaceDetectionServiceInstance.addDetectionCallback(this.onFaceDetected.bind(this));
    }

    createScene() {

        this.bg1Texture = new BABYLON.Texture(BackgroundTexture1, this.scene);
        this.bg2Texture = new BABYLON.Texture(BackgroundTexture2, this.scene);

        this.material = new BasicCameraMaterial(this.scene, this.name + 'MainMaterial');

        this.material.setVector3Param('cameraTint', new BABYLON.Vector3(0.9, 1.0, 0.8));

        this.createFaceDetectorMaterialParams(this.material);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        this.onOptionSelected('shroom1');
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
            case 'shroom1':
                this.material.setDiffuseTexture(this.bg1Texture);
                this.targetFacePosition.x = 0.5;
                this.targetFacePosition.y = 0.3;
                break;
            case 'shroom2':
                this.material.setDiffuseTexture(this.bg2Texture);
                this.targetFacePosition.x = 0.5;
                this.targetFacePosition.y = 0.3;
                break;
        }
    }

    onSceneActivated() {
        this.onOptionSelected('shroom1');
    }
}