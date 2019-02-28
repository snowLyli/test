<template>
    <div class="conBox">
        <div class="httpList boxContent boxes">
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
                <span class="label">应用分类:</span>
                <el-select v-model="appKindValue" filterable placeholder="请选择">
                    <el-option v-for="item in appKindOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">方法:</span>
                <el-select v-model="methodValue" filterable placeholder="请选择">
                    <el-option v-for="item in methodOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">行为:</span>
                <el-select v-model="behaveValue" filterable placeholder="请选择">
                    <el-option v-for="item in behaveOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">应用对象:</span>
                <el-input placeholder="请输入" v-model="appObjValue" clearable></el-input>
                <span class="label">访问域名:</span>
                <el-input placeholder="请输入" v-model="domainValue" clearable></el-input>
                <span class="label">请求URL:</span>
                <el-input placeholder="请输入" v-model="urlValue" clearable></el-input>
                <button>搜索</button>
                <button @click="allHttp">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="httpList" stripe style="width: 100%" border
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
                    <el-table-column prop="appKind" label="应用分类" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="appObject" label="应用对象" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column prop="domain" label="访问域名" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column label="请求URL" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <a :href="props.row.url">{{props.row.url}}</a>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="method" label="方法" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="virsion" label="HTTP版本" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="code" label="响应码" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="behave" label="行为" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="120">
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
                <el-pagination @size-change="handleHttp"
                            @current-change="handleHttpCurrent"
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
            /*initHttpList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8180",
                    aimPort: "8180",
                    appKind: "即时通信",
                    appObject: "duixiang1",
                    domain: "domain1",
                    url: "http://www.baidu.com",
                    method: "method1",
                    virsion: "virsion1",
                    code: "code",
                    behave: "behave1",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "即时通信",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "邮箱",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "166.95.231.15",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "邮箱",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "邮箱",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "273.186.85.5",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "购物",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "购物",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "出行旅游",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "出行旅游",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "动漫",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "支付",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "支付",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "游戏",
                    appObject: "duixiang",
                    domain: "domain",
                    url: "http://www.baidu.com",
                    method: "method",
                    virsion: "virsion",
                    code: "code",
                    behave: "behave",
                    operate: true
                }
            ],
            newHttpList: [],*/
            // 初始列表数据
            httpList: [],

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
            appKindOptions: [
                {
                    name: 0,
                    label: "所有",
                    value: 11
                },
                {
                    name: 1,
                    label: "即时通信",
                    value: 11
                },
                {
                    name: 2,
                    label: "阅读",
                    value: 5
                },
                {
                    name: 3,
                    label: "微博",
                    value: 5
                },
                {
                    name: 4,
                    label: "导航",
                    value: 5
                },
                {
                    name: 5,
                    label: "视频",
                    value: 5
                },
                {
                    name: 6,
                    label: "音乐",
                    value: 5
                },
                {
                    name: 7,
                    label: "应用商店",
                    value: 5
                },
                {
                    name: 8,
                    label: "游戏",
                    value: 5
                },
                {
                    name: 9,
                    label: "支付",
                    value: 5
                },
                {
                    name: 10,
                    label: "动漫",
                    value: 5
                },
                {
                    name: 11,
                    label: "邮箱",
                    value: 5
                },
                {
                    name: 12,
                    label: "P2P业务",
                    value: 5
                },
                {
                    name: 13,
                    label: "VoIP业务",
                    value: 5
                },
                {
                    name: 14,
                    label: "彩信",
                    value: 5
                },
                {
                    name: 15,
                    label: "浏览下载",
                    value: 5
                },
                {
                    name: 16,
                    label: "财经",
                    value: 5
                },
                {
                    name: 17,
                    label: "安全杀毒",
                    value: 5
                },
                {
                    name: 18,
                    label: "购物",
                    value: 5
                },
                {
                    name: 19,
                    label: "出行旅游",
                    value: 5
                },
                {
                    name: 20,
                    label: "网盘云服务",
                    value: 5
                },
                {
                    name: 21,
                    label: "其他1",
                    value: 5
                },
                {
                    name: 22,
                    label: "公共流量",
                    value: 5
                }
            ],
            appKindValue: "所有",

            // 方法筛选框数据
            methodOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "get"
                },
                {
                    value: "选项2",
                    label: "post"
                }
            ],
            methodValue: "所有",

            // 行为筛选框数据
            behaveOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "业务登陆"
                },
                {
                    value: "选项2",
                    label: "页面访问"
                },
                {
                    value: "选项3",
                    label: "刷新"
                },
                {
                    value: "选项4",
                    label: "识别"
                }
            ],
            behaveValue: "所有",

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            appObjValue: "所有",
            domainValue: "所有",
            urlValue: "所有",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            httpUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getHttpUrl()
        // 初始列表
        this.getHttpData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getHttpUrl(){
            var dataBase = "http_dpi_xdr"
            var keys = "AppType,HOST,URL,MessageType,HTTPVersion,MessageStatus,ServiceBehaviorFlag,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.httpUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getHttpData(){
            this.$axios.post(this.httpUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.httpList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    aimIp: this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100)+"."+this.random(1,100),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    appKind: item.AppType,
                                    appObject: "duixiang1",
                                    domain: item.HOST,
                                    url: item.URL,
                                    method: item.MessageType == "0" ? "get" : "post",
                                    virsion: item.HTTPVersion=="0"?"HTTP0.9":(item.HTTPVersion=="1"?"HTTP1.0":(item.HTTPVersion=="2"?"HTTP1.1":(item.HTTPVersion=="3"?"HTTP2.0":(item.HTTPVersion=="4"?"WAP1.0":(item.HTTPVersion=="5"?"WAP1.1":"WAP1.2"))))),
                                    code: item.MessageStatus,
                                    behave: item.ServiceBehaviorFlag=="0"?"业务登陆":(item.ServiceBehaviorFlag=="1"?"页面访问":(item.ServiceBehaviorFlag=="2"?"刷新":"未识别")),
                                    operate: true
                                }
                                this.httpList.push(itemObj)
                                this.httpList.map((item, index) => {
                                    this.appKindOptions.map((itm, idx) => {
                                        if(item.appKind == itm.name){
                                            item.appKind = itm.label
                                        }
                                    })
                                })
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleHttp(val) {
            this.getHttpUrl()
            this.getHttpData()
        },
        // 输入将要跳转的页数
        handleHttpCurrent(val) {
            this.getHttpUrl()
            this.getHttpData()
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
                this.selectHttp()
            }
        },
        // 根据输入国家的名称进行搜索
        selectHttp(){
            // 判断是否所有值都为空
            var flag = true

            this.httpList = []
            this.newHttpList = []
            this.initHttpList.map((item, index) => {
                this.httpList.push(item)
                this.newHttpList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newHttpList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
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
                this.newHttpList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }

            if(this.appKindValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.appKind == this.appKindValue){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.methodValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.method == this.methodValue){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.behaveValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.behave == this.behaveValue){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.appObjValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.appObject.indexOf(this.appObjValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.domainValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.domain.indexOf(this.domainValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(this.urlValue){
                flag = false
                this.newHttpList.map((item, index) => {
                    if(item.url.indexOf(this.urlValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.httpList = []
                this.newHttpList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.httpList.push(item)
                    }
                    this.newHttpList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitHttp()
            }
            this.allData = this.newHttpList.length
        },

        // 点击重置按钮，将所有数据显示
        allHttp(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = "所有"
            this.appKindValue = "所有"
            this.methodValue = "所有"
            this.behaveValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.appObjValue = "所有"
            this.domainValue = "所有"
            this.urlValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getHttpUrl()
            this.getHttpData()
        },
    }
}
</script>

<style>
.httpList{
    overflow: hidden;
}
</style>
