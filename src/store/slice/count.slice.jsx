import { createSlice } from "@reduxjs/toolkit"

export const count = createSlice ({
    name: 'count',
    initialState: '',
    reducers:{
        increment:(state, action) =>{
            return action.payload
        }
    }
})
export const { increment } = count.actions
export default count.reducer
