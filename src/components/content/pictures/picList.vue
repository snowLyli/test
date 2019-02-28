<template>
    <div class="conBox">
        <div class="PLPtop boxContent boxes">
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
                <span class="label">应用对象:</span>
                <el-select v-model="appObjValue" filterable placeholder="请选择">
                    <el-option v-for="item in appObjOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">文件大小:</span>
                <el-select v-model="fileSizeValue" filterable placeholder="请选择">
                    <el-option v-for="item in fileSizeOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">协议:</span>
                <el-select v-model="proValue" filterable placeholder="请选择">
                    <el-option v-for="item in proOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">分类:</span>
                <el-select v-model="classifyValue" filterable placeholder="请选择">
                    <el-option v-for="item in classifyOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable></el-input>
                <span class="label">文件名:</span>
                <el-input placeholder="请输入" v-model="fileNameValue" clearable></el-input>
                <span class="label">网址:</span>
                <el-input placeholder="请输入" v-model="hostValue" clearable></el-input>
                <span class="label">URL:</span>
                <el-input placeholder="请输入" v-model="urlValue" clearable></el-input>
                <button @click="selectPic">搜索</button>
                <button @click="allVideo">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="picList" stripe style="width: 100%" border
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
                    <el-table-column prop="time" label="时间" sortable :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="originIp" label="IP" :show-overflow-tooltip="true"></el-table-column>
                    <!-- <el-table-column prop="aimIp" label="目的IP" :show-overflow-tooltip="true"></el-table-column> -->
                    <el-table-column prop="protocol" label="协议" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="url" label="URL" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="host" label="网址" :show-overflow-tooltip="true"></el-table-column>
                    <!-- <el-table-column prop="fileName" label="文件名" :show-overflow-tooltip="true"></el-table-column> -->
                    <el-table-column prop="fileType" label="文件类型" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="fileSize" label="文件大小(B)" sortable :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.fileSize == '0' ? true : false"
                                    @click="preview(props.row.operate[0])">
                                预览
                            </button>
                            <!-- <button :disabled="props.row.fileSize == '0' ? true : false"
                                    @click="props.row.operate[0]">
                                下载
                            </button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handlePic"
                            @current-change="handlePicCurrent"
                            :current-page.sync="curPage"
                            :page-sizes="[100,150,200,250]"
                            :page-size.sync="everyPage"
                            layout="total, sizes, prev, pager, next, jumper"
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
            /*initPicList: [
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
            newPicList: [],*/
            // 初始列表数据
            picList: [],

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
            appObjOptions: [
                {
                    name: 1,
                    label: "QQ",
                    value: 11
                },
                {
                    name: 2,
                    label: "微信",
                    value: 5
                }
            ],
            appObjValue: "全部",

            // 文件大小范围选择框
            fileSizeOptions: [
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
            fileSizeValue: "全部",

            // 协议选择框
            proOptions: [
                {
                    value: "选项1",
                    label: "HTTP"
                },
                {
                   value: "选项2",
                    label: "HTTPS"
                }
            ],
            proValue: "全部",

            // 分类选择框
            classifyOptions: [
                {
                    value: "选项1",
                    label: "正常"
                },
                {
                   value: "选项2",
                    label: "不良"
                }
            ],
            classifyValue: "全部",

            // 输入框数据
            originIpValue: "全部",
            aimIpValue: "全部",
            fileNameValue: "全部",
            hostValue: "全部",
            urlValue: "全部",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 100,
            allData: 30,
            picUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getPicUrl()
        // 初始列表
        this.getPicData()
    },
    methods: {
        // 列表数据url
        getPicUrl(){
            // 查询参数，根据点击事件传递过来的值
            this.classifyValue = this.classify
            this.originIpValue = this.ip
            this.hostValue = this.sites

            this.picUrl = g.NEW_URL+"/original_esquery?index=logstash-dpi_filerevert"
            this.picObj = {
                "size": 10000,
                "_source": ["@timestamp","IP","Proto","Host","Url","Filetype","Filesize","ID"],
                "query": {
                    "bool": {
                        "should": [{
                            "bool": {
                                "must_not": [{
                                        "wildcard": {
                                            "Charset": "*"
                                        }
                                    },
                                    {
                                        "wildcard": {
                                            "Encoding": "*"
                                        }
                                    }
                                ]
                            }
                        }]
                    }
                }
            }
        },
        // 获取列表数据
        getPicData(){
            this.$axios.post(this.picUrl, JSON.stringify(this.picObj))
                       .then((res) => {
                            var resData = res.data.hits.hits
                            this.allData = resData.length
                            this.picList = []
                            resData.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item._source["@timestamp"], "y", true) ,
                                    originIp: item._source.IP,
                                    // aimIp: item._source.DIP,
                                    // oriPort: item._source.Sport,
                                    // aimPort: item._source.Dport,
                                    // appObj: "duixiang1",
                                    protocol: item._source.Proto,
                                    // classify: "不良",
                                    url: item._source.Url,
                                    host: item._source.Host,
                                    // fileName: item._source.FileName,
                                    fileType: item._source.Filetype,
                                    fileSize: item._source.Filesize,
                                    operate: [
                                        g.NEW_URL+"/oridata_fr/"+item._source.ID
                                    ]
                                }
                                this.picList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handlePic(val) {
            this.getPicUrl()
            this.getPicData()
        },
        // 输入将要跳转的页数
        handlePicCurrent(val) {
            this.getPicUrl()
            this.getPicData()
        },
        // 点击预览
        preview(url){
            window.open(url)
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
                this.selectPic()
            }
        },
        // 根据输入国家的名称进行搜索
        selectPic(){
            // 判断是否所有值都为空
            var flag = true

            this.picList = []
            this.newPicList = []
            this.initPicList.map((item, index) => {
                this.picList.push(item)
                this.newPicList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newPicList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
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
                this.newPicList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }

            if(this.appObjValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.appObj == this.appObjValue){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.proValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.protocol == this.proValue){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.classifyValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.classify == this.classifyValue){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.fileSizeValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.fileSize == this.fileSizeValue){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.fileNameValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.fileName.indexOf(this.fileNameValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.hostValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.host.indexOf(this.hostValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(this.urlValue){
                flag = false
                this.newPicList.map((item, index) => {
                    if(item.url.indexOf(this.urlValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.picList = []
                this.newPicList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.picList.push(item)
                    }
                    this.newPicList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitHttp()
            }
            this.allData = this.newPicList.length
        },

        // 点击重置按钮，将所有数据显示
        allVideo(){
            this.listTimeValue = ""
            this.listTimeRange = []
            this.listDateValue = ""
            this.appObjValue = ""
            this.fileSizeValue = ""
            this.proValue = ""
            this.classifyValue = ""
            this.aimIpValue = ""
            this.appObjValue = ""
            this.hostValue = ""
            this.urlValue = ""
            this.fileNameValue="",
            this.everyPage = 10
            this.curPage = 1
            this.getPicUrl()
            this.getPicData()
        },
    },
    props: ["classify", "ip", "sites"]
}
</script>
<style>
.PLPtop{
    overflow: hidden;
}
</style>