import EffectStructure from "/js/app/scene/Structures/EffectStructure";

export default class ThemeStructure {
    constructor() {
        this.scene = null;
        this.name = "";
        this.imagePath = "";
        this.effects = [];
    }
    addEffect(id, name, image) {
        let effect = new EffectStructure();
        effect.name = name;
        effect.imagePath = image;
        effect.id = id;
        this.effects[id] = effect;
    }
}