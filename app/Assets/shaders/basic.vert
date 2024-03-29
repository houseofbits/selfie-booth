precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

uniform mat4 world;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec2 vCamUV;

void main(void) {

    gl_Position = worldViewProjection * vec4(position, 1.0);

    vPositionW = vec3(world * vec4(position, 1.0));

    mat3 normalWorld = mat3(world);
    vNormalW = normalize(normalWorld * normal);

    vUV = uv;
    vUV.x = 1.0 - uv.x;

    vCamUV = uv;
    vCamUV.y = 1.0 - uv.y;
    vCamUV.x = 1.0 - uv.x;

    vPosition = position;
    vNormal = normal;
}
