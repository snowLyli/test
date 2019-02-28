<template>
    <div class="managePage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Mcentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">资产统计</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">关联关系管理</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <prostatic-page v-if="navs == '0'"></prostatic-page>
            <relation-page v-if="navs == '1'"></relation-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import ProstaticPage from "@/components/property/manage/prostatic"
import RelationPage from "@/components/property/manage/relation"
export default {
    data(){
        return{
            publicText: "资产管理",
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
        ProstaticPage,
        RelationPage
    }
}
</script>

<style>

</style>
