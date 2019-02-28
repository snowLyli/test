<template>
    <div class="foundSelf">
        <el-dialog :visible.sync="ifFoundSelf" width="30%" center 
                   :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>资产自动发现</p>
            </span>
            <div class="diaContent">
                <el-form :label-position="labelPosition" label-width="110px" :model="formLabelAlign">
                    <div class="ipRange">
                        <div class="ipTitle">ip地址范围</div>
                        <div class="ipContent">
                            <input type="text" placeholder="10.0.26.*">
                        </div>
                    </div>
                    <div class="IPMIBox">
                        <div class="IPMITitle">
                            <el-checkbox v-model="ipmiChecked" checked>IPMI</el-checkbox>
                        </div>
                        <div :class="ipmiChecked ? 'IPMIContent show' : 'IPMIContent hide'">
                            <el-form-item label="IPMI用户名" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                            <el-form-item label="IPMI密码" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="SNMPBox">
                        <div class="SNMPv1Title">
                            <el-checkbox v-model="SNMPv1Checked" :disabled="SNMPv3Checked">SNMPv1/2c</el-checkbox>
                        </div>
                        <div :class="SNMPv1Checked ? 'SNMPv1Content show' : 'SNMPv1Content hide'">
                            <el-form-item label="SNMP社区名" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="SNMPv3Title">
                            <el-checkbox v-model="SNMPv3Checked" :disabled="SNMPv1Checked">SNMPv3</el-checkbox>
                        </div>
                        <div :class="SNMPv3Checked ? 'SNMPv3Content show' : 'SNMPv3Content hide'">
                            <el-form-item label="SNMP用户名" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                            <el-form-item label="SNMP认证密码" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                            <el-form-item label="SNMP加密密码" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="SSHTitle">
                            <el-checkbox v-model="sshChecked">SSH</el-checkbox>
                        </div>
                        <div :class="sshChecked ? 'SSHContent show' : 'SSHContent hide'">
                            <el-form-item label="IPMI用户名" :required="true">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                        </div>
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
                name: "",
                region: "",
                type: ""
            },
            ipmiChecked: true,
            SNMPv1Checked: false,
            SNMPv3Checked: false,
            sshChecked: false
        }
    },
    methods: {
        modalClose() {
            this.$emit("update:visible", false); // 直接修改父组件的属性
        }
    },
    props: ["ifFoundSelf"]
}
</script>

<style>
/* 弹框内元素样式 */
.foundSelf{
    height: 100%;
    width: 100%;
}
.foundSelf .diaContent{
    box-sizing: border-box;
    padding: 20px 30px;
}
.foundSelf .diaContent .ipRange,
.foundSelf .diaContent .IPMIBox,
.foundSelf .diaContent .SNMPBox{
    width:100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-bottom:20px;
}
.foundSelf .diaContent .ipRange{
    height:100px;
} 
.foundSelf .diaContent .ipRange .ipTitle,
.foundSelf .diaContent .IPMIBox .IPMITitle,
.foundSelf .diaContent .SNMPBox .SNMPv1Title,
.foundSelf .diaContent .SNMPBox .SNMPv3Title,
.foundSelf .diaContent .SNMPBox .SSHTitle{
    height: 30%;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 15px;
    background: #eee;
    border-bottom: 1px solid #ccc;
}
.foundSelf .diaContent .SNMPBox .SNMPv3Title,
.foundSelf .diaContent .SNMPBox .SSHTitle{
    border-top:1px solid #ccc;
}
.foundSelf .diaContent .ipRange .ipContent,
.foundSelf .diaContent .IPMIBox .IPMIContent,
.foundSelf .diaContent .SNMPBox .SNMPv1Content,
.foundSelf .diaContent .SNMPBox .SNMPv3Content,
.foundSelf .diaContent .SNMPBox .SSHContent{
    box-sizing: border-box;
    padding:10px;
}
.foundSelf .diaContent .ipRange .show,
.foundSelf .diaContent .IPMIBox .show,
.foundSelf .diaContent .SNMPBox .show{
    display:block;
}
.foundSelf .diaContent .ipRange .hide,
.foundSelf .diaContent .IPMIBox .hide,
.foundSelf .diaContent .SNMPBox .hide{
    display:none;
}
.foundSelf .diaContent .ipRange .ipContent{
    height:70%;
}
.foundSelf .diaContent .ipRange .ipContent>input{
    width: 100%;
    border: none;
    outline: none;
}
.foundSelf .diaContent .btnsBox{
    text-align:center;
}
.foundSelf .diaContent .btnsBox .el-button{
    border-radius:0;
    padding:8px 20px;
}  
</style>
