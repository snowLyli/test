<template>
    <div class="conBox">
        <div class="AOPtop">
            <div class="AOPleft boxes">
                <h6>实时统计</h6>
                <div id="realTimeBar" class="echart"></div>
            </div>
            <div class="AOPcenter boxes">
                <h6>告警等级</h6>
                <div class="randBox boxContent echartBox">
                    <span class="label">时间:</span>
                    <el-select v-model="rankTimeValue" filterable placeholder="请选择"
                                @change="getLimitTime(rankTimeValue, rankKindData)">
                        <el-option v-for="item in rankOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="rankDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    v-if="rankTimeValue == '自定义'"
                                    @change="selectLimitTime(rankDateValue, rankKindData)">
                    </el-date-picker>
                    <div id="rankKind" class="echart"></div>
                </div>
            </div>
            <div class="AOPright boxes">
                <h6>资产告警Top10</h6>
                <div class="top10Box boxContent echartBox">
                    <span class="label">时间:</span>
                    <el-select v-model="top10TimeValue" filterable placeholder="请选择"
                                @change="getLimitTime(top10TimeValue, top10Bar)">
                        <el-option v-for="item in top10Options" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="top10DateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    v-if="top10TimeValue == '自定义'"
                                    @change="selectLimitTime(top10DateValue, top10Bar)">
                    </el-date-picker>
                    <div id="top10Bar" class="echart"></div>
                </div>
            </div>
        </div>
        <div class="AOPbottom">
            <div class="AOPleft boxes left">
                <h6>历史统计</h6>
                <div class="hisLineBox boxContent echartBox">
                    <span class="label">时间:</span>
                    <el-select v-model="hisTimeValue" filterable placeholder="请选择"
                                @change="getLimitTime(hisTimeValue, hisLineData)">
                        <el-option v-for="item in hisOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="hisDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    v-if="hisTimeValue == '自定义'"
                                    @change="selectLimitTime(hisDateValue, hisLineData)">
                    </el-date-picker>
                    <div id="hisLine" class="echart"></div>
                </div>
            </div>
            <div class="AOPright boxes right">
                <h6>服务器告警类型Top5</h6>
                <div id="top5Bar" class="echart"></div>
                <div id="tip"></div>
            </div>
        </div>
    </div>
</template>
<script>
import OtherFunction from "../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            // 告警统计数据
            rankKindData: {
                type: "kind",
                data: [
                    {value:335, name:"严重"},
                    {value:310, name:"重要"},
                    {value:234, name:"一般"},
                    {value:135, name:"轻微"}
                ]     
            },
            // 资产告警top10选择值
            rankOptions: [
                {
                    value: "选项1",
                    label: "24小时"
                },
                {
                    value: "选项2",
                    label: "7天"
                },
                {
                    value: "选项3",
                    label: "30天"
                },
                {
                    value: "选项4",
                    label: "自定义"
                },
            ],
            rankTimeValue: "24小时",
            rankDateValue: "",

            // 资产类型实时告警统计
            realTimeBar: {
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "5%",
                    containLabel: true
                },
                xData: ["计算设备","网络设备","安全设备"],
                showLegend: true,
                seriesData: [
                    {
                        name: "严重",
                        data: [320, 332, 301],
                        showStack: true,
                        stack: "数量",
                    },
                    {
                        name: "重要",
                        data: [120, 132, 101],
                        showStack: true,
                        stack: "数量",
                    },
                    {
                        name: "一般",
                        data: [220, 182, 191],
                        showStack: true,
                        stack: "数量",
                    },
                    {
                        name: "轻微",
                        data: [150, 232, 201],
                        showStack: true,
                        stack: "数量",
                    }
                ],
                click: false
            },

            // 资产告警top10数据
            top10Bar: {
                type: "bar",
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "5%",
                    top: "10%",
                    containLabel: true
                },
                xData: ["gv11","slave3","gv47","vmhost22","gvhost57","centos6","sles11","sles11","gv174","rhel6u3"],
                showLegend: false,
                seriesData: [
                    {
                        data: [29, 9, 8, 7, 7, 3, 3, 3, 3, 3],
                        showStack: false,
                    }
                ],
                click: true,
            },
            // 资产告警top10选择值
            top10Options: [
                {
                    value: "选项1",
                    label: "24小时"
                },
                {
                    value: "选项2",
                    label: "7天"
                },
                {
                    value: "选项3",
                    label: "30天"
                },
                {
                    value: "选项4",
                    label: "自定义"
                },
            ],
            top10TimeValue: "24小时",
            top10DateValue: "",

            // 资产告警top10数据
            hisLineData: {
                type: "line",
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        name: "计算设备",
                        data: [300,456,345,126,367,444]
                    },
                    {
                        name: "网络设备",
                        data: [400,556,445,226,467,544]
                    },
                    {
                        name: "安全设备",
                        data: [200,356,245,26,267,344]
                    }
                ]
            },
            // 资产告警top10选择值
            hisOptions: [
                {
                    value: "选项1",
                    label: "24小时"
                },
                {
                    value: "选项2",
                    label: "7天"
                },
                {
                    value: "选项3",
                    label: "30天"
                },
                {
                    value: "选项4",
                    label: "自定义"
                },
            ],
            hisTimeValue: "24小时",
            hisDateValue: "",
        }
    },
    mounted(){
        // 监控概览图表
        this.drawBar(this.realTimeBar, "realTimeBar")
        this.drawBar(this.top10Bar, "top10Bar")
        this.drawRowBar("top5Bar")
        this.drawLine(this.hisLineData, 0, 100)
        this.drawKind(this.rankKindData, "rankKind")
    },
    methods:{
        random(max, min){
            return parseInt(Math.random()*(max-min)+min)
        },

        // 绘制柱状图
        drawBar(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var legendData = []
            var newData = []
            obj.seriesData.map((item, index) => {
                legendData.push(item.name)
                var seriesItem = {
                    name: obj.showLegend ? item.name : "",
                    type: "bar",
                    stack: item.showStack ? item.stack : "",
                    barWidth: "20px",
                    data: item.data,
                    barCategoryGap: "10%"
                }
                newData.push(seriesItem)
            })
            var option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip : {
                    trigger: "axis",
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : "shadow"        // 默认为直线，可选为："line" | "shadow"
                    }
                },
                legend: {
                    left: "3%",
                    top: "5%",
                    itemWidth: 20,
                    height: 10,
                    data: obj.showLegend ? legendData : []
                },
                grid: obj.grid,
                xAxis: {
                    type: "category",
                    axisLabel: {
                        rotate: 45
                    },
                    data: obj.xData,
                    triggerEvent:true
                },
                yAxis:{
                    type: "value"
                },
                series: newData
            }
            if(obj.click){
                var _this = this
                Mychart.on("click", function (params) {
                    if(params.componentType == "xAxis"){
                        _this.showThisNav("1")
                        _this.proNameValue = params.value
                        _this.searchMsgBySelect()
                    }
                    if(params.componentType == "series"){
                        _this.showThisNav("1")
                        _this.proNameValue = params.name
                        _this.searchMsgBySelect()
                    }
                    
                })
            }
            
            Mychart.setOption(option)
            // echart自动适应高度和宽度
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 绘制横向柱状图
        drawRowBar(id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "15%",
                    right: "8%",
                    top: "14%",
                    bottom: "14%"
                },
                xAxis: {
                    type: "value",
                    name: "个数"
                },
                yAxis: {
                    type: "category",
                    name: "类型",
                    nameLocation: "start",
                    inverse: true,
                    data: [
                        "5分钟负载过高", 
                        "15分钟负载过高", 
                        "磁盘分区空间不足", 
                        "window管理网盘", 
                        "window磁盘分类"
                    ],
                    axisLabel: {
                        formatter: function (params){
                            if(params.length > 4){
                                return params.substring(0, 4) + "..."
                            }else{
                                return params
                            }  
                        }
                    },
                    triggerEvent: true
                },
                series: [
                    {
                        name: "告警数量",
                        type: "bar",
                        barWidth: 25,
                        data: [5, 5, 3, 3, 1]
                    }
                ]
            }

            Mychart.on("mouseover", function (params) {
                if(params.componentType == "yAxis"){
                    if(params.value.length > 4){
                        var tt = document.getElementById("tip");
                        tt.innerHTML = params.value;
                        tt.style.left = params.event.event.pageX + 10 + "px"
                        tt.style.top = params.event.event.pageY + 10 + "px"
                        tt.style.display = "block"
                    }
                }
            })
            Mychart.on("mouseout", function (params) {
                var tt = document.getElementById("tip");
                tt.style.display = "none"
            })

            Mychart.setOption(option)
            // 是echarts图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 绘制曲线图
        drawLine(obj, start, end){
            var Mychart = this.$echarts.init(document.getElementById("hisLine"))

            var option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip : {
                    trigger: "axis",
                    axisPointer : {
                        type : "shadow"
                    }
                },
                grid: {
                    left: "10%",
                    right: "10%",
                    top: "13%",
                    bottom: "25%"
                },
                legend: {
                    data: [
                        {
                            name: obj.series[0].name,
                            icon: "rect"
                        },
                        {
                            name: obj.series[1].name,
                            icon: "rect"
                        },
                        {
                            name: obj.series[2].name,
                            icon: "rect"
                        }
                    ],
                    textStyle: {
                        color: "#999"
                    },
                    itemWidth: 20,
                    itemHeight: 2
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        // width:200,
                        height: 20,
                        bottom: 3,
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        zoomLock: true,
                        start: start,
                        end: end,
                        // left: "25%", //左边的距离
                    }
                ],
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: obj.xData,
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: obj.series[0].data,
                        type: "line",
                        name: obj.series[0].name,
                        smooth: true,
                        areaStyle: {},
                        symbol: "none"
                    },
                    {
                        data: obj.series[1].data,
                        type: "line",
                        name: obj.series[1].name,
                        smooth: true,
                        areaStyle: {},
                        symbol: "none"
                    },
                    {
                        data: obj.series[2].data,
                        type: "line",
                        name: obj.series[2].name,
                        smooth: true,
                        areaStyle: {},
                        symbol: "none"
                    }
                ]
            }

            Mychart.setOption(option)
            // 使echarts图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 绘制告警统计饼图
        drawKind(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    right: "8%",
                    top: "25%",
                    data:["严重","重要","一般","轻微"]
                    
                },
                series: [
                    {
                        name:"访问来源",
                        type:"pie",
                        radius: ["50%", "75%"],
                        center: ["40%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:obj.data
                    }
                ]
            }

            Mychart.setOption(option)
            // 使echarts图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 获取选择时间数据
        getLimitTime(value, changeObj){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(changeObj, start, now)
            }
        },
        selectLimitTime(value, changeObj){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(changeObj, start, now)
        },
        // 改变图表数据
        changeData(changeObj, start, end){
            // 判断传入的数据属于哪一类型的表格
            if(changeObj.type == "kind"){
                // this.$axios.post("http://10.0.24.128:9001/query_esdata?index=ids_ips&key=EventType")
                    // .then((res) => {
                        // 用来接收新数据的数组
                        var newData = {
                            type: "kind",
                            data: [
                                {value:this.random(0, 100), name:"严重"},
                                {value:this.random(100, 200), name:"重要"},
                                {value:this.random(200, 300), name:"一般"},
                                {value:this.random(100, 200), name:"轻微"}
                            ]
                        }
                        this.drawKind(newData, "rankKind")
                    // })
            }else if(changeObj.type == "line"){
                // this.$axios.post("http://10.0.24.128:9001/query_esdata?index=ids_ips&key=idssyslog_type")
                    // .then((res) => {
                        // 存放新数据
                        var newData = {
                            type: "line",
                            xData: [],
                            series: [
                                {
                                    name: "计算设备",
                                    data: []
                                },
                                {
                                    name: "网络设备",
                                    data: []
                                },
                                {
                                    name: "安全设备",
                                    data: []
                                }
                            ]
                        }
                        // 计算时间差
                        var startCom = new Date(start)
                        var endCom = new Date(end)
                        var diff = parseInt((endCom.getTime() - startCom.getTime())/(1000*60))
                        // 改变数据
                        var itemTime = new Date(end)
                        for(var i=0;i<parseInt(diff/10)+1;i++){
                            var xItem = OtherFunction.getTime(itemTime,"y",false)
                            newData.xData.unshift(xItem.replace(" ","\n"))
                            // 模拟数据
                            var resCount = 350
                            for(var k=0;k<changeObj.series.length;k++){
                                var nowValue = resCount*1 + this.random(-100,100)
                                newData.series[k].data.unshift(nowValue)
                            }
                            itemTime = new Date(itemTime.getTime()-1000*60*10)
                        }
                        if(parseInt(diff/(60*24)) >= 7){
                            this.drawLine(newData, 0, 1)
                        }else if(parseInt(diff/60) >= 12){
                            this.drawLine(newData, 0, 10)
                        }else{
                            this.drawLine(newData, 0, 100)
                        }
                    // }).catch((err) => {
                        // console.log(err)
                    // })
            }else if(changeObj.type == "bar"){
                // this.$axios.post("http://10.0.24.128:9001/query_esdata?index=ids_ips&key=DstIP&topn=5")
                    // .then((res) => {
                        // 存放新数据
                        var newData = {
                            type: "bar",
                            grid: {
                                left: "3%",
                                right: "4%",
                                bottom: "5%",
                                top: "10%",
                                containLabel: true
                            },
                            xData: [],
                            showLegend: false,
                            seriesData: [
                                {
                                    data: [],
                                    showStack: false
                                }
                            ]
                        }
                        // 模拟数据
                        var proName = [
                            "gv11",
                            "slave3",
                            "gv47",
                            "vmhost22",
                            "gvhost57",
                            "centos6",
                            "sles11",
                            "sles11",
                            "gv174",
                            "rhel6u3"
                        ]
                        for(var i=0;i<10;i++){
                            newData.xData.push(proName[i])
                            newData.seriesData[0].data.push(this.random(0,100))
                        }
                        // 请求成功后处理数据
                        var xDataName = []
                        var seriesName = []
                        // 将数据排序，提取出最大的几个数及其下标
                        var needObj = OtherFunction.arrRank(newData.seriesData[0].data, 10)
                        // 将排序后的数重新赋值
                        needObj.needArr.map((item, index) => {
                            xDataName.push(proName[needObj.indexArr[index]])
                            seriesName.push(item)
                        })
                        // 将处理后的数组赋值给存放新数据的数组
                        var endObj = {
                            type: "bar",
                            grid: {
                                left: "3%",
                                right: "4%",
                                bottom: "5%",
                                top: "10%",
                                containLabel: true
                            },
                            xData: xDataName,
                            showLegend: false,
                            seriesData: [
                                {
                                    data: seriesName,
                                    showStack: false
                                }
                            ]
                        }
                        this.drawBar(endObj, "top10Bar")
                    // }).catch((err) => {
                        // console.log(err)
                    // })
            }
        },
    }
}
</script>
<style>
.AOPtop,.AOPbottom{
    height:300px;
}
.AOPtop .AOPleft,.AOPtop .AOPcenter,.AOPtop .AOPright{
    height:90%;
    float:left;
    margin-right:1%;
}
.AOPtop .AOPleft{
    width:24%;
}
.AOPtop .AOPcenter,
.AOPtop .AOPright{
    width:37%;
}
.AOPtop .AOPright{
    margin-right:0;
}
</style>