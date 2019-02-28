<template>
    <div class="conBox">
        <div class="OPtop structure">
            <div class="OPleft boxes">
                <h6>实时流量分布</h6>
                <div id="realObjectKind"></div>
            </div>
            <div class="OPcenter boxes">
                <h6>累计流量分布</h6>
                <div id="allObjectKind"></div>
            </div>
            <div class="OPright boxes">
                <h6>实时连接数分布</h6>
                <div id="linkObjectKind"></div>
            </div>
        </div>
        <div class="OPmiddle structure boxes">
            <h6>流量趋势</h6>
            <div class="mainLine boxContent">
                <span class="label">时间:</span>
                <el-select v-model="lineTimeValue" filterable placeholder="请选择"
                            @change="selectLimitTime(lineTimeValue, lineData, flowTypeValue, 'objectLine')">
                    <el-option v-for="item in lineTimeOptions" :key="item.value"
                            :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="lineDateValue" type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                v-if="lineTimeValue == '自定义'"
                                @change="selectLimitDate(lineDateValue,  lineData, flowTypeValue, 'objectLine')">
                </el-date-picker>
                <span class="label">流量类型:</span>
                <el-select v-model="flowTypeValue" filterable placeholder="请选择"
                            @change="selectFilter(lineTimeValue, lineDateValue, lineData, flowTypeValue, 'objectLine')">
                    <el-option v-for="item in flowTypeOptions" :key="item.value"
                            :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <div id="objectLine"></div>
            </div>
        </div>
        <div class="OPbottom structure boxes">
            <h6>应用对象统计详细信息</h6>
            <div class="kindStaList boxContent">
                <div class="searchBox">
                    <!--<el-input placeholder="应用类别" clearable v-model="applyValue"></el-input>
                    <button>搜索</button>
                    <button>重置</button>
                    <div class="applyBlock">
                         <el-pagination @size-change="handleApply"
                                    @current-change="handleApplyCurrent"
                                    :current-page="appCurPage"
                                    :page-sizes="[5,10,15,20]"
                                    :page-size="applyEveryPage"
                                    layout="total, sizes, prev, pager, next, jumper" :total="allApplyListData">
                        </el-pagination>
                    </div>-->
                </div>
                <div class="detailList">
                    <el-table :data="objectList" stripe style="width: 100%"
                              :row-style="{height: '35px'}"
                              :summary-method="getSummaries"
                              show-summary
                              :default-sort = "{prop: 'date', order: 'descending'}"
                              :header-cell-style="{
                                  'background-color': '#666',
                                  'color': '#fff',
                                  'border-right': '1px #888 solid',
                                  'border-bottom': 'none',
                                  'height': '40px',
                                  'padding': '5px'
                              }">
                        <el-table-column prop="label" label="应用名称"></el-table-column>
                        <el-table-column prop="entrySpeed" label="流入速率" sortable></el-table-column>
                        <el-table-column prop="outSpeed" label="流出速率" sortable></el-table-column>
                        <el-table-column prop="allEntrySpeed" label="累积流入量" sortable></el-table-column>
                        <el-table-column prop="allOutSpeed" label="累积流出量" sortable></el-table-column>
                        <el-table-column prop="linkCount" label="连接数" sortable></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../../static/public/css/comCommon.css"
import OtherFunction from "../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            // 单位
            speed: {
                four: "Tbps",
                three: "Gbps",
                two: "Mbps",
                one: "Kbps"
            },
            allFlow: {
                one: "KB",
                two: "MB",
                three: "GB",
                four: "TB",
                five: "PB",
                six: "EB"
            },
            linkCount: {
                one: "万",
                two: "亿",
                three: "兆"
            },

            // 曲线图数据
            lineData: {
                xData: ["8:00","8:10","8:20","8:30","8:40","8:50"],
                series: [
                    {
                        name: "总流量",
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
            // 选择时间区间值
            lineTimeValue: "24小时",
            // 选择后的日期区间值
            lineDateValue: "",
            // 流量类型选择框数据
            flowTypeOptions: [],
            flowTypeValue: "",

            initObjectList: [
                {
                    name: 1,
                    label: "即时通信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 2,
                    label: "阅读",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 3,
                    label: "微博",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 4,
                    label: "导航",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 5,
                    label: "视频",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 6,
                    label: "音乐",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 7,
                    label: "应用商店",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 8,
                    label: "游戏",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 9,
                    label: "支付",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 10,
                    label: "动漫",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 11,
                    label: "邮箱",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 12,
                    label: "P2P业务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 13,
                    label: "VoIP业务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 14,
                    label: "彩信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 15,
                    label: "浏览下载",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 16,
                    label: "财经",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 17,
                    label: "安全杀毒",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 18,
                    label: "购物",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 19,
                    label: "出行旅游",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 20,
                    label: "网盘云服务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 21,
                    label: "公共流量",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 22,
                    label: "其他",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                }
            ],
            objectList: [
                {
                    name: 1,
                    label: "即时通信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 2,
                    label: "阅读",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 3,
                    label: "微博",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 4,
                    label: "导航",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 5,
                    label: "视频",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 6,
                    label: "音乐",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 7,
                    label: "应用商店",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 8,
                    label: "游戏",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 9,
                    label: "支付",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 10,
                    label: "动漫",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 11,
                    label: "邮箱",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 12,
                    label: "P2P业务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 13,
                    label: "VoIP业务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 14,
                    label: "彩信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 15,
                    label: "浏览下载",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 16,
                    label: "财经",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 17,
                    label: "安全杀毒",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 18,
                    label: "购物",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 19,
                    label: "出行旅游",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 20,
                    label: "网盘云服务",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 21,
                    label: "公共流量",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                },
                {
                    name: 22,
                    label: "其他",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                }
            ],
        }
    },
    mounted(){
        this.getPieData("realObjectKind", "实时")
        this.getPieData("allObjectKind", "累计")
        this.getPieData("linkObjectKind", "连接数")
        // 获取流量类型选择框数据
        this.getFlowType()
        // 曲线图
        this.drawLine(this.lineData, "objectLine", 0, 100)
        // 详细信息列表
        this.initList(this.objectList)
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 给初始数据添加单位
        initList(origin){
            origin.map((item, index) => {
                item.entrySpeed = OtherFunction.addUnit(item.entrySpeed*1, this.speed, "flow")
                item.outSpeed = OtherFunction.addUnit(item.outSpeed*1, this.speed, "flow")
                item.allEntrySpeed = OtherFunction.addUnit(item.allEntrySpeed*1, this.allFlow, "flow")
                item.allOutSpeed = OtherFunction.addUnit(item.allOutSpeed*1, this.allFlow, "flow")
                item.linkCount = OtherFunction.addUnit(item.linkCount*1, this.linkCount, "link")
            })
        },

        // 制作饼图
        drawKind(obj, id){
            let Mychart = this.$echarts.init(document.getElementById(id))
            var seriesData = []
            var legendData = []
            obj.series.value.map((item, index) => {
                var seriesItem = {
                    value: item,
                    name: obj.series.name[index]
                }
                legendData.push(obj.series.name[index])
                seriesData.push(seriesItem)
            })
            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // legend: {
                //     orient: "vertical",
                //     right: "10%",
                //     top: "0%",
                //     data: legendData
                // },
                series: [
                    {
                        type:"pie",
                        radius: ["40%", "55%"],
                        center: ["50%", "50%"],
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
                        data: seriesData
                    }
                ]
            }
            Mychart.setOption(option)
            // 用于echarts自适应宽和高
            window.onresize = function(){
                Mychart.resize()
            }
        },
        // 模拟饼图数据
        getPieData(id, url){
            console.log(url)
            // 定义一个新的对象来接收请求到的数据
            var newData = {
                type: "kind",
                series: {
                    value: [],
                    name: []
                }
            }
            // 请求结果数据
            var res = []
            // 模拟数据
            for(var i=1;i<23;i++){
                var itemObj = {
                    item: i,
                    count: this.random(1,200)
                }
                res.push(itemObj)
            }
            // 将得到的结果数据赋值
            var resValue = []
            var resName = []
            res.map((item, index) => {
                this.pieData.map((itm, idx) => {
                    if(item.item == itm.name){
                        resValue.push(item.count)
                        resName.push(itm.label)
                    }
                })
            })
            // 请求成功后处理数据---排序
            var seriesValue = []
            var seriesName = []
            // 将数据排序，提取出最大的几个数及其下标
            var needObj = OtherFunction.arrRank(resValue, 22)
            // 其他项数据总和
            var other = 0
            needObj.needArr.map((item, index) => {
                if(index < 10){
                    seriesValue.push(item)
                    seriesName.push(resName[needObj.indexArr[index]])
                }else{
                    other+= item
                }
            })
            seriesName.push("其他")
            seriesValue.push(other)

            newData.series.value = seriesValue
            newData.series.name = seriesName

            this.drawKind(newData, id)
        },

        // 制作攻击趋势图表
        drawLine(obj, id, start, end){
            let Mychart = this.$echarts.init(document.getElementById(id))
            let option = {
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
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                        handleSize: "80%",
                        height: 20,
                        bottom: 1,
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        zoomLock: true,
                        start: start,
                        end: end
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
                    name: "Gbps",
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
        // 获取流量类型选择框数据
        getFlowType(){
            this.pieData.map((item, index) => {
                var itemObj = {
                    value: "选项" + (index+1),
                    label: item.label
                }
                this.flowTypeOptions.push(itemObj)
            })
            this.flowTypeValue = this.flowTypeOptions[0].label
        },
        // 获取选择时间数据
        selectLimitTime(value, changeObj, kind, id){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(changeObj, id, kind, start, now)
                this.lineDateValue = ""
            }
        },
        selectLimitDate(value, changeObj, kind, id){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(changeObj, id, kind, start, now)
        },
        selectFilter(timeValue, dateValue, changeObj, filterValue, id){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit == "自定义"){
                if(dateValue.length){
                    var start = OtherFunction.getTime(value[0], "y", false)
                    var now = OtherFunction.getTime(value[1], "y", false)
                    this.changeData(changeObj, id, filterValue, start, now)
                }else{
                    alert("请输入正确的时间范围")
                }
            }else{
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(changeObj, id, filterValue, start, now)
            }
        },
        // 改变图表数据
        changeData(changeObj, id, kind, start, end){
            // 存放新数据
            var newData = {
                type: "line",
                xData: [],
                series: [
                    {
                        name: kind,
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
            // var resCount = []
            // res.data.map((item, index) => {
            //     resCount.push(item.count)
            //     newData.series[index].name = item.item
            // })

            for(var i=0;i<parseInt(diff/10)+1;i++){
                var xItem = OtherFunction.getTime(itemTime,"y",false)
                newData.xData.unshift(xItem.replace(" ","\n"))
                // 模拟数据
                newData.series[0].data.unshift(this.random(100,900))
                // 循环步长
                itemTime = new Date(itemTime.getTime()-1000*60*10)
            }
            if(parseInt(diff/(60*24)) >= 7){
                this.drawLine(newData, id, 0, 1)
            }else if(parseInt(diff/60) >= 12){
                this.drawLine(newData, id, 0, 10)
            }else{
                this.drawLine(newData, id, 0, 100)
            }
        },

        // 初始详细信息列表
        getSummaries(param){
            var sums = ["合计",0,0,0,0,0,0]
            this.initObjectList.map((item, index) => {
                sums[1]+=item.entrySpeed*1
                sums[2]+=item.outSpeed*1
                sums[3]+=item.allEntrySpeed*1
                sums[4]+=item.allOutSpeed*1
                sums[5]+=item.linkCount*1
                sums[6]+=parseFloat(item.onLine)
            })
            for(var i=1;i<sums.length;i++){
                if(i < 3){
                    sums[i] = OtherFunction.addUnit(sums[i], this.speed, "flow")
                }else if(i < 5){
                    sums[i] = OtherFunction.addUnit(sums[i], this.allFlow, "flow")
                }else if(i == 5){
                    sums[i] = OtherFunction.addUnit(sums[i], this.linkCount, "link")
                }else{
                    sums[i] = sums[i] + "分钟"
                }
            }
            return sums;
        },
    },
    props: ["pieData"]
}
</script>

<style>
/* 页面模块样式 */
.OPtop,.OPmiddle{
    height:300px;
}
.OPbottom{
    min-height:300px;
}
.OPtop .OPleft,
.OPtop .OPcenter,
.OPtop .OPright{
    width:32.5%;
    height:100%;
    margin-left:1%;
    float:left;
}
.OPtop .OPleft{
    width:33%;
    margin-left:0;
}
/* 图表容器样式 */
.OPtop .OPleft #realObjectKind,
.OPtop .OPcenter #allObjectKind,
.OPtop .OPright #linkObjectKind,
.OPmiddle .mainLine #objectLine{
    width:100%;
    height:85%;
}

/* 列表样式 */
.OPottom .kindStaList .detailList{
    margin-bottom:10px;
}
/* 搜索框样式 */
.OPbottom .kindStaList .searchBox{
    width:100%;
    height: 30px;
    border-radius:3px;
    margin-bottom:10px;
}
.OPbottom .kindStaList .searchBox .applyBlock{
    height: 30px;
    text-align:center;
    float:right;
}
</style>
