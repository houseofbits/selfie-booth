import * as faceapi from '@vladmandic/face-api';

class FaceDetectionService {

    constructor() {
        this.videoWidth = 0;
        this.videoHeight = 0;
        this.detectorNet = null;
        this.video = null;
        this.detectedWidth = 0;
        this.detectedHeight = 0;
        this.detectedX = 0;
        this.detectedY = 0;
    }

    async onWindowLoaded() {

        await faceapi.tf.enableProdMode();
        await faceapi.tf.ENV.set('DEBUG', false);
        await faceapi.tf.ready();

        await this.initFaceAPI();
        await this.initCameraStream();

        this.detect().then(() => {});
    }

    async initCameraStream() {
        this.video = document.getElementById('video');
        if (!this.video) {
            return null;
        }

        console.log('Setting up camera');
        // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
        if (!navigator.mediaDevices) {
            console.log('Camera Error: access not supported');
            return null;
        }
        let stream;
        const constraints = {
            audio: false,
            video: { facingMode: 'user', resizeMode: 'crop-and-scale' },
        };
        if (window.innerWidth > window.innerHeight) constraints.video.width = { ideal: window.innerWidth };
        else constraints.video.height = { ideal: window.innerHeight };
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
            console.log(err);
            return null;
        }
        if (stream) {
            video.srcObject = stream;
        }
        else {
            console.log('Camera Error: stream empty');
            return null;
        }
        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        if (settings.deviceId) delete settings.deviceId;
        if (settings.groupId) delete settings.groupId;
        if (settings.aspectRatio) settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;
        console.log(`Camera active:`);
        console.log(track.label);
        console.log(`Camera settings:`);
        console.log(settings);

        return new Promise((resolve) => {
            this.video.onloadeddata = async () => {
                this.videoWidth = video.videoWidth;
                this.videoHeight = video.videoHeight;
                this.video.play();
                resolve(true);
            };
        });
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
        if (!this.video || this.video.paused) {
            return false;
        }

        faceapi
            .detectSingleFace(this.video, this.detectorNet)
            .then((result) => {

                //console.log(result);

                this.detectedWidth = result.box.width;
                this.detectedHeight = result.box.height;
                this.detectedX = result.box.x;
                this.detectedY = result.box.y;

                requestAnimationFrame(() => this.detect());
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        return false;
    }

}

//So, singleton it is
const FaceDetectionServiceInstance = new FaceDetectionService();

export default FaceDetectionServiceInstance;
