<template>
    <div class="gv6CPUPage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6CPUContent">
            <div class="gv6CPUTop">
                <ul class="detailBox">
                    <li v-for="(item, index) in detailMsg" :key="index" class="itemMsg">
                        <span class="label">{{item.label}}</span>
                        <span class="msg">{{item.msg}}</span>
                    </li>
                </ul>
            </div>
            <div class="gv6CPUBottom">
                <div id="gv6CPULine"></div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/property/serverDetail/public/NavBar"
export default {
    data(){
        return{
            prevPageText: "gv6",
            curPageText: "CPU",
            // 相关信息列表数据
            detailMsg: [
                {
                    label: "CPU型号",
                    msg: "Intel(R) Xeon(R) CPU E5-2699 v3 @ 2.30GHz"
                },
                {
                    label: "CPU利用率：",
                    msg: "50%"
                },
                {
                    label: "CPU核数：",
                    msg: "2"
                },
                {
                    label: "CPU缓存：",
                    msg: "45.00 MB"
                },
                {
                    label: "CPU频率：",
                    msg: "2294MHz"
                }
            ],
            // cpu利用率柱状图相关数据
            cpuBarData: [
                {
                    name: "CPU_0",
                    value: 24
                },
                {
                    name: "CPU_1",
                    value: 94
                }
                ,
                {
                    name: "CPU_2",
                    value: 64
                }
            ]
        }
    },
    mounted(){
        this.drawBar(this.cpuBarData, "gv6CPULine")
    },
    methods: {
        drawBar(obj, id){
            var Mychart = this.$echarts.init(document.getElementById(id))

            var xData = []
            var newData = []
            obj.map((item, index) => {
                xData.push(item.name)
                newData.push(item.value)
            })
            var option = {
                title: {
                    text: "CPU核利用率",
                    left: "center",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: 100
                },
                toolbox: {
                    show: true
                },
                xAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: 0,
                    max: 100,
                    interval: 5
                },
                yAxis: {
                    type: "category",
                    inverse: true,
                    data: xData
                },
                series: [
                    {
                        type: "bar",
                        data: newData,
                    }
                ]
            }

            Mychart.setOption(option)
        }
    },
    components: {
        NavBar
    }
}
</script>
<style>
/* 页面样式 */
.gv6CPUPage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6CPUPage .gv6CPUContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding: 40px 0 0 150px;
}
/* 相关信息列表容器样式 */
.gv6CPUPage .gv6CPUContent .gv6CPUTop{
    width:100%;
    height:120px;
    /* box-sizing: border-box; */
    border-bottom:1px solid #ccc;
}
.gv6CPUPage .gv6CPUContent .gv6CPUTop .detailBox{
    width:100%;
    overflow: hidden;
}
.gv6CPUPage .gv6CPUContent .gv6CPUTop .detailBox .itemMsg{
    width:50%;
    height:40px;
    box-sizing: border-box;
    float:left;
    border-right:1px solid #ccc;
    border-bottom:1px solid #eee;
}
.gv6CPUPage .gv6CPUContent .gv6CPUTop .detailBox .itemMsg>span{
    display:block;
    height:100%;
    line-height:40px;
    float:left;
    box-sizing: border-box;
    font-size:12px;
}
.gv6CPUPage .gv6CPUContent .gv6CPUTop .detailBox .itemMsg .label{
    width:20%;
    padding-left: 3%;
    font-weight: 600;
}
.gv6CPUPage .gv6CPUContent .gv6CPUTop .detailBox .itemMsg .msg{
    width:80%;
    text-align:right;
    padding-right: 3%;
}
/* cpu柱状图容器样式 */
.gv6CPUPage .gv6CPUContent .gv6CPUBottom{
    width:100%;
    height:170px;
    margin-top:30px;
}
.gv6CPUPage .gv6CPUContent .gv6CPUBottom #gv6CPULine{
    width:100%;
    height:100%;
    padding:1%;
}
</style>
