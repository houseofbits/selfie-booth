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
uniform sampler2D cameraMap;

void main(void) {
    vec2 uv = vUV;
    uv.x = 1.0 - uv.x;

    vec4 diffuse = texture2D(diffuseMap, uv).xyzw;
    vec3 camera = texture2D(cameraMap, vCamUV).xyz;

    vec3 finalColor = mix(diffuse.xyz, camera, 1.0 - diffuse.w);

    gl_FragColor = vec4(finalColor, 1.0);
}