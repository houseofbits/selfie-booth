<template>
    <div :class="{wide: isExpanded}" class="button-with-shadow">
        <div class="shadow"></div>
        <div class="button">
            <div class="gradient"></div>
            <div class="highlight"></div>
            <div class="line"><i :class="iconClass"></i> <span class="text">{{ title }}</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Expandablebutton',
    props: {
        isExpanded: {
            type: Boolean
        },
        iconClass: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
};
</script>

<style lang="scss" scoped>

.red .button .gradient {
    background: linear-gradient(to bottom, #ff6759 0%,#a51010 63%,#d60404 100%);
}
.red .button .highlight {
    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
}
.red .button .line {
    background: linear-gradient(to bottom, #6d0019 0%, #8f0222 56%, #a90329 100%);
    filter: drop-shadow(0 1px 3px rgba(255, 92, 92, 1));
}

.blue .button .gradient {
    //background: linear-gradient(to bottom, #59b7ff 0%, #09448d 63%, #0451d6 100%);
    background: linear-gradient(to bottom, rgba(255,89,166,1) 0%,rgba(33,72,242,1) 36%,rgba(9,68,141,1) 63%,rgba(3,104,155,1) 85%,rgba(3,104,155,1) 85%,rgba(2,145,126,1) 100%);
}
.blue .button .highlight {
//    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
    background: linear-gradient(to bottom, rgba(252,156,156,0.15) 0%,rgba(253,128,174,0.2) 45%,rgba(255,94,196,0.5) 100%);
}
.blue .button .line {
    background: linear-gradient(to bottom, #332582 0%,#003ac4 100%);
    filter: drop-shadow(0 1px 3px rgb(92, 250, 255));
}

.green .button .gradient {
//    background: linear-gradient(to bottom, rgb(85, 210, 206) 0%,rgba(142,185,42,1) 14%,rgba(63,109,0,1) 63%,rgba(73,153,0,1) 100%);
    background: linear-gradient(to bottom, rgba(85,210,206,1) 0%,rgba(92,173,0,1) 30%,rgba(63,109,0,1) 63%,rgba(73,153,0,1) 100%);
}
.green .button .highlight {
    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
}
.green .button .line {
    background: linear-gradient(to bottom, rgba(0,63,6,1) 0%,rgba(12,91,0,1) 100%);
    filter: drop-shadow(0 1px 3px rgb(92, 250, 255));
}

.orange .button .gradient {
    background: linear-gradient(to bottom, rgba(252,142,83,1) 0%,rgba(234,85,7,1) 28%,rgba(147,80,4,1) 66%,rgba(249,87,0,1) 100%);
}
.orange .button .highlight {
    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
}
.orange .button .line {
    background: linear-gradient(to bottom, rgba(132,30,30,1) 0%,rgba(163,48,48,1) 100%);
    filter: drop-shadow(0 1px 3px rgb(92, 250, 255));
}

.button-with-shadow {
    width: 80px;
    height: 80px;
    transition: all 0.2s linear;
    pointer-events: auto;

    &.wide {
        width: 250px;
        height: 60px;
    }

    .button {
        pointer-events: none;
        display: inline-block;
        position: absolute;
        text-align: center;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.56);
        background: linear-gradient(to bottom, #fcf0bd 0%, #968a75 100%);

        .gradient {
            display: block;
            position: absolute;
            top: 2px;
            bottom: 2px;
            right: 2px;
            left: 2px;
            border-radius: 38px;
        //    background: linear-gradient(to bottom, #ff6759 0%, #a51010 63%, #d60404 100%);
        }

        .highlight {
            display: block;
            position: absolute;
            top: 8px;
            bottom: 25px;
            right: 7px;
            left: 7px;
            border-radius: 40px 40px 50% 50%;
        }

        .line {
            display: inline;
            width: auto;
            line-height: 80px;
            text-align: center;
            white-space: nowrap;
            font-weight: bold;
            font-size: 45px;
            //background: linear-gradient(to bottom, #6d0019 0%, #8f0222 56%, #a90329 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
            //filter: drop-shadow(0 1px 3px rgba(255, 92, 92, 1));

            .text {
                line-height: 60px;
                font-size: 25px;
                white-space: pre-wrap;

                &.small {
                    font-size: 20px;
                }
            }
        }
    }

    & .line {
        font-size: 45px;
        line-height: 80px;
        transition: all 0.2s linear;
    }

    &.wide .line {
        font-size: 35px;
        line-height: 60px;
    }

    & .text {
        display: none;
        line-height: 60px;
        transition: all 0.2s linear;
    }

    &.wide .text {
        display: inline;
    }

    .shadow {
        display: block;
        position: absolute;
        top: 10px;
        bottom: -4px;
        right: -13px;
        left: -13px;
        border-radius: 50% 50% 55px 55px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.48) 100%);
    }
}

</style>