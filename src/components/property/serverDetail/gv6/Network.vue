<template>
    <div class="gv6NetworkPage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6NetworkContent">
            <ul class="cards">
                <li v-for="(item, index) in cards" :key="index">
                    <ul>
                        <h5>{{item.name}}</h5>
                        <li v-for="(itm, idx) in item.detailMsg" :key="idx">
                            <span>{{itm.label}}</span>
                            <span>{{itm.value}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/property/serverDetail/public/NavBar"
export default {
    data(){
        return{
            prevPageText: "gv6",
            curPageText: "网卡",
            cards: [
                {
                    name: "eth0",
                    detailMsg: [
                        {
                            label: "网卡类型：",
                            value: "Ethernet"
                        },
                        {
                            label: "接收包速率：",
                            value: "241.5Packets/s"
                        },
                        {
                            label: "接收字节数：",
                            value: "147,159,189,646"
                        },
                        {
                            label: "网关：",
                            value: "10.0.35.254"
                        },
                        {
                            label: "发送包速率：",
                            value: "199Packets/s"
                        },
                        {
                            label: "发送包：",
                            value: "581,518,617"
                        },
                        {
                            label: "IP地址：",
                            value: "10.0.35.47"
                        },
                        {
                            label: "子网掩码：",
                            value: "255.255.255.0"
                        },
                        {
                            label: "MAC地址：",
                            value: "a6:62:bb:b2:1d:ba"
                        },
                        {
                            label: "发送速率：",
                            value: "29.02KB/s"
                        },
                        {
                            label: "接收包：",
                            value: "638,261,050"
                        },
                        {
                            label: "发送字节数：",
                            value: "103,981,445,138"
                        },
                        {
                            label: "接收速率：",
                            value: "38.66KB/s"
                        }
                    ]
                },
                {
                    name: "eth0",
                    detailMsg: [
                        {
                            label: "网卡类型：",
                            value: "Ethernet"
                        },
                        {
                            label: "接收包速率：",
                            value: "241.5Packets/s"
                        },
                        {
                            label: "接收字节数：",
                            value: "147,159,189,646"
                        },
                        {
                            label: "网关：",
                            value: "10.0.35.254"
                        },
                        {
                            label: "发送包速率：",
                            value: "199Packets/s"
                        },
                        {
                            label: "发送包：",
                            value: "581,518,617"
                        },
                        {
                            label: "IP地址：",
                            value: "10.0.35.47"
                        },
                        {
                            label: "子网掩码：",
                            value: "255.255.255.0"
                        },
                        {
                            label: "MAC地址：",
                            value: "a6:62:bb:b2:1d:ba"
                        },
                        {
                            label: "发送速率：",
                            value: "29.02KB/s"
                        },
                        {
                            label: "接收包：",
                            value: "638,261,050"
                        },
                        {
                            label: "发送字节数：",
                            value: "103,981,445,138"
                        },
                        {
                            label: "接收速率：",
                            value: "38.66KB/s"
                        }
                    ]
                },
                {
                    name: "eth0",
                    detailMsg: [
                        {
                            label: "网卡类型：",
                            value: "Ethernet"
                        },
                        {
                            label: "接收包速率：",
                            value: "241.5Packets/s"
                        },
                        {
                            label: "接收字节数：",
                            value: "147,159,189,646"
                        },
                        {
                            label: "网关：",
                            value: "10.0.35.254"
                        },
                        {
                            label: "发送包速率：",
                            value: "199Packets/s"
                        },
                        {
                            label: "发送包：",
                            value: "581,518,617"
                        },
                        {
                            label: "IP地址：",
                            value: "10.0.35.47"
                        },
                        {
                            label: "子网掩码：",
                            value: "255.255.255.0"
                        },
                        {
                            label: "MAC地址：",
                            value: "a6:62:bb:b2:1d:ba"
                        },
                        {
                            label: "发送速率：",
                            value: "29.02KB/s"
                        },
                        {
                            label: "接收包：",
                            value: "638,261,050"
                        },
                        {
                            label: "发送字节数：",
                            value: "103,981,445,138"
                        },
                        {
                            label: "接收速率：",
                            value: "38.66KB/s"
                        }
                    ]
                },
                {
                    name: "eth0",
                    detailMsg: [
                        {
                            label: "网卡类型：",
                            value: "Ethernet"
                        },
                        {
                            label: "接收包速率：",
                            value: "241.5Packets/s"
                        },
                        {
                            label: "接收字节数：",
                            value: "147,159,189,646"
                        },
                        {
                            label: "网关：",
                            value: "10.0.35.254"
                        },
                        {
                            label: "发送包速率：",
                            value: "199Packets/s"
                        },
                        {
                            label: "发送包：",
                            value: "581,518,617"
                        },
                        {
                            label: "IP地址：",
                            value: "10.0.35.47"
                        },
                        {
                            label: "子网掩码：",
                            value: "255.255.255.0"
                        },
                        {
                            label: "MAC地址：",
                            value: "a6:62:bb:b2:1d:ba"
                        },
                        {
                            label: "发送速率：",
                            value: "29.02KB/s"
                        },
                        {
                            label: "接收包：",
                            value: "638,261,050"
                        },
                        {
                            label: "发送字节数：",
                            value: "103,981,445,138"
                        },
                        {
                            label: "接收速率：",
                            value: "38.66KB/s"
                        }
                    ]
                }
            ]
        }
    },
    mounted(){
        
    },
    methods: {
        
    },
    components: {
        NavBar
    }
}
</script>
<style>
/* 页面样式 */
.gv6NetworkPage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6NetworkPage .gv6NetworkContent{
    width:100%;
    min-height:100%;
    box-sizing: border-box;
    padding: 65px 20px 20px 170px;
}
/* 各网卡信息样式 */
.gv6NetworkPage .gv6NetworkContent .cards{
    width:100%;
    overflow:hidden;
}
.gv6NetworkPage .gv6NetworkContent .cards>li{
    width:30%;
    float:left;
    margin:0 20px 20px 0;
    border:2px solid #ccc;
    border-radius:5px;
}
.gv6NetworkPage .gv6NetworkContent .cards>li>ul>h5{
    line-height:35px;
    border-bottom:1px solid #eee;
    padding-left:20px;
}
.gv6NetworkPage .gv6NetworkContent .cards>li>ul>li{
    height:28px;
    border-bottom:1px solid #eee;
}
.gv6NetworkPage .gv6NetworkContent .cards>li>ul>li>span{
    display:block;
    height:100%;
    line-height:28px;
    font-size:12px;
    box-sizing: border-box;
}
.gv6NetworkPage .gv6NetworkContent .cards>li>ul>li>span:nth-child(1){
    width:40%;
    float:left;
    padding-left:20px;
}
.gv6NetworkPage .gv6NetworkContent .cards>li>ul>li>span:nth-child(2){
    width:60%;
    float:right;
    padding-right:10px;
    text-align:right;
}
</style>
