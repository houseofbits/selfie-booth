import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import VertexShader from '@shaders/detector.vert';
import FragmentShader from '@shaders/detector.frag';

export default
class DetectorMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, VertexShader, FragmentShader);

        this.createDefaultShader();

        this.setCameraPosition(this.scene.activeCamera.position);
    }
}