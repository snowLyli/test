<template>
    <div class="controlPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Ccentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">监控概览</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">资产情况展示</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <div class="alarmTimes">
                    <div class="msgText">
                        <span class="label">今日告警次数：</span>
                        <span class="number">5344</span>
                    </div>
                    <div class="msgText">
                        <span class="label">已处理：</span>
                        <span class="number">2638</span>
                    </div>
                    <div class="msgText">
                        <span class="label">未处理：</span>
                        <span class="number">2706</span>
                    </div>
                </div>
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <overview-page v-if="navs == '0'"></overview-page>
            <detshow-page v-if="navs == '1'"></detshow-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import OverviewPage from "@/components/property/control/overview"
import DetshowPage from "@/components/property/control/detailshow"
export default {
    data(){
        return{
            publicText: "资产监控",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0,
        }
    },
    mounted(){
        
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
/* 告警次数模块样式 */
.controlPage .Ccentent .switchBox .alarmTimes{
    width: 70%;
    height: 100%;
    overflow: hidden;
    float: left;
}
/* 告警次数各文本模块样式 */
.controlPage .Ccentent .switchBox .alarmTimes .msgText{
    width: 25%;
    float: left;
    margin-left: 20px;
    line-height: 35px;
}
/* 告警次数文本样式 */
.controlPage .Ccentent .switchBox .alarmTimes .msgText .label{
    font-size: 15px;
}
/* 告警次数数字样式 */
.controlPage .Ccentent .switchBox .alarmTimes .msgText .number{
    color: rgb(0, 116, 255);
    font-size: 17px;
}
</style>
