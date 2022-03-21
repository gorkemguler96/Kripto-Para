import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";




export const coinSlice = createSlice({
    name: 'coin',
    initialState: {
        items: [],
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    },
    extraReducers: {}
})

export const { } = coinSlice.actions

export default coinSlice.reducer
