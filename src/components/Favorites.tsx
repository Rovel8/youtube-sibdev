import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase/firebase-config'
import { RootState } from '../state/store'
import '../styles/Favorites.css'
import { IFavorite } from './HomeResults'

function Favorites() {

    const [favs, setFavs] = useState<any>([])

    const uid = useSelector<RootState>(state => state.login.uid)

    useEffect(() => {
       db.collection('users').doc(`${uid}`).onSnapshot(snapshot => {
           setFavs(snapshot.data()?.favorites)
       })
    }, [])

    const deleteFavorite = () => {

    }

    const executeFavorite = () => {

    }

    const changeFavorite = () => {

    }

    console.log(favs)

    return (
        <div className="favoirtes">
            <div className="favorites__container">
                <h2 className="favorites__title">Избранное</h2>
                <ul className="favorites__list">
                    {favs.map((item: IFavorite) => (
                        <li className="favorites__item item-favorites">
                            <div className="item-favorites__text">
                                <span className="item-favorites__title">{item.label}</span>
                            </div>
                            <div className="item-favorites__options">
                                <span className="item-favorites__option item-favorites__option--execute">Выполнить</span>
                                <span className="item-favorites__option item-favorites__option--change">Изменить</span>
                                <span className="item-favorites__option item-favorites__option--delete">Удалить</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Favorites
