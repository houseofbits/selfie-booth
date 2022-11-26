export default class DemoModeItemStructure {
    constructor() {
        this.xInitial = 0;
        this.yInitial = 0;
        this.xFinal = 0;
        this.yFinal = 0;
        this.width = 0;
        this.height = 0;
        this.angle = 0;
    }

    setInitialPosition(x, y) {
        this.xInitial = x;
        this.yInitial = y;
        return this;
    }

    setFinalPosition(x, y) {
        this.xFinal = x;
        this.yFinal = y;
        return this;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }


};