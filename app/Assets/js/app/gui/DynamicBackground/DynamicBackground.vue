<template>
    <div class="frame" :class="{visible: isVisible}">
        <background-item v-for="(fragment, index) in fragments" :key="index" :fragment="fragment" :state="positionState"/>
    </div>
</template>

<script>

import BackgroundItem from './BackgroundItem.vue';
import BackgroundGeneratorService from "/js/app/gui/Services/BackgroundGeneratorService.js";
import FragmentsData from "/json/leaves.json";

export default {
    name: "DynamicBackground",
    components:{
        BackgroundItem
    },
    props:{
        open:{
            type: Boolean
        },
        state:{
            type: Number
        }
    },
    data() {
        return {
            positionState: 0,
            isVisible: false,
            fragments: FragmentsData
        };
    },
    watch:{
        open(val){
            if(val){
                this.isVisible = true;
                this.positionState = this.state;
                //setTimeout(()=>this.positionState = this.state, 200);
            }else{
                this.positionState = 0;
                setTimeout(()=>this.isVisible = false, 100);
            }
        },
        state(){
            if(this.isVisible){
                this.positionState = this.state;
            }
        }
    },
    // mounted() {
    //     const bgserv = new BackgroundGeneratorService();
    //     bgserv.generate();
    //     this.fragments = bgserv.fragments;
    // }
}
</script>

<style lang="scss" scoped>

.frame {
    visibility: hidden;
    position: absolute;
    opacity: 0;
    transition: opacity 100ms linear;

    &.visible {
        visibility: visible;
        opacity: 1;
        transition: opacity 100ms linear;
    }
}


</style>