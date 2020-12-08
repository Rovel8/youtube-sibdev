import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './login-reducer'
import searchReducer from './search-reducer'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        search: searchReducer
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>