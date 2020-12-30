import BaseScene from "/js/app/scene/Scenes/BaseScene";
import * as BABYLON from 'babylonjs';
import BackdropTexture from '@images/static-bg.jpg';
import ImageEdgesMaskTexture from '@images/image-thumbnail-edges.jpg';
import BasicMaterial from "@app/scene/Scenes/Materials/BasicMaterial";
import DemoModeItem from "@app/scene/Structures/DemoModeItem";
import axios from "axios";
import ImageShadowMaterial from "@app/scene/Scenes/Materials/ImageShadowMaterial";
import ImageShadedMaterial from "@app/scene/Scenes/Materials/ImageShadedMaterial";
import DemoModeItemStructure from "@app/scene/Structures/DemoModeItemStructure";
import DemoScenePostProcess from '@shaders/demoScenePostProcess.frag';

export default class DemoScene extends BaseScene {
    constructor(mainScene, name) {
        super(mainScene, name);

        let camera = new BABYLON.ArcRotateCamera("Camera",
            1.562905159080936,
            1.8292730096422125,
            189.99967542243158,
            new BABYLON.Vector3(-0.11030575385577211, -8.87722000153747, -2.048547710987432),
            this.scene);
        //camera.attachControl(mainScene.canvas, true);

        this.itemColumns = [[], [], [], [], []];
        this.itemsForRemoval = [];
        this.lastInsertColumnIndex = 0;
        this.imageSyncData = [];

        this.config = {
            yBaseline: 60,
            itemMaxWidth: 16,
            itemAspect: 177 / 100,
            itemMaxAngle: 5,
            itemMarginX: 1,
            itemMarginY: 3,
            baselineMaxJitter: 20
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

    onSceneActivated() {
        this.syncItems();
    }

    //@clean up
    createScene() {
        this.scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        this.createPostProcessEffect();

        this.backdropMaterial = new BasicMaterial(this.scene, "ground");
        this.backdropMaterial.setDiffuseMap(BackdropTexture);

        this.itemShadowMaterial = new ImageShadowMaterial(this.scene, "itemShadow");
        this.itemShadowMaterial.setDiffuseMap(BackdropTexture);

        this.createGround();

        // window.onclick = function () {
        //     this.insertNewItem('d98bdc');
        // }.bind(this);
    }

    createGround() {
        let ground = BABYLON.MeshBuilder.CreatePlane("ground", {
            width: 100,
            height: 177,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        ground.material = this.backdropMaterial.getMaterial();
    }

    syncItems() {
        const data = JSON.stringify({data: this.imageSyncData});
        axios
            .post("/api/sync-images", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            if (response.status === 200) {
                this.imageSyncData = this.imageSyncData.concat(response.data);
                for (const image of response.data) {
                    this.insertNewItem(image);
                }
            }
        });
    }

    //Insert new image into one of columns and recalculate other item positions
    insertNewItem(imageId) {
        const columnIndex = this.getNewItemColumn();
        const itemStructure = this.createNewItem(columnIndex);
        const item = new DemoModeItem(imageId);
        item
            .setPosition(itemStructure.xInitial, itemStructure.yInitial)
            .setTargetPosition(itemStructure.xFinal, itemStructure.yFinal)
            .setSize(itemStructure.width, itemStructure.height)
            .setAngle(itemStructure.angle);
        this.itemColumns[columnIndex].unshift(item);
        this.createAsyncItemMaterial(item, (material) => {
            const mesh = this.createItemMesh(item);
            this.calculateColumnItemPositions(columnIndex);
            this.calculateColumnItemTransforms(columnIndex);
            mesh.material = material.getMaterial();
            mesh.setEnabled(true);
            item.setMesh(mesh);
            this.cleanUpItems();
        });
    }

    //Get column index for new item
    //@return column index with least number of items
    getNewItemColumn() {
        this.lastInsertColumnIndex = (this.lastInsertColumnIndex + Math.ceil(Math.random() * 2.0)) % 5;
        return this.lastInsertColumnIndex;
    }

    //Get position of new item
    createNewItem(columnIndex) {
        const leftStartPos = -(2 * this.config.itemMaxWidth + this.config.itemMaxWidth * 0.5 + this.config.itemMarginX * 2);
        const left = leftStartPos + columnIndex * this.config.itemMaxWidth + this.config.itemMaxWidth * 0.5 + columnIndex * this.config.itemMarginX;
        const baselineJitter = this.config.yBaseline + ((this.config.baselineMaxJitter * 0.5) - Math.random() * this.config.baselineMaxJitter);

        const item = new DemoModeItemStructure();
        item.xInitial = left;
        item.yInitial = 120.0;
        item.xFinal = left;
        item.yFinal = baselineJitter;

        const scale = 1.0 - Math.random() * 0.3;
        item.width = this.config.itemMaxWidth * scale;
        item.height = this.config.itemAspect * item.width;

        item.angle = this.config.itemMaxAngle - Math.random() * (this.config.itemMaxAngle * 2);

        return item;
    }

    //Re-calculate column item positions
    calculateColumnItemPositions(columnIndex) {
        if (this.itemColumns[columnIndex].length > 1) {
            let startY = this.itemColumns[columnIndex][0].targetPosition.y;
            let startHalfHeight = this.itemColumns[columnIndex][0].size.y * 0.5;
            for (let i = 1; i < this.itemColumns[columnIndex].length; i++) {
                const halfHeight = this.itemColumns[columnIndex][i].size.y * 0.5;
                const posY = startY - (halfHeight + startHalfHeight + this.config.itemMarginY);
                this.itemColumns[columnIndex][i].targetPosition.y = posY;
                startY = posY;
                startHalfHeight = halfHeight;

                if (Math.random() > 0.7) {
                    this.itemColumns[columnIndex][i].setFlip(Math.max(5.0, Math.random() * 20.0));
                }
            }
        }
    }

    calculateColumnItemTransforms(columnIndex) {
        if (this.itemColumns[columnIndex].length > 1) {
            for (let i = 1; i < this.itemColumns[columnIndex].length; i++) {
                this.itemColumns[columnIndex][i].setAngle(this.config.itemMaxAngle - Math.random() * (this.config.itemMaxAngle * 2));
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
        plane.locallyTranslate(new BABYLON.Vector3(0, 0, 10));
        // Initially disabled.
        // Enable after texture is loaded and mesh is ready to be rendered
        plane.setEnabled(false);
        this.createItemShadow(item, plane);
        return plane;
    }

    createItemShadow(item, parentMesh) {
        let shadowPlane = BABYLON.MeshBuilder.CreatePlane("shadow" + item.imageId, {
            width: item.size.x * 1.4, height: item.size.y * 1.2,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, this.scene);
        shadowPlane.parent = parentMesh;
        shadowPlane.isPickable = false;
        shadowPlane.locallyTranslate(new BABYLON.Vector3(0, 0, -0.1));
        shadowPlane.material = this.itemShadowMaterial.getMaterial();
        item.parentShadowMesh = shadowPlane;
        return shadowPlane;
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

    createPostProcessEffect() {
        BABYLON.Effect.ShadersStore["demoSceneBlurFragmentShader"] = DemoScenePostProcess;
        const postProcess = new BABYLON.PostProcess("My custom post process",
            "demoSceneBlur",
            ["screenSize", "radius"],
            null,
            1.0,
            this.scene.activeCamera);
        postProcess.onApply = function (effect) {
            effect.setFloat2("screenSize", postProcess.width, postProcess.height);
            effect.setFloat("radius", 1.0);
        };
    }

    cleanUpItems() {
        for (const column of this.itemColumns) {
            while (column.length > 10) {
                let item = column.pop();
                if (item.parentMesh) {
                    item.parentMesh.material.dispose();
                    item.parentMesh.dispose();
                    item.parentMesh = null;
                } else {
                    this.itemsForRemoval.push(item);
                }
            }
        }
        for (const removalItem of this.itemsForRemoval) {
            if (removalItem.parentMesh !== null) {
                if (removalItem.parentShadowMesh !== null) {
                    removalItem.parentShadowMesh.dispose();
                    removalItem.parentShadowMesh = null;
                }
                removalItem.parentMesh.material.dispose();
                removalItem.parentMesh.dispose();
                removalItem.parentMesh = null;
                removalItem.removed = true;
            }
        }
        this.itemsForRemoval = this.itemsForRemoval.filter(item => !item.removed);
    }
}