<template>
    <div class="intrusionPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Icontent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">入侵统计分析</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">入侵感知日志</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <insana-page v-if="navs == '0'"></insana-page>
            <inslist-page v-if="navs == '1'"></inslist-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import InsanaPage from "@/components/attack/instrusion/insAnalyse"
import InslistPage from "@/components/attack/instrusion/insList"
export default {
    data(){
        return{
            publicText: "入侵感知",
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
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        // 改变Navs的显示状态
        showThisNav(val){
            this.navs = val
        }
    },
    components: {
        NavBar,
        InsanaPage,
        InslistPage
    }
}
</script>

<style>

</style>
