<template>
    <div class="conBox">
        <div class="dnsList boxContent boxes">
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
                <span class="label">状态:</span>
                <el-select v-model="statusValue" filterable placeholder="请选择">
                    <el-option v-for="item in statusOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">查询域名:</span>
                <el-input placeholder="请输入" v-model="domainValue" clearable></el-input>
                <span class="label">查询结果:</span>
                <el-input placeholder="请输入" v-model="resValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allDns">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="dnsList" stripe style="width: 100%" border
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
                    <el-table-column prop="aimPort" label="目的端口" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="domain" label="查询域名" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="res" label="查询结果" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.operate">
                                详情
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            <div class="block">
                <el-pagination @size-change="handleDns"
                            @current-change="handleDnsCurrent"
                            :current-page.sync="curPage"
                            :page-sizes="[1,10,15,20]"
                            :page-size.sync="everyPage"
                            layout="total, sizes, jumper"
                            :total.sync="allData">
                </el-pagination>
            </div>
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
            /*initDnsList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8180",
                    aimPort: "8180",
                    domain: "domain1",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "成功",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "成功",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "失败",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "273.186.85.5",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "失败",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "失败",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    domain: "domain",
                    status: "查询",
                    res: "235436457",
                    operate: true
                }
            ],
            newDnsList: [],*/
            // 初始列表数据
            dnsList: [],
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

            // 状态筛选框数据
            statusOptions: [
                {
                    value: "选项0",
                    label: "所有"  
                },
                {
                    value: "选项1",
                    label: "成功"
                },
                {
                    value: "选项2",
                    label: "失败"
                },
                {
                    value: "选项2",
                    label: "查询"
                }
            ],
            statusValue: "所有",
            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            domainValue: "所有",
            resValue: "所有",
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            dnsUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getDnsUrl()
        // 初始列表
        this.getDnsData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getDnsUrl(){
            var dataBase = "dns_dpi_xdr"
            var keys = "DomainName,Rcode,Rcode,IPAddr,Cname,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.dnsUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getDnsData(){
            this.$axios.post(this.dnsUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.dnsList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    aimIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    domain: item.DomainName,
                                    status: item.Rcode=="0"?"成功":(item.Rcode=="1"?"格式错误":(item.Rcode=="2"?"服务器错误":(item.Rcode=="3"?"名字错误":(item.Rcode=="4"?"不支持的请求":"拒绝")))),
                                    res: item.Cname,
                                    operate: true
                                }
                                this.dnsList.push(itemObj)
                            })
                            console.log(this.dnsList)
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleDns(val) {
            this.getDnspUrl()
            this.getDnsData()
        },
        // 输入将要跳转的页数
        handleDnsCurrent(val) {
            this.getDnsUrl()
            this.getDnsData()
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
                this.selectDns()
            }
        },
        // 根据输入国家的名称进行搜索
        selectDns(){
            // 判断是否所有值都为空
            var flag = true

            this.dnsList = []
            this.newDnsList = []
            this.initDnsList.map((item, index) => {
                this.dnsList.push(item)
                this.newDnsList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newDnsList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
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
                this.newDnsList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }

            if(this.statusValue){
                flag = false
                this.newDnsList.map((item, index) => {
                    if(item.status == this.statusValue){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newDnsList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newDnsList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }
            if(this.domainValue){
                flag = false
                this.newDnsList.map((item, index) => {
                    if(item.domain.indexOf(this.domainValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }
            if(this.resValue){
                flag = false
                this.newDnsList.map((item, index) => {
                    if(item.res.indexOf(this.resValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.dnsList = []
                this.newDnsList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.dnsList.push(item)
                    }
                    this.newDnsList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitDns()
            }
            this.allData = this.newDnsList.length
        },

        // 点击重置按钮，将所有数据显示
        allDns(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = "所有"
            this.statusValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.domainValue = "所有"
            this.resValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getDnsUrl()
            this.getDnsData()
        },
    }
}
</script>

<style>
.dnsList{
    width:100%;
    overflow: hidden;
}
</style>
