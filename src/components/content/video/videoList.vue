<template>
    <div class="conBox">
        <div class="VLPtop boxContent boxes">
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
                <!-- <span class="label">应用对象:</span>
                <el-select v-model="appObjValue" filterable placeholder="请选择">
                    <el-option v-for="item in appObjOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select> -->
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
                <el-select v-model="classifyValue" filterable placeholder="请选择"
                           @change="selectVideo">
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
                <!-- <span class="label">文件名:</span>
                <el-input placeholder="请输入" v-model="fileNameValue" clearable></el-input> -->
                <span class="label">域名:</span>
                <el-input placeholder="请输入" v-model="hostValue" clearable></el-input>
                <span class="label">URL:</span>
                <el-input placeholder="请输入" v-model="urlValue" clearable></el-input>
                <button @click="selectVideo">搜索</button>
                <button @click="allVideo">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="videoList" stripe style="width: 100%" border
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
                    <el-table-column prop="originIp" label="源IP" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="aimIp" label="目的IP" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="protocol" label="协议" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="classify" label="分类" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="url" label="URL" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="host" label="域名" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="fileSize" label="文件大小(B)" sortable :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.Filesize == '0' ? true : false" 
                                    @click="preview(props.row.operate[0])">
                                预览
                            </button>
                            <button :disabled="props.row.Filesize == '0' ? true : false"
                                    @click="preview(props.row.operate[1])">
                                下载
                                <!-- <a :href="props.row.operate[1]" :download="props.row.operate[1]">下载</a> -->
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleVideo"
                            @current-change="handleVideoCurrent"
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
            /*initVideoList: [
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
            newVideoList: [],*/
            // 初始列表数据
            videoList: [],

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
            listTimeValue: "",
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
                    name: 0,
                    label: "全部",
                    value: 11
                },
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
                    label: "全部"
                },
                {
                    value: "选项2",
                    label: "1MB以下"
                },
                {
                   value: "选项3",
                    label: "1~10MB"
                },
                {
                   value: "选项4",
                    label: "10MB以上"
                }
            ],
            fileSizeValue: "全部",

            // 协议选择框
            proOptions: [
                {
                    value: "选项1",
                    label: "全部"
                },
                {
                    value: "选项2",
                    label: "HTTP"
                },
                {
                   value: "选项3",
                    label: "HLS"
                }
            ],
            proValue: "全部",

            // 分类选择框
            classifyOptions: [
                {
                    value: "选项1",
                    label: "全部"
                },
                {
                   value: "选项2",
                    label: "正常"
                },
                {
                    value: "选项3",
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

            // 数据请求
            videoUrl: "",
            videoObj: []
        }
    },
    mounted(){
        // 获取http列表url
        this.getVideoUrl()
        // 初始列表
        this.getVideoData()
    },
    methods: {
        // 列表数据url
        getVideoUrl(){
            // 每页显示个数
            var size = this.everyPage
            // 页数
            var from = this.everyPage*(this.curPage-1)
            // 根据点击事件传递过来的值
            if(this.classify != "全部"){
                this.classifyValue = this.classify
            }
            if(this.ip != "全部"){
                this.originIpValue = this.ip
            }
            if(this.sites != "全部"){
                this.hostValue = this.sites
            }

            this.videoUrl = g.NEW_URL + "/original_esquery?index=logstash-dpi_video_audit"
            var params = []

            // 查找条件
            // 协议
            if(this.proValue != "全部"){
                var keyObj = {"match": {"AppProtocol": this.proValue}}
                params.push(keyObj)
            }
            // 分类
            if(this.classifyValue != "全部"){
                if(this.classifyValue == "正常"){
                    var keyObj = {"match": {"Video_Tag": "Normal"}}
                    params.push(keyObj)
                }else{
                    var keyObj = {"match": {"Video_Tag": "Suspected"}}
                    params.push(keyObj)
                }
            }
            // 源ip
            if(this.originIpValue != "全部"){
                var keyObj = {"match": {"SIP": this.originIpValue}}
                params.push(keyObj)
            }
            // 目的ip
            if(this.aimIpValue != "全部"){
                var keyObj = {"match": {"DIP": this.aimIpValue}}
                params.push(keyObj)
            }
            // 域名
            if(this.hostValue != "全部"){
                var keyObj = {"match": {"HOST": this.hostValue}}
                params.push(keyObj)
            }
            // url
            if(this.urlValue != "全部"){
                var keyObj = {"match_phrase": {"URL": this.urlValue}}
                params.push(keyObj)
            }

            this.videoObj = {
                "from": from,
                "size": size,
                "_source": ["HOST","URL","Filesize","FileName","AppProtocol","SIP","DIP","Sport","Dport","Video_Tag","@timestamp"],
                "query": {
                    "bool": {
                        "must": params
                    }
                }
            }
        },
        // 获取列表数据
        getVideoData(){
            this.$axios.post(this.videoUrl, JSON.stringify(this.videoObj))
                       .then((res) => {
                            this.videoList = []
                            var resData = res.data.hits.hits
                            this.allData = res.data.hits.total
                            if(resData.length){
                                resData.map((item, index) => {
                                    var itemObj = {
                                        time: item._source["@timestamp"],
                                        originIp: item._source.SIP,
                                        aimIp: item._source.DIP,
                                        oriPort: item._source.Sport,
                                        aimPort: item._source.Dport,
                                        appObj: "duixiang1",
                                        protocol: item._source.AppProtocol,
                                        classify: item._source.Video_Tag == "Normal" ? "正常" : "不良",
                                        url: item._source.URL,
                                        host: item._source.HOST,
                                        fileName: item._source.FileName,
                                        fileSize: item._source.Filesize,
                                        operate: [
                                            g.NEW_URL+"/oridata_va/"+item._source.FileName+"/snapshot_img.jpeg",
                                            (item._source.AppProtocol == "RTMP" || item._source.AppProtocol == "HTTP-FLV") ? 
                                                            g.NEW_URL+"/oridata_va/"+item._source.FileName+"/"+item._source.FileName+".flv" :
                                                            g.NEW_URL+"/oridata_va/"+item._source.FileName+"/"+item._source.FileName+".mp4"
                                        ]
                                    }
                                    this.videoList.push(itemObj)
                                })
                            }
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleVideo(val) {
            this.getVideoUrl()
            this.getVideoData()
        },
        // 输入将要跳转的页数
        handleVideoCurrent(val) {
            this.getVideoUrl()
            this.getVideoData()
        },
        // 点击预览
        preview(url){
            window.open(url)
        },

        selectVideo(){
            this.getVideoUrl()
            this.getVideoData()
        },

        // 点击重置按钮，将所有数据显示
        allVideo(){
            this.listTimeValue = ""
            this.listTimeRange = []
            this.listDateValue = ""
            this.appObjValue = "全部"
            this.fileSizeValue = "全部"
            this.proValue = "全部"
            this.classifyValue = "全部"
            this.aimIpValue = "全部"
            this.appObjValue = "全部"
            this.hostValue = "全部"
            this.urlValue = "全部"
            this.fileNameValue="全部",
            this.everyPage = 100
            this.curPage = 1
            this.getVideoUrl()
            this.getVideoData()
        },
    },
    props: ["classify", "ip", "sites"]
}
</script>

<style>
.VLPtop{
    overflow: hidden;
}
</style>
