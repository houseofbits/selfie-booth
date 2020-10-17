import * as BABYLON from 'babylonjs';

export default class MainScene {
    constructor(canvas) {

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color3(0.3,0.3,0.4);

        //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), this.scene);
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 45, 10, new BABYLON.Vector3(0, 0, 0), this.scene);

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


        var box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, height: 3, depth:1}, this.scene);
        box.position.x = 2;
        box.position.y = 1.5;

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
        this.scene.activeCamera.alpha += 0.002;
        this.scene.render();
    }

    captureScreenshot() {
        this.scene.render();
        return BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(this.engine, this.scene.activeCamera, {
            width:1080,
            height:1920,
            precision:1.0
        });
    }
    onModeSelected(state) {
        //Callback from gui state change
    }
}

