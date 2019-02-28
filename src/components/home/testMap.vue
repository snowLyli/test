<template>
    <div id="map"></div>
</template>
<script>
// import '../../../static/home/js/api.js'
import MoveLine from '../../../static/home/js/test.js'
export default {
    data(){
        return{
            // 定时器
            timer: null,
            // 地图样式配置
            styleJson: [
                {
                    "featureType": "label",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "boundary",
                    "elementType": "all",
                    "stylers": {
                        "color": "#465a6b"
                    }
                }, 
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#031528"
                    }
                }, 
                {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                        "color": "#000002"
                    }
                }
            ],
            // 模拟数据
            cityData: [
                {
                    from: {
                        city: '广州',
                        lnglat: [113.270793, 23.135308]
                    },
                    to: {
                        city: '衡山',
                        lnglat: [112.612787, 27.317599]
                    }
                }, 
                {
                    from: {
                        city: '三亚',
                        lnglat: [109.518646, 18.258217]
                    },
                    to: {
                        city: '北京',
                        lnglat: [116.413554, 39.911013]
                    }
                }, 
                {
                    from: {
                        city: '广州',
                        lnglat: [113.270793, 23.135308]
                    },
                    to: {
                        city: '三亚',
                        lnglat: [109.518646, 18.258217]
                    }
                }, 
                {
                    from: {
                        city: '广州',
                        lnglat: [113.270793, 23.135308]
                    },
                    to: {
                        city: '上海',
                        lnglat: [121.480237, 31.236305]
                    }
                }, 
                {
                    from: {
                        city: '广州',
                        lnglat: [113.270793, 23.135308]
                    },
                    to: {
                        city: '韶关',
                        lnglat: [113.603757, 24.816174]
                    }
                }
            ],
            lineColor: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
            // 所需传递的参数
            options: {
                //marker点半径
                markerRadius: 2,

                //marker点颜色,为空或null则默认取线条颜色
                markerColor: null,

                //线条类型 solid、dashed、dotted
                lineType: 'solid',
                //线条宽度

                lineWidth: 1,
                //线条颜色
                // colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
                colors: '#F9815C',

                //移动点半径
                moveRadius: 2,

                //移动点颜色
                fillColor: 'red',

                //移动点阴影颜色
                shadowColor: '#fff',

                //移动点阴影大小
                shadowBlur: 0,

                // 数据
                data: {
                    from: {
                        city: '广州',
                        lnglat: [113.270793, 23.135308]
                    },
                    to: {
                        city: '衡山',
                        lnglat: [112.612787, 27.317599]
                    }
                }
            },
            map: null,
            // 攻击城市名称
            cityData: {
                allCity: [],
                convertData: [],
                option: {},
                color: ["#bf2b27","#fbac47","#fdfe00","#29a7e4"],
                mapType: true
            },
        }
    },
    mounted(){
        // this.makeMap()
        // this.judge()
        // this.moveLine()
        // this.timer = setInterval(() => {
            this.getCityData()
        // }, 3000);
        // this.drawMap(this.cityData) 
    },
    methods: {
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        },
        // 制作地图
        makeMap(){
            this.map = new BMap.Map('map', {
            // 最小缩放比例
                minZoom: 2
            });
            // 当前视角和缩放比例
            this.map.centerAndZoom(new BMap.Point(112.03956, 26.063677), 2);
            // 时候通过鼠标滚轮实现放大缩小
            this.map.enableScrollWheelZoom(true);
            // 地图样式
            this.map.setMapStyle({
                styleJson: this.styleJson
            });
        },
        // 绘制攻击动画
        moveLine(colors, cities){
            this.options.colors = colors
            this.options.data = cities
            new MoveLine(this.map, this.options);
        },
        // 获取攻击数据
        getCityData(){
            this.$axios.post(g.NEW_URL + '/query_ips_geo?&timerange=now-3s,now')
                .then((res) => {
                    var city = res.data
                    console.log(city)
                    if(city != 'Term not found'){
                        city.map((item, index) => {
                            if(item.SrcIP_Geo.City_name != 'undefine' && item.DstIP_Geo.City_name != 'undefine' && index <2){
                                var cities = {
                                    from: {
                                        city: item.SrcIP_Geo.City_name,
                                        lnglat: [item.SrcIP_Geo.Longitude, item.SrcIP_Geo.Latitude]
                                    },
                                    to: {
                                        city: item.DstIP_Geo.City_name,
                                        lnglat: [item.DstIP_Geo.Longitude, item.DstIP_Geo.Latitude]
                                    }
                                }
                                this.moveLine(this.lineColor[this.random(0,6)], cities)
                            }
                        })
                    }
                    
                }).catch((err) => {
                    console.log(err)
                })
        },
        // 判断是否启用定时器
        judge(){
            var canvas = document.getElementsByName("canvas")
            console.log(canvas.length)
        },
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
                },
                series: [
                    // 控制攻击方向
                    {
                        type: "lines",
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 2,
                            trailLength: 0.2,
                            symbol: "rect",
                            symbolSize: 5,
                            loop: false
                        },
                        lineStyle: {
                            width: 0,
                            curveness: 0
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
                        symbolSize: 3,
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
            var timer1 = setInterval(() => {
                obj.allCity = []
                _this.$axios.post(g.NEW_URL + "/query_ips_geo?&timerange=now-3s,now").then((res) => {
                    var nowData = []
                    // 将符合时间段的数据提取出来
                    for(var i=0;i<res.data.length;i++){
                        if(i<2){
                            nowData.push(res.data[i])
                        }
                    }
                    // 地图信息
                    if(nowData.length){
                        for(var i=0;i<nowData.length;i++){
                            // 攻击城市路径
                            var fromCity = nowData[i].SrcIP_Geo.City_name
                            var toCity = nowData[i].DstIP_Geo.City_name
                            var color = this.random(0,4)
                            obj.convertData.push({
                                fromName: fromCity,
                                toName: toCity,
                                coords: [
                                            [nowData[i].SrcIP_Geo.Longitude,nowData[i].SrcIP_Geo.Latitude], 
                                            [nowData[i].DstIP_Geo.Longitude,nowData[i].DstIP_Geo.Latitude]
                                        ],
                                label: true,
                                lineStyle: {
                                    color: obj.color[color]
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
                                data: obj.allCity
                            }
                        ]
                        Mychart.setOption(obj.option)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }, 1000);
            //用于使chart自适应高度和宽度
            window.onresize = function() {
              Mychart.resize()
            }
        }
    }
}
</script>
<style>
#map{
    width:100%;
    height:100%;
    background:#000;
}
</style>

