<template>
    <div class="changePage">
        <div class="change">
            <h4>密码重置</h4>
            <form action="">
                <!-- 用户名 -->
                <div class="inputBox">
                    <span>
                        当前密码
                    </span>
                    <input type="password" placeholder="初始密码" v-model="initPwd" readonly >
                </div>
                <!-- 设置密码 -->
                <div class="inputBox">
                    <span>
                        新密码
                    </span>
                    <input type="password" placeholder="新密码" id="c_pwd" v-model="changePwd"
                           @keyup="checkChangePwd">
                    <img class="judge" :src="changePwdPic" alt=""
                             :style="changePwdShow ? 'display:block;' : 'display:none'">
                    <label class="msg" for="c_pwd"
                           :style="changePwdColor ? 'color:green;' : 'color:red'">
                           {{changePwdMsg}}
                    </label>
                </div>
                <!-- 确认密码 -->
                <div class="inputBox">
                    <span>
                        确认密码
                    </span>
                    <input type="password" placeholder="确认密码" id="c_qpwd" v-model="changeQpwd"
                           @keyup="checkChangeQpwd">
                    <img class="judge" :src="changeQpwdPic" alt=""
                        :style="changeQpwdShow ? 'display:block;' : 'display:none'">
                    <label class="msg" for="c_qpwd"
                           :style="changeQpwdColor ? 'color:green;' : 'color:red'">
                           {{changeQpwdMsg}}
                    </label>
                </div>
                <div class="btnBox">
                    <span class="btn" @click="clearInput">取消</span>
                    <span class="btn" @click="resetpassword">提交</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            initPwd: "",
            // 重置密码
            changePwd: "",
            changePwdMsg: "",
            changePwdPic: "../../../static/change/img/wrong.png",
            changePwdShow: false,
            changePwdColor: false,
            // 确认密码
            changeQpwd: "",
            changeQpwdMsg: "",
            changeQpwdPic: "../../../static/change/img/wrong.png",
            changeQpwdShow: false,
            changeQpwdColor: false,
        }
    },
    mounted(){
        this.showName()
    },
    methods: {
        saveMsg(uid, initPwd){
            var _this = this
            this.$axios.get("http://127.0.0.1/project/changePwd.php?uid="+uid+"&userpwd="+initPwd)
                       .then((res) => {
                           console.log(res)
                           switch(res.data){
                               case 1: _this.$router.push({path: "/home"});break;
                               case 0: alert('修改失败,请重新修改');break;
                           }
                       }).catch((err) => {
                           alert('请求失败，请重新发起请求')
                           console.log(err)
                       })
        },
        showName(){
            // 获取登录界面传递过来的用户id和密码，显示在页面上
            this.initPwd = this.$route.params.initPwd
        },
        // 密码验证
        checkChangePwd(){
            this.changePwdShow = true
            var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*`:;"'<>,.?/|(){}]{8,}$/
            if(reg.test(this.changePwd)){
                this.changePwdColor = true
                this.changePwdMsg = "密码验证通过"
                this.changePwdPic = "../../../static/login/img/right.png"
            }else{
                this.changePwdColor = false
                this.changePwdMsg = "密码不少于八位，包含大小写、数字、特殊字符"
                this.changePwdPic = "../../../static/login/img/wrong.png"
            }
        },
        // 确认密码验证
        checkChangeQpwd(){
            this.changeQpwdShow = true
            if(this.changeQpwd && this.changePwd && this.changeQpwd === this.changePwd){
                this.changeQpwdColor = true
                this.changeQpwdMsg = "确认密码通过"
                this.changeQpwdPic = "../../../static/login/img/right.png"
            }else{
                this.changeQpwdColor = false
                this.changeQpwdMsg = "两次输入密码不一致"
                this.changeQpwdPic = "../../../static/login/img/wrong.png"
            }
        },
        // 确认重置密码
        resetpassword(){
            if(this.changePwdColor && this.changeQpwdColor){
                console.log("wfsa")
                var uid = this.$route.params.uid
                this.saveMsg(uid, this.changePwd)
            }else{
                alert("密码格式错误，请重新设置")
            }
        },
        // 取消按钮
        clearInput(){
            this.changePwd = ""
            this.changeQpwd = ""
            this.changePwdMsg = ""
            this.changeQpwdMsg = ""
            this.changePwdShow = false
            this.changeQpwdColor = false
            this.changeQpwdShow = false
            this.changeQpwdColor = false
        }
    }
}
</script>
<style>
/* 全局样式 */
li{
    list-style:none;
}
.changePage h4{
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 6%;
    border-bottom: 1px solid #999;
    padding-left: 10px;
}
.changePage .inputBox{
    width: 90%;
    height: 16%;
    border-radius: 5px;
    margin: 5% auto 4%;
    color:#888;
    position:relative;
}
.changePage input{
    display: block;
    width: 77%;
    height: 100%;
    border-radius: 3px;
    border: none;
    padding-left:5px;
    outline:none;
    color:#999;
    border: 2px solid rgba(255,255,255,0.7);
    background:none;
    box-sizing:border-box;
}
.changePage .btnBox{
    width: 90%;
    height: 16%;
    margin: 10px auto;
    border: none;
    color: #fff;
    font-size: 16px;
    line-height: 35px;
    text-align: right;
    margin-top: 5%;
}
.changePage .btn{
    display: inline-block;
    width: 20%;
    height: 100%;
    background: rgba(14,61,255,1);
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
    box-sizing: border-box;
}
.changePage .icon{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 4px;
}
.changePage .msg{
    width: 77%;
    height: 20px;
    position: absolute;
    left: 70px;
    top: 32px;
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
}
.changePage .judge{
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 5%;
}

.changePage{
    width: 100%;
    height:100%;
    background-size: cover;
    overflow:hidden;
}
.changePage .change{
    box-sizing:border-box;
    width: 20%;
    background:rgba(0,0,0,0.3);
}

.changePage .change{
    width: 34%;
    height: 45%;
    margin: 0 auto;
    margin-top: 12%;
}
.changePage .change>form{
    width:100%;
    height:70%;
}
.changePage .change>form .inputBox>span{
    width: 15%;
    display: block;
    float: left;
    height: 100%;
    line-height: 34px;
    font-size: 14px;
}
.changePage .change>form .inputBox>input{
    float:left;
}
</style>
