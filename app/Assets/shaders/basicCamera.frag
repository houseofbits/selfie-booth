precision highp float;

#define EFFECT_MIX_ALPHA 0
#define EFFECT_OVERLAY 1

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
        default:
            finalColor = effectMixAlpha(videoSample, diffuse);
    }

    //    gl_FragColor = vec4(mix(videoSample, diffuse.xyz, 0.5), 1.0);
//    gl_FragColor = vec4(videoSample, 1.0);
    gl_FragColor = vec4(finalColor, 1.0);
}