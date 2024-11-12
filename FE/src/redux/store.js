import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Slice/cartSlice'

export const store = configureStore({
  reducer: {
    cart: productReducer 
  },
})

