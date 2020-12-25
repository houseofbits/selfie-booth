
precision highp float;

// Varying
varying vec3 vPosition;
varying vec3 vPositionW;
varying vec3 vNormal;
varying vec3 vNormalW;
varying vec2 vUV;
varying vec2 vCamUV;

uniform mat4 world;
uniform vec3 cameraPosition;
uniform sampler2D diffuseMap;
uniform sampler2D maskMap;

void main(void) {

    vec3 lightPosition = vec3(0., 30., 50.);

    vec3 lightVec = normalize(lightPosition - vPositionW);

    float ndotl = clamp(dot(lightVec, vNormalW), 0.0, 1.0);

    vec4 map = texture2D(diffuseMap, vUV).xyzw;

    vec3 maskMap = texture2D(maskMap, vUV).xyz;
        
    float fakeSpecular = pow(ndotl, 20.0);

    vec3 color = (map.xyz * ndotl) + (fakeSpecular * 0.2);

    gl_FragColor = vec4(color, maskMap.x);
}