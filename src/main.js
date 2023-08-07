import Vue from 'vue'
import App from './App.vue'
import api from './api'
import router from '@/router'
import '@/assets/css/reset.css'
// WebSocket处理
import ws from '@/utils/websocket.js'

import { Form,FormItem,Input,Avatar,Button,Message,Image,Dialog} from 'element-ui';


Vue.prototype.$ws = ws

Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Input)
Vue.use(Image)
Vue.use(Button)

Vue.prototype.$message=Message;
Vue.config.productionTip = false
Vue.prototype.$http = api;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
