import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import ImageShadowVertexShader from '@shaders/imageShadow.vert';
import ImageShadowFragmentShader from '@shaders/imageShadow.frag';

export default
class ImageShadowMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, ImageShadowVertexShader, ImageShadowFragmentShader);

        this.createDefaultShader(true);

        this.setCameraPosition(this.scene.activeCamera.position);
    }
}