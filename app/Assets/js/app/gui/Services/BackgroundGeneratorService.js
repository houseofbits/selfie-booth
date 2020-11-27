import * as BABYLON from 'babylonjs';
import BackgroundFragmentState from '../Structures/BackgroundFragmentState.js';

export default class BackgroundGeneratorService {
    constructor() {
        this.fragments = [];
        this.width = 1000;
        this.height = 450;
    }

    generate() {

        const dist = this.generateUniformDistribution(20, 100);

        this.fragments = [];
        const centerx = 540;
        const centery = 1000;
        const w1 = 300;
        const w2 = 500;
        const w3 = 750;
        const w4 = 1000;

        const center = new BABYLON.Vector2(540, 1100);

        const h = 600;
        const count = 30;
        for (const v of dist) {
            let obj = [];

            let scale = 1.1 - Math.random() * 0.2;
            let angle = 180 - Math.random() * 360;
            let angleAdv = 0;

            obj.push(new BackgroundFragmentState(
                (-(center.x - v.x) * 0.1) + center.x,
                (this.height / 2) + (v.y * 0.1) + center.y,
                angle,
                scale
            ));

            angleAdv = 20 - Math.random() * 40;
            angle = angle + angleAdv;

            obj.push(new BackgroundFragmentState(
                (-(center.x - v.x) * 0.3) + center.x,
                v.y + center.y,
                angle,
                scale
            ));

            angleAdv = 30 - Math.random() * 60;
            angle = angle + angleAdv;

            obj.push(new BackgroundFragmentState(
                (-(center.x - v.x) * 0.5) + center.x,
                v.y + center.y,
                angle,
                scale
            ));

            angleAdv = 40 - Math.random() * 80;
            angle = angle + angleAdv;

            obj.push(new BackgroundFragmentState(
                (-(center.x - v.x) * 0.7) + center.x,
                v.y + center.y,
                angle,
                scale
            ));

            angleAdv = 20 - Math.random() * 40;
            angle = angle + angleAdv;

            obj.push(new BackgroundFragmentState(
                v.x,
                v.y + center.y,
                angle,
                scale
            ));


            this.fragments.push(obj);
        }
    }

    generateUniformDistribution(count, treshold) {
        let uniform = [];
        while (uniform.length < count) {
            let p = new BABYLON.Vector2(0, 0);
            p.x = 40 + Math.random() * this.width;
            p.y = Math.random() * this.height;
            let skip = false;
            for (const item of uniform) {

                let vl = item.subtract(p);
                if (vl.length() < treshold) {
                    skip = true;
                    break;
                }
            }
            if (!skip) {
                uniform.push(p);
            }
        }
        return uniform;
    }
}