import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import TestTexture from '@images/test-image.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";
import axios from "axios";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        let camera = new BABYLON.ArcRotateCamera("Camera", 0, BABYLON.Angle.FromDegrees(90).radians(), 1000, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(mainScene.canvas, true);

        this.images = [];
        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {

        this.amberMaterial = new BABYLON.StandardMaterial("mat", this.scene);
        this.amberMaterial.diffuseColor = BABYLON.Color3.White();

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

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

        this.backdropMaterial = new BasicMaterial(this.scene, 'demoBackdrop');
        this.backdropMaterial.setDiffuseMap(TestTexture);
        this.backdropMaterial.backFaceCulling = false;

        this.planeMaterial = new BABYLON.StandardMaterial("", this.scene);
        this.planeMaterial.diffuseTexture = new BABYLON.Texture(TestTexture, this.scene);
        this.planeMaterial.diffuseTexture.hasAlpha = true;
        this.planeMaterial.backFaceCulling = false;

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


        let center = new BABYLON.TransformNode("center");
        this.setAsChild(center);

        const numImages = Math.floor(Math.random() * 100);
        const depthMin = 500;
        let depthRange = 200;
        let verticalRange = 1000;

        const perimeter = 2 * Math.PI * depthMin;
        let points = this.generateUniformDistribution(perimeter, verticalRange, 100,177, 100);
        //console.log(points);
        let i = 0;
        for(const o of points) {
            let x = (o.x * 360.) / perimeter;
            const depth = depthMin + (Math.random() * depthRange);
            this.createPlane(i, x, (verticalRange * 0.5) - o.y, depthMin);
            i++;
        }

        // for (let i = 0; i < numImages; i++) {
        //     const angle = Math.random() * 360;
        //     const depth = depthMin + (Math.random() * depthRange);
        //     const vert = (verticalRange * 0.5) - (Math.random() * verticalRange);
        //     this.createPlane(i, angle, vert, depth);
        // }


        // let result = this.generateUniformDistribution(360, 500, 100,177, 10);
        //
        // console.log(result);
    }

    createPlane(i, angle, posY, posZ) {
        //let plane = BABYLON.MeshBuilder.CreatePlane("plane_"+i, {width: 100, height: 177, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.getScene());
        let plane = BABYLON.MeshBuilder.CreateBox("box" + i, {
            width: 100, height: 177, depth: 10
        }, this.scene);
        plane.material = this.backdropMaterial.getMaterial();
        plane.locallyTranslate(new BABYLON.Vector3(0, posY, posZ));
        plane.parent = new BABYLON.TransformNode("center_" + i);
        plane.parent.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(angle).radians(), BABYLON.Space.WORLD);
        return plane;
    }

    generateUniformDistribution(width, height, minx, miny, count) {
        //console.log(width);
        let points = [];

        while (points.length < count) {
            let x = Math.random() * width;
            let y = Math.random() * height;

            //console.log({x,y});

            let ok = true;
            for(const o of points) {
                let xd = Math.abs(o.x - x);
                let yd = Math.abs(o.y - y);
                if(xd < minx && yd < miny) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
               points.push({x,y});
            }
        }

        return points;
    }
}