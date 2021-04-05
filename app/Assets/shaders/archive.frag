precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec2 vCamUV;

// Uniforms
uniform mat4 world;

// Refs
uniform vec3 cameraPosition;
uniform sampler2D diffuseMap;

uniform vec3 cameraTint;

// Face detection params
uniform vec2 facePosition;
uniform vec2 targetFacePosition;
uniform int isFaceDetectorEnabled;
uniform sampler2D cameraMap;
vec3 adjustedCameraMap(int enable, vec2 position, vec2 target, sampler2D map, vec2 uv) {
    float margin = 0.1;
    vec2 camuv = uv;
    if (enable == 1) {
        float dx = target.x - position.x;
        float dy = target.y - position.y;
        camuv.x = uv.x + dy;
        camuv.y = uv.y + dx;
    }
    vec3 camera = vec3(0.0);
    if (camuv.x > 0.0 && camuv.x < 1.0 && camuv.y > 0.0 && camuv.y < 1.0) {
        camera = texture2D(map, camuv).xyz;
    }
    if (camuv.x < margin) {
        camera = camera * (camuv.x / margin);
    }
    if (camuv.y < margin) {
        camera = camera * (camuv.y / margin);
    }
    if (camuv.y > (1.0 - margin)) {
        camera = camera * ((1.0 - camuv.y) / margin);
    }
    if (camuv.x > (1.0 - margin)) {
        camera = camera * ((1.0 - camuv.x) / margin);
    }
    return camera;
}

void main(void) {
    vec3 camera = adjustedCameraMap(isFaceDetectorEnabled, facePosition, targetFacePosition, cameraMap, vCamUV) * cameraTint;
    vec4 diffuse = texture2D(diffuseMap, vUV).xyzw;

    vec3 cameraMix = diffuse.xyz;
    //Overlay
    //http://www.simplefilter.de/en/basics/mixmods.html
    float bgTone = dot(camera.xyz, vec3(1.0)) * 0.333;
    if (bgTone <= 0.5) {
        cameraMix = 2.0 * cameraMix * camera;
    } else {
        cameraMix = 1.0 - 2.0 * (1.0 - cameraMix) * (1.0 - camera);
    }

    vec3 finalColor = mix(cameraMix, diffuse.xyz, diffuse.w);
    gl_FragColor = vec4(finalColor, 1.0);
}