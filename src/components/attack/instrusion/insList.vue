<template>
    <div class="conBox">
        <div class="ILtop structure boxes">
            <h6>日志</h6>
            <div class="IntrusionLog boxContent logBox">
                <div class="searchBox">
                    <span class="label">展示信息:</span>
                    <el-select v-model="listTitle" multiple filterable allow-create
                                default-first-option placeholder="请选择"
                                @change="changeTitles">
                        <el-option v-for="item in listTitles" :key="item.value"
                                    :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="label">时间:</span>
                    <el-date-picker v-model="dateValue" type="daterange" unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    @change="searchMsgBySelect">
                    </el-date-picker>
                    <span class="label">攻击类型:</span>
                    <el-select v-model="typeValue" filterable placeholder="请选择"
                                    @change="searchMsgBySelect">
                        <el-option v-for="item in typeOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                    <span class="label">源IP:</span>
                    <el-input placeholder="请输入源IP" v-model="originValue" clearable></el-input>
                    <span class="label">目的IP:</span>
                    <el-input placeholder="请输入目的IP" v-model="aimValue" clearable></el-input>
                    <!-- <span class="label">关注度:</span>
                    <el-select v-model="focusValue" filterable placeholder="请选择"
                                @change="searchMsgBySelect">
                        <el-option v-for="item in focusOptions" :key="item.value"
                                :label="item.label" :value="item.label">
                        </el-option>
                    </el-select> -->
                    <button @change="searchMsgBySelect">搜索</button>
                    <button @click="showAllData">重置</button>
                </div>
                <div class="logList logTable">
                    <el-table :data="IntrusionLogList" style="width: 100%" stripe border
                                :header-row-style="{height: '40px;'}"
                                :row-style="{height: '35px'}"
                                :header-cell-style="{
                                'background-color': '#666',
                                'color': '#fff',
                                'border-right': '1px #888 solid',
                                'border-bottom': 'none',
                                'height': '40px',
                                'padding': '5px'
                                }">
                        <el-table-column v-for="(item, index) in initShowTitles" :key="index"
                                            :prop="item.value" :label="item.name" min-width="150px"
                                            :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <span @click="changeStatus(scope.$index)">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="关注度">
                            <template slot-scope="scope">
                                <span @click="changeFocus(scope.$index)">{{scope.row.focus}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination @size-change="handleIntrusionLog"
                                    @current-change="handleIntLogCur"
                                    :current-page.sync="currentPage"
                                    :page-sizes="[10,20,30,40]"
                                    :page-size.sync="intrusionLogEveryPage"
                                    layout="total, sizes, prev, pager, next, jumper" :total="allIntrusionLogListData">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 列表表头选中的值
            listTitle: [
                        "time",
                        "type",
                        "appName",
                        "proType",
                        "originIP",
                        "aimIP",
                        "originPort",
                        "aimPort",
                        // "country"
                    ],
            // 列表表头可选择的值
            listTitles: [
                {
                    value: "time",
                    label: "攻击时间"
                },
                {
                    value: "type",
                    label: "攻击类型"
                },
                {
                    value: "appName",
                    label: "应用名称"
                },
                {
                    value: "proType",
                    label: "协议类型"
                },
                {
                    value: "originIP",
                    label: "源IP"
                },
                {
                    value: "aimIP",
                    label: "目的IP"
                },
                {
                    value: "originPort",
                    label: "源端口"
                },
                {
                    value: "aimPort",
                    label: "目的端口"
                },
                // {
                //     value: "country",
                //     label: "国家/地区"
                // },
                // {
                //     value: "focus",
                //     label: "关注"
                // },
                // {
                //     value: "status",
                //     label: "状态"
                // },
                {
                    value: "detail",
                    label: "详细信息"
                },
                {
                    value: "rank",
                    label: "危害等级"
                },
                {
                    value: "originM",
                    label: "源MAC"
                },
                {
                    value: "aimM",
                    label: "目的MAC"
                }
            ],
            // 攻击日志列表数据
            /*initIntrusionLogList: [
                {
                    time: "2018-11-12",
                    type: "SQL注入",
                    appName: "HTTP-网页浏览",
                    proType: "HTTP",
                    originIP: "192.168.12.162",
                    aimIP: "220.191.228.134",
                    originPort: "14757",
                    aimPort: "80",
                    country: "中国",
                    focus: "☆",
                    status: "已处理",
                    detail: "详细信息",
                    rank: "严重",
                    originM: "MAC",
                    aimM: "MAC"
                }
            ],*/
            // 初始显示数据
            initShowTitles: [],
            // 攻击日志列表操作数据
            IntrusionLogList: [],
            // 攻击类型选择框数据
            typeOptions: [
                {
                    value: "选项1",
                    label: "蠕虫病毒"
                },
                {
                    value: "选项2",
                    label: "木马后门"
                },
                {
                    value: "选项3",
                    label: "缓冲溢出"
                },
                {
                    value: "选项4",
                    label: "安全绕过"
                },
                {
                    value: "选项5",
                    label: "css攻击"
                },
                {
                    value: "选项6",
                    label: "其他"
                }
            ],
            // 选择后的类型值
            typeValue: "",
            // 协议类型选择框数据
            protocolOptions: [
                {
                    value: "选项1",
                    label: "http"
                },
                {
                    value: "选项2",
                    label: "https"
                }
            ],
            // 选择后的协议类型值
            protocolValue: "",
            // 等级选择框数据
            rankOptions: [
                {
                    value: "选项1",
                    label: "一级"
                },
                {
                    value: "选项2",
                    label: "二级"
                },
                {
                    value: "选项3",
                    label: "三级"
                },
                {
                    value: "选项4",
                    label: "四级"
                }
            ],
            // 选择后的等级值
            rankValue: "",
            // 国家选择框数据
            countryOptions: [
                {
                    value: "选项1",
                    label: "China"
                },
                {
                    value: "选项2",
                    label: "US"
                },
                {
                    value: "选项3",
                    label: "Japanese"
                },
                {
                    value: "选项4",
                    label: "UK"
                }
            ],
            // 选择后的国家值
            countryValue: "",
            // 关注度选择框数据
            focusOptions: [
                {
                    value: "选项1",
                    label: "已关注"
                },
                {
                    value: "选项2",
                    label: "未关注"
                }
            ],
            // 选择后的关注度的值
            focusValue: "",
            // 判断是否关注
            focusFlag: false,
            // 状态选择框数据
            statusOptions: [
                {
                    value: "选项1",
                    label: "已处理"
                },
                {
                    value: "选项2",
                    label: "未处理"
                }
            ],
            // 选择后的状态值
            statusValue: "",
            // 判断是否处理
            statusFlag: false,
            // 日志列表选择后的时间值
            dateValue: "",
            // 日期禁选时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }, 
            // 输入的攻击源值
            originValue: "",
            // 输入的攻击目标值
            aimValue: "",
            // 默认显示的页数
            currentPage: 1,
            // 攻击日志列表默认每页显示数据条数
            intrusionLogEveryPage: 20,
            // 攻击日志列表数据总条数
            allIntrusionLogListData: 0,
            instrusionUrl: ""
        }
    },
    mounted(){
        // 日志列表初始表头数据
        this.getInitLogTitle()
        // 攻击日志列表
        this.getIntrusionUrl()
        // 绘制攻击日志表格
        this.getInitLogData()
    },
    methods:{
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },

        getIntrusionUrl(){
            var now = new Date()
            var start = new Date(now.getTime() - 1000*60*60*24)
            this.dateValue  = [
                new Date(now.getFullYear(),start.getMonth(),start.getDate()),
                new Date(now.getFullYear(),now.getMonth(),now.getDate())
            ]
            var dataBase = "ids_ips"
            var keys = "GenTime,EventType,AppName,ProtocolType,SrcIP,DstIP,SrcPort,DstPort"
            var size = this.intrusionLogEveryPage
            var from = this.intrusionLogEveryPage*(this.currentPage-1)
            this.instrusionUrl = g.NEW_URL+"/query_esdata?index="+dataBase+"&key="+keys+"&size="+size+"&from="+from
        },
        // 获取攻击日志数据(包括数据总条数)
        getInitLogData(){
            this.$axios.post(this.instrusionUrl)
                .then((res) => {
                    this.allIntrusionLogListData = res.data[0].count
                    this.IntrusionLogList = []
                    res.data[1].context.map((item, index) => {
                        var itemObj = {
                            time: item.GenTime,
                            type: item.EventType,
                            appName: item.AppName,
                            proType: item.ProtocolType,
                            originIP: item.SrcIP,
                            aimIP: item.DstIP,
                            originPort: item.SrcPort,
                            aimPort: item.DstPort,
                            country: "china",
                            focus: "☆",
                            status: "已处理",
                            detail: "详细信息",
                            rank: "严重",
                            originM: "item.SrcMac",
                            aimM: item.DstMac
                        }
                        this.IntrusionLogList.push(itemObj)
                    })
                }).catch((err) => {
                    console.log(err)
                })
        },
        // 制作初始攻击日志列表
        getInitLogTitle(){
            this.initShowTitles = []
            this.listTitle.map((item, index) => {
                this.listTitles.map((itm, idx) => {
                    if(item == itm.value){
                        var itemObj = {
                            name: itm.label,
                            value: itm.value
                        }
                        this.initShowTitles.push(itemObj)
                    }
                })
            })
        },
        // 根据所选信息改变表头信息
        changeTitles(){
            this.getInitLogTitle()
            this.getInitLogData()
        },
        // 改变关注度
        changeFocus(idCode){
            this.IntrusionLogList.map((item, index) => {
              if(index == idCode){
                item.focusFlag = !item.focusFlag
                if(item.focusFlag){
                  this.IntrusionLogList[index].focus = "★"
                }else{
                  this.IntrusionLogList[index].focus = "☆"
                }
              }
            })
        },
        // 改变处理状态
        changeStatus(idCode){
            this.IntrusionLogList.map((item, index) => {
              if(index == idCode){
                item.statusFlag = !item.statusFlag
                if(item.statusFlag){
                  this.IntrusionLogList[index].status = "已处理"
                }else{
                  this.IntrusionLogList[index].status = "未处理"
                }
              }
            })
        },
        // 显示全部信息
        showAllData(){
            this.dateValue = ""
            this.typeValue = ""
            this.originValue = ""
            this.aimValue = ""
            this.focusValue = ""
            this.intrusionLogEveryPage = 20
            this.currentPage = 1
            this.getIntrusionUrl()
            this.getInitLogData()
        },
        // 攻击日志列表每页显示数据的条数
        handleIntrusionLog(val) {
            this.getInitLogTitle()
            this.getIntrusionUrl()
            this.getInitLogData()
        },
        // 攻击日志列表输入将要跳转的页数
        handleIntLogCur(val) {
            this.getInitLogTitle()
            this.getInitLogData()
        },

        // 获取详细信息，弹出对应行的弹框
        getDetail(idCode){
            console.log(idCode)
        },
        // 编辑信息
        handleEdit(index, row) {
            this.intrusionLogList[index].status = "未处理"
        },
        // 删除信息
        handleDelete(index, row) {
            row.splice(index,1)
        },
        // 获取选择到的数据
        searchMsgBySelect(){
            this.getIntrusionUrl()
            this.getInitLogData()
        }
    }
}
</script>
<style>
.intrusionPage .Icontent .ILtop{
    min-height:300px;
}
</style>