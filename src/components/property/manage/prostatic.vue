<template>
    <div class="conBox"> 
        <div class="MPPtop boxes boxContent">
            <div class="searchBox">
                <button class="addBtn" @click="showAddSelect">
                    添加
                    <ul class="addBtnList" v-if="showAddPro">
                        <li>
                            资产添加
                            <ul class="proType">
                                <li v-for="(item, index) in addItemData" :key="index">
                                    <h5>{{item.title}}</h5>
                                    <span v-for="(itm, idx) in item.btns" 
                                            @click="getProTypesValue(itm, item.title)"
                                            :key="idx">{{itm}}</span>
                                </li>
                            </ul>
                        </li>
                        <li @click="getSelectValue('b')">批量资产添加</li>
                        <li @click="getSelectValue('c')">资产自动发现</li>
                    </ul>
                </button>
                <div class="condition">
                    <el-input placeholder="资产类型" v-model="typeValue"
                                @keyup.native="searchMsgBySelect"></el-input>
                    <el-input placeholder="资产名称" v-model="nameValue"
                                @keyup.native="searchMsgBySelect"></el-input>
                    <el-input placeholder="管理者IP" v-model="ipValue"
                                @keyup.native="searchMsgBySelect"></el-input>
                    <button @click="searchMsgBySelect">查询</button>
                    <button @click="showAllData">重置</button>
                </div>
            </div>
            <ul class="title">
                <!-- <li><input type="checkbox"></li> -->
                <li>资产名称</li>
                <li>资产类型</li>
                <li>管理IP</li>
                <li>所属机房</li>
                <li>所属组</li>
                <li>描述信息</li>
                <li>操作</li>
            </ul>
            <div class="lists" v-for="(item, index) in manageList" :key="index">
                <div class="list">
                    <span @click="ifShowDetail(index)">
                        <img :src="item.label ? '/static/property/img/hide.png' : '/static/property/img/show.png'"
                            alt="" style="width:15px;height:15px;">
                    </span>
                    <span>{{item.name}}({{item.allData}})</span>
                </div>
                <div :class="item.label ? 'detailBox show' : 'detailBox hide'">
                    <ul v-for="(itm, idx) in item.list" :key="idx" class="detail">
                        <!-- <li><input type="checkbox"></li> -->
                        <router-link to="/gv6overview" tag="li" style="cursor:pointer;">
                            <li>{{itm.name}}</li>
                        </router-link>
                        <li>{{itm.type}}</li>
                        <li>{{itm.manageIP}}</li>
                        <li>{{itm.belRoom}}</li>
                        <li>{{itm.belGroup}}</li>
                        <li>{{itm.describe}}</li>
                        <li>
                            <img src="/static/property/img/edit.png" alt="">
                            <img src="/static/property/img/delete.png" alt="">
                        </li>
                    </ul>
                    <div class="block">
                        <el-pagination @size-change="handleProperty"
                                        @current-change="handlePropertyCurrent"
                                        :current-page.sync="item.curPage"
                                        :page-sizes="[5,10,15,20]"
                                        :page-size.sync="item.everyPage"
                                        layout="total, sizes, prev, pager, next, jumper" 
                                        :total="item.allData"
                                        @click="getGroupCode(index)">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <add-group :ifAddGroup="ifAddGroup" :visible.sync="ifAddGroup"></add-group>
        <add-item :ifAddItem="ifAddItem" :visible.sync="ifAddItem"
                  :proItemTypes="proItemTypes" :proTypes="proTypes"></add-item>
        <found-self :ifFoundSelf="ifFoundSelf" :visible.sync="ifFoundSelf"></found-self>
    </div>
</template>
<script>
import AddGroup from "@/components/property/dialog/addGroup"
import AddItem from "@/components/property/dialog/addItem"
import FoundSelf from "@/components/property/dialog/foundSelf"
export default {
    data(){
        return{
            // 搜索框数据
            // 添加资产选择框的显示状态
            showAddPro: false,
            // 是否批量添加
            ifAddGroup: false,
            // 是否添加
            ifAddItem: false,
            addItemData: [
                {
                    title: "网络设备",
                    btns: [
                        "思科交换机",
                        "H3C交换机",
                        "锐捷交换机",
                        "其他交换机"
                    ]
                },
                {
                    title: "计算设备",
                    btns: [
                        "windows服务器",
                        "linux服务器"
                    ]
                },
                {
                    title: "安全设备",
                    btns: [
                        "网络安全设备"
                    ]
                }
            ],
            // 添加资产类型
            proItemTypes: "思科交换机",
            proTypes: "网络设备",
            // 是否进行资产自动发现操作
            ifFoundSelf: false,
            // 组管理选择框显示状态
            showManageGroup: false,

             // 列表数据
            manageList: [
                {
                    label: true,
                    name: "机房",
                    initList: [
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.7.131.15",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "1234",
                            type: "机房",
                            manageIP: "10.9.63.45",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        }
                    ],
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    label: true,
                    name: "组",
                    initList: [
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "应用组",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        }
                    ],
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    label: false,
                    name: "计算设备",
                    initList: [
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "计算设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        }
                    ],
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    label: false,
                    name: "网络设备",
                    initList: [
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "网络设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        }
                    ],
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                },
                {
                    label: false,
                    name: "安全设备",
                    initList: [
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        },
                        {
                            name: "CentOS6.5-179",
                            type: "安全设备",
                            manageIP: "",
                            belRoom: "",
                            belGroup: "",
                            describe: "ok"
                        }
                    ],
                    list: [],
                    selectArr: [],
                    newData: [],
                    curPage: 1,
                    everyPage: 10,
                    allData: 1
                }
            ],
            // 资产类型选择后的数据
            typeValue: "",
            // 资产名称输入后的值
            nameValue: "",
            // ip输入后的值
            ipValue: ""
        }
    },
    mounted(){
        // 初始列表渲染
        this.getInitList()
    },
    methods:{
        // 添加资产选择框的显示状态
        showAddSelect(){
            this.showAddPro = !this.showAddPro
        },
        // 组管理选择框的显示状态
        showGroupSelect(){
            this.showManageGroup = !this.showManageGroup
        },
        // 获取操作菜单值
        getSelectValue(val) {
            this.ifAddItem = false
            this.ifAddGroup = false
            this.ifFoundSelf = false
            switch(val){
                case "b": this.ifAddGroup = true;break;
                case "c": this.ifFoundSelf = true;break;
            }
        },
        // 获取添加资产的值
        getProTypesValue(itemType, type){
            this.proItemTypes = itemType
            this.proTypes = type
            this.ifAddItem = true
        },
        // 获取操作菜单值
        getGroupValue(val) {
            console.log("ok")
            this.ifGroupAdd = false
            this.ifRelation = false
            switch(val){
                case "b": this.ifGroupAdd = true;break;
                case "c": this.ifRelation = true;break;
            }
        },
        // 是否显示详细信息
        ifShowDetail(index){
            this.manageList[index].label = !this.manageList[index].label
        },

        // 初始列表数据
        getInitList(){
            this.getListAllData()
            this.manageList.map((item, index) => {
                item.list = []
                item.newData = []
                item.initList.map((itm, idx) => {
                    if(idx < item.everyPage){
                        item.list.push(itm)
                    }
                    item.newData.push(itm)
                })
            })
        },
        // 获取所有列表总页码
        getListAllData(){
            this.manageList.map((item, index) => {
                item.allData = item.initList.length
            })
        },
        // 获取选择到的数据
        searchMsgBySelect(){
            // 获取到的值为空时，恢复为原来数组
            this.manageList.map((item, index) => {
                item.list = []
                item.newData = []
                item.initList.map((itm, idx) => {
                    item.list.push(itm)
                })
                item.selectArr = []
            })
            // 资产类型搜索
            if(this.typeValue){
                this.manageList.map((item, index) => {
                    item.list.map((itm, idx) => {
                        if(itm.type.indexOf(this.typeValue) >= 0){
                            item.selectArr.push(itm)
                        }
                    })
                    item.list = []
                    item.newData = []
                    item.selectArr.map((itm, idx) => {
                        item.list.push(itm)
                        item.newData.push(itm)
                    })
                    item.selectArr = []
                })
            }
            // 资产名称搜索
            if(this.nameValue){
                this.manageList.map((item, index) => {
                    item.list.map((itm, idx) => {
                        if(itm.name.indexOf(this.nameValue) >= 0){
                            item.selectArr.push(itm)
                        }
                    })
                    item.list = []
                    item.newData = []
                    item.selectArr.map((itm, idx) => {
                        item.list.push(itm)
                        item.newData.push(itm)
                    })
                    item.selectArr = []
                })
            }
            // ip地址搜索
            if(this.ipValue){
                this.manageList.map((item, index) => {
                    item.list.map((itm, idx) => {
                        if(itm.manageIP.indexOf(this.ipValue) >= 0){
                            item.selectArr.push(itm)
                        }
                    })
                    item.list = []
                    item.newData = []
                    item.selectArr.map((itm, idx) => {
                        item.list.push(itm)
                        item.newData.push(itm)
                    })
                    item.selectArr = []
                })
            }
            this.manageList.map((item, index) => {
                item.allData = item.list.length
            })
        },
        // 显示全部信息
        showAllData(){
            this.getInitList()
            this.typeValue = ""
            this.nameValue = ""
            this.ipValue = ""
        },
        // 选择后的页码数
        handleProperty(val){
            this.manageList.map((item, index) => {
                item.list = []
                item.newData.map((itm, idx) => {
                    if(idx < item.everyPage){
                        item.list.push(itm)
                    }
                })
            })
        },
        // 当前页码
        handlePropertyCurrent(val){
            this.manageList.map((item, index) => {
                var start = (item.curPage-1)*item.everyPage
                var end = item.curPage*item.everyPage
                item.list = []
                if(end > item.allData){
                    end = item.allData
                }
                for(var i=start;i<end;i++){
                    item.list.push(item.newData[i])
                }
            })
        }
    },
    components:{
        AddGroup,
        AddItem,
        FoundSelf,
    }
}
</script>
<style>
.MPPtop .searchBox .addBtn{
    position:relative;
}
.MPPtop .searchBox .addBtn .addBtnList{
    clear: both;
    position: absolute;
    width: 95px;
    z-index: 99;
    left: -2px;
    top: 119%;
    border-radius: 4px;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 10px 0;
}
.MPPtop .searchBox .addBtn .addBtnList>li{
    padding: 0px 7px;
    line-height: 24px;
    text-align: left;
    font-size: 13px;
    cursor:pointer;
}
.MPPtop .searchBox .addBtn .addBtnList>li:hover{
    background:#eee;
}
.MPPtop .searchBox .addBtn .addBtnList>li:nth-child(1) .proType{
    width: 240px;
    position: absolute;
    left: 100%;
    top: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-left: 5px;
    box-sizing: border-box;
    padding: 5px 0 5px 10px;
    display:block;
}
.MPPtop .searchBox .addBtn .addBtnList>li:nth-child(1):hover .proType{
    display:block;
}
.MPPtop .searchBox .addBtn .addBtnList>li:nth-child(1) .proType>li>h5{
    font-size:14px;
    clear: both;
}
.MPPtop .searchBox .addBtn .addBtnList>li:nth-child(1) .proType>li>span{
    font-size:12px;
    margin-right: 10px;
    white-space: nowrap;
    cursor:pointer;
    float:left;
}
.MPPtop .searchBox .addBtn .addBtnList>li:nth-child(1) .proType>li>span:hover{
    text-decoration: underline;
}
.MPPtop .searchBox .addBtn>span{
    line-height: 22px;
    float: left;
}
/* 选择搜索类型模块 */
.MPPtop .searchBox .condition{
    height: 100%;
    box-sizing: border-box;
    float: right;
}
.MPPtop .searchBox .condition>button{
    padding: 1px 8px;
    color: #666;
    font-size: 12px;
}
/* 列表标题和列表项样式 */
.MPPtop .title,
.MPPtop .lists{
    width:100%;
    overflow: hidden;
}
.MPPtop .lists{
    background:#fff;
}
/* 单个列表样式 */
.MPPtop .lists .list{
    width:100%;
    height:30px;
    line-height:30px;
    padding-left:10px;
    box-sizing: border-box;
    border-bottom:1px solid #47515f;
}
/* 单个详细信息列表样式 */
.MPPtop .lists .detailBox{
    width:100%;
}
.MPPtop .lists .detailBox .detail{
    width:100%;
    height:28px;
    line-height:28px;
    border-bottom:1px solid rgb(195,195,195);
}
/* 列表标题元素样式 */
.MPPtop .title>li{
    height:36px;
    box-sizing: border-box;
    background:#47515f;
    border-left:1px solid #58626f;
    line-height:36px;
    text-align:center;
    color:#fff;
}
.MPPtop .title>li,
.lists .detailBox .detail>li{
    width:14%;
    height:100%;
    text-align:center;
    float:left;
}
.MPPtop .lists .detailBox .detail>li>img{
    width:20px;
    height:20px;
    margin:4px 0;
}
/* 列表标题以及列表各项内容单个元素样式 */
.MPPtop .title>li:nth-child(6),
.MPPtop .lists .detailBox .detail>li:nth-child(6){
    width:16%;
}
.MPPtop .lists .show{
    display:block;
}
.MPPtop .lists .hide{
    display:none;
}
/* 分页模块样式 */
.MPPtop .lists .detailBox .countBlock{
    width: 100%;
    height: 50px;
    padding: 8px 0;
    box-sizing: border-box;
    text-align:right;
}
</style>