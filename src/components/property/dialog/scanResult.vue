<template>
    <div class="scanRes">
        <el-dialog :visible.sync="ifScanRes" width="48%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>扫描结果</p>
            </span>
            <div class="diaContent">
                <ul class="resLists">
                    <li class="proBugList" v-for="(item, index) in scanResList" :key="index">
                        <img :src="item.ifShowBugs ? '/static/property/img/hide.png' : '/static/property/img/show.png'" 
                             alt="" @click="showBugsDetail(index)">
                        <span>漏洞名称：{{item.proName}}</span>
                        <span>漏洞数量：{{item.bugsNum}}</span>
                        <div :class="item.ifShowBugs ? 'bugsList show' : 'bugsList hide'">
                            <el-table :data="item.bugsList" border style="width: 100%"
                                      :header-cell-style="{
                                        'background-color': '#666',
                                        'color': '#fff',
                                        'border-right': '1px #888 solid',
                                        'height': '30px'
                                      }">
                                <el-table-column prop="bugName" label="漏洞名称" width="180"></el-table-column>
                                <el-table-column prop="dangerous" label="危险等级" width="180"></el-table-column>
                                <el-table-column prop="describe" label="简短描述"></el-table-column>
                                <el-table-column prop="repair" label="修复方案"></el-table-column>
                            </el-table>
                        </div>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 扫描任务列表数据
            scanResList: [
                {
                    ifShowBugs: false,
                    proName: "aaaa",
                    bugsNum: "3",
                    bugsList: [
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        }
                    ]
                },
                {
                    ifShowBugs: false,
                    proName: "aaaa",
                    bugsNum: "3",
                    bugsList: [
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        }
                    ]
                },
                {
                    ifShowBugs: false,
                    proName: "aaaa",
                    bugsNum: "3",
                    bugsList: [
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        }
                    ]
                },
                {
                    ifShowBugs: false,
                    proName: "aaaa",
                    bugsNum: "3",
                    bugsList: [
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        },
                        {
                            bugName: "漏洞1",
                            dangerous: "高危",
                            describe: "aaaaaaaaa",
                            repair:"方案1"
                        }
                    ]
                }
            ]
        }
    },
    mounted(){

    },
    methods: {
        // 直接修改父组件的属性
        modalClose() {
            this.$emit("update:visible", false);
        },
        // 判断是否显示漏洞详情列表
        showBugsDetail(val){
            this.scanResList.map((item, index) => {
                if(index == val){
                    item.ifShowBugs = !item.ifShowBugs
                }
            })
        }
    },
    props: ["ifScanRes"]
}
</script>

<style>
/* 弹框内元素样式 */
.scanRes{
    width:100%;
    height:100%;
}
.scanRes .diaContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px;
}
.scanRes .diaContent .resLists{
    width:100%;
    height:100%;
    overflow: auto;
}
.scanRes .diaContent .resLists .proBugList{
    width: 100%;
    background: #eee;
    margin-bottom: 10px;
}
.scanRes .diaContent .resLists .proBugList>img{
    width: 24px;
    height: 24px;
    margin: 6px;
    float: left;
}
.scanRes .diaContent .resLists .proBugList>span{
    line-height:36px;
    margin-right:5px;
}
.scanRes .diaContent .resLists .proBugList .bugsList{
    width: 100%;
    padding: 5px 10px 0;
    box-sizing: border-box;
    clear:both;
    background:#fff;
}
.scanRes .diaContent .resLists .proBugList>.show{
    display:block;
}
.scanRes .diaContent .resLists .proBugList>.hide{
    display:none;
}
</style>
