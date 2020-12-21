import React, { useState, useEffect } from 'react'
import { Page } from '../Page'
import { Button } from '../../components/Button'
import { useHistory } from 'react-router-dom'
import { requestHttp } from './../../services/HttpServer'

export const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setIsValidForm(name !== '' && email !== '' && document !== '' && password !== '')
  }, [name, email, document, password])

  const registerFormHandler = async (e) => {
    e.preventDefault()
    const form = {
      name,
      email,
      phone,
      document,
      password
    }
    try {
      const response = await requestHttp('post','users/signup',form)
      console.log('form registro', response)
      setTimeout(() => {
        history.push('/login')
      }, 2000)
    } catch (error){
      console.log('Error', error)
    }
  }

  return (
    <Page>
      <h3>Formulario de registro</h3>
      <form onSubmit={registerFormHandler} className="form">
        <div>
          <label>Nombre completo</label>
          <input value={name} type="text"
            onChange={ e => setName(e.target.value) }
          />
        </div>
        <div>
          <label>Correo electrónico</label>
          <input value={email} type="text"
            onChange={ e => setEmail(e.target.value) }
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input value={phone} type="text"
            onChange={ e => setPhone(e.target.value) }
          />
        </div>
        <div>
          <label>Cedula</label>
          <input value={document} type="text"
            onChange={ e => setDocument(e.target.value) }
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input value={password} type="password"
            onChange={ e => setPassword(e.target.value) }
          />
        </div>

        <Button disabled={!isValidForm} label="Registarme" type="submit" />
      </form>
    </Page>
  )
}
