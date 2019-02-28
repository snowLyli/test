<template>
    <div class="gv6DiskPage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6DiskContent">
            <div class="gv6DTop">
                <div class="disks">
                    <h4>磁盘:</h4>
                    <ul class="diskMsg">
                        <li v-for="(item, index) in diskDate" :key="index">
                            <img src="/static/property/img/disk_b.png" alt="">
                            <p>{{item.path}}</p>
                            <p>{{item.introduce}}</p>
                        </li>
                    </ul>
                </div>
                <div class="subarea">
                    <h4>分区:</h4>
                    <div class="areaMsg">
                        <img src="/static/property/img/subarea.png" alt="">
                        <div class="message">
                            <div class="progressBar">
                                <el-progress :text-inside="true" :stroke-width="40" 
                                             :percentage="33" status="success">
                                </el-progress>
                            </div>
                            <ul class="barMsg">
                                <li>
                                    <span>总量：</span><span>759.58 GB</span>
                                </li>
                                <li>
                                    <span>使用量：</span><span>45.80 GB</span>
                                </li>
                                <li>
                                    <span>剩余量：</span><span>49.38 GB</span>
                                </li>    
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gv6DBottom">
                <el-table :data="diskLists" style="width: 100%"
                          :header-cell-style="{
                                'background-color': '#666',
                                'color': '#fff',
                                'border-right': '1px #888 solid',
                                'height': '45px'
                            }">
                    <el-table-column prop="areaName" label="磁盘分区名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="allZone" label="总容量"></el-table-column>
                    <el-table-column prop="surplus" label="剩余量"></el-table-column>
                    <el-table-column prop="useRatio" label="利用率（%）" ></el-table-column>
                    <el-table-column prop="writeRatio" label="写速率"></el-table-column>
                    <el-table-column prop="readRatio" label="读速率"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/property/serverDetail/public/NavBar"
export default {
    data(){
        return{
            prevPageText: "gv6",
            curPageText: "磁盘",
            // 磁盘数据
            diskDate: [
                {
                    path: "/dev/mapper/rhel-root  48.4GB",
                    introduce: "Linux device-mapper (linear) (dm)"
                },
                {
                    path: "/dev/mapper/rhel-swap  4161MB",
                    introduce: "Linux device-mapper (linear) (dm)"
                },
                {
                    path: "/dev/sr0  72.5MB  OK",
                    introduce: "QEMU QEMU DVD-ROM (scsi)"
                },
                {
                    path: "/dev/xvda  107GB",
                    introduce: "Xen Virtual Block Device (xvd)"
                },
                {
                    path: "/dev/mapper/rhel-root  48.4GB",
                    introduce: "Linux device-mapper (linear) (dm)"
                }
            ],
            // 磁盘列表数据
            diskLists: [
                {
                    areaName: "/dev/mapper/rhel-root",
                    allZone: "45.1GB",
                    surplus: "14.05GB",
                    useRatio: "69",
                    writeRatio: "9.04KB/s",
                    readRatio: "0.0B/s"
                },
                {
                    areaName: "/dev/xvda1",
                    allZone: "1014.0MB",
                    surplus: "834.86MB",
                    useRatio: "18",
                    writeRatio: "0.0B/s",
                    readRatio: "0.0B/s"
                },
                {
                    areaName: "/dev/xvda3",
                    allZone: "49.09GB",
                    surplus: "31.99GB",
                    useRatio: "32",
                    writeRatio: "400.31KB/s",
                    readRatio: "0.0B/s"
                },
                {
                    areaName: "gv174:/public/home/GVTEST",
                    allZone: "",
                    surplus: "",
                    useRatio: "",
                    writeRatio: "",
                    readRatio: ""
                },
                {
                    areaName: "gv174:/public174/software",
                    allZone: "",
                    surplus: "",
                    useRatio: "",
                    writeRatio: "",
                    readRatio: ""
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
/* 公共样式 */
h4{
    line-height:20px;
    margin-bottom:10px;
}
/* 页面样式 */
.gv6DiskPage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6DiskPage .gv6DiskContent{
    width:100%;
    min-height:100%;
    box-sizing: border-box;
    padding: 40px 20px 20px 170px;
}
/* 各模块样式 */
.gv6DiskPage .gv6DiskContent .gv6DTop,
.gv6DiskPage .gv6DiskContent .gv6DBottom{
    width:100%;
    overflow:hidden;
    margin-top:30px;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .disks,
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea{
    width:100%;
    overflow:hidden;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea{
    height:130px;
}
/* 各磁盘样式 */
.gv6DiskPage .gv6DiskContent .gv6DTop .disks .diskMsg{
    width:100%;
    overflow: hidden;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .disks .diskMsg>li{
    width:23%;
    margin-right:1%;
    margin-bottom:15px;
    height:80px;
    background:#eee;
    border:1px solid #ccc;
    float:left;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 15px 5px;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .disks .diskMsg>li>img{
    width: 35px;
    height: 35px;
    float: left;
    margin:5px 10px 0 0;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .disks .diskMsg>li>p{
    float: left;
    width: 75%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height:20px;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .disks .diskMsg>li>p:nth-child(3){
    white-space: pre-wrap;
}
/* 分区内容样式 */
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px 0;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg>img{
    width: 50px;
    height: 55px;
    float:left;
    margin-right:10px;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg .message{
    width:90%;
    height:100%;
    float:left;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg .message .progressBar{
    width:100%;
    height:60%;
    padding:1% 0;
    box-sizing: border-box;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg .message .barMsg{
    width:100%;
    height:30%;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg .message .barMsg>li{
    width:15%;
    height:100%;
    float:left;
    font-size:14px;
}
.gv6DiskPage .gv6DiskContent .gv6DTop .subarea .areaMsg .message .barMsg>li>span:nth-child(1){
    font-weight: 600;
}
</style>
