import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BasicCameraMaterial from "@app/scene/Materials/BasicCameraMaterial";
import getPhotoSceneParams from "@app/scene/Scenes/PhotoSceneParams";
import BasicAlphaMaterial from "../Materials/BasicAlphaMaterial";
import LogoTexture from "@images/LNDM175.jpg";

export default class PhotoScene extends BaseScene {
    /**
     * @param {SceneManager} sceneManager
     */
    constructor(sceneManager) {
        super(sceneManager);
        this.params = null;
        this.selectedParams = null;
    }

    init() {
        const camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2270, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.params = getPhotoSceneParams();
        this.loadTextures();
        this.createGeometry();
        this.createLogo();
        this.material = new BasicCameraMaterial(this.scene, 'MainMaterial');
        this.mainPlane.material = this.material.getMaterial();
        this.initMaterial();
        // this.createVideoTexture();
        // this.createVirtualCameraTexture('Virtual Webcam');
        this.deviceEnumerationProcess();
    }

    onVideoTextureCreated() {
        this.material.setVideoTexture(this.videoTexture);
        this.sceneManager.logLoadingMessage('Video texture created');
    }

    onOptionSelected(optionName) {
        if (this.selectedParams) {
            const optionParams = this.selectedParams.options[optionName];
            if (optionParams) {
                this.material.setDiffuseTexture(optionParams.texture);
                this.material.setFaceSize(optionParams.faceParams[2], optionParams.faceParams[3]);
                this.material.setFacePosition(optionParams.faceParams[0], optionParams.faceParams[1]);
            }
        }
    }

    selectTheme(themeName) {
        this.selectedParams = this.params[themeName];
        if (this.selectedParams) {
            this.material.setVector3Param('videoTint', new BABYLON.Vector3(this.selectedParams.tint[0], this.selectedParams.tint[1], this.selectedParams.tint[2]));
            this.material.setIntegerParam('effectId', this.selectedParams.effect);
            this.logoPlane.position.y = this.selectedParams.logoPosition[1];
            this.logoPlane.position.z = this.selectedParams.logoPosition[0];

            const firstOption = Object.keys(this.selectedParams.options)[0];
            if (firstOption) {
                this.onOptionSelected(firstOption);
            }
        }
    }

    createGeometry() {
        this.mainPlane = BABYLON.MeshBuilder.CreatePlane("backplane", {
            width: 1080,
            height: 1920,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        this.mainPlane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    createLogo() {
        let logoMaterial = new BasicAlphaMaterial(this.scene, "leaf");
        logoMaterial.setDiffuseMap(LogoTexture);

        this.logoPlane = BABYLON.MeshBuilder.CreatePlane("backplane", {
            width: 550,
            height: 140,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        this.logoPlane.material = logoMaterial.getMaterial();
        this.logoPlane.position.x = 10;
        this.logoPlane.position.y = 0;
        this.logoPlane.position.z = 0;
        this.logoPlane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    loadTextures() {
        for (const theme in this.params) {
            for (const option in this.params[theme].options) {
                this.params[theme].options[option].texture = new BABYLON.Texture(this.params[theme].options[option].texture, this.scene);
                this.sceneManager.logLoadingMessage('Loaded ' + theme + '.' + option + ' texture');
            }
        }
    }

    initMaterial() {
        const temporaryTexture = BABYLON.Texture.CreateFromBase64String(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            "1px-image",
            this.scene
        );
        this.material.setDiffuseTexture(temporaryTexture);
        this.material.setVideoTexture(temporaryTexture);
    }
}