import * as BABYLON from 'babylonjs';

export default class MainScene {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = BABYLON.Color3.Blue();

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), this.scene);

        camera.setTarget(new BABYLON.Vector3(0, 1, 0));

        camera.attachControl(this.canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, this.scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape.
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, this.scene);

        // var plane = BABYLON.Mesh.CreatePlane("sphere1", 7, this.scene);
        // plane.rotation.z = Math.PI;
        //
        // plane.position.y = 1;
        //
        // var mat = new BABYLON.StandardMaterial("mat", this.scene);
        // mat.diffuseColor = BABYLON.Color3.White();
        //
        // BABYLON.VideoTexture.CreateFromWebCam(this.scene, function (videoTexture) {
        //     mat.emissiveTexture = videoTexture;
        //     plane.material = mat;
        // }, {maxWidth: 256, maxHeight: 256});

        let self = this;
        this.engine.runRenderLoop(function () {
            self.renderLoop();
        });

    }

    renderLoop() {

        this.scene.render();
    }

    captureScreenshot() {
        this.scene.render();
        return BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(this.engine, this.scene.activeCamera, 400);
    }
    onModeSelected(state) {
        //Callback from gui state change
    }
}

