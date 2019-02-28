<template>
    <div class="conBox">             
        <div class="COPtop structure boxes">
            <h6>集群负载</h6>
            <div class="guageBox boxContent echartBox">
                <div id="local"></div>
                <div id="average"></div>
                <div id="avgCPU"></div>
                <div id="oneMinute"></div>
            </div>
        </div>
        <div class="COPbottom structure boxes">
            <h6>集群告警概况</h6>
            <div class="mainLine boxContent echartBox">
                <span class="label">资产类别:</span>
                <el-select v-model="proTypeValue" filterable placeholder="请选择"
                            @change="selectProType(proTypeValue)">
                    <el-option v-for="item in proTypeOptions" :key="item.value"
                            :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <div id="alarmLine" class="echart"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 本地磁盘利用率数据
            localData: {
                text: "本地磁盘利用率"
            },
            // 内存平均利用率数据
            averageData: {
                text: "内存平均利用率"
            },
            // CPU平均利用率数据
            avgCPUData: {
                text: "CPU平均利用率"
            },
            // 相对一分钟负载数据
            oneMinuteData: {
                text: "相对一分钟负载"
            },
            // 集群负载曲线图数据
            alarmSituData: {
                series: [
                    {
                        name: "全部设备",
                        data: [
                            100,120,110,135,265,
                            156,1,100,120,110,
                            56,1,100,120,1,
                            110,135,265,156,1,
                            110,111
                        ]
                    }
                ]
            },
            // 资产类型选择框
            proTypeOptions: [
                {
                    value: "选项1",
                    label: "全部设备"
                },
                {
                    value: "选项2",
                    label: "计算机设备"
                },
                {
                    value: "选项3",
                    label: "网络设备"
                },
                {
                    value: "选项4",
                    label: "安全设备"
                }
            ],
            // 选择所展示的资产类型
            proTypeValue: "全部设备",
        }
    },
    mounted(){
        // 本地磁盘利用率
        this.drawGauge(this.localData, "local")
        // 内存平均利用率
        this.drawGauge(this.averageData, "average")
        // CPU平均利用率
        this.drawGauge(this.avgCPUData, "avgCPU")
        // 相对一分钟负载
        this.drawGauge(this.oneMinuteData, "oneMinute")
        // 集群负载概况曲线图
        this.drawLine(this.alarmSituData, "alarmLine")
    },
    methods:{
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },

        // 绘制仪表盘
        drawGauge(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                title: {
                    text: obj.text,
                    textStyle: {
                        fontSize: 14
                    },
                    bottom: "7%",
                    left: "32%"
                },
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                series : [
                    {
                        name:"速度",
                        type:"gauge",
                        min:0,
                        max:100,
                        splitNumber:10,
                        radius: "80%",
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.09, "lime"],[0.82, "#1e90ff"],[1, "#ff4500"]],
                                width: 0,
                                shadowColor : "#fff", //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {            // 坐标轴小标记
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: "bolder",
                                color: "#666",
                                shadowColor : "#fff", //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: "auto",
                                shadowColor : "#fff", //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: {           // 分隔线
                            length :15,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: "auto",
                                shadowColor : "#fff", //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {           // 分隔线
                            shadowColor : "#000", //默认透明
                            shadowBlur: 5
                        },
                        detail: {
                            offsetCenter: [0, "65%"],
                            formatter: function(value){
                                return ((value/100)*100).toFixed(2) + "%"
                            },
                            fontSize: 18
                        },
                        data:[{value: 40}]
                    }
                ]
            }

            Mychart.setOption(option)
            window.resize = function(){
                Mychart.resize()
            }
        },
        // 绘制集群负载概况曲线图
        drawLine(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var option = {
                grid: {
                    top: "15%",
                    left: "7%",
                    right: "7%",
                    bottom: "32%"
                },
                tooltip : {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        animation: false,
                        label: {
                            backgroundColor: "#505765"
                        }
                    }
                },
                legend: {
                    data:[obj.series[0].name],
                    x: "center"
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: "inside",
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                xAxis : [
                    {
                        type : "category",
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        axisLabel: {
                            rotate: 30
                        },
                        data : [
                            "2009/6/12", "2019/6/12", "2029/6/12", "2039/6/12",
                            "2049/6/12", "2059/6/12", "2069/6/12", "2079/6/12",
                            "2089/6/12", "2099/6/12", "2109/6/12", "2119/6/12",
                            "2129/6/12", "2139/6/12", "2149/6/12", "2159/6/12",
                            "2169/6/12", "2179/6/12", "2189/6/12", "2199/6/12",
                            "2209/6/12", "2219/6/12"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        max: 500,
                        name: "次数",
                        nameTextStyle: {
                            padding: [0,0,0,-30]
                        }
                    }
                ],
                series: [
                    {
                        name: obj.series[0].name,
                        type:"line",
                        smooth: true,
                        areaStyle: {

                        },
                        lineStyle: {
                            width: 1
                        },
                        data: obj.series[0].data
                    }
                ]
            }

            Mychart.setOption(option)
            // echarts宽高自适应
            window.resize = function(){
                Mychart.resize()
            }
        },
        selectProType(value){
            var newObj = {
                series: [
                    {
                        name: value,
                        data: []
                    }
                ]
            }
            for(var i=0;i<22;i++){
                newObj.series[0].data.push(this.random(0,500))
            }
            this.drawLine(newObj, "alarmLine")
        },
    }
}
</script>
<style>
.COPtop,.COPbottom{
    height:300px;
}
/* 集群负载容器样式 */
.COPtop .guageBox #local,
.COPtop .guageBox #average,
.COPtop .guageBox #avgCPU,
.COPtop .guageBox #oneMinute{
    width: 25%;
    height: 100%;
    float: left;
}
</style>