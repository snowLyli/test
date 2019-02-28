<template>
    <div class="AppDiscernPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="ADcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">文本内容感知分析</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">文本内容感知列表</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <ana-page v-if="navs == '0'" @goList="changeNavs"></ana-page>
            <text-page v-if="navs == '1'" :keyCon="keyCon" :ip="ip" :sites="sites" :mail="mail"></text-page>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import AnaPage from "@/components/content/text/analyze"
import TextPage from "@/components/content/text/textList"
export default {
    data(){
        return{
            publicText: "文本内容感知",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: "0",
            // 搜过项
            keyCon: "全部",
            ip: "全部",
            sites: "全部",
            mail: "全部"
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
            if(val == "0"){
                this.keyCon = "全部",
                this.ip = "全部",
                this.sites = "全部",
                this.mail = "全部"
            }
        },

        // 根据组件传回的值改变navs
        changeNavs(val){
            if(val.id == "keyBar" || val.id == "keyCon"){
                this.navs = val.navs
                this.keyCon = val.val
            }
            if(val.id == "ipBar"){
                this.navs = val.navs
                this.ip = val.val
            }
            if(val.id == "sitesBar"){
                this.navs = val.navs
                this.sites = val.val
            }
            if(val.id == "mailBar"){
                this.navs = val.navs
                this.mail = val.val
            }
        }
    },
    components: {
        NavBar,
        AnaPage,
        TextPage
    }
}
</script>

<style>

</style>
