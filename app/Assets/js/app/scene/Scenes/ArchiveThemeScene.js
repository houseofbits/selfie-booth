import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BgMap from '@images/archive/background.png';
import BasicCameraMaterial from "@app/scene/Materials/BasicCameraMaterial";
import FaceDetectionServiceInstance from "@common/FaceDetectionService";

export default class ArchiveThemeScene extends BaseScene {
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
        this.material = new BasicCameraMaterial(this.scene, this.name + 'MainMaterial');
        this.material.setCameraTexture(new BABYLON.Texture(BgMap, this.scene));
        this.material.setDiffuseMap(BgMap);

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
}