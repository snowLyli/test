<template>
    <div class="virusPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Vcontent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">病毒统计分析</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">病毒感知日志</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <virana-page v-if="navs == '0'"></virana-page>
            <virlist-page v-if="navs == '1'"></virlist-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import ViranaPage from "@/components/attack/virus/virusAnalyse"
import VirlistPage from "@/components/attack/virus/virusList"
export default {
    data(){
        return{
            publicText: "病毒感知",
            // 判断是否自动刷新
            refreshFlag: false,
            // 自动刷新定时器
            timer: null,
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
        ViranaPage,
        VirlistPage
    }
}
</script>

<style>

</style>

