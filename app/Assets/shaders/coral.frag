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

uniform int displaceState;

uniform sampler2D diffuseMap;
uniform sampler2D cameraMap;

void main(void) {
    vec2 uv = vUV;
    uv.x = 1.0 - uv.x;

    vec2 camuv = vCamUV;

//    vec2 desiredPosition = vec2(0.47, 0.3);
//    vec2 desiredSize = vec2(0.3, 0.3);

    vec2 displace = vec2(0, 0);
//    vec2 scale = vec2(1.0, 1.0);

    //Transform position
    if (displaceState == 1) {
        displace.x = targetFacePosition.x - facePosition.x;
        displace.y = targetFacePosition.y - facePosition.y;

        camuv.x = vCamUV.x + displace.y;
        camuv.y = vCamUV.y + displace.x;
    }
    //Transform position and size
    if (displaceState == 2) {

//        float targetWidth = 0.1;
//        float targetHeight = 0.1;
//        float targetRight = 0.5;
//        float targetBottom = 0.5;
//
//        float actualWidth = faceRect.z;
//        float actualHeight = faceRect.w;
//        float actualRight = faceRect.x;
//        float actualBottom = faceRect.y;

        //float scaleX = targetWidth / actualWidth;
//        float scaleInvX = actualWidth / targetWidth;

        //float translateRight = targetRight - (actualRight / scaleX);
       // float translateBottom = 0.0;//(targetBottom - actualBottom) * scaleInvX;

//        scale.x = desiredSize.x / faceRect.z;
//        scale.y = desiredSize.y / faceRect.w;
//
        //float scaledWidth = 0.0;  //actualWidth * scaleInvX;
        //float scaledHeight = 0.0;//actualHeight * scaleInvX;

//        displace.x = desiredPosition.x - (faceRect.x * scale.x);
//        displace.y = desiredPosition.y - (faceRect.y * scale.y);

        //camuv.x = ((camuv.x / scaleX) + translateBottom);// + (scaledHeight * 0.5);         //(((vCamUV.x * scale.y) + displace.y) - scale.y) - (scaledHeight * 0.5);
        //camuv.y = ((camuv.y / scaleX) + translateRight);// + (scaledWidth * 0.5);
        //camuv.y = (((vCamUV.y * scale.x) + displace.x) - scale.x) - (scaledWidth * 0.5);
    }

    vec3 camera = texture2D(cameraMap, camuv).xyz;

    vec3 finalColor = camera;
    if (displaceState != 0) {
        vec4 diffuse = texture2D(diffuseMap, uv).xyzw;
        finalColor = mix(diffuse.xyz, camera, 1.0 - diffuse.w);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}