<template>
    <div v-if="!isLoaded" class="overlay">
        <ul>
            <li v-for="(val, index) in messages" :key="index">{{ val }}</li>
        </ul>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';

export default {
    name: "LoadingView",
    data () {
        return {
            messages: [],
            isLoaded: false
        };
    },
    methods: {
        addLine(str) {
            this.messages.unshift(str);
        },
        markAsLoaded() {
            this.isLoaded = true;
        }
    },
    mounted() {
        MainSceneInstance.registerLoaderViewCallback((message, isLoaded) => {
            this.addLine(message);
            if (isLoaded) {
                this.markAsLoaded();
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    .overlay {
        position: absolute;
        left: 0;
        top:0;
        width: 1080px;
        height: 1920px;
        background-color: rgba(0,0,0,0.7);
        overflow: hidden;
        color: white;
        font-size: 22px;

        ul {
            list-style-type: none;
            padding: 0;
            margin: 30px;
        }

    }
</style>