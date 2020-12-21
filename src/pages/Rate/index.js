import React, { useState, useEffect } from 'react'
import { Page } from '../Page'
import { Button } from '../../components/Button'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { requestHttp } from './../../services/HttpServer'

export const Rate = () => {
    const [stars, setStars] =useState(0)
    const size = "32px"
    const { id } = useParams()
    const history = useHistory()
    const [comment, setComment] = useState('')
    const [isValidForm, setIsValidForm] = useState(false)

    useEffect(() => {
      setIsValidForm(stars > 0 && comment !== '')
    }, [stars,comment])

    const rateFormHandler = (e) => {
        e.preventDefault()
        const rate = {
            score: stars,
            comments: comment
        }
        validateRate (rate)
    }    

    const validateRate = async (data) => {
        try {
            const response = await requestHttp('post',`booking/rate/${id}`,data)
            console.log('form rate', response)
            setTimeout(() => {
              history.push('/')
            }, 2000)
          } catch (error){
            console.log('Error', error)
          }
    }

    const StarFill = ({ size, idStar }) => (
      <ion-icon onClick={ () => setStars(idStar) } style={{ fontSize: size }} name="star"></ion-icon>
    )
      
    const StarEmpty = ({ size, idStar }) => (
      <ion-icon onClick={ () => setStars(idStar) } style={{ fontSize: size }} name="star-outline"></ion-icon>
    )
      return (
        <Page>
          <h3>CALIFICA ESTA ESPERIENCIA</h3>
            <form onSubmit={rateFormHandler} className="form">
            <section className="score">
                <div>
                {
                    [1,2,3,4,5].map((el, key) => el <= stars ? <StarFill key={key} size={ size } idStar={el} /> : <StarEmpty key={key} size={ size } idStar={el}/> )
                }
                </div>
            </section>
            <textarea value={comment} onChange={ e => setComment(e.target.value) } rows="10" cols="50"></textarea>
            <Button disabled={!isValidForm} label="Calificar" type="submit" />
          </form>
        </Page>
      )
} 
