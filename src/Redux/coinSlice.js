import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchCoins = createAsyncThunk('coin/getCoinsAsync', async (inputNumber) => {
    const res = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
    return res.data
})


export const coinSlice = createSlice({
    name: 'coin',
    initialState: {
        items: [],
        coinsAmount: 0,
        money:100000,
        addCoins:[],
        addCoinsAmount: 0,
        page:1
    },
    reducers: {
        money: (state,action) => {
            state.money -= action.payload
        },
        nextPage:( state,action) => {
            state.page++
        },
        coinAmount: (state,action)=> {
            state.addCoinsAmount += action.payload
        },
        zeroCoinAmount: (state,action)=>{
            state.addCoinsAmount = action.payload
        },
        moneySell: (state,action) => {
          state.money += action.payload
        },
        addToCoins: (state,action) => {
            state.addCoins = action.payload
        },
    },
    extraReducers: {
        [fetchCoins.fulfilled] : (state,action) => {
            state.items = action.payload
        },
    }
})

export const {money, addToCoins,moneySell, coinAmount, nextPage,zeroCoinAmount } = coinSlice.actions

export default coinSlice.reducer
