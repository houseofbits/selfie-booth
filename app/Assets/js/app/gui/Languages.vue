<template>
    <div class="languages" :class="{visible: isVisible}">
        <div :class="{selected: isLanguageEn}" class="en" @click="setLanguage('en')"></div>
        <div :class="{selected: isLanguageLv}" class="lv" @click="setLanguage('lv')"></div>
        <div :class="{selected: isLanguageRu}" class="ru" @click="setLanguage('ru')"></div>
    </div>
</template>

<script>
export default {
    name: "Languages",
    inject: ['langService'],
    props:{
        isVisible:{
            type: Boolean
        },
    },
    data() {
        return {
            language: 'lv',
        };
    },
    computed:{
        isLanguageLv(){
            return this.language === 'lv';
        },
        isLanguageEn(){
            return this.language === 'en';
        },
        isLanguageRu(){
            return this.language === 'ru';
        },
    },
    methods: {
        setLanguage(language) {
            this.language = language;
            this.langService.setLanguage(this.language);
        }
    },
    mounted() {
        this.langService.setLanguage(this.language);
    }
}
</script>

<style lang="scss" scoped>
.languages {
    width: 1080px;
    height: 200px;
    position: absolute;
    top: 1450px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 300ms linear;

    div {
        pointer-events: auto;
        width: 153px;
        height: 100px;
        background-color: #c7c7c7;
        margin: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 13px -7px #000000, 0px 5px 15px 5px rgba(0, 0, 0, 0.32);
        opacity: 0.6;
        transition: all 200ms linear;

        &:hover {
            filter: brightness(1.5);
        }

        &.lv {
            background-image: url('../../../images/lv_flag.png');
            background-size: cover;
        }

        &.en {
            background-image: url('../../../images/en_flag.png');
            background-size: cover;
        }

        &.ru {
            background-image: url('../../../images/ru_flag.png');
            background-size: cover;
        }

        &.selected {
            opacity: 1;
            width: 184px;
            height: 120px;
            transition: all 200ms linear;
        }
    }

    &.visible{
        opacity: 1;
        visibility: visible;
        transition: all 300ms linear;
    }
}

</style>