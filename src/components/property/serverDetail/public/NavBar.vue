<template>
    <div class="navPage">
        <div class="otherList">
            <router-link to="/manage">
                <img class="childImg"
                     src="/static/property/img/goBack.png" alt="">
                <span class="pathName">资产管理 > {{prevPageText}}</span>
            </router-link>
        </div>
        <ul class="lists" id="lists">
            <router-link v-for="(item, index) in navLists" :key="index" :to="item.path" tag="li"
                         :class="item.show ? 'selected' : ''">
                <li>
                    {{item.name}}
                </li>
            </router-link>
            
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            navLists: [
                {
                    show: true,
                    path: "/gv6overview",
                    name: "概览"
                },
                {
                    show: false,
                    path: "/gv6cpu",
                    name: "CPU"
                },
                {
                    show: false,
                    path: "/gv6memory",
                    name: "内存"
                },
                {
                    show: false,
                    path: "/gv6disk",
                    name: "磁盘"
                },
                {
                    show: false,
                    path: "/gv6network",
                    name: "网卡"
                },
                {
                    show: false,
                    path: "/gv6course",
                    name: "进程"
                }
            ]
        }
    },
    mounted(){
        this.getListHeight()
        this.showCurlist()
    },
    methods: {
        // 设置侧边导航栏高度自适应
        getListHeight(){
            var obj = document.getElementById("lists")
            obj.style.height = window.innerHeight + "px"
            console.log(window.innerHeight)
        },
        // 点击列表，显示对应页面
        showCurlist(){
            console.log(typeof this.curPageText)
            this.navLists.map((item, index) => {
                if(this.curPageText == item.name){
                    console.log(this.curPageText)
                    item.show = true
                }else{
                    item.show = false
                }
            })
            console.log(this.navLists)
        }
    },
    props: ["prevPageText", "curPageText"]
}
</script>
<style>
/* 组件样式 */
.navPage{
    width: 100%;
    height: 40px;
    background: #efefefd5;
    border-bottom: 1px solid #ccc;
    position: fixed;
    z-index: 99;
}
/* 头部信息样式 */
.navPage .otherList{
    height: 100%;
    margin-left: 10px;
    line-height: 40px;
    color: rgba(81,177,240);
    font-size: 18px;
}
/* 分页头部图片样式 */
.navPage .otherList .childImg{
    width: 33px;
    height: 30px;
    margin: 5px 0px;
    float: left;
}
/* 表示页面路径的样式 */
.navPage .otherList .pathName{
    font-size: 14px;
    color: #333;
    margin-left: 5px;
}
/* 侧边导航栏样式 */
.navPage .lists{
    width: 150px;
    box-sizing: border-box;
    background: #efefefd5;
    border-right: 1px solid #ccc;
}
/* 菜单样式 */
.navPage .lists>li{
    display: block;
    width: 150px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0px 50px;
    line-height: 35px;
    font-weight: normal;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.navPage .lists>li:nth-last-child(1){
    border-bottom: 1px solid #ccc;
}
.navPage .lists>li:nth-child(1){
    border-top: 1px solid #ccc;
}
.navPage .lists>.selected{
    background:#fff;
    border-right:#fff;
}
</style>
