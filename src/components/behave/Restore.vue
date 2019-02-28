<template>
    <div class="RestorePage pages">
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="Rcentent contents">
            <div class="switchBox" style="margin-top:0px;" @click="refreshByself">
                <button v-if="ifGoBack" style="margin: 4px 10px;"
                        @click="goBack">返回</button>
                <input type="checkbox" id="refresh"><label for="refresh">是否自动刷新</label>
            </div>
            <div class="conBox">
                <div class="fileList boxContent boxes">
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
                        <span class="label">文件大小:</span>
                        <el-select v-model="fileSizeValue" filterable placeholder="请选择">
                            <el-option v-for="item in fileSizeOptions" :key="item.name"
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
                        <span class="label">请求URL:</span>
                        <el-input placeholder="请输入" v-model="urlValue" clearable></el-input>
                        <span class="label">文件名:</span>
                        <el-input placeholder="请输入" v-model="fileNameValue" clearable></el-input>
                        <span class="label">文件类型:</span>
                        <el-input placeholder="请输入" v-model="fileTypeValue" clearable></el-input>
                        <button>搜索</button>
                        <button @click="allRestore">重置</button>
                        <div class="logCounts">
                            共
                            <span>{{allData}}</span>
                            条
                        </div>
                    </div>
                    <div class="detailList logTable">
                        <el-table :data="restoreList" stripe style="width: 100%" border
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
                            <el-table-column prop="proType" label="协议类型" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column prop="appKind" label="应用分类" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column prop="appObject" label="应用对象" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column label="请求URL" :show-overflow-tooltip="true" width="150">
                                <template slot-scope="props">
                                    <span>
                                        {{props.row.url}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="method" label="方法" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column prop="fileType" label="文件类型" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column prop="fileName" label="文件名" :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column prop="fileSize" label="文件大小(B)" sortable :show-overflow-tooltip="true" width="150"></el-table-column>
                            <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                                <template slot-scope="props">
                                    <button :disabled="props.row.operate[0] == 0 ? true : false" 
                                            @click="preview(props.row.operate[1])">
                                        预览
                                    </button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="block">
                        <el-pagination @size-change="handleRestore"
                                    @current-change="handleRestoreCurrent"
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
    </div>
</template>

<script>
import "../../../static/public/css/comCommon.css"
import NavBar from "@/components/public/NavBar"
import OtherFunction from "../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            publicText: "文件还原",
            // 判断是否自动刷新
            refreshFlag: false,
            // 接受参数
            initData: "",
            // 是否显示返回按钮
            ifGoBack: false,
            // 模拟数据
            apply: [
                {
                    kind: "即时通信",
                    obj: "QQ"
                },
                {
                    kind: "阅读",
                    obj: "QQ阅读"
                },
                {
                    kind: "微博",
                    obj: "新浪"
                },
                {
                    kind: "导航",
                    obj: "百度地图"
                },
                {
                    kind: "视频",
                    obj: "腾讯"
                },
                {
                    kind: "音乐",
                    obj: "网易云"
                },
                {
                    kind: "应用商店",
                    obj: "APP Store"
                },
                {
                    kind: "游戏",
                    obj: "王者荣耀"
                },
                {
                    kind: "支付",
                    obj: "支付宝"
                },
                {
                    kind: "邮箱",
                    obj: "网易邮箱大师"
                },
                {
                    kind: "安全杀毒",
                    obj: "手机管家"
                }
            ],

            // 初始列表数据
            restoreList: [],

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

            // 文件大小范围选择框
            fileSizeOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
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
            appObjValue: "所有",
            urlValue: "所有",
            fileNameValue: "所有",
            fileTypeValue: "所有",

            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            restoreUrl: ""
        }
    },
    mounted(){
        // 接受参数
        this.receiveData()
        // 获取http列表url
        this.getRestoreUrl()
        // 初始列表
        this.getRestoreData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 是否开启自动刷新
        refreshByself(){
            this.refreshFlag = !this.refreshFlag
        },
        // 接受参数
        receiveData(){
            this.initData = this.$route.params.val
            if(this.initData){
                this.ifGoBack = true
            }else{
                this.ifGoBack = false
            }
        },
        // 返回
        goBack(){
            this.$router.go(-1)
        },

        // 列表数据url
        getRestoreUrl(){
            var dataBase = "dpi_filerevert"
            var keys = "Url,Host,FileID,Filesize,Proto,Request,Filetype,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.restoreUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getRestoreData(){
            this.$axios.post(this.restoreUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.restoreList = []
                            res.data[1].context.map((item, index) => {
                                var apply = this.apply[this.random(0, 11)]
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    aimIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    proType: item.Proto,
                                    appKind: apply.kind,
                                    appObject: apply.obj,
                                    url: item.Url,
                                    method: item.Request,
                                    fileType: item.Filetype,
                                    fileName: item.FileID,
                                    fileSize: item.Filesize,
                                    operate: [
                                        item.Filesize,
                                        g.NEW_URL+"/oridata_fr/" + item.FileID
                                    ]
                                }
                                this.restoreList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleRestore(val) {
            this.getRestoreUrl()
            this.getRestoreData()
        },
        // 输入将要跳转的页数
        handleRestoreCurrent(val) {
            this.getRestoreUrl()
            this.getRestoreData()
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
                this.selectRestore()
            }
        },
        // 根据输入国家的名称进行搜索
        selectRestore(){
            // 判断是否所有值都为空
            var flag = true

            this.restoreList = []
            this.newRestoreList = []
            this.initRestoreList.map((item, index) => {
                this.restoreList.push(item)
                this.newRestoreList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newRestoreList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
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
                this.newRestoreList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }

            if(this.appKindValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.appKind == this.appKindValue){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.fileSizeValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.fileSize == this.fileSizeValue){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.appObjValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.appObject.indexOf(this.appObjValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.fileNameValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.fileName.indexOf(this.fileNameValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.fileTypeValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.fileType.indexOf(this.fileTypeValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(this.urlValue){
                flag = false
                this.newRestoreList.map((item, index) => {
                    if(item.url.indexOf(this.urlValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.restoreList = []
                this.newRestoreList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.restoreList.push(item)
                    }
                    this.newRestoreList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitRestore()
            }
            this.allData = this.newRestoreList.length
        },

        // 点击重置按钮，将所有数据显示
        allRestore(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = ""
            this.appKindValue = "所有"
            this.methodValue = "所有"
            this.behaveValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.appObjValue = "所有"
            this.fileName = "所有"
            this.urlValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getRestoreUrl()
            this.getRestoreData()
        },

    },
    components: {
        NavBar
    }
}
</script>

<style>
.RestorePage .Rcentent .fileList{
    overflow:hidden;
}
</style>
