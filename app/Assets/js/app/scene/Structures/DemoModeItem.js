import * as BABYLON from 'babylonjs';

export default class DemoModeItem {

    constructor(imageId) {
        this.imageId = imageId;
        this.parentMesh = null;
        this.position = new BABYLON.Vector2(0, 0);
        this.size = new BABYLON.Vector2(0, 0);
        this.angle = 0;

        this.targetPosition = new BABYLON.Vector2(0, 0);
    }

    update(dt) {
        if (!this.parentMesh) {
            return;
        }

        let posv = this.targetPosition.subtract(this.position);
        let posl = posv.length();

        let velocity = dt * 100.0;
        let stepsCount = posl / velocity;

        if(posl > 1.0){
            posv.normalize();
            let posStep = posl / stepsCount;
            posv.scaleInPlace(posStep);
            this.position.addInPlace(posv);
        }

        this.parentMesh.position.x = this.position.x;
        this.parentMesh.position.y = this.position.y;
        this.parentMesh.rotation.z = this.angle;
    }

    setMesh(mesh) {
        this.parentMesh = mesh;
        return this;
    }

    setSize(width, height) {
        this.size.x = width;
        this.size.y = height;
        return this;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    setTargetPosition(x, y) {
        this.targetPosition.x = x;
        this.targetPosition.y = y;
        return this;
    }

    setAngle(angle) {
        this.angle = BABYLON.Angle.FromDegrees(angle).radians();
        return this;
    }
};