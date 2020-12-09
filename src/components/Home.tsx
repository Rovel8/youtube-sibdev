import React, { useEffect } from 'react'
import { auth } from '../firebase/firebase-config'
import { useDispatch, useSelector } from 'react-redux'
import {logIn, initializeApp, setMenu} from '../state/login-reducer'
import { RootState } from '../state/store';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {Typography} from 'antd'
import Logo from '../assets/sibdev-logo.svg'
import '../styles/Home.css'
import HomeStart from './HomeStart';
import HomeResults from './HomeResults';
import Favorites from './Favorites';

const {Text, Link} = Typography

function Home() {

    const isLoggedIn = useSelector<RootState>(state => state.login.isLoggedIn)
    const selectedMenu = useSelector<RootState>(state => state.login.menu)
    const dispatch = useDispatch()

    const setMenuBookmark = (value: string) => {
        if(value !== selectedMenu){
            const elem = document.getElementById(`${selectedMenu}`)
            elem?.classList.remove('active')
        }
        dispatch(setMenu(value))
        const elem = document.getElementById(`${value}`)
        elem?.classList.add('active')
    }

    const logOut = async () => {
        try {
            await auth.signOut()
            dispatch(logIn(false))
            dispatch(initializeApp(true))
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        document.getElementById(`${selectedMenu}`)?.classList.add('active')
    }, [])

    if(!isLoggedIn){
        return <Redirect to="/login" />
    }

    return (
        <div className="home">
            <header className="home__header header-home">
                <div className="header-home__container">
                    <section className="header-home__entries">
                        <img className="header-home__img" src={Logo} alt="Logo"/>
                        <span onClick={() => setMenuBookmark('search')} id="search" className="header-home__item"><NavLink to='/'>Поиск</NavLink> </span>
                        <span onClick={() => setMenuBookmark('favorite')} id="favorite" className="header-home__item"><NavLink to='/favorites'>Избранное</NavLink></span> 
                    </section>
                    <section className="header-home__exit">
                        <span className="header-home__logout" onClick={() => logOut()}>Выйти</span>
                    </section>
                </div>
            </header>
            <Switch>
                <Route path='/search'>
                    <HomeResults />
                </Route>
                <Route path='/favorites'>
                    <Favorites />
                </Route>
                <Route exact path='/'>
                    <HomeStart />
                </Route>
            </Switch>
        </div>
    )
}

export default Home
