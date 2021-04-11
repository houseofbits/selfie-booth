<template>
    <div v-if="!isLoaded" class="overlay">
        <ul>
            <li v-for="(val, index) in messages" :key="index">{{ val }}</li>
        </ul>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';

const packageVersion = require('/package.json').version;

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
    computed: {
        title() {
            return 'SELFIE BOOTH ' + packageVersion;
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
    .title {
        display: inline-block;
        position:absolute;
        top:30px;
        right: 30px;
        font-size: 30px;
    }
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