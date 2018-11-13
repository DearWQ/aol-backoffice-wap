// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import i18n from './i18n'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

import store from './store'

//cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

//fa font
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false;
import router from './router'

//Dolphin
import Dolphin from './components/Dolphin_vue'
Vue.use(Dolphin);

//YDui
import YDui from 'vue-ydui';
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDui);

//muse ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

//common js
import Common from './components/common'
Vue.use(Common);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  render: h => h(App),
  template: '<App/>'
});
