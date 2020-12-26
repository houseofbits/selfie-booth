import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import TestTexture from '@images/test-image.jpg';
import ImageEdgesMaskTexture from '@images/image-thumbnail-edges.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";
import DemoModeItem from "@app/scene/Structures/DemoModeItem";
import axios from "axios";
import ImageShadowMaterial from "@app/scene/Scenes/Materials/ImageShadowMaterial";
import ImageShadedMaterial from "@app/scene/Scenes/Materials/ImageShadedMaterial";
import DemoModeItemPosition from "@app/scene/Structures/DemoModeItemPosition";

export default class AmberThemeScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI * 0.5, Math.PI * 0.5, 200, new BABYLON.Vector3(0, 0, 0), this.scene);
        //camera.attachControl(mainScene.canvas, true);

        this.itemColumns = [[], [], [], [], []];
        this.config = {
            yBaseline: 60,
            itemMaxWidth: 10,
            itemMaxHeight: 18,
            itemMarginX: 5,
            itemMarginY: 3
        };

        this.createScene();
    }

    update(dt) {
        super.update(dt);

        for (const column of this.itemColumns) {
            for (const item of column) {
                item.update(dt);
            }
        }
    }

    //@clean up
    createScene() {
        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        // axios
        //     .get("/api/sync-images").then(response => {
        //     if (response.status === 200) {
        //         this.images = response.data;
        //         this.createRandom2DPlacement(this.images);
        //     }
        // });

        // const parameters = {
        //     edge_blur: 5.0,
        // };
        // const lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, this.scene, 1.0, this.scene.activeCamera);

        this.backdropMaterial = new BasicMaterial(this.scene, "ground");
        this.backdropMaterial.setDiffuseMap(BackdropTexture);

        this.planeMaterial = new BasicMaterial(this.scene, "pictureElement");
        this.planeMaterial.setDiffuseMap(TestTexture);

        this.itemShadowMaterial = new ImageShadowMaterial(this.scene, "itemShadow");
        this.itemShadowMaterial.setDiffuseMap(BackdropTexture);

        this.createGround();

        this.insertNewItem('d98bdc');
        this.insertNewItem('d98bdc');
        this.insertNewItem('d98bdc');

    }

    createGround() {
        let ground = BABYLON.MeshBuilder.CreatePlane("ground", {
            width: 100,
            height: 177,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        ground.material = this.backdropMaterial.getMaterial();
    }

    //Insert new image into one of columns and recalculate other item positions
    insertNewItem(imageId) {
        const columnIndex = this.getNewItemColumn();
        const newItemPosition = this.getNewItemPosition(columnIndex);
        const item = new DemoModeItem(imageId);
        item
            .setPosition(newItemPosition.initial.x, newItemPosition.initial.y)
            .setTargetPosition(newItemPosition.final.x, newItemPosition.final.y)
            .setSize(10, 18)
            .setAngle(0);
        this.itemColumns[columnIndex].push(item);

        this.createAsyncItemMaterial(item, (material) => {
            const mesh = this.createItemMesh(item);
            this.calculateColumnItemPositions(columnIndex);
            mesh.material = material.getMaterial();
            mesh.setEnabled(true);
            item.setMesh(mesh);
        });
    }

    //Get column index for new item
    //@return column index with least number of items
    getNewItemColumn() {
        let index = 0;
        let num = 1000;
        for (let i = 0; i < this.itemColumns.length; i++) {
            if (num > this.itemColumns[i].length) {
                num = this.itemColumns[i].length;
                index = i;
            }
        }
        return index;
    }

    //Get position of new item
    getNewItemPosition(columnIndex) {
        const leftStartPos = -(2 * this.config.itemMaxWidth + this.config.itemMaxWidth * 0.5 + this.config.itemMarginX * 2);
        const left = leftStartPos + columnIndex * this.config.itemMaxWidth + this.config.itemMaxWidth * 0.5 + columnIndex * this.config.itemMarginX;
        //const initialY = 120.0;   //TODO: Update when transitions are working
        return new DemoModeItemPosition(left, this.config.yBaseline, left, this.config.yBaseline);
    }

    //Re-calculate column item positions
    calculateColumnItemPositions(columnIndex) {
        if(this.itemColumns[columnIndex].length > 1) {
            const startY = this.itemColumns[columnIndex][0].targetPosition.y;
            const startHalfHeight = this.itemColumns[columnIndex][0].size.y * 0.5;
            for (let i = 1; i < this.itemColumns[columnIndex].length; i++) {
                //...
            }
        }
    }

    // Create scene models from DemoModeItem structure
    // @return Mesh instance
    createItemMesh(item) {

        let plane = BABYLON.MeshBuilder.CreatePlane("plane" + item.imageId, {
            width: item.size.x, height: item.size.y,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        plane.locallyTranslate(new BABYLON.Vector3(0, 0, 1));

        // Initially disabled.
        // Enable after texture is loaded and mesh is ready to be rendered
        plane.setEnabled(false);

        this.createItemShadow(item, plane);

        return plane;
    }

    createItemShadow(item, parentMesh) {
        let shadowPlane = BABYLON.MeshBuilder.CreatePlane("shadow" + item.imageId, {
            width: item.size.x * 1.5, height: item.size.y * 1.5,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);

        shadowPlane.parent = parentMesh;
        shadowPlane.isPickable = false;
        shadowPlane.locallyTranslate(new BABYLON.Vector3(0, 0, -0.1));
        shadowPlane.material = this.itemShadowMaterial.getMaterial();
    }

    //Create new item material
    createAsyncItemMaterial(item, onLoad) {
        const material = new ImageShadedMaterial(this.scene, 'mat_' + item.imageId);
        material.setMaskMap(ImageEdgesMaskTexture);

        const texture = new BABYLON.Texture('/api/image/' + item.imageId,
            this.scene,
            false,
            true,
            BABYLON.Texture.NEAREST_SAMPLINGMODE,
            () => onLoad(material)
        );

        material.shaderMaterial.setTexture("diffuseMap", texture);
        return material;
    }
}