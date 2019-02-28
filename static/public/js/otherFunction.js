
module.exports = {
    // 制作轮播图
    swiper: function(obj,num,h){
        var t = 0
        var timer = setInterval(autoPlay,2500)
        obj.onmouseenter = function(){
            clearInterval(timer)
        }
        obj.onmouseleave = function(){
            timer = setInterval(autoPlay,2500)
        }
        function autoPlay(){
            if(t>=num){
                t=0
                obj.style.top = "0px"
                obj.style.transition = "0s"
            }else {
                t++
                obj.style.transition = "2s"
                obj.style.top = -t*h + 'px'
            }
        }
    },
    // 转化时间格式
    getTime: function(time,type,flag){
        if(flag){
            var now = new Date(time)
        }else{
            var now = time
        }
        var year = now.getFullYear()
        var month = now.getMonth() < 10 ? "0" + parseInt(now.getMonth()*1 + 1)  : parseInt(now.getMonth()*1 + 1) 
        var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
        var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
        var minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
        var second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
        if(type == 'y'){// 年-月-日-时-分-秒
            return year + "-" + month + "-" +day + " " + hour + ":" + minute + ":" + second
        } else if (type == 's'){ // 时-分-秒
            return hour + ":" + minute + ":" + second
        } else if (type == 'h'){ // 时-分
            return hour + ":" + minute
        } else if(type == 'd'){ // 年-月-日
            return year + "-" + month + "-" +day
        } else if(type == 'm'){
            return year + "-" + month + "-" +day + " " + hour + ":" + minute
        }
    },
    // 从大到小排序，找出指定的数据，返回的为一个数组
    arrRank: function(arr,start){
        // 其他项数值总和
        var addOthers = 0
        // 接受到的新数据
        var newObj = {
            newArr: [],
            indexArr: []
        }
        arr.map((item, index) => {
            newObj.newArr.push(item)
        })
        // 要返回的对象
        var needObj= {
            needArr: [],
            indexArr: []
        }
        // 记录下标
        for(var i=0;i<newObj.newArr.length;i++){
            newObj.indexArr.push(i)
        }
        for(var i=0;i<newObj.newArr.length;i++){
            for(var j=i+1;j<newObj.newArr.length;j++){
                if(newObj.newArr[i] < newObj.newArr[j]){
                    var dataItem = newObj.newArr[j]
                    newObj.newArr[j] = newObj.newArr[i]
                    newObj.newArr[i] = dataItem

                    var indexItem = newObj.indexArr[j]
                    newObj.indexArr[j] = newObj.indexArr[i]
                    newObj.indexArr[i] = indexItem
                }
                
            }
        }
        // 将从第start位开始的数依次相加
        for(var i=start;i<newObj.newArr.length;i++){
            // if(addOthers < newObj.newArr[start-1]){
                addOthers = addOthers*1 + newObj.newArr[i]*1
            // } 
        }
        // 将数据push到需要的数组中并返回
        for(var i=0;i<start;i++){
            needObj.needArr.push(newObj.newArr[i])
            needObj.indexArr.push(newObj.indexArr[i])
        }
        if(start < arr.length){
            needObj.needArr.push(addOthers)
            needObj.indexArr.push("其他")
        }
        
        return needObj
    },
    // 选择查看的时间
    getLimitTime: function(value){
        switch(value){
            case '30天': {
                var now = new Date()
                var nowStr = this.getTime(now, 'y', false) // 现在时间
                var start = new Date(now.getTime() - 1000*60*60*24*30)
                var startStr = this.getTime(start, 'y', false)
                var timeArr = [startStr, nowStr]
                return timeArr
            };break;
            case '24小时': {
                var now = new Date()
                var nowStr = this.getTime(now, 'y', false) // 现在时间
                var start = new Date(now.getTime() - 1000*60*60*24)
                var startStr = this.getTime(start, 'y', false)
                var timeArr = [startStr, nowStr]
                return timeArr
            };break;
            case '7天': {
                var now = new Date()
                var nowStr = this.getTime(now, 'y', false) // 现在时间
                var start = new Date(now.getTime() - 1000*60*60*24*7)
                var startStr = this.getTime(start, 'y', false)
                var timeArr = [startStr, nowStr]
                return timeArr
            };break;
            case '自定义': {
                return '自定义'
            };break;
        }
    },
    // 根据对应位数添加相应单位
    addUnit: function(num, unitObj, type){
        if(type == "flow"){
            if(num / Math.pow(1024, 6) >= 1 && unitObj.six){
                return (num / Math.pow(1024, 6)).toFixed(2) + unitObj.six
            }else if(num / Math.pow(1024, 5) >= 1 && unitObj.five){
                return (num / Math.pow(1024, 5)).toFixed(2) + unitObj.five
            }else if(num / Math.pow(1024, 4) >= 1 && unitObj.four){
                return (num / Math.pow(1024, 4)).toFixed(2) + unitObj.four
            }else if(num / Math.pow(1024, 3) >= 1 && unitObj.three){
                return (num / Math.pow(1024, 3)).toFixed(2) + unitObj.three
            }else if(num / Math.pow(1024, 2) >= 1 && unitObj.two){
                return (num / Math.pow(1024, 2)).toFixed(2) + unitObj.two
            }else if(num / Math.pow(1024, 1) >= 1 && unitObj.one){
                return (num / Math.pow(1024, 1)).toFixed(2) + unitObj.one
            }else{
                return num + "bps"
            }
        }
        if(type == "link"){
            if(num / Math.pow(10, 12) >= 1 && unitObj.three){
                return (num / Math.pow(10, 12)).toFixed(2) + unitObj.three
            }else if(num / Math.pow(10, 8) >= 1 && unitObj.two){
                return (num / Math.pow(10, 8)).toFixed(2) + unitObj.two
            }else if(num / Math.pow(10, 4) >= 1 && unitObj.one){
                return (num / Math.pow(10, 4)).toFixed(2) + unitObj.one
            }else{
                return num
            }
        }
    }
}