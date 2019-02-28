method(this, animate)

function method(global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory()
    }else if(typeof define === 'function' && define.amd){
        define(factory)
    }else{
        (global.MoveLine = factory())
    }
}

function animate(){ 
    'use strict';

    // 绘制canvas画布
    function CanvasLayer(options) {
        this.options = options || {};
        this.paneName = this.options.paneName || 'labelPane';
        this.zIndex = this.options.zIndex || 0;
        this._map = options.map;
        this.show();
    }

    // 添加覆盖物
    CanvasLayer.prototype = new BMap.Overlay();

    CanvasLayer.prototype.initialize = function (map) {
        this._map = map;
        // 创建一个canvas覆盖物
        var canvas = this.canvas = document.createElement('canvas');
        var ctx = this.ctx = this.canvas.getContext('2d');
        canvas.style.cssText = 'position:absolute;left:0;top:0;z-index:' + this.zIndex + ';'
        this.adjustSize();
        this.adjustRatio(ctx);
        // 返回地图覆盖物容器列表
        map.getPanes()[this.paneName].appendChild(canvas);
        var that = this;
        // 监听容器大小
        map.addEventListener('resize', function () {
            that.adjustSize();
            that._draw();
        });
        // console.log(map.getPanes()[this.paneName].children.length)
        return this.canvas;
    };

    // 调整覆盖物大小的方法
    CanvasLayer.prototype.adjustSize = function () {
        var size = this._map.getSize();
        var canvas = this.canvas;
        canvas.width = size.width;
        canvas.height = size.height;
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
    };

    // 调整覆盖物缩放比例
    CanvasLayer.prototype.adjustRatio = function (ctx) {
        // devicePixelRatio决定了浏览器在渲染canvas之前会用几个像素来来存储画布信息
        var backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
        var pixelRatio = (window.devicePixelRatio || 1) / backingStore;

        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;

        ctx.canvas.width = canvasWidth * pixelRatio;
        ctx.canvas.height = canvasHeight * pixelRatio;

        ctx.canvas.style.width = canvasWidth + 'px';
        ctx.canvas.style.height = canvasHeight + 'px';

        // 标注画布的用户坐标系统
        ctx.scale(pixelRatio, pixelRatio);
    };

    CanvasLayer.prototype.draw = function () {
        var self = this;

        // 控制动画出现时间
        clearTimeout(self.timeoutID);
        self.timeoutID = setTimeout(function () {
            self._draw();
        }, 0);
    };

    CanvasLayer.prototype._draw = function () {
        var map = this._map;
        var size = map.getSize();
        var center = map.getCenter();
        if (center) {
            var pixel = map.pointToOverlayPixel(center);
            this.canvas.style.left = pixel.x - size.width / 2 + 'px';
            this.canvas.style.top = pixel.y - size.height / 2 + 'px';
            
            this.options.update && this.options.update.call(this);
        }
    };

    CanvasLayer.prototype.show = function () {
        if (!this.canvas) {
            this._map.addOverlay(this);
        }
        this.canvas.style.display = 'block';
        // console.log(this._map.getPanes()[this.paneName])
    };
    CanvasLayer.prototype.hide = function () {
        // console.log("hide")
        // console.log(this._map.getPanes()[this.paneName])
        this._map.getPanes()[this.paneName].removeChild(this.canvas)
        this._map.removeOverlay(this);
    };

    // 运动轨迹
    var MoveLine = function MoveLine(map, userOptions) {
        var self = this;

        //默认参数
        var options = {
            //marker点半径
            markerRadius: 3,
            //marker点颜色,为空或null则默认取线条颜色
            markerColor: '#fff',
            //线条类型 solid、dashed、dotted
            lineType: 'solid',
            //线条宽度
            lineWidth: 1,
            //线条颜色
            colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
            //移动点半径
            moveRadius: 2,
            //移动点颜色
            fillColor: '#fff',
            //移动点阴影颜色
            shadowColor: '#fff',
            //移动点阴影大小
            shadowBlur: 5,
            data: {}
        };

        //全局变量
        var baseLayer = null,
            animationLayer = null,
            width = map.getSize().width,
            height = map.getSize().height,
            animationFlag = true,
            ifEnd = false,
            markLine = null

        //参数合并
        var merge = function merge(userOptions, options) {
            // Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组
            // 此处用传递过来的参数代替默认参数
            Object.keys(userOptions).forEach(function (key) {
                options[key] = userOptions[key];
            });
        };

        // 城市点
        function Marker(opts) {
            this.city = opts.city;
            this.location = opts.location;
            this.color = opts.color;
        }

        // 绘制城市点功能
        Marker.prototype.draw = function (context) {
            var pixel = this.pixel = map.pointToPixel(this.location);

            context.save();
            context.beginPath();
            context.fillStyle = options.markerColor || this.color;
            context.arc(pixel.x, pixel.y, options.markerRadius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = '12px Microsoft YaHei';
            context.fillStyle = this.color;
            context.fillText(this.city, pixel.x, pixel.y - 10);
            context.restore();
        };

        // 城市间连线
        function MarkLine(opts) {
            this.from = opts.from;
            this.to = opts.to;
            this.step = 0;
        }

        // 获取圆点运动路线
        MarkLine.prototype.getPointList = function (from, to) {
            var points = [[from.x, from.y], [to.x, to.y]];
            
            var ex = points[1][0];
            var ey = points[1][1];
            points[3] = [ex, ey];
            points[1] = this.getOffsetPoint(points[0], points[3]);
            points[2] = this.getOffsetPoint(points[3], points[0]);
            points = this.smoothSpline(points, false);
            //修正最后一点在插值产生的偏移
            points[points.length - 1] = [ex, ey];
            return points;
        };

        MarkLine.prototype.getOffsetPoint = function (start, end) {
            var distance = this.getDistance(start, end) / 3; //除以3？
            var angle, dX, dY;
            var mp = [start[0], start[1]];
            var deltaAngle = 0; //偏移弧度
            if (start[0] != end[0] && start[1] != end[1]) {
                //斜率存在
                var k = (end[1] - start[1]) / (end[0] - start[0]);
                angle = Math.atan(k);
            } else if (start[0] == end[0]) {
                //垂直线
                angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
            } else {
                //水平线
                angle = 0;
            }
            if (start[0] <= end[0]) {
                angle -= deltaAngle;
                dX = Math.round(Math.cos(angle) * distance);
                dY = Math.round(Math.sin(angle) * distance);
                mp[0] += dX;
                mp[1] += dY;
            } else {
                angle += deltaAngle;
                dX = Math.round(Math.cos(angle) * distance);
                dY = Math.round(Math.sin(angle) * distance);
                mp[0] -= dX;
                mp[1] -= dY;
            }
            return mp;
        };

        MarkLine.prototype.smoothSpline = function (points, isLoop) {
            var len = points.length;
            var ret = [];
            var distance = 0;
            for (var i = 1; i < len; i++) {
                distance += this.getDistance(points[i - 1], points[i]);
            }
            var segs = distance / 2;
            segs = segs < len ? len : segs;
            for (var i = 0; i < segs; i++) {
                var pos = i / (segs - 1) * (isLoop ? len : len - 1);
                var idx = Math.floor(pos);
                var w = pos - idx;
                var p0;
                var p1 = points[idx % len];
                var p2;
                var p3;
                if (!isLoop) {
                    p0 = points[idx === 0 ? idx : idx - 1];
                    p2 = points[idx > len - 2 ? len - 1 : idx + 1];
                    p3 = points[idx > len - 3 ? len - 1 : idx + 2];
                } else {
                    p0 = points[(idx - 1 + len) % len];
                    p2 = points[(idx + 1) % len];
                    p3 = points[(idx + 2) % len];
                }
                var w2 = w * w;
                var w3 = w * w2;

                ret.push([this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
            }
            return ret;
        };

        MarkLine.prototype.interpolate = function (p0, p1, p2, p3, t, t2, t3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
        };

        MarkLine.prototype.getDistance = function (p1, p2) {
            return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
        };

        // 绘制城市点
        MarkLine.prototype.drawMarker = function (context) {
            // 绘制攻击城市坐标点
            this.from.draw(context);
            // 绘制被攻击城市坐标点
            this.to.draw(context);
        };

        // 绘制移动点
        MarkLine.prototype.drawMoveCircle = function (context) {
            var pointList = this.getPointList(map.pointToPixel(this.from.location), map.pointToPixel(this.to.location));

            context.save();
            context.fillStyle = options.colors;
            context.shadowColor = options.shadowColor;
            context.shadowBlur = options.shadowBlur;
            context.beginPath();
            context.arc(pointList[this.step][0], pointList[this.step][1], options.moveRadius, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
            context.restore();

            this.step += 3;
            if (this.step >= pointList.length) {
                ifEnd = true
            }
        };

        //底层canvas渲染，标注，线条
        var brush = function brush() {
            if(!ifEnd){
                var baseCtx = baseLayer.canvas.getContext('2d');
                if (!baseCtx) {
                    return;
                }

                addMarkLine();

                baseCtx.clearRect(0, 0, width, height);

                markLine.drawMarker(baseCtx)
            }
        };

        //上层canvas渲染，动画效果
        var render = function render() {
            if(!ifEnd){
                var animationCtx = animationLayer.canvas.getContext('2d');

                if (!animationCtx) {
                    return;
                }

                animationCtx.fillStyle = 'rgba(0,0,0,.93)';
                var prev = animationCtx.globalCompositeOperation;
                // destination-in：源于目标重叠的区域保留目标，而不重叠的部分都变成透明的
                // globalCompositeOperation即Canvas中的合成操作
                animationCtx.globalCompositeOperation = 'destination-in';
                animationCtx.fillRect(0, 0, width, height);
                animationCtx.globalCompositeOperation = prev;

                if(markLine){
                    markLine.drawMoveCircle(animationCtx)
                }
            }
        };

        //鼠标事件
        var mouseInteract = function mouseInteract() {
            map.addEventListener('movestart', function () {
                animationFlag = false;
            });

            map.addEventListener('moveend', function () {
                if(!ifEnd){
                    animationFlag = true;
                }
            });

            map.addEventListener('zoomstart', function () {
                animationFlag = false;
            });

            map.addEventListener('zoomend', function () {
                if(!ifEnd){
                    animationFlag = true;
                }
            });
        };

        var addMarkLine = function addMarkLine() {
            markLine = new MarkLine({
                from: new Marker({
                    city: options.data.from.city,
                    location: new BMap.Point(options.data.from.lnglat[0], options.data.from.lnglat[1]),
                    color: options.colors
                }),
                to: new Marker({
                    city: options.data.to.city,
                    location: new BMap.Point(options.data.to.lnglat[0], options.data.to.lnglat[1]),
                    color: options.colors
                })
            })
        };

        //初始化
        var init = function init(map, options) {
            merge(userOptions, options);

            baseLayer = new CanvasLayer({
                map: map,
                update: brush
            });

            animationLayer = new CanvasLayer({
                map: map,
                update: render
            });

            mouseInteract();

            (function drawFrame() {
                if(ifEnd){
                    animationFlag = false
                    if (!animationFlag) {
                        animationLayer.hide()
                        var animationCtx = animationLayer.canvas.getContext('2d');
                        animationCtx.clearRect(0, 0, width, height);
                    }
                    setTimeout(function(){
                        var baseCtx = baseLayer.canvas.getContext('2d');
                        baseCtx.clearRect(0, 0, width, height);
                        baseLayer.hide()
                    },500)
                    // console.log(map.getPanes()["labelPane"].children.length)
                    // console.log(map.getPanes()["labelPane"])
                }else{
                    requestAnimationFrame(drawFrame);
                    render();
                }
            })();
        };

        init(map, options);

        self.options = options;
    };

    return MoveLine;

};
