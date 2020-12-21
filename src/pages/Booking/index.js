import React, { useState, useEffect } from 'react'
import { Page } from '../Page'
import { Button } from '../../components/Button'
import { useParams, useHistory } from 'react-router-dom'
import { requestHttp } from './../../services/HttpServer'

export const Booking = () => {

  const { id } = useParams()
  const history = useHistory()
  const [bookingDate, setBookingDate] = useState('')
  const [comments, setComments] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)

  useEffect(() => {
    setIsValidForm(new Date(bookingDate) > new Date())
  }, [bookingDate])

  const bookingFormHandler = async (e) => {
    e.preventDefault()
    const form = {
      bookingDate,
      comments
    }
    try {
      const response = await requestHttp('post',`booking/${id}`,form)
      console.log('form booking', response)
      setTimeout(() => {
        history.push(`/rate/${response.Booking._id}`)
      }, 2000)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <Page>
      <h3>Formulario de reserva</h3>
      <form onSubmit={bookingFormHandler} className="form">
        <div>
          <label>Fecha de la reserva</label>
          <input value={bookingDate} type="date"
            onChange={ e => setBookingDate(e.target.value) }
          />
        </div>
        <div>
          <label>Comentarios adicionales</label>
          <textarea value={comments} onChange={ e => setComments(e.target.value) } ></textarea>
        </div>
        <Button disabled={!isValidForm} label="Enviar reserva" type="submit" />
      </form>
    </Page>
  )
}
