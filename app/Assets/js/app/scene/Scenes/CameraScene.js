import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import DetectorMaterial from "@app/scene/Materials/DetectorMaterial";

export default class CameraScene extends BaseScene {
    /**
     * @param {SceneManager} sceneManager
     */
    constructor(sceneManager) {
        super(sceneManager);
    }

    init(canvas) {
        this.scene.clearColor = new BABYLON.Color3(1, 0, 1);
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.registerView(camera, canvas);

        this.material = new DetectorMaterial(this.scene, this.name + 'DetectorMaterial');
        this.plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        this.plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);

        const temporaryTexture = BABYLON.Texture.CreateFromBase64String(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "1px-image",
            this.scene
        );
        this.material.setDiffuseTexture(temporaryTexture);

        this.plane.material = this.material.getMaterial();

        this.createVideoTexture();
    }

    update(dt) {

    }

    onVideoTextureCreated() {
        this.material.setDiffuseTexture(this.videoTexture);
        this.plane.material = this.material.getMaterial();
    }
}