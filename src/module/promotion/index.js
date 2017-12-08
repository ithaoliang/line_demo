// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import resetCss from '@/assets/css/reset.css'
import Vue from 'vue'
import App from './App'
// import router from '@/router'
// import {sync} from 'vuex-router-sync'
// import store from '@/store'
// import api from '@/api'

Vue.config.productionTip = false

// sync the router with the vuex store.
// this registers `store.state.route`
// sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})

//执行初始化工作
// store.dispatch(enumAction.init)

// api.getPageConfig((isSuccess,data,err)=>{
//   console.log('getPageConfig',data)
// })
