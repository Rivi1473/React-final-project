import { configureStore } from '@reduxjs/toolkit'
import ordersSlice from '../features/orders/ordersSlice'
import productsSlice from '../features/products/productsSlice'
import usersSlice from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
       product:productsSlice,
       user:usersSlice,
       order:ordersSlice
  },
})