<template>
    <div class="conBox">
        <div class="TAPtop structure boxes">
            <h6>关键字列表</h6>
            <div class="textList boxContent">
                <div class="searchBox">
                    <span class="label">输入关键字:</span>
                    <el-input placeholder="请输入" v-model="keyValue" clearable></el-input>
                    <span class="label">添加备注:</span>
                    <el-input placeholder="请输入" v-model="remarkValue" clearable></el-input>
                    <button @click="addKey">添加关键字</button>
                </div>
                <div class="mainList logTable">
                    <el-table :data="keyList" stripe style="width: 100%" height="250" border
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
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="关键字" :show-overflow-tooltip="true">
                            <template slot-scope="props">
                                <div>
                                    <span v-if="!props.row.ifEdit" 
                                          @click="goList(props.row.key, 'keyCon')"
                                          style="cursor:pointer;">{{props.row.key}}</span>
                                    <div v-if="props.row.ifEdit">  
                                        <el-input placeholder="请输入" v-model="props.row.key" clearable></el-input>
                                        <button @click="update()">确定</button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                            <template slot-scope="scope">
                                <button @click="editKey(scope.$index, keyList)">
                                编辑
                                </button>
                                <button @click="deleteKey(scope.$index, keyList)">
                                删除
                                </button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="TAPcenter structure">
            <div class="TAPleft boxes left">
                <h6>TOP10 命中关键字</h6>
                <div class="keyBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="keyTimeValue" filterable placeholder="请选择"
                               @change="getRowBarData('keyBar')">
                        <el-option v-for="item in keyTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="keyDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="keyTimeValue == '自定义'">
                    </el-date-picker>
                    <div id="keyBar" class="echart"></div>
                </div>
            </div>
            <div class="TAPright boxes right">
                <h6>TOP10 IP地址</h6>
                <div class="ipBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="ipTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(ipTimeValue, 'ipBar')">
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
                                    @change="getDataTime(ipDateValue, 'ipBar')">
                    </el-date-picker>
                    <div id="ipBar" class="echart"></div>
                </div>
            </div>
        </div>
        <div class="TAPbottom structure">
            <div class="TAPleft boxes left">
                <h6>TOP10 网站</h6>
                <div class="sitesBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="sitesTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(sitesTimeValue, 'sitesBar')">
                        <el-option v-for="item in sitesTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="sitesDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="sitesTimeValue == '自定义'"
                                    @change="getDataTime(sitesDateValue, 'sitesBar')">
                    </el-date-picker>
                    <div id="sitesBar" class="echart"></div>
                </div>
            </div>
            <div class="TAPright boxes right">
                <h6>TOP10 邮件地址</h6>
                <div class="mailBar boxContent echartBox">
                    <span class="label">时间：</span>
                    <el-select v-model="mailTimeValue" filterable placeholder="请选择"
                               @change="getLimitTime(mailTimeValue, 'mailBar')">
                        <el-option v-for="item in mailTimeOptions" :key="item.value"
                                   :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="mailDateValue" type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    v-if="mailTimeValue == '自定义'"
                                    @change="getDataTime(mailDateValue, 'mailBar')">
                    </el-date-picker>
                    <div id="mailBar" class="echart"></div>
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

            // 关键字列表数据
            keyList: [
                {
                    ifSelect: false,
                    key: "falungong",
                    remark: "关键字1",
                    ifEdit: false,
                },
                {
                    ifSelect: false,
                    key: "lihongzhi",
                    remark: "关键字2",
                    ifEdit: false,
                },
                {
                    ifSelect: false,
                    key: "111111",
                    remark: "关键字3",
                    ifEdit: false,
                },
                {
                    ifSelect: false,
                    key: "222222",
                    remark: "关键字4",
                    ifEdit: false,
                }
            ],
            // 关键字输入值
            keyValue: "",
            // 备注输入值
            remarkValue: "",
            // 正在编辑的行数
            editRow: "",

            // 视频统计列表数据
            picList: [
                {
                    normal: 500,
                    normalRatio: "50%",
                    badness: 500,
                    badRatio: "50%"
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
            keyBar: {
                type: "bar",
                yData: [],
                series: [
                    {
                        data: []
                    }
                ]
            },
            // 线图可选时间选择框数据
            keyTimeOptions: [
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
            keyTimeValue: "24小时",
            keyDateValue: "",

            // 访问不良视频ip top10图表数据
            ipBar: {
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

            // 访问不良视频ip top10图表数据
            sitesBar: {
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

            // 访问不良视频ip top10图表数据
            mailBar: {
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
            mailTimeOptions: [
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
            mailTimeValue: "24小时",
            mailDateValue: "",
        }
    },
    mounted(){
        // TOP 10 命中关键字
        this.initEchartData("keyBar")
        // TOP 10 IP地址
        this.initEchartData("ipBar")
        // TOP 10 网站
        this.initEchartData("sitesBar")
        // TOP 10 邮件地址
        this.initEchartData("mailBar")
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

        // 添加关键字
        addKey(){
            var keyObj = {
                ifSelect: false,
                key: this.keyValue,
                remark: this.remarkValue
            }
            this.keyList.unshift(keyObj)
            this.getRowBarData("keyBar")
        },
        // 删除关键字
        deleteKey(index, rows){
            rows.splice(index, 1);
            this.getRowBarData("keyBar")
        },
        // 编辑关键字
        editKey(index, rows){
            this.keyList.map((item, idx) => {
                if(index == idx){
                    item.ifEdit = true
                }
            })
            this.editRow = index
        },
        // 确认修改
        update(){
            this.keyList.map((item, index) => {
                if(index == this.editRow){
                    item.ifEdit = false
                }
            })
            this.getRowBarData("keyBar")
        },
        
        // 获取初始列表数据
        initEchartData(id){
            var timeLimit = OtherFunction.getLimitTime("24小时")
            // 判断选择的值，返回相应的时间
            var start = OtherFunction.getLimitTime("24小时")[0]
            var now = OtherFunction.getLimitTime("24小时")[1]
            this.changeData(id, start, now)
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
                    left: "7%",
                    right: "4%",
                    bottom: "0",
                    top: "5%",
                    containLabel: true
                },
                xAxis : [
                    {
                        type: "category",
                        data: obj.xData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            rotate: 40
                        },
                        triggerEvent:true
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "次数"
                    }
                ],
                series: [
                    {
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
                console.log(params.componentType)
                if(params.componentType == "series"){
                    _this.goList(params.name, id)
                }
            })

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        getBarData(id, start, end){
            // 可以根据id判断数据接口
            var testUrl = g.NEW_URL + "/query_esdata?index=ids_av&key=DstIP&topn=10"
            this.$axios.post(testUrl)
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
                    if(id == "ipBar"){
                        res.data.map((item, index) => {
                            newData.xData.push(item.item)
                            newData.series[0].data.push(item.count)
                        })
                        // 模拟数据
                        var x = []
                        if(res.data.length < 10){
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
                    }
                    if(id == "sitesBar"){
                        res.data.map((item, index) => {
                            // newData.xData.push(item.item)
                            newData.series[0].data.push(item.count)
                        })
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
                    if(id == "mailBar"){
                        res.data.map((item, index) => {
                            // newData.xData.push(item.item)
                            newData.series[0].data.push(item.count)
                        })
                        x = [
                            "43545@163.com",
                            "sdfsdt@139.com",
                            "sswev@163.com",
                            "343245@139.com",
                            "lili@lisoft.com",
                            "25217@qq.com",
                            "16695@qq.com",
                            "weiwei@163.com",
                            "ming@139.com",
                            "Alice@qq.com"
                        ]
                        for(var i=res.data.length;i<10;i++){
                            newData.xData.push(x[i])
                            newData.series[0].data.push(this.random(0,100))
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
        // 绘制横向柱状图
        drawRowBar(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                color: ["#3398DB"],
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
                    nameLocation: "start",
                    inverse: true,
                    data: obj.yData,
                    // axisLabel: {
                    //     formatter: function (params){
                    //         if(params.length > 4){
                    //             return params.substring(0, 4) + "..."
                    //         }else{
                    //             return params
                    //         }  
                    //     }
                    // },
                    triggerEvent: true
                },
                series: [
                    {
                        name: "告警数量",
                        type: "bar",
                        barWidth: 25,
                        data: obj.series[0].data
                    }
                ]
            }

            var _this = this
            Mychart.on("click", function (params) {
                if(params.componentType == "yAxis"){
                    _this.goList(params.value, id)
                }
                console.log(params.componentType)
                if(params.componentType == "series"){
                    _this.goList(params.name, id)
                }
            })

            Mychart.setOption(option)
            // 是echarts图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        getRowBarData(id){
            if(this.keyTimeValue == "自定义"){
                return
            }
            var newData = {
                yData: [],
                series: [
                    {
                        data: []
                    }
                ]
            }
            this.keyList.map((item, index) => {
                newData.series[0].data.push(this.random(1,10))
                newData.yData.push(item.key)
            })
            // 请求成功后处理数据
            var yDataName = []
            var seriesName = []
            // 将数据排序，提取出最大的几个数及其下标
            var needObj = OtherFunction.arrRank(newData.series[0].data, this.keyList.length)
            // 将排序后的数重新赋值
            needObj.needArr.map((item, index) => {
                yDataName.push(newData.yData[needObj.indexArr[index]])
                seriesName.push(item)
            })
            // 将处理后的数组赋值给存放新数据的数组
            var endObj = {
                yData: yDataName,
                series: [
                    {
                        data: seriesName
                    }
                ]
            }
            this.drawRowBar(endObj, id)
        },

        // 获取选择时间数据
        getLimitTime(value, id){
            var timeLimit = OtherFunction.getLimitTime(value)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(value)[0]
                var now = OtherFunction.getLimitTime(value)[1]
                this.changeData(id, start, now)
            }
        },
        // 选择时间范围
        getDataTime(value, id){
            var start = OtherFunction.getTime(value[0], "y", false)
            var now = OtherFunction.getTime(value[1], "y", false)
            this.changeData(id, start, now)
        },
        // 改变图表数据
        changeData(id, start, end){
            if(id == "keyBar"){
                this.getRowBarData(id)
                return
            }
            this.getBarData(id, start, end)
        },
    }
}
</script>
<style>
.TAPtop{
    min-height:100px;
}

.TAPcenter,.TAPbottom{
    height:300px;
}
</style>
