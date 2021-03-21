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

uniform vec2 faceSize;
uniform vec2 facePosition;
uniform vec2 targetFacePosition;

uniform sampler2D diffuseMap;
uniform sampler2D cameraMap;

void main(void) {
    vec2 uv = vUV;
    uv.x = 1.0 - uv.x;

    float dx = targetFacePosition.x - facePosition.x;
    float dy = targetFacePosition.y - facePosition.y;

    vec2 camuv = vCamUV;
    camuv.x = vCamUV.x + dy;
    camuv.y = vCamUV.y + dx;

    vec3 camera = texture2D(cameraMap, camuv).xyz;

    vec4 diffuse = texture2D(diffuseMap, uv).xyzw;

    vec3 finalColor = mix(diffuse.xyz, camera, 1.0 - diffuse.w);

    gl_FragColor = vec4(finalColor, 1.0);
}