import routes from './routes'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history'
})


// routes.afterEach(to => {
//   if (to.name == 'main') {
//
//
//     alert(1)
//
//   }
// })