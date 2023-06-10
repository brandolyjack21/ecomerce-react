import { createSlice } from '@reduxjs/toolkit'

export const isLoading =  createSlice({
    name: 'isLoading',
    initialState: false,
    reducers:{
        viewLoading: (state, action) => {
           return action.payload
        } 
    }
})

export const { viewLoading } = isLoading.actions
export default isLoading.reducer
