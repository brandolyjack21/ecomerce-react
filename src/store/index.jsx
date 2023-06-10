import { configureStore } from '@reduxjs/toolkit'
import count from './slice/count.slice'
import isLoading from './slice/isLoading.slice'
import  products  from './slice/products.slice'
import productDetail from './slice/productDetail.slice'

export default configureStore({
    reducer:{
        count: count,
        isLoading: isLoading,
        products: products,
        productDetail: productDetail,
    }
})