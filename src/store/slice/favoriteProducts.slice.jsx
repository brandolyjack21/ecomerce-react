import { createSlice } from "@reduxjs/toolkit"
import { viewLoading } from "./isLoading.slice"
import axios from 'axios'
import getConfig from "../../utils/getConfig"

export const favoriteProduct = createSlice({
    name: 'favoriteProduct',
    initialState: [],
    reducers:{
        addFavorite:(state, action) => {
            return action.payload
        }
    }
})

export const { addFavorite } = favoriteProduct.actions
export default favoriteProduct.reducer

export const getFavoritesThunk = () => (dispatch) => {
    dispatch(viewLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig() )
         .then(res => {
             dispatch(addFavorite(res.data))
         })
         .catch(error => console.error(error))
         .finally(() => dispatch(viewLoading(false)))

}

export const addCardThunk = (data) => dispatch => {
    dispatch(viewLoading(true))
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
         .then(() => getFavoritesThunk())
         .catch(error => console.error(error))
         .finally(dispatch(viewLoading(false)))
}

export const updateQuantityThunk = (id, quantity ) => dispatch => {
    dispatch(viewLoading(true))
    const body = {
        quantity: quantity
    }
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`,body, getConfig())
         .then( () => dispatch(getFavoritesThunk()))
         .catch(error => console.error(error))
         .finally( dispatch(viewLoading(false)) )
}
