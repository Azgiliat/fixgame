import Shop from "../pages/Shop";
import PaymentResult from '@/pages/PaymentResult'
import NewBlocks from '@/pages/NewBlocks'

export default [
  {
    path: '/',
    name: 'main',
    component: Shop,
  },
  {
    path: '/case',
    name: 'Case',
    component: NewBlocks
  },
  {
    path: '/payment',
    name: 'result',
    component: PaymentResult,
    children: [
      {
        path: 'fail',
        name: 'fail',
        component: () => import('@/components/PaymentResult/Fail')
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('@/components/PaymentResult/Success')
      }
    ]
  }
]


