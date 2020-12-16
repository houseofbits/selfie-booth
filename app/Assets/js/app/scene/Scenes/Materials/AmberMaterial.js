import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import BasicVertexShader from '@shaders/basic.vertex.fx';
import BasicFragmentShader from '@shaders/basic.fragment.fx';

export default class AmberMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, BasicVertexShader, BasicFragmentShader);

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