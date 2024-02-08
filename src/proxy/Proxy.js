export default class Proxy {
  constructor(store, path) {
    this.store = store
    this.path = path
  }

  submit({method = 'get', data = null, query = null, endpoint = ''}) {
    const options = {
      method,
      query,
      data,
      url: `${this.path}${endpoint ? '/' : ''}${endpoint}`
    }
    console.log(this.store.$submit(options))
    return this.store.$submit(options)
  }
}
