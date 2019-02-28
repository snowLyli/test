<template>
    <div class="DDoSPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Dcontent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">DDoS统计分析</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">DDoS感知日志</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <ddosana-page v-if="navs == '0'"></ddosana-page>
            <ddoslist-page v-if="navs == '1'"></ddoslist-page>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/public/NavBar"
import DdoslistPage from "@/components/attack/ddos/ddosList"
import DdosanaPage from "@/components/attack/ddos/ddosAnalyse"
export default {
    data(){
        return{
            publicText: "DDoS攻击感知",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0
        }
    },
    mounted() {
        
    },
    created(){
        this.pickerOptions = {
            disabledDate(time) {
                return time.getTime() < new Date(this.date).getTime();
            }
        }
    },
    methods: {
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
        DdoslistPage,
        DdosanaPage
    }
}
</script>
<style>


</style>
