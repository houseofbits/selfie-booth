import * as BABYLON from 'babylonjs';

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

export default class DemoModeLeafItem {

    constructor(posX) {
        this.parentMesh = null;
        this.startPosY = 100;
        this.position = new BABYLON.Vector2(posX, this.startPosY);
        this.wavelenTop = 10.0;
        this.wavelenBottom = 6.0;
        this.speed = 20.0;
        this.angle = 0;
        this.rotationSpeed = 1.0;
        this.waveSeed = 0.0;
    }

    update(dt) {
        if (!this.parentMesh) {
            return;
        }

        this.angle = this.angle + this.rotationSpeed * dt;

        this.position.y = this.position.y - this.speed * dt;

        const adv = clamp((this.startPosY - this.position.y) / 150);

        let amplitude = (this.startPosY - this.position.y) / 15.0;

        const wavelen = lerp(this.wavelenTop, this.wavelenBottom, adv);

        let y = this.position.y / wavelen;

        let x = Math.sin(y + this.waveSeed);

        this.parentMesh.position.x = this.position.x + x * amplitude;
        this.parentMesh.position.y = this.position.y;
        this.parentMesh.rotation.z = this.angle;

        if (this.parentMesh.position.y < -100){
            this.position.y = this.startPosY;
        }
    }

    setMesh(mesh) {
        this.parentMesh = mesh;
        return this;
    }

    setSeed(seed) {
        this.waveSeed = seed;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setRotationSpeed(speed) {
        this.rotationSpeed = speed;
        return this;
    }
};