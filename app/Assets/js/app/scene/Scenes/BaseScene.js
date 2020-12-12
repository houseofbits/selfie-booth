import ThemeStructure from "/js/app/scene/Structures/ThemeStructure";

export default class BaseScene {
    constructor(mainScene) {
        this.theme = new ThemeStructure();
        this.theme.scene = this;
        this.mainScene = mainScene;
    }

    update(dt) {
    }

    getTheme() {
        return this.theme;
    }

    getScene() {
        return this.mainScene.scene;
    }

    setVisible(visible) {

    }

    setVideoTexture(texture) {

    }
}