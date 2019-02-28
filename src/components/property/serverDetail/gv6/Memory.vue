<template>
    <div class="gv6MemoryPage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6MemoryContent">
            <div class="gv6MemoryLeft">
                <ul class="picBox">
                    <li v-for="(item, index) in picNameList" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="gv6MemoryRight">
                <ul class="memoryMsg">
                    <li v-for="(item, index) in memoryData" :key="index">
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                    </li>
                </ul>
                <ul class="picMsg">
                    <h4>{{selectPic}}</h4>
                    <li v-for="(item, index) in selectPicData" :key="index">
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                    </li>
                </ul>
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
            curPageText: "内存",
            // 图片数据信息
            picNameList: [
                "P1_DIMMA1",
                "P1_DIMMB1",
                "P1_DIMME1",
                "P1_DIMMF1"
            ],
            // 选中的图片名称
            selectPic: "P1_DIMMA1",
            // 相关内存信息
            memoryData: [
                {
                    label: "内存条数:",
                    value: "4"
                },
                {
                    label: "内存总容量:",
                    value: "21.32GB"
                },
                {
                    label: "内存利用率:",
                    value: "32%"
                },
                {
                    label: "内存使用量:",
                    value: "10.28GB"
                },
                {
                    label: "内存剩余量:",
                    value: "21.04GB"
                }
            ],
            // 所查看内存的详细信息数据
            selectPicData: [
                {
                    label: "厂商：",
                    value: "Kingston"
                },
                {
                    label: "SN号：",
                    value: "D030B478"
                },
                {
                    label: "容量：",
                    value: "8192GB"
                },
                {
                    label: "类型：",
                    value: "DDR3"
                },
                {
                    label: "频率：",
                    value: "1333MHz"
                }
            ]
        }
    },
    mounted(){
        
    },
    methods: {
        
    },
    components: {
        NavBar
    }
}
</script>
<style>
/* 页面样式 */
.gv6MemoryPage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6MemoryPage .gv6MemoryContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding: 40px 0 0 150px;
}
/* 图片模块样式 */
.gv6MemoryPage .gv6MemoryContent .gv6MemoryLeft{
    width:80%;
    height:100%;
    float:left;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryLeft .picBox{
    width:100%;
    overflow:hidden;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryLeft .picBox>li{
    width:48%;
    height:90px;
    border:1px solid #ccc;
    border-radius:5px;
    background:#ddd;
    float:left;
    margin:1% 0 0 1%;
}
/* 相关信息样式 */
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight{
    width:20%;
    height:100%;
    float:left;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .memoryMsg,
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg{
    width:100%;
    border:1px solid #ccc;
    overflow: hidden;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .memoryMsg>li,
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg>li{
    width:100%;
    height:40px;
    border-bottom:1px solid #eee;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg>h4{
    display:block;
    width:100%;
    height:40px;
    line-height:40px;
    font-size:14px;
    box-sizing: border-box;
    padding-left:10px;
    border-bottom:1px solid #eee;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .memoryMsg>li>span,
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg>li>span{
    display:block;
    float:left;
    height:100%;
    float:left;
    line-height:40px;
    font-size:12px;
    box-sizing: border-box;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .memoryMsg>li>span:nth-child(1),
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg>li>span:nth-child(1){
    width:40%;
    font-weight: 600;
    padding-left:10px;
}
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .memoryMsg>li>span:nth-child(2),
.gv6MemoryPage .gv6MemoryContent .gv6MemoryRight .picMsg>li>span:nth-child(2){
    width:60%;
    text-align:right;
    padding-right:10px;
}
</style>
