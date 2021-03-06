import * as BABYLON from 'babylonjs';

export default class DemoModeItem {

    constructor(imageId) {
        this.imageId = imageId;
        this.parentMesh = null;
        this.parentShadowMesh = null;
        this.position = new BABYLON.Vector2(0, 0);
        this.size = new BABYLON.Vector2(0, 0);
        this.angle = 0;

        this.targetPosition = new BABYLON.Vector2(0, 0);

        this.flip = false;
        this.flipDirection = true;
        this.flipPos = 0.0;
        this.flipSpeed = 1.0;

        this.removed = false;
    }

    update2(dt) {
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
            posv.scaleInPlace(Math.min(posStep, posl));
            this.position.addInPlace(posv);
        }

        this.parentMesh.position.x = this.position.x;
        this.parentMesh.position.y = this.position.y;

        this.parentMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
        this.parentMesh.rotate(BABYLON.Axis.Z, this.angle);

        // if(this.flip) {
        //
        //     if(this.flipDirection) {
        //         this.flipPos += (dt * this.flipSpeed);
        //         if (this.flipPos > (Math.PI * 2)) {
        //             this.flipPos = 0;
        //             this.flip = false;
        //         }
        //     } else {
        //         this.flipPos -= (dt * this.flipSpeed);
        //         if (this.flipPos < -(Math.PI * 2)) {
        //             this.flipPos = 0;
        //             this.flip = false;
        //         }
        //     }
        //     this.parentMesh.rotate(BABYLON.Axis.Y, this.flipPos);
        // }
    }

    update(dt) {
        if (!this.parentMesh) {
            return;
        }

        let posv = this.targetPosition.subtract(this.position);
        let posl = posv.length();

        const y = this.position.y;  //Math.abs(this.position.y - this.targetPosition.y);

        const sin = Math.sin(y * 0.1);

        let velocity = dt * posl * 0.4;      //20.0;
        let stepsCount = posl / velocity;

        if(posl > 1.0){
            posv.normalize();
            let posStep = posl / stepsCount;
            posv.scaleInPlace(Math.min(posStep, posl));
            this.position.addInPlace(posv);
        }

        const unitVert = Math.min(Math.abs(Math.min(y, 0.0)), 200.0) / 200.0;

        this.parentMesh.position.x = this.position.x + (sin * (1.0 + (unitVert * 10)));
        this.parentMesh.position.y = this.position.y;

        this.parentMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
        this.parentMesh.rotate(BABYLON.Axis.Z, this.angle + (sin * 0.1));
    }

    setFlip(speed, direction) {
        this.flipSpeed = speed;
        this.flipPos = 0;
        this.flip = true;
        this.flipDirection = direction;
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