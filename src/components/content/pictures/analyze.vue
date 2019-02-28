<template>
    <div class="conBox">
        <div class="PAPtop structure boxes">
            <h6>图片统计</h6>
            <div class="mainText boxContent">
                <div class="PAPleft">
                    <span class="label">时间:</span>
                    <el-select v-model="lineTimeValue" filterable placeholder="请选择">
                        <el-option v-for="item in lineTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="lineDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="lineTimeValue == '自定义'">
                    </el-date-picker>
                </div>
                <div class="PAPright">
                    <span>图片总数:</span>
                    <span>1000</span>
                </div>
                <div class="PAPlist">
                    <el-table :data="picList" stripe style="width: 100%"
                              :row-style="{height: '35px'}"
                              :default-sort = "{prop: 'date', order: 'descending'}"
                              border>
                        <el-table-column prop="normal" label="正常图片总数"><template slot-scope="props">
                                <span @click="goList('正常', 'classify')"
                                      style="cursor:pointer;">{{props.row.normal}}</span>
                            </template></el-table-column>
                        <el-table-column prop="normalRatio" label="所占比例"></el-table-column>
                        <el-table-column prop="badness" label="不良图片总数"><template slot-scope="props">
                                <span @click="goList('不良', 'classify')"
                                      style="cursor:pointer;">{{props.row.normal}}</span>
                            </template></el-table-column>
                        <el-table-column prop="badRatio" label="所占比例"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="PAPbottom structure">
            <div class="PAPleft boxes left">
                <h6>访问不良图片IP TOP10</h6>
                <div class="badIpBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="ipTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(ipTimeValue, badIpBar, 'badIpBar', ipValue)">
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
                                    @change="getLimitDate(ipDateValue, badIpBar, 'badIpBar', ipValue)">
                    </el-date-picker>
                    <span class="label">IP:</span>
                    <el-select v-model="ipValue" filterable placeholder="请选择"
                               @change="getLimitIp(ipTimeValue, ipDateValue, badIpBar, 'badIpBar', ipValue)">
                        <el-option v-for="item in ipOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <div id="badIpBar" class="echart"></div>
                </div>
            </div>
            <div class="PAPright boxes right">
                <h6>包含不良图片网站 TOP10</h6>
                <div class="badSitesBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="sitesTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(sitesTimeValue, badSitesBar, 'badSitesBar', null)">
                        <el-option v-for="item in sitesTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="sitesDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="ipTimeValue == '自定义'"
                                    @change="getLimitDate(sitesDateValue, badSitesBar, 'badSitesBar', null)">
                    </el-date-picker>
                    <div id="badSitesBar" class="echart"></div>
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
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }, 
            
            // 视频统计列表数据
            picList: [
                {
                    normal: 920,
                    normalRatio: "92%",
                    badness: 80,
                    badRatio: "8%"
                }
            ],
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

            // 访问不良视频ip top10图表数据
            badIpBar: {
                type: "bar",
                xData: ["219.234.94.233", 
                        "219.234.94.234", 
                        "219.234.94.235", 
                        "219.234.94.236", 
                        "219.234.94.237", 
                        "219.234.94.238", 
                        "219.234.94.239", 
                        "219.234.94.20", 
                        "219.234.94.9", 
                        "219.234.94.34"],
                series: [
                    {
                        data: [10, 52, 200, 334, 390, 400, 420, 450, 470, 490]
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
            // ip选择框数据
            ipOptions: [
                {
                    value: "选项1",
                    label: "源IP"
                },
                {
                    value: "选项2",
                    label: "目的IP"
                }
            ],
            ipValue: "源IP",

            // 访问不良视频ip top10图表数据
            badSitesBar: {
                type: "bar",
                xData: ["219.234.94.233", 
                        "219.234.94.234", 
                        "219.234.94.235", 
                        "219.234.94.236", 
                        "219.234.94.237", 
                        "219.234.94.238", 
                        "219.234.94.239", 
                        "219.234.94.20", 
                        "219.234.94.9", 
                        "219.234.94.34"],
                series: [
                    {
                        data: [10, 52, 200, 334, 390, 400, 420, 450, 470, 490]
                    }
                ]
            },
            // 线图可选时间选择框数据
            sitesTimeOptions: [
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
            sitesTimeValue: "24小时",
            sitesDateValue: "",
        }
    },
    mounted(){
        // 访问不良视频ip top10
        this.initEchartData(this.badIpBar, "badIpBar")
        // 包含不良视频网站top10
        this.initEchartData(this.badSitesBar, "badSitesBar")
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 点击不良视频跳转至列表页
        goList(val, id){
            this.$emit("goList",{
                navs: 1,
                val: val,
                id: id
            });
        },
        
        // 获取初始列表数据
        initEchartData(obj, id){
            var timeLimit = OtherFunction.getLimitTime("24小时")
            // 判断选择的值，返回相应的时间
            var start = OtherFunction.getLimitTime("24小时")[0]
            var now = OtherFunction.getLimitTime("24小时")[1]
            this.changeData(obj, id, start, now)
        },

        // 制作攻击趋势图表
        drawBar(obj, id){
            let Mychart = this.$echarts.init(document.getElementById(id))
            let option = {
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: "shadow"        // 默认为直线，可选为："line" | "shadow"
                    }
                },
                grid: {
                    left: "5%",
                    right: "4%",
                    bottom: "0",
                    top: "5%",
                    containLabel: true
                },
                xAxis: {
                        type: "category",
                        data: obj.xData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            rotate: 30
                        },
                        triggerEvent:true
                },
                yAxis: [
                    {
                        type: "value",
                        name: "次数"
                    }
                ],
                series: [
                    {
                        name:"直接访问",
                        type:"bar",
                        barWidth: "40%",
                        data: obj.series[0].data
                    }
                ]
            };

            Mychart.setOption(option)

            var _this = this
            Mychart.on("click", function (params) {
                if(params.componentType == "xAxis"){
                    _this.goList(params.value, id)
                }
                if(params.componentType == "series"){
                    _this.goList(params.name, id)
                }
            })

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        
        // 获取选择时间数据
        getLimitTime(value, changeObj, id, ipValue){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(changeObj, id, start, now, ipValue)
            }
        },
        // 选择时间范围
        getlimitDate(value, changeObj, id, ipValue){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(changeObj, id, start, now, ipValue)
        },
        getLimitIp(timeValue, dateValue, changeObj, id, ipValue){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(changeObj, id, start, now, ipValue)
            }else{
                var start = OtherFunction.getTime(dateValue[0], "y", false)
                var now = OtherFunction.getTime(dateValue[1], "y", false)
                this.changeData(changeObj, id, start, now, ipValue)
            }
        },
        // 改变图表数据
        changeData(changeObj, id, start, end, ipValue){
            // start, end, ipValue为数据请求所需参数
            this.$axios.post(g.NEW_URL + "/query_esdata?index=ids_av&key=DstIP&topn=10")
                    .then((res) => {
                        // 存放新数据
                        var newData = {
                            type: "bar",
                            xData: [],
                            series: [
                                {
                                    data: []
                                }
                            ]
                        }
                        res.data.map((item, index) => {
                            // newData.xData.push(item.item)
                            newData.series[0].data.push(item.count)
                        })
                        var x = []
                        // 模拟数据
                        if(res.data.length < 10){
                            if(id == "badIpBar"){
                                x = [
                                    "219.234.94.233", 
                                    "219.234.94.234", 
                                    "219.234.94.235", 
                                    "219.234.94.236", 
                                    "219.234.94.237", 
                                    "219.234.94.238", 
                                    "219.234.94.239", 
                                    "219.234.94.20", 
                                    "219.234.94.9", 
                                    "219.234.94.34"
                                ]
                                for(var i=res.data.length;i<10;i++){
                                    newData.xData.push(x[i])
                                    newData.series[0].data.push(this.random(0,100))
                                }
                            }
                            if(id == "badSitesBar"){
                                x = [
                                    "cnblogs.com",
                                    "arunoob.com",
                                    "xinnet.com",
                                    "baidu.com",
                                    "gaodun.com",
                                    "blogs.msdn.com",
                                    "aliyun.com",
                                    "huaweiicloud.com",
                                    "aaaa.com",
                                    "lily.com"
                                ]
                                for(var i=res.data.length;i<10;i++){
                                    newData.xData.push(x[i])
                                    newData.series[0].data.push(this.random(0,100))
                                }
                            }
                        }
                        // 请求成功后处理数据
                        var xDataName = []
                        var seriesName = []
                        // 将数据排序，提取出最大的几个数及其下标
                        var needObj = OtherFunction.arrRank(newData.series[0].data, 10)
                        // 将排序后的数重新赋值
                        needObj.needArr.map((item, index) => {
                            xDataName.push(x[needObj.indexArr[index]])
                            seriesName.push(item)
                        })
                        // 将处理后的数组赋值给存放新数据的数组
                        var endObj = {
                            type: "bar",
                            xData: xDataName,
                            series: [
                                {
                                    data: seriesName
                                }
                            ]
                        }
                        this.drawBar(endObj, id)
                    })
        },
    }
}
</script>
<style>
/* 视频统计模块样式 */
.PAPtop .mainText{
    overflow: hidden;
}
.PAPtop .mainText .PAPleft{
    float:left;
}
.PAPtop .mainText .PAPright{
    float:right;
}
.PAPtop .mainText .PAPright>span:nth-child(2){
    margin-left: 5px;
    font-size: 20px;
    color: rgb(27, 148, 255);
}
.PAPtop .mainText .PAPlist{
    clear:both;
    padding-top:10px;
}

/* 柱状图模块样式 */
.PAPbottom{
    height:300px;
}
</style>