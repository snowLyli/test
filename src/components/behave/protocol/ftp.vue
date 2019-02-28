<template>
    <div class="conBox">
        <div class="ftpList boxContent boxes">
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
                <span class="label">操作类型:</span>
                <el-select v-model="opeKindValue" filterable placeholder="请选择">
                    <el-option v-for="item in opeOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">文本传输模式:</span>
                <el-select v-model="connectValue" filterable placeholder="请选择">
                    <el-option v-for="item in connectOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">FTP状态:</span>
                <el-select v-model="ftpStatusValue" filterable placeholder="请选择">
                    <el-option v-for="item in ftpStatusOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">文件大小范围:</span>
                <el-select v-model="fileSizeValue" filterable placeholder="请选择">
                    <el-option v-for="item in fileSizeOption" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">账号:</span>
                <el-input placeholder="请输入" v-model="useCode" clearable></el-input>
                <span class="label">文件名:</span>
                <el-input placeholder="请输入" v-model="fileNameValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allFtp">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="ftpList" stripe style="width: 100%" border
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
                    <el-table-column prop="useCode" label="账号" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="opeType" label="操作类型" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="fileName" label="文件名称" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="connect" label="文件传输模式" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="catalog" label="当前目录" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="fileSize" label="文件大小(B)" sortable :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="respond" label="响应时延(μs)" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="connectTime" label="传输时长(μs)" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="ftpStatus" label="FTP状态" :show-overflow-tooltip="true" width="150"></el-table-column>
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
                <el-pagination @size-change="handleFtp"
                            @current-change="handleFtpCurrent"
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
            /*initFtpList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8180",
                    aimPort: "8180",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "1669579805",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式2",
                    catalog: "bbb",
                    fileSize: "1~10MB",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "3435325436",
                    opeType: "浏览",
                    fileName: "file2",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "10MB以上",
                    respond: "2s",
                    connectTime: "10s",
                    ftpStatus: "失败",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "下载",
                    fileName: "file2",
                    connect: "模式1",
                    catalog: "bbb",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "下载",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "273.186.85.5",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "下载",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "下载",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "下载",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    useCode: "253044217",
                    opeType: "浏览",
                    fileName: "file1",
                    connect: "模式1",
                    catalog: "aaa",
                    fileSize: "1MB以下",
                    respond: "2s",
                    connectTime: "5s",
                    ftpStatus: "成功",
                    operate: true
                }
            ],
            newFtpList: [],*/
            // 初始列表数据
            ftpList: [],

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

            // 操作类型筛选框数据
            opeOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "下载"
                },
                {
                    value: "选项2",
                    label: "上传"
                },
                {
                    value: "选项2",
                    label: "其他"
                }
            ],
            opeKindValue: "所有",

            // 文本传输筛选框数据
            connectOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "ASCII类型"
                },
                {
                    value: "选项2",
                    label: "EBCDIC类型"
                },
                {
                    value: "选项3",
                    label: "Image类型"
                },
                {
                    value: "选项4",
                    label: "L类型"
                },
                {
                    value: "选项5",
                    label: "其他未知类型"
                }
            ],
            connectValue: "所有",

            // ftp状态筛选框数据
            ftpStatusOptions: [
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
                }
            ],
            ftpStatusValue: "所有",

            // 文件范围选择框数据
            fileSizeOption: [
               {
                  value: "选项1",
                  label: "1MB以下"
               },
               {
                  value: "选项2",
                  label: "1~10MB"
               },
               {
                  value: "选项3",
                  label: "10MB以上"
               }
            ],
            fileSizeValue: "所有",

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            useCode: "所有",
            fileNameValue: "所有",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            ftpUrl: ""
        }
    },
    mounted(){
        // 获取Ftp列表url
        this.getFtpUrl()
        // 初始列表
        this.getFtpData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getFtpUrl(){
            var dataBase = "ftp_dpi_xdr"
            var keys = "UserName,TransType,FileName,TransMode,FilePath,FileSize,ResponseTime,TransTime,FTPStatus,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.ftpUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getFtpData(){
            this.$axios.post(this.ftpUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.ftpList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    aimIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    useCode: item.UserName,
                                    opeType: item.TransType=="0"?"上传":(item.TransType=="1"?"下载":"其他"),
                                    fileName: item.FileName,
                                    connect: item.TransMode=="0"?"ASCII":(item.TransMode=="1"?"EBCDIC类型":(item.TransMode=="2"?"Image类型":(item.TransMode=="3"?"L类型":"其他未知类型"))),
                                    catalog: item.FilePath,
                                    fileSize: item.FileSize,
                                    respond: item.ResponseTime,
                                    connectTime: item.TransTime,
                                    ftpStatus: item.FTPStatus,
                                    operate: true
                                }
                                this.ftpList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleFtp(val) {
            this.getFtpUrl()
            this.getFtpData()
        },
        // 输入将要跳转的页数
        handleFtpCurrent(val) {
            this.getFtpUrl()
            this.getFtpData()
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
                this.selectFtp()
            }
        },
        // 根据输入国家的名称进行搜索
        selectFtp(){
            // 判断是否所有值都为空
            var flag = true

            this.ftpList = []
            this.newFtpList = []
            this.initFtpList.map((item, index) => {
                this.ftpList.push(item)
                this.newFtpList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newFtpList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
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
                this.newFtpList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }

            if(this.opeKindValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.opeType == this.opeKindValue){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.connectValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.connect == this.connectValue){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.ftpStatusValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.ftpStatus == this.ftpStatusValue){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.fileSizeValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.fileSize == this.fileSizeValue){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.useCode){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.useCode.indexOf(this.useCode) >= 0){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(this.fileNameValue){
                flag = false
                this.newFtpList.map((item, index) => {
                    if(item.fileName.indexOf(this.fileNameValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.ftpList = []
                this.newFtpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.ftpList.push(item)
                    }
                    this.newFtpList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitFtp()
            }
            this.allData = this.newFtpList.length
        },

        // 点击重置按钮，将所有数据显示
        allFtp(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = "所有"
            this.opeKindValue = "所有"
            this.connectValue = "所有"
            this.ftpStatusValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.useCode = "所有"
            this.fileNameValue = "所有"
            this.urlValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getFtpUrl()
            this.getFtpData()
        },
    }
}
</script>

<style>
.ftpList{
    overflow: hidden;
}
</style>
