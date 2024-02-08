import {setLoadingStatus} from '@/utils/storeMixin'

export {setLoadingStatus}

export function setPacks(state, payload) {
  state.packs = payload
}

export function setProductToBuy(state, payload) {
  state.productToBuyId = payload
}

export function openForm(state) {
  state.openForm = true;
}

export function closeForm(state) {
  state.openForm = false;
}
