<template>
    <div class="conBox">
        <div class="forumList boxContent boxes">
            <div class="searchBox">
                <span class="label">时间:</span>
                <el-select v-model="listTimeValue" filterable placeholder="请选择"
                           @change="getSelectTime">
                    <el-option v-for="item in listTimeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-date-picker v-model="listDateValue" type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                                v-if="listTimeValue == '自定义'"
                                @change="selectForum">
                </el-date-picker>
                <span class="label">应用分类:</span>
                <el-select v-model="appKindValue" filterable placeholder="请选择"
                           @change="selectForum">
                    <el-option v-for="item in appKindOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <!-- <span class="label">应用对象:</span>
                <el-select v-model="appObjValue" filterable placeholder="请选择"
                           @change="selectForum">
                    <el-option v-for="item in appObjOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select> -->
                <span class="label">动作:</span>
                <el-select v-model="actionValue" filterable placeholder="请选择"
                           @change="selectForum">
                    <el-option v-for="item in actionOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable
                          @keyup.native="selectForum"></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable
                          @keyup.native="selectForum"></el-input>
                <span class="label">账号:</span>
                <el-input placeholder="请输入" v-model="useCodeValue" clearable
                          @keyup.native="selectForum"></el-input>
                <span class="label">回复内容:</span>
                <el-input placeholder="请输入" v-model="replayValue" clearable
                          @keyup.native="selectForum"></el-input>
                <span class="label">标题:</span>
                <el-input placeholder="请输入" v-model="titleValue" clearable
                          @keyup.native="selectForum"></el-input>
                <span class="label">正文:</span>
                <el-input placeholder="请输入" v-model="textValue" clearable
                          @keyup.native="selectForum"></el-input>
                <button @click="selectForum">搜索</button>
                <button @click="allForum">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="forumList" stripe style="width: 100%" border
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
                    <el-table-column prop="action" label="动作" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="useCode" label="账号" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <!-- <el-table-column prop="text" label="正文" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="reply" label="回复内容" :show-overflow-tooltip="true" width="150"></el-table-column> -->
                    <el-table-column label="操作" :show-overflow-tooltip="true" width="150">
                        <template slot-scope="props">
                            <button :disabled="props.row.operate">
                                详情
                            </button>
                            <button :disabled="props.row.operate">
                                附件还原
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleForum"
                            @current-change="handleForumCurrent"
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
            initForumList: [
                {
                    time: "2018-12-27 10:00:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "3000",
                    aimPort: "8080",
                    appKind: "阅读",
                    appObject: "QQ阅读",
                    action: "上传",
                    useCode: "13453206268",
                    title: "HTML",
                    text: "aaaaaa",
                    reply: "sddsffsad",
                    operate: true
                },
                {
                    time: "2018-12-28 10:00:00",
                    originIp: "166.346.5.67",
                    aimIp: "424.786.4.15",
                    oriPort: "3200",
                    aimPort: "5100",
                    appKind: "购物",
                    appObject: "淘宝",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2018-12-29 10:00:00",
                    originIp: "10.863.35.125",
                    aimIp: "101.98.271.35",
                    oriPort: "5623",
                    aimPort: "8821",
                    appKind: "阅读",
                    appObject: "QQ阅读",
                    action: "下载",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "aaaaa",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2018-12-30 10:00:00",
                    originIp: "112.863.35.125",
                    aimIp: "53.95.231.584",
                    oriPort: "9000",
                    aimPort: "9001",
                    appKind: "购物",
                    appObject: "京东",
                    userName: "Lyli",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sgfrery",
                    operate: true
                },
                {
                    time: "2018-12-31 10:00:00",
                    originIp: "514.55.35.125",
                    aimIp: "142.98.271.35",
                    oriPort: "5000",
                    aimPort: "4005",
                    appKind: "阅读",
                    appObject: "今日头条",
                    action: "上传",
                    useCode: "4365657w34",
                    title: "HTML",
                    text: "bbbbb",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-01 17:17:00",
                    originIp: "415.53.85.5",
                    aimIp: "45.98.271.35",
                    oriPort: "3452",
                    aimPort: "4563",
                    appKind: "购物",
                    appObject: "唯品会",
                    action: "下载",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-02 17:17:00",
                    originIp: "93.446.35.125",
                    aimIp: "116.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "即时通信",
                    appObject: "微信",
                    action: "下载",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-03 17:17:00",
                    originIp: "846.863.35.125",
                    aimIp: "133.98.271.35",
                    oriPort: "8818",
                    aimPort: "8080",
                    appKind: "即时通信",
                    appObject: "QQ",
                    action: "下载",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-04 17:17:00",
                    originIp: "243.553.35.125",
                    aimIp: "631.98.271.35",
                    oriPort: "4412",
                    aimPort: "4000",
                    appKind: "游戏",
                    appObject: "消消乐",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.225.35.125",
                    aimIp: "11.98.271.35",
                    oriPort: "8800",
                    aimPort: "4500",
                    appKind: "阅读",
                    appObject: "小说劝",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-05 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "游戏",
                    appObject: "王者荣耀",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-06 10:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "微博",
                    appObject: "新浪微博",
                    action: "下载",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                },
                {
                    time: "2019-01-06 17:17:00",
                    originIp: "243.863.35.125",
                    aimIp: "168.98.271.35",
                    oriPort: "8080",
                    aimPort: "8080",
                    appKind: "音乐",
                    appObject: "QQ音乐",
                    action: "上传",
                    useCode: "13453206268",
                    title: "JavaScript",
                    text: "ddddd",
                    reply: "sfgsregfdg",
                    operate: true
                }
            ],
            newForumList: [],
            // 初始列表数据
            forumList: [],

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
            appKindOptions: [
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
            appKindValue: "",

            // 应用对象筛选框数据
            appObjOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "淘宝"
                },
                {
                    value: "选项2",
                    label: "京东"
                },
                {
                    value: "选项3",
                    label: "拼多多"
                }
            ],
            appObjValue: "",

            // 动作筛选框数据
            actionOptions: [
                {
                    value: "选项1",
                    label: "全部"
                },
                {
                    value: "选项2",
                    label: "上传"
                },
                {
                    value: "选项3",
                    label: "下载"
                }
            ],
            actionValue: "",

            // 输入框数据
            originIpValue: "",
            aimIpValue: "",
            useCodeValue: "",
            replayValue: "",
            copyValue: "",
            titleValue: "",
            textValue: "",
            
            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
        }
    },
    mounted(){
        // 初始列表
        this.getInitForum()
    },
    methods: {
        // 流量归属国家数据总条数
        getAllForum(){
            this.allData = this.initForumList.length
        },
        // 初始流量归属国家列表
        getInitForum(){
            this.getAllForum()
            this.forumList = []
            this.newForumList = []
            this.initForumList.map((item, index) => {
                if(index < this.everyPage){
                    this.forumList.push(item)
                }
                this.newForumList.push(item)
            })
        },
        // 选择当前列表每页显示数据的条数
        handleForum(val) {
            this.forumList = []
            var limit = this.newForumList.length < val ? this.newForumList.length : val
            for(var i=0;i<limit;i++){
                this.forumList.push(this.newForumList[i])
            }
        },
        // 输入将要跳转的页数
        handleForumCurrent(val) {
            this.forumList = []
            var start = (val-1)*this.everyPage
            var end = val*this.everyPage
            if(end > this.allData){
                end = this.allData
            }
            for(var i=start;i<end;i++){
                this.forumList.push(this.newForumList[i])
            }
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
                this.selectForum()
            }
        },
        // 根据输入国家的名称进行搜索
        selectForum(){
            // 判断是否所有值都为空
            var flag = true

            this.forumList = []
            this.newForumList = []
            this.initForumList.map((item, index) => {
                this.forumList.push(item)
                this.newForumList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newForumList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
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
                this.newForumList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }

            if(this.appKindValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.appKind == this.appKindValue){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.appObjValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.
                    appObject == this.appObjValue){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.actionValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.action == this.actionValue){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.useCodeValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.useCode.indexOf(this.useCodeValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.replayValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.reply.indexOf(this.replayValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.titleValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.title.indexOf(this.titleValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(this.textValue){
                flag = false
                this.newForumList.map((item, index) => {
                    if(item.text.indexOf(this.textValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.forumList = []
                this.newForumList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.forumList.push(item)
                    }
                    this.newForumList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitForum()
            }
            this.allData = this.newForumList.length
        },
        // 点击重置按钮，将所有数据显示
        allForum(){
            this.listTimeValue = ""
            this.listTimeRange = []
            this.listDateValue = ""
            this.appKindValue = ""
            this.appObjValue = ""
            this.actionValue = ""
            this.originIpValue = ""
            this.aimIpValue = ""
            this.useCodeValue = ""
            this.replayValue = ""
            this.titleValue = ""
            this.textValue = ""
            this.everyPage = 10
            this.getInitForum()
        },
    }
}
</script>

<style>
.forumList{
    overflow: hidden;
}
</style>

