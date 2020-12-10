import React from 'react'
import { IVideo } from '../state/search-reducer'
import '../styles/HomeList.css'

function HomeList({ channelTitle, videoTitle, coverUrl }: Partial<IVideo>) {
    return (
        <div className="home-video">
            <img className="home-video" src={coverUrl} alt="Video Cover" />
            <div className="home-video__text">
                <span className="home-video__title">{videoTitle}</span>
                <span className="home-video__channel">{channelTitle}</span>
            </div>
        </div>
    )
}

export default HomeList
