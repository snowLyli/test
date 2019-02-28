<template>
    <div class="conBox">
        <div class="LPtop structure boxes">
            <h6>流量归属（地区）</h6>
            <div class="locationList boxContent">
                <div class="searchBox">
                    <span class="label">省份:</span>
                    <el-input placeholder="请输入" v-model="provinceValue" clearable 
                            @keyup.native="selectProvince"></el-input>
                    <span class="label">城市:</span>
                    <el-input placeholder="请输入" v-model="cityValue" clearable 
                            @keyup.native="selectProvince"></el-input>
                    <button @click="selectProvince">搜索</button>
                    <button @click="allProvince">重置</button>
                    <div class="block">
                        <el-pagination @size-change="handleLocation"
                                    @current-change="handleLocationCurrent"
                                    :current-page.sync="locationCurPage"
                                    :page-sizes="[1,10,15,20]"
                                    :page-size.sync="locationEveryPage"
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total.sync="allLocationListData">
                        </el-pagination>
                    </div>
                </div>
                <div class="detailList logTable">
                    <el-table :data="locationList" style="width: 100%" border
                                :row-style="{height: '37px'}"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                :header-cell-style="{
                                'background-color': '#666',
                                'color': '#fff',
                                'border-right': '1px #888 solid',
                                'border-bottom': 'none',
                                'height': '40px',
                                'padding': '5px'
                                }">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div style="box-sizing:border-box;overflow:hidden">
                                    <div class="cityList">
                                        <el-table :data="props.row.list" stripe style="width: 100%"
                                                :row-style="{height: '30px'}"
                                                :default-sort = "{prop: 'date', order: 'descending'}" 
                                                :header-cell-style="{
                                                        'background-color': '#888',
                                                        'color': '#fff',
                                                        'border-right': '1px #999 solid',
                                                        'height': '30px',
                                                        'padding': '2px'
                                                }" border>
                                            <el-table-column prop="name" label="城市"></el-table-column>
                                            <el-table-column prop="enterRealTime" label="流入速率(Mbps)" sortable></el-table-column>
                                            <el-table-column prop="outRealTime" label="流出速率(Mbps)" sortable></el-table-column>
                                            <el-table-column prop="allEntry" label="累积流入流量(MB)" sortable></el-table-column>
                                            <el-table-column prop="allOut" label="累积流出流量(MB)" sortable></el-table-column>
                                            <el-table-column prop="linkCount" label="连接数(亿次)" sortable></el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="block">
                                        <el-pagination @size-change="handleCities"
                                                    @current-change="handleCitiesCurrent"
                                                    :current-page.sync="props.row.curPage"
                                                    :page-sizes="[5,10,15,20]"
                                                    :page-size.sync="props.row.everyPage"
                                                    layout="total, sizes, prev, pager, next, jumper" 
                                                    :total.sync="props.row.allData">
                                        </el-pagination>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>      
                        <el-table-column prop="province" label="省份"></el-table-column>
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
            // 流量归属地区动态变化的数据
            locationList: [],
            // 流量归属地区初始数据
            initLocationList: [
                {
                    "province": "黑龙江",
                    "citys": [
                        {
                            "name": "哈尔滨",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "吉林",
                    "citys": [
                        {
                            "name": "长春",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "辽宁",
                    "citys": [
                        {
                            "name": "沈阳",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "北京",
                    "citys": [
                        {
                            "name": "北京",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "天津",
                    "citys": [
                        {
                            "name": "天津",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "河北",
                    "citys": [
                        {
                            "name": "石家庄",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": 3086419747
                        },
                        {
                            "province": "河北",
                            "click": false,
                            "name": "沧州",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": 3086419747
                        },
                        {
                            "province": "河北",
                            "click": false,
                            "name": "保定",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": 3086419747
                        },
                        {
                            "province": "河北",
                            "click": false,
                            "name": "张家口",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": 3086419747
                        }
                    ],
                    "enterRealTime": "220",
                    "outRealTime": "390",
                    "allRealTime": "510",
                    "allEntry": "110",
                    "allOut": "410",
                    "double": "510",
                    "linkCount": "12345678988",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "山东",
                    "citys": [
                        {
                            "name": "青岛",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "4115226330"
                        },
                        {
                            "province": "山东",
                            "click": false,
                            "name": "济南",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "4115226330"
                        },
                        {
                            "province": "山东",
                            "click": false,
                            "name": "菏泽",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "4115226330"
                        }
                    ],
                    "enterRealTime": "231",
                    "outRealTime": "381",
                    "allRealTime": "501",
                    "allEntry": "101",
                    "allOut": "401",
                    "double": "501",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "江苏",
                    "citys": [
                        {
                            "name": "南京",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "上海",
                    "citys": [
                        {
                            "name": "上海",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "240",
                    "outRealTime": "370",
                    "allRealTime": "520",
                    "allEntry": "120",
                    "allOut": "420",
                    "double": "520",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "浙江",
                    "citys": [
                        {
                            "name": "杭州",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "福建",
                    "citys": [
                        {
                            "name": "福州",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        },
                        {
                            "province": "福建",
                            "name": "厦门",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        }
                    ],
                    "enterRealTime": "250",
                    "outRealTime": "360",
                    "allRealTime": "540",
                    "allEntry": "140",
                    "allOut": "440",
                    "double": "540",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "广东",
                    "citys": [
                        {
                            "name": "深圳",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        },
                        {
                            "province": "广东",
                            "name": "广州",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        }
                    ],
                    "enterRealTime": "250",
                    "outRealTime": "360",
                    "allRealTime": "540",
                    "allEntry": "140",
                    "allOut": "440",
                    "double": "540",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "广西",
                    "citys": [
                        {
                            "name": "桂林",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678990"
                        }
                    ],
                    "enterRealTime": "300",
                    "outRealTime": "310",
                    "allRealTime": "580",
                    "allEntry": "180",
                    "allOut": "480",
                    "double": "580",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "云南",
                    "citys": [
                        {
                            "name": "昆明",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "西藏",
                    "citys": [
                        {
                            "name": "拉萨",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "新疆",
                    "citys": [
                        {
                            "name": "吐鲁番",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678990"
                        }
                    ],
                    "enterRealTime": "280",
                    "outRealTime": "330",
                    "allRealTime": "560",
                    "allEntry": "160",
                    "allOut": "460",
                    "double": "560",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "甘肃",
                    "citys": [
                        {
                            "name": "兰州",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678990"
                        }
                    ],
                    "enterRealTime": "290",
                    "outRealTime": "320",
                    "allRealTime": "590",
                    "allEntry": "190",
                    "allOut": "490",
                    "double": "590",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "宁夏",
                    "citys": [
                        {
                            "name": "宁夏",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "青海",
                    "citys": [
                        {
                            "name": "西宁",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "四川",
                    "citys": [
                        {
                            "name": "自贡",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        },
                        {
                            "province": "四川",
                            "click": false,
                            "name": "成都",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "6172839495"
                        }
                    ],
                    "enterRealTime": "270",
                    "outRealTime": "340",
                    "allRealTime": "550",
                    "allEntry": "150",
                    "allOut": "450",
                    "double": "550",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "重庆",
                    "citys": [
                        {
                            "name": "重庆",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "贵州",
                    "citys": [
                        {
                            "name": "贵阳",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "湖南",
                    "citys": [
                        {
                            "name": "长沙",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "江西",
                    "citys": [
                        {
                            "name": "南昌",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "安徽",
                    "citys": [
                        {
                            "name": "合肥",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "湖北",
                    "citys": [
                        {
                            "name": "武汉",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "陕西",
                    "citys": [
                        {
                            "name": "西安",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "河南",
                    "citys": [
                        {
                            "name": "洛阳",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "山西",
                    "citys": [
                        {
                            "name": "太原",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678990"
                        }
                    ],
                    "enterRealTime": "310",
                    "outRealTime": "300",
                    "allRealTime": "570",
                    "allEntry": "170",
                    "allOut": "470",
                    "double": "570",
                    "linkCount": "12345678990",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "内蒙古",
                    "citys": [
                        {
                            "name": "呼和浩特",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "海南",
                    "citys": [
                        {
                            "name": "海口",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "香港",
                    "citys": [
                        {
                            "name": "香港",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "澳门",
                    "citys": [
                        {
                            "name": "澳门",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    "province": "台湾",
                    "citys": [
                        {
                            "name": "台北",
                            "enterRealTime": "210",
                            "outRealTime": "400",
                            "allRealTime": "500",
                            "allEntry": "100",
                            "allOut": "400",
                            "double": "500",
                            "linkCount": "12345678991"
                        }
                    ],
                    "enterRealTime": "210",
                    "outRealTime": "400",
                    "allRealTime": "500",
                    "allEntry": "100",
                    "allOut": "400",
                    "double": "500",
                    "linkCount": "12345678991",
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                }
            ],
            newLocalData: [],
            // 输入省份以后的值
            provinceValue: "",
            cityValue: "",
            // 流量归属地区列表分页相关数据
            locationCurPage: 1,
            locationEveryPage: 10,
            allLocationListData: 0,
        }
    },
    mounted(){
        // 初始流量归属地列表
        this.initList(this.initLocationList)
        this.getInitLocal()
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
                if(item.citys){
                    item.citys.map((itm, idx) => {
                        itm.enterRealTime = this.random(10,20)
                        itm.outRealTime = this.random(10,20)
                        itm.allEntry = this.random(10,20)
                        itm.allOut = this.random(10,20)
                        itm.linkCount = this.random(10,30)
                    })
                }
            })
        },

        // 流量归属地区数据总条数
        getAllLocal(){
            this.allLocationListData = this.initLocationList.length
            this.initLocationList.map((item, index) => {
                item.allData = item.citys.length
            })
        },
        // 初始流量归属地区列表
        getInitLocal(){
            this.getAllLocal()
            this.locationList = []
            this.newLocalData = []
            this.initLocationList.map((item, index) => {
                if(index < this.locationEveryPage){
                    item.list = []
                    item.citys.map((itm, idx) => {
                        if(idx < item.everyPage){
                            item.list.push(itm)
                        }
                    })
                    this.locationList.push(item)
                }
                this.newLocalData.push(item)
            })
        },
        // 选择当前列表每页显示数据的条数
        handleLocation(val) {
            this.locationList = []
            var limit = this.newLocalData.length < val ? this.newLocalData.length : val
            for(var i=0;i<limit;i++){
                this.locationList.push(this.newLocalData[i])
            }
        },
        // 输入将要跳转的页数
        handleLocationCurrent(val) {
            this.locationList = []
            var start = (val-1)*this.locationEveryPage
            var end = val*this.locationEveryPage
            if(end > this.allLocationListData){
                end = this.allLocationListData
            }
            for(var i=start;i<end;i++){
                this.locationList.push(this.newLocalData[i])
            }
        },
        // 根据输入的省份名称进行搜索
        selectProvince(){
            this.locationList = []
            this.newLocalData = []
            this.initLocationList.map((item, index) => {
                item.list = []
                item.citys.map((itm, idx) => {
                    item.list.push(itm)
                })
                this.locationList.push(item)
                this.newLocalData.push(item)
            })
            var selectArr = [] // 存放筛选之后的数据

            // 省份
            if(this.provinceValue){
                this.newLocalData.map((item, index) => {
                    if(item.province.indexOf(this.provinceValue) >= 0 ){
                        selectArr.push(item)
                    }
                })
                this.locationList = []
                this.newLocalData = []
                selectArr.map((item, index) => {
                    if(index < this.locationEveryPage){
                        this.locationList.push(item)
                    }
                    this.newLocalData.push(item)
                })
                selectArr = []
            }
            // 城市
            if(this.cityValue){
                this.newLocalData.map((item, index) => {
                    item.list = []
                    item.citys.map((itm, idx) => {
                        if(itm.name.indexOf(this.cityValue) >= 0){
                            item.list.push(itm)
                        }
                    })
                    if(item.list.length != 0){
                        selectArr.push(item)
                    }
                })
                this.locationList = []
                this.newLocalData = []
                selectArr.map((item, index) => {
                    if(index < this.locationEveryPage){
                        this.locationList.push(item)
                    }
                    this.newLocalData.push(item)
                })
                selectArr = []
            }
            this.locationList.map((item, index) => {
                item.allData = item.list.length
            })
            this.allLocationListData = this.newLocalData.length
            // 如果输入值为空，则恢复初始数据
            if(this.provinceValue == "" && this.cityValue == ""){
                this.getInitLocal()
            }
        },
        // 点击重置按钮，将所有数据显示
        allProvince(){
            this.provinceValue = ""
            this.cityValue = ""
            this.countryEveryPage = 10
            this.getInitLocal()
        },

        // 通过对页数的操作改变数据 --- 流量归属地区城市列表
        // 选择当前列表每页显示数据的条数
        handleCities(val) {
            console.log(val)
        },
        // 输入将要跳转的页数
        handleCitiesCurrent(val) {
            console.log(val)
        },
    }
}
</script>
<style>
.areaPage .ARcentent .LPtop{
    min-height:300px;
}
</style>
