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
//uniform sampler2D normalMap;
uniform sampler2D maskMap;

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

    vec3 lightPosition = vec3(0., 30., 60.);

    vec3 lightVec = normalize(lightPosition - vPositionW);

    vec2 lightVecProj = vec3(invTBN * lightVec).xy;

    float ndotl = clamp(dot(lightVec, vNormalW), 0.0, 1.0);

    float spread = mix(0.02, 0.1, 1.0 - ndotl);

    float hardness = mix(0.8, 0.4, 1.0 - ndotl);

    float level = 1.0;

    vec2 skewedUV = vUV - (lightVecProj * 0.02);

    if (skewedUV.x > boxMin.x && skewedUV.y > boxMin.y &&
    skewedUV.x < boxMax.x && skewedUV.y < boxMax.y) {
        level = 1.0;
    } else {

        float val = 1.0;
        if (skewedUV.x < boxMin.x) {
            val = boxMin.x - skewedUV.x;
        }
        if (skewedUV.x > boxMax.x) {
            val = skewedUV.x - boxMax.x;
        }
        if (skewedUV.y < boxMin.y) {
            val = boxMin.y - skewedUV.y;
            if (skewedUV.x < boxMin.x) {
                val = length(skewedUV - vec2(boxMin.x, boxMin.y));
            } else if (skewedUV.x > boxMax.x) {
                val = length(skewedUV - vec2(boxMax.x, boxMin.y));
            }
        }
        if (skewedUV.y > boxMax.y) {
            val =  skewedUV.y - boxMax.y;
            if (skewedUV.x < boxMin.x) {
                val = length(skewedUV - vec2(boxMin.x, boxMax.y));
            } else if (skewedUV.x > boxMax.x) {
                val = length(skewedUV - vec2(boxMax.x, boxMax.y));
            }
        }
        level = 1.0 - (val / spread);
    }

    float vdotn = dot(normalW, normalize(cameraPosition - vPositionW));
    float shading = clamp(ndotl + pow(1.0 - vdotn, 1.0), 0.0, 1.0);

    vec2 scaledUV = vec2(vUV.x * 1.4, vUV.y * 1.2) - vec2(0.2, 0.1);
    vec3 mask = texture2D(maskMap, scaledUV).xyz;
    vec3 map = texture2D(diffuseMap, scaledUV).xyz;

    float primarySpecular = pow(ndotl, 10.0);
    float secondarySpecular = pow(1.0 - vdotn, 1.0);
    vec3 colorMap = (map.xyz * shading) + (primarySpecular * 0.3) + (secondarySpecular * 0.5);

    if(scaledUV.x < 0.0 || scaledUV.y < 0.0 || scaledUV.x > 1.0 || scaledUV.y > 1.0) {
        mask = vec3(0.0);
    }

    float opacity = level * ndotl + mask.x;

    vec3 color = mix(vec3(0.0), colorMap, mask.x);

    vec2 displaceUV = clamp(scaledUV + vec2(0.0, 0.01), vec2(0.0), vec2(1.0));
    float maskDisplaced = texture2D(maskMap, displaceUV).x;
    float border = 0.5 * ((1.0 - maskDisplaced) * mask.x);

    gl_FragColor = vec4(color + vec3(border), opacity);
}