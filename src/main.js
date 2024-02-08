import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueMq from 'vue-mq'
//global styles
import '@/assets/css/typography.scss'
//global classes like container etc
import '@/assets/css/classes.scss'

//newblocks
import '@/assets/css/newblocks.scss'
//building sprite
const req = require.context('@/assets/icons', true)
req.keys().forEach(function (key) {
  req(key)
})
//directives
const directives = require.context('@/directives', true)
directives.keys().forEach(function (key) {
  directives(key)
})
//fonts
import '@/assets/css/fonts.scss'
//normalize
import '@/assets/css/normalize.css'

//import widths from css
import {laptopWidth, desktopWidth} from '@/assets/css/vars.scss'
//import lib(https://github.com/phegman/v-scroll-lock)
import VScrollLock from 'v-scroll-lock'

Vue.use(VScrollLock)

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: parseInt(laptopWidth.replace('px', ''), 10),
    laptop: parseInt(desktopWidth.replace('px', ''), 10),
    desktop: Infinity
  }
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
