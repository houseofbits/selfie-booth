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

        this.setVector3Param('cameraTint', new BABYLON.Vector3(1.0, 1.0, 1.0));
    }

    setCameraTexture(texture) {
        this.shaderMaterial.setTexture("cameraMap", texture);
    }

    setDiffuseSecondaryTexture(texture) {
        this.shaderMaterial.setTexture("diffuseSecMap", texture);
    }

    setNormalsTexture(texture) {
        this.shaderMaterial.setTexture("normalsMap", texture);
    }
}