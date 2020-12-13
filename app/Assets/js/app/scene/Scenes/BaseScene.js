import ThemeStructure from "/js/app/scene/Structures/ThemeStructure";

export default class BaseScene {
    constructor(mainScene, name) {
        this.name = name;
        this.theme = new ThemeStructure();
        this.theme.scene = this;
        this.mainScene = mainScene;
        this.parentNode = new BABYLON.TransformNode(this.name + "Parent");
    }

    update(dt) {
    }

    getTheme() {
        return this.theme;
    }

    getScene() {
        return this.mainScene.scene;
    }

    setEnabled(enabled) {
        this.parentNode.setEnabled(enabled);
    }

    setAsChild(node) {
        node.parent = this.parentNode;
    }

    setVideoTexture(texture) {

    }
}