<template>
    <div :class="{hidden: !isVisible}">
        <div class="start-button" @click="start">
            <div class="ring-layer"></div>
        </div>
        <div class="start-text" @click="start"><span :data-text="lang('demo.start-button')">{{ lang('demo.start-button') }}</span></div>
    </div>
</template>

<script>
export default {
    name: "StartButton",
    inject: ['lang'],
    props:{
        isVisible:{
            type: Boolean
        },
    },
    methods: {
        start() {
            this.$emit('start');
        }
    },
    /*
    mounted() {
        //Animation clip-path generation
        let strbuff = '';
        const steps = 36;
        let pos = 0;
        const posstep = 50/steps;
        let pi1 = -(Math.PI / 2.0);
        const pistep = (Math.PI * 2) / steps;
        for (let i = 0; i < steps; i++) {
            let x = 1.0 + Math.cos(pi1);
            let y = 1.0 + Math.sin(pi1);

            x = ((x * 100) / 2).toFixed(1);
            y = ((y * 100) / 2).toFixed(1);

            if(pi1 <= (Math.PI / 2.0)) {
                strbuff += pos.toFixed(2) + "% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, "
                    + 100 + "% " + y + "%, "
                    + x + "% " + y + "%"
                    + "); }\n";
            } else {
                strbuff += pos.toFixed(2) + "% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, "
                    + "100% " + y + "%, "
                    + "100% 100%, "
                    + "0% 100%, "
                    + "0% " + y + "%, "
                    + x + "% " + y + "%"
                    + "); }\n";
            }

            pi1 += pistep;
            pos += posstep;
        }

        pi1 = -(Math.PI / 2.0);
        for (let i = 0; i < steps; i++) {
            let x = 1.0 + Math.cos(pi1);
            let y = 1.0 + Math.sin(pi1);

            x = ((x * 100) / 2).toFixed(1);
            y = ((y * 100) / 2).toFixed(1);

            if(pi1 > (Math.PI / 2.0)) {
                strbuff += pos.toFixed(2) + "% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, "
                    + "0% " + y + "%, "
                    + x + "% " + y + "%"
                    + "); }\n";
            } else {
                strbuff += pos.toFixed(2) + "% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, "
                    + "0% " + y + "%, "
                    + "0% 100%, "
                    + "100% 100%, "
                    + "100% " + y + "%, "
                    + x + "% " + y + "%"
                    + "); }\n";
            }

            pi1 += pistep;
            pos += posstep;
        }

        console.log(strbuff);

    }
     */
}
</script>

<style lang="scss" scoped>
.start-button {
    pointer-events: auto;
    position: absolute;
    top: 1230px;
    left: 407px;
    width: 265px;
    height: 230px;
    opacity: 1;
    visibility: visible;
    transition: all 100ms linear;
    background-image: url('@images/record_button/record-button-main.png');

    &:hover {
        filter: brightness(1.75);
    }

   .ring-layer {
        pointer-events: none;
        width: 265px;
        height: 230px;
        background-image: url('@images/record_button/record-button-ring.png');
        animation: spin 5s infinite;
        animation-timing-function: linear;
    }
}

.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity, visibility 300ms linear;
}

.start-text {
    position: absolute;
    top: 1140px;
    left:390px;
    width:300px;
    text-align: center;
    font-size: 50px;

    &:hover {
        filter: brightness(1.75);
    }

    span {
        text-align: center;
        background: linear-gradient(to bottom, #f9f9f9 0%,#fccd4d 43%,#f49f00 57%,#ffa035 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position:relative;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
    }
    span:after {
        text-align: center;
        background: none;
        content: attr(data-text);
        left: 0;
        position: absolute;
        top: 0;
        z-index: -1;
        text-shadow:
            0 2px 0 rgba(0,0,0, 0.1),
            0 4px 0 rgba(0,0,0, 0.1),
            0 6px 0 rgba(0,0,0, 0.1),
            -2px 2px 0 rgba(0,0,0, 0.1),
            -4px 4px 0 rgba(0,0,0, 0.1),
            -4px 6px 0 rgba(0,0,0, 0.1),
            2px 2px 0 rgba(0,0,0, 0.1),
            4px 4px 0 rgba(0,0,0, 0.1),
            4px 6px 0 rgba(0,0,0, 0.1),
            1px 13px 8px rgba(0,0,0, 1);
    }
}

@keyframes spin {
    0.00% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 0.0%, 50.0% 0.0%); }
    1.39% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 0.8%, 58.7% 0.8%); }
    2.78% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 3.0%, 67.1% 3.0%); }
    4.17% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 6.7%, 75.0% 6.7%); }
    5.56% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 11.7%, 82.1% 11.7%); }
    6.94% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 17.9%, 88.3% 17.9%); }
    8.33% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 25.0%, 93.3% 25.0%); }
    9.72% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 32.9%, 97.0% 32.9%); }
    11.11% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 41.3%, 99.2% 41.3%); }
    12.50% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50.0%, 100.0% 50.0%); }
    13.89% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 58.7%, 99.2% 58.7%); }
    15.28% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 67.1%, 97.0% 67.1%); }
    16.67% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 75.0%, 93.3% 75.0%); }
    18.06% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 82.1%, 88.3% 82.1%); }
    19.44% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 88.3%, 82.1% 88.3%); }
    20.83% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 93.3%, 75.0% 93.3%); }
    22.22% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 97.0%, 67.1% 97.0%); }
    23.61% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 99.2%, 58.7% 99.2%); }
    25.00% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100.0%, 100% 100%, 0% 100%, 0% 100.0%, 50.0% 100.0%); }
    26.39% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 99.2%, 100% 100%, 0% 100%, 0% 99.2%, 41.3% 99.2%); }
    27.78% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 97.0%, 100% 100%, 0% 100%, 0% 97.0%, 32.9% 97.0%); }
    29.17% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 93.3%, 100% 100%, 0% 100%, 0% 93.3%, 25.0% 93.3%); }
    30.56% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 88.3%, 100% 100%, 0% 100%, 0% 88.3%, 17.9% 88.3%); }
    31.94% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 82.1%, 100% 100%, 0% 100%, 0% 82.1%, 11.7% 82.1%); }
    33.33% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 75.0%, 100% 100%, 0% 100%, 0% 75.0%, 6.7% 75.0%); }
    34.72% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 67.1%, 100% 100%, 0% 100%, 0% 67.1%, 3.0% 67.1%); }
    36.11% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 58.7%, 100% 100%, 0% 100%, 0% 58.7%, 0.8% 58.7%); }
    37.50% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50.0%, 100% 100%, 0% 100%, 0% 50.0%, 0.0% 50.0%); }
    38.89% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 41.3%, 100% 100%, 0% 100%, 0% 41.3%, 0.8% 41.3%); }
    40.28% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 32.9%, 100% 100%, 0% 100%, 0% 32.9%, 3.0% 32.9%); }
    41.67% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 25.0%, 100% 100%, 0% 100%, 0% 25.0%, 6.7% 25.0%); }
    43.06% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 17.9%, 100% 100%, 0% 100%, 0% 17.9%, 11.7% 17.9%); }
    44.44% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 11.7%, 100% 100%, 0% 100%, 0% 11.7%, 17.9% 11.7%); }
    45.83% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 6.7%, 100% 100%, 0% 100%, 0% 6.7%, 25.0% 6.7%); }
    47.22% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 3.0%, 100% 100%, 0% 100%, 0% 3.0%, 32.9% 3.0%); }
    48.61% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 0.8%, 100% 100%, 0% 100%, 0% 0.8%, 41.3% 0.8%); }
    49.99% { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 0.8%, 100% 100%, 0% 100%, 0% 0.8%, 41.3% 0.8%); }
    50.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.0%, 0% 100%, 100% 100%, 100% 0.0%, 50.0% 0.0%); }
    51.39% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.8%, 0% 100%, 100% 100%, 100% 0.8%, 58.7% 0.8%); }
    52.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 3.0%, 0% 100%, 100% 100%, 100% 3.0%, 67.1% 3.0%); }
    54.17% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 6.7%, 0% 100%, 100% 100%, 100% 6.7%, 75.0% 6.7%); }
    55.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 11.7%, 0% 100%, 100% 100%, 100% 11.7%, 82.1% 11.7%); }
    56.94% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 17.9%, 0% 100%, 100% 100%, 100% 17.9%, 88.3% 17.9%); }
    58.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 25.0%, 0% 100%, 100% 100%, 100% 25.0%, 93.3% 25.0%); }
    59.72% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 32.9%, 0% 100%, 100% 100%, 100% 32.9%, 97.0% 32.9%); }
    61.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 41.3%, 0% 100%, 100% 100%, 100% 41.3%, 99.2% 41.3%); }
    62.50% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 50.0%, 0% 100%, 100% 100%, 100% 50.0%, 100.0% 50.0%); }
    63.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 58.7%, 0% 100%, 100% 100%, 100% 58.7%, 99.2% 58.7%); }
    65.28% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 67.1%, 0% 100%, 100% 100%, 100% 67.1%, 97.0% 67.1%); }
    66.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 75.0%, 0% 100%, 100% 100%, 100% 75.0%, 93.3% 75.0%); }
    68.06% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 82.1%, 0% 100%, 100% 100%, 100% 82.1%, 88.3% 82.1%); }
    69.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 88.3%, 0% 100%, 100% 100%, 100% 88.3%, 82.1% 88.3%); }
    70.83% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 93.3%, 0% 100%, 100% 100%, 100% 93.3%, 75.0% 93.3%); }
    72.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 97.0%, 0% 100%, 100% 100%, 100% 97.0%, 67.1% 97.0%); }
    73.61% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 99.2%, 0% 100%, 100% 100%, 100% 99.2%, 58.7% 99.2%); }
    75.00% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 100.0%, 50.0% 100.0%); }
    76.39% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 99.2%, 41.3% 99.2%); }
    77.78% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 97.0%, 32.9% 97.0%); }
    79.17% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 93.3%, 25.0% 93.3%); }
    80.56% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 88.3%, 17.9% 88.3%); }
    81.94% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 82.1%, 11.7% 82.1%); }
    83.33% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 75.0%, 6.7% 75.0%); }
    84.72% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 67.1%, 3.0% 67.1%); }
    86.11% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 58.7%, 0.8% 58.7%); }
    87.50% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 50.0%, 0.0% 50.0%); }
    88.89% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 41.3%, 0.8% 41.3%); }
    90.28% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 32.9%, 3.0% 32.9%); }
    91.67% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 25.0%, 6.7% 25.0%); }
    93.06% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 17.9%, 11.7% 17.9%); }
    94.44% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 11.7%, 17.9% 11.7%); }
    95.83% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 6.7%, 25.0% 6.7%); }
    97.22% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 3.0%, 32.9% 3.0%); }
    98.61% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.8%, 41.3% 0.8%); }
    99.99% { clip-path: polygon(50% 50%, 50% 0%, 0% 0%, 0% 0.8%, 41.3% 0.8%); }
}
</style>