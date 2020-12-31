import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
// import VertexShader from '@shaders/imageShaded.vert';
// import FragmentShader from '@shaders/imageShaded.frag';
import VertexShader from '@shaders/imageItem.vert';
import FragmentShader from '@shaders/imageItem.frag';

export default
class ImageShadedMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, VertexShader, FragmentShader);

        this.createDefaultShader(true);

        this.setCameraPosition(this.scene.activeCamera.position);
    }

    setMaskMap(map){
        this.shaderMaterial.setTexture("maskMap", new BABYLON.Texture(map, this.scene));
    }
}