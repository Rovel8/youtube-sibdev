import React from 'react'
import '../styles/Login.css'
import logo from '../assets/sibdev-logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from 'antd';
import { Formik, Form, Field } from 'formik';
import { RootState } from '../state/store';
import { logIn, initializeApp, setUid } from '../state/login-reducer'
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase-config'

function Login() {

  const isLoggedIn = useSelector<RootState>(state => state.login.isLoggedIn)
  const dispatch = useDispatch()

  const initialValues = {
    login: '',
    password: ''
  }

  interface IInitialValues {
    login: string
    password: string
  }

  const onSubmit = async ({ login, password }: IInitialValues) => {
    try {
      const signIn = await auth.signInWithEmailAndPassword(login, password)
      console.log(signIn)
      dispatch(setUid(signIn.user?.uid))
      dispatch(logIn(true))
      dispatch(initializeApp(true))
    } catch (error) {
      console.error(error.message)
    }
  }

  if (isLoggedIn) {
    return <Redirect to={'/'} />
  }

  return (
    <main className="login">
      <div className="login__container">
        <section className="logo__header">
          <img className="logo__img" src={logo} alt="Logo" />
          <h1 className="logo__title">Вход</h1>
        </section>
        <section className="logo__form form-logo">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-logo__body">
              <Field className="form-logo__field" as={Input} name="login" id="login" placeholder="Логин" />
              <Field className="form-logo__field" as={Input.Password} name="password" id="password" placeholder="Пароль" />
              <Button htmlType="submit" type="primary" className="form-logo__btn">Войти</Button>
            </Form>
          </Formik>
        </section>
      </div>
    </main>
  );
};

export default Login
