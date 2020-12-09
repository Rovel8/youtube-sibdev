import { createSlice } from "@reduxjs/toolkit";

type InitilaStateT = {
    isLoggedIn: boolean
    isInitialized: boolean
    menu: string
    uid: string
}

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
        menu: 'search'
    } as InitilaStateT,
    reducers: {
        logIn(state, action){
            state.isLoggedIn = action.payload
        },
        setUid(state, action){
            state.uid = action.payload
        },
        initializeApp(state, action){
            state.isInitialized = action.payload
        },
        setMenu(state, action){
            state.menu = action.payload
        }
    }
})

export const {logIn, initializeApp, setMenu, setUid} = loginSlice.actions

export default loginSlice.reducer