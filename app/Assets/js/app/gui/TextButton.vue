<template>
    <div class="button-with-shadow" @click="click">
        <div class="shadow"></div>
        <div class="button">
            <div class="gradient"></div>
            <div class="highlight"></div>
            <div class="line"><i :class="icon"></i> <span class="text"><slot></slot></span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CloseButton',
    props:{
        icon: {
            type: String
        },
    },
    methods:{
        click(){
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss" scoped>

.red .button .gradient {
//    background: linear-gradient(to bottom, #ff6759 0%, #a51010 63%, #d60404 100%);
    background-image: url('@images/red-button-bg.png');
}

.red .button .highlight {
//    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
    background-image: url('@images/red-button-hilight.png');
    background-position: -5px -5px;
}

.red .button .line {
    background: linear-gradient(to bottom, #6d0019 0%, #8f0222 56%, #a90329 100%);
    filter: drop-shadow(0 1px 3px rgba(255, 92, 92, 1));
}

.blue .button .gradient {
    //background: linear-gradient(to bottom, rgba(255, 89, 166, 1) 0%, rgba(33, 72, 242, 1) 36%, rgba(9, 68, 141, 1) 63%, rgba(3, 104, 155, 1) 85%, rgba(3, 104, 155, 1) 85%, rgba(2, 145, 126, 1) 100%);
    background-image: url('@images/blue-button-bg.png');
}

.blue .button .highlight {
    //background: linear-gradient(to bottom, rgba(252, 156, 156, 0.15) 0%, rgba(253, 128, 174, 0.2) 45%, rgba(255, 94, 196, 0.5) 100%);
    background-image: url('@images/blue-button-hilight.png');
    background-position: -5px -5px;
}

.blue .button .line {
    background: linear-gradient(to bottom, #332582 0%, #003ac4 100%);
    filter: drop-shadow(0 1px 3px rgb(92, 250, 255));
}

.green .button .gradient {
    //background: linear-gradient(to bottom, rgba(85, 210, 206, 1) 0%, rgba(92, 173, 0, 1) 30%, rgba(63, 109, 0, 1) 63%, rgba(73, 153, 0, 1) 100%);
    background-image: url('@images/green-button-bg.png');
}

.green .button .highlight {
    //background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
    background-image: url('@images/green-button-hilight.png');
    background-position: -5px -5px;
}

.green .button .line {
    background: linear-gradient(to bottom, rgba(0, 63, 6, 1) 0%, rgba(12, 91, 0, 1) 100%);
    filter: drop-shadow(0 1px 3px rgb(92, 255, 114));
}

.orange .button .gradient {
    //background: linear-gradient(to bottom, rgba(252, 142, 83, 1) 0%, rgba(234, 85, 7, 1) 28%, rgba(147, 80, 4, 1) 66%, rgba(249, 87, 0, 1) 100%);
    background-image: url('@images/orange-button-bg.png');
}

.orange .button .highlight {
    //background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
    background-image: url('@images/orange-button-hilight.png');
    background-position: -5px -5px;
}

.orange .button .line {
    background: linear-gradient(to bottom, rgba(132, 30, 30, 1) 0%, rgba(163, 48, 48, 1) 100%);
    filter: drop-shadow(0 1px 3px rgb(255, 190, 92));
}

.button-with-shadow {
    position: absolute;
    width: 200px;
    height: 80px;
    pointer-events: auto;
    transition: all 50ms linear;

    &:hover {
        filter: brightness(1.5);
    }

    .button {
        pointer-events: auto;
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
        //background: linear-gradient(to bottom, #fcf0bd 0%, #968a75 100%);
        background: linear-gradient(to bottom, #fcf0bd 0%,#649686 46%,#649686 46%,#44665d 59%,#968a75 100%);

        .gradient {
            pointer-events: none;
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
            pointer-events: none;
            display: block;
            position: absolute;
            top: 7px;
            bottom: 26px;
            right: 9px;
            left: 9px;
            border-radius: 55px 55px 50% 50%;
        //    background: linear-gradient(to bottom, rgba(254, 187, 187, 0.15) 0%, rgba(254, 144, 144, 0.20) 45%, rgba(255, 92, 92, 0.5) 100%);
        }

        .line {
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: auto;
            white-space: nowrap;
            font-weight: bold;
            font-size: 45px;
            //background: linear-gradient(to bottom, #6d0019 0%, #8f0222 56%, #a90329 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
            //filter: drop-shadow(0 1px 3px rgba(255, 92, 92, 1));

            .text {
                line-height: 80px;
                font-size: 28px;
                white-space: pre-wrap;
                margin-left: 10px;
            }
        }
    }
    .shadow {
        pointer-events: none;
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