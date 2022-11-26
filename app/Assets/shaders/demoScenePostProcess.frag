precision highp float;

#define M_PI 3.1415926535897932384626433832795
#define M_PI2 M_PI*2.0

// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

// Parameters
uniform vec2 screenSize;
uniform float radius;

void main(void)
{
    float vpos = pow((1.0 - vUV.y), 2.0);
    float blurWidth = vpos * 20.0;
    vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);

    vec3 color = texture2D(textureSampler, vUV).rgb;
    float tot = 1.0;

    float step = M_PI2 / 16.0;
    for (float ang = 0.0; ang < M_PI2; ang += step)
    {
        vec2 tc = vUV + vec2(cos(ang), sin(ang)) * texelSize * blurWidth;
        vec3 sampleColor = texture2D(textureSampler, tc).rgb;

        float m = smoothstep(radius-0.5, radius+0.5, 12.0);
        color += mix(color/tot, sampleColor, m);
        tot += 1.0;
    }

    step = M_PI2 / 8.0;
    for (float ang = 0.0; ang < M_PI2; ang += step)
    {
        vec2 tc = vUV + vec2(cos(ang), sin(ang)) * texelSize * blurWidth * 0.7;
        vec3 sampleColor = texture2D(textureSampler, tc).rgb;

        float m = smoothstep(radius-0.5, radius+0.5, 6.0);
        color += mix(color/tot, sampleColor, m);
        tot += 1.0;
    }

    step = M_PI2 / 8.0;
    for (float ang = 0.0; ang < M_PI2; ang += step)
    {
        vec2 tc = vUV + vec2(cos(ang), sin(ang)) * texelSize * blurWidth * 0.3;
        vec3 sampleColor = texture2D(textureSampler, tc).rgb;

        float m = smoothstep(radius-0.5, radius+0.5, 6.0);
        color += mix(color/tot, sampleColor, m);
        tot += 1.0;
    }

    color = color / tot;

    vec3 chi = color + color + color * color * color * color;
    vec3 final = mix(color, chi, vpos);
    gl_FragColor = vec4(final, 1.0);
}