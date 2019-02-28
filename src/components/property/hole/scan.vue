<template>
    <div class="conBox">
        <div class="SPtop boxContent boxes">
            <div class="searchBox">
                <div class="buildScan">
                    <el-select placeholder="扫描条件" v-model="scanCondiValue">
                        <el-option v-for="item in scanCondi" :key="item.value" :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <button @click="ShowScanLists">
                        开始扫描
                        <ul :class="ifShowScanLists ? 'scanSelects show' : 'scanSelects hide'">
                            <li @click="getSelectValue('b')">根据资产扫描</li>
                            <li @click="getSelectValue('c')">根据ip扫描</li>
                        </ul>
                    </button>
                </div>
                <div class="searchCon">
                    <span class="label">任务名称:</span>
                    <el-input placeholder="请输入" v-model="tasksNameValue"></el-input>
                    <button>搜索</button>
                    <button>重置</button>
                </div>
            </div>
            <div class="scanResult">
                <el-table ref="multipleTable" :data="scanResult" tooltip-effect="dark"
                        style="width: 100%" @selection-change="handleSelectionChange"
                        :header-cell-style="{
                            'background-color': '#666',
                            'color': '#fff',
                            'border-right': '1px #888 solid',
                            'height': '45px'
                        }">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="taskName" label="任务名称"></el-table-column>
                    <el-table-column prop="taskType" label="任务类型"></el-table-column>
                    <el-table-column prop="taskAuthor" label="创建者" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="start" label="开始时间" width="150px"></el-table-column>
                    <el-table-column prop="end" label="结束时间" width="150px"></el-table-column>
                    <el-table-column prop="useTime" label="执行时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="progBar" label="进度条"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span @click="getDetailDia(scope.row)">详情</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <scan-property :ifProScan="ifProScan" :visible.sync="ifProScan"></scan-property>
        <scan-ip :ifIPScan="ifIPScan" :visible.sync="ifIPScan"></scan-ip>
        <scan-result :ifScanRes="ifScanRes" :visible.sync="ifScanRes"></scan-result>
    </div>
</template>
<script>
import ScanProperty from "@/components/property/dialog/scanProperty"
import ScanIp from "@/components/property/dialog/scanIP"
import ScanResult from "@/components/property/dialog/scanResult"
export default {
    data(){
        return{
            // 资产告警各模块的显示状态
            bugAnalysis: [true, false],
            // 漏洞分析子页面导航数据
            scanNav: [
                {
                    showFlag: true,
                    name: "漏洞扫描"
                },
                {
                    showFlag: false,
                    name: "漏洞详情"
                }
            ],
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
            // 是否显示扫描依据菜单
            ifShowScanLists: false,
            ifProScan: false,
            ifIPScan: false,
            // 输入的任务名称
            tasksNameValue: "",
            // 扫描结果列表数据
            scanResult: [
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    useTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                },
                {
                    taskName: "qqqqq",
                    taskType: "111",
                    taskAuthor: "Mark",
                    start: "2018-12-6 17:54:00",
                    end: "2018-12-6 18:54:00",
                    userTime: "1小时0分钟0秒",
                    progBar: "10%",
                    status: "结束"
                }
            ],
            // 是否显示任务详情
            ifScanRes: false,
            multipleSelection: [],
        }
    },
    mounted(){

    },
    methods:{
        // 是否显示扫描依据菜单
        ShowScanLists(){
            this.ifShowScanLists = !this.ifShowScanLists
        },
        // 获取操作菜单值
        getSelectValue(val) {
            this.ifProScan = false
            this.ifIPScan = false
            switch(val){
                case "b": this.ifProScan = true;break;
                case "c": this.ifIPScan = true;break;
            }
        },
        // 操作列表相关方法
        toggleSelection(rows) {
            if(rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            }else{
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 点击详情，弹出对应弹框
        getDetailDia(row){
            console.log(row.taskName)
            this.ifScanRes = !this.ifScanRes
        },
    },
    components:{
        ScanProperty,
        ScanIp,
        ScanResult
    }
}
</script>
<style>
.SPtop{
    min-height:300px;
}
.SPtop .searchBox .buildScan{
    width:20%;
    float:left;
}
.SPtop .searchBox .searchCon{
    width:80%;
    float:right;
    text-align:right;
}
</style>