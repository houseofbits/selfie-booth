import * as BABYLON from 'babylonjs';

export default class DemoModeItem {
    constructor(imageId, parentMesh, posx, posy, angle) {
        this.imageId = imageId;
        this.parentMesh = parentMesh;
        this.position = new BABYLON.Vector2(posx, posy);
        this.angle = angle;
        this.velocity = new BABYLON.Vector2(0, 0);
        this.angularVelocity = 0;
        this.grabPosition = null;
    }

    update(dt) {

        this.position.addInPlace(this.velocity);
        this.angle = this.angle + this.angularVelocity;

        this.parentMesh.position.x = this.position.x;
        this.parentMesh.position.y = this.position.y;

        this.parentMesh.rotation.z = this.angle;

        this.angularVelocity = this.angularVelocity * dt;
        this.velocity.scaleInPlace(dt);
    }

    setGrabPosition(worldPosition) {
        this.grabPosition = this.toLocalSpace(worldPosition);
    }

    dragGrabbed(worldDirection) {

        this.position.x = this.parentMesh.position.x;
        this.position.y = this.parentMesh.position.y;

        const worldGrabPos = this.toWorldSpace(this.grabPosition);
        const shoulder = this.position.subtract(worldGrabPos);

        const dc = Math.min(shoulder.length(), 10.0) / 10.0;

        const FN = worldDirection.clone();
        FN.normalize();

        const shoulderN = shoulder.clone();
        shoulderN.normalize();

        const dot = BABYLON.Vector2.Dot(shoulderN, FN);

        const pdot = this.perpDotProduct(shoulderN, FN);

        worldDirection.scaleInPlace(Math.abs(dot));

        this.angularVelocity += pdot * 0.05 * dc;
        this.velocity.addInPlace(worldDirection);

    }

    perpDotProduct(v1, v2) {
        return v1.y * v2.x - v1.x * v2.y;
    }

    toLocalSpace(worldPosition) {
        const m = this.parentMesh.getWorldMatrix().clone();
        m.invert();
        return BABYLON.Vector2.Transform(worldPosition, m);
    }

    toLocalSpaceRotation(worldVector) {
        const m = this.parentMesh.getWorldMatrix().clone();
        return BABYLON.Vector2.Transform(worldVector, m.invert().getRotationMatrix());
    }

    toWorldSpace(localVector) {
        return BABYLON.Vector2.Transform(localVector, this.parentMesh.getWorldMatrix());
    }
};