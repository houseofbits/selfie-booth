import * as BABYLON from 'babylonjs';

export default 
class MainView {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = BABYLON.Color3.Blue();

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), this.scene);

        camera.setTarget(new BABYLON.Vector3(0, 1, 0));

        camera.attachControl(this.canvas, true);
        
        var plane = BABYLON.Mesh.CreatePlane("sphere1", 7, this.scene);
        plane.rotation.z = Math.PI;

        plane.position.y = 1;
        
        var mat = new BABYLON.StandardMaterial("mat", this.scene);
        mat.diffuseColor = BABYLON.Color3.White();

        BABYLON.VideoTexture.CreateFromWebCam(this.scene, function(videoTexture) {
            mat.emissiveTexture = videoTexture;
            plane.material = mat;
        }, { maxWidth: 256, maxHeight: 256 });

        let self = this;
        this.engine.runRenderLoop(function(){
            self.renderLoop();
        });    

    }

    renderLoop(){
        
        this.scene.render();
    }

}

