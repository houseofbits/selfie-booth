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

const float brightness = -0.3;
const float contrast = 1.5;
const float saturation = 1.5;

mat4 brightnessMatrix(float brightness)
{
    return mat4(1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    brightness, brightness, brightness, 1);
}

mat4 contrastMatrix(float contrast)
{
    float t = (1.0 - contrast) / 2.0;

    return mat4(contrast, 0, 0, 0,
    0, contrast, 0, 0,
    0, 0, contrast, 0,
    t, t, t, 1);

}

mat4 saturationMatrix(float saturation)
{
    vec3 luminance = vec3(0.3086, 0.6094, 0.0820);

    float oneMinusSat = 1.0 - saturation;

    vec3 red = vec3(luminance.x * oneMinusSat);
    red+= vec3(saturation, 0, 0);

    vec3 green = vec3(luminance.y * oneMinusSat);
    green += vec3(0, saturation, 0);

    vec3 blue = vec3(luminance.z * oneMinusSat);
    blue += vec3(0, 0, saturation);

    return mat4(red, 0,
    green, 0,
    blue, 0,
    0, 0, 0, 1);
}

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

//    camera = brightnessMatrix( brightness ) *
//                    contrastMatrix( contrast ) *
//                    saturationMatrix( saturation ) *
//                    camera *
//                    vec4(1.0, 1.0, 0.5, 1.0);

    vec3 finalColor = mix(diffuse.xyz, camera.xyz, 1.0 - diffuse.w);

    gl_FragColor = vec4(finalColor, 1.0);
}