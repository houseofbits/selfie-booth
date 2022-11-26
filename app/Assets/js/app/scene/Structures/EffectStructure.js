
export default class EffectStructure {
    constructor() {
        this.id = 0;
        this.name = "";
        this.image = null;
    }
    setImage(path){
        this.image = new Image();
        this.image.src = path;
    }
}