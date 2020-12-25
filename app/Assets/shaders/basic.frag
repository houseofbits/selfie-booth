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

void main(void) {

    //vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 map = texture2D(diffuseMap, vUV).xyz;

    gl_FragColor = vec4(map, 1.);
}