import Vue from 'vue'
import App from './App.vue'
import api from './api'
import router from '@/router'
import '@/assets/css/reset.css'
// WebSocket处理
import ws from '@/utils/websocket.js'

import { Menu,MenuItem,Submenu,Avatar,Tooltip,Message,Image,Result  } from 'element-ui';


Vue.prototype.$ws = ws

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Tooltip)
Vue.use(Image)
Vue.use(Result)

Vue.prototype.$message=Message;
Vue.config.productionTip = false
Vue.prototype.$http = api;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
