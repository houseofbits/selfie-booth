import * as BABYLON from 'babylonjs';
import BasicAlphaMaterial from "@app/scene/Materials/BasicAlphaMaterial";
import LogoTexture from "@images/LNDM175.jpg";

export default class BaseScene {
    constructor(mainScene, name, targetCanvas) {
        this.canvas = targetCanvas || null;
        this.name = name;
        this.scene = new BABYLON.Scene(mainScene.engine);
        this.mainScene = mainScene;
        this.parentNode = new BABYLON.TransformNode(this.name + "Parent");
        this.videoTexture = null;
        this.view = null;

        this.currentFacePosition = new BABYLON.Vector2(0, 0);
        this.detectedFacePosition = new BABYLON.Vector2(0, 0);
        this.detectedFaceSize = new BABYLON.Vector2(0, 0);
        this.targetFacePosition = new BABYLON.Vector2(0, 0);
        this.isFaceDetectorEnabled = 0;
    }

    registerView(camera) {
        if (this.canvas) {
            this.view = this.mainScene.engine.registerView(this.canvas, camera);
        }
    }

    update(dt) {
        let posv = this.detectedFacePosition.subtract(this.currentFacePosition);
        let posl = posv.length();
        let velocity = dt * 0.4;
        let stepsCount = posl / velocity;
        if (posl > 0.01) {
            posv.normalize();
            let posStep = posl / stepsCount;
            posv.scaleInPlace(Math.min(posStep, posl));
            this.currentFacePosition.addInPlace(posv);
        }
    }

    createLogo(x, y) {
        let logoMaterial = new BasicAlphaMaterial(this.scene, "leaf");
        logoMaterial.setDiffuseMap(LogoTexture);

        let logoPlane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 550, height: 140, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        logoPlane.material = logoMaterial.getMaterial();
        logoPlane.position.x = 10;
        logoPlane.position.y = y;
        logoPlane.position.z = x;
        logoPlane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
        // logoPlane.rotate(BABYLON.Axis.X, BABYLON.Angle.FromDegrees(-10).radians(), BABYLON.Space.WORLD);
    }

    render() {
        this.scene.render();
    }

    getTheme() {
        return this.name;
    }

    onOptionSelected(optionName) {

    }

    onSceneActivated() {

    }

    onSceneDeactivated() {

    }

    setAsChild(node) {
        node.parent = this.parentNode;
    }

    createVideoTexture() {
        this.videoTexture = null;
        BABYLON.VideoTexture.CreateFromWebCam(this.scene, (videoTexture) => {
            this.videoTexture = videoTexture;
            this.onVideoTextureCreated();
        }, {maxWidth: 1080, maxHeight: 1920});
    }

    onVideoTextureCreated() {

    }

    createFaceDetectorMaterialParams(material) {
        material.setVector2Param('facePosition', this.currentFacePosition);
        material.setVector2Param('targetFacePosition', this.targetFacePosition);
        material.setIntegerParam('isFaceDetectorEnabled', this.isFaceDetectorEnabled);
    }

    onFaceDetected(detectionService) {
        if (detectionService.isDetected) {
            this.detectedFaceSize.x = detectionService.detectedWidth / 1080.0;
            this.detectedFaceSize.y = detectionService.detectedHeight / 1920.0;
            this.detectedFacePosition.x = (detectionService.detectedX / 1080.0) + (this.detectedFaceSize.x * 0.5);
            this.detectedFacePosition.y = (detectionService.detectedY / 1920.0) + (this.detectedFaceSize.y * 0.5);
            this.isFaceDetectorEnabled = detectionService.isDetectOn ? 1 : 0;
        }
    }
}