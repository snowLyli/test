<template>
    <div class="applyPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Acentent contents">
            <ul class="conNav">
                <li :class="navs == '0' ? 'curNav' : ''" @click="showThisNav('0')"
                    style="border-left:none;">应用分类流量统计</li>
                <li :class="navs == '1' ? 'curNav' : ''" @click="showThisNav('1')">应用对象流量统计</li>
                <li :class="navs == '2' ? 'curNav' : ''" @click="showThisNav('2')">应用协议流量统计</li>
            </ul>
            <div class="switchBox">
                <div class="switch" @click="refreshByself">
                    <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
                </div>
            </div>
            <kind-page :pieData="pieData" :navs="navs" @success="success" v-if="navs == '0'"></kind-page>
            <div v-if="navs != '0'">敬请期待</div>
            <!-- <object-page :pieData="pieData" v-if="navs == '1'"></object-page>
            <proto-page :pieData="pieData" v-if="navs == '2'"></proto-page> -->
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
import ProtoPage from "@/components/flow/applies/proto"
import KindPage from "@/components/flow/applies/kind"
import ObjectPage from "@/components/flow/applies/object"
export default {
    data(){
        return{
            publicText: "应用流量",
            // 是否开启自动刷新
            refreshFlag: false,
            // 判断Nav的显示状态
            navs: 0,
            // 饼图数据对应关系
            pieData: [
                {
                    name: 1,
                    label: "即时通信",
                    value: 11
                },
                {
                    name: 2,
                    label: "阅读",
                    value: 5
                },
                {
                    name: 3,
                    label: "微博",
                    value: 5
                },
                {
                    name: 4,
                    label: "导航",
                    value: 5
                },
                {
                    name: 5,
                    label: "视频",
                    value: 5
                },
                {
                    name: 6,
                    label: "音乐",
                    value: 5
                },
                {
                    name: 7,
                    label: "应用商店",
                    value: 5
                },
                {
                    name: 8,
                    label: "游戏",
                    value: 5
                },
                {
                    name: 9,
                    label: "支付",
                    value: 5
                },
                {
                    name: 10,
                    label: "动漫",
                    value: 5
                },
                {
                    name: 11,
                    label: "邮箱",
                    value: 5
                },
                {
                    name: 12,
                    label: "P2P业务",
                    value: 5
                },
                {
                    name: 13,
                    label: "VoIP业务",
                    value: 5
                },
                {
                    name: 14,
                    label: "彩信",
                    value: 5
                },
                {
                    name: 15,
                    label: "浏览下载",
                    value: 5
                },
                {
                    name: 16,
                    label: "财经",
                    value: 5
                },
                {
                    name: 17,
                    label: "安全杀毒",
                    value: 5
                },
                {
                    name: 18,
                    label: "购物",
                    value: 5
                },
                {
                    name: 19,
                    label: "出行旅游",
                    value: 5
                },
                {
                    name: 20,
                    label: "网盘云服务",
                    value: 5
                },
                {
                    name: 21,
                    label: "其他1",
                    value: 5
                },
                {
                    name: 22,
                    label: "公共流量",
                    value: 5
                }
            ],
        }
    },
    mounted(){

    },
    methods: {
        // 模拟数据
        random(max, min){
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
        // 接受并改变子组件的值
        success(val){
            this.navs = val.navs
        }
    },
    components: {
        NavBar,
        ProtoPage,
        KindPage,
        ObjectPage
    }
}
</script>

<style>
/* 页面模块样式 */
.applyPage .Acentent .Atop,
.applyPage .Acentent .Amiddle{
    height:300px;
}
.applyPage .Acentent .Abottom{
    min-height:300px;
}
.applyPage .Acentent .Atop .Aleft,
.applyPage .Acentent .Atop .Acenter,
.applyPage .Acentent .Atop .Aright{
    width:32.5%;
    height:100%;
    margin-left:1%;
    float:left;
}
.applyPage .Acentent .Atop .Aleft{
    width:33%;
    margin-left:0;
}
/* 图表容器样式 */
.applyPage .Acentent .Atop .Aleft #realKindKind,
.applyPage .Acentent .Atop .Acenter #allKindKind,
.applyPage .Acentent .Atop .Aright #linkKindKind,
.applyPage .Acentent .Amiddle #kindLine{
    width:100%;
    height:85%;
}
.applyPage .Acentent .Atop .Aleft #realObjectKind,
.applyPage .Acentent .Atop .Acenter #allObjectKind,
.applyPage .Acentent .Atop .Aright #linkObjectKind,
.applyPage .Acentent .Atop .Aleft #realProKind,
.applyPage .Acentent .Atop .Acenter #allProKind,
.applyPage .Acentent .Atop .Aright #linkProKind{
    width: 389px;
    height: 255px;
}
.applyPage .Acentent .Amiddle #objectLine,
.applyPage .Acentent .Amiddle #proLine{
    width: 1179px;
    height: 255px;
}

/* 列表样式 */
.applyPage .Acentent .bottom .kindStaList .detailList{
    margin-bottom:10px;
}
/* 搜索框样式 */
.applyPage .Acentent .Abottom .kindStaList .searchBox{
    width:100%;
    height: 30px;
    border-radius:3px;
    margin-bottom:10px;
}
.applyPage .Acentent .Abottom .kindStaList .searchBox .applyBlock{
    height: 30px;
    text-align:center;
    float:right;
}
</style>

