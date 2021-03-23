import BaseScene from "@app/scene/BaseScene";
import * as BABYLON from 'babylonjs';
import BgMap from '@images/amber/background.png';
import AmberTexture1 from '@images/amber/amber1-diffuse.png';
import NormalsTexture1 from '@images/amber/amber1-normal.png';
import AmberTexture2 from '@images/amber/amber2-diffuse.png';
import NormalsTexture2 from '@images/amber/amber2-normal.png';
import AmberTexture3 from '@images/amber/amber3-diffuse.png';
import NormalsTexture3 from '@images/amber/amber3-normal.png';
import AmberTexture4 from '@images/amber/amber4-diffuse.png';
import NormalsTexture4 from '@images/amber/amber4-normal.png';
import AmberMaterial from "@app/scene/Materials/AmberMaterial";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name, targetCanvas) {
        super(mainScene, name, targetCanvas);

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 2000, new BABYLON.Vector3(0, 0, 0), this.scene);

        this.registerView(camera);

        this.createScene();

        this.createVideoTexture();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {

        this.amber1Texture = new BABYLON.Texture(AmberTexture1, this.scene);
        this.amber2Texture = new BABYLON.Texture(AmberTexture2, this.scene);
        this.amber3Texture = new BABYLON.Texture(AmberTexture3, this.scene);
        this.amber4Texture = new BABYLON.Texture(AmberTexture4, this.scene);

        this.normal1Texture = new BABYLON.Texture(NormalsTexture1, this.scene);
        this.normal2Texture = new BABYLON.Texture(NormalsTexture2, this.scene);
        this.normal3Texture = new BABYLON.Texture(NormalsTexture3, this.scene);
        this.normal4Texture = new BABYLON.Texture(NormalsTexture4, this.scene);

        this.amberMaterial = new AmberMaterial(this.scene, this.name + 'MainMaterial');
        this.amberMaterial.setCameraTexture(new BABYLON.Texture(BgMap, this.scene));
        this.amberMaterial.setDiffuseMap(BgMap);

        this.amberMaterial.setDiffuseSecondaryTexture(this.amber1Texture);
        this.amberMaterial.setNormalsTexture(this.normal1Texture);

        this.plane = BABYLON.MeshBuilder.CreatePlane("backplane", {width: 1000, height: 1770, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        this.plane.material = this.amberMaterial.getMaterial();
        this.plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
    }

    onVideoTextureCreated() {
        this.amberMaterial.setCameraTexture(this.videoTexture);
    }

    onSceneActivated() {
        this.onOptionSelected('amber1');
    }

    onOptionSelected(optionName) {
        switch (optionName) {
            case 'amber1':
                this.amberMaterial.setDiffuseSecondaryTexture(this.amber1Texture);
                this.amberMaterial.setNormalsTexture(this.normal1Texture);
                break;
            case 'amber2':
                this.amberMaterial.setDiffuseSecondaryTexture(this.amber2Texture);
                this.amberMaterial.setNormalsTexture(this.normal2Texture);
                break;
            case 'amber3':
                this.amberMaterial.setDiffuseSecondaryTexture(this.amber3Texture);
                this.amberMaterial.setNormalsTexture(this.normal3Texture);
                break;
            case 'amber4':
                this.amberMaterial.setDiffuseSecondaryTexture(this.amber4Texture);
                this.amberMaterial.setNormalsTexture(this.normal4Texture);
                break;
        }
    }
}