<template>
    <div class="conBox">
        <div class="DPtop structure boxes">
            <h6>用户流量趋势</h6>
            <div class="mainLine boxContent echartBox">
                <span class="label">时间:</span>
                <el-select v-model="lineTimeValue" filterable placeholder="请选择"
                            @change="selectLimitTime(lineTimeValue, userLine, filterValue)">
                    <el-option v-for="item in lineTimeOptions" :key="item.value"
                            :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="lineDateValue" type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                v-if="lineTimeValue == '自定义'"
                                :picker-options="pickerOptions"
                                @change="selectLimitDate(lineDateValue,  userLine, filterValue)">
                </el-date-picker>
                <span class="label">IP地址:</span>
                <el-input placeholder="请输入" clearable v-model="ipValue"
                          @blur="selectFilter(lineTimeValue, lineDateValue, userLine, filterValue)"></el-input>
                <span class="label">用户名:</span>
                <el-input placeholder="请输入" clearable v-model="userValue"
                          @blur="selectFilter(lineTimeValue, lineDateValue, userLine, filterValue)"></el-input>
                <span class="label">过滤条件:</span>
                <el-select v-model="filterValue" filterable placeholder="请选择"
                           @change="selectFilter(lineTimeValue, lineDateValue, userLine, filterValue)">
                    <el-option v-for="item in filterOptions" :key="item.value"
                               :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <div id="userLine" class="echart"></div>
            </div>
        </div>
        <div class="DPbottom structure boxes">
            <h6>应用统计详细信息</h6>
            <div class="detailBox boxContent">
                <!-- <div class="searchBox">
                    <el-input placeholder="输入IP" clearable v-model="singleValue"
                            @keyup.native="selectSingle"></el-input>
                    <span class="searchBtn btn" style="cursor:pointer;" @click="selectSingle">搜索</span>
                    <span class="resetBtn btn" style="cursor:pointer;" @click="allSingle">重置</span>
                    <div class="block">
                        <el-pagination @size-change="handleSingle"
                                    @current-change="handleSingleCurrent"
                                    :current-page="singleCurPage"
                                    :page-sizes="[5,10,15,20]"
                                    :page-size="singleEveryPage"
                                    layout="total, sizes, prev, pager, next, jumper" :total="allSingleListData">
                        </el-pagination>
                    </div>
                </div> -->
                <div class="detailList logTable">
                    <el-table :data="detailList" stripe style="width: 100%" border
                                :summary-method="getSummaries"
                                show-summary
                                :row-style="{height: '35px'}"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                :header-cell-style="{
                                'background-color': '#666',
                                'color': '#fff',
                                'border-right': '1px #888 solid',
                                'border-bottom': 'none',
                                'height': '40px',
                                'padding': '5px'
                                }">
                        <el-table-column prop="applyObj" label="应用名称"></el-table-column>
                        <el-table-column prop="entrySpeed" label="流入速率"></el-table-column>
                        <el-table-column prop="outSpeed" label="流出速率"></el-table-column>
                        <el-table-column prop="allEntrySpeed" label="累积流入量"></el-table-column>
                        <el-table-column prop="allOutSpeed" label="累积流出量"></el-table-column>
                        <el-table-column prop="linkCount" label="连接数(亿次)" sortable></el-table-column>
                        <el-table-column prop="onLine" label="在线时长(分钟)" sortable></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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

            textMsg: "",
            // 用户流量趋势数据
            userLine: {
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
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },  
            ipValue: "",
            userValue: "",
            // 过滤条件
            filterOptions: [
                {
                    value: "选项1",
                    label: "总流量"
                },
                {
                    value: "选项2",
                    label: "入流量"
                },
                {
                    value: "选项3",
                    label: "出流量"
                }
            ],
            filterValue: "总流量",

            // 详细信息列表
            initDetailList: [
                {
                    applyObj: "即时通信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "阅读",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "微博",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "导航",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "视频",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "音乐",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "应用商店",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                }
            ],
            detailList: [
                {
                    applyObj: "即时通信",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "阅读",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "微博",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "导航",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "视频",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "音乐",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                },
                {
                    applyObj: "应用商店",
                    entrySpeed: "1545165125",
                    outSpeed: "4613591469",
                    allEntrySpeed: "4263138234",
                    allOutSpeed: "4628716942",
                    linkCount: "12345678991",
                    onLine: "10分钟"
                }
            ],
        }
    },
    mounted(){
        // 用户流量图表
        this.drawUserLine(this.userLine, 0, 100)
        // 详细信息列表
        this.initList(this.detailList)
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 给初始数据添加单位
        initList(origin){
            origin.map((item, index) => {
                item.entrySpeed = OtherFunction.addUnit(this.random(10000000,30000000), this.speed, "flow")
                item.outSpeed = OtherFunction.addUnit(this.random(10000000,30000000), this.speed, "flow")
                item.allEntrySpeed = OtherFunction.addUnit(this.random(20000000,40000000), this.allFlow, "flow")
                item.allOutSpeed = OtherFunction.addUnit(this.random(20000000,40000000), this.allFlow, "flow")
                item.linkCount = this.random(20,50)
                item.onLine = this.random(1,60)
            })
        },

        // 制作攻击趋势图表
        drawUserLine(obj, start, end){
            let Mychart = this.$echarts.init(document.getElementById("userLine"))
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
                        type: "inside",
                        start: start,
                        end: end
                    },
                    {
                        start: start,
                        end: end,
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
        selectLimitTime(value, changeObj, kind){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(changeObj, kind, start, now)
                this.lineDateValue = ""
            }
        },
        selectLimitDate(value, changeObj, kind){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(changeObj, kind, start, now)
        },
        selectFilter(timeValue, dateValue, changeObj, filterValue){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit == "自定义"){
                if(dateValue.length){
                    var start = OtherFunction.getTime(value[0], "y", false)
                    var now = OtherFunction.getTime(value[1], "y", false)
                    this.changeData(changeObj, filterValue, start, now)
                }else{
                    alert("请输入正确的时间范围")
                }
            }else{
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(changeObj, filterValue, start, now)
            }
        },
        // 改变图表数据
        changeData(changeObj, kind, start, end){
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
                this.drawUserLine(newData, 0, 1)
            }else if(parseInt(diff/60) >= 12){
                this.drawUserLine(newData, 0, 10)
            }else{
                this.drawUserLine(newData, 0, 100)
            }
        },

        // 初始详细信息列表
        getSummaries(param){
            var sums = ["合计",0,0,0,0,0,0]
            this.initDetailList.map((item, index) => {
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
        }
    }
}
</script>

<style>
/* 页面模块样式 */
.usersPage .Ucentent .DPtop{
    height:320px;
}
.usersPage .Ucentent .DPbottom{
    min-height:300px;
}
</style>

