<template>
    <div class="relationLink">
        <el-dialog :visible.sync="ifRelation" width="60%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>关联关系管理</p>
            </span>
            <div class="diaContent">
                <div class="proListBox">
                    <div class="proTitle">资产列表</div>
                    <div class="proContent">
                        <div class="proTree">
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
                        <div class="proTwig">
                            <el-tree :data="proTwigData" show-checkbox node-key="id" ref="tree" 
                                     highlight-current :props="defaultProps"
                                     default-expand-all>
                            </el-tree>
                        </div>
                    </div>
                </div>
                <div class="transferBtn">
                    <div class="towardsR">&lt;</div>
                    <div class="towardsL">&gt;</div>
                </div>
                <div class="relationBox">
                    <div class="relationTitle">组及关联关系</div>
                    <div class="relContent">
                        <div class="relTwig">
                            <el-tree :data="relTwigData" show-checkbox node-key="id" ref="tree" 
                                     highlight-current :props="defaultProps"
                                     default-expand-all>
                            </el-tree>
                        </div>
                        <div class="relTree">
                            <el-tree :data="relTreeData" show-checkbox node-key="id" ref="tree" 
                                     highlight-current :props="defaultProps">
                            </el-tree>
                        </div>
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
                    id: '1',
                    label: '全部',
                    children: [
                        {
                            id: '2.1',
                            label: '刀片机箱',
                            children: [
                                {
                                    id: '2.1.1',
                                    label: 'M-Pro'
                                },
                                {
                                    id: '2.1.2',
                                    label: 'TC3600-1'
                                },
                                {
                                    id: '2.1.3',
                                    label: 'tc4600e'
                                }
                            ]
                        },
                        {
                            id: '2.2',
                            label: '磁盘阵列',
                            children: []
                        },
                        {
                            id: '2.3',
                            label: '组',
                            children: [
                                {
                                    id: '2.3.1',
                                    label: 'GPU'
                                },
                                {
                                    id: '2.3.2',
                                    label: 'windows节点'
                                },
                                {
                                    id: '2.3.3',
                                    label: '刀片计算组'
                                },
                                {
                                    id: '2.3.4',
                                    label: '物理机节点'
                                },
                                {
                                    id: '2.3.5',
                                    label: '胖节点计算组'
                                },
                                {
                                    id: '2.3.6',
                                    label: '虚拟机节点'
                                }
                            ]
                        },
                        {
                            id: '2.4',
                            label: '机柜',
                            children: [
                                {
                                    id: '2.4.1',
                                    label: 'TC5600-H'
                                },
                                {
                                    id: '2.4.2',
                                    label: 'c1000-1'
                                },
                                {
                                    id: '2.4.3',
                                    label: 'c200_rack'
                                },
                                {
                                    id: '2.4.4',
                                    label: 'fenglfenglfenglfenglfenglfenglfe'
                                },
                                {
                                    id: '2.4.5',
                                    label: '机柜2'
                                },
                                {
                                    id: '2.4.6',
                                    label: '机柜4'
                                },
                                {
                                    id: '2.4.7',
                                    label: '机柜7'
                                },
                                {
                                    id: '2.4.8',
                                    label: '风冷机柜'
                                }
                            ]
                        },
                        {
                            id: '2.5',
                            label: '机房',
                            children: [
                                {
                                    id: '2.5.1',
                                    label: '1234'
                                },
                                {
                                    id: '2.5.2',
                                    label: 'room01'
                                },
                                {
                                    id: '2.5.3',
                                    label: 'room02'
                                },
                                {
                                    id: '2.5.3',
                                    label: 'roomroomroomroomroomroomroomroom'
                                }
                            ]
                        },
                        {
                            id: '2.6',
                            label: '服务器',
                            children: [
                                {
                                    id: '2.6.1',
                                    label: 'CentOS6.5-179'
                                },
                                {
                                    id: '2.6.2',
                                    label: 'CentOS6.5-zentao85'
                                },
                                {
                                    id: '2.6.3',
                                    label: 'CentOS6.5_96'
                                },
                                {
                                    id: '2.6.4',
                                    label: 'CentOS6.5_gv71'
                                },
                                {
                                    id: '2.6.5',
                                    label: 'CentOS6.6-zht97'
                                },
                                {
                                    id: '2.6.6',
                                    label: 'CentOS72_161'
                                },
                                {
                                    id: '2.6.7',
                                    label: 'Gvhost2'
                                },
                                {
                                    id: '2.6.8',
                                    label: 'RedHat6.5-gv78'
                                },
                                {
                                    id: '2.6.9',
                                    label: 'Rhel6.4-mhf185'
                                },
                                {
                                    id: '2.6.10',
                                    label: 'Xen_gvhost5'
                                },
                                {
                                    id: '2.6.11',
                                    label: 'Xen_gvhost8'
                                },
                                {
                                    id: '2.6.12',
                                    label: 'ai'
                                },
                                {
                                    id: '2.6.13',
                                    label: 'blade1'
                                },
                                {
                                    id: '2.6.14',
                                    label: 'centos511-zht95'
                                },
                                {
                                    id: '2.6.15',
                                    label: 'centos6.2_gv173'
                                }
                            ]
                        },
                        {
                            id: '2.7',
                            label: '存储系统',
                            children: [
                                {
                                    id: '2.7.1',
                                    label: 'parastor'
                                }
                            ]
                        },
                        {
                            id: '2.8',
                            label: '交换机',
                            children: []
                        }
                    ]
                }
            ],
            // 资产列表选中后的数据
            proTwigData: [
                {
                    id: '1',
                    label: '全选',
                    children: [
                        {
                            id: '1.2',
                            label: '资产1'
                        },
                        {
                            id: '1.3',
                            label: '资产2'
                        },
                        {
                            id: '1.4',
                            label: '资产3'
                        },
                        {
                            id: '1.5',
                            label: '资产4'
                        },
                        {
                            id: '1.6',
                            label: '资产5'
                        },
                        {
                            id: '1.7',
                            label: '资产6'
                        },
                        {
                            id: '1.8',
                            label: '资产7'
                        },
                        {
                            id: '1.9',
                            label: '资产8'
                        }
                    ]
                }
            ],
            // 组及关联关系树形控件数据
            relTreeData: [
                {
                    id: '1',
                    label: '组',
                    children: [
                        {
                            id: '1.1',
                            label: 'GPU',
                            children: [
                                {
                                    id: '1.1.1',
                                    label: 'gv11'
                                },
                                {
                                    id: '1.1.2',
                                    label: 'gv12'
                                }
                            ]
                        },
                        {
                            id: '1.2',
                            label: 'windows节点',
                            children: [
                                {
                                    id: '1.2.1',
                                    label: 'M-Pro'
                                },
                                {
                                    id: '1.2.2',
                                    label: 'win2008-gv25'
                                },
                                {
                                    id: '1.2.3',
                                    label: 'win2008_gv103'
                                },
                                {
                                    id: '1.2.4',
                                    label: 'win2008_gv243'
                                },
                                {
                                    id: '1.2.5',
                                    label: 'win2008r2_gv165'
                                },
                                {
                                    id: '1.2.6',
                                    label: 'win2008r2_gv171'
                                },
                                {
                                    id: '1.2.7',
                                    label: 'win2012-gv37'
                                },
                                {
                                    id: '1.2.8',
                                    label: 'win2012R2_199'
                                },
                                {
                                    id: '1.2.9',
                                    label: 'win2012_r2_124'
                                }
                            ]
                        },
                        {
                            id: '1.3',
                            label: '刀片计算组',
                            children: [
                                {
                                    id: '1.3.1',
                                    label: 'GPU'
                                },
                                {
                                    id: '1.3.2',
                                    label: 'windows节点'
                                }
                            ]
                        },
                        {
                            id: '1.4',
                            label: '物理机节点',
                            children: [
                                {
                                    id: '1.4.1',
                                    label: 'Gvhost2'
                                },
                                {
                                    id: '1.4.2',
                                    label: 'Xen_gvhost5'
                                },
                                {
                                    id: '1.4.3',
                                    label: 'Xen_gvhost8'
                                },
                                {
                                    id: '1.4.4',
                                    label: 'gv13'
                                },
                                {
                                    id: '1.4.5',
                                    label: 'gv17'
                                },
                                {
                                    id: '1.4.6',
                                    label: 'gv19'
                                },
                                {
                                    id: '1.4.7',
                                    label: 'gv6'
                                },
                                {
                                    id: '1.4.8',
                                    label: 'gvShare'
                                },
                                {
                                    id: '1.4.9',
                                    label: 'gvhost3'
                                }
                            ]
                        }
                    ]
                }
            ],
            // 组及关联关系选中后的数据
            relTwigData: [
                {
                    id: '1',
                    label: '全选',
                    children: [
                        {
                            id: '1.2',
                            label: '资产1'
                        },
                        {
                            id: '1.3',
                            label: '资产2'
                        },
                        {
                            id: '1.4',
                            label: '资产3'
                        },
                        {
                            id: '1.5',
                            label: '资产4'
                        },
                        {
                            id: '1.6',
                            label: '资产5'
                        },
                        {
                            id: '1.7',
                            label: '资产6'
                        },
                        {
                            id: '1.8',
                            label: '资产7'
                        },
                        {
                            id: '1.9',
                            label: '资产8'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    mounted(){
        // this.getCheckedNodes()
    },
    methods: {
        // 直接修改父组件的属性
        modalClose() {
            this.$emit('update:visible', false); 
        },
        // 树形控件可拖拽
        handleDragStart(node, ev) {
            console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
            } else {
                return true;
            }
        },
        allowDrag(draggingNode) {
            return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        },
        // 获取选中的节点
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
    },
    props: ["ifRelation"]
}
</script>

<style>
/* 弹框内元素样式 */
.relationLink{
    width:100%;
    height:100%;
}
.relationLink .diaContent{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px;
}
.relationLink .diaContent .proListBox,
.relationLink .diaContent .relationBox{
    width:46%;
    height:100%;
    float:left;
    box-sizing: border-box;
    border:1px solid #ccc;
}
.relationLink .diaContent .transferBtn{
    width:8%;
    height:100%;
    float:left;
    box-sizing: border-box;
    position: relative;
}
.relationLink .diaContent .relationBox{
    float:right;
}
.relationLink .diaContent .proListBox .proTitle,
.relationLink .diaContent .relationBox .relationTitle{
    width:100%;
    height:9%;
    background:#eee;
    border-bottom:1px solid #ccc;
    text-align:left;
    line-height:30px;
    box-sizing: border-box;
    padding:0px 10px;
}
.relationLink .diaContent .relationBox .relationTitle{
    text-align:right;
}
.relationLink .diaContent .proListBox .proContent,
.relationLink .diaContent .relationBox .relContent{
    width:100%;
    height:91%;
}
.relationLink .diaContent .proListBox .proContent .proTree,
.relationLink .diaContent .relationBox .relContent .relTree,
.relationLink .diaContent .proListBox .proContent .proTwig,
.relationLink .diaContent .relationBox .relContent .relTwig{
    width:60%;
    height:100%;
    float:left;
    box-sizing: border-box;
    overflow:auto;
}
.relationLink .diaContent .proListBox .proContent .proTree,
.relationLink .diaContent .relationBox .relContent .relTwig{
    border-right:1px solid #ccc;
}
.relationLink .diaContent .proListBox .proContent .proTwig,
.relationLink .diaContent .relationBox .relContent .relTwig{
    width:40%;
}
.relationLink .diaContent .transferBtn .towardsR,
.relationLink .diaContent .transferBtn .towardsL{
    width:50px;
    height:50px;
    box-sizing: border-box;
    border:1px solid #ccc;
    background:#eee;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-25px;
    line-height: 50px;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
}
.relationLink .diaContent .transferBtn .towardsR{
    margin-top:-50px;
}
.relationLink .diaContent .transferBtn .towardsL{
    margin-top:5px;
}
</style>
