// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'

// css样式
import 'element-ui/lib/theme-chalk/index.css'
import '../static/public/css/element.css'
import "../static/public/css/comCommon.css"


Vue.prototype.$echarts = echarts
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

// 判断由那个页面进入当前页
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (from.fullPath === "/") {
        console.log(from.fullPath)
        // 如果是首页则发送请求
        axios.get("https://nsa.sugon.com/web_visitor")
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        next();
      }else{
        next()
      }
    } else {
      next();
    }
})

// 控制页面必须有登录页面进入
router.beforeEach((to, from, next) => {
  // 获取登录状态
  var arr = document.cookie.split("; ")
  var isLogin = 0
  arr.map((item, index) => {
    if(item.split("=")[0] == "isLogin"){
      isLogin = item.split("=")[1]
    }
  })
  if (to.meta.requireAuth) {
    if (isLogin) {
      next();
    }else{
      next({
        path: "/login"//指向为你的登录界面
      });
    }
  } else {
    next();
  }

  if (to.fullPath === "/login") {
    if (isLogin) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



