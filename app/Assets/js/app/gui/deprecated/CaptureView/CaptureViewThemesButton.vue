<template>
    <div class="themes-button">
        <div class="button">{{ selectedThemeName }}</div>
    </div>
</template>

<script>

import MainSceneInstance from '/js/app/scene/MainInstance';

export default {
    props: {},
    data() {
        return {
            selectedTheme: MainSceneInstance.getActiveTheme()
        };
    },
    computed: {
        selectedThemeName() {
            if (this.selectedTheme) {
                return this.selectedTheme.name;
            }
            return 'Themes';
        }
    },
    methods: {}
};
</script>

<style scoped>
.themes-button {
    position: absolute;
    top: 1700px;
    left: 50px;
    width: 160px;
    height: 160px;
}

.button {
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: greenyellow;
    text-align: center;
    font-size: 30px;
    line-height: 32px;
    vertical-align: middle;
}
</style>