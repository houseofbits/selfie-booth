<template>
    <div v-if="selectedOption" :class="{open: isOpen, closed: !isOpen}">
        <div class="icon" @click="showOptions">{{ selectedOption }}</div>
        <div v-for="(option, index) in themeOptions" class="icon" :class="['o'+index]" @click="select(option)">{{ option }}</div>
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
                AmberScene: ['Amber1', 'Amber2', 'Amber3', 'Amber4'],
                DinosaursScene: ['Outfit1', 'Outfit2', 'Outfit3', 'Outfit4'],
                CoralScene: [],
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
                return this.options[this.theme];
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
        left: 250px;
        visibility: visible;
    }
    .o1 {
        left: 450px;
        visibility: visible;
    }
    .o2 {
        left: 650px;
        visibility: visible;
    }
    .o3 {
        left: 850px;
        visibility: visible;
    }
}

.closed {
    .o0, .o1, .o2, .o3 {
        left: 50px;
        background-color: #003ac4;
        visibility: hidden;
    }
}

.icon {
    pointer-events: auto;
    position: absolute;
    left: 50px;
    bottom: 250px;
    width: 150px;
    height: 150px;
    border: solid 1px yellow;
    background-color: #28a745;
    transition: all 200ms linear;
    font-size: 20px;
    color: #003ac4;
}

</style>