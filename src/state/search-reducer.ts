import { createSlice } from "@reduxjs/toolkit";

export interface IVideo {
        id: string
        channelTitle: string
        videoTitle: string
        description: string
        coverUrl: string
}

export type InitilaStateT = {
    totalResults: number
    query: string
    videos: Array<IVideo>
}

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        videos: [],
        totalResults: 0,
        query: ''
    } as InitilaStateT,
    reducers: {
        setVideos(state, action){
            state.videos = action.payload
        },
        setTotalResults(state, action){
            state.totalResults = action.payload
        },
        setQuery(state, action){
            state.query = action.payload
        }
    }
})

export const {setVideos, setTotalResults, setQuery} = searchSlice.actions

export default searchSlice.reducer