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

    setVideoTexture(texture) {
        this.shaderMaterial.setTexture("videoMap", texture);
    }

    setMaskMap(map) {
        this.shaderMaterial.setTexture("maskMap", new BABYLON.Texture(map, this.scene));
    }

    setDiffuseSecondaryMap(map) {
        this.shaderMaterial.setTexture("diffuseSecMap", new BABYLON.Texture(map, this.scene));
    }

    setFacePosition(x, y) {
        this.setVector2Param('facePosition', new BABYLON.Vector2(x / 1080.0, y / 1920.0));
    }

    setFaceSize(width, height) {
        this.setVector2Param('faceSize', new BABYLON.Vector2(width / 1080.0, height / 1920.0));
    }
}