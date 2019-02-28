<template>
    <div class="loginPage">
        
        <div class="login">
            <div class="title">
                曙光网络安全态势感知系统
            </div>
            <form>
                <div class="inputBox">
                    <input type="text" placeholder="用户名" id="l_username" v-model="loginName">
                </div>
                <div class="inputBox">
                    <input type="password" placeholder="输入密码" id="l_pwd" v-model="loginPwd">
                </div>
                <div class="codeBox">
                    <input type="text" placeholder="验证码" id="code" v-model="loginCode">
                    <span class="codePic">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </span>
                    <img class="refreshBtn" src="../../../static/login/img/refresh.png" alt="" @click="refreshCode">
                </div>
                <div class="inputBox">
                    <input type="checkbox" id="remmber" v-model="checked">
                    <label for="remmber" class="remmberLabel">记住密码</label>
                    <a href="##">忘记密码？</a>
                </div>
                <input type="button" class="btn" value="登录" @click="loginSuccess">
            </form>
        </div>
    </div>
</template>

<script>
import SIdentify from "@/components/public/Identify.vue"
export default {
    name: "codetest",
    data(){
        return{
            // 图片验证码参数
            identifyCodes: "1234567890",
            identifyCode: "",

            // 登录用户名
            loginName: "",
            loginNameShow: false,
            loginNameColor: false,

            // 登录密码
            loginPwd: "",
            loginPwdShow: false,
            loginPwdColor: false,
            
            // 验证码
            loginCode: "",
            loginCodeColor: false,
            loginCodeShow: false,

            // 记住密码
            checked: ""
        }
    },
    created(){
        this.enterLogin()
    },
    mounted(){
        // 验证码调用
        this.identifyCode = ""
        this.makeCode(this.identifyCodes, 4)
        // 判断页面加载后是否显示用户名和密码
        this.pageLoad()
    },
    methods: {
        // 回车登录
        enterLogin(){
            var that = this
            document.onkeypress = function(e) {
                var keycode = document.all ? event.keyCode : e.which;
                if (keycode == 13) {
                    if(that.loginName == "admin" && that.loginPwd == "Sugon;123"){
                        window.document.cookie = "isLogin=1"
                        that.$router.push({path: "/home"})
                    }
                }
            }
        },

        // 从后端获取用户名和密码并核对
        getUsersMsg(){
            var  _this = this
            if(this.loginName == "admin" && this.loginPwd == "Sugon;123"){
                // localStorage.setItem("isLogin",1)
                window.document.cookie = "isLogin=1"
                this.$router.push({path: "/home"})
            }
            /*this.$axios.get("http://127.0.0.1/project/login.php?username="+username+"&userpwd="+userpwd)
                       .then((res) => {
                            console.log(res.data)
                            switch(res.data){
                                case "pwdErr": alert("密码错误");break;
                                case "nameErr": alert("用户名不存在");break;
                                // 若用户名存在，则判断输入密码是否为初始密码
                                default: {
                                    if(userpwd == "Sugon;123"){
                                        this.$router.push({
                                            name: "ChangePassword",
                                            params: {
                                                uid: res.data,
                                                initPwd: userpwd
                                            }
                                        })
                                    }else{
                                        _this.$router.push({path: "/home"})
                                    }
                                }
                            }
                       }).catch((err) => {
                            alert("数据请求错误")
                            return false
                       })
        */},

        // 图片验证码相关方法
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log(this.identifyCode);
        },

        // 登录用户名
        checkLoginName(){
            this.loginNameShow = true
            if(this.loginName.length > 0){
                this.loginNameColor = EXT_texture_filter_anisotropic
            }else{
                this.loginNameColor = false
            }
        },

        // 登录密码
        checkLoginPwd(){
            this.loginPwdShow = true
            var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*`:;""<>,.?/|(){}]{8,}$/
            if(reg.test(this.loginPwd) || this.loginPwd == "Sugon;123"){
                this.loginPwdColor = true
            }else{
                this.loginPwdColor = false
            }
        },

        // 登录验证码
        checkLoginCode(){
            this.loginCodeShow = true
            if(this.loginCode == this.identifyCode){
                this.loginCodeColor = true
            }else{
                this.loginCodeColor = false
            }
        },

        // 记住密码
        remmberPwd(){
            this.ifRemmber = !this.ifRemmber
            if(this.ifRemmber){
                console.log("ok")
            }
        },

        // 登录
        loginSuccess(){
            this.getUsersMsg()
            if(this.checked){
                console.log("记住登录信息")
                this.setCookie(this.loginName,this.loginPwd,this.checked,30)
            }else{
                console.log("清除登信息")
                this.setCookie("","","",-1)
            }
            // 判断用户密码是否为初始密码，如果是则跳转修改密码页面，否则核对用户名和密码否正确，
            // 若正确跳转至首页，否则提示用户名或密码不正确
            // if(this.loginNameColor && this.loginPwdColor && this.loginCodeColor){
            //     this.getUsersMsg(this.loginName, this.loginPwd)
            // }else if(!this.loginNameColor){
            //     alert("用户名格式错误，请重新输入用户名")
            // }else if(!this.loginPwdColor){
            //     alert("密码格式错误，请重新输入密码")
            // }else if(!this.loginCodeColor){
            //     alert("验证码错误，请重新输入验证码")
            // }
        },

        //设置cookie
        setCookie(name,pwd,remmber,days) {
            var now = new Date();//获取时间
            now.setTime(now.getTime() + 24*60*60*1000*days);//保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + name + ";path=/;expires=" + now.toGMTString();
            window.document.cookie = "userPwd" + "=" + pwd + ";path=/;expires=" + now.toGMTString();
            window.document.cookie = "remmber" + "=" + remmber + ";path=/;expires=" + now.toGMTString();
        },
        // 读取cookie
        getCookie() {
            if (document.cookie.length>0) {
                var arr = document.cookie.split("; ")
                arr.map((item,index) => {
                    var brr = item.split("=")
                    if("userName" == brr[0]){
                        this.loginName = brr[1]
                    }
                    if("userPwd" == brr[0]){
                        this.loginPwd = brr[1]
                    }
                    if("remmber" == brr[0]){
                        this.checked = brr[1]
                    }
                    console.log(brr[1])
                })
                this.checkLoginName()
                this.checkLoginPwd()
            }
        },
        // 页面加载是否显示判断框
        pageLoad(){
            this.getCookie()
        }
    },
    components: {
        SIdentify
    }
}
</script>
<style>
/* 全局样式 */
li{
    list-style:none;
}
.loginPage h4{
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: normal;
}
.loginPage .inputBox{
    display:inline-block;
    width: 60%;
    height: 18%;
    border-radius: 5px;
    margin: 0 auto 2%;
    color:#888;
    position:relative;
}
.loginPage input{
    width: 77%;
    height: 100%;
    border: none;
    padding-left:5px;
    outline:none;
    color:#555;
    background:none;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    font-size:16px;
}
.loginPage .btn{
    display:block;
    width: 47%;
    height: 18%;
    margin: 5px auto 0;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: #3071a9;
    border-color: #285e8e;
    font-size: 18px;
    outline:none;
    cursor:pointer;
    box-sizing: border-box;
    text-align:center;
}
.loginPage a{
    color:#fff;
    text-decoration: none;
    font-size:12px;
}
.loginPage .icon{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10%px;
    right: 10%;
    top: 20%;
}
.loginPage .msg{
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    top: 32px;
    font-size: 12px;
    line-height: 20px;
    overflow:hidden;
    padding: 0 14px 0 69px;
    box-sizing: border-box;
}
.loginPage .judge{
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 5px;
}

.loginPage{
    width: 100%;
    height: 100%;
    overflow:hidden;
}
.loginPage .login .title{
    width:100%;
    height:18%;
    margin-top:4%;
    text-align: center;
    font-style: initial;
    font-family: 微软雅黑;
    font-weight: bold;
    font-size: 30px;
    color: rgb(0, 151, 212);
}

.loginPage .login{
    width: 40%;
    height: 50%;
    margin: 0 auto;
    margin-top: 10%;
    text-align:center;
    background-color: #EDEDED;
    border: 1px solid #dedede;
    border-radius: 5px;
    padding-bottom:1%;
    box-sizing: border-box;
}
.loginPage .login>form{
    width:100%;
    height: 75%;
}
.loginPage .login>form .inputBox>span,.loginPage .login>form .codeBox>.codeText{
    width: 15%;
    display: block;
    float: left;
    height: 100%;
    line-height: 34px;
    font-size: 14px;
    text-align: right;
    margin-right: 2%;
    color:#999;
}
.loginPage .login>form .codeBox{
    width: 47%;
    height: 18%;
    margin: 0 auto 2%;
    position:relative;
}
.loginPage .login>form .codeBox>input{
    width: 37%;
    height:100%;
    float:left;
    outline:none;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}
.loginPage .login>form .codeBox>.codePic{
    display:block;
    width: 20%;
    height:100%;
    float:left;
    margin-left:13px;
}
.loginPage .login>form .codeBox .refreshBtn{
    margin-top: 15px;
    width: 20px;
    height: 20px;
}
.loginPage .login>form .codeBox>.msg{
    width:43%;
}
.loginPage .login>form>.inputBox:nth-child(4){
    height: 10%;
    border: none;
    text-align: center;
    margin: 0 3%;
}
.loginPage .login>form>.inputBox:nth-child(4) #remmber{
    display:inline;
    width:12px;
    vertical-align:middle;
}
.loginPage .login>form>.inputBox:nth-child(4) .remmberLabel{
    font-size: 12px;
    color: #999;
}
.loginPage .login>form>.inputBox:nth-child(4) .remmberLabel:hover{
    color:red;
    text-decoration: underline;
}
.loginPage .login>form>.inputBox:nth-child(4) a{
    margin-left: 38%;
    color:#888;
}
</style>
