<template>
    <div class="conBox">
        <div class="sipList boxContent boxes">
             <div class="searchBox">
                <span class="label">时间:</span>
                <el-select v-model="listTimeValue" filterable placeholder="请选择">
                    <el-option v-for="item in listTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="listDateValue" type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                                v-if="listTimeValue == '自定义'">
                </el-date-picker>
                <span class="label">呼叫方向:</span>
                <el-select v-model="directionValue" filterable placeholder="请选择">
                    <el-option v-for="item in directionOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">呼叫类型:</span>
                <el-select v-model="typeValue" filterable placeholder="请选择">
                    <el-option v-for="item in typeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">挂机原因:</span>
                <el-select v-model="reasonValue" filterable placeholder="请选择">
                    <el-option v-for="item in reasonOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">事务类型:</span>
                <el-select v-model="eventTypeValue" filterable placeholder="请选择">
                    <el-option v-for="item in eventTypeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">主叫号码:</span>
                <el-input placeholder="请输入" v-model="activeValue" clearable></el-input>
                <span class="label">被叫号码:</span>
                <el-input placeholder="请输入" v-model="passiveValue" clearable></el-input>
                <span class="label">消息响应码:</span>
                <el-input placeholder="请输入" v-model="msgCodeValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allSip">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="sipList" stripe style="width: 100%" border
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
                    <el-table-column prop="time" label="时间" sortable :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="originIp" label="源IP" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="aimIp" label="目的IP" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="oriPort" label="源端口" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="aimPort" label="目的端口" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="direction" label="呼叫方向" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="active" label="主叫号码" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="passive" label="被叫号码" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="type" label="呼叫类型" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="reason" label="挂机原因" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="eventType" label="事务类型" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column prop="msgCode" label="消息响应码" :show-overflow-tooltip="true"  width="150"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.operate">
                                详情
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSip"
                            @current-change="handleSipCurrent"
                            :current-page.sync="curPage"
                            :page-sizes="[1,10,15,20]"
                            :page-size.sync="everyPage"
                            layout="total, sizes, jumper"
                            :total.sync="allData">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../../static/public/css/comCommon.css"
import OtherFunction from "../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            // 模拟数据
            /*initSipList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8180",
                    aimPort: "8180",
                    direction: "呼出",
                    active: "13459873509",
                    passive: "15733997804",
                    type: "type1",
                    reason: "reason1",
                    eventType: "eventType1",
                    msgCode: "2243",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "273.186.85.5",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    direction: "呼入",
                    active: "15533974690",
                    passive: "15733997804",
                    type: "type2",
                    reason: "reason2",
                    eventType: "eventType2",
                    msgCode: "7683",
                    operate: true
                }
            ],
            newSipList: [],*/
            // 初始列表数据
            sipList: [],

            // 列表时间选择框数据
            listTimeOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
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
                }
            ],
            listTimeValue: "24小时",
            listTimeRange: [],
            listDateValue: "",
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }, 

            // 呼叫方向筛选框数据
            directionOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "呼出"
                },
                {
                    value: "选项2",
                    label: "呼入"
                }
            ],
            directionValue: "所有",

            // 呼叫类型筛选框数据
            typeOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "PC-Phone"
                },
                {
                    value: "选项2",
                    label: "Phone-Phone"
                },
                {
                    value: "选项3",
                    label: "PC-PC"
                }
            ],
            typeValue: "所有",

            // 挂机原因选框数据
            reasonOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "主叫挂机"
                },
                {
                    value: "选项2",
                    label: "被叫挂机"
                },
                {
                    value: "选项3",
                    label: "异常挂机"
                }
            ],
            reasonValue: "所有",

            // 事务类型选框数据
            eventTypeOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "Register"
                },
                {
                    value: "选项2",
                    label: "Invite"
                }
            ],
            eventTypeValue: "所有",

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            activeValue: "所有",
            passiveValue: "所有",
            msgCodeValue: "所有",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            sipUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getSipUrl()
        // 初始列表
        this.getSipData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getSipUrl(){
            var dataBase = "sip_dpi_xdr"
            var keys = "Direction,CallingNumber,CalledNumber,SIPXDRType,Reason,MessageType,MessageStatus,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.httpUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getSipData(){
            this.$axios.post(this.httpUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.sipList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    aimIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    direction: item.Direction == "0" ? "呼入" : "呼出",
                                    active: item.CallingNumber,
                                    passive: item.CalledNumber,
                                    type: item.SIPXDRType == "0" ? "PC-Phone" : (item.SIPXDRType == "1" ? "Phone-Phone" : "PC-PC"),
                                    reason: item.Reason == "0" ? "主叫挂机" : (item.Reason == "1" ? "被叫挂机" : "异常挂机"),
                                    eventType: item.MessageType,
                                    msgCode: item.MessageStatus,
                                    operate: true
                                }
                                this.sipList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleSip(val) {
            this.getSipUrl()
            this.getSipData()
        },
        // 输入将要跳转的页数
        handleSipCurrent(val) {
            this.getSipUrl()
            this.getSipData()
        },

        // 获取选择的时间段
        getSelectTime(){
            var timeLimit = OtherFunction.getLimitTime(this.listTimeValue)
            if(timeLimit != "自定义"){
                // 判断选择的值，返回相应的时间
                var start = OtherFunction.getLimitTime(this.listTimeValue)[0]
                var now = OtherFunction.getLimitTime(this.listTimeValue)[1]
                this.listTimeRange[0] = start
                this.listTimeRange[1] = now
                this.selectSip()
            }
        },
        // 根据输入国家的名称进行搜索
        selectSip(){
            // 判断是否所有值都为空
            var flag = true

            this.sipList = []
            this.newSipList = []
            this.initSipList.map((item, index) => {
                this.sipList.push(item)
                this.newSipList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newSipList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.listDateValue){
                flag = false
                var startTime = OtherFunction.getTime(this.listDateValue[0], "y", false)
                var endTime = OtherFunction.getTime(this.listDateValue[1], "y", false)
                // 将时间转化为可比较的数
                startTime = startTime.replace(/-|\s|:/g,"")
                endTime = endTime.replace(/-|\s|:/g,"")
                this.newSipList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }

            if(this.directionValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.direction == this.directionValue){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.typeValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.type == this.typeValue){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.reasonValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.reason == this.reasonValue){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.activeValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.active.indexOf(this.activeValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.passiveValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.passive.indexOf(this.passiveValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(this.msgCodeValue){
                flag = false
                this.newSipList.map((item, index) => {
                    if(item.msgCode.indexOf(this.msgCodeValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.sipList = []
                this.newSipList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.sipList.push(item)
                    }
                    this.newSipList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitSip()
            }
            this.allData = this.newSipList.length
        },

        // 点击重置按钮，将所有数据显示
        allSip(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = "所有"
            this.directionValue = "所有"
            this.typeValue = "所有"
            this.reasonValue = "所有"
            this.eventTypeValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.activeValue = "所有"
            this.passiveValue = "所有"
            this.msgCodeValue = "所有"
            this.everyPage = 10
            this.getSipUrl()
            this.getSipData()
        },
    }
}
</script>

<style>
.sipList{
    overflow: hidden;
}
</style>
