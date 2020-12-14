import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import TestTexture from '@images/test-image.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";
import axios from "axios";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);
        this.theme.name = "Amber theme";

        this.amberMaterial = new BABYLON.StandardMaterial("mat", mainScene.scene);
        this.amberMaterial.diffuseColor = BABYLON.Color3.White();

        this.images = [];

        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {

        axios
            .get("/api/sync-images").then(response => {
            if (response.status === 200) {
                this.images = response.data;
            }
        });

        ///api/image/

        // const parameters = {
        //     edge_blur: 5.0,
        // };
        // const lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, this.getScene(), 1.0, this.getScene().activeCamera);


        this.backdropMaterial = new BasicMaterial(this.getScene(), 'demoBackdrop');
        this.backdropMaterial.setDiffuseMap(TestTexture);
        this.backdropMaterial.backFaceCulling = false;

        // this.backdrop = BABYLON.MeshBuilder.CreatePlane("plane", {width: 5, height:5}, this.getScene());
        // this.backdrop.material = this.backdropMaterial.getMaterial();
        // this.backdrop.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        // this.backdrop.scaling.y = 1.0 / (1080 / 1920);
        // this.setAsChild(this.backdrop);

        // let layer = new BABYLON.Layer('','https://i.imgur.com/mBBxGJH.jpg', this.getScene(), true);
        // layer.enabled = false;

        // let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4, segments: 32}, this.getScene());
        // sphere.position.y = 1;

        // let box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 1}, this.getScene());
        // box.position.x = 2;
        // box.position.y = 1.5;

        //let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.getScene());
       // ground.material = this.background1Material.getMaterial();

        //sphere.material = this.amberMaterial;

       // this.setAsChild(ground);

        const radius = 100;

        let center = new BABYLON.TransformNode("center");
        this.setAsChild(center);

        const numImages = 100;//Math.floor(Math.random() * 100);
        const depthMin = 300;
        let depthRange = 200;
        let verticalRange = 500;

        for (let i=0; i<numImages; i++) {
            const angle = Math.random() * 360;
            const depth = depthMin + (Math.random() * depthRange);
            const vert = (verticalRange * 0.5) - (Math.random() * verticalRange);
            this.createPlane(i, angle, vert, depth);
        }
    }

    createPlane(i, angle, posY, posZ) {
        let plane = BABYLON.MeshBuilder.CreatePlane("plane_"+i, {width: 100, height: 177, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.getScene());
        plane.material = this.backdropMaterial.getMaterial();
        plane.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(90).radians(), BABYLON.Space.WORLD);
        plane.locallyTranslate(new BABYLON.Vector3(0, posY, posZ));
        plane.parent = new BABYLON.TransformNode("center_" + i);
        plane.parent.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(angle).radians(), BABYLON.Space.WORLD);
    }
}