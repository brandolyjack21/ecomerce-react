import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { viewLoading } from './isLoading.slice'

export const productDetail = createSlice({
    name: 'productDetail',
    initialState: '',
    reducers:{
        setProductDetail:(state, action) => {
            return action.payload
        }
    }
})

export const { setProductDetail } = productDetail.actions
export default productDetail.reducer

export const productDetailOne = (id) => dispatch => {
    dispatch(viewLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
         .then(res => dispatch(setProductDetail(res.data)))
         .catch(error => console.error(error))
         .finally( () => dispatch(viewLoading(false)) )
}
