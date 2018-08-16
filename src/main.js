// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/iconfont/iconfont.css'
import './assets/css/style.css'
import jsonp from 'jsonp'
import axios from 'axios'
// import { resolve } from 'url'; 不知道
// import MyAxios from '@/plugins/MyAxios'

Vue.prototype.$ajax = axios
Vue.config.productionTip = false

// axios扩展的jsonp方法
axios.jsonp = (...args) => {
  return new Promise((resolve, reject) => {
    jsonp(...args, function (err, data) {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

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
