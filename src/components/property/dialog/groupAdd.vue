<template>
    <div class="groupAdd">
        <el-dialog :visible.sync="ifGroupAdd" width="25%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>组添加</p>
            </span>
            <div class="diaContent">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <div class="commonBox">
                        <el-form-item label="资产类型">
                            <el-select v-model="value7" placeholder="请选择">
                                <el-option-group v-for="group in options3" :key="group.label"
                                                    :label="group.label">
                                    <el-option v-for="item in group.options" :key="item.value"
                                            :label="item.label" :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item :required="true" label="资产名称">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述信息">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="btnsBox">
                        <el-button @click="modalClose">取 消</el-button>
                        <el-button type="primary" @click="modalClose">确 定</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            options3: [
                {
                    label: '热门城市',
                    options: [
                        {
                            value: 'Shanghai',
                            label: '上海'
                        }, 
                        {
                            value: 'Beijing',
                            label: '北京'
                        }
                    ]
                }, 
                {
                    label: '城市名',
                    options: [
                        {
                            value: 'Chengdu',
                            label: '成都'
                        }, 
                        {
                            value: 'Shenzhen',
                            label: '深圳'
                        }, 
                        {
                            value: 'Guangzhou',
                            label: '广州'
                        }, 
                        {
                            value: 'Dalian',
                            label: '大连'
                        }
                    ]
                }
            ],
            value7: '',
        }
    },
    methods: {
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        }
    },
    props: ["ifGroupAdd"]
}
</script>

<style>
/* 弹框内元素样式 */
.groupAdd{
    width:100%;
    height:100%;
}
.groupAdd .diaContent{
    width:100%;
    height:100%;
}
.groupAdd .diaContent .commonBox{
    width: 100%;
    margin: 35px 0 10px;
}
.groupAdd .diaContent .btnsBox{
    text-align:center;
    margin: 15px 0;
}
.groupAdd .diaContent .btnsBox .el-button{
    border-radius:0;
    padding:8px 20px;
}
</style>
