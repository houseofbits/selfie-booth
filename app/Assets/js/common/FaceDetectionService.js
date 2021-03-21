import * as faceapi from '@vladmandic/face-api';

class FaceDetectionService {

    constructor() {
        this.videoWidth = 0;
        this.videoHeight = 0;
        this.detectorNet = null;
        this.sourceCanvas = null;
        this.detectedWidth = 0;
        this.detectedHeight = 0;
        this.detectedX = 0;
        this.detectedY = 0;
        this.isDetected = false;
        this.detectionCallbackArray = [];
    }

    async onWindowLoaded() {

        this.sourceCanvas = document.getElementById('captureCanvas');

        await faceapi.tf.enableProdMode();
        await faceapi.tf.ENV.set('DEBUG', false);
        await faceapi.tf.ready();

        await this.initFaceAPI();

        this.detect().then(() => {});
    }

    async initFaceAPI() {

        await faceapi.nets.ssdMobilenetv1.load('/assets/models/');

        this.detectorNet = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.2});

        console.log('FaceAPI version');
        console.log(faceapi.version.faceapi);

        console.log('TensorFlow/JS');
        console.log(faceapi.tf.version_core);

        console.log('Models loaded:');
        console.log(faceapi.tf.engine().state.numTensors);

    }

    async detect() {
        if (!this.sourceCanvas) {
            return false;
        }

        faceapi
            .detectSingleFace(this.sourceCanvas, this.detectorNet)
            .then((result) => {

                if (result) {
                    this.detectedWidth = (this.detectedWidth * 0.8) + (result.box.width * 0.2);
                    this.detectedHeight = (this.detectedHeight * 0.8) + (result.box.height * 0.2);
                    this.detectedX = (this.detectedX * 0.6) + (result.box.x * 0.4);
                    this.detectedY = (this.detectedY * 0.6) + (result.box.y * 0.4);
                    this.isDetected = true;
                } else {
                    this.isDetected = false;
                }

                if (this.detectionCallbackArray.length > 0) {
                    for (const callback of this.detectionCallbackArray) {
                        callback(this);
                    }
                }

                requestAnimationFrame(() => this.detect());
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        return false;
    }

    addDetectionCallback(callback) {
        this.detectionCallbackArray.push(callback);
    }

}

//So, singleton it is
const FaceDetectionServiceInstance = new FaceDetectionService();

export default FaceDetectionServiceInstance;
