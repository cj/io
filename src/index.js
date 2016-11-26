import 'babel-polyfill'

import Vue from 'vue'
import App from 'views/App.vue'
import router from 'router'

const app = new Vue({
  router,
  ...App
})

export { app, router }
