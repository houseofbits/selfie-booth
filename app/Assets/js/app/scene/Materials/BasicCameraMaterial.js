import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import BasicVertexShader from '@shaders/basic.vert';
import BasicCameraFragmentShader from '@shaders/basicCamera.frag';

export default class BasicCameraMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, BasicVertexShader, BasicCameraFragmentShader);

        this.createDefaultShader();

        this.setCameraPosition(this.scene.activeCamera.position);

        this.setVector3Param('cameraTint', new BABYLON.Vector3(1.0, 1.0, 1.0));
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
}