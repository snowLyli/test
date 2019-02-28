<template>
    <div class="holePage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="HOcontent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">漏洞扫描</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">漏洞详情</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <scan-page v-if="navs == '0'"></scan-page>
            <hole-page v-if="navs == '1'"></hole-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import ScanPage from "@/components/property/hole/scan"
import HolePage from "@/components/property/hole/holedetail"
export default {
    data(){
        return{
            publicText: "漏洞分析",
            // 判断是否自动刷新
            refreshFlag: false,
            navs: 0,
        }
    },
    created(){

    },
    mounted(){
        
    },
    methods: {
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        showThisNav(val){
            this.navs = val
        },
    },
    components: {
        NavBar,
        ScanPage,
        HolePage
    }
}
</script>

<style>

</style>
