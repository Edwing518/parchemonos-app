import React, { useState, useEffect, useContext } from 'react'
import { Page } from '../Page'
import { Button } from '../../components/Button'
import { validateEmail } from './../../utils/validateEmail'
import { UserContext } from './../../contexts/UserContext'
import { Link, useHistory } from 'react-router-dom'
import { requestHttp } from './../../services/HttpServer'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    setIsValidForm(validateEmail(email) && password !== '')
  }, [email, password])

  const loginFormHandler = (e) => {
    e.preventDefault()
    const form = {
      email,
      password
    }
    console.log('form login', form)
    validateUser(form)
  }

  const validateUser = async (data) => {
    try {
      const response = await requestHttp('post', 'users/login', data)
      setUser({ isAuthenticated: true })
      localStorage.setItem('TOKEN', response.token)
      setTimeout(() => {
        history.push('/')
      }, 2000)
    } catch (error) {
      alert('Error usuario no valido')
    }
  }

  /*const validateUser = () => {
    const emailUser = email
    const passUser = password
    if (emailUser === "pepito@gmail.com" && passUser === "123456") {
      setUser({ isAuthenticated: true })
      history.push('/')
    } else {
      setPassword('')
      alert('Error usuario')
    }
  }*/

  return (
    <Page>
      <h3>Inciar sesión</h3>
      <form onSubmit={loginFormHandler} className="form">
        <div>
          <label>Correo electrónico</label>
          <input value={email} type="text"
            onChange={ e => setEmail(e.target.value) }
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input value={password} type="password"
            onChange={ e => setPassword(e.target.value) }
          />
        </div>
        <Button disabled={!isValidForm} label="Ingresar" type="submit" />
        { user.name }
      </form>
      <div>
        <p className="Centrado">Aún no eres miembro <Link to='/register'>regístrate ahora</Link></p>
      </div>
    </Page>
  )
}
