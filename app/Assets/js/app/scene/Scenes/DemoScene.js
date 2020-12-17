import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import TestTexture from '@images/test-image.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";
import axios from "axios";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI * 0.5, Math.PI * 0.5, 200, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(mainScene.canvas, true);

        this.images = [];
        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        //
        // this.amberMaterial = new BABYLON.StandardMaterial("mat", this.scene);
        // this.amberMaterial.diffuseColor = BABYLON.Color3.White();

        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        // let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        // light.intensity = 0.7;

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

        this.backdropMaterial = new BasicMaterial(this.scene, "ground");        //new BABYLON.StandardMaterial("bg", this.scene);
        this.backdropMaterial.setDiffuseMap(BackdropTexture);                   //diffuseTexture = new BABYLON.Texture(BackdropTexture, this.scene);

        this.planeMaterial = new BasicMaterial(this.scene, "pictureElement");   //new BABYLON.StandardMaterial("", this.scene);
        this.planeMaterial.setDiffuseMap(TestTexture);                          //.diffuseTexture = new BABYLON.Texture(TestTexture, this.scene);

        // this.planeMaterial.diffuseTexture.hasAlpha = true;
        // this.planeMaterial.backFaceCulling = false;


        // for (let i = 0; i < numImages; i++) {
        //     const angle = Math.random() * 360;
        //     const depth = depthMin + (Math.random() * depthRange);
        //     const vert = (verticalRange * 0.5) - (Math.random() * verticalRange);
        //     this.createPlane(i, angle, vert, depth);
        // }


        //this.createCircle();
        //this.createStructuredDome();

        this.createGround();
        this.calculateRandom2DPlacement();
    }

    calculateRandom2DPlacement()
    {
//        this.createElement(0, 0, 0, 100);

        //this.createElement2D(1, 0, 0, 0);

        let points = this.generateUniformDistribution(100, 177, 10,17, 50);
        //console.log(points);
        let i = 0;
        for(const o of points) {
            // const depth = depthMin + (Math.random() * depthRange);

            const angle = Math.random() * 360.;
            const scale = 1.0;

            this.createElement2D(i, o.x - 50, o.y - 89, angle, scale);

            i++;
        }

    }



    calculateAngle(depth, size)
    {
        return Math.acos((depth*depth + depth * depth - size * size) / (2. * depth * depth));
    }

    createStructuredDome()
    {

        const radius = 100;

//        const angleVerticalStep = (2. * Math.PI * radius);

        const amargin = this.calculateAngle(radius, 2.);
        const ay = this.calculateAngle(radius, 17.7);
        const ax = this.calculateAngle(radius, 10.);

        let aposy = 0;
        let aposx = 0;
        for(let i=0; i<10; i++) {
            aposy = 0;
            for(let i2=0; i2<10; i2++) {
                this.createElement(0, aposx, aposy, radius);

                aposy += ay + amargin;
            }
            aposx += ax + amargin;
        }

    }


    createCircle() {
        const numImages = 100;//Math.floor(Math.random() * 100);
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
            this.createPlane(i, x, (verticalRange * 0.5) - o.y, depth);
            i++;
        }
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

    createElement(i, angleX, angleY, depth) {
        //let plane = BABYLON.MeshBuilder.CreatePlane("plane_"+i, {width: 100, height: 177, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.getScene());
        let plane = BABYLON.MeshBuilder.CreateBox("box" + i, {
            width: 10, height: 17.7, depth: 1
        }, this.scene);
        plane.material = this.backdropMaterial.getMaterial();
        plane.locallyTranslate(new BABYLON.Vector3(0, 0, depth));
        plane.parent = new BABYLON.TransformNode("center_" + i);
        // plane.parent.rotate(BABYLON.Axis.X, BABYLON.Angle.FromDegrees(angleY).radians(), BABYLON.Space.WORLD);
        // plane.parent.rotate(BABYLON.Axis.Y, BABYLON.Angle.FromDegrees(angleX).radians(), BABYLON.Space.WORLD);
        plane.parent.rotate(BABYLON.Axis.X, angleY, BABYLON.Space.WORLD);
        plane.parent.rotate(BABYLON.Axis.Y, angleX, BABYLON.Space.WORLD);
        return plane;
    }

    createElement2D(i, posX, posY, angle) {
        let plane = BABYLON.MeshBuilder.CreateBox("box" + i, {
            width: 10, height: 17.7, depth: 1
        }, this.scene);
        plane.material = this.planeMaterial.getMaterial();
        plane.locallyTranslate(new BABYLON.Vector3(posX, posY, 0));
        plane.rotate(BABYLON.Axis.Z, BABYLON.Angle.FromDegrees(angle).radians(), BABYLON.Space.WORLD);
        return plane;
    }

    createGround() {
        let ground = BABYLON.MeshBuilder.CreatePlane("ground", {width: 100, height: 177, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        ground.material = this.backdropMaterial.getMaterial();
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