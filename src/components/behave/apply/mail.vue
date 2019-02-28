<template>
    <div class="conBox">
        <div class="mailList boxContent boxes">
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
                <span class="label">协议:</span>
                <el-select v-model="proValue" filterable placeholder="请选择">
                    <el-option v-for="item in proOption" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">应用对象:</span>
                <el-select v-model="appObjValue" filterable placeholder="请选择">
                    <el-option v-for="item in appObjOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">发件人:</span>
                <el-input placeholder="请输入" v-model="sendValue" clearable></el-input>
                <span class="label">收件人:</span>
                <el-input placeholder="请输入" v-model="receiveValue" clearable></el-input>
                <span class="label">抄送人:</span>
                <el-input placeholder="请输入" v-model="copyValue" clearable></el-input>
                <span class="label">标题:</span>
                <el-input placeholder="请输入" v-model="titleValue" clearable></el-input>
                <span class="label">正文:</span>
                <el-input placeholder="请输入" v-model="textValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allMail">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="mailList" stripe style="width: 100%" border
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
                    <el-table-column prop="protocol" label="协议" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="appObject" label="应用对象" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="userName" label="用户名" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="password" label="密码" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column prop="send" label="发件人" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="receive" label="收件人" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="copy" label="抄送人" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="bcc" label="密送人" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="text" label="正文" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="200">
                        <template slot-scope="props">
                            <button :disabled="props.row.operate[0]">
                                详情
                            </button>
                            <button :disabled="props.row.operate[1]">
                                EML文件
                            </button>
                            <button :disabled="props.row.operate[2]"
                                @click="toRestore(props.row)">
                                附件还原
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleMail"
                            @current-change="handleMailCurrent"
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
            // 初始列表数据
            mailList: [],
            // 模拟数据
            apply: [
                {
                    obj: "网易邮箱大师"
                },
                {
                    obj: "139邮箱"
                }
            ],
            
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

            // 应用分类筛选框数据
            proOption: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "HTTP"
                },
                {
                    value: "选项2",
                    label: "SMTP"
                },
                {
                    value: "选项3",
                    label: "POP3"
                },
                {
                    value: "选项4",
                    label: "IMAP"
                }
            ],
            proValue: "所有",
            
            // 应用对象筛选框数据
            appObjOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "163邮箱"
                },
                {
                    value: "选项2",
                    label: "QQ邮箱"
                },
                {
                    value: "选项3",
                    label: "139邮箱"
                }
            ],
            appObjValue: "所有",

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            sendValue: "所有",
            receiveValue: "所有",
            copyValue: "所有",
            titleValue: "所有",
            textValue: "所有",

            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            mailUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getMailUrl()
        // 初始列表
        this.getMailData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getMailUrl(){
            var dataBase = "dpi_mdr_email"
            var keys = "protocol,app_sub_id,account,sender,receiver,cc,subject,content,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.mailUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getMailData(){
            this.$axios.post(this.mailUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.mailList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    aimIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    protocol: item.protocol,
                                    appObject: this.apply[this.random(0, 2)].obj, // item.app_sub_id,
                                    userName: item.account,
                                    password: "123456",
                                    send: item.sender,
                                    receive: item.receiver,
                                    copy: item.cc,
                                    bcc: item.cc,
                                    title: item.subject,
                                    text: item.content,
                                    operate: [true, true, ]
                                }
                                this.mailList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleMail(val) {
            this.getMailUrl()
            this.getMailData()
        },
        // 输入将要跳转的页数
        handleMailCurrent(val) {
            this.getMailUrl()
            this.getMailData()
        },
        toRestore(val){
            this.$router.push({
                name: "Restore",
                params: {
                    val: val
                }
            })
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
                this.selectMail()
            }
        },
        // 根据输入国家的名称进行搜索
        selectMail(){
            // 判断是否所有值都为空
            var flag = true

            this.mailList = []
            this.newMailList = []
            this.initMailList.map((item, index) => {
                this.mailList.push(item)
                this.newMailList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newMailList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
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
                this.newMailList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }

            if(this.proValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.protocol == this.proValue){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.appObjValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.appObject == this.appObjValue){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.sendValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.send.indexOf(this.sendValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.receiveValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.receive.indexOf(this.receiveValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.copyValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.copy.indexOf(this.copyValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.titleValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.title.indexOf(this.titleValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(this.textValue){
                flag = false
                this.newMailList.map((item, index) => {
                    if(item.text.indexOf(this.textValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.mailList = []
                this.newMailList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.mailList.push(item)
                    }
                    this.newMailList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitMail()
            }
            this.allData = this.newMailList.length
        },

        // 点击重置按钮，将所有数据显示
        allMail(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = ""
            this.proValue = "所有"
            this.appObjValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.sendValue = "所有"
            this.receiveValue = "所有"
            this.copyValue = "所有"
            this.titleValue = "所有"
            this.textValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getMailUrl()
            this.getMailData()
        },
    }
}
</script>

<style>
.mailList{
    overflow: hidden;
}
</style>

