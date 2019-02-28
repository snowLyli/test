<template>
    <div class="addGroup">
        <el-dialog :visible.sync="ifAddGroup" width="25%" center :before-close="modalClose">
            <span slot="title"  class="dialog-title">
                <p>批量添加资产</p>
            </span>
            <p class="filespec">批量添加资产,请上传一个XLS格式文件</p>
            <div class="diaContent">
                <span class="addPic">
                    <input type="file">
                    <!-- <img src="/static/property/img/add_group.png" alt=""> -->
                    <p>请选择文件路径</p>
                </span>
            </div>
            <span class="downLoad">
                <button>批量添加资产示例及模板</button>
                <!-- <el-button type="primary" @click="ifAddGroup = false">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods: {
        modalClose() {
            this.$emit("update:visible", false); // 直接修改父组件的属性
        }
    },
    props: ["ifAddGroup"]
}
</script>

<style>
/* 弹框内元素样式 */
.addGroup .filespec{
    margin-top: 15px;
    padding-left: 10px;
}
.addGroup .diaContent{
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10% 31%;
    border-bottom: 1px solid #ccc;
}
.addGroup .diaContent .addPic{
    display:block;
    width:120px;
    height:120px;
    background:#2C86C6;
    border:1px solid #0F6CAF;
    position: relative;
}
.addGroup .diaContent .addPic>img{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -30px;
    margin-top: -30px;
}
.addGroup .diaContent .addPic>p{
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    text-align: center;
    color: #fff;
}
.addGroup .diaContent .addPic>input[type="file"]{
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
}
.addGroup .downLoad{
    display: block;
    width: 100%;
    text-align: center;
    margin-top:20px;
}
.addGroup .downLoad button{
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: #333;
    font-size: 14px;
}
</style>
