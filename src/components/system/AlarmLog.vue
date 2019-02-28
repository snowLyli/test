<template>
    <div class="AppDiscernPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="ADcentent contents">
            敬请期待
            <div class="switchBox" style="margin-top:0px;">
                <div class="switch" @click="refreshByself">
                    <div :class="refreshFlag ? 'track open' : 'track close'"></div>
                    <div :class="refreshFlag ? 'ball undo' : 'ball shut'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            publicText: "告警日志",
            // 判断是否自动刷新
            refreshFlag: false,

        }
    },
    mounted(){
        
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },

    },
    components: {
        NavBar
    }
}
</script>

<style>

</style>
