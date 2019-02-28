<template>
    <div class="usersPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Ucentent contents">
            <ul class="conNav">
                <!-- 数据库为空 -->
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">用户流量统计</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">用户流量详情查询</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
            </div>
            <sta-page v-if="navs == '0'"></sta-page>
            <det-page v-if="navs == '1'"></det-page> 
        </div> 
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import StaPage from "@/components/flow/users/flowStatic"
import DetPage from "@/components/flow/users/flowDetail"
export default {
    data(){
        return{
            publicText: "用户流量",
            // 是否开启自动刷新
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
        StaPage,
        DetPage
    }
}
</script>

<style>

</style>
