import EffectStructure from "/js/app/scene/Structures/EffectStructure";

export default class ThemeStructure {
    constructor() {
        this.scene = null;
        this.name = "";
        this.image = null;
        this.effects = [];
    }
    setImage(path){
        this.image = new Image();
        this.image.src = path;
    }
    addEffect(id, name, imagePath) {
        let effect = new EffectStructure();
        effect.name = name;
        effect.setImage(imagePath);
        effect.id = id;
        this.effects[id] = effect;
    }
}