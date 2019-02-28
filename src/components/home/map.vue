<template>
    <div id="map"></div>
</template>

<script>
export default {
    data(){
        return{
            // 全局变量定义
            WINDOW_WIDTH: 0,
            WINDOW_HEIGHT: 0,
            context: null,
            lines: [],
            flag: false,
            n: 0,
            // 地图样式配置
            styleJson: [
                {
                    "featureType": "background",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#000000ff"
                    }
                }, 
                {
                    "featureType": "land",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#ffffff1a"
                    }
                }, 
                {
                    "featureType": "green",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "building",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "manmade",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "manmade",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "subwaystation",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "education",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "education",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "medical",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "medical",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "entertainment",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "estate",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "shopping",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "transportation",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "transportation",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "poilabel",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "poilabel",
                    "elementType": "labels.icon",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "districtlabel",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, 
                {
                    "featureType": "districtlabel",
                    "elementType": "labels.icon",
                    "stylers": {
                        "visibility": "off"
                    }
                }
            ],
            map: null,
            // 模拟数据
            cityData: [
                {
                    from: {
                        city: 'ddd',
                        lnglat: [42.03956, 16.063677]
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
            colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5']
        }
    },
    mounted(){
        this.getAttackMap()
    },
    methods:{
        getAttackMap(){
            // 获取屏幕尺寸
            this.WINDOW_WIDTH=document.documentElement.clientWidth;
            this.WINDOW_HEIGHT=document.documentElement.clientHeight;

            // 设置canvas样式
            var canvas = document.createElement("canvas")
            canvas.style.cssText = "position:absolute;left:0;top:0;z-index:1;"
            canvas.width = this.WINDOW_WIDTH;
            canvas.height = this.WINDOW_HEIGHT;
            this.context=canvas.getContext("2d")

            var myMap=document.getElementById("map")
            myMap.style.width = this.WINDOW_WIDTH + "px"
            myMap.style.height = this.WINDOW_HEIGHT + "px"

            this.map = new BMap.Map('map', {
                // 最小缩放比例
                minZoom: 1
            });
            // 当前视角和缩放比例
            this.map.centerAndZoom(new BMap.Point(42.03956, 16.063677), 1)
            // 时候通过鼠标滚轮实现放大缩小
            this.map.enableScrollWheelZoom(true)
            // 地图样式
            this.map.setMapStyle({
                styleJson: this.styleJson
            });
            this.map.getPanes()["labelPane"].appendChild(canvas)

            var _this = this
            setInterval(function(){
                _this.render();
                // 每过一秒请求一次数据
                if(_this.n % 500 == 0){
                    _this.flag = true
                }else{
                    _this.flag = false
                }
                _this.n++
                _this.update();
            },2);
        },
        // 绘制所有攻击城市与攻击线 
        render(){
            this.context.clearRect(0,0,this.WINDOW_WIDTH,this.WINDOW_HEIGHT);
            for(var i=0;i<this.lines.length;i++){
                if(this.lines[i].isEnd == 0){
                    this.lines[i].draw(this.context);
                }
            }
        },
        // 每次绘制时判断线条的运动状态，并且判断是否请求数据
        update() {
            if(this.flag){
                this.createLineTest();
            }
            for(var i = 0;i<this.lines.length;i++){
                if(this.lines[i].isEnd == 1){
                    this.lines.splice(i,1);
                }
            }
            
        },
        // 产生模拟数据
        createLineTest(){
            var map = this.map
            // 请求数据，并添加进数组
            this.$axios.post("https://nsa.sugon.com/query_ips_geo?&timerange=now-3s,now")
                       .then((res) => {
                            // console.log(res)
                            for(var i=0;i<2;i++){
                                var cityLine = this.cityData[this.random(0, 6)]
                                // 将经纬度转化为坐标
                                var pointList = [map.pointToPixel(new BMap.Point(cityLine.from.lnglat[0], cityLine.from.lnglat[1])), 
                                                map.pointToPixel(new BMap.Point(cityLine.to.lnglat[0], cityLine.to.lnglat[1]))];
                                    
                                this.lines.push(this.createLine(
                                                        pointList[0].x,
                                                        pointList[0].y,
                                                        pointList[1].x,  
                                                        pointList[1].y,
                                                        2,
                                                        this.colors[Math.ceil(Math.random()*100)%6],
                                                        function(){
                                                            // console.log("我被画完了");
                                                        }
                                                    )
                                )
                            }
                            
                       }).catch((err) => {
                           console.log(err)
                       })
        },
        // 绘制线条
        createLine(startX,startY,endX,endY,time,color,onFinish){
            var stepX = (endX - startX)/time/200;
            var stepY = (endY - startY)/time/200;
            var line = {
                    startX:startX,
                    startY:startY,
                    endX:endX,
                    endY:endY,
                    color:color,
                    lastX:startX,
                    lastY:startY,
                    stepX:stepX,
                    stepY:stepY,
                    time:time,

                    onFinish:function(){
                        onFinish(this);
                    }, // 回调函数

                    drawCount:0, // 被绘制次数
                    isEnd:0,
                    
                    draw:function(ctx) {
                        var tempX = this.startX+(this.drawCount+1)*stepX;
                        var tempY = this.startY+(this.drawCount+1)*stepY;
                        if((tempX-endX)*(startX-endX) < 0 ){
                            tempX = endX;
                        }
                        if((tempY - endY)*(startY-endY) < 0){
                            tempY = endY;
                        }
                        if(tempX == endX && tempY == endY){
                            this.onFinish();
                            this.isEnd = 1;
                        }else if(this.isEnd == 0){
                            
                            ctx.save();

                            var linear = ctx.createLinearGradient( this.startX, this.startY, tempX, tempY );
                            linear.addColorStop( 0, '#00000000' );
                            linear.addColorStop( 1, this.color|| "#000" )
                            ctx.strokeStyle=linear;
                            ctx.lineWidth=2;
                            ctx.beginPath();
                            ctx.moveTo(this.startX, this.startY);
                            ctx.lineTo(tempX, tempY);
                            ctx.closePath();
                            ctx.stroke();

                            var radius = 2;
                            if(this.drawCount % 6 == 0 ){
                                radius = Math.ceil(Math.random()*6) 
                            }
                            ctx.restore();
                            ctx.lineWidth=1;
                            ctx.strokeStyle=this.color|| "#000";
                            ctx.beginPath();
                            ctx.arc(this.startX,this.startY,radius,0,2*Math.PI,true);
                            ctx.closePath();
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.arc(this.endX,this.endY,radius,0,2*Math.PI,true);
                            ctx.closePath();
                            ctx.stroke();

                            this.drawCount++;
                            this.lastX = tempX;
                            this.lastY = tempY;
                        }
                    }
                
            }
            return line;
        },
        
        // 获得随机数
        random(min, max){
            return parseInt(Math.random()*(max-min)+min)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

