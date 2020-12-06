export default class BackgroundFragmentState {
    constructor(x, y, angle, scale) {
        this.x = x.toFixed(2);
        this.y = y.toFixed(2);
        this.angle = angle.toFixed(2);
        this.scale = scale.toFixed(2);
    }
}