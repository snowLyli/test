<template>
    <div class="gv6CoursePage">
        <nav-bar :prevPageText="prevPageText" :curPageText="curPageText"></nav-bar>
        <div class="gv6CourseContent">
            <el-table :data="progressLists" style="width: 100%"
                        :header-cell-style="{
                            'background-color': '#666',
                            'color': '#fff',
                            'border-right': '1px #888 solid',
                            'height': '45px'
                        }">
                <el-table-column prop="users" label="用户" show-overflow-tooltip></el-table-column>
                <el-table-column prop="progressCode" label="进程号"></el-table-column>
                <el-table-column prop="progressName" label="进程名称"></el-table-column>
                <el-table-column prop="cpuUseRatio" label="CPU利用率（%）" ></el-table-column>
                <el-table-column prop="diskRatio" label="内存利用率"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/property/serverDetail/public/NavBar"
export default {
    data(){
        return{
            prevPageText: "gv6",
            curPageText: "进程",
            // 列表数据
            progressLists: [
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "libstor+",
                    progressCode: "674",
                    progressName: "lsmd",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
                },
                {
                    users: "mysql",
                    progressCode: "17245",
                    progressName: "17245",
                    cpuUseRatio: "0.0",
                    diskRatio: "0.0"
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
.gv6CoursePage{
    width:100%;
    height:100%;
}
/* 页面主要内容样式 */
.gv6CoursePage .gv6CourseContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding: 65px 20px 20px 170px;
}
</style>
