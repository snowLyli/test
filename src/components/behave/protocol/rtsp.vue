<template>
    <div class="conBox">
        <div class="rtspList boxContent boxes">
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
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">访问URL:</span>
                <el-input placeholder="请输入" v-model="urlValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allRtsp">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="rtspList" stripe style="width: 100%" border
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
                    <el-table-column prop="originIp" label="源IP" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="aimIp" label="目的IP" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="oriPort" label="源端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="url" label="访问URL" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="customer" label="客户端" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="rtpServerIp" label="RTP Server IP" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="cusStartPort" label="客户端起始端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="cusEndPort" label="客户端结束端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="serStartPort" label="服务器起始端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="serEndPort" label="服务器结束端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="videoCount" label="音频流数" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="audioCount" label="视频流数" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="respond" label="响应时延(μs)" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.operate">
                                详情
                            </button>
                            <button :disabled="props.row.operate">
                                文件还原
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleRtsp"
                            @current-change="handleRtspCurrent"
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
            /*initRtspList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8180",
                    aimPort: "8180",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "457.34.576.34",
                    cusStartPort: "8000",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8000",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number4",
                    audioCount: "numberc",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "273.186.85.5",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    url: "http://www.baidu.com",
                    customer: "UserAgent",
                    rtpServerIp: "356.34.576.34",
                    cusStartPort: "8080",
                    cusEndPort: "8990",
                    serStartPort: "3000",
                    serEndPort: "4000",
                    videoCount: "number1",
                    audioCount: "numbera",
                    respond: "3s",
                    operate: true
                }
            ],
            newRtspList: [],*/
            // 初始列表数据
            rtspList: [],

            // 列表时间选择框数据
            listTimeOptions: [
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

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            urlValue: "所有",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            rtspUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getRtspUrl()
        // 初始列表
        this.getRtspData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getRtspUrl(){
            var dataBase = "rtsp_dpi_xdr"
            var keys = "URL,UserAgent,RTPServerIP,ClientStartingPort,ClientEndingPort,ServerStartingPort,ServerEndingPort,VideoFlowNumber,AudioFlowNumber,ResponseDelay,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.rtspUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getRtspData(){
            this.$axios.post(this.rtspUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.rtspList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    aimIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    url: item.URL,
                                    customer: item.UserAgent,
                                    rtpServerIp: item.RTPServerIP,
                                    cusStartPort: item.ClientStartingPort,
                                    cusEndPort: item.ClientEndingPort,
                                    serStartPort: item.ServerStartingPort,
                                    serEndPort: item.ServerEndingPort,
                                    videoCount: item.VideoFlowNumber,
                                    audioCount: item.AudioFlowNumber,
                                    respond: item.ResponseDelay,
                                    operate: true
                                }
                                this.rtspList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleRtsp(val) {
            this.getRtspUrl()
            this.getRtspData()
        },
        // 输入将要跳转的页数
        handleRtspCurrent(val) {
            this.getRtspUrl()
            this.getRtspData()
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
                this.selectFtsp()
            }
        },
        // 根据输入国家的名称进行搜索
        selectFtsp(){
            // 判断是否所有值都为空
            var flag = true

            this.rtspList = []
            this.newRtspList = []
            this.initRtspList.map((item, index) => {
                this.rtspList.push(item)
                this.newRtspList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newRtspList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.rtspList = []
                this.newRtspList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.rtspList.push(item)
                    }
                    this.newRtspList.push(item)
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
                this.newRtspList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.rtspList = []
                this.newRtspList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.rtspList.push(item)
                    }
                    this.newRtspList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newRtspList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.rtspList = []
                this.newRtspList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.rtspList.push(item)
                    }
                    this.newRtspList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newRtspList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.rtspList = []
                this.newRtspList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.rtspList.push(item)
                    }
                    this.newRtspList.push(item)
                })
                selectArr = []
            }
            if(this.urlValue){
                flag = false
                this.newRtspList.map((item, index) => {
                    if(item.url.indexOf(this.urlValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.rtspList = []
                this.newRtspList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.rtspList.push(item)
                    }
                    this.newRtspList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitRtsp()
            }
            this.allData = this.newRtspList.length
        },

        // 点击重置按钮，将所有数据显示
        allRtsp(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.urlValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getRtspUrl()
            this.getRtspData()
        },
    }
}
</script>

<style>
.rtspList{
    overflow: hidden;
}
</style>
