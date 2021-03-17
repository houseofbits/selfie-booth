<template>
    <div v-if="selectedOption" :class="{open: isOpen, closed: !isOpen}">
        <div class="shadow" :class="{open: isOpen}" ></div>
        <div class="icon"  :class="{[selectedOption]:true, open: isOpen}" @click="showOptions">
            <div class="overlay"></div>
        </div>
        <div v-for="(option, index) in themeOptions" class="icon option" :class="['o'+index, option]" @click="select(option)">
            <div class="overlay"></div>
        </div>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';

export default {
    name: "OptionsCollapsible",
    props: {
        open: {
            type: Boolean,
            required: true
        },
        theme: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            options: {
                AmberScene: ['amber1', 'amber2', 'amber3', 'amber4'],
                DinosaursScene: ['dinosaurs1', 'dinosaurs2', 'dinosaurs3', 'dinosaurs4'],
                CoralScene: [],
                BirdsScene: ['egg1', 'egg2', 'egg3', 'egg4'],
                DisplayScene: ['display1', 'display2', 'display3', 'display4'],
                ShroomsScene: [],
                BugsScene: ['bug1', 'bug2', 'bug3'],
                ArchiveScene: [],
            },
            selectedOption: null,
            isOpen: false
        };
    },
    watch: {
        open(val) {
            this.isOpen = val;
        },
        theme(theme) {
            const options = this.themeOptions;
            if(options.length > 0) {
                this.selectedOption = options[0];
            } else {
                this.selectedOption = null;
            }
        }
    },
    computed: {
        themeOptions() {
            if (this.options.hasOwnProperty(this.theme)) {
                return this.options[this.theme].filter(option => option !== this.selectedOption);
            }
            return [];
        }
    },
    methods: {
        showOptions() {
            if (!this.open) {
                this.$emit('open');
            } else {
                this.$emit('select', this.selectedOption);
            }
        },
        select(option) {
            this.selectedOption = option;
            MainSceneInstance.onOptionSelected(option);
            this.$emit('select', option);
        }
    }
}
</script>

<style lang="scss" scoped>
.open {
    pointer-events: auto;
    .o0 {
        left: 40px;
        bottom: 440px;
        visibility: visible;
    }
    .o1 {
        left: 40px;
        bottom: 660px;
        visibility: visible;
    }
    .o2 {
        left: 40px;
        bottom: 880px;
        visibility: visible;
    }
    .o3 {
        left: 40px;
        bottom: 1100px;
        visibility: visible;
    }
}

.closed {
    .o0, .o1, .o2, .o3 {
        left: 40px;
        bottom: 220px;
        background-color: #003ac4;
        visibility: hidden;
    }
}

.icon {
    pointer-events: auto;
    position: absolute;
    left: 40px;
    bottom: 160px;
    width: 183px;
    height: 183px;
    background: linear-gradient(to bottom, rgba(255,234,209,1) 0%,rgba(178,176,0,1) 41%,rgba(170,92,0,1) 59%,rgba(235,155,29,1) 100%);
    transition: all 200ms linear;
    font-size: 20px;
    color: #003ac4;
    border-radius: 50%;
    box-shadow: 0 5px 6px 3px rgba(0, 0, 0, 0.56);

    &.open {
        bottom: 220px;
    }

    &.option {
        width: 177px;
        height: 177px;
    }

    div.overlay {
        width: 171px;
        height: 220px;
        position: absolute;
        bottom: 6px;
        left: 6px;
    }

    &.option div.overlay {
        bottom: 3px;
        left: 3px;
    }

    &.amber1 div.overlay {
      background-image: url('@images/amber/option1.png');
      height: 200px;
    }
    &.amber2  div.overlay {
        background-image: url('@images/amber/option2.png');
        height: 200px;
    }
    &.amber3  div.overlay {
        background-image: url('@images/amber/option3.png');
        height: 200px;
    }
    &.amber4  div.overlay {
        background-image: url('@images/amber/option4.png');
        height: 200px;
    }

    &.dinosaurs1 div.overlay {
        background-image: url('@images/dinosaurs/option1.png');
        height: 214px;
    }
    &.dinosaurs2  div.overlay {
        background-image: url('@images/dinosaurs/option2.png');
        height: 214px;
    }
    &.dinosaurs3  div.overlay {
        background-image: url('@images/dinosaurs/option3.png');
        height: 214px;
    }
    &.dinosaurs4  div.overlay {
        background-image: url('@images/dinosaurs/option4.png');
        height: 214px;
    }

    &.display1 div.overlay {
        background-image: url('@images/display/option4.png');
        height: 215px;
    }
    &.display2  div.overlay {
        background-image: url('@images/display/option3.png');
        height: 215px;
    }
    &.display3  div.overlay {
        background-image: url('@images/display/option1.png');
        height: 215px;
    }
    &.display4  div.overlay {
        background-image: url('@images/display/option2.png');
        height: 215px;
    }

    &.egg1 div.overlay {
        background-image: url('@images/birds/option1.png');
        height: 215px;
    }
    &.egg2  div.overlay {
        background-image: url('@images/birds/option3.png');
        height: 215px;
    }
    &.egg3  div.overlay {
        background-image: url('@images/birds/option4.png');
        height: 215px;
    }
    &.egg4  div.overlay {
        background-image: url('@images/birds/option2.png');
        height: 215px;
    }

    &.bug1  div.overlay {
        background-image: url('@images/bugs/option1.png');
        height: 215px;
    }
    &.bug2  div.overlay {
        background-image: url('@images/bugs/option2.png');
        height: 215px;
    }
    &.bug3  div.overlay {
        background-image: url('@images/bugs/option3.png');
        height: 215px;
    }

}
.shadow {
    display: block;
    position: absolute;
    width: 223px;
    height:183px;
    left: 20px;
    bottom: 160px;
    border-radius: 50% 50% 100px 100px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.48) 100%);
    transition: all 200ms linear;

    &.open {
        bottom: 220px;
    }
}
</style>