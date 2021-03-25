import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BgMap from '@images/coral/background.png';
import CoralMaterial from "@app/scene/Materials/CoralMaterial";
import FaceDetectionServiceInstance from '@common/FaceDetectionService.js';

export default class CoralThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createLogo(-300, 700);

        this.createVideoTexture();

        FaceDetectionServiceInstance.addDetectionCallback(this.onFaceDetected.bind(this));
    }

    createScene() {
        this.material = new CoralMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setCameraTexture(new BABYLON.Texture(BgMap, this.scene));
        this.material.setDiffuseMap(BgMap);

        this.createFaceDetectorMaterialParams(this.material);

        this.material.setIntegerParam('displaceState', 0);

        let plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        plane.material = this.material.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        this.targetFacePosition.x = 0.47;
        this.targetFacePosition.y = 0.3;
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
            case 'coral1':
                this.material.setIntegerParam('displaceState', 0);
                break;
            case 'coral2':
                this.material.setIntegerParam('displaceState', 1);
                break;
            case 'coral3':
                this.material.setIntegerParam('displaceState', 2);
                break;
        }
    }
}