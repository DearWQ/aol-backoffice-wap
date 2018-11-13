//Created by wangshuyi on 07/03/2018.

'use strict';

import MapComponent from './Dol-location.vue'
import LocationComponent from './Dol-map.vue'

// 导出组件
export default {
  install: function(Vue){
    Vue.component('dol-map',MapComponent);
    Vue.component('dol-location',LocationComponent);
  },
}
