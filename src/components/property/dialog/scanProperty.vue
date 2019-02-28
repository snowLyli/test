<template>
    <div class="scanProperty">
        <el-dialog :visible.sync="ifProScan" width="45%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>根据资产扫描</p>
            </span>
            <div class="diaContent">
                <div class="aimTree">
                    <div class="aimTitle">扫描目标</div>
                    <el-tree :data="proTreeData" show-checkbox node-key="id" ref="tree"
                              highlight-current :props="defaultProps"
                              @node-drag-start="handleDragStart"
                              @node-drag-enter="handleDragEnter"
                              @node-drag-leave="handleDragLeave"
                              @node-drag-over="handleDragOver"
                              @node-drag-end="handleDragEnd"
                              @node-drop="handleDrop"
                              draggable
                              :allow-drop="allowDrop"
                              :allow-drag="allowDrag">
                    </el-tree>
                </div>
                <div class="aimCheck">
                    <div class="checkTitle">目标检查</div>
                    <div class="checkLists">
                        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" height="290px" border
                              @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="name" label="资产名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="address" label="目标地址" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 资产列表树形控件数据
            proTreeData: [
                {
                    id: "1",
                    label: "全部",
                    children: [
                        {
                            id: "2.1",
                            label: "刀片机箱",
                            children: [
                                {
                                    id: "2.1.1",
                                    label: "M-Pro"
                                },
                                {
                                    id: "2.1.2",
                                    label: "TC3600-1"
                                },
                                {
                                    id: "2.1.3",
                                    label: "tc4600e"
                                }
                            ]
                        },
                        {
                            id: "2.2",
                            label: "磁盘阵列",
                            children: []
                        },
                        {
                            id: "2.3",
                            label: "组",
                            children: [
                                {
                                    id: "2.3.1",
                                    label: "GPU"
                                },
                                {
                                    id: "2.3.2",
                                    label: "windows节点"
                                },
                                {
                                    id: "2.3.3",
                                    label: "刀片计算组"
                                },
                                {
                                    id: "2.3.4",
                                    label: "物理机节点"
                                },
                                {
                                    id: "2.3.5",
                                    label: "胖节点计算组"
                                },
                                {
                                    id: "2.3.6",
                                    label: "虚拟机节点"
                                }
                            ]
                        },
                        {
                            id: "2.4",
                            label: "机柜",
                            children: [
                                {
                                    id: "2.4.1",
                                    label: "TC5600-H"
                                },
                                {
                                    id: "2.4.2",
                                    label: "c1000-1"
                                },
                                {
                                    id: "2.4.3",
                                    label: "c200_rack"
                                },
                                {
                                    id: "2.4.4",
                                    label: "fenglfenglfenglfenglfenglfenglfe"
                                },
                                {
                                    id: "2.4.5",
                                    label: "机柜2"
                                },
                                {
                                    id: "2.4.6",
                                    label: "机柜4"
                                },
                                {
                                    id: "2.4.7",
                                    label: "机柜7"
                                },
                                {
                                    id: "2.4.8",
                                    label: "风冷机柜"
                                }
                            ]
                        },
                        {
                            id: "2.5",
                            label: "机房",
                            children: [
                                {
                                    id: "2.5.1",
                                    label: "1234"
                                },
                                {
                                    id: "2.5.2",
                                    label: "room01"
                                },
                                {
                                    id: "2.5.3",
                                    label: "room02"
                                },
                                {
                                    id: "2.5.3",
                                    label: "roomroomroomroomroomroomroomroom"
                                }
                            ]
                        },
                        {
                            id: "2.6",
                            label: "服务器",
                            children: [
                                {
                                    id: "2.6.1",
                                    label: "CentOS6.5-179"
                                },
                                {
                                    id: "2.6.2",
                                    label: "CentOS6.5-zentao85"
                                },
                                {
                                    id: "2.6.3",
                                    label: "CentOS6.5_96"
                                },
                                {
                                    id: "2.6.4",
                                    label: "CentOS6.5_gv71"
                                },
                                {
                                    id: "2.6.5",
                                    label: "CentOS6.6-zht97"
                                },
                                {
                                    id: "2.6.6",
                                    label: "CentOS72_161"
                                },
                                {
                                    id: "2.6.7",
                                    label: "Gvhost2"
                                },
                                {
                                    id: "2.6.8",
                                    label: "RedHat6.5-gv78"
                                },
                                {
                                    id: "2.6.9",
                                    label: "Rhel6.4-mhf185"
                                },
                                {
                                    id: "2.6.10",
                                    label: "Xen_gvhost5"
                                },
                                {
                                    id: "2.6.11",
                                    label: "Xen_gvhost8"
                                },
                                {
                                    id: "2.6.12",
                                    label: "ai"
                                },
                                {
                                    id: "2.6.13",
                                    label: "blade1"
                                },
                                {
                                    id: "2.6.14",
                                    label: "centos511-zht95"
                                },
                                {
                                    id: "2.6.15",
                                    label: "centos6.2_gv173"
                                }
                            ]
                        },
                        {
                            id: "2.7",
                            label: "存储系统",
                            children: [
                                {
                                    id: "2.7.1",
                                    label: "parastor"
                                }
                            ]
                        },
                        {
                            id: "2.8",
                            label: "交换机",
                            children: []
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            // 选中后的资产列表数据
            tableData3: [
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                },
                {
                    name: "NO201709210923200001",
                    address: "http://192.168.23.190"
                }
            ],
            multipleSelection: []
        }
    },
    mounted(){

    },
    methods: {
        // 直接修改父组件的属性
        modalClose() {
            this.$emit("update:visible", false);
        },
        // 树形控件可拖拽
        handleDragStart(node, ev) {
            console.log("drag start", node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log("tree drag enter: ", dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log("tree drag leave: ", dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log("tree drag over: ", dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log("tree drag end: ", dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log("tree drop: ", dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === "二级 3-1") {
                return type !== "inner";
            } else {
                return true;
            }
        },
        allowDrag(draggingNode) {
            return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
    },
    props: ["ifProScan"]
}
</script>

<style>
/* 弹框内元素样式 */
.scanProperty{
    width:100%;
    height:100%;
}
.scanProperty .diaContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px;
}
.scanProperty .diaContent .aimTree,
.scanProperty .diaContent .aimCheck{
    width:25%;
    height:100%;
    box-sizing: border-box;
    border:1px solid #ccc;
    float:left;
}
.scanProperty .diaContent .aimCheck{
    width:72%;
    float:right;
}
.scanProperty .diaContent .aimTree .aimTitle,
.scanProperty .diaContent .aimCheck .checkTitle{
    width:100%;
    height:8%;
    background:#eee;
    border-bottom:1px solid #ccc;
    line-height:25px;
    box-sizing: border-box;
    padding-left:5px;
}
.scanProperty .diaContent .aimCheck .checkLists{
    width:100%;
    height:92%;
    box-sizing: border-box;
    padding:10px;
}
</style>
