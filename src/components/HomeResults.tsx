import React, { useState, useEffect } from 'react'
import '../styles/HomeResults.css'
import { Form, Input, Button, Modal, Select } from 'antd';
import { getVideos } from '../API/API';
import { setTotalResults, setVideos, setQuery, IVideo } from '../state/search-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../state/store';
import { UnorderedListOutlined, AppstoreOutlined, HeartOutlined } from '@ant-design/icons';
import HomeList from './HomeList';
import HomeGrid from './HomeGrid';
import SearchModal from './SearchModal';
// import { Field } from 'formik';
import { db } from '../firebase/firebase-config';
import firebase from 'firebase'
import {nanoid} from 'nanoid'

const { Search } = Input;

export interface IFavorite{
    label: string
    maxResults: number
    query: string
    sortBy: string
}

function HomeResults() {

    const dispatch = useDispatch()
    const history = useHistory()
    const query: any = useSelector<RootState>(state => state.search.query)
    const totalResults = useSelector<RootState>(state => state.search.totalResults)
    const videosTotal: any = useSelector<RootState>(state => state.search.videos)
    const uid = useSelector<RootState>(state => state.login.uid)

    const [grid, setGrid] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleSubmit = async (e: IFavorite) => {
        await db.collection(`users`).doc(`${uid}`).set(
                {
                    favorites: firebase.firestore.FieldValue.arrayUnion({
                        query: query,
                        maxResults: e.maxResults,
                        sortBy: e.sortBy,
                        label: e.label
                    })
                }
                
            ,{merge: true})
        console.log(e)
    }

    const initialvalues = {
        query: `${query}`,
        label: '',
        sortBy: 'rating',
        maxResults: 0
    }

    const suffix = (
        <HeartOutlined
          onClick={() => setIsModalVisible(true)}
          style={{
            fontSize: 20,
            cursor: "pointer",
            color: '#1890ff',
          }}
        />
      );

    if(!query){
        return <Redirect to='/' />
    }


    return (
        <main className="home-results">
            <div className="home-results__container">
                <SearchModal title='Сохранить запрос'
                 initialvalues={initialvalues}
                 isModalVisible={isModalVisible}
                 setIsModalVisible={setIsModalVisible}
                 handleSubmit={handleSubmit}>
                     <Form.Item label='Запрос' name='query'>
                        <Input size="large" />
                     </Form.Item>
                     <Form.Item
                      label='Название'
                      rules={[{required: true, message: 'Укажите название запроса'}]}
                      name="label">
                        <Input size="large" name="label" id="label" placeholder="Укажите название" />
                     </Form.Item>
                     <Form.Item label='Сортировать' name='sortBy'>
                        <Select size="large">
                         <Select.Option value="date">Дате</Select.Option>
                         <Select.Option value="rating">Рейтингу</Select.Option>
                         <Select.Option value="relevance">Релевантности</Select.Option>
                         <Select.Option value="title">Названию</Select.Option>
                         <Select.Option value="videoCount">Количество видео</Select.Option>
                         <Select.Option value="viewCount">Количество просмотров</Select.Option>
                     </Select>
                     </Form.Item>
                 </SearchModal>
                <h2 className="home-result__title">Поиск видео</h2>
                <Search suffix={suffix} size='large' placeholder="Что хотите посмотреть?" onSearch={onSearch} enterButton="Найти" />
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
                            grid ? videosTotal.map((item: IVideo) => (<HomeGrid key={item.id} channelTitle={item.channelTitle} coverUrl={item.coverUrl} videoTitle={item.videoTitle} />))
                            : videosTotal.map((item: IVideo) => (<HomeList key={item.id} channelTitle={item.channelTitle} coverUrl={item.coverUrl} videoTitle={item.videoTitle} />))
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}

export default HomeResults
