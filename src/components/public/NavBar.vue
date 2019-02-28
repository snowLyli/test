<template>
    <div :class="publicText == '态势总览' ? 'navBarPage homeNavPage' : 'navBarPage childNavPage'">
        <div class="otherList" v-if="publicText == '态势总览'">
            <img class="homeImg"
                 :src="showListBox ? '../../../static/home/img/show.png' : '../../../static/home/img/shrink.png'"
                 alt="" @click="ifShowListBox">
            <span style="color:#fff;">{{publicText}}</span>
            <!-- <ul class="visits">
                <li>
                    <span>今日浏览量:</span><span>{{todayVisit}}</span>
                </li>
                <li>
                    <span>历史浏览量:</span><span>{{historyVisit}}</span>
                </li>
            </ul> -->
        </div>
        <div class="lists" id="lists"
             :class="publicText == '态势总览' ? (showListBox ? 'show' : 'hidden') : 'initShows'">
            <div class="firstNav">
                <router-link to='/home' tag="div" :style="publicText == '态势总览' ? 'display:none;':'display:inline-block;'">
                    <img src="../../../static/public/img/logo.png" alt="">
                </router-link>
            </div>
            <div class="firstNav">
                <router-link to='/home'>
                    <h5>态势总览</h5>
                </router-link>
            </div>
            <div class="firstNav" v-for="(item, index) in firstList" :key="index">
                <h5 @click="ifshowSecondList(index)">
                    {{item.name}}
                    <img :src="firstList[index].showSecondList ?
                          '../../../static/home/img/up.png' :
                          '../../../static/home/img/down.png'" alt=""
                    >
                </h5>
                <ul :style="firstList[index].showSecondList ? 'display:block;' : 'display:none'">
                    <router-link  v-for="(itm, idx) in item.secondList" :key="idx" :to="itm.to">
                        <li :class="itm.ifSelected ? 'selected' : ''">
                            {{itm.name}}
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showListBox: false,
            firstList: [
                {
                    name: "攻击感知",
                    secondList: [
                        {
                            name: "DDoS攻击感知",
                            to: '/ddos',
                            ifSelected: false
                        },
                        {
                            name: "入侵感知",
                            to: '/intrusion',
                            ifSelected: false
                        },
                        {
                            name: "病毒感知",
                            to: '/virus',
                            ifSelected: false
                        },
                        {
                            name: "APT攻击感知",
                            to: '/sandbox',
                            ifSelected: false
                        }
                    ],
                    showSecondList: false
                },
                {
                    name: "流量感知",
                    secondList: [
                        {
                            name: "总体流量",
                            to: '/overall',
                            ifSelected: false
                        },
                        {
                            name: "区域流量",
                            to: '/area',
                            ifSelected: false
                        },
                        {
                            name: "用户流量",
                            to: '/users',
                            ifSelected: false
                        },
                        // {
                        //     name: "网站访问流量",
                        //     to: '/domain',
                        //     ifSelected: false
                        // },
                        {
                            name: "应用流量",
                            to: '/apply',
                            ifSelected: false
                        },
                        // {
                        //     name: "邮件流量",
                        //     to: '/apply',
                        //     ifSelected: false
                        // },
                        // {
                        //     name: "流量日志",
                        //     to: '/flowlog',
                        //     ifSelected: false
                        // }
                    ],
                    showSecondList: false
                },
                {
                    name: "内容感知",
                    secondList: [
                        {
                            name: "文本内容感知",
                            to: '/textfeel',
                            ifSelected: false
                        },
                        {
                            name: "图片感知",
                            to: '/picfeel',
                            ifSelected: false
                        },
                        {
                            name: "视频感知",
                            to: '/videofeel',
                            ifSelected: false
                        }
                    ],
                    showSecondList: false
                },
                {
                    name: "应用感知",
                    secondList: [
                        {
                            name: "协议精细识别",
                            to: '/prodiscern',
                            ifSelected: false
                        },
                        {
                            name: "应用精细识别",
                            to: '/appdiscern',
                            ifSelected: false
                        },
                        {
                            name: "文件还原",
                            to: '/restore',
                            ifSelected: false
                        }
                    ],
                    showSecondList: false
                },
                {
                    name: "资产感知",
                    secondList: [
                        {
                            name: "资产监控",
                            to: '/control',
                            ifSelected: false
                        },
                        {
                            name: "资产告警",
                            to: '/alarm',
                            ifSelected: false
                        },
                        {
                            name: "资产管理",
                            to: '/manage',
                            ifSelected: false
                        },
                        {
                            name: "资产日志",
                            to: '/alarmlog',
                            ifSelected: false
                        },
                        {
                            name: "漏洞分析",
                            to: '/hole',
                            ifSelected: false
                        }
                    ],
                    showSecondList: false
                },
                {
                    name: "系统管理",
                    secondList: [
                        {
                            name: "系统监控",
                            to: '/syscontrol',
                            ifSelected: false
                        },
                        {
                            name: "告警日志",
                            to: '/alalog',
                            ifSelected: false
                        }
                    ],
                    showSecondList: false
                }
            ]
        }
    },
    mounted(){
        this.getListHeight()
        this.ifHomePage()
        this.showPrevNav()
    },
    methods: {
        // 判断是否显示侧边导航栏
        ifShowListBox(){
            this.showListBox = !this.showListBox
        },
        // 判断是否显示二级菜单
        ifshowSecondList(index){
            this.firstList[index].showSecondList= !this.firstList[index].showSecondList
            for(var i=0;i<this.firstList.length;i++){
                if(i != index){
                    this.firstList[i].showSecondList= false
                }
            }

        },
        // 设置侧边导航栏高度自适应
        getListHeight(){
            var obj = document.getElementById("lists")
            obj.style.height = window.innerHeight + "px"
        },
        // 判断是否是首页，设置侧边导航栏是否默认显示
        ifHomePage(){
            if(this.publicText != "态势总览"){
                this.showListBox = true
            }
        },
        // 设置分页对应菜单栏样式
        showPrevNav(){
          this.firstList.map((item, index) => {
            var flag = false
            item.secondList.map((itm, idx) => {
              if(itm.name == this.publicText){
                flag = true
                itm.ifSelected = true
              }else{
                itm.ifSelected = false
              }
            })
            if(flag){
              this.firstList.map((itm, idx) => {
                if(index == idx){
                  itm.showSecondList = true
                }else{
                  itm.showSecondList = false
                }
              })
            }
          })
        },
    },
    props: ["publicText"]
}
</script>
<style>
/* 组件样式 */
.navBarPage{
    position: fixed;
    z-index:99;
}
/* 侧边导航栏样式 */
.navBarPage .lists{
    width: 150px;
    box-sizing: border-box;
}
/* 一级菜单样式 */
.navBarPage .lists .firstNav:nth-child(1)>div{
    width:148px;
    height:40px;
}
.navBarPage .lists .firstNav h5{
    display: block;
    width: 148px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0px 10px;
    line-height: 40px;
    font-weight: normal;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}
.navBarPage .lists .firstNav h5>img{
    width: 10px;
    height: 10px;
    float: right;
    margin-top: 15px;
}
/* 二级菜单样式 */
.navBarPage .lists .firstNav>ul{
    width:148px;
}
.navBarPage .lists .firstNav>ul li{
    width: 100%;
    height: 35px;
    color: #aaa;
    padding: 1px 0 0 25px;
    line-height: 35px;
    cursor: pointer;
    box-sizing: border-box;
    font-size:15px;
}
/* 头部信息样式 */
.navBarPage .otherList{
    height:100%;
    margin-left: 20px;
    line-height:50px;
    font-size:18px;
}

/* 主页面样式 */
.homeNavPage{
    height: 45px;
    width: 100%;
    max-width:1920px;
    /* background: rgba(0,17,33,1); */
    background:rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 6px skyblue;
}
/* 侧边导航栏样式 */
.homeNavPage .lists{
    /* background: rgba(0,17,33,1); */
    background:rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 7px skyblue inset;
}
/* 显示效果 */
.homeNavPage .show{
    margin-left:0px;
    transition-duration:1s;
}
.homeNavPage .initShow{
    margin-left:0px;
}
/* 隐藏效果 */
.homeNavPage .hidden{
    margin-left:-150px;
    transition-duration:1s;
}
.homeNavPage .lists .firstNav h5:hover{
    border-left:2px solid rgba(81,177,240);
    background:rgba(255, 255, 255, 0.2);
}
.homeNavPage .lists .firstNav>ul .selected{
    border-left:2px solid rgb(247, 247, 250);
    background:rgba(255, 255, 255, 0.1);
}
.homeNavPage .lists .firstNav>ul li:hover{
    border-left:2px solid rgba(81,177,240);
    background:rgba(255, 255, 255, 0.2);
}
/* 首页头部图片样式 */
.homeNavPage .otherList .homeImg{
    width: 35px;
    height: 31px;
    float: left;
    margin: 7px 10px 0 0;
    cursor: pointer;
}
/* 首页头部访问量模块样式 */
.homeNavPage .otherList .visits{
    width: 50%;
    height: 100%;
    float: right;
    overflow: hidden;
    color: #fff;
}
.homeNavPage .otherList .visits>li{
    float:right;
}

/* 分页样式 */
.childNavPage{
    background: #36404e;
}
/* 侧边导航栏样式 */
.childNavPage .lists{
    background: #36404e;
}
.childNavPage .lists .firstNav>ul{
    width:150px;
}
.childNavPage .lists .firstNav>div{
    width:100%;
    height:100%;
    /* background:#191c20; */
}
.childNavPage .lists .firstNav>div>img{
    width: 116px;
    height: 34px;
    margin: 3px 16px;
}
.childNavPage .lists .firstNav h5{
    width:150px;
}
.childNavPage .lists .firstNav h5:hover{
    background: #252930;
}
.childNavPage .lists .firstNav>ul{
    background:#252930;
}
.childNavPage .lists .firstNav>ul .selected{
    background: #191c20;
    color: rgb(39, 168, 255);
}
.childNavPage .lists .firstNav>ul li:hover{
    background: #575757;
}
/* 首页头部图片样式 */
.childNavPage .otherList .homeImg{
    width: 35px;
    height: 31px;
    float: left;
    margin: 7px 10px 0 0;
    cursor: pointer;
}
.childNavPage .otherList .childImg{
    width: 98px;
    height: 35px;
    margin: 5px 20px;
    float: left;
}
</style>
