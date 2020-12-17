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
uniform sampler2D maskMap;

void main(void) {

    //vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 map = texture2D(diffuseMap, vUV).xyz;

    vec3 cam = texture2D(cameraMap, vCamUV).xyz;

    vec3 mask = texture2D(maskMap, vUV).xyz;

    vec3 final = (map * (1.0 - mask)) + (cam * mask * map);

    gl_FragColor = vec4(final, 1.);
}