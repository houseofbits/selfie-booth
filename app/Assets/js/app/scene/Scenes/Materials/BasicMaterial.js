import * as BABYLON from 'babylonjs';
import CustomMaterial from './CustomMaterial.js';
import BasicVertexShader from '@shaders/basic.vertex.fx';
import BasicFragmentShader from '@shaders/basic.fragment.fx';

export default
class BasicMaterial extends CustomMaterial {
    constructor(scene, name) {
        super(scene, name);

        this.loadShaderData(name, BasicVertexShader, BasicFragmentShader);

        this.shaderMaterial = new BABYLON.ShaderMaterial(this.name + this.getShaderName(), this.scene,
            { vertex: this.getShaderName(),fragment: this.getShaderName() },
            {
                needAlphaBlending: true,
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        this.setCameraPosition(this.scene.activeCamera.position);
//        this.setColor(new BABYLON.Vector3(0,0,0.5));
    }
}