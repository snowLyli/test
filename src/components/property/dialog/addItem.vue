<template>
    <div class="addItem">
        <el-dialog :visible.sync="ifAddItem" width="30%" center 
                   :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>添加资产</p>
            </span>
            <div class="diaContent">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <div class="commonBox">
                        <el-form-item label="资产类型">
                            <el-select v-model="proType" placeholder="请选择">
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
                    <div class="switchesBox" :class="(proTypes == '网络设备') || (proTypes == '安全设备') ? 'show' : 'hide'">
                        <el-form-item label="管理IP" :required="true">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="端口" :required="true">
                            <el-input v-model="formLabelAlign.protValue"></el-input>
                        </el-form-item>
                        <el-form-item label="SNMP社区名" :required="true">
                            <el-input v-model="formLabelAlign.snmpValue"></el-input>
                        </el-form-item>
                        <el-form-item label="SNMP版本">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                    </div>
                    <div class="serversBox" :class="proTypes == '计算设备' ? 'show' : 'hide'">
                        <el-form-item label="管理IP" :required="true">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="IPMI地址">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="IPMI用户名">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="IPMI密码">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="SNMP社区名" :required="true">
                            <el-input v-model="formLabelAlign.snmpValue"></el-input>
                        </el-form-item>
                        <el-form-item label="端口" :required="true">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="厂商">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="序列号">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="SNMP版本">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value"
                                           :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="belongGroup">
                        <el-form-item label="所属组">
                            <el-select v-model="value7" placeholder="请选择">
                                <el-option-group v-for="group in options3" :key="group.label"
                                                 :label="group.label">
                                    <el-option v-for="item in group.options" :key="item.value"
                                            :label="item.label" :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
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
            labelPosition: "right",
            formLabelAlign: {
                protValue: "161",
                snmpValue: "public",
                name: "",
                region: "",
                type: ""
            },
            options3: [
                {
                    label: "热门城市",
                    options: [
                        {
                            value: "Shanghai",
                            label: "上海"
                        }, 
                        {
                            value: "Beijing",
                            label: "北京"
                        }
                    ]
                }, 
                {
                    label: "城市名",
                    options: [
                        {
                            value: "Chengdu",
                            label: "成都"
                        }, 
                        {
                            value: "Shenzhen",
                            label: "深圳"
                        }, 
                        {
                            value: "Guangzhou",
                            label: "广州"
                        }, 
                        {
                            value: "Dalian",
                            label: "大连"
                        }
                    ]
                }
            ],
            proType: "",
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                }, 
                {
                    value: "选项2",
                    label: "双皮奶"
                }, 
                {
                    value: "选项3",
                    label: "蚵仔煎"
                }, 
                {
                    value: "选项4",
                    label: "龙须面"
                }, 
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value7: "",
            value: ""
        }
    },
    mounted(){
        this.getInitDialog()
    },
    methods: {
        modalClose() {
            this.$emit("update:visible", false); // 直接修改父组件的属性
        },
        getInitDialog(){
            this.proType = this.proItemTypes
        }
    },
    props: ["ifAddItem","proItemTypes","proTypes"]
}
</script>

<style>
/* 弹框内元素样式 */
.addItem{
    height: 100%;
    width: 100%;
    margin-bottom: 15px;
}
.addItem .diaContent .commonBox{
    width: 100%;
    margin: 20px 0 5px;
}
.addItem .diaContent .switchesBox,
.addItem .diaContent .serversBox{
    width: 88%;
    margin: 0px 23px;
    padding: 20px 0;
    background: #eee;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-bottom:5px;
}
.addItem .diaContent .show{
    display:block;
}
.addItem .diaContent .hide{
    display:none;
}
.addItem .diaContent .belongGroup{
    margin-bottom:15px;
}
.addItem .diaContent .btnsBox{
    text-align:center;
    margin-bottom:15px;
}
.addItem .diaContent .btnsBox .el-button{
    border-radius:0;
    padding:8px 20px;
}
</style>
