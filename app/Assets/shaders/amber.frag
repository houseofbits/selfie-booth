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
uniform sampler2D diffuseSecMap;
uniform sampler2D cameraMap;
//uniform sampler2D maskMap;
uniform sampler2D normalsMap;

vec3 reflection(sampler2D map, vec2 uv, vec3 normal, vec3 view)
{
    vec3 refl = reflect(normal, view);
    vec2 displace = vec2(refl.x, refl.y);
    vec2 displacedUv = uv + displace * 0.3;

    if (displacedUv.x > 1.0) {
        displacedUv.x = 2.0 - displacedUv.x;
    }
    if (displacedUv.x < 1.0) {
        displacedUv.x = abs(displacedUv.x);
    }
    if (displacedUv.y > 1.0) {
        displacedUv.y = 2.0 - displacedUv.y;
    }
    if (displacedUv.y < 1.0) {
        displacedUv.y = abs(displacedUv.y);
    }
    return texture2D(map, displacedUv).xyz;
}

vec3 refraction(sampler2D map, vec2 uv, vec3 normal, vec3 view)
{
    vec3 refl = reflect(normal, view);
    vec2 displace = vec2(refl.x, refl.y);
    vec2 displacedUv = uv + displace * 0.7;

    if (displacedUv.x > 1.0) {
        displacedUv.x = 2.0 - displacedUv.x;
    }
    if (displacedUv.x < 1.0) {
        displacedUv.x = abs(displacedUv.x);
    }
    if (displacedUv.y > 1.0) {
        displacedUv.y = 2.0 - displacedUv.y;
    }
    if (displacedUv.y < 1.0) {
        displacedUv.y = abs(displacedUv.y);
    }
    //displacedUv.y = -displacedUv.y;
    return texture2D(map, displacedUv).xyz;
}

vec2 innerRefractionUv(vec2 uv, vec3 normal, vec3 view)
{
    vec3 refl = reflect(normal, view);
    vec2 displace = vec2(refl.x, refl.y);
    vec2 displacedUv = uv + displace * 0.2;

    if (displacedUv.x > 1.0) {
        displacedUv.x = 2.0 - displacedUv.x;
    }
    if (displacedUv.x < 1.0) {
        displacedUv.x = abs(displacedUv.x);
    }
    if (displacedUv.y > 1.0) {
        displacedUv.y = 2.0 - displacedUv.y;
    }
    if (displacedUv.y < 1.0) {
        displacedUv.y = abs(displacedUv.y);
    }
    return displacedUv;
}

vec3 boxBlur (sampler2D source, vec2 uv, float offset) {

    vec2 texOffset = vec2(offset, offset);

    float edgeOffset = 0.1;
    vec2 edgeDistMult = vec2(1);
    if(uv.s <= edgeOffset)texOffset.s *= (uv.s / edgeOffset);
    if(uv.t <= edgeOffset)texOffset.t *= (uv.t / edgeOffset);
    if(uv.s >= (1.0-edgeOffset))texOffset.s *= ((1.0-uv.s) / edgeOffset);
    if(uv.t >= (1.0-edgeOffset))texOffset.t *= ((1.0-uv.t) / edgeOffset);

    vec2 tc0 = uv.st + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = uv.st + vec2(         0.0, -texOffset.t);
    vec2 tc2 = uv.st + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = uv.st + vec2(-texOffset.s,          0.0);
    vec2 tc4 = uv.st + vec2(         0.0,          0.0);
    vec2 tc5 = uv.st + vec2(+texOffset.s,          0.0);
    vec2 tc6 = uv.st + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = uv.st + vec2(         0.0, +texOffset.t);
    vec2 tc8 = uv.st + vec2(+texOffset.s, +texOffset.t);

    vec3 col0 = texture2D(source, tc0).xyz;
    vec3 col1 = texture2D(source, tc1).xyz;
    vec3 col2 = texture2D(source, tc2).xyz;
    vec3 col3 = texture2D(source, tc3).xyz;
    vec3 col4 = texture2D(source, tc4).xyz;
    vec3 col5 = texture2D(source, tc5).xyz;
    vec3 col6 = texture2D(source, tc6).xyz;
    vec3 col7 = texture2D(source, tc7).xyz;
    vec3 col8 = texture2D(source, tc8).xyz;

    vec3 sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 +
    2.0 * col3 + 4.0 * col4 + 2.0 * col5 +
    1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0;

    return sum;
}

float exponentialEasing (float x, float a)
{

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));

    if (a < 0.5){
        a = 2.0*(a);
        float y = pow(x, a);
        return y;
    } else {
        a = 2.0*(a-0.5);
        float y = pow(x, 1.0/(1.0-a));
        return y;
    }
    return 0.0;
}

float blurFactor(vec2 uv, vec2 center)
{
    float l = length(center - uv);
    l = min(1.0, l) * 2.0;
    l = exponentialEasing(l, 0.7);
    return 0.001 + l * 0.05;
}

float opacityFactor(vec2 uv, vec2 center)
{
    float l = length(center - uv);
    l = min(1.0, l) * 4.0;
    l = exponentialEasing(l, 0.7);
    return 1.0 - l;
}

void main(void) {

    vec2 uv = vUV;
    uv.x = 1.0 - uv.x;

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    vec3 view = normalize(cameraPosition);

    float tmp = viewDirectionW.z;
    viewDirectionW.z = viewDirectionW.x;
    viewDirectionW.x = tmp;

    vec3 normals = normalize(texture2D(normalsMap, uv).xyz * 2.0 - 1.0);

    float dotn = dot(normals, viewDirectionW);

    float dotl = dot(normals, viewDirectionW);

    vec3 lightDir = normalize(vec3(400.0, -400.0, 300.0) - vPositionW);

    vec3 refl = normalize(reflect(-lightDir, normals));
    float specular = pow(max(0.0, dot(refl, viewDirectionW)), 6.0);

    vec4 diff = texture2D(diffuseSecMap, uv).xyzw;

    vec3 reflection = reflection(diffuseMap, uv, normals, viewDirectionW) * vec3(1.0, 1.0, 0.7);
    float reflFren = clamp(1.0 - dotn, 0.0, 1.0);
    float reflFrenGlow = pow(1.0 - dotn, 3.0);

    //non blurred refraction
//    vec3 refraction = refraction(diffuseMap, uv, normals, viewDirectionW);
    //blurred refraction
    vec2 refractionUv = innerRefractionUv(uv, normals, viewDirectionW);
    vec3 refraction = boxBlur(diffuseMap, refractionUv, 0.003);
    float refrFren = clamp(pow(dotn, 8.0), 0.0, 1.0);

    float mask = diff.w;

    vec2 innerRefractionUv = vCamUV;    //innerRefractionUv(vCamUV, normals, viewDirectionW);
    vec3 cam = boxBlur(cameraMap, innerRefractionUv, blurFactor(uv, vec2(0.5, 0.5)));

    vec3 amber = mix(diff.xyz, reflection, reflFren) + (reflection * reflFrenGlow);

    //Add faked refraction
    amber = clamp(mix(amber, clamp(amber * refraction, vec3(0.0), vec3(1.0)), refrFren), vec3(0.0), vec3(1.0));

    float innerFren = pow(dotn, 1.0);

    float density = (cam.x + cam.y + cam.z) * 0.33;
    density = pow(density, 3.0);

    float camMask = opacityFactor(uv, vec2(0.5, 0.5));

    //Mix in camera feed using camera brightness and mask
    amber = mix(amber, (amber * density) + (amber * density), innerFren * camMask);

    //Add specular
    amber = amber + specular;

    vec3 bg = vec3(1.0);    //boxBlur(diffuseMap, uv, 0.003);
    float blurMargin = 0.35;
    if (uv.y < blurMargin) {
        float fv = (uv.y - blurMargin) * 0.01;
        bg = boxBlur(diffuseMap, uv, fv);
    } else {
        bg = texture2D(diffuseMap, uv).xyz;
    }

    vec3 final = mix(bg, amber, mask);

    gl_FragColor = vec4(final, 1.);
}