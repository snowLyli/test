<template>
    <div class="alarmPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="ALcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">告警概览</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">资产情况展示</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <overview-page v-if="navs == '0'"></overview-page>
            <detshow-page v-if="navs == '1'"></detshow-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import OverviewPage from "@/components/property/alarm/overview"
import DetshowPage from "@/components/property/alarm/detailshow"
export default {
    data(){
        return{
            publicText: "资产告警",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0,
        }
    },
    mounted() {
        
    },
    methods: {
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        // 改变Navs的显示状态
        showThisNav(val){
            this.navs = val
        },

        
    },
    components: {
        NavBar,
        OverviewPage,
        DetshowPage
    }
}
</script>

<style>

</style>
