import React from 'react'
import '../styles/HomeStart.css'
import { Input } from 'antd';
import { getVideos } from '../API/API';
import { setTotalResults, setVideos, setQuery } from '../state/search-reducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

function HomeStart() {

    const dispatch = useDispatch()

    const history = useHistory()

    const onSearch = async (value: string) => {
        try {
            const result = await getVideos(value)
            dispatch(setTotalResults(result.data.pageInfo.totalResults))
            const videos: any = []
            result.data.items.forEach((item: any) => {
                const video: any = {}
                video.id = item.id.videoId
                video.channelTitle = item.snippet.channelTitle
                video.videoTitle = item.snippet.title
                video.description = item.snippet.description
                video.coverUrl = item.snippet.thumbnails.medium.url
                videos.push(video)
            })
            dispatch(setVideos(videos))
            dispatch(setQuery(value))
            console.log(result)
            history.push('/search')
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <main className="home-start">
            <div className="home-start__container">
                <h1 className="home-start__title">Поиск видео</h1>
                <Search size='large' placeholder="Что хотите посмотреть?" onSearch={onSearch} enterButton="Найти" />
            </div>
        </main>
    )
}

export default HomeStart
