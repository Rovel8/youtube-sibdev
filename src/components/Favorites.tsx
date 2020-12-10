import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase/firebase-config'
import { RootState } from '../state/store'
import '../styles/Favorites.css'
import { IFavorite } from './HomeResults'
import firebase from 'firebase'
import { getVideos } from '../API/API'
import { IVideo, setQuery, setTotalResults, setVideos, setIsModalVisible } from '../state/search-reducer'
import { Redirect, useHistory } from 'react-router-dom'
import SearchModal from './SearchModal'
import { Form, Input, Select } from 'antd';

function Favorites() {

    const [favs, setFavs] = useState<any>([])
    const dispatch = useDispatch()
    const history = useHistory()

    const [form] = Form.useForm()
    const [queryLocal, setQeuryLocal] = useState<string>("")
    const [label, setLabel] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')
    const [maxResults, setMaxResults] = useState<number>(1)
    const uid = useSelector<RootState>(state => state.login.uid)

    useEffect(() => {
        db.collection('users').doc(`${uid}`).onSnapshot(snapshot => {
            setFavs(snapshot.data()?.favorites)
        })
    }, [])

    const deleteFavorite = (value: IFavorite) => {
        db.collection('users').doc(`${uid}`).update({
            favorites: firebase.firestore.FieldValue.arrayRemove({
                label: value.label,
                query: value.query,
                sortBy: value.sortBy,
                maxResults: value.maxResults
            })
        })
    }

    const onSearch = async (value: string) => {
        try {
            const result = await getVideos(value, sortBy, maxResults)
            dispatch(setTotalResults(result.data.pageInfo.totalResults))
            const videos: any = []
            result.data.items.forEach((item: any) => {
                const video: Partial<IVideo> = {}
                video.id = item.id.videoId
                video.channelTitle = item.snippet.channelTitle
                video.videoTitle = item.snippet.title
                video.description = item.snippet.description
                video.coverUrl = item.snippet.thumbnails.default.url
                videos.push(video)
            })
            dispatch(setVideos(videos))
            dispatch(setQuery(value))
            history.push('/search')
        } catch (error) {
            console.error(error.message)
        }
    }

    const executeFavorite = async (value: string) => {
        try {
            await onSearch(value)
            return <Redirect to='/search' />
        } catch (error) {
            console.error(error.message)
        }

    }

    const changeFavorite = (value: IFavorite) => {
        dispatch(setIsModalVisible(true))
        form.setFieldsValue({
            query: value.query,
            label: value.label,
            sortBy: value.sortBy,
            maxResults: value.maxResults
        })
        setQeuryLocal(value.query)
        setLabel(value.label)
        setSortBy(value.sortBy)
        setMaxResults(value.maxResults)
    }

    const handleSubmit = async (value: IFavorite) => {
        try {
            await db.collection(`users`).doc(`${uid}`).update({
                favorites: firebase.firestore.FieldValue.arrayUnion({
                    query: queryLocal,
                    maxResults: maxResults,
                    sortBy: sortBy,
                    label: value.label
                })
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="favoirtes">
            <div className="favorites__container">
                <SearchModal title='Изменить запрос'
                    handleSubmit={handleSubmit}
                >
                    <span style={{ paddingBottom: '10px' }}>Запрос</span>
                    <br />
                    <Input onChange={(value) => setQeuryLocal(value.target.value)} size="large" defaultValue={queryLocal} />
                    <Form.Item
                        shouldUpdate={true}
                        initialValue={label}
                        label='Название'
                        rules={[{ required: true, message: 'Укажите название запроса' }]}
                        name="label">
                        <Input size="large" name="label" id="label" placeholder="Укажите название запроса" />
                    </Form.Item>
                    <Form.Item initialValue={sortBy} label='Сортировать' id='sortBy' name='sortBy'>
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
                <h2 className="favorites__title">Избранное</h2>
                <ul className="favorites__list">
                    {favs.map((item: IFavorite, index: number) => (
                        <li key={index} className="favorites__item item-favorites">
                            <div className="item-favorites__text">
                                <span className="item-favorites__title">{item.label}</span>
                            </div>
                            <div className="item-favorites__options">
                                <span onClick={() => executeFavorite(item.query)} className="item-favorites__option item-favorites__option--execute">Выполнить</span>
                                <span onClick={() => changeFavorite(item)} className="item-favorites__option item-favorites__option--change">Изменить</span>
                                <span onClick={() => deleteFavorite(item)} className="item-favorites__option item-favorites__option--delete">Удалить</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Favorites
