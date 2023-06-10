import { createSlice } from "@reduxjs/toolkit"
import { viewLoading } from "./isLoading.slice"
import axios from 'axios'
import getConfig from "../../utils/getconfig"

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

export const getFavoritesThunk = () => dispatch => {
    dispatch(viewLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig )
         .then(res => dispatch(addFavorite(res.data)))
         .catch(error => console.error(error))
         .finally(() => dispatch(viewLoading(false)))

}
