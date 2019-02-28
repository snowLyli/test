<template>
    <div class="conBox">
        <div class="CDPtop structure boxes">
            <h6>机房视图资产</h6>
            <div class="comList boxContent">
                <ul class="title">
                    <li>资产名称</li>
                    <li>管理IP</li>
                    <li>严重</li>
                    <li>重要</li>
                    <li>一般</li>
                </ul>
                <div class="comRoom" v-for="(firItem, firIndex) in comRoomData" :key="firIndex">
                    <img :src="firItem.showSecond ? '../../../static/property/img/hide.png' : '../../../static/property/img/show.png'"
                        alt="" @click="ifShowSecond(firIndex)">
                    <span>机房{{firItem.comType}}</span>
                    <span>资产总数({{firItem.allProperties}})</span>
                    <span>告警数量({{firItem.alarms}})</span>
                    <div v-for="(secItem, secIndex) in firItem.second" :key="secIndex"
                        :class="firItem.showSecond ? 'server show' : 'server hide'">
                        <img :src="secItem.showThird ? '../../../static/property/img/hide.png' : '../../../static/property/img/show.png'"
                            alt="" @click="ifShowThird(firIndex, secIndex)">
                        <span>{{secItem.proType}}</span>
                        <span>总数({{secItem.allNum}})</span>
                        <span>告警数量({{secItem.alarms}})</span>
                        <ul v-for="(thiItem, thiIndex) in secItem.third" 
                            :key="thiIndex"
                            :class="secItem.showThird ? 'listContent show' : 'listContent hide'">
                            <li>{{thiItem.proName}}</li>
                            <li>{{thiItem.manageIP}}</li>
                            <li>{{thiItem.serverity}}</li>
                            <li>{{thiItem.important}}</li>
                            <li>{{thiItem.general}}</li>
                        </ul>
                        <!-- <div :class="secItem.showThird ? 'block show' : 'block hide'">
                            <el-pagination @size-change="handleProperty"
                                        @current-change="handlePropertyCurrent"
                                        :current-page="secItem.curPage"
                                        :page-sizes="[5,10,15,20]"
                                        :page-size="secItem.everyPage"
                                        layout="total, sizes, prev, pager, next, jumper" :total="secItem.allData">
                            </el-pagination>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 机房视图资产列表数据
            comRoomData: [
                {
                    showSecond: true,
                    comType: "A",
                    allProperties: "72",
                    alarms: "64",
                    second: [
                        {
                            showThird: false,
                            proType: "服务器",
                            allNum: "60",
                            alarms: "48",
                            curPage: 0,
                            everyPage: 10,
                            allData: 60,
                            third: [
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                },
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                }
                            ]
                        },
                        {
                            showThird: false,
                            proType: "服务器",
                            allNum: "60",
                            alarms: "48",
                            third: [
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                },
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                }
                            ]
                        }
                    ]
                },
                {
                    showSecond: true,
                    comType: "A",
                    allProperties: "72",
                    alarms: "64",
                    curPage: 0,
                    everyPage: 10,
                    allData: 60,
                    second: [
                        {
                            showThird: false,
                            proType: "服务器",
                            allNum: "60",
                            alarms: "48",
                            third: [
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                },
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                }
                            ]
                        },
                        {
                            showThird: false,
                            proType: "服务器",
                            allNum: "60",
                            alarms: "48",
                            third: [
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                },
                                {
                                    proName: "xxx服务器",
                                    manageIP: "10.0.100.234",
                                    serverity: "10",
                                    important: "20",
                                    general: "18"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    mounted(){

    },
    methods:{
        // 判断是否显示列表二级菜单
        ifShowSecond(val){
            this.comRoomData[val].showSecond = !this.comRoomData[val].showSecond
        },
        // 判断是否显示列表三级菜单
        ifShowThird(secVal, thiVal){
            var flag = this.comRoomData[secVal].second[thiVal].showThird
            this.comRoomData[secVal].second[thiVal].showThird = !flag
        }
    }
}
</script>
<style>
/* 模块样式 */
.CDPtop{
    min-height:600px;
}
/* 机房视图资产情况每条数据容器样式设置 */
.CDPtop .comList  .title,
.CDPtop .comList .comRoom{
    width:100%;
    overflow: hidden;
}
.CDPtop .comList  .title>li{
    width:20%;
    height: 36px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #47515f;
    border-left: 1px solid #58626f;
    line-height: 36px;
    text-align: center;
    color: #fff;
    float:left;
}
.CDPtop .comList .comRoom{
    border-bottom: 1px solid #47515f;
}
/* 每条数据样式设置 */
.CDPtop .comList .comRoom>img{
    width: 15px;
    height: 15px;
    margin: 10px 5px;
    float: left;
}
/* 每条数据一级标题 */
.CDPtop .comList .comRoom>span{
    line-height:36px;
    margin-right:5px;
    color:#333;
}
/* 二级标题容器样式 */
.CDPtop .comList .comRoom .server{
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    clear:both;
    border-top: 1px solid rgb(195,195,195);
}
.CDPtop .comList .comRoom>.show{
    display:block;
}
.CDPtop .comList .comRoom>.hide{
    display:none;
}
/* 每条数据二级标题图片样式 */
.CDPtop .comList .comRoom .server>img{
    width: 15px;
    height: 15px;
    margin: 7px 5px;
    float: left;
}
/* 二级标题文本样式 */
.CDPtop .comList .comRoom .server>span{
    line-height:30px;
    margin-right:5px;
}
/* 资产详细状况列表 */
.CDPtop .comList .comRoom .server .listContent{
    width:100%;
    border-top: 1px solid rgb(225,225,225);
    overflow:hidden;
}
.CDPtop .comList .comRoom .server>.show{
    display:block;
}
.CDPtop .comList .comRoom .server>.hide{
    display:none;
}
.CDPtop .comList .comRoom .server .listContent>li{
    width:20%;
    float: left;
    line-height:30px;
    text-align:center;
}
</style>
