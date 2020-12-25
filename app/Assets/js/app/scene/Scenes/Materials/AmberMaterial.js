import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import AmberVertexShader from '@shaders/amber.vert';
import AmberFragmentShader from '@shaders/amber.frag';

export default class AmberMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, AmberVertexShader, AmberFragmentShader);

        this.createDefaultShader();

        this.setCameraPosition(this.scene.activeCamera.position);
    }

    setCameraTexture(texture) {
        this.shaderMaterial.setTexture("cameraMap", texture);
    }

    setMaskMap(map) {
        this.shaderMaterial.setTexture("maskMap", new BABYLON.Texture(map, this.scene));
    }
}