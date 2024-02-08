import Proxy from './Proxy'

export default class ProductsProxy extends Proxy {
  constructor (store) {
    super(store, 'apipayment')
  }

  getProducts () {
      return this.submit({endpoint: "productGroups"})
  }

  checkAvailability (id) {
    return this.submit({
      method: 'post',
      data: {
        productId: id
      },
        endpoint: 'products/availability'
    })
  }

  buyProducts ({coupon = '', username = '', email = '', products = []}) {
    const data = {
      player: {
        username,
        email
      },
      products
    }

    if (coupon) {
      data.coupon = coupon
    }

    return this.submit({
        method: 'post',
        endpoint: 'products/checkout',
        data
    })
  }

  checkLastPurchases(orderId) {
    return this.submit({
        endpoint: `products/lastPurchasedValues/${orderId}`
    })
  }
}
