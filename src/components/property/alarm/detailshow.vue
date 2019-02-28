<template>
    <div class="conBox">
        <div class="ADPtop boxContent boxes">
            <div class="searchBox">
                <div class="ADPleft">
                    <button class="export">导出报表</button>
                </div>
                <div class="ADPright">
                    <span class="label">时间:</span>
                    <el-date-picker v-model="dateValue" type="daterange" unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="searchMsgBySelect">
                    </el-date-picker>
                    <el-select placeholder="全部等级" v-model="rankValue"
                                @change="searchMsgBySelect">
                        <el-option v-for="item in rankList" :key="item.value" :label="item.label"
                                    :value="item.label">
                        </el-option>
                    </el-select>
                    <el-select placeholder="关注度" v-model="focusValue">
                        <el-option v-for="item in focusList" :key="item.value" :label="item.label"
                                    :value="item.label">
                        </el-option>
                    </el-select>
                    <el-select placeholder="全部状态" v-model="statusValue"
                                @change="searchMsgBySelect">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                                    :value="item.label">
                        </el-option>
                    </el-select>
                    <el-input placeholder="请输入资产名" v-model="proNameValue"
                            @keyup.native="searchMsgBySelect"></el-input>
                    <button @click="searchMsgBySelect">搜索</button>
                    <button @click="showAllData">重置</button>
                </div>
            </div>
            <div class="listContent">
                <el-table ref="multipleTable" :data="proListData" tooltip-effect="dark" style="width: 100%;"
                            :header-cell-style="{
                                'background-color': '#666',
                                'color': '#fff',
                                'border-right': '1px #888 solid'
                            }"
                            @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="time" label="时间" 
                                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="properties" label="资产名称" 
                                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="alarmName" label="告警名称" 
                                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="rank" label="告警等级" width="100px"
                                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="describe" label="描述" 
                                        :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="status" label="状态" 
                                        :show-overflow-tooltip="true"></el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleProperty"
                                    @current-change="handlePropertyCurrent"
                                    :current-page="curPage"
                                    :page-sizes="[5,10,15,20]"
                                    :page-size="everyPage"
                                    layout="total, sizes, prev, pager, next, jumper" :total="allData">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 资产列表数据
            initProListData: [
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-06 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_slave3",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-06 05:58",
                    status: "已处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_slave3",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-07 05:58",
                    status: "已处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_slave3",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-07 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-08 05:58",
                    status: "已处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-08 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-09 05:58",
                    status: "已处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-09 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-11 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-11 05:58",
                    status: "已处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-12 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-12 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-12 05:58",
                    status: "未处理"
                },
                {
                    rank: "严重",
                    alarmName: "1分钟负载/CPU核数过高",
                    properties: "centos6.5_gv162",
                    describe: "Relative LoadAvg 1 >= 1.5null Relative LoadAvg 1 >= 1.5null",
                    time: "2018-12-14 05:58",
                    status: "未处理"
                }
            ],
            // 资产列表操作数据
            proListData: [],
            // 日志列表选择后的时间值
            dateValue: "",
            // 等级选择框数据
            rankList: [
                {
                    value: "选项1",
                    label: "严重"
                },
                {
                    value: "选项2",
                    label: "高危"
                },
                {
                    value: "选项3",
                    label: "中危"
                },
                {
                    value: "选项4",
                    label: "低危"
                }
            ],
            // 选择后的等级
            rankValue: "",
            // 类型选择框数据
            focusList: [
                {
                    value: "选项1",
                    label: "已关注"
                },
                {
                    value: "选项2",
                    label: "未关注"
                }
            ],
            // 选择后的类型
            focusValue: "",
            // 状态选择框数据
            statusList: [
                {
                    value: "选项1",
                    label: "已处理"
                },
                {
                    value: "选项2",
                    label: "未处理"
                }
            ],
            // 选择后的状态
            statusValue: "",
            // 输入的资产名称
            proNameValue: "",
            // 当前页数
            curPage: 0,
            // 每页显示的个数
            everyPage: 10,
            // 总共数据条数
            allData: 0,
            // 搜索后的数据
            newData: []
        }
    },
    mounted(){
        // 初始列表
        this.getInitProList(this.initProListData)
    },
    methods:{
        // 初始列表
        getInitProList(Obj){
            this.getAllData()
            this.proListData = []
            this.newData = []
            this.initProListData.map((item, index) => {
                if(index < this.everyPage){
                    this.proListData.push(item)
                }
                this.newData.push(item)
            })
        },
        // 获取列表数据总数
        getAllData(){
            this.allData = this.initProListData.length
        },
        // 获取选择到的数据
        searchMsgBySelect(){
            this.proListData = []
            this.newData = []
            this.initProListData.map((item, index) => {
                this.proListData.push(item)
            })
            var selectArr = [] // 存放筛选之后的数据
            // 筛选时间
            if(this.dateValue){
                var startTime = OtherFunction.getTime(this.dateValue[0], "m", false)
                var endTime = OtherFunction.getTime(this.dateValue[1], "m", false)
                // 将时间转化为可比较的数
                startTime = startTime.replace(/-|\s|:/g,"")
                endTime = endTime.replace(/-|\s|:/g,"")
                this.proListData.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.proListData = []
                this.newData = []
                selectArr.map((item, index) => {
                    this.proListData.push(item)
                    this.newData.push(item)
                })
                selectArr = []
            }
            // 资产名
            if(this.proNameValue){
                this.proListData.map((item, index) => {
                    if(item.properties.indexOf(this.proNameValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.proListData = []
                this.newData = []
                selectArr.map((item, index) => {
                    this.proListData.push(item)
                    this.newData.push(item)
                })
                selectArr = []
            }
            // 等级
            if(this.rankValue){
                this.proListData.map((item, index) => {
                    if(item.rank == this.rankValue){
                        selectArr.push(item)
                    }
                })
                this.proListData = []
                this.newData = []
                selectArr.map((item, index) => {
                    this.proListData.push(item)
                    this.newData.push(item)
                })
                selectArr = []
            }
            // 状态
            if(this.statusValue){
                this.proListData.map((item, index) => {
                    if(item.status == this.statusValue){
                        selectArr.push(item)
                    }
                })
                this.proListData = []
                this.newData = []
                selectArr.map((item, index) => {
                    this.proListData.push(item)
                    this.newData.push(item)
                })
                selectArr = []
            }
            this.allData = this.proListData.length
        },
        // 显示全部信息
        showAllData(){
            this.getInitProList()
            this.dateValue = ""
            this.proNameValue = ""
            this.rankValue = ""
            this.statusValue = ""
        },
        // 列表相关操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 资产详情列表选择当前列表每页显示数据的条数
        handleProperty(val) {
            this.everyPage = val
            this.proListData = []
            var limitNum = this.newData.length < val ? this.newData.length : val
            for(var i=0;i<limitNum;i++){
                this.proListData.push(this.newData[i])
            }
        },
        // 资产详情列表输入将要跳转的页数
        handlePropertyCurrent(val) {
            this.proListData = []
            var start = (val-1)*this.everyPage
            var end = val*this.everyPage
            if(end > this.allData){
                end = this.allData
            }
            for(var i=start;i<end;i++){
                this.proListData.push(this.newData[i])
            }
        }
    }
}
</script>
<style>
.ADPtop{
    min-height:300px;
}
/* 告警列表选择框样式 */
.ADPtop .searchBox>.ADPleft,
.ADPtop .searchBox>.ADPright{
    float:left;
    height:100%;
}
.ADPtop .searchBox>.ADPleft{
    width:20%;
    box-sizing: border-box;
    padding: 0.5% 0;
}
.ADPtop .searchBox>.ADPright{
    text-align:right;
    width:80%;
}
.ADPtop .listContent{
    overflow:hidden;
}
</style>
