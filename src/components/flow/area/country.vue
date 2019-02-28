<template>
    <div class="conBox">
        <div class="CPtop structure boxes">
            <h6>流量归属（国家）</h6>
            <div class="countryList boxContent">
                <div class="searchBox">
                    <span class="label">国家:</span>
                    <el-input placeholder="请输入" v-model="countryValue" clearable
                            @keyup.native="selectCountry"></el-input>
                    <button @click="selectCountry">搜索</button>
                    <button @click="allCountry">重置</button>
                    <div class="block">
                        <el-pagination @size-change="handleCountry"
                                    @current-change="handleCountryCurrent"
                                    :current-page.sync="countryCurPage"
                                    :page-sizes="[5,10,15,20]"
                                    :page-size.sync="countryEveryPage"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total.sync="allCountryListData">
                        </el-pagination>
                    </div>
                </div>
                <div class="detailList logTable">
                    <el-table :data="countryList" style="width: 100%" border
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
                        <el-table-column prop="country" label="国家"></el-table-column>
                        <el-table-column prop="enterRealTime" label="流入速率(Mbps)" sortable></el-table-column>
                        <el-table-column prop="outRealTime" label="流出速率(Mbps)" sortable></el-table-column>
                        <el-table-column prop="allEntry" label="累积流入流量(MB)" sortable></el-table-column>
                        <el-table-column prop="allOut" label="累积流出流量(MB)" sortable></el-table-column>
                        <el-table-column prop="linkCount" label="连接数(亿次)" sortable></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OtherFunction from "../../../../static/public/js/otherFunction.js"
export default {
    data(){
        return{
            // 流量归属国家动态变化的数据
            countryList: [],
            // 流量归属国家初始数据
            initCountryList: [
                {
                    "country": "中国",
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "日本",
                    "enterRealTime": "220",
                    "outRealTime": "390",
                    "allRealTime": "510",
                    "allEntry": "110",
                    "allOut": "410",
                    "double": "510",
                    "linkCount": "12345678991"
                },
                {
                    "country": "泰国",
                    "enterRealTime": "231",
                    "outRealTime": "381",
                    "allRealTime": "501",
                    "allEntry": "101",
                    "allOut": "401",
                    "double": "501",
                    "linkCount": "12345678991"
                },
                {
                    "country": "新加坡",
                    "enterRealTime": "240",
                    "outRealTime": "370",
                    "allRealTime": "520",
                    "allEntry": "120",
                    "allOut": "420",
                    "double": "520",
                    "linkCount": "12345678991"
                },
                {
                    "country": "印尼",
                    "enterRealTime": "250",
                    "outRealTime": "360",
                    "allRealTime": "540",
                    "allEntry": "140",
                    "allOut": "440",
                    "double": "540",
                    "linkCount": "12345678991"
                },
                {
                    "country": "英国",
                    "enterRealTime": "265",
                    "outRealTime": "355",
                    "allRealTime": "505",
                    "allEntry": "105",
                    "allOut": "405",
                    "double": "505",
                    "linkCount": "12345678991"
                },
                {
                    "country": "缅甸",
                    "enterRealTime": "270",
                    "outRealTime": "340",
                    "allRealTime": "550",
                    "allEntry": "150",
                    "allOut": "450",
                    "double": "550",
                    "linkCount": "12345678991"
                },
                {
                    "country": "越南",
                    "enterRealTime": "280",
                    "outRealTime": "330",
                    "allRealTime": "560",
                    "allEntry": "160",
                    "allOut": "460",
                    "double": "560",
                    "linkCount": "12345678991"
                },
                {
                    "country": "老挝",
                    "enterRealTime": "290",
                    "outRealTime": "320",
                    "allRealTime": "590",
                    "allEntry": "190",
                    "allOut": "490",
                    "double": "590",
                    "linkCount": "12345678991"
                },
                {
                    "country": "俄罗斯",
                    "enterRealTime": "300",
                    "outRealTime": "310",
                    "allRealTime": "580",
                    "allEntry": "180",
                    "allOut": "480",
                    "double": "580",
                    "linkCount": "12345678991"
                },
                {
                    "country": "巴基斯坦",
                    "enterRealTime": "310",
                    "outRealTime": "300",
                    "allRealTime": "570",
                    "allEntry": "170",
                    "allOut": "470",
                    "double": "570",
                    "linkCount": "12345678991"
                },
                {
                    "country": "新加坡",
                    "enterRealTime": "320",
                    "outRealTime": "290",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "加拿大",
                    "enterRealTime": "339",
                    "outRealTime": "289",
                    "allRealTime": "509",
                    "allEntry": "109",
                    "allOut": "409",
                    "double": "509",
                    "linkCount": "12345678991"
                },
                {
                    "country": "韩国",
                    "enterRealTime": "340",
                    "outRealTime": "270",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "朝鲜",
                    "enterRealTime": "350",
                    "outRealTime": "260",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "法国",
                    "enterRealTime": "360",
                    "outRealTime": "250",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "德国",
                    "enterRealTime": "370",
                    "outRealTime": "240",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "西班牙",
                    "enterRealTime": "380",
                    "outRealTime": "230",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "葡萄牙",
                    "enterRealTime": "390",
                    "outRealTime": "220",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                },
                {
                    "country": "埃塞俄比亚",
                    "enterRealTime": "400",
                    "outRealTime": "210",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991"
                }
            ],
            newCountryData: [],
            // 流量归属国家列表分页相关数据
            countryCurPage: 1,
            countryEveryPage: 10,
            allCountryListData: 0,
            // 输入国家名称以后的值
            countryValue: ""
        }
    },
    mounted(){
        // 初始流量归属地列表
        this.initList(this.initCountryList)
        this.getInitCountry()
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 给初始数据添加单位
        initList(origin){
            origin.map((item, index) => {
                item.enterRealTime = this.random(100,200)
                item.outRealTime = this.random(100,200)
                item.allEntry = this.random(300,500)
                item.allOut = this.random(300,500)
                item.linkCount = this.random(10,90)
            })
        },

         // 流量归属国家数据总条数
        getAllCountry(){
            this.allCountryListData = this.initCountryList.length
        },
        // 初始流量归属国家列表
        getInitCountry(){
            this.getAllCountry()
            this.countryList = []
            this.newCountryData = []
            this.initCountryList.map((item, index) => {
                if(index < this.countryEveryPage){
                    this.countryList.push(item)
                }
                this.newCountryData.push(item)
            })
        },
        // 选择当前列表每页显示数据的条数
        handleCountry(val) {
            this.countryList = []
            var limit = this.newCountryData.length < val ? this.newCountryData.length : val
            for(var i=0;i<limit;i++){
                this.countryList.push(this.newCountryData[i])
            }
        },
        // 输入将要跳转的页数
        handleCountryCurrent(val) {
            this.countryList = []
            var start = (val-1)*this.countryEveryPage
            var end = val*this.countryEveryPage
            if(end > this.allCountryListData){
                end = this.allCountryListData
            }
            for(var i=start;i<end;i++){
                this.countryList.push(this.newCountryData[i])
            }
        },
        // 根据输入国家的名称进行搜索
        selectCountry(){
            this.countryList = []
            this.newCountryData = []
            this.initCountryList.map((item, index) => {
                this.countryList.push(item)
                this.newCountryData.push(item)
            })
            var selectArr = []

            if(this.countryValue){
                this.newCountryData.map((item, index) => {
                    if(item.country.indexOf(this.countryValue) >= 0){
                        selectArr.push(item)
                    }
                })
                this.countryList = []
                this.newCountryData = []
                selectArr.map((item, index) => {
                    if(index < this.countryEveryPage){
                        this.countryList.push(item)
                    }
                    this.newCountryData.push(item)
                })
                selectArr = []
            }
            this.allCountryListData = this.newCountryData.length
            // 如果输入值为空，则恢复初始数据
            if(this.countryValue == ""){
                this.getInitCountry()
            }
        },
        // 点击重置按钮，将所有数据显示
        allCountry(){
            this.countryValue = ""
            this.countryEveryPage = 10
            this.getInitCountry()
        },
    }
}
</script>
<style>
.areaPage .ARcentent .CPtop{
    min-height:300px;
}
</style>