<template>
    <div class="alarmlogPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="RMcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">告警概览</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">资产情况展示</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <overview-page v-if="navs == '0'"></overview-page>
            <prodet-page v-if="navs == '1'"></prodet-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import OverviewPage from "@/components/property/alarmlog/overview"
import ProdetPage from "@/components/property/alarmlog/prodetail"
export default {
    data(){
        return{
            publicText: "资产日志",
            // 是否刷新页面
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0,
        }
    },
    mounted(){
        
    },
    methods: {
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        // 改变Navs的显示状态
        showThisNav(val){
            this.navs = val
        },

        // 显示当前选中列表标题
        preShow(num){
            this.aLogNav.map((item, index) => {
                if(index == num){
                    this.aLogNav[index].showFlag = true
                    this.alarmLogs[index] = true
                }else{
                    this.aLogNav[index].showFlag = false
                    this.alarmLogs[index] = false
                }
            })
        },
    },
    components: {
        NavBar,
        OverviewPage,
        ProdetPage
    }
}
</script>

<style>

</style>
