import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { viewLoading } from "./isLoading.slice";

export const products = createSlice({
    name: 'products',
    initialState: [],
    reducers:{
        setProducts:(state, action) => {
            return action.payload

        }
    }
})

export const { setProducts } = products.actions
export default products.reducer

export const getproductsThunk = () => dispatch => {

    dispatch(viewLoading(true))

    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
         .then(res => dispatch(setProducts(res.data)))
         .catch(error => console.error(error))
         .finally( () => dispatch(viewLoading(false)) )
}

export const categoryFilterThunk = (id) => dispatch =>  {

    dispatch(viewLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
         .then(res => dispatch(setProducts(res.data)))
         .catch(error => console.error(error))
         .finally( () => dispatch(viewLoading(false)) )
  }

  export const nameFilterThunk = (name) => dispatch => {
    
    dispatch(viewLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1//products?title=${name}`)
         .then(res => dispatch(setProducts(res.data)))
         .catch(error => console.error(error))
         .finally( () => dispatch(viewLoading(false)) )
  }