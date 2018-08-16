// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/iconfont/iconfont.css'
import './assets/css/style.css'
import axios from 'axios'
// import MyAxios from '@/plugins/MyAxios'

Vue.prototype.$ajax = axios
Vue.config.productionTip = false

// 注册element-ui插件
Vue.use(ElementUI)

// 注册Myaxios插件
// Vue.use(MyAxios);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
