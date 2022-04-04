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
        page:1,
        checkProfile:false,
        accountProfile:[],
        accountProfileOnly:false,
        darkMode:false
    },
    reducers: {
        money: (state,action) => {
            state.money -= action.payload
        },
        changeDarkMode: (state,action) => {
            state.darkMode = action.payload
        },
        checkProfile: (state,action)=>{
          state.checkProfile = action.payload
        },
        accountProfileOnly: (state,action)=>{
            state.accountProfileOnly = action.payload
        },
        accountProfile: (state,action)=>{
            state.accountProfile = action.payload
        },
        nextPage:( state,action) => {
            state.page++
        },
        logOutPage:( state,action) => {
            state.page = action.payload
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

export const {money, logOutPage, changeDarkMode, addToCoins,moneySell, coinAmount, nextPage,zeroCoinAmount, accountProfile, checkProfile,accountProfileOnly } = coinSlice.actions

export default coinSlice.reducer
