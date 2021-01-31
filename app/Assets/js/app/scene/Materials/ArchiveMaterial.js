import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import BasicVertexShader from '@shaders/basic.vert';
import ArchiveFragmentShader from '@shaders/archive.frag';

export default class ArchiveMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, BasicVertexShader, ArchiveFragmentShader);

        this.createDefaultShader();

        this.setCameraPosition(this.scene.activeCamera.position);
    }

    setCameraTexture(texture) {
        this.shaderMaterial.setTexture("cameraMap", texture);
    }

    setMaskMap(map) {
        this.shaderMaterial.setTexture("maskMap", new BABYLON.Texture(map, this.scene));
    }

    setDiffuseSecondaryMap(map) {
        this.shaderMaterial.setTexture("diffuseSecMap", new BABYLON.Texture(map, this.scene));
    }

    setNormalsMap(map) {
        this.shaderMaterial.setTexture("normalsMap", new BABYLON.Texture(map, this.scene));
    }
}