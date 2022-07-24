import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'

// 引入markdown
import mavonEditor from 'mavon-editor' // 让Vue使用mavonEditor

import 'amfe-flexible/index.min.js' // 引入mavon-editor 就是上面所安装的
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
