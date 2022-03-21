import { configureStore } from '@reduxjs/toolkit'
import coinSlice from './coinSlice'

export default configureStore({
    reducer: {
            coin: coinSlice
    },
})
