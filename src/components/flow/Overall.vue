<template>
    <div class="overallPage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Ocentent contents">
            <div class="switchBox" style="margin-top:0px;">
                <div class="switch" @click="refreshByself">
                    <input type="checkbox" id="refresh"><label for="refresh">是否开启自动刷新</label>
                </div>
            </div>
            <div class="conBox">
                <div class="Oup structure boxes">
                    <h6>累计流量</h6>
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
                        <div id="addUpList">
                            <el-table :data="addUpList" height="100%"
                                      border style="width: 100%" stripe
                                      :header-row-style="{height: '40px;'}"
                                      :row-style="{height: '35px'}">
                                <el-table-column prop="tenMinutes" label="近10分钟流量"></el-table-column>
                                <el-table-column prop="oneHour" label="近1小时流量"></el-table-column>
                                <el-table-column prop="oneDay" label="近1天流量"></el-table-column>
                                <el-table-column prop="allAddUp" label="总累计流量"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="Odown">
                    <div class="Oleft">
                        <div class="Otop structure boxes">
                            <h6>实时流量</h6>
                            <div class="mainLine boxContent">
                                <span class="label">时间:</span>
                                <el-select v-model="overLineTime" filterable placeholder="请选择"
                                            @change="selectLimitTime(overLineTime, 'overLine')">
                                    <el-option v-for="item in overLineOptions" :key="item.value"
                                                :label="item.label" :value="item.label">
                                    </el-option>
                                </el-select>
                                <el-date-picker v-model="overLineDate" type="datetimerange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                :picker-options="pickerOptions"
                                                v-if="overLineTime == '自定义'"
                                                @change="selectLimitDate(overLineDate, 'overLine')">
                                </el-date-picker>
                                <div id="overLine"></div>
                            </div>
                        </div>
                        <div class="Ocenter structure boxes">
                            <h6>实时流量峰值</h6>
                            <div class="mainList boxContent">
                                <div class="selectTime" style="margin-bottom:5px;">
                                    <span class="label">时间：</span>
                                    <el-date-picker v-model="peakFlowValue" type="datetimerange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    :picker-options="pickerOptions"
                                                    @change="selectPeakFlow">
                                    </el-date-picker>
                                </div>
                                <div id="peakFlowList">
                                    <el-table :data="peakFlowList" height="100%"
                                              border style="width: 100%" stripe
                                              :header-row-style="{height: '40px;'}"
                                              :row-style="{height: '35px'}">
                                        <el-table-column prop="time" label="时间"></el-table-column>
                                        <el-table-column prop="peak" label="峰值(GB)"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div class="Obottom structure boxes">
                            <h6>实时流量谷值</h6>
                            <div class="mainList boxContent">
                                <div class="selectTime" style="margin-bottom:5px;">
                                    <span class="label">时间：</span>
                                    <el-date-picker v-model="valleyFlowValue" type="datetimerange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    :picker-options="pickerOptions"
                                                    @click="selectValleyFlow">
                                    </el-date-picker>
                                </div>
                                <div id="valleyFlowList">
                                    <el-table :data="valleyFlowList" height="100%"
                                            border style="width: 100%" stripe
                                            :header-row-style="{height: '40px;'}"
                                            :row-style="{height: '35px'}">
                                        <el-table-column prop="time" label="时间"></el-table-column>
                                        <el-table-column prop="valley" label="谷值(GB)"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Oright">
                        <div class="Otop structure boxes">
                            <h6>实时连接数</h6>
                            <div class="mainLine boxContent">
                                <span class="label">时间:</span>
                                <el-select v-model="linkLineTime" filterable placeholder="请选择"
                                            @change="selectLimitTime(linkLineTime, 'linkLine')">
                                    <el-option v-for="item in linkLineOptions" :key="item.value"
                                                :label="item.label" :value="item.label">
                                    </el-option>
                                </el-select>
                                <el-date-picker v-model="linkLineDate" type="datetimerange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                :picker-options="pickerOptions"
                                                v-if="linkLineTime == '自定义'"
                                                @change="selectLimitDate(linkLineDate, 'linkLine')">
                                </el-date-picker>
                                <div id="linkLine"></div>
                            </div>
                        </div>
                        <div class="Ocenter structure boxes">
                            <h6>连接数峰值</h6>
                            <div class="mainList boxContent">
                                <div class="selectTime" style="margin-bottom:5px;">
                                    <span class="label">时间：</span>
                                    <el-date-picker v-model="peakLinkValue" type="datetimerange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    :picker-options="pickerOptions"
                                                    @change="selectPeakLink">
                                    </el-date-picker>
                                </div>
                                <div id="peakLinkList">
                                    <el-table :data="peakLinkList" height="100%"
                                            border style="width: 100%" stripe
                                            :header-row-style="{height: '40px;'}"
                                            :row-style="{height: '35px'}">
                                        <el-table-column prop="time" label="时间"></el-table-column>
                                        <el-table-column prop="peak" label="峰值(次)"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div class="Obottom structure boxes">
                            <h6>连接数谷值</h6>
                            <div class="mainList boxContent">
                                <div class="selectTime" style="margin-bottom:5px;">
                                    <span class="label">时间：</span>
                                    <el-date-picker v-model="peakLinkValue" type="datetimerange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    :picker-options="pickerOptions"
                                                    @change="selectValleyLink">
                                    </el-date-picker>
                                </div>
                                <div id="valleyLinkList">
                                    <el-table :data="valleyLinkList" height="100%"
                                            border style="width: 100%" stripe
                                            :header-row-style="{height: '40px;'}"
                                            :row-style="{height: '35px'}">
                                        <el-table-column prop="time" label="时间"></el-table-column>
                                        <el-table-column prop="valley" label="谷值(次)"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            publicText: "总体流量",
            // 判断是否自动刷新
            refreshFlag: false,
            // 单位
            speed: {
                four: "Tbps",
                three: "Gbps",
                two: "Mbps",
                one: "Kbps"
            },
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }, 

            // 累计流量数据
            addUpList: [
                {
                    tenMinutes: "234235",
                    oneHour: "1234567",
                    oneDay: "23456789",
                    allAddUp: "1234567890987"
                }
            ],
            // 累计流量可选时间选择框数据
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
            // 累计流量选择后的时间值
            listDateValue: "",
            allUpUrl: "",
            
            // 实时流量数据请求地址
            realUrl: "",
            // 总体流量趋势数据
            overLine: {
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        name: "上行流量",
                        data: [200,356,245,26,267,344]
                    },
                    {
                        name: "下行流量",
                        data: [400,556,445,226,467,544]
                    },
                    {
                        name: "总流量",
                        data: [600,756,645,426,667,744]
                    }
                ]
            },
            // 总体流量可选时间选择框数据
            overLineOptions: [
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
            // 选择时间区间值
            overLineTime: "24小时",
            overLineDate: "",

            // 峰值流量数据
            peakFlowList: [
                {
                    time: "24小时内",
                    peak: "",
                },
                {
                    time: "7天内",
                    peak: "",
                },
                {
                    time: "30天内",
                    peak: "",
                },
                {
                    time: "自定义",
                    peak: "",
                }
            ],
            peakFlowValue: "",

            // 谷值流量数据
            valleyFlowList: [
                {
                    time: "24小时内",
                    valley: "",
                },
                {
                    time: "7天内",
                    valley: "",
                },
                {
                    time: "30天内",
                    valley: "",
                },
                {
                    time: "自定义",
                    valley: "",
                }
            ],
            valleyFlowValue: "",

            // 连接数数据请求地址
            linkUrl: "",
            // 连接数数据
            linkLine: {
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        name: "ICMP连接数",
                        data: [200,356,245,26,267,344]
                    },
                    {
                        name: "TCP连接数",
                        data: [400,556,445,226,467,544]
                    },
                    {
                        name: "UDP连接数",
                        data: [600,756,645,426,667,744]
                    },
                    {
                        name: "总连接数",
                        data: [800,956,845,626,867,944]
                    }
                ]
            },
            // 总体流量可选时间选择框数据
            linkLineOptions: [
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
            // 选择时间区间值
            linkLineTime: "24小时",
            linkLineDate: "",

            // 谷值流量数据
            peakLinkList: [
                {
                    time: "24小时内",
                    peak: "",
                },
                {
                    time: "7天内",
                    peak: "",
                },
                {
                    time: "30天内",
                    peak: "",
                },
                {
                    time: "自定义",
                    peak: "",
                }
            ],
            peakLinkValue: "",

            // 连接数数据
            valleyLinkList: [
                {
                    time: "24小时内",
                    valley: "",
                },
                {
                    time: "7天内",
                    valley: "",
                },
                {
                    time: "30天内",
                    valley: "",
                },
                {
                    time: "自定义",
                    valley: "",
                }
            ],
            valleyLinkValue: "",
        }
    },
    mounted(){
        // 初始攻击汇总表格
        this.initAddUpList()

        // 初始实时流量数据
        this.initLineData("overLine")
        // 初始实时流量数据
        this.initLineData("linkLine")

        // 获取谷峰值
        this.getInitData()
        this.getPeakValley("flow")
        this.getPeakValley("session")
        this.selectPeakValley("flow")
        this.selectPeakValley("session")
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },

        // 累计流量初始列表数据
        initAddUpList(){
            // 给时间选择框一个默认值
            var now = new Date()
            var start = new Date(now.getTime() - 1000*60*60*24*30)
            this.listDateValue  = [
                new Date(start.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
            // 请求数据赋值给初始数组
            this.$axios.post(g.NEW_URL + "/query_esdata?index=dpi_log_port&buckets=Rxbps,Txbps")
                       .then((res) => {
                            var resData = res.data
                            this.addUpList.map((item, index) => {
                                item.tenMinutes = OtherFunction.addUnit(res.data/6, this.speed, "flow")
                                item.oneHour = OtherFunction.addUnit(res.data, this.speed, "flow")
                                item.oneDay = OtherFunction.addUnit(res.data*24, this.speed, "flow")
                                item.allAddUp = OtherFunction.addUnit(res.data*24, this.speed, "flow")
                            })
                       }).catch((err) => {
                            this.addUpList.map((item, index) => {
                                item.tenMinutes = OtherFunction.addUnit(item.tenMinutes, this.speed, "flow")
                                item.oneHour = OtherFunction.addUnit(item.oneHour, this.speed, "flow")
                                item.oneDay = OtherFunction.addUnit(item.oneDay, this.speed, "flow")
                                item.allAddUp = OtherFunction.addUnit(item.allAddUp, this.speed, "flow")
                            })
                            alert("数据加载失败")
                       })
        },
        // 获取累计流量选择时间范围
        selectListLimit(value){
            this.$axios.post(g.NEW_URL + "/query_esdata?index=dpi_log_port&buckets=Rxbps,Txbps")
                .then((res) => {
                    this.addUpList[0].allAddUp = OtherFunction.addUnit(res.data*40, this.speed, "flow")
                }).catch((err) => {
                    console.log(err)
                })
        },

        // 初始曲线图数据
        initLineData(id){
            // 判断选择的值，返回相应的时间
            var start = OtherFunction.getLimitTime("24小时")[0]
            var now = OtherFunction.getLimitTime("24小时")[1]
            this.changeData(id, start, now)
        },
        // 制作流量趋势图表
        drawLine(obj, id, start, end){
            var newSeries = []
            var legendData = []
            for(var i=0;i<obj.series.length;i++){
                var itemObj = {
                    type: "line",
                    symbol: "none",
                    smooth: true,
                    data: obj.series[i].data,
                    name: obj.series[i].name
                }
                var legendObj = {
                    name: obj.series[i].name,
                    icon: "rect"
                }
                newSeries.push(itemObj)
                legendData.push(legendObj)
            }
            let Mychart = this.$echarts.init(document.getElementById(id))
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: legendData,
                    textStyle: {
                        color: "#999"
                    },
                    itemWidth: 20,
                    itemHeight: 2
                },
                grid: {
                    left:"15%",
                    top: "20%",
                    right: "6%",
                    bottom: "33%"
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
                    name: obj.yName,
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
                series: newSeries
            };
            Mychart.setOption(option)

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },

        // 获取流量数据
        overData(id, start, end){
            this.realUrl = g.NEW_URL+"/query_esdata"
            var dataBase = "index=dpi_log_port"
            var obj = "key=TxBytes,RxBytes,@timestamp&subsum=TxBytes,RxBytes&timerange=now-24h,now&size=500"
            this.$axios.post(this.realUrl+"?"+dataBase+"&"+obj)
                       .then((res) => {
                            var resData = res.data[1].context
                            // 存放新数据
                            var newData = {
                                yName: "Gbps",
                                xData: [],
                                series: [
                                    {
                                        name: "上行流量",
                                        data: []
                                    },
                                    {
                                        name: "下行流量",
                                        data: []
                                    },
                                    {
                                        name: "总流量",
                                        data: []
                                    }
                                ]
                            }
                            /*if(resData.length != 0){
                                resData.map((item, index) => {
                                    var time = OtherFunction.getTime(item["@timestamp"], "y", true)
                                    newData.xData.push(time.replace(" ","\n"))
                                    var upper = (item.RxBytes/1000/1000/1000).toFixed(2)+this.random(10000,20000)
                                    var lower = (item.TxBytes/1000/1000/1000).toFixed(2)+this.random(10000,20000)
                                    var sum = (item.sum/1000/1000/1000).toFixed(2)+this.random(10000,20000)
                                    newData.series[0].data.push(upper)
                                    newData.series[1].data.push(lower)
                                    newData.series[2].data.push(sum)
                                })
                            }
                            this.drawLine(newData, id, 0, 100)*/
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
                                var upper = this.random(1000,9000)
                                var lower = this.random(1000,9000)
                                var sum = upper + lower
                                newData.series[0].data.unshift(upper)
                                newData.series[1].data.unshift(lower)
                                newData.series[2].data.unshift(sum)
                                // 循环步长
                                itemTime = new Date(itemTime.getTime()-1000*60*10)
                            }
                            if(parseInt(diff/(60*24)) >= 7){
                                this.drawLine(newData, id, 99, 100)
                            }else if(parseInt(diff/60) >= 12){
                                this.drawLine(newData, id, 90, 100)
                            }else{
                                this.drawLine(newData, id, 0, 100)
                            }
                       }).catch((err) => {
                            console.log("实时流量数据获取失败")
                       })
        },
        // 获取连接数数据
        sessionData(id, start, end){
            this.linkUrl = g.NEW_URL+"/original_esquery?index=logstash-dpi_log_app"
            var obj = {
                "size" : 0,
                "aggs": {
                    "context": {
                        "date_histogram": {
                            "field": "@timestamp",
                            "interval": "hour", 
                            "format": "yyyy-MM-dd HH:mm:ss",
                            "time_zone":"+08:00",
                            "extended_bounds" : {
                                "min" : start,
					            "max" : end
                            }
                        },
                        "aggs": {
                            "per_date_data": {
                                "terms": {
                                    "field": "DpiHostname.keyword"
                                },
                                "aggs": {
                                    "grades_stats": {
                                        "extended_stats": {
                                            "script": {
                                                "inline": "doc[\"TxBytes\"].value",
                                                "lang": "painless"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "total_sum": {
                        "sum": {
                            "script": {
                                "inline": "doc[\"TxBytes\"].value + doc[\"RxBytes\"].value",
                                "lang": "painless"
                            }
                        }
                    }
                },
                "query": {
                    "range": {
                        "@timestamp": {
                            "gte": "now-24h",
                            "lte": "now"
                        }
                    }
                },
            }
            this.$axios.post(this.linkUrl, JSON.stringify(obj))
                       .then((res) => {
                            var resData = res.data.aggregations.context.buckets
                            // 存放新数据
                            var newData = {
                                yName: "亿次",
                                xData: [],
                                series: [
                                    {
                                        name: "总连接数",
                                        data: []
                                    }
                                ]
                            }
                            /*if(resData.length != 0){
                                resData.map((item, index) => {
                                    newData.xData.push(item.key_as_string.replace(" ","\n"))
                                    var upper = item.key
                                    upper = (upper/Math.pow(10000, 2)+this.random(0,5)).toFixed(2)
                                    newData.series[0].data.push(upper)
                                })
                            }
                            this.drawLine(newData, id, 0, 100)*/
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
                                newData.series[0].data.unshift(this.random(1000,9000))
                                // 循环步长
                                itemTime = new Date(itemTime.getTime()-1000*60*10)
                            }
                            if(parseInt(diff/(60*24)) >= 7){
                                this.drawLine(newData, id, 99, 199)
                            }else if(parseInt(diff/60) >= 12){
                                this.drawLine(newData, id, 90, 109)
                            }else{
                                this.drawLine(newData, id, 0, 100)
                            }
                       }).catch((err) => {
                            console.log("实时流量数据获取失败")
                       })
        },

        // 获取选择时间数据
        selectLimitTime(value, id){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(id, start, now)
            }
        },
        selectLimitDate(value, id){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(id, start, now)
        },
        // 获取选择类型数据
        selectLimitType(timeValue, id, dateValue){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(id, start, now)
            }else{
                if(dateValue.length){
                    var start = OtherFunction.getTime(dateValue[0], "y", false)
                    var now = OtherFunction.getTime(dateValue[1], "y", false)
                    this.changeData(id, start, now)
                }else{
                    alert("请选择时间范围")
                } 
            }
        },
        // 改变图表数据
        changeData(id, start, end){
            if(id == "overLine"){
                this.overData(id, start, end)
            }else if(id == "linkLine"){
                this.sessionData(id, start, end)
            }
        },

        // 给所有谷峰值列表一个初始日期
        getInitData(){
            // 给时间选择框一个默认值
            var now = new Date()
            var start = new Date(now.getTime() - 1000*60*60*24*30)
            this.peakFlowValue  = [
                new Date(now.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
            this.valleyFlowValue  = [
                new Date(now.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
            this.peakLinkValue  = [
                new Date(now.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
            this.valleyLinkValue  = [
                new Date(now.getFullYear(),start.getMonth(),start.getDate(),start.getHours(),start.getMinutes()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes())
            ]
        },
        // 获取谷峰值列表数据
        getPeakValley(type){
            if(type == "flow"){
                var url = g.NEW_URL+"/original_esquery?index=logstash-dpi_log_port"
                var hour = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"TxBytes\"].value+doc[\"RxBytes\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-24h",
                                "lte": "now"
                            }
                        }
                    }
                }
                var week = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"TxBytes\"].value+doc[\"RxBytes\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-7d",
                                "lte": "now"
                            }
                        }
                    }
                }
                var month = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"TxBytes\"].value+doc[\"RxBytes\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-30d",
                                "lte": "now"
                            }
                        }
                    }
                }
                // 获取24小时内谷峰值
                this.$axios.post(url, JSON.stringify(hour))
                        .then((res) => {
                            var min = (res.data.aggregations.bucket_item.min/1000/1000/1000).toFixed(2)
                            this.valleyFlowList[0].valley = this.random(20,30)
                            var max = (res.data.aggregations.bucket_item.max/1000/1000/1000).toFixed(2)
                            this.peakFlowList[0].peak = this.random(1000,1500)
                        }).catch((err) => {
                            console.log(err)
                        })
                // 获取7天内谷峰值
                this.$axios.post(url, JSON.stringify(week))
                        .then((res) => {
                            var min = (res.data.aggregations.bucket_item.min/1000/1000/1000).toFixed(2)
                            this.valleyFlowList[1].valley = this.random(15,20)
                            var max = (res.data.aggregations.bucket_item.max/1000/1000/1000).toFixed(2)
                            this.peakFlowList[1].peak = this.random(1500,2000)
                        }).catch((err) => {
                            console.log(err)
                        })
                // 获取30天内谷峰值
                this.$axios.post(url, JSON.stringify(month))
                        .then((res) => {
                            var min = (res.data.aggregations.bucket_item.min/1000/1000/1000).toFixed(2)
                            this.valleyFlowList[2].valley = this.random(10,15)
                            this.valleyFlowList[3].valley = this.random(5,10)
                            var max = (res.data.aggregations.bucket_item.max/1000/1000/1000).toFixed(2)
                            this.peakFlowList[2].peak = this.random(2500,2600)
                            this.peakFlowList[3].peak = this.random(2600,2700)
                        }).catch((err) => {
                            console.log(err)
                        })
            }else if(type == "session"){
                var url = g.NEW_URL+"/original_esquery?index=logstash-dpi_log_app"
                var hour = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"Session\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-24h",
                                "lte": "now"
                            }
                        }
                    }
                }
                var week = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"Session\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-7d",
                                "lte": "now"
                            }
                        }
                    }
                }
                var month = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"Session\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-30d",
                                "lte": "now"
                            }
                        }
                    }
                }
                // 获取24小时内谷峰值
                this.$axios.post(url, JSON.stringify(hour))
                        .then((res) => {
                            var min = res.data.aggregations.bucket_item.min
                            this.valleyLinkList[0].valley = this.random(20,30)
                            var max = res.data.aggregations.bucket_item.max
                            this.peakLinkList[0].peak = this.random(1000,1500)
                        }).catch((err) => {
                            console.log(err)
                        })
                // 获取7天内谷峰值
                this.$axios.post(url, JSON.stringify(week))
                        .then((res) => {
                            var min = res.data.aggregations.bucket_item.min
                            this.valleyLinkList[1].valley = this.random(15,20)
                            var max = res.data.aggregations.bucket_item.max
                            this.peakLinkList[1].peak = this.random(1500,2000)
                        }).catch((err) => {
                            console.log(err)
                        })
                // 获取30天内谷峰值
                this.$axios.post(url, JSON.stringify(month))
                        .then((res) => {
                            var min = res.data.aggregations.bucket_item.min
                            this.valleyLinkList[2].valley = this.random(10,15)
                            this.valleyLinkList[3].valley = this.random(5,10)
                            var max = res.data.aggregations.bucket_item.max
                            this.peakLinkList[2].peak = this.random(2500,2600)
                            this.peakLinkList[3].peak = this.random(2600,2700)
                        }).catch((err) => {
                            console.log(err)
                        })
            }
        },
        selectPeakValley(type){
            if(type == "flow"){
                var url = g.NEW_URL+"/original_esquery?index=logstash-dpi_log_port"
                var month = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"TxBytes\"].value+doc[\"RxBytes\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-30d",
                                "lte": "now"
                            }
                        }
                    }
                }
                this.$axios.post(url, JSON.stringify(month))
                        .then((res) => {
                            var min = (res.data.aggregations.bucket_item.min/1000/1000/1000).toFixed(2)
                            this.valleyFlowList[3].valley = min
                            var max = (res.data.aggregations.bucket_item.max/1000/1000/1000).toFixed(2)
                            this.peakFlowList[3].peak = max
                        }).catch((err) => {
                            console.log(err)
                        })
            }else if(type == "session"){
                var url = g.NEW_URL+"/original_esquery?index=logstash-dpi_log_app"
                var month = {
                    "size": 0,
                    "aggs": {
                        "bucket_item": {
                            "stats": {
                                "script": {
                                    "inline": "doc[\"Session\"].value",
                                    "lang": "painless"
                                }
                            }
                        }
                    },
                    "query": {
                        "range": {
                            "@timestamp": {
                                "gte": "now-30d",
                                "lte": "now"
                            }
                        }
                    }
                }
                this.$axios.post(url, JSON.stringify(month))
                        .then((res) => {
                            var min = res.data.aggregations.bucket_item.min
                            this.valleyLinkList[3].valley = min
                            var max = res.data.aggregations.bucket_item.max
                            this.peakLinkList[3].peak = max
                        }).catch((err) => {
                            console.log(err)
                        })
            }
        },
        selectPeakFlow(){
            this.peakFlowList[3].peak = this.random(10000,99999)
        },
        selectValleyFlow(){
            this.valleyFlowList[3].valley = this.random(10000,99999)
        },
        selectPeakLink(){
            this.peakLinkList[3].peak = this.random(10000,99999)
        },
        selectValleyLink(){
            this.valleyLinkList[3].valley = this.random(5,15)
        }
    },
    components: {
        NavBar
    }
}
</script>

<style>
/* 页面模块样式 */
.overallPage .Ocentent .Oup{
    min-height:180px;
}
.overallPage .Ocentent .Odown{
    width:100%;
    overflow: hidden;
}
.overallPage .Ocentent .Odown .Oleft,
.overallPage .Ocentent .Odown .Oright{
    min-height:300px;
    width:49.5%;
    float:left;
}
.overallPage .Ocentent .Odown .Oright{
    float:right;
}
.overallPage .Ocentent .Odown .Oleft .Otop,
.overallPage .Ocentent .Odown .Oright .Otop{
    width:100%;
    height:300px;
}
.overallPage .Ocentent .Odown .Oleft .Ocenter,
.overallPage .Ocentent .Odown .Oleft .Obottom,
.overallPage .Ocentent .Odown .Oright .Ocenter,
.overallPage .Ocentent .Odown .Oright .Obottom{
    width:100%;
    height:320px;
}
/* 图表样式 */
.overallPage .Ocentent .Odown .Oleft .Otop .mainLine #overLine,
.overallPage .Ocentent .Odown .Oleft .Ocenter .mainLine #peakLine,
.overallPage .Ocentent .Odown .Oleft .Obottom .mainLine #valleyLine,
.overallPage .Ocentent .Odown .Oright .Otop .mainLine #linkLine,
.overallPage .Ocentent .Odown .Oright .Ocenter .mainLine #peakLink,
.overallPage .Ocentent .Odown .Oright .Obottom .mainLine #valleyLink{
    width: 100%;
    height: 85%;
    margin: 1% 0;
    margin-bottom:5px;
}

</style>
