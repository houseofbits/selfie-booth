
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

const vec2 boxMin = vec2(0.17, 0.1);
const vec2 boxMax = vec2(0.83, 0.9);

mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv)
{
    // flip the uv for the backface
    uv = gl_FrontFacing ? uv : -uv;

    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    // solve the linear system
    vec3 dp2perp = cross(dp2, normal);
    vec3 dp1perp = cross(normal, dp1);
    vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;

    // construct a scale-invariant frame
    float invmax = inversesqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
    return mat3(tangent * invmax, bitangent * invmax, normal);
}

void main(void) {

    vec3 normalW = normalize(vNormalW);

    mat3 TBN = cotangent_frame(normalW, vPositionW, vUV);

    mat3 invTBN = inverse(TBN);
        
    vec3 lightPosition = vec3(0., 30., 50.);

    vec3 lightVec = normalize(lightPosition - vPositionW);

    vec2 lightVecProj = vec3(invTBN * lightVec).xy;

    float ndotl = clamp(dot(lightVec, vNormalW), 0.0, 1.0);

    float spread = mix(0.02, 0.1, 1.0 - ndotl);

    float hardness = mix(0.7, 0.1, 1.0 - ndotl);

    float level = 1.0;


    vec2 skewedUV = vUV - (lightVecProj * 0.02);



    if (skewedUV.x > boxMin.x && skewedUV.y > boxMin.y && 
        skewedUV.x < boxMax.x && skewedUV.y < boxMax.y) {
        level = 1.0;
    } else {

        float val = 1.0;
        if(skewedUV.x < boxMin.x) {
            val = boxMin.x - skewedUV.x;
        }    
        if(skewedUV.x > boxMax.x) {
            val = skewedUV.x - boxMax.x;
        }
        if(skewedUV.y < boxMin.y) {
            val = boxMin.y - skewedUV.y;
            if(skewedUV.x < boxMin.x) {
                val = length(skewedUV - vec2(boxMin.x, boxMin.y));
            } else if(skewedUV.x > boxMax.x) {
                val = length(skewedUV - vec2(boxMax.x, boxMin.y));
            }
        }            
        if(skewedUV.y > boxMax.y) {
            val =  skewedUV.y - boxMax.y;
            if(skewedUV.x < boxMin.x) {
                val = length(skewedUV - vec2(boxMin.x, boxMax.y));
            } else if(skewedUV.x > boxMax.x) {
                val = length(skewedUV - vec2(boxMax.x, boxMax.y));
            }           
        }        
        
        level = 1.0 - (val / spread);

    }

    vec3 map = texture2D(diffuseMap, vUV).xyz;

    vec3 c = vec3(0.0);
        
    gl_FragColor = vec4(c, hardness * level);
}