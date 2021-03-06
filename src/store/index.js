import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
//modules
import packs from './packs/index'
import global from './global/index'
import buy from './buy/index'
//proxies
import ProductsProxy from '@/proxy/Products'
Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    packs,
    global,
    buy
  }
})

store.$axios = Axios.create({
  baseURL: 'https://api.fixgame.ru'
})

store.$submit = function({method = 'get', data = null, query = null, url = ''}) {
  const options = {
    method,
    url
  }

  if (data) {
    options.data = data
  }

  if (query) {
    options.url += '?'
    for (let key in query) {
      options.url += `${key}=${query[key]}&`
    }
    options.url.slice(0, -1) // remove lst &
  }

  return this.$axios(options)
    .then(res => res.data)
    .catch(err => {
      this.commit('global/setErrorText', 'Что-то пошло не так. Перезагрузите страницу :)')
      this.commit('global/setDevErrorText', err)
      throw new Error(err)
    })
}

store.$productsApi = new ProductsProxy(store)

export default store
