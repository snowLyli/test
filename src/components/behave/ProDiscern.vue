<template>
    <div class="proDiscernPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="PDcentent contents">
            <ul class="conNav">
                <li :class="navs == 'http' ? 'curNav' : ''" @click="showThisNav('http')"
                    style="border-left:none;">HTTP</li>
                <li :class="navs == 'dns' ? 'curNav' : ''" @click="showThisNav('dns')">DNS</li>
                <li :class="navs == 'ftp' ? 'curNav' : ''" @click="showThisNav('ftp')">FTP</li>
                <li :class="navs == 'sip' ? 'curNav' : ''" @click="showThisNav('sip')">SIP</li>
                <li :class="navs == 'rtsp' ? 'curNav' : ''" @click="showThisNav('rtsp')">RTSP</li>
            </ul>
            <div class="switchBox" @click="refreshByself">
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <http-page v-if="navs == 'http'"></http-page>
            <dns-page v-if="navs == 'dns'"></dns-page>
            <ftp-page v-if="navs == 'ftp'"></ftp-page>
            <sip-page v-if="navs == 'sip'"></sip-page>
            <rtsp-page v-if="navs == 'rtsp'"></rtsp-page>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import HttpPage from "@/components/behave/protocol/http"
import DnsPage from "@/components/behave/protocol/dns"
import FtpPage from "@/components/behave/protocol/ftp"
import SipPage from "@/components/behave/protocol/sip"
import RtspPage from "@/components/behave/protocol/rtsp"
export default {
    data(){
        return{
            publicText: "协议精细识别",
            // 判断是否自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: "http",
            
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
        HttpPage,
        DnsPage,
        FtpPage,
        SipPage,
        RtspPage
    }
}
</script>

<style>

</style>
