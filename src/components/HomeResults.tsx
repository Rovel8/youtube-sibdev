import React, { useState } from 'react'
import '../styles/HomeResults.css'
import { Input } from 'antd';
import { getVideos } from '../API/API';
import { setTotalResults, setVideos, setQuery, IVideo } from '../state/search-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../state/store';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import HomeList from './HomeList';
import HomeGrid from './HomeGrid';

const { Search } = Input;

function HomeResults() {

    const dispatch = useDispatch()
    const history = useHistory()
    const query = useSelector<RootState>(state => state.search.query)
    const totalResults = useSelector<RootState>(state => state.search.totalResults)
    const videosTotal: any = useSelector<RootState>(state => state.search.videos)

    const [grid, setGrid] = useState(false)

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
                video.coverUrl = item.snippet.thumbnails.default.url
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
        <main className="home-results">
            <div className="home-results__container">
                <h2 className="home-result__title">Поиск видео</h2>
                <Search size='large' placeholder="Что хотите посмотреть?" onSearch={onSearch} enterButton="Найти" />
                <div className="home-results__results results-home">
                    <section className="results-home__header">
                        <div className="results-home__info">
                            <h3 className="results-home__label">Видео по запросу "{query}"</h3>
                            <h3 className="results-home__total"> {totalResults}</h3>
                        </div>
                        <div className="results-home__view">
                            <UnorderedListOutlined style={{cursor: "pointer"}} onClick={() => setGrid(false)} />
                            <AppstoreOutlined onClick={() => setGrid(true)} style={{marginLeft: "18px", cursor: "pointer"}} />
                        </div>
                    </section>
                    <section className={grid ? "results-home__body--grid" : "results-home__body"}>
                        {
                            grid ? videosTotal.map((item: IVideo) => (<HomeGrid channelTitle={item.channelTitle} coverUrl={item.coverUrl} videoTitle={item.videoTitle} />))
                            : videosTotal.map((item: IVideo) => (<HomeList channelTitle={item.channelTitle} coverUrl={item.coverUrl} videoTitle={item.videoTitle} />))
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}

export default HomeResults
