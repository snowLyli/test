import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home' // 首页
import Test from '@/components/home/testMap' // 首页
import Login from '@/components/login/Login' // 登录
import ChangePassword from '@/components/login/ChangePassword' // 密码修改
// 攻击态势
import DDoS from '@/components/attack/DDoS' 
import Intrusion from '@/components/attack/Intrusion'
import Virus from '@/components/attack/Virus'
import SandBox from '@/components/attack/SandBox'
// 流量态势
import Apply from '@/components/flow/Apply'
import Domain from '@/components/flow/Domain'
import Overall from '@/components/flow/Overall'
import Area from '@/components/flow/Area'
import Users from '@/components/flow/Users'
import FlowLog from '@/components/flow/Flowlog'
// 资产态势
import Alarm from '@/components/property/Alarm'
import Control from '@/components/property/Control'
import Hole from '@/components/property/Hole'
import Manage from '@/components/property/Manage'
import AlarmLog from '@/components/property/AlarmLog'
// 资产态势中子页面
import Gv6OverView from '@/components/property/serverDetail/gv6/OverView'
import Gv6CPU from '@/components/property/serverDetail/gv6/CPU'
import Gv6Memory from '@/components/property/serverDetail/gv6/Memory'
import Gv6Disk from '@/components/property/serverDetail/gv6/Disk'
import Gv6Network from '@/components/property/serverDetail/gv6/NetWork'
import Gv6Course from '@/components/property/serverDetail/gv6/Course'
// 行为感知
import ProDiscern from '@/components/behave/ProDiscern'
import AppDiscern from '@/components/behave/AppDiscern'
import Restore from '@/components/behave/Restore'
// 内容感知
import PicFeel from '@/components/content/PicFeel'
import TextFeel from '@/components/content/TextFeel'
import VideoFeel from '@/components/content/VideoFeel'
// 系统管理
import SysControl from '@/components/system/SysControl'
import AlaLog from '@/components/system/AlarmLog'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {path: '/',redirect: '/home'},
    {path: '/login',name: "Login", component: Login},
    {path: '/changepassword',name: "ChangePassword",component: ChangePassword},
    {path: '/home',name: "Home",component: Home, // 路由守卫
     meta: { requireAuth: true },
     props: true
    },

    {path: '/test',component: Test},
    // 攻击
    {path: '/ddos', name: "DDoS", component: DDoS},
    {path: '/intrusion', name: "Intrusion", name: 'Intrusion',component: Intrusion},
    {path: '/virus', name: "Virus", component: Virus},
    {path: '/sandbox', name: "SandBox", component: SandBox},
    // 流量
    {path: '/apply',component: Apply},
    {path: '/domain',component: Domain},
    {path: '/overall',component: Overall},
    {path: '/area',component: Area},
    {path: '/users',component: Users},
    {path: '/flowlog',component: FlowLog},
    // 资产
    {path: '/alarm',component: Alarm},
    {path: '/control',component: Control},
    {path: '/hole',component: Hole},
    {path: '/manage',component: Manage},
    {path: '/gv6overview',component: Gv6OverView},
    {path: '/gv6cpu',component: Gv6CPU},
    {path: '/gv6memory',component: Gv6Memory},
    {path: '/gv6disk',component: Gv6Disk},
    {path: '/gv6network',component: Gv6Network},
    {path: '/gv6course',component: Gv6Course},
    {path: '/alarmlog',component: AlarmLog},
    // 行为
    {path: '/prodiscern',component: ProDiscern},
    {path: '/appdiscern',component: AppDiscern},
    {path: '/restore',name: "Restore",component: Restore},
    // 内容
    {path: '/picfeel',component: PicFeel},
    {path: '/textfeel',component: TextFeel},
    {path: '/videofeel',component: VideoFeel},
    // 系统管理
    {path: '/syscontrol',component: SysControl},
    {path: '/alalog',component: AlaLog},
  ]
})
export default router
