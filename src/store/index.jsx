import { configureStore } from '@reduxjs/toolkit'
import count from './slice/count.slice'
import isLoading from './slice/isLoading.slice'
import  products  from './slice/products.slice'
import productDetail from './slice/productDetail.slice'
import favoriteProduct from './slice/favoriteProducts.slice'

export default configureStore({
    reducer:{
        count: count,
        isLoading: isLoading,
        products: products,
        productDetail: productDetail,
        favoriteProduct: favoriteProduct
    }
})