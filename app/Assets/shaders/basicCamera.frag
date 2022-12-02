precision highp float;

#define EFFECT_MIX_ALPHA 0
#define EFFECT_OVERLAY 1
#define EFFECT_ARCHIVE 2
#define EFFECT_HEADS 3
#define EFFECT_WATER 4
#define EFFECT_SHROOMS 5

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
uniform vec3 videoTint;
// Face detection params
uniform vec2 facePosition;
uniform vec2 faceSize;
uniform sampler2D videoMap;
uniform int effectId;

// All components are in the range [0…1], including hue.
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 getScaledVideoSample() {
    vec2 uv = vCamUV;
    uv = (uv - facePosition) / faceSize;
    vec3 videoSample = vec3(0.0);
    if (uv.x > 1.0 || uv.y > 1.0 || uv.x < 0.0 || uv.y < 0.0) {
        return vec3(0, 0, 0);
    } else {
        return texture2D(videoMap, uv).xyz;
    }
}

vec3 effectMixAlpha(vec3 video, vec4 diffuse) {
    return mix(video * videoTint, diffuse.xyz, diffuse.w);
}

vec3 effectOverlay(vec3 video, vec4 diffuse) {
    vec3 result = diffuse.xyz;
    //Overlay
    //http://www.simplefilter.de/en/basics/mixmods.html
    float bgTone = dot(diffuse.xyz, vec3(1.0)) * 0.333;
    if (bgTone <= 0.5) {
        result = 2.0 * result * video;
    } else {
        result = 1.0 - 2.0 * (1.0 - result) * (1.0 - video);
    }

    return mix(result, diffuse.xyz, diffuse.w);
}

vec3 effectArchive(vec3 video, vec4 diffuse) {
    vec3 difuseHSV = rgb2hsv(diffuse.xyz);
    vec3 faceHSV = rgb2hsv(video);

    faceHSV.x = difuseHSV.x;
    faceHSV.y = faceHSV.y + 0.5;
    faceHSV.z = faceHSV.z * faceHSV.z;

    vec3 faceRGB = hsv2rgb(faceHSV);

    return mix(faceRGB, diffuse.xyz, diffuse.w);
}

vec3 effectHeads(vec3 video, vec4 diffuse) {
    vec3 difuseHSV = rgb2hsv(diffuse.xyz);
    vec3 faceHSV = rgb2hsv(video);

    faceHSV.x = difuseHSV.x;
    faceHSV.y = faceHSV.y + 0.3;
    faceHSV.z = (faceHSV.z * (faceHSV.z + 0.3)) - 0.1;

    vec3 faceRGB = hsv2rgb(faceHSV);

    return mix(faceRGB, diffuse.xyz, diffuse.w);
}

vec3 effectWater(vec3 video, vec4 diffuse) {
    vec3 result = diffuse.xyz;
    result = (result + (video * video * video));

    return mix(result, diffuse.xyz, diffuse.w);
}

vec3 effectShrooms(vec3 video, vec4 diffuse) {
    vec3 difuseHSV = rgb2hsv(diffuse.xyz);
    vec3 faceHSV = rgb2hsv(video);

    faceHSV.x = difuseHSV.x;
    faceHSV.y = faceHSV.y;
    faceHSV.z = faceHSV.z - 0.2;

    vec3 faceRGB = hsv2rgb(faceHSV);

    return mix(faceRGB, diffuse.xyz, diffuse.w);
}

void main(void) {
    vec3 videoSample = getScaledVideoSample();
    vec4 diffuse = texture2D(diffuseMap, vUV).xyzw;

    vec3 finalColor = videoSample;
    switch (effectId) {
        case EFFECT_MIX_ALPHA:
            finalColor = effectMixAlpha(videoSample, diffuse);
            break;
        case EFFECT_OVERLAY:
            finalColor = effectOverlay(videoSample, diffuse);
            break;
        case EFFECT_ARCHIVE:
            finalColor = effectArchive(videoSample, diffuse);
            break;
        case EFFECT_HEADS:
            finalColor = effectHeads(videoSample, diffuse);
            break;
        case EFFECT_WATER:
            finalColor = effectWater(videoSample, diffuse);
            break;
        case EFFECT_SHROOMS:
            finalColor = effectShrooms(videoSample, diffuse);
            break;
        default:
            finalColor = effectMixAlpha(videoSample, diffuse);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}