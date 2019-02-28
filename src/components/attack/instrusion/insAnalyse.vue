<template>
    <div class="conBox">
        <div class="IAtop structure boxes">
            <h6>攻击汇总</h6>
            <div class="mainList boxContent">
                <div class="selectTime" style="margin-bottom:5px;">
                    <span class="label">时间：</span>
                    <el-date-picker v-model="listDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    @change="selectListLimit(listDateValue)">
                    </el-date-picker>
                </div>
                <div id="IntrusionList">
                    <el-table :data="IntrusionList" height="100%"
                                border style="width: 100%" stripe
                                :header-row-style="{height: '40px;'}"
                                :row-style="{height: '35px'}">
                        <el-table-column prop="oneDayTimes" label="近24小时遭受攻击次数"></el-table-column>
                        <el-table-column prop="oneWeekTimes" label="近7天遭受攻击次数"></el-table-column>
                        <el-table-column prop="oneMonthTimes" label="近30天遭受攻击次数"></el-table-column>
                        <el-table-column prop="selTimeTimes" label="自定义时间汇总次数"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="IAmiddle structure">
            <div class="IAleft boxes left">
                <h6>攻击分类</h6>
                <div class="mainBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="barTimeValue" filterable placeholder="请选择"
                                @change="getLimitTime(barTimeValue, IntrusionKind)">
                        <el-option v-for="item in barTimeOptions" :key="item.value"
                                    :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="barDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="barTimeValue == '自定义'"
                                    @change="selectLimitTime(barDateValue, IntrusionKind)">
                    </el-date-picker>
                    <div id="IntrusionKind" class="echart"></div>
                </div>
            </div>
            <div class="IAright boxes right">
                <h6>攻击总数趋势</h6>
                <div class="mainLine boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="lineTimeValue" filterable placeholder="请选择"
                                @change="getLimitTime(lineTimeValue, IntrusionLine)">
                        <el-option v-for="item in lineTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="lineDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="lineTimeValue == '自定义'"
                                    @change="selectLimitTime(lineDateValue, IntrusionLine)">
                    </el-date-picker>
                    <div id="IntrusionLine" class="echart"></div>
                </div>
            </div>
        </div>
        <div class="IAbottom structure boxes">
            <h6>被攻击ip趋势</h6>
            <div class="mainIpLine boxContent echartBox">
                <span class="label">时间：</span>
                <el-select v-model="ipTimeValue" filterable placeholder="请选择"
                        @change="getLimitTime(ipTimeValue, IPLine)">
                    <el-option v-for="item in ipTimeOptions" :key="item.value"
                            :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="ipDateValue" type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                v-if="ipTimeValue == '自定义'"
                                @change="selectLimitTime(ipDateValue, IPLine)">
                </el-date-picker>
                <div id="IPLine" class="echart"></div>
            </div>
        </div>
    </div>
</template>
<script>
import OtherFunction from "../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            // 攻击分类饼图数据
            IntrusionKind: {
                type: "kind",
                seriesData: {
                    value: [100,200,300,400,500,50],
                    name: ["蠕虫病毒","木马后门","缓冲溢出","安全绕过","CC攻击","其他"]
                }
            },
            // 饼图可选时间选择框数据
            barTimeOptions: [
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
            // 饼图选择后的时间值
            barTimeValue: "24小时",
            barDateValue: "",
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }, 

            // 攻击趋势线图数据
            IntrusionLine: {
                type: "line",
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        data: [300,456,345,126,367,444]
                    }
                ]
            },
            // 线图可选时间选择框数据
            lineTimeOptions: [
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
            // 曲线图选择后的时间值
            lineTimeValue: "24小时",
            lineDateValue: "",

            // 制作攻击趋势图表
            IPLine: {
                type: "ipLine",
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        name: "219.234.94.233",
                        data: [300,456,345,126,367,444]
                    },
                    {
                        name: "219.234.94.234",
                        data: [0,0,0,0,0,0]
                    },
                    {
                        name: "219.234.94.233",
                        data: [10,10,10,10,10,10]
                    },
                    {
                        name: "219.234.94.233",
                        data: [20,20,20,20,20,20]
                    },
                    {
                        name: "219.234.94.233",
                        data: [30,30,30,30,30,30]
                    }
                ]
            },
            // 线图可选时间选择框数据
            ipTimeOptions: [
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
            // 曲线图选择后的时间值
            ipTimeValue: "24小时",
            ipDateValue: "",

            // 攻击汇总数据
            IntrusionList: [
                {
                    oneDayValley: 200,
                    oneDayTimes: 400,
                    oneWeekValley: 200,
                    oneWeekTimes: 400,
                    oneMonthValley: 200,
                    oneMonthTimes: 400,
                    selTimeValley: 200,
                    selTimeTimes: 400
                }
            ],
            // 攻击汇总可选时间选择框数据
            listTimeOptions: [
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
            // 攻击汇总选择后的时间值
            listDateValue: [],
        }
    },
    mounted(){
        // 绘制攻击分类图表
        // this.drawIntrusionKind(this.IntrusionKind)
        this.initEchartData(this.IntrusionKind)
        // 绘制攻击趋势图表
        // this.drawIntrusionLine(this.IntrusionLine, 0, 100)
        this.initEchartData(this.IntrusionLine)
        // 绘制被攻击目的ip趋势图表
        // this.drawIPLine(this.IPLine, 0, 100)
        this.initEchartData(this.IPLine)
        // 绘制初始攻击汇总表格
        this.initIntList()
    },
    methods:{
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },

        // 初始攻击汇总列表数据
        initIntList(){
            var now = new Date()
            var start = new Date(now.getTime() - 1000*60*60*24*30)
            this.listDateValue  = [
                new Date(start.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
            this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_ips&key=idssyslog_type")
                .then((res) => {
                    this.IntrusionList[0].oneDayTimes = parseInt(res.data[0].count/7)
                    this.IntrusionList[0].oneWeekTimes = res.data[0].count
                    this.IntrusionList[0].oneMonthTimes = parseInt((res.data[0].count/7)*30)
                    this.IntrusionList[0].selTimeTimes = parseInt((res.data[0].count/7)*30)
                }).catch((err) => {
                    console.log(err)
                })
        },
        // 获取攻击汇总选择时间范围
        selectListLimit(value){
            this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_ips&key=idssyslog_type")
                .then((res) => {
                    this.IntrusionList[0].selTimeTimes = parseInt((res.data[0].count/7)*40)
                }).catch((err) => {
                    console.log(err)
                })
        },
        initEchartData(obj){
            var timeLimit = OtherFunction.getLimitTime("24小时")
            // 判断选择的值，返回相应的时间
            var start = OtherFunction.getLimitTime("24小时")[0]
            var now = OtherFunction.getLimitTime("24小时")[1]
            this.changeData(obj, start, now)
        },
        // 制作攻击分类图表
        drawIntrusionKind(obj){
            let Mychart = this.$echarts.init(document.getElementById("IntrusionKind"))
            var seriesData = []
            var legendData = []
            obj.seriesData.value.map((item, index) => {
                var seriesItem = {
                    value: item,
                    name: obj.seriesData.name[index]
                }
                legendData.push(obj.seriesData.name[index])
                seriesData.push(seriesItem)
            })
            let option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    right: "10%",
                    top: "0%",
                    data: legendData
                },
                series: [
                    {
                        name:"访问来源",
                        type:"pie",
                        radius: ["54%", "79%"],
                        center: ["35%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: "outside"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "normal"
                                }
                            }
                        },
                        data: seriesData,
                        label: {
                            normal: {
                                show: true,
                                position: "ouside",
                                color: "#666",
                                // formatter: function (params){
                                //     if(params["name"].length > 5){
                                //         return params["name"].substring(0, 5) + "..."
                                //     }else{
                                //         return params["name"]
                                //     }  
                                // }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 9,
                                length2: 10,
                                lineStyle: {
                                    color: "#666" // 改变标示线的颜色
                                }
                            }
                        }
                    }
                ]
            }
            Mychart.setOption(option)
            // 用于echarts自适应宽和高
            window.onresize = function(){
                Mychart.resize()
            }
        },
        // 制作攻击趋势图表
        drawIntrusionLine(obj, start, end){
            let Mychart = this.$echarts.init(document.getElementById("IntrusionLine"))
            let option = {
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1","#00cd64","#009a00","#305d18"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left:"13%",
                    top: "14%",
                    right: "6%",
                    bottom: "32%"
                },
                dataZoom: [
                    {
                        type: "inside",
                        start: start,
                        end: end
                    },
                    {
                        start: start,
                        end: end,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        zoomLock: true
                    }
                ],
                legend: {
                    data: [
                        {
                            name: "普通攻击",
                            icon: "rect"
                        },
                        {
                            name: "针对性攻击",
                            icon: "rect"
                        }
                    ],
                    textStyle: {
                        color: "#999"
                    },
                    itemWidth: 20,
                    itemHeight: 2
                },
                xAxis: {
                    type: "category",
                    data: obj.xData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                        color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#999"
                    },
                    boundaryGap : false,
                },
                yAxis: {
                    type: "value",
                    name: "次数",
                    nameTextStyle: {
                        color: "#999",
                        padding:[0,0,0,-30]
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        label: {
                            textStyle: {
                                color: "#999"
                            },
                        }
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: "{value}",
                        color: "#999"
                    }
                },
                series: [
                    {
                        data: obj.series[0].data,
                        type: "line",
                        name: "攻击总数",
                        symbol: "none",
                        smooth: true
                    }
                ]
          };
          Mychart.setOption(option)

          //用于使chart自适应高度和宽度
          window.onresize = function() {
            Mychart.resize()
          }
        },
        // 制作攻击趋势图表
        drawIPLine(obj, start, end){
            let Mychart = this.$echarts.init(document.getElementById("IPLine"))
            let option = {
                color: ["#06edd9","#73ba90","#8ec319","#f4c61b","#f70007","#00ff00","#0000fe"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "10%",
                    top: "20%",
                    right: "10%",
                    bottom: "28%"
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
                        },
                        {
                            name: obj.series[3].name,
                            icon: "rect"
                        },
                        {
                            name: obj.series[4].name,
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
                        type: "inside",
                        start: start,
                        end: end
                    },
                    {
                        start: start,
                        end: end,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        zoomLock: true
                    }
                ],
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: obj.xData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                        color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#999"
                    },
                    boundaryGap : false,
                },
                yAxis: {
                    type: "value",
                    type: "value",
                    name: "次数",
                    nameTextStyle: {
                        color: "#999",
                        padding:[0,0,0,-30]
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        label: {
                            textStyle: {
                                color: "#999"
                            },
                        }
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: "{value}",
                        color: "#999"
                    }
                },
                series: [
                    {
                        name: obj.series[0].name,
                        data: obj.series[0].data,
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        symbol: "none"
                    },
                    {
                        name: obj.series[1].name,
                        data: obj.series[1].data,
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        symbol: "none"
                    },
                    {
                        name: obj.series[2].name,
                        data: obj.series[2].data,
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        symbol: "none"
                    },
                    {
                        name: obj.series[3].name,
                        data: obj.series[3].data,
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        symbol: "none"
                    },
                    {
                        name: obj.series[4].name,
                        data: obj.series[4].data,
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        symbol: "none"
                    }
                ]
            };

            Mychart.setOption(option)

            //用于使chart自适应高度和宽度
            window.onresize = function() {
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
                this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_ips&key=EventType")
                    .then((res) => {
                        // 用来接收新数据的数组
                        var newData = {
                            type: "kind",
                            seriesData: {
                                value: [],
                                name: []
                            }
                        }
                        res.data.map((item, index) => {
                            newData.seriesData.value.push(item.count)
                            newData.seriesData.name.push(item.item)
                        })
                        // 请求成功后处理数据
                        var seriesValue = []
                        var seriesName = []
                        // 将数据排序，提取出最大的几个数及其下标
                        var needObj = OtherFunction.arrRank(newData.seriesData.value, 6)
                        // 其他项数据总和
                        var other = 0
                        needObj.needArr.map((item, index) => {
                            if(index < 5){
                                seriesValue.push(item)
                                seriesName.push(newData.seriesData.name[needObj.indexArr[index]])
                            }else{
                                other+= item
                            }
                        })
                        seriesName.push("其他")
                        seriesValue.push(other)
                        // 将处理后的数组赋值给存放新数据的数组
                        var endObj = {
                            type: "kind",
                            seriesData: {
                                value: seriesValue,
                                name: seriesName
                            }
                        }
                        this.drawIntrusionKind(endObj)
                    })
            }else if(changeObj.type == "line"){
                this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_ips&key=idssyslog_type")
                    .then((res) => {
                        // 存放新数据
                        var newData = {
                            type: "line",
                            xData: [],
                            series: [
                                {
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
                            var resCount = res.data[0].count
                            for(var k=0;k<changeObj.series.length;k++){
                                var nowValue = resCount*1 + this.random(-10000,20000)
                                newData.series[k].data.unshift(nowValue)
                            }
                            itemTime = new Date(itemTime.getTime()-1000*60*10)
                        }
                        if(parseInt(diff/(60*24)) >= 7){
                            this.drawIntrusionLine(newData, 0, 1)
                        }else if(parseInt(diff/60) >= 12){
                            this.drawIntrusionLine(newData, 0, 10)
                        }else{
                            this.drawIntrusionLine(newData, 0, 100)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            }else if(changeObj.type == "ipLine"){
                this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_ips&key=DstIP&topn=5")
                    .then((res) => {
                        var seriesArr = []
                        for(var i=0;i<changeObj.series.length;i++){
                            var itemData = {
                                name: "",
                                data: []
                            }
                            seriesArr.push(itemData)
                        }
                        // 存放新数据
                        var newData = {
                            type: "line",
                            xData: [],
                            series: seriesArr
                        }
                        // 计算时间差
                        var startCom = new Date(start)
                        var endCom = new Date(end)
                        var diff = parseInt((endCom.getTime() - startCom.getTime())/(1000*60))
                        // 改变数据
                        var itemTime = new Date(end)
                        var resCount = []
                        res.data.map((item, index) => {
                            resCount.push(item.count)
                            newData.series[index].name = item.item
                        })

                        for(var i=0;i<parseInt(diff/10)+1;i++){
                            var xItem = OtherFunction.getTime(itemTime,"y",false)
                            newData.xData.unshift(xItem.replace(" ","\n"))
                            // 模拟数据
                            for(var k=0;k<changeObj.series.length;k++){
                                var nowValue = resCount[k]*1 + this.random(-1000,500)
                                newData.series[k].data.unshift(nowValue)
                            }
                            itemTime = new Date(itemTime.getTime()-1000*60*10)
                        }
                        if(parseInt(diff/(60*24)) >= 7){
                            this.drawIPLine(newData, 0, 1)
                        }else if(parseInt(diff/60) >= 12){
                            this.drawIPLine(newData, 0, 10)
                        }else{
                            this.drawIPLine(newData, 0, 100)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        },
    }
}
</script>
<style>
/* 页面分区区块样式 */
.intrusionPage .Icontent .IAmiddle,
.intrusionPage .Icontent .IAbottom{
    height:300px;
}
.intrusionPage .Icontent .IAtop{
    min-height:180px;
}
</style>
