<template>
    <div class="gv6OVPage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6Content">
            <div class="gv6Top">
                <div class="gv6Left sameBox">
                    <ul class="detailPro">
                        <h4 class="conEllipsis">{{gv6Data.name}}</h4>
                        <li v-for="(item, index) in gv6Data.details" :key="index" >
                            <span>{{item.itemDetail[0]}}</span>
                            <span class="conEllipsis">：{{item.itemDetail[1]}}</span>
                        </li>
                    </ul>
                </div>
                <div class="gv6Center sameBox">
                    <div class="CPU">
                        <div class="picBox">
                            <img src="../../../../../static/property/img/processor.png" alt="">
                            <span>CPU</span>
                        </div>
                        <ul class="cpuText">
                            <li>
                                <span>型号：</span>
                                <span class="conEllipsis">Intel(R) Xeon(R) CPU E5-2699 v3 @ 2.30GHz</span>
                            </li>
                            <li>
                                <span>核数：</span>
                                <span class="conEllipsis">2</span>
                            </li>
                            <li>
                                <span>频率：</span>
                                <span class="conEllipsis">2294MHz</span>
                            </li>
                        </ul>
                    </div>
                    <div class="saveRoom">
                        <div class="picBox">
                            <img src="../../../../../static/property/img/memory.png" alt="">
                            <span>内存</span>
                        </div>
                        <ul class="saveRoomText">
                            <li>
                                <span>总量：</span>
                                <span class="conEllipsis">7.63GB</span>
                            </li>
                            <li>
                                <span>剩余量：</span>
                                <span class="conEllipsis">203.14MB</span>
                            </li>
                            <li>
                                <span>利用率：</span>
                                <span class="conEllipsis">71.13%</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gv6Right sameBox">
                    <div class="disk">
                        <div class="picBox">
                            <img src="../../../../../static/property/img/hard_disk.png" alt="">
                            <span>磁盘</span>
                        </div>
                        <ul class="diskText">
                            <li>
                                <span>总量：</span>
                                <span class="conEllipsis">95.18GB</span>
                            </li>
                            <li>
                                <span>剩余量：</span>
                                <span class="conEllipsis">49.29MB</span>
                            </li>
                            <li>
                                <span>利用率：</span>
                                <span class="conEllipsis">48.213%</span>
                            </li>
                        </ul>
                    </div>
                    <div class="fan">
                        <div class="picBox">
                            <img src="../../../../../static/property/img/cooler.png" alt="">
                            <span>风扇</span>
                        </div>
                        <ul class="fanText">
                            <li>
                                <span>数量：</span>
                                <span class="conEllipsis">0</span>
                            </li>
                            <li>
                                <span>状态：</span>
                                <span class="conEllipsis">?</span>
                            </li>
                            <li>
                                <span></span>
                                <span class="conEllipsis"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="gv6Middle">
                <div class="gv6Left sameBox">
                    <ul class="proStatus">
                        <li>
                            <img src="../../../../../static/property/img/open_close.png" alt="">
                            <span>开机</span>
                        </li>
                        <li>
                            <img src="../../../../../static/property/img/open_close.png" alt="">
                            <span>关机</span>
                        </li>
                        <li>
                            <img src="../../../../../static/property/img/rebuild.png" alt="">
                            <span>重启</span>
                        </li>
                    </ul>
                    <ul class="statusDetail">
                        <li>
                            <span>序列号</span><span>：未知</span>
                        </li>
                        <li>
                            <span>电源状态</span><span>：未知</span>
                        </li>
                        <li>
                            <span>功耗</span><span>：未知</span>
                        </li>
                        <li>
                            <span>告警数量</span><span>：4</span>
                        </li>
                        <li>
                            <span>温度</span><span>：温度</span>
                        </li>
                        <li>
                            <span>一分钟负载</span><span>：27.59</span>
                        </li>
                    </ul>
                </div>
                <div class="gv6Center sameBox">
                    <div id="cpuLine"></div>
                </div>
                <div class="gv6Right sameBox">
                    <div id="diskLine"></div>
                </div>
            </div>
            <div class="gv6Bottom">
                <div class="gv6Left sameBox">
                    <div id="temperatureLine"></div>
                </div>
                <div class="gv6Center sameBox">
                    <div id="cardSpeedLine">1</div>
                </div>
                <div class="gv6Right sameBox">
                    <div id="fanSpeedLine"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/property/serverDetail/public/NavBar"
import OtherFunction from "../../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return {
            prevPageText: "gv6",
            curPageText: "概览",
            // 资产详细数据
            gv6Data: {
                name: "gv64",
                details: [
                    {
                        itemDetail: ["机型","I620-G20"]
                    },
                    {
                        itemDetail: ["位置","27U - 28U/风冷机柜"]
                    },
                    {
                        itemDetail: ["管理IP","10.0.35.47"]
                    },
                    {
                        itemDetail: ["IPMI","?"]
                    },
                    {
                        itemDetail: ["操作系统","Red Hat Enterprise Linux Server release 7.4 (Maipo)"]
                    }
                ]
            },
            // CPU利用率数据
            cpuData: {
                yName: "CPU利用率",
                yLabel: "{value}"
            },
            // 内存利用率数据
            diskLine: {
                yName: "内存利用率",
                yLabel: "{value}"
            },
            // 温度数据
            temperatureLine: {
                yName: "温度",
                yLabel: "{value} ℃"
            },
            // 网卡速率数据
            cardSpeedLine: {
                yName: "网卡速率",
                yLabel: "{value} KB/s"
            },
            // 风扇转速数据
            fanSpeedLine: {
                yName: "风扇转速",
                yLabel: "{value}"
            }
        }
    },
    mounted(){
        this.drawLine(this.cpuData, "cpuLine")
        this.drawLine(this.diskLine, "diskLine")
        this.drawLine(this.temperatureLine, "temperatureLine")
        this.drawLine(this.cardSpeedLine, "cardSpeedLine")
        this.drawLine(this.fanSpeedLine, "fanSpeedLine")
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 绘制折线图表
        drawLine(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var _this = this
            var xData = []
            var newData = []
            var end = new Date()
            var start = new Date(end.getTime() - 1000*60*60)
            for(var i=0;i<=parseInt((end-start)/(1000*30));i++){
                var xDataItem = OtherFunction.getTime(end.getTime()+(1000*30*i), "h", true)
                xData.push(xDataItem)
                newData.push(this.random(this.random(100,600),this.random(600,1200)))
            }
            var option = {
                tooltip: {
                    trigger: "axis"
                },
                grid: {
                    left: "25%",
                    right: "5%",
                    top: "15%",
                    bottom: "15%"
                },
                xAxis: {
                    type : "category",
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: xData
                },
                yAxis: {
                    name: obj.yName,
                    nameTextStyle: {
                        padding: [-150,0,0,-110],
                        fontWeight: 600
                    },
                    nameRotate: 90,
                    type: "value",
                    splitLine: {
                        show: true
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show:false
                    },
                    axisLabel: {
                        formatter: obj.yLabel
                    }
                },
                series: [
                    {
                        name: "模拟数据",
                        type: "line",
                        showSymbol: false,
                        hoverAnimation: false,
                        data: newData
                    }
                ]
            }

            var timer = setInterval(function(){
                var xTime = new Date()
                xData.shift()
                newData.shift()
                xData.push(OtherFunction.getTime(xTime, "h", false))
                newData.push(_this.random(_this.random(100,600),_this.random(600,1200)))
                Mychart.setOption({
                    xAxis: {
                        data: xData
                    },
                    series: [{
                        data: newData
                    }]
                });
            },1000*5)

            Mychart.setOption(option)
            // 使图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        }
    },
    components: {
        NavBar
    }
}
</script>
<style>
/* 公共样式 */
.gv6OVPage .sameBox{
    height:100%;
    border:1px solid #ccc;
    box-sizing: border-box;
    float:left;
}
.gv6OVPage .conEllipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.gv6OVPage .picBox{
    width:20%;
    float:left;
}
.gv6OVPage .picBox>img,
.gv6OVPage .picBox>span{
    display:block;
}
.gv6OVPage .picBox>img{
    margin: 15% 0 0 30%;
}
.gv6OVPage .picBox>span{
    width:100%;
    height:20px;
    font-size:12px;
    text-align:center;
}
/* 页面样式 */
.gv6OVPage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6OVPage .gv6Content{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 20px 20px 170px;
}
/* 页面各模块样式 */
.gv6OVPage .gv6Content .gv6Top,
.gv6OVPage .gv6Content .gv6Middle,
.gv6OVPage .gv6Content .gv6Bottom{
    width:100%;
    height:200px;
    margin-bottom:20px;
    overflow:hidden;
}
.gv6OVPage .gv6Content .gv6Bottom{
    height:250px;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left,
.gv6OVPage .gv6Content .gv6Top>.gv6Center,
.gv6OVPage .gv6Content .gv6Top>.gv6Right{
    width:33.3%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left,
.gv6OVPage .gv6Content .gv6Middle>.gv6Center,
.gv6OVPage .gv6Content .gv6Middle>.gv6Right,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Left,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Center,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Right{
    width:32.5%;
    margin-right:1.25%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Right,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Right{
    margin-right:0;
}
/* 资产详细信息模块样式 */
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:4%;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro h4{
    display: block;
    height:40px;
    width:100%;
    font-size: 24px;
    font-weight: normal;
    line-height: 40px;
    margin-bottom:5px;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro>li{
    width: 100%;
    font-size: 12px;
    line-height: 25px;
    overflow:hidden;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro>li>span{
    display:block;
    height:25px;
    float:left;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro>li>span:nth-child(1){
    width:15%;
    font-weight: 600;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Left .detailPro>li>span:nth-child(2){
    width:85%;
}
/* 存储空间样式 */
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU,
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan{
    width:100%;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk{
    border-bottom:1px solid #ccc;
    overflow:hidden;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText,
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText{
    width:80%;
    overflow:hidden;
    float:right;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText>li,
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText>li,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText>li,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText>li{
    width:100%;
    height:33px;
    box-sizing: border-box;
    border-bottom:1px dashed #ccc;
    line-height:33px;
    font-size:12px;
    overflow: hidden;
    padding:0 10px;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText>li:nth-last-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText>li:nth-last-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText>li:nth-last-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText>li:nth-last-child(1){
    border:none;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText>li>span,
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText>li>span,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText>li>span,
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText>li>span{
    display:block;
    float:left;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText>li>span:nth-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText>li>span:nth-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText>li>span:nth-child(1),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText>li>span:nth-child(1){
    width:20%;
    font-weight: 600;
}
.gv6OVPage .gv6Content .gv6Top>.gv6Center .CPU .cpuText>li>span:nth-child(2),
.gv6OVPage .gv6Content .gv6Top>.gv6Center .saveRoom .saveRoomText>li>span:nth-child(2),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .disk .diskText>li>span:nth-child(2),
.gv6OVPage .gv6Content .gv6Top>.gv6Right .fan .fanText>li>span:nth-child(2){
    width:80%;
    text-align:right;
}
/* 资产状态样式 */
.gv6OVPage .gv6Content .gv6Middle>.gv6Left{
    box-sizing: border-box;
    padding:1% 2%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .proStatus{
    width:100%;
    height:25%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .proStatus>li{
    width:20%;
    height:100%;
    float:left;
    box-sizing: border-box;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .proStatus>li>img{
    width: 20px;
    height: 20px;
    float: left;
    margin: 17% 5%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .proStatus>li>span{
    float: left;
    font-size: 15px;
    margin: 17% 0;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .statusDetail{
    width:100%;
    height:75%;
    margin-top:5%;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .statusDetail>li{
    width:50%;
    height:25%;
    float:left;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .statusDetail>li>span:nth-child(1){
    width:40%;
    height:100%;
    float:left;
    font-size:12px;
    font-weight: 600;
}
.gv6OVPage .gv6Content .gv6Middle>.gv6Left .statusDetail>li>span:nth-child(2){
    width:60%;
    height:100%;
    float:left;
    font-size:12px;
}
/* 相关曲线图容器样式 */
.gv6OVPage .gv6Content .gv6Middle>.gv6Center #cpuLine,
.gv6OVPage .gv6Content .gv6Middle>.gv6Right #diskLine,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Left #temperatureLine,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Center #cardSpeedLine,
.gv6OVPage .gv6Content .gv6Bottom>.gv6Right #fanSpeedLine{
    width:100%;
    height:100%;
    padding:2%;
    box-sizing: border-box;
}
</style>


