<template>
    <div class="areaPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="ARcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">中国地区流量统计</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">全球流量统计</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <local-page v-if="navs == '0'"></local-page>
            <coun-page v-if="navs == '1'"></coun-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import LocalPage from "@/components/flow/area/local"
import counPage from "@/components/flow/area/country"
export default {
    data(){
        return{
            publicText: "区域流量",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0,
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
        // 改变Navs的显示状态
        showThisNav(val){
            this.navs = val
        },
    },
    components: {
        NavBar,
        LocalPage,
        counPage
    }
}
</script>

<style>

</style>
