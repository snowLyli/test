<template>
    <div class="AppDiscernPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="ADcentent contents">
            <ul class="conNav">
                <li :class="navs == 'mail' ? 'curNav' : ''" @click="showThisNav('mail')"
                    style="border-left:none;">邮件</li>
                <li :class="navs == 'pay' ? 'curNav' : ''" @click="showThisNav('pay')">支付</li>
                <li :class="navs == 'ec' ? 'curNav' : ''" @click="showThisNav('ec')">电商</li>
                <li :class="navs == 'takeOut' ? 'curNav' : ''" @click="showThisNav('takeOut')">外卖</li>
                <li :class="navs == 'trip' ? 'curNav' : ''" @click="showThisNav('trip')">出行</li>
                <li :class="navs == 'instant' ? 'curNav' : ''" @click="showThisNav('instant')">即时消息</li>
                <li :class="navs == 'forum' ? 'curNav' : ''" @click="showThisNav('forum')">论坛</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <mail-page v-if="navs == 'mail'"></mail-page>
            <pay-page v-if="navs == 'pay'"></pay-page>
            <ec-page v-if="navs == 'ec'"></ec-page>
            <take-page v-if="navs == 'takeOut'"></take-page>
            <trip-page v-if="navs == 'trip'"></trip-page>
            <instant-page v-if="navs == 'instant'"></instant-page>
            <forum-page v-if="navs == 'forum'"></forum-page>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import MailPage from "@/components/behave/apply/mail"
import PayPage from "@/components/behave/apply/pay"
import EcPage from "@/components/behave/apply/ec"
import TakePage from "@/components/behave/apply/takeOut"
import TripPage from "@/components/behave/apply/trip"
import InstantPage from "@/components/behave/apply/instantMsg"
import ForumPage from "@/components/behave/apply/forum"
export default {
    data(){
        return{
            publicText: "应用精细识别",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: "mail",

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
        MailPage,
        PayPage,
        EcPage,
        TakePage,
        TripPage,
        InstantPage,
        ForumPage
    }
}
</script>

<style>

</style>
