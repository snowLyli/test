<template>
    <div class="conBox">
        <div class="HPtop structure">
            <div class="HPleft left boxes">
                <h6>漏洞等级分布</h6>
                <div id="randKind" class="echart"></div>
            </div>
            <div class="HPright right boxes">
                <h6>漏洞趋势</h6>
                <div id="bugBar" class="echart"></div>
            </div>
        </div>
        <div class="HPcenter structure boxes">
            <h6>高危资产TOP排名</h6>
            <div id="topBar" class="echart"></div>
        </div>
        <div class="HPbottom boxes">
            <h6>资产漏洞详情</h6>
            <div class="listBox boxContent">
                <div class="searchBox">
                    <div class="bugSearch">
                        <span class="label">资产名称:</span>
                        <el-input placeholder="请输入" v-model="tasksNameValue"></el-input>
                        <span class="label">IP地址:</span>
                        <el-input placeholder="请输入" v-model="tasksNameValue"></el-input>
                        <button>搜索</button>
                        <button>重置</button>
                    </div>
                    <div class="bugSelect">
                        <el-select placeholder="资产类型" v-model="scanCondiValue">
                            <el-option v-for="item in scanCondi" :key="item.value" :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select placeholder="所属组" v-model="scanCondiValue">
                            <el-option v-for="item in scanCondi" :key="item.value" :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select placeholder="所属机房" v-model="scanCondiValue">
                            <el-option v-for="item in scanCondi" :key="item.value" :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select placeholder="漏洞状态" v-model="scanCondiValue">
                            <el-option v-for="item in scanCondi" :key="item.value" :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="proBugList">
                    <el-table :data="bugListData" height="300" border style="width: 100%"
                                :header-cell-style="{
                                    'background-color': '#666',
                                    'color': '#fff',
                                    'border-right': '1px #888 solid',
                                    'height': '30px'
                                }">
                        <el-table-column prop="proName" label="资产名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="proType" label="资产类型" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="belongGroup" label="所属组" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="belongRoom" label="所属机房" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bugName" label="漏洞名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dangerous" label="危险等级" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="describe" label="简短描述" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="repairPlan" label="修复方案" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bugStatus" label="漏洞状态" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="repairRes" label="修复结果" show-overflow-tooltip></el-table-column>
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
            // 输入的任务名称
            tasksNameValue: "",
            // 扫描依据
            scanCondi: [
                {
                    value: "选项1",
                    label: "黄金糕"
                }, {
                    value: "选项2",
                    label: "双皮奶"
                }, {
                    value: "选项3",
                    label: "蚵仔煎"
                }, {
                    value: "选项4",
                    label: "龙须面"
                }, {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            scanCondiValue: "",
            // 漏洞等级分布饼图数据
            rankKindData: {
                seriesData: [
                    {
                        name: "紧急",
                        value: 57
                    },
                    {
                        name: "高危",
                        value: 248
                    },
                    {
                        name: "中危",
                        value: 885
                    },
                    {
                        name: "低危",
                        value: 426
                    }
                ]
            },
            // 资产漏洞详情列表数据
            bugListData: [
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                },
                {
                    proName: "aaa",
                    proType: "type",
                    belongGroup: "A",
                    belongRoom: "AA",
                    ip: "169.128.56.42",
                    bugName: "name",
                    dangerous: "中危",
                    describe: "shsfsg",
                    repairPlan: "方案一",
                    bugStatus: "已修复",
                    repairRes: "ok"
                }
            ]
        }
    },
    mounted(){
        this.drawKind(this.rankKindData, "randKind")
        this.drawBar("bugBar")
        this.drawTopBar("topBar")
    },
    methods:{
        random(max, min){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 绘制饼状图
        drawKind(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var newData = []
            obj.seriesData.map((item, index) => {
                var itemData = {
                    name: item.name,
                    value: item.value
                }
                newData.push(itemData)
            })
            var option = {
                tooltip : {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: "scroll",
                    orient: "vertical",
                    right: 20,
                    top: 40,
                    bottom: 20,
                    data: ["紧急", "高危", "中危", "低危"]
                },
                series : [
                    {
                        name: "姓名",
                        type: "pie",
                        radius : "65%",
                        center: ["40%", "55%"],
                        data: newData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            }

            Mychart.setOption(option)
            // 使图表宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 漏洞趋势柱状图
        drawBar(id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var now = new Date()
            var start = new Date(now.getTime() - (1000*60*60*24*7))
            var newData = [[],[],[],[]]
            var xData = []
            for(var i=0;i<7;i++){
                var xDataItem = OtherFunction.getTime(now.getTime() - (1000*60*60*24*i), "d", true)
                xData.push(xDataItem)
                newData.map((item, index) => {
                    item.push(this.random(12, 5))
                })
            }
            var option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: "shadow"        // 默认为直线，可选为："line" | "shadow"
                    }
                },
                legend: {
                    data:["紧急","高危","中危","低危"]
                },
                xAxis: {
                    name: "时间",
                    type: "category",
                    axisLabel: {
                        rotate: 30
                    },
                    data: xData
                },
                yAxis: {
                    name: "数量",
                    type: "value"
                },
                series: [
                    {
                        name:"紧急",
                        type:"bar",
                        stack: "数量",
                        barWidth: "30px",
                        data: newData[0]
                    },
                    {
                        name:"高危",
                        type:"bar",
                        stack: "数量",
                        data: newData[1]
                    },
                    {
                        name:"中危",
                        type:"bar",
                        stack: "数量",
                        data: newData[2]
                    },
                    {
                        name:"低危",
                        type:"bar",
                        stack: "数量",
                        data: newData[3]
                    }
                ]
            }

            Mychart.setOption(option)
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 高危Top排名
        drawTopBar(id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: "category",
                    data: ["资产1","资产2","资产3"]
                },
                series: [
                    {
                        type: "bar",
                        barWidth: 30,
                        data: [18203, 23489, 29034]
                    }
                ]
            }

            Mychart.setOption(option)
            // 使图标宽高自适应
            window.onresize = function(){
                Mychart.resize()
            }
        }
    }
}
</script>
<style>
.HPtop,.HPcenter{
    height:300px;
}
.HPbottom{
    min-height:300px;
}
.HPbottom .searchBox .bugSearch{
    width:40%;
    float:left;
}
.HPbottom .searchBox .bugSelect{
    width:40%;
    float:right;
    text-align:right;
}
</style>
