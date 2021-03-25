import * as faceapi from '@vladmandic/face-api';

const DETECTOR_INTERVAL = 100;

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
        this.detectorNet = new faceapi.SsdMobilenetv1Options({minConfidence: 0.2});

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

        if (this.isDetectOn) {
            //result = await faceapi.detectSingleFace(this.sourceCanvas, this.detectorNet);
            const results = await faceapi.detectAllFaces(this.sourceCanvas, this.detectorNet);
            result = this.findNearestResult(results);
        }
        this.detectComplete(result);
        this.detectorTimer = setTimeout(this.detect.bind(this), DETECTOR_INTERVAL);
    }

    findNearestResult(results) {
        if (results.length > 1) {
            const resultDistances = [];
            for (const result of results) {
                resultDistances.push({
                    distance: Math.hypot(result.box.x - this.detectedX, result.box.y - this.detectedY),
                    result: result
                });
            }
            resultDistances.sort((a, b) => a.distance > b.distance);
            return resultDistances[0].result;

        } else if (results.length === 1) {
            return results[0];
        }
        return null;
    }

    enableDetector(val) {
        this.isDetectOn = val;
    }

    clearDetectTimer() {
        if (this.detectorTimer) {
            clearTimeout(this.detectorTimer);
            this.detectorTimer = null;
        }
    }

    detectComplete(result) {
        if (result) {
            this.detectedWidth = result.box.width;
            this.detectedHeight = result.box.height;
            this.detectedX = result.box.x;
            this.detectedY = result.box.y;
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
