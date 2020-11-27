<template>
    <div class="frame" @click="setstate">
        <background-item v-for="(fragment, index) in fragments" :key="index" :fragment="fragment" :state="state"/>
    </div>
</template>

<script>

import BackgroundItem from './BackgroundItem.vue';
import BackgroundGeneratorService from "/js/app/gui/Services/BackgroundGeneratorService.js";

export default {
    name: "DynamicBackground",
    components:{
        BackgroundItem
    },
    props:{
        isVisible:{
            type: Boolean
        },
        // state:{
        //     type: Number
        // }
    },
    data() {
        return {
            state: 0,
            fragments: []
        };
    },
    methods:{
        setstate(){
            this.state = (this.state+1)%5;
        },
    },
    mounted() {
        const bgserv = new BackgroundGeneratorService();
        bgserv.generate();
        this.fragments = bgserv.fragments;
    }
}
</script>

<style lang="scss" scoped>

.frame {
    position: absolute;

}

</style>