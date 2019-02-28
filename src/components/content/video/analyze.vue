<template>
    <div class="conBox">
        <div class="VAPtop structure boxes">
            <h6>视频统计</h6>
            <div class="mainText boxContent">
                <div class="VAPleft">
                    <span class="label">时间:</span>
                    <el-select v-model="lineTimeValue" filterable placeholder="请选择">
                        <el-option v-for="item in lineTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label"
                                >
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
                <div class="VAPright">
                    <span>视频总数:</span>
                    <span>{{allVideo}}</span>
                </div>
                <div class="VAPlist">
                    <el-table :data="videoList" stripe style="width: 100%"
                              :row-style="{height: '35px'}"
                              :default-sort = "{prop: 'date', order: 'descending'}"
                              border>
                        <el-table-column prop="normal" label="正常视频总数">
                            <template slot-scope="props">
                                <span @click="goList('正常', 'classify')"
                                      style="cursor:pointer;">{{props.row.normal}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="normalRatio" label="所占比例"></el-table-column>
                        <el-table-column prop="badness" label="不良视频总数">
                            <template slot-scope="props">
                                <span @click="goList('不良', 'classify')"
                                      style="cursor:pointer;">{{props.row.badness}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="badRatio" label="所占比例"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="VAPbottom structure">
            <div class="VAPleft boxes left">
                <h6>访问不良视频IP TOP10</h6>
                <div class="badIpBar boxContent echartBox">
                    <!-- <span class="label">时间：</span>
                    <el-select v-model="ipTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(ipTimeValue, ipValue, 'badIpBar')">
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
                                    @change="getLimitDate(ipDateValue, ipValue, 'badIpBar')">
                    </el-date-picker> -->
                    <span class="label">IP:</span>
                    <el-select v-model="ipValue" filterable placeholder="请选择"
                               @change="getLimitIp(ipValue, 'badIpBar')">
                        <el-option v-for="item in ipOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <div id="badIpBar" class="echart"></div>
                    <!-- <div id="tip"></div> -->
                </div>
            </div>
            <div class="VAPright boxes right">
                <h6>包含不良视频网站 TOP10</h6>
                <div class="badSitesBar boxContent echartBox">
                    <div style="height:30px;"></div>
                    <!-- <span class="label">时间：</span>
                    <el-select v-model="sitesTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(sitesTimeValue, null, 'badSitesBar')">
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
                                    @change="getLimitDate(sitesDateValue, null, 'badSitesBar')">
                    </el-date-picker> -->
                    <div id="badSitesBar" class="echart"></div>
                    <div class="tip"></div>
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
            videoList: [
                {
                    normal: 920,
                    normalRatio: "92%",
                    badness: 80,
                    badRatio: "8%"
                }
            ],
            allVideo: 0,
            // 时间选择框数据
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
            /*badIpBar: {
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
            },*/
            // 时间选择框数据
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
            // 选择后的时间值
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
            /*badSitesBar: {
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
            },*/
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
        // 视频统计分类初始列表
        this.initData("videoList", null)
        // 访问不良视频ip top10
        this.initData("badIpBar", this.ipValue)
        // 包含不良视频网站top10
        this.initData("badSitesBar", null)
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
        initData(id, ipValue){
            // var timeLimit = OtherFunction.getLimitTime("24小时")
            // // 判断选择的值，返回相应的时间
            // var start = OtherFunction.getLimitTime("24小时")[0]
            // var now = OtherFunction.getLimitTime("24小时")[1]
            this.changeData(id, ipValue)
        },

        // 视频分类数据
        videoKindData(obj){
            var timeRange = "7d"
            var dataBase = "dpi_video_audit"
            var params = "Video_Tag"
            var url = `${g.NEW_URL}/query_esdata?index=${dataBase}&key=${params}`
            this.$axios.post(url)
                       .then((res) => {
                            this.allVideo = 0
                            res.data.map((item, index) => {
                                this.allVideo += item.count
                                if(item.item == "Normal"){
                                    obj[0].normal = item.count
                                }
                                if(item.item == "Suspected"){
                                    obj[0].badness = item.count
                                }
                            })
                            var normalRatio = ((obj[0].normal/this.allVideo)*100).toFixed(2)+"%"
                            var badRatio = ((obj[0].badness/this.allVideo)*100).toFixed(2)+"%"
                            obj[0].normalRatio = normalRatio
                            obj[0].badRatio = badRatio
                       }).catch((err) => {
                           alert("数据请求失败")
                       })
        },
        
        // 制作不良视频图表
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
                        rotate: 45,
                        formatter: function (params){
                            if(params.length > 15){
                                return params.substring(0, 15) + "..."
                            }else{
                                return params
                            }  
                        }
                    },
                    triggerEvent: true
                },
                yAxis: {
                    type: "value",
                    name: "次数",
                },
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

            Mychart.on("mouseover", function (params) {
                if(params.componentType == "xAxis"){
                    if(params.value.length > 15){
                        var tt = document.getElementsByClassName("tip")[0];
                        tt.innerHTML = params.value;
                        tt.style.left = params.event.event.pageX + 10 + "px"
                        tt.style.top = params.event.event.pageY + 10 + "px"
                        tt.style.display = "block"
                    }
                }
            })
            Mychart.on("mouseout", function (params) {
                var tt = document.getElementsByClassName("tip")[0];
                tt.style.display = "none"
            })

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        // 访问不良视频ip top10数据
        badBarData(id, ipValue){
            var url = ""
            if(id == "badIpBar"){
                if(ipValue == "源IP"){
                    url = g.NEW_URL+"/query_esdata?index=dpi_video_audit&key=SIP"
                    /*var obj = {
                        "size": 0,
                        "_source": ["SIP"],
                        "query": {
                            "term": {
                                "Video_Tag": "suspected"
                            }
                        },
                        "aggs": {
                            "context": {
                                "terms": {
                                    "field": "SIP.keyword"
                                }
                            }
                        }
                    }*/
                }else if(ipValue == "目的IP"){
                    url = g.NEW_URL+"/query_esdata?index=dpi_video_audit&key=DIP"
                    /*var obj = {
                        "size": 0,
                        "_source": ["DIP"],
                        "query": {
                            "term": {
                                "Video_Tag": "suspected"
                            }
                        },
                        "aggs": {
                            "context": {
                                "terms": {
                                    "field": "DIP.keyword"
                                }
                            }
                        }
                    }*/
                }
            }else if(id == "badSitesBar"){
                url = url = g.NEW_URL+"/query_esdata?index=dpi_video_audit&key=HOST"
                /*var obj = {
                    "size": 0,
                    "_source": ["HOST"],
                    "query": {
                        "term": {
                            "Video_Tag": "suspected"
                        }
                    },
                    "aggs": {
                        "context": {
                            "terms": {
                                "field": "HOST.keyword"
                            }
                        }
                    }
                }*/
            }
            this.$axios.post(url)
                .then((res) => {
                    var resArr = res.data
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
                        resArr.map((item, index) => {
                            newData.xData.push(item.item)
                            newData.series[0].data.push(item.count)
                        })
                        // 模拟数据
                        /*var x = []
                        if(newData.series[0].data.length < 10){
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
                                for(var i=resArr.length;i<10;i++){
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
                                for(var i=resArr.length;i<10;i++){
                                    newData.xData.push(x[i])
                                    newData.series[0].data.push(this.random(0,100))
                                }
                            }
                        }*/
                        // 请求成功后处理数据
                        var xDataName = []
                        var seriesName = []
                        // 将数据排序，提取出最大的几个数及其下标
                        var needObj = OtherFunction.arrRank(newData.series[0].data, 10)
                        // 将排序后的数重新赋值
                        needObj.needArr.map((item, index) => {
                            xDataName.push(newData.xData[needObj.indexArr[index]])
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
                }).catch((err) => {
                    console.log(err)
                })
        },
        
        // 获取选择时间数据
        /*getLimitTime(timeValue, otherValue, id){
            var timeLimit = OtherFunction.getLimitTime(timeValue)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(timeValue)[0]
                var now = OtherFunction.getLimitTime(timeValue)[1]
                this.changeData(id, start, now, otherValue)
            }
        },
        // 选择时间范围
        getLimitDate(dateValue, otherValue, id){
            var start = OtherFunction.getTime(dateValue[0], "y", false)
            var now = OtherFunction.getTime(dateValue[1], "y", false)
            this.changeData(id, start, now, otherValue)
        },*/
        // 根据所选IP进行查看
        getLimitIp(ipValue, id){
            // var timeLimit = OtherFunction.getLimitTime(timeValue)
            // if(timeLimit != "自定义"){
            //     // 判断选择的值，返回相应的时间
            //     var start = OtherFunction.getLimitTime(timeValue)[0]
            //     var now = OtherFunction.getLimitTime(timeValue)[1]
            //     this.changeData(id, start, now, ipValue)
            // }else{
            //     var start = OtherFunction.getTime(dateValue[0], "y", false)
            //     var now = OtherFunction.getTime(dateValue[1], "y", false)
            //     this.changeData(id, start, now, ipValue)
            // }
            this.changeData(id, ipValue)
        },
        // 改变图表数据
        changeData(id, ipValue){
            if(id == "videoList"){
                this.videoKindData(this.videoList)
            }else{
                this.badBarData(id, ipValue)
            }
        },
    }
}
</script>
<style>
/* 视频统计模块样式 */
.VAPtop .mainText{
    overflow: hidden;
}
.VAPtop .mainText .VAPleft{
    float:left;
}
.VAPtop .mainText .VAPright{
    float:right;
}
.VAPtop .mainText .VAPright>span:nth-child(2){
    margin-left: 5px;
    font-size: 20px;
    color: rgb(27, 148, 255);
}
.VAPtop .mainText .VAPlist{
    clear:both;
    padding-top:10px;
}
/* 柱状图模块样式 */
.VAPbottom{
    height:350px;
}
</style>


