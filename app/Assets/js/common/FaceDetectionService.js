import * as faceapi from '@vladmandic/face-api';

const DETECTOR_INTERVAL = 500;

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
        this.isDetectOn = true;
        this.detectionCallbackArray = [];
        this.detectorTimer = null;
    }

    async onWindowLoaded() {

        console.log('Init face detector');

        this.sourceCanvas = document.getElementById('captureCanvas');

        await faceapi.tf.enableProdMode();
        await faceapi.tf.ENV.set('DEBUG', false);
        await faceapi.tf.ready();

        await this.initFaceAPI();

        this.enableDetector(true);

        await this.detect();

        this.enableDetector(false);
    }

    async initFaceAPI() {

        console.log('Loading face detector models');

        await faceapi.nets.ssdMobilenetv1.load('/assets/models/');
        this.detectorNet = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.2});

        // await faceapi.nets.tinyFaceDetector.load('/assets/models/');
        // this.detectorNet = new faceapi.TinyFaceDetectorOptions({ minConfidence: 0.2});

        console.log('FaceAPI version ' + faceapi.version.faceapi);
        console.log('TensorFlow/JS ' + faceapi.tf.version_core);
        console.log('Models loaded: ' + faceapi.tf.engine().state.numTensors);
    }

    async detect() {
        if (!this.sourceCanvas) {
            return false;
        }

        this.clearDetectTimer();
        let result = null;

        if(this.isDetectOn) {
            result = await faceapi.detectSingleFace(this.sourceCanvas, this.detectorNet);
        }
        this.detectComplete(result);
        this.detectorTimer = setTimeout(this.detect.bind(this), DETECTOR_INTERVAL);
    }

    enableDetector(val) {
        this.isDetectOn = val;
    }

    clearDetectTimer() {
        if(this.detectorTimer) {
            clearTimeout(this.detectorTimer);
            this.detectorTimer = null;
        }
    }

    detectComplete(result) {
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
    }

    addDetectionCallback(callback) {
        this.detectionCallbackArray.push(callback);
    }

}

//So, singleton it is
const FaceDetectionServiceInstance = new FaceDetectionService();

export default FaceDetectionServiceInstance;
