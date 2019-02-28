<template>
    <div class="conBox">
        <div class="LPPtop boxContent boxes">
            <div class="searchBox">
                <el-select placeholder="事件级别" v-model="eventValue">
                    <el-option v-for="item in eventRanks" :key="item.value" :label="item.label"
                                :value="item.value">
                    </el-option>
                </el-select>
                <el-select placeholder="资产类型" v-model="eventValue">
                    <el-option v-for="item in eventRanks" :key="item.value" :label="item.label"
                                :value="item.value">
                    </el-option>
                </el-select>
                <el-select placeholder="所属组" v-model="eventValue">
                    <el-option v-for="item in eventRanks" :key="item.value" :label="item.label"
                                :value="item.value">
                    </el-option>
                </el-select>
                <el-select placeholder="所属机房" v-model="eventValue">
                    <el-option v-for="item in eventRanks" :key="item.value" :label="item.label"
                                :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="资产名称" v-model="eventValue"></el-input>
                <el-input placeholder="IP地址" v-model="eventValue"></el-input>
                <el-input placeholder="时间描述" v-model="eventValue"></el-input>
                <span class="searchBtn btn" style="cursor:pointer;">搜索</span>
                <span class="resetBtn btn" style="cursor:pointer;">重置</span>
            </div>
            <el-table :data="tableData" style="width: 100%" 
                        :header-cell-style="{
                            'background-color': '#666',
                            'color': '#fff',
                            'border-right': '1px #888 solid',
                            'height': '45px'
                        }"
                        :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column prop="time" label="时间" sortable></el-table-column>      
                <el-table-column prop="eventRank" label="事件等级" sortable></el-table-column>
                <el-table-column prop="proName" label="资产名称" ></el-table-column>
                <el-table-column prop="proType" label="资产类型"></el-table-column>
                <el-table-column prop="belongGroup" label="所属组" ></el-table-column>
                <el-table-column prop="belongComRoom" label="所属机房" ></el-table-column>
                <el-table-column prop="IP" label="IP地址" width="105px"></el-table-column>
                <el-table-column prop="courseName" label="进程名" ></el-table-column>
                <el-table-column prop="coursePID" label="进程PID" ></el-table-column>
                <el-table-column prop="eventDescribe" label="事件描述"></el-table-column>
                <el-table-column prop="hostName" label="hostname"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 事件级别
            eventRanks: [
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
            eventValue: "",
            // 服务器日志列表
            tableData: [
                {
                    time: "2018-12-26",
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                },
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }, 
                {
                    time: "2018-12-26",
                    eventRank: "一级",
                    proName: "1234",
                    proType: "机房",
                    belongGroup: "A",
                    belongComRoom: "A",
                    IP: "10.0.100.234",
                    courseName: "AA",
                    coursePID: "12345",
                    eventDescribe: "aaaaaa",
                    hostName: "taishi"
                }
            ],
        }
    },
    mounted(){

    },
    methods:{
        // 显示当前选中列表标题
        preShow(num){
            this.aLogNav.map((item, index) => {
                if(index == num){
                    this.aLogNav[index].showFlag = true
                    this.alarmLogs[index] = true
                }else{
                    this.aLogNav[index].showFlag = false
                    this.alarmLogs[index] = false
                }
            })
        },
    }
}
</script>
<style>
.LPPtop{
    min-height:300px;
}
</style>
