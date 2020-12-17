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
        //camera.attachControl(mainScene.canvas, true);

        this.images = [];
        this.createScene();
    }

    update(dt) {
        super.update(dt);
    }

    createScene() {
        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        axios
            .get("/api/sync-images").then(response => {
            if (response.status === 200) {
                this.images = response.data;
                this.createRandom2DPlacement(this.images);
            }
        });

        const parameters = {
            edge_blur: 5.0,
        };
        const lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, this.scene, 1.0, this.scene.activeCamera);

        this.backdropMaterial = new BasicMaterial(this.scene, "ground");
        this.backdropMaterial.setDiffuseMap(BackdropTexture);

        this.planeMaterial = new BasicMaterial(this.scene, "pictureElement");
        this.planeMaterial.setDiffuseMap(TestTexture);

        this.createGround();
    }

    randBM() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
        return num;
    }

    createRandom2DPlacement(images)
    {
        let objects = [];
        const rangeX = 200;
        const rangeY = 300;
        const count = images.length;
        while(objects.length < count){
            const x = this.randBM() * rangeX;
            const y = this.randBM() * rangeY;
            const angle = 30 - (Math.random() * 60.);
            const scale = 1.2 + (Math.random() * 0.4);
            const z = Math.random() * 5.;
            let place = true;
            for(const o of objects) {
                let v = new BABYLON.Vector2(o.x - x, o.y - y);
                if(v.length() < 10){
                    place = false;
                }
            }
            if(place) {
                objects.push({
                    x: x,
                    y: y,
                    z: z,
                    a: angle,
                    s: scale,
                    imageId: images.pop(),
                });
            }
        }

        for(const o of objects) {
            const element = this.createElement2D("", o.x - (rangeX * 0.5), o.y - (rangeY * 0.5), o.z, o.a, o.s);
            element.material = this.createMaterial(o.imageId).getMaterial();
        }
        return objects;
    }

    createMaterial(imageId) {
        const material = new BasicMaterial(this.scene, 'mat_'+imageId);
        material.setDiffuseMap('/api/image/' + imageId);
        return material;
    }

    createElement2D(i, posX, posY, posZ, angle, scale) {
        let plane = BABYLON.MeshBuilder.CreateBox("box" + i, {
            width: 10 * scale, height: 17.7 * scale, depth: 1
        }, this.scene);
        plane.material = this.planeMaterial.getMaterial();
        plane.locallyTranslate(new BABYLON.Vector3(posX, posY, posZ));
        plane.rotate(BABYLON.Axis.Z, BABYLON.Angle.FromDegrees(angle).radians(), BABYLON.Space.WORLD);
        return plane;
    }

    createGround() {
        let ground = BABYLON.MeshBuilder.CreatePlane("ground", {width: 100, height: 177, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);
        ground.material = this.backdropMaterial.getMaterial();
    }
}