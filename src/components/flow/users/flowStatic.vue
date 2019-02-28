<template>
    <div class="conBox">
        <div class="SPtop structure boxes boxContent">
            <div class="searchBox">
                <span class="label">用户名:</span>
                <el-input placeholder="请输入" clearable v-model="userNameValue"></el-input>
                <span class="label">IP地址:</span>
                <el-input placeholder="请输入" clearable v-model="IPValue"></el-input>
                <button>搜索</button>
                <button @click="allMsg">重置</button>
                <div class="block">
                    <el-pagination @size-change="handleList"
                                    @current-change="handleListCurrent"
                                    :current-page.sync="curPage"
                                    :page-sizes="[5,10,15,20]"
                                    :page-size.sync="everyPage"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total.sync="allData">
                    </el-pagination>
                </div>
            </div>
            <div class="staList logTable">
                <el-table :data="list" stripe style="width: 100%" border
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
                    <el-table-column label="IP地址">
                        <template slot-scope="props">
                            <span @click="findDetail(props.row)" style="cursor:pointer">
                                {{props.row.ip}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名">
                        <template slot-scope="props">
                            <span @click="findDetail(props.row)" style="cursor:pointer">
                                {{props.row.userName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="entrySpeed" label="流入速率"></el-table-column>
                    <el-table-column prop="outSpeed" label="流出速率"></el-table-column>
                    <el-table-column prop="allEntrySpeed" label="累积流入量"></el-table-column>
                    <el-table-column prop="allOutSpeed" label="累积流出量"></el-table-column>
                    <el-table-column prop="linkCount" label="连接数(亿次)" sortable></el-table-column>
                    <el-table-column prop="onLine" label="在线时长(分钟)" sortable></el-table-column>
                </el-table>
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
            // 单位
            speed: {
                four: "Tbps",
                three: "Gbps",
                two: "Mbps",
                one: "Kbps"
            },
            allFlow: {
                one: "KB",
                two: "MB",
                three: "GB",
                four: "TB",
                five: "PB",
                six: "EB"
            },
            linkCount: {
                one: "万",
                two: "亿",
                three: "兆"
            },

            initDataList: [],
            list: [],
            newList: [],
            userNameValue: "",
            IPValue: "",
            allData: 0,
            curPage: 1,
            everyPage: 10,
        }
    },
    created(){
        // 模拟数据
        this.simulateData()
    },
    mounted(){
        // 初始列表
        this.initList(this.list)
        this.getInitDataList()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 给初始数据添加单位
        initList(origin){
            origin.map((item, index) => {
                item.entrySpeed = OtherFunction.addUnit(this.random(10000000,30000000), this.speed, "flow")
                item.outSpeed = OtherFunction.addUnit(this.random(10000000,30000000), this.speed, "flow")
                item.allEntrySpeed = OtherFunction.addUnit(this.random(20000000,40000000), this.allFlow, "flow")
                item.allOutSpeed = OtherFunction.addUnit(this.random(20000000,40000000), this.allFlow, "flow")
                item.linkCount =this.random(20,50)
                item.onLine = this.random(1,60)
            })
        },

        // 模拟数据
        simulateData(){
            for(var i=0;i<100;i++){
                var itemObj = {
                    ip: this.random(10,999)+"."+this.random(1,999)+"."+this.random(1,999)+"."+this.random(1,999),
                    userName: this.random(100000, 999999),
                    entrySpeed: this.random(100, 500) + "Gbps",
                    outSpeed: this.random(100, 500) + "Gbps",
                    allEntrySpeed: this.random(5000, 9999) + "GB",
                    allOutSpeed: this.random(5000, 9999) + "GB",
                    linkCount: this.random(10, 999),
                    onLine: this.random(1, 60)
                }
                this.initDataList.push(itemObj)
            }
        },
        // 数据总条数
        getAllData(){
            this.allData = this.initDataList.length
        },
        // 初始列表
        getInitDataList(){
            this.getAllData()
            this.list = []
            this.newList = []
            this.initDataList.map((item, index) => {
                if(index < this.everyPage){
                    this.list.push(item)
                }
                this.newList.push(item)
            })
        },
        findDetail(val){
            this.showThisNav("1")
            this.ipValue = val.ip
            this.userValue = val.userName
        },
        // 选择当前列表每页显示数据的条数
        handleList(val) {
            this.list = []
            var limit = this.newList.length < val ? this.newList.length : val
            for(var i=0;i<limit;i++){
                this.list.push(this.newList[i])
            }
        },
        // 输入将要跳转的页数
        handleListCurrent(val) {
            this.list = []
            var start = (val-1)*this.everyPage
            var end = val*this.everyPage
            if(end > this.allData){
                end = this.allData
            }
            for(var i=start;i<end;i++){
                this.list.push(this.newList[i])
            }
        },
        // 根据输入字段进行搜索
        selectMsg(){
            this.list = []
            this.newList = []
            this.initDataList.map((item, index) => {
                this.list.push(item)
                this.newList.push(item)
            })
            var selectArr = []
            // 搜索用户名
            if(this.userNameValue){
                this.newList.map((item, index) => {
                    if(item.userName.indexOf(this.userNameValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.list = []
                this.newList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.list.push(item)
                    }
                    this.newList.push(item)
                })
                selectArr = []
            }
            // 搜索ip地址
            if(this.IPValue){
                this.newList.map((item, index) => {
                    if(item.ip.indexOf(this.IPValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.list = []
                this.newList = []
                selectArr.map((item, index) => {
                    if(index < this.everyPage){
                        this.list.push(item)
                    }
                    this.newList.push(item)
                })
                selectArr = []
            }
            this.allData = this.newList.length
            // 如果输入值为空，则恢复初始数据
            if(this.userNameValue == "" && this.IPValue == ""){
                this.getInitDataList()
            }
        },
        // 点击重置按钮，将所有数据显示
        allMsg(){
            this.userNameValue = ""
            this.IPValue = ""
            this.everyPage = 10
            this.getInitDataList()
        },
    }
}
</script>
<style>
/* 页面模块样式 */
.usersPage .Ucentent .SPtop{
    min-height:300px;
}
</style>


