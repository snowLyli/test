<template>
    <div class="roomLink">
        <el-dialog :visible.sync="ifRoomRelation" width="25%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>机房管理</p>
            </span>
            <div class="diaContent">
                <div class="proListBox">
                    <div class="proTitle">组与机房之间关系</div>
                    <div class="proContent">
                        <el-tree :data="roomTreeData" show-checkbox node-key="id" ref="tree" 
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
            roomTreeData: [
                {
                    id: "2.1",
                    label: "机房A",
                    children: [
                        {
                            id: "2.1.1",
                            label: "组A"
                        },
                        {
                            id: "2.1.2",
                            label: "组B"
                        },
                        {
                            id: "2.1.3",
                            label: "组C"
                        }
                    ]
                },
                {
                    id: "2.2",
                    label: "机房B",
                    children: [
                        {
                            id: "2.1.1",
                            label: "组A"
                        },
                        {
                            id: "2.1.2",
                            label: "组B"
                        },
                        {
                            id: "2.1.3",
                            label: "组C"
                        }
                    ]
                },
                {
                    id: "2.3",
                    label: "机房C",
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
                    label: "机房D",
                    children: [
                        {
                            id: "2.1.1",
                            label: "组A"
                        },
                        {
                            id: "2.1.2",
                            label: "组B"
                        },
                        {
                            id: "2.1.3",
                            label: "组C"
                        }
                    ]
                },
                {
                    id: "2.5",
                    label: "机房E",
                    children: [
                        {
                            id: "2.1.1",
                            label: "组A"
                        },
                        {
                            id: "2.1.2",
                            label: "组B"
                        },
                        {
                            id: "2.1.3",
                            label: "组C"
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
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
        }
    },
    props: ["ifRoomRelation"]
}
</script>

<style>
/* 弹框内元素样式 */
.roomLink{
    width:100%;
    height:100%;
}
.roomLink .diaContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px;
}
.roomLink .diaContent .proListBox{
    width:100%;
    height:100%;
    box-sizing: border-box;
    border:1px solid #ccc;
}
.roomLink .diaContent .proListBox .proTitle{
    width: 100%;
    height: 9%;
    line-height: 30px;
    background: #eee;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 10px;
}
.roomLink .diaContent .proListBox .proContent{
    width:100%;
    height:91%;
    box-sizing: border-box;
    padding:10px;
}
</style>
