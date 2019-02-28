<template>
    <div class="conBox">
        <div class="takeOutList boxContent boxes">
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
                                @change="selectTakeOut">
                </el-date-picker>
                <span class="label">应用分类:</span>
                <el-select v-model="appKindValue" filterable placeholder="请选择"
                           @change="selectTakeOut">
                    <el-option v-for="item in appKindOptions" :key="item.name"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">应用对象:</span>
                <el-select v-model="appObjValue" filterable placeholder="请选择"
                           @change="selectTakeOut">
                    <el-option v-for="item in appObjOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <span class="label">动作:</span>
                <el-select v-model="actionValue" filterable placeholder="请选择"
                           @change="selectTakeOut">
                    <el-option v-for="item in actionOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBox">
                <span class="label">源IP:</span>
                <el-input placeholder="请输入" v-model="originIpValue" clearable
                          @keyup.native="selectTakeOut"></el-input>
                <span class="label">目的IP:</span>
                <el-input placeholder="请输入" v-model="aimIpValue" clearable
                          @keyup.native="selectTakeOut"></el-input>
                <span class="label">账号:</span>
                <el-input placeholder="请输入" v-model="useCodeValue" clearable
                          @keyup.native="selectTakeOut"></el-input>
                <span class="label">收货人:</span>
                <el-input placeholder="请输入" v-model="receiveValue" clearable
                          @keyup.native="selectTakeOut"></el-input>
                <span class="label">送餐地址:</span>
                <el-input placeholder="请输入" v-model="adressValue" clearable
                          @keyup.native="selectTakeOut"></el-input>
                <button @click="selectTakeOut">搜索</button>
                <button @click="allTakeOut">重置</button>
                <div class="logCounts">
                    共
                    <span>{{allData}}</span>
                    条
                </div>
            </div>
            <div class="detailList logTable">
                <el-table :data="takeOutList" stripe style="width: 100%" border
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
                    <el-table-column prop="appObject" label="应用对象" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="action" label="动作" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="useCode" label="账号" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="receive" label="收货人" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="address" label="收货地址" :show-overflow-tooltip="true" width="150"></el-table-column>
                    <el-table-column prop="loopsData" label="指纹数据" :show-overflow-tooltip="true" width="150"></el-table-column>
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
                <el-pagination @size-change="handleTakeOut"
                            @current-change="handleTakeOutCurrent"
                            :current-page.sync="curPage"
                            :page-sizes="[10,20,30,40]"
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
            takeOutList: [],
            // 模拟数据
            applyObj: [
                {
                    obj: "饿了吗"
                },
                {
                    obj: "美团"
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

            // 应用对象筛选框数据
            appObjOptions: [
                {
                    value: "选项0",
                    label: "所有"
                },
                {
                    value: "选项1",
                    label: "美团"
                },
                {
                    value: "选项2",
                    label: "饿了吗"
                }
            ],
            appObjValue: "所有",

            // 动作筛选框数据
            actionOptions: [
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
                    value: "选项3",
                    label: "其他"
                }
            ],
            actionValue: "所有",

            // 输入框数据
            originIpValue: "所有",
            aimIpValue: "所有",
            useCodeValue: "所有",
            receiveValue: "所有",
            adressValue: "所有",

            // 分页相关数据
            curPage: 1,
            everyPage: 10,
            allData: 30,
            takeOutUrl: ""
        }
    },
    mounted(){
        // 获取http列表url
        this.getTakeOutUrl()
        // 初始列表
        this.getTakeOutUrlData()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(min, max)+min)
        },
        // 列表数据url
        getTakeOutUrl(){
            var dataBase = "dpi_mdr_takeaway"
            var keys = "app_top_id,app_sub_id,action_type,account,nickname,address,fingerprint,@timestamp"
            var size = this.everyPage
            var from = this.everyPage*(this.curPage-1)
            this.takeOutUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取列表数据
        getTakeOutUrlData(){
            this.$axios.post(this.takeOutUrl)
                       .then((res) => {
                            this.allData = res.data[0].count
                            this.takeOutList = []
                            res.data[1].context.map((item, index) => {
                                var itemObj = {
                                    time: OtherFunction.getTime(item["@timestamp"], "y", true),
                                    originIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    aimIp: this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255)+"."+this.random(1,255),
                                    oriPort: this.random(3000,9999),
                                    aimPort: this.random(3000,9999),
                                    appKind: item.app_top_id,
                                    appObject: this.applyObj[this.random(0, 2)].obj, // item.app_sub_id,
                                    action: item.account == "" ? "下载" : item.acount,
                                    useCode: item.action_type,
                                    receive: item.nickname == "" ? "Lyli" : item.nickname,
                                    address: item.address == "" ? "北京市海淀区" : item.address,
                                    loopsData: item.fingerprint,
                                    operate: true
                                }
                                this.takeOutList.push(itemObj)
                            })
                       }).catch((err) => {
                            alert("请求数据失败")
                       })
        },
        // 选择当前列表每页显示数据的条数
        handleTakeOut(val) {
            this.getTakeOutUrl()
            this.getTakeOutUrlData()
        },
        // 输入将要跳转的页数
        handleTakeOutCurrent(val) {
            this.getTakeOutUrl()
            this.getTakeOutUrlData()
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
                this.selectTakeOut()
            }
        },
        // 根据输入国家的名称进行搜索
        selectTakeOut(){
            // 判断是否所有值都为空
            var flag = true

            this.takeOutList = []
            this.newtakeOutList = []
            this.initTakeOutList.map((item, index) => {
                this.takeOutList.push(item)
                this.newtakeOutList.push(item)
            })
            var selectArr = []
            if(this.listTimeRange.length == 2){
                flag = false
                startTime = this.listTimeRange[0].replace(/-|\s|:/g,"")
                endTime = this.listTimeRange[1].replace(/-|\s|:/g,"")
                this.newtakeOutList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
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
                this.newtakeOutList.map((item, index) => {
                    var itemTime = item.time.replace(/-|\s|:/g,"")
                    if(itemTime*1 >= startTime*1 && itemTime*1 <= endTime*1){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }

            if(this.appKindValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.appKind == this.appKindValue){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.appObjValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.appObject == this.appObjValue){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.actionValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.action == this.actionValue){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }

            if(this.originIpValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.originIp.indexOf(this.originIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.aimIpValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.aimIp.indexOf(this.aimIpValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.useCodeValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.useCode.indexOf(this.useCodeValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.receiveValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.receive.indexOf(this.receiveValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(this.adressValue){
                flag = false
                this.newtakeOutList.map((item, index) => {
                    if(item.address.indexOf(this.adressValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.takeOutList = []
                this.newtakeOutList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.takeOutList.push(item)
                    }
                    this.newtakeOutList.push(item)
                })
                selectArr = []
            }
            if(flag){
                this.getInitTakeOut()
            }
            this.allData = this.newtakeOutList.length
        },

        // 点击重置按钮，将所有数据显示
        allTakeOut(){
            this.listTimeValue = "24小时"
            this.listTimeRange = []
            this.listDateValue = ""
            this.appKindValue = "所有"
            this.appObjValue = "所有"
            this.actionValue = "所有"
            this.originIpValue = "所有"
            this.aimIpValue = "所有"
            this.useCodeValue = "所有"
            this.receiveValue = "所有"
            this.adressValue = "所有"
            this.everyPage = 10
            this.curPage = 1
            this.getTakeOutUrl()
            this.getTakeOutUrlData()
        },
    }
}
</script>

<style>
.takeOutList{
    overflow: hidden;
}
</style>
