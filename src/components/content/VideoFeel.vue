<template>
    <div class="videoPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="VFcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">视频感知分析</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">视频感知列表</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <ana-page v-if="navs == '0'" @goList="changeNavs"></ana-page>
            <vid-page v-if="navs == '1'" :classify="classify" :ip="ip" :sites="sites"></vid-page>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import AnaPage from "@/components/content/video/analyze"
import VidPage from "@/components/content/video/videoList"
export default {
    data(){
        return{
            publicText: "视频感知",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: "0",
            // 搜索项
            classify: "全部",
            ip: "全部",
            sites: "全部"
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
            if(val == "0"){
                this.classify = "全部"
                this.ip = "全部",
                this.sites = "全部"
            }
        },

        // 根据组件传回的值改变navs
        changeNavs(val){
            if(val.id == "classify"){
                this.navs = val.navs
                this.classify = val.val
            }
            if(val.id == "badIpBar"){
                this.navs = val.navs
                this.ip = val.val
            }
            if(val.id == "badSitesBar"){
                this.navs = val.navs
                this.sites = val.val
            }
        }
    },
    components: {
        NavBar,
        AnaPage,
        VidPage
    }
}
</script>

<style>

</style>
