import React from 'react'
import { IVideo } from '../state/search-reducer'
import '../styles/HomeGrid.css'

function HomeGrid({channelTitle, videoTitle, coverUrl}: Partial<IVideo>) {
    return (
        <div className="home-video--grid">
            <img className="home-video--grid" src={coverUrl} alt="Video Cover"/>
            <div className="home-video__text--grid">
                <span className="home-video__title--grid">{videoTitle}</span>
                <span className="home-video__channel--grid">{channelTitle}</span>
            </div>
        </div>
    )
}

export default HomeGrid
