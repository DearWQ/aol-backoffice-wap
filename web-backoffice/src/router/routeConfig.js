import IndexPage from '../page/index.vue'
import LoginPage from '../page/login/login.vue'
import NotFound from '../page/notFound.vue'

export default {
  routeConfig:[
    {
      path: '/view/index',
      name: 'index',
      component: IndexPage,
      meta: {
        title: '首页'
      }
    },

    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
  ],

  authType: 'white',  //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [
    /^\/login/
  ],
  blackList: [

  ],

}
