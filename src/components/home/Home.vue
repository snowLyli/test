<template>
    <div class="homePage">
        <!-- 攻击地图 -->
        <attack-map></attack-map>
        <!-- 主要内容 -->
        <nav-bar :publicText="publicText"></nav-bar>
        <div class="main">
            <!-- 左边logo和饼状图 -->
            <div class="left">
                <div class="logo">
                  <img src="../../../static/home/img/logo.gif" alt="">
                </div>
                <div class="pieBox">
                  <div class="DDoS pie"  id="DDoSPie"></div>
                  <div class="Intrusion pie" id="IntrusionPie"></div>
                  <div class="Viruses pie" id="VirusesPie"></div>
                  <div class="Sandbox pie" id="SandboxPie"></div>
                  <div id="tip" class="tip"></div>
                </div>
            </div>
            <!-- 中间内容 -->
            <div class="center">
                <div class="overview">
                    <div class="overviewData">
                        <div class="safetyScore">
                            <h5>安全指数</h5>
                            <span>76</span>
                        </div>
                        <div class="line"></div>
                        <div class="flow">
                            <h5>进流量<span>{{entryFlow}} Gbps</span></h5>
                            <h5>出流量<span>{{outFlow}} Gbps</span></h5>
                        </div>
                        <div class="line"></div>
                        <div class="todayEvents">
                            <h5>今日安全事件</h5>
                            <span>{{todayEvents}}</span>
                        </div>
                    </div>
                </div>
                <div class="map">
                    <!-- <attack-map></attack-map> -->
                    <!-- <div class="mapBtn" @click="selectMapType">
                        <span :class="{'active': cityData.mapType}">中国</span>
                        <span :class="{'active': !cityData.mapType}">世界</span>
                    </div> -->
                </div>
                <div class="flowSituation">
                    <div class="realTimeFlow" id="realTimeFlowLine"></div>
                    <div class="protocolType" id="protocolTypePie"></div>
                    <div class="top5" id="top5Line"></div>
                </div>
            </div>
            <!-- 日志部分 -->
            <div class="right">
                <div class="journal">
                    <div class="attackLog">
                        <h3>攻击日志</h3>
                        <div class="attackDetail">
                            <span>时间</span>
                            <span>攻击地址</span>
                            <span>攻击者IP</span>
                            <span>被攻击地址</span>
                            <span>攻击类型</span>
                        </div>
                        <div class="attackLogBox">
                            <ul id="attackLog">
                                <li v-for="(item, index) in attackLogData" :key="index">
                                    <span>{{item.time}}</span>
                                    <span>{{item.address}}</span>
                                    <span>{{item.IP}}</span>
                                    <span>{{item.attacker}}</span>
                                    <span>{{item.type}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul class="legends">
                        <h3>图例</h3>
                        <li>
                            <span></span>
                            严重
                        </li>
                        <li>
                            <span></span>
                            高危
                        </li>
                        <li>
                            <span></span>
                            中危
                        </li>
                        <li>
                            <span></span>
                            低危
                        </li>
                    </ul>
                    <div class="attackSource">
                        <h3>攻击源</h3>
                        <div class="attackAtatistics">
                            <div class="atatisticsLeft">
                                <span>次数</span>
                                <span>国家</span>
                            </div>
                            <div class="atatisticsRight">
                                <span>次数</span>
                                <span>国家</span>
                            </div>
                        </div>
                        <div class="attackSourceBox">
                            <ul id="attackSource">
                                <li v-for="(item, index) in tabData" :key="index">
                                    <span>{{item.times}}</span>
                                    <span>{{item.country}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <div class="assetPosture">
                    <div class="vulnerabilities" id="vulnerabilitiesBar"></div>
                    <div class="assetAlarm" id="assetAlarmBar"></div>
                    <div class="alarmLog">
                      <h3>告警日志</h3>
                        <div class="logType">
                            <span>等级</span>
                            <span>告警名称</span>
                            <span>资产</span>
                            <span>描述</span>
                            <span>时间</span>
                        </div>
                        <div class="alarmLogBox">
                            <ul id='alarmLog'>
                                <li v-for="(item, index) in alarmLogLineData" :key="index">
                                    <span>{{item.grade}}</span>
                                    <span>{{item.name}}</span>
                                    <span>{{item.assets}}</span>
                                    <span>{{item.describe}}</span>
                                    <span>{{item.time}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部边框 -->
        <!-- <div class="foot"></div> -->
        <!-- 数据请求失败弹框 -->
        <failed-load v-if="showFailedLoad.flag" :msg="showFailedLoad.msg"></failed-load>
    </div>
</template>

<script>
import otherFunction from "../../../static/public/js/otherFunction.js"
import "../../../node_modules/echarts/map/js/china.js"
import "../../../node_modules/echarts/map/js/world.js"
import FailedLoad from "@/components/public/FailedLoad.vue"
import NavBar from "@/components/public/NavBar.vue"
import AttackMap from "@/components/home/map.vue"

export default {
    data () {
        return {
            publicText: "态势总览",
            // 定时器
            timers: {
                timer1: null,
                timer2: null
            },
            // 判断是否加载失败
            showFailedLoad: {
                flag: false,
                msg: ""
            },

            // DDoS饼图数据
            DDoSObj: {
                title: "DDoS事件",
                data: {
                    value: ["73","122","146","220","98","49","293"],
                    name: ["UDP","SYN","ICMP","ACK","CC","TCP","RST"],
                    // color: ["#06edd9","#73ba90","#8ec319","#f4c61b","#f70007","#00ff00","#0000fe"]
                },
                series: {
                    radius: "53%"
                },
                position: ["50%", "57%"]
            },
            // 入侵事件饼图数据
            IntrusionObj: {
                title: "入侵事件",
                data: {
                    value: ["97","161","194","290","129","129"],
                    name: ["SQL","XSS","baolipojie","eyidaima","loudongliyong","jiamitongdaoshujuxielou"],
                    // color: ["#11e8e3","#79ba80","#8fc124","#f4c61b","#fd0100","#00ff0a"]
                },
                series: {
                    radius: "53%"
                },
                position: ["50%", "57%"]
            },
            // 病毒事件饼图数据
            VirusesObj: {
                title: "病毒事件",
                data: {
                    value: ["111","185","222","333","148"],
                    name: ["蠕虫","木马","病毒","后门","rootkit"],
                    // color: ["#11e8d6","#6cc082","#8ec220","#f1c71b","#fe0005"]
                },
                series: {
                    radius: "53%"
                },
                position: ["50%", "57%"]
            },
            // 沙箱事件饼图数据
            SandBoxObj: {
                title: "沙箱事件",
                data: {
                    value: ["130","217","261","391"],
                    name: ["紧急","高危","中危","低危"],
                    // color: ["#0de8e2","#6ebf84","#8ec220","#f4c61b"]
                },
                series: {
                    radius: "53%"
                },
                position: ["50%", "57%"]
            },
            entryFlow: 2.35,
            outFlow: 7.35,
            // 今日安全事件
            todayEvents: 10,
            // 协议类型分布饼图数据
            protocolTypeObj: {
                title: "应用协议类型分布",
                data: {
                    value: ["281","56","90","101","45","22","135","135","135"],
                    name: ["HTTP","BT","微信","QQ","SSE","魔兽世界","DNS","ICMP","NetBIOS"],
                    // color: ["#0ce9e2","#74b690","#94c10e","#eaca1f","#ef0006","#0aff02","#000aec","#fffc06","#040000"]
                },
                series: {
                    radius: "45%"
                },
                position: ["53%", "60%"]
            },
            // 实时流量数据
            realTimeFlowObj: {
                dataX: [],
                data1: [],
                data2: []
            },
            // top会话数数据
            top5Obj: {
                title: {
                    name: "TOP会话数",
                    position: "25%"
                },
                grid: {
                    left: "13%",
                    right: "25%",
                    top: "39%",
                    bottom: "0%"
                },
                xData: {
                    name: "会话数"
                },
                yData: {
                    data: ["166.0.0.0","191.0.0.0","62.0.0.0","49.0.0.0","97.0.0.0"],
                    name: "IP地址",
                    flag: false
                },
                data: {
                    data: [10989, 11039, 11061, 11235, 11323]
                }
            },
            // 攻击源数据
            tabData: [
                {
                    times: "1",
                    country: "China"
                },{
                    times: "2",
                    country: "America"
                },{
                    times: "3",
                    country: "Japan"
                },{
                    times: "4",
                    country: "England"
                },{
                    times: "5",
                    country: "Korea"
                },{
                    times: "6",
                    country: "Russia"
                },{
                    times: "7",
                    country: "Singapore"
                },{
                    times: "8",
                    country: "Vietnamese"
                },{
                    times: "9",
                    country: "Burma"
                },{
                    times: "10",
                    country: "Laos"
                },{
                    times: "11",
                    country: "Mayaysia"
                },{
                    times: "12",
                    country: "Pakistan"
                }
            ],
            // 攻击日志数据
            attackLogData: [
                {
                    time: "9:00",
                    address: "北京",
                    IP: "127.0.0.1",
                    port: "8080",
                    attacker: "杭州",
                    type: "type"
                },{
                    time: "9:10",
                    address: "北京",
                    IP: "127.0.0.1",
                    port: "8080",
                    attacker: "杭州",
                    type: "type"
                },{
                    time: "9:20",
                    address: "北京",
                    IP: "127.0.0.1",
                    port: "8080",
                    attacker: "杭州",
                    type: "type"
                },{
                    time: "9:30",
                    address: "北京",
                    IP: "127.0.0.1",
                    port: "8080",
                    attacker: "杭州",
                    type: "type"
                }
            ],
            // 告警数量数据
            alarmLogLineData: [
                {
                    grade: "一级",
                    name: "CPU利用率过高",
                    assets: "资产",
                    describe: "描述",
                    time: "18:09:22"
                },{
                    grade: "二级",
                    name: "CPU利用率过高",
                    assets: "资产",
                    describe: "描述",
                    time: "18:09:22"
                },{
                    grade: "三级",
                    name: "CPU利用率过高",
                    assets: "资产",
                    describe: "描述",
                    time: "18:09:22"
                },{
                    grade: "四级",
                    name: "CPU利用率过高",
                    assets: "资产",
                    describe: "描述",
                    time: "18:09:22"
                },{
                    grade: "五级",
                    name: "CPU利用率过高",
                    assets: "资产",
                    describe: "描述",
                    time: "18:09:22"
                }
            ],
            // 攻击城市名称
            cityData: {
                allCity: [],
                convertData: [],
                option: {},
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4"],
                mapType: true
            },
            // 资产警告数据
            assetAlarmObj: {
                title: {
                    name: "资产警告",
                    position: "0%",
                },
                grid: {
                    left: "7%",
                    right: "20%",
                    top: "42%",
                    bottom: "0%"
                },
                xData: {
                    name: "告警数量"
                },
                yData: {
                    data: ["PC-BSD","fedora","fedora","centos7.3"],
                    name: "主机名",
                    flag: false
                },
                data: {
                    data: [
                        {
                            value: 11039,
                            label: {
                                show:true,
                                formatter: function (value, index) {
                                    return "166.0.0.1(11039)"  
                                }
                            }
                        },
                        {
                            value: 11061,
                            label: {
                                show:true,
                                formatter: function (value, index) {
                                    return "166.0.0.2(11061)" 
                                }
                            }
                        },
                        {
                            value: 11235,
                            label: {
                                show:true,
                                formatter: function (value, index) {
                                    return "166.0.0.3(11235)" 
                                }
                            }
                        },
                        {
                            value: 11323,
                            label: {
                                show:true,
                                formatter: function (value, index) {
                                    return "166.0.0.4(11323)" 
                                }
                            }
                        }
                    ]
                }
            },
            // 漏洞数量数据
            vulnerabilitiesObj: {
                data: {
                    name: ["严重","高危","中危","低危"],
                    data: ["59","58","54","51"],
                    color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4"]
                }
            },
            // 数据请求网址
            urls: {},
            // 当天访问量
            todayVisit: 0,
            historyVisit: 0
        }
    },
    created () {
        this.getUrl() // 获取各数据网址
    },
    mounted () {
        // DDoS
        this.drawPie(this.DDoSObj,"DDoSPie") 
        // 入侵事件
        this.getPieData(this.IntrusionObj,"IntrusionPie",this.urls.IntrusionUrl) 
        // 病毒事件
        this.getPieData(this.VirusesObj,"VirusesPie",this.urls.VirusesUrl) 
        // 沙箱事件
        this.drawPie(this.SandBoxObj,"SandboxPie")
        // 进流量、出流量
        this.getFlow()
        // 应用协议类型分布
        this.drawPie(this.protocolTypeObj,"protocolTypePie")
        // this.getPieData(this.protocolTypeObj,"protocolTypePie",this.urls.protocolTypeUrl) 
        // 实时流量
        this.drawLine(this.realTimeFlowObj,"realTimeFlowLine") 
        // Top5回话数
        this.drawBar(this.top5Obj,"top5Line")
        //资产告警
        this.drawBar(this.assetAlarmObj,"assetAlarmBar")
        //漏洞数量
        this.drawBugBar(this.vulnerabilitiesObj,"vulnerabilitiesBar")
        // 地图及数据
        // this.drawMap(this.cityData) 
        // 数据轮播
        this.getSwiper() 
        // 定时获取饼图数据
        this.getPieDatas ()
        // 访问量
        this.linkCounter()
    },
    methods: {
        random(max,min){
            return parseInt(Math.random()*(max-min)+min)
        },
        linkCounter(){
            // 当天访问量
            var today = otherFunction.getTime(new Date(), "d", false)
            var todayObj = {
                "size": 0,
                "query": {
                    "range": {
                        "@timestamp": {
                            "gte": "2019-01-17T00:00:00.000Z",
                            "lte": "2019-01-17T23:59:59.000Z"
                        }
                    }
                }
            }
            this.$axios.post(g.NEW_URL+"/original_esquery?index=web_visitor", JSON.stringify(todayObj))
                .then((res) => {
                    this.todayVisit = res.data.hits.total
                    console.log(this.todayVisit)
                }).catch((err) => {
                    console.log(err)
                })
            // 历史访问量
            var hisObj = {
                "size": 0
            }
            this.$axios.post(g.NEW_URL+"/original_esquery?index=web_visitor", JSON.stringify(hisObj))
                .then((res) => {
                    this.historyVisit = res.data.hits.total
                    console.log(this.historyVisit)
                }).catch((err) => {
                    console.log(err)
                })
        },

        // 饼状图
        drawPie(obj,id) {
            let Mychart = this.$echarts.init(document.getElementById(id))

            // 用一个新的数组存放传递过来的数据，防止原数据改变
            var newValue = []
            var newName = []
            for(var i=0;i<obj.data.value.length;i++){
                newValue.push(obj.data.value[i])
                newName.push(obj.data.name[i])
            }
            // console.log(name)
            // 将传递过来的数据进行处理
            var needObj = otherFunction.arrRank(newValue,5)
            var seriesData = {
                value: [],
                name: []
            }
            needObj.needArr.map((item, index) => {
                seriesData.value.push(item)
                seriesData.name.push(needObj.indexArr[index])
            })
            // 将处理后的数据以正确的格式显示
            var endObj = []
            seriesData.value.map((item, index) => {
                var itemData = {
                    value: item,
                    name: index < 5 ? newName[seriesData.name[index]] : "其他"
                }
                endObj.push(itemData)
            })

            let option = {
                title : {
                    text: obj.title,
                    x:"center",
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip : {
                    trigger: "item",
                    formatter: "{b} : {c} ({d}%)",
                    position: function(point, params, dom, rect, size){
                        //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，
                        // 分别为外层div和tooltip提示框的大小
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = size.viewSize[0];
                        var viewHeight = size.viewSize[1];
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        var posX = 0;//x坐标位置
                        var posY = 0;//y坐标位置
        
                        if(x<boxWidth){//左边放不开
                            posX = 5;    
                        }else{//左边放的下
                            posX = x-boxWidth; 
                        }
        
                        if(y<boxHeight){//上边放不开
                            posY = 5; 
                        }else{//上边放得下
                            posY = y-boxHeight;
                        }
        
                        return [posX,posY]
                    }
                },
                series : [
                    {
                        type: "pie",
                        radius : obj.series.radius,
                        center: obj.position,
                        data: endObj,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            },
                            normal:{
                                color:function(params) {
                                //自定义颜色
                                var colorList = [           
                                        "#bf2b27","#fbac47","#fdfe00","#29a7e4","#2a3ac1",                                    
                                        "#00cd64","#009a00","#305d18"
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "ouside",
                                color: "#ccc",
                                formatter: function (params){
                                    if(params["name"].length > 5){
                                        return params["name"].substring(0, 5) + "..."
                                    }else{
                                        return params["name"]
                                    }  
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 9,
                                length2: 10,
                                lineStyle: {
                                    color: "#999" // 改变标示线的颜色
                                }
                            }
                        }
                    }
                ]
            }
            
            Mychart.on("mouseover", function (params) {
                if(params.componentType === "series"){
                    if(params.seriesType === "pie"){
                        if(params.name.length > 5){
                            var tt = document.getElementById("tip");
                            tt.innerHTML = params.name;
                            tt.style.left = params.event.event.pageX + 10 + "px"
                            tt.style.top = params.event.event.pageY + 10 + "px"
                            tt.style.display = "block"
                        }
                    }
                }
            })
            Mychart.on("mouseout", function (params) {
                var tt = document.getElementById("tip");
                tt.style.display = "none"
            })
            Mychart.setOption(option)
            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        // 折线图
        drawLine (obj,id) {
            let Mychart = this.$echarts.init(document.getElementById(id))
            // 模拟数据
            var data1 = []
            var data2 = []
            var xData = []
            var now = new Date() // 获取当前时间
            var start = new Date(+ now - 30*60*1000) // 获取30分钟以内时间段
            // 模拟数据
            var len = parseInt((now-start)/(60*1000)) 
            for(var i=0;i<len;i++){
                data1.push(parseInt(Math.random()*100 + 50))
                data2.push(parseInt(Math.random()*150 + 100))
                xData.push(getTime())
            }
            function getTime(){
                start = new Date( + start + 1000*60)
                var hour = start.getHours() < 10 ? "0" + start.getHours() : start.getHours()
                var minute = start.getMinutes() < 10 ? "0" + start.getMinutes() : start.getMinutes()
                var timeStr = hour + ":" + minute
                return timeStr
            }
            // 数据渲染
            obj.data1 = data1
            obj.data2 = data2
            obj.dataX = xData

            let option = {
                title: {
                    text: "实时流量",
                    left: "center",
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{a}: {c}Gbps",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: "9%",
                    right: "13%",
                    bottom: "5%",
                    top: "38%",
                    containLabel: true
                },
                // legend: {
                //     data: [
                //         {
                //             name: "进口流量",
                //             icon: "rect"
                //         },
                //         {
                //             name: "出口流量",
                //             icon: "rect"
                //         }
                //     ],
                //     top: "14%",
                //     left: "25%",
                //     textStyle: {
                //         color: "#fff"
                //     },
                //     itemWidth: 20,
                //     itemHeight: 2
                // },
                xAxis: {
                    type: "category",
                    data: obj.dataX,
                    name: "时间",
                    nameTextStyle: {
                        padding: [0,0,0,-10]
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        color: "#ccc"
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#0a1b37"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    name: "Gbps",
                    nameTextStyle: {
                        color: "#ccc",
                        padding:[0,0,0,-30]
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#0a1b37"
                        }
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolOffset: 8,
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        formatter: "{value}",
                        color: "#ccc"
                    }
                },
                series: [
                    {
                        data: obj.data1,
                        type: "line",
                        name: "上行流量",
                        symbol: "none",
                        lineStyle: {
                            color: "#ab363c"
                        }
                    },
                    {
                        data: obj.data2,
                        type: "line",
                        name: "下行流量",
                        symbol: "none",
                        lineStyle: {
                            color: "#17bef2"
                        }
                    }
                ]
            };
            Mychart.setOption(option)

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        // 柱状图
        drawBar(obj,id) {
            let Mychart = this.$echarts.init(document.getElementById(id))
            let option = {
                title: {
                    text: obj.title.name,
                    left: obj.title.position,
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    left: obj.grid.left,
                    right: obj.grid.right,
                    bottom: obj.grid.bottom,
                    top: obj.grid.top,
                    containLabel: true
                },
                xAxis: {
                    type: "value",
                    name: obj.xData.name,
                    nameTextStyle: {
                        color: "#ccc",
                        padding: [0,0,0,-10]
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: "#ccc",
                        formatter: function (value, index) {
                            var newValue = value/1000
                            return newValue+"k"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#0a1b37"
                        }
                    }
                },
                yAxis: {
                    type: "category",
                    name: obj.yData.name,
                    nameTextStyle: {
                        color: "#ccc",
                        padding: [0,0,-2,0]
                    },
                    data: obj.yData.data,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: obj.yData.flag,
                        textStyle: {
                            fontSize: 10,
                            color: "#ccc"
                        }
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolOffset: 8,
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                },
                series: [
                    {
                        type: "bar",
                        data: obj.data.data,
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 10,
                                fontWeight: "normal"
                            },
                            formatter: "{b} ({c})",
                        },
                        itemStyle: {
                            color: "#586f7d"
                        }
                    }
                ]
            };

            Mychart.setOption(option)

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        // 绘制彩色柱状图
        drawBugBar(obj,id) {
            let Mychart = this.$echarts.init(document.getElementById(id))
            var barData = []
            for(var i=0;i<obj.data.data.length;i++){
                var itemObj = {
                    name: obj.data.name[i],
                    type: "bar",
                    data: [obj.data.data[i]],
                    label: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        },
                        formatter: "{c}",
                        position: "right"
                    },
                    itemStyle: {
                        color: obj.data.color[i]
                    }
                }
                barData.push(itemObj)
            }
            let option = {
                title: {
                    text: "漏洞数量",
                    left: "0",
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    },
                    position: function(point, params, dom, rect, size){
                        //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，
                        // 分别为外层div和tooltip提示框的大小
                        var x = point[0];
                        var y = point[1];
                        var viewWidth = size.viewSize[0];
                        var viewHeight = size.viewSize[1];
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        var posX = 0;//x坐标位置
                        var posY = 0;//y坐标位置
        
                        if(x<boxWidth){//左边放不开
                            posX = 5;    
                        }else{//左边放的下
                            posX = x-boxWidth; 
                        }
        
                        if(y<boxHeight){//上边放不开
                            posY = 5; 
                        }else{//上边放得下
                            posY = y-boxHeight;
                        }
        
                        return [posX,posY]
                    }
                },
                legend: {
                    data: ["严重","高危","中危","低危"],
                    orient: "vertical",
                    right: "0",
                    top: "15%",
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color:"#ccc"
                    }
                },
                grid: {
                    top: "28%",
                    left: "7%",
                    right: "25%",
                    bottom: "23%"
                },
                xAxis: {
                    type: "value",
                    name: "数量",
                    nameTextStyle: {
                        color: "#999",
                        padding: [0,0,0,-10]
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                  axisTick: {
                      show: false
                  },
                  axisLabel: {
                      show: true,
                      color: "#999"
                  },
                  splitLine: {
                      show: true,
                      lineStyle: {
                          color: "#0a1b37"
                      }
                  }
                },
                yAxis: {
                    type: "category",
                    axisTick: {
                        show: false
                    },
                    data: ["北京"],
                    axisLabel: {
                        show: false,
                        color: "#999"
                    },
                    axisLine: {
                        symbol: ["none","arrow"],
                        symbolOffset: 8,
                        symbolSize: [6,12],
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                },
                series: barData
            }
            Mychart.setOption(option)

            //用于使chart自适应高度和宽度
            window.onresize = function() {
                Mychart.resize()
            }
        },
        // 绘制地图
        drawMap (obj) {
            let Mychart = this.$echarts.init(document.getElementById("map"))
            obj.option = {
                geo: {
                    map: obj.mapType ? "china" : "world",
                    center: obj.mapType ? [110, 35.71] : [25.97, 29.71],
                    zoom: 0.7,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {//选取前颜色
                          areaColor: "#313842",
                          borderColor: "rgba(110,110,110,0)"
                        },
                      emphasis: {//选取后颜色
                        areaColor: "black"
                      }
                    },
                    // regions: [
                    //     {
                    //     name: "China",
                    //         itemStyle: {
                    //             areaColor: "#301027",
                    //             color: "#301027"
                    //         }
                    //     }
                    // ]
                },
                series: [
                    // 控制攻击方向
                    {
                        type: "lines",
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 1,
                            // constantSpeed: 400,
                            trailLength: 0,
                            symbol: "rect",
                            symbolSize: [3, 80],
                            loop: false
                        },
                        lineStyle: {
                            normal: {
                                color:  new this.$echarts.graphic.LinearGradient(
                                    0, 1, 0, 0, [
                                        {
                                            offset: 0,
                                            color: "rgba(255,255,255,0)" // 0% 处的颜色
                                        },
                                        {
                                            offset: 0.5,
                                            color: "red" // 100% 处的颜色
                                        },
                                        {
                                            offset: 0.51,
                                            color: "rgba(255,255,255,0)" // 100% 处的颜色
                                        }
                                ], false),
                                width: 0,
                                curveness: 0
                            }
                        },
                        data: obj.convertData
                    },
                    // 控制城市点的显示
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            scale: 3,
                            brushType: "stroke"
                        },
                        label: {
                            normal: {
                                show: true,
                                fontSize: 6,
                                fontWeight: 100,
                                position: "right",
                                formatter: "{b}"
                            }
                        },
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: "#fff"
                            }
                        },
                        data: obj.allCity
                    }
                ]
            };
            Mychart.setOption(obj.option)
            var _this = this
            this.timers.timer1 = setInterval(() => {
                obj.allCity = []
                _this.$axios.post(this.urls.cityDataUrl).then((res) => {
                    // var now = new Date()
                    var nowData = []
                    // 将符合时间段的数据提取出来
                    for(var i=0;i<res.data.length;i++){
                    //     var getDate = new Date(res.data[i].GenTime)
                    //     if(parseInt((now - getDate)/1000) <= 5){
                            nowData.push(res.data[i])
                    //     }
                    }
                    // 今日安全事件
                    if(res.data instanceof Array) _this.todayEvents += nowData.length
                    // 将所有城市信息放置列表
                    if(res.data instanceof Array){
                        nowData.map((item, index) => {
                            var itemObj = {
                                time: item.GenTime,
                                address: item.SrcIP_Geo.City_name,
                                IP: item.SrcIP,
                                port: "8080",
                                attacker: item.DstIP_Geo.City_name,
                                type: item.EventType
                            }
                             _this.attackLogData.unshift(itemObj)
                        })
                    }
                    // 地图信息
                    if(res.data instanceof Array){
                        for(var i=0;i<nowData.length;i++){
                            // 攻击城市路径
                            var fromCity = nowData[i].SrcIP_Geo.City_name
                            var toCity = nowData[i].DstIP_Geo.City_name
                            var color = this.random(0,4)
                            if(obj.convertData.length > 4){
                                // obj.convertData.shift()
                            }
                            obj.convertData.push({
                                fromName: fromCity,
                                toName: toCity,
                                coords: [
                                            [nowData[i].SrcIP_Geo.Longitude,nowData[i].SrcIP_Geo.Latitude], 
                                            [nowData[i].DstIP_Geo.Longitude,nowData[i].DstIP_Geo.Latitude]
                                        ],
                                label: true,
                                lineStyle: {
                                    color:  new this.$echarts.graphic.LinearGradient(
                                        0, 1, 0, 0, [
                                            {
                                                offset: 0,
                                                color: "rgba(255,255,255,0)" // 0% 处的颜色
                                            },
                                            {
                                                offset: 0.5,
                                                color: obj.color[color] // 100% 处的颜色
                                            },
                                            {
                                                offset: 0.51,
                                                color: "rgba(255,255,255,0)" // 0% 处的颜色
                                            }
                                    ], false)
                                }
                            })
                            // 所有城市原点
                            obj.allCity.push({
                                name: fromCity,
                                value: [nowData[i].SrcIP_Geo.Longitude,nowData[i].SrcIP_Geo.Latitude]
                            })
                            obj.allCity.push({
                                name: toCity,
                                value: [nowData[i].DstIP_Geo.Longitude,nowData[i].DstIP_Geo.Latitude]
                            })
                        }
                        obj.option.series = [
                            // 控制攻击方向
                            { 
                                data: obj.convertData
                            },
                            // 控制城市点的显示
                            {
                                itemStyle: {
                                    normal: {
                                        color: function(params){
                                            // 判断依据
                                            return "#fff"
                                            // let num = params.value[2];
                                            // if(num > 75){
                                            //     return color[0];
                                            // }else if(num > 50){
                                            //     return color[1];
                                            // }else if(num > 25){
                                            //     return color[2];
                                            // }
                                        }
                                    }
                                },
                                data: obj.allCity
                            }
                        ]
                        Mychart.setOption(obj.option)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }, 3000);
            //用于使chart自适应高度和宽度
            window.onresize = function() {
              Mychart.resize()
            }
        },
        // 进流量、出流量模拟数据
        getFlow(){
            this.entryFlow = this.random(1, 10)+"."+(1,100)
            this.outFlow = this.random(1, 10)+"."+(1,100)
        },
        
        // 选择地图类型
        selectMapType () {
            this.cityData.mapType = !this.cityData.mapType
            clearInterval(this.timers.timer1)
            this.drawMap(this.cityData)
        },
        // 获取数据轮播效果
        makeSwiper (dataObj) {
            var len = dataObj.data.length
            if(len<=dataObj.viewNum){
                return
            }
            if(dataObj.flag){
                len = parseInt(len/2)
            }
            for(var i=0;i<dataObj.viewNum;i++){
                dataObj.data.push(dataObj.data[i])
            }
                var obj = document.getElementById(dataObj.id)
                otherFunction.swiper(obj,len,dataObj.h)
        },
        // 轮播方法调用
        getSwiper () {
          // 攻击源轮播
            var tabDataObj = {
                id: "attackSource",
                h: 20,
                data: this.tabData,
                viewNum: 6,
                flag: true
            }
            this.makeSwiper(tabDataObj)
            // 攻击日志轮播
            var attackObj = {
                id: "attackLog",
                h: 20,
                data: this.attackLogData,
                viewNum: 3,
                flag: false
            }
            this.makeSwiper(attackObj)
            // 告警日志轮播
            var alarmObj = {
                id: "alarmLog",
                h: 20,
                data: this.alarmLogLineData,
                viewNum: 3,
                flag: false
            }
            this.makeSwiper(alarmObj)
        },
        // 请求饼状图数据
        getPieData(obj,id,url) {
            this.$axios.post(url).then((res) => {
                console.log(res)
                if(res.data instanceof Array){
                    var name = []
                    var value = []
                    for(var i=0;i<res.data.length;i++){
                        name.unshift(res.data[i].item)
                        value.unshift(res.data[i].count)
                    }
                    obj.data.name = name
                    obj.data.value = value
                }
                this.drawPie(obj,id)
            }).catch((err) => {
                console.log(err)
            })
        },
        // 定时获取饼图数据
        getPieDatas () {
            this.timers.timer2 = setInterval(() => {
                this.drawLine (this.realTimeFlowObj,"realTimeFlowLine")
                this.getPieData(this.VirusesObj,"VirusesPie",this.urls.VirusesUrl)
                this.getPieData(this.IntrusionObj,"IntrusionPie",this.urls.IntrusionUrl)
                this.getPieData(this.protocolTypeObj,"protocolTypePie",this.urls.protocolTypeUrl)

            },1000*5*60)
        },
        // 获取所有数据请求接口
        getUrl(){
            var BASE_URL = g.NEW_URL
            this.urls = {
                VirusesUrl: BASE_URL + "/query_esdata?index=ids_av&key=VirusName&topn=7",
                IntrusionUrl: BASE_URL + "/query_esdata?index=ids_ips&key=EventType",
                protocolTypeUrl: BASE_URL + "/query_ids?index=app&key=AppName&topn=10",
                cityDataUrl: BASE_URL + "/query_ips_geo?&timerange=now-3s,now"
            }
        }
    },
    components: {
        FailedLoad,
        NavBar,
        AttackMap
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* 公共样式 */
    /* 列表符号清除 */
    li{
        list-style: none;
    }
    /* h5文本样式 */
    .homePage h5{
        line-height:36px;
        font-size:14px;
        color: rgb(4, 155, 203);
        font-weight: normal;
    }
    /* h3文本样式 */
    .homePage h3{
        line-height:26px;
        color:#fff;
        font-size: 16px;
        font-weight: normal;
    }

    .homePage{
        width:100%;
        height:100%;
        position:relative;
        background:rgb(0, 17, 33);
    }

    #map{
        width:100%;
        height:100%;
        position: absolute;
    }

    .homePage .main{
        width: 100%;
        height: 100%;
        position:absolute;
        box-sizing: border-box;
        padding-top:3%;
    }
    /* 左边部分 */
    .homePage .main .left{
        width: 17%;
        height: 100%;
        float:left;
    }
    .homePage .main .left .logo{
        width: 90%;
        height: 16%;
    }
    .homePage .main .left .logo>img{
        width: 85.5%;
        height: 137%;
        margin: -5% 0 0 24%;
    }
    .homePage .main .left .pieBox{
        width:100%;
        height:84%;
        overflow:hidden;
    }
    .homePage .main .left .pieBox .tip{
        position: absolute;
        background: rgba(0,0,0,0.5);
        border-radius: 5px;
        max-width: 400px;
        padding: 5px;
        z-index: 1;
        color: #fff;
        display:none;
        font-size:12px;
    }
    .homePage .main .left .pieBox>.pie{
        width:100%;
        height:25%;
        color:#fff;
        text-align:center;
    }

    /* 中间部分 */
    .homePage .main .center{
        width:57%;
        height:100%;
        float:left;
    }
    .homePage .main .center .overview{
        width: 80%;
        height: 10%;
        margin: 4.5% auto 1.5%;
        overflow: hidden;
    }
    .homePage .main .center .overview .overviewData{
        width:100%;
        height: 100%;
        overflow:hidden;
    }
    .homePage .main .center .overview .overviewData .safetyScore{
        width:30%;
        height: 100%;
        float: left;
        text-align: center;
        box-sizing: border-box;
    }
    .homePage .main .center .overview .overviewData .safetyScore>span{
        display:inline-block;
        width: 35%;
        height: 40%;
        line-height:28px;
        text-align:center;
        font-size:24px;
        color:#fbffff;
    }
    .homePage .main .center .overview .overviewData .flow{
        width:39%;
        height:100%;
        float:left;
        padding-top: 2%;
        box-sizing:border-box;
    }
    .homePage .main .center .overview .overviewData .flow>h5{
        line-height:23px;
        text-align:center;
    }
    .homePage .main .center .overview .overviewData .flow>h5>span{
        color:#fff;
        margin-left:6%;
    }
    .homePage .main .center .overview .overviewData .todayEvents{
        width:30%;
        height:100%;
        float:left;
        box-sizing: border-box;
        text-align: center;
    }
    .homePage .main .center .overview .overviewData .todayEvents>span{
        display:inline-block;
        width:57%;
        height: 40%;
        line-height:28px;
        text-align:center;
        font-size:24px;
        color:#fbffff;
    }
    .homePage .main .center .overview .overviewData .line{
        width:2px;
        height:100%;
        float:left;
        background: -webkit-linear-gradient(rgba(0, 7, 35,1), #fff, rgba(0, 7, 35,1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(rgba(0, 7, 35,1), #fff, rgba(0, 7, 35,1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(rgba(0, 7, 35,1), #fff, rgba(0, 7, 35,1)); /* Firefox 3.6 - 15 */
        background: linear-gradient(rgba(0, 7, 35,1), #fff, rgba(0, 7, 35,1)); /* 标准的语法 */;
    }
    .homePage .main .center .map{
        width:100%;
        height: 60.5%;
        overflow:hidden;
    }
    /* 地图按钮样式 */
    .homePage .main .center .map .mapBtn{
        width: 93px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: #fff;
        border-radius: 5px;
        background: rgb(8, 23, 41);
        margin: 0px auto;
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        font-size: 15px;
        display:none;
    }
    .homePage .main .center .map:hover .mapBtn{
        display:block;
    }
    .homePage .main .center .flowSituation{
        width:100%;
        height: 21.5%;
    }

    .homePage .main .center .flowSituation .realTimeFlow{
        width: 34%;
        height: 100%;
        float:left;
    }
    .homePage .main .center .flowSituation .protocolType{
        width:32%;
        height:100%;
        float:left;
    }
    .homePage .main .center .flowSituation .top5{
        width:34%;
        height:100%;
        float:left;
    }

    /* 右侧日志 */
    .homePage .main .right{
        width:26%;
        height:100%;
        float:left;
    }
    .homePage .main .right .journal{
        width: 100%;
        height: 40%;
    }
    .homePage .main .right .journal .legends{
          width: 23%;
        height: 50%;
        box-sizing: border-box;
        padding-top: 4%;
        float: left;
    }
    .homePage .main .right .journal .legends>li{
        width:100%;
        height:18%;
        text-align:center;
        font-size:12px;
        color:#999;
    }
    .homePage .main .right .journal .legends>li span{
        display:inline-block;
        width: 17%;
        height: 64%;
        margin-right: 5%;
        margin-top: 4%;
    }
    .homePage .main .right .journal .legends>li:nth-child(2) span{
        background:#bf2b27;
    }
    .homePage .main .right .journal .legends>li:nth-child(3) span{
        background:#fbac47;
    }
    .homePage .main .right .journal .legends>li:nth-child(4) span{
        background:#fdfe00;
    }
    .homePage .main .right .journal .legends>li:nth-child(5) span{
        background:#29a7e4;
    }
    .homePage .main .right .journal .attackSource{
        width: 77%;
        height: 50%;
        box-sizing: border-box;
        padding-top:4%;
        float:left;
    }
    .homePage .main .right .journal .attackSource .attackAtatistics{
        box-sizing:border-box;
        padding-left:4px;
        width:94%;
        height: 16%;
    }
    .homePage .main .right .journal .attackSource .attackSourceBox{
        width:94%;
        height: 54%;
        box-sizing:border-box;
        border-left:4px solid rgba(200, 200, 200, 0.5);
        position: relative;
        overflow:hidden;
    }
    .homePage .main .right .journal .attackSource .attackSourceBox #attackSource{
        width:100%;
        position: absolute;
        left:0;
        top:0;
    }
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsLeft,
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsRight,
    .homePage .main .right .journal .attackSource .attackSourceBox #attackSource li{
        width:50%;
        height:20px;
        float:left;
        line-height:20px;
        font-size:10px;
        color:#999;
    }
    .homePage .main .right .journal .attackSource .attackAtatistics span,
    .homePage .main .right .journal .attackSource .attackSourceBox #attackSource li span{
        display:inline-block;
        text-align:center;
    }
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsLeft span:nth-child(1),
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsRight span:nth-child(1),
    .homePage .main .right .journal .attackSource .attackSourceBox #attackSource li span:nth-child(1){
        width:40%;
    }
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsLeft span:nth-child(2),
    .homePage .main .right .journal .attackSource .attackAtatistics .atatisticsRight span:nth-child(2),
    .homePage .main .right .journal .attackSource .attackSourceBox #attackSource li span:nth-child(2){
      width:56%;
    }
    .homePage .main .right .journal .attackLog{
        width: 120%;
        height: 50%;
        clear:both;
        padding: 3% 0 2% 0%;
        box-sizing:border-box;
        margin-left:-20%;
    }
    .homePage .main .right .journal .attackLog .attackLogBox{
        width: 100%;
        height: 58%;
        position:relative;
        overflow:hidden;
    }
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog{
        width:100%;
        position:absolute;
        top:0;
        left:0;
    }
    .homePage .main .right .journal .attackLog .attackDetail{
        width: 100%;
        height: 17%;
        line-height: 20px;
        font-size: 11px;
        color: #999;
        text-align: center;
        box-sizing: border-box;
    }
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li{
        width:100%;
        height: 20px;
        line-height: 20px;
        font-size:11px;
        color:#999;
        text-align:center;
        box-sizing: border-box;
        overflow:hidden;
    }
    .homePage .main .right .journal .attackLog .attackDetail span,
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span{
        display:block;
        height:100%;
        text-align:center;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float:left;
    }
    .homePage .main .right .journal .attackLog .attackDetail span:nth-child(1),
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span:nth-child(1){
        width: 30%;
    }
    .homePage .main .right .journal .attackLog .attackDetail span:nth-child(2),
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span:nth-child(2){
        width: 15%;
    }
    .homePage .main .right .journal .attackLog .attackDetail span:nth-child(3),
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span:nth-child(3){
        width: 23%;
    }
    .homePage .main .right .journal .attackLog .attackDetail span:nth-child(4),
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span:nth-child(4){
        width: 15%;
    }
    .homePage .main .right .journal .attackLog .attackDetail span:nth-child(5),
    .homePage .main .right .journal .attackLog .attackLogBox #attackLog li span:nth-child(5){
        width: 17%
    }
    .homePage .main .right .assetPosture{
        width: 100%;
        height: 60%;
        overflow: hidden;
    }
    .homePage .main .right .assetPosture .vulnerabilities{
        width: 96%;
        height: 36%;
    }
    .homePage .main .right .assetPosture .assetAlarm{
        width:96%;
        height: 36%;
    }
    .homePage .main .right .assetPosture .alarmLog{
        width:96%;
        height: 28%;
        padding: 0 2%;
        box-sizing: border-box;
    }
    .homePage .main .right .assetPosture .alarmLog .logType{
        height:20%;
        box-sizing: border-box;
        padding-left:3%;
    }
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox{
        width: 100%;
        height: 59%;
        overflow:hidden;
        position:relative;
    }
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog{
        width:100%;
        position:absolute;
        left:0;
        top:0;
    }
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li{
        height:20px;
        box-sizing:border-box;
        padding-left:3%;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span,
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span{
        display:inline-block;
        line-height:20px;
        text-align:center;
        font-size:11px;
        color:#999;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span:nth-child(1),
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span:nth-child(1){
        width: 13%;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span:nth-child(2),
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span:nth-child(2){
        width: 38%;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span:nth-child(3),
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span:nth-child(3){
        width: 13%;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span:nth-child(4),
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span:nth-child(4){
        width: 14%;
    }
    .homePage .main .right .assetPosture .alarmLog .logType span:nth-child(5),
    .homePage .main .right .assetPosture .alarmLog .alarmLogBox #alarmLog li span:nth-child(5){
        width: 14%;
    }

    /* 底部边框 */
    .homePage .foot{
        width:100%;
        height:2%;
        /* background:#021d35; */
        background: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    /* 选中字体样式 */
    .homePage .active{
        color: #bf2b27;
        font-size:18px;
    }
</style>
