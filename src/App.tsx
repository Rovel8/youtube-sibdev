import './styles/App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect } from 'react';
import { auth } from './firebase/firebase-config'
import {logIn, initializeApp, setUid} from './state/login-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { RootState } from './state/store';

function App() {

  const dispatch = useDispatch()
  const isInitialized = useSelector<RootState>(state => state.login.isInitialized)
  const isLoggedIn = useSelector<RootState>(state => state.login.isLoggedIn)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(logIn(true))
        dispatch(setUid(user.uid))
        dispatch(initializeApp(true))
      }else{
        dispatch(logIn(false))
        dispatch(initializeApp(true))
      }
    })
  }, [])

  return (
    <div className="app">
        {isInitialized ? (
          <>
          <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route path="/" render={() => <Home />} />
          </Switch>
          </>
        ) : <Spin className='app__loader' size='large' />}
    </div>
  );
}

export default App;
