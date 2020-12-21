import React, {useEffect, useState} from 'react'
import { Adventure } from './Adventure'
import { requestHttp } from '../../../services/HttpServer'
//import { EXPERIENCES_DATA } from './../../../data/ExperiencesData'

export const Experiences = () => {
  const [experiences, setExperiences] = useState([])
  useEffect(() => loadExperiences(), [])

  const loadExperiences = async() =>{
    try {
      const response = await requestHttp('get', 'experiences')
      setExperiences(response.list)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return(
    <section className="experiences-container">
      {
        experiences.map((item, index) => <Adventure key ={index} {...item}/>)
      }
    </section>
  )

}


/*(
  <section>
    {
      EXPERIENCES_DATA.map(el => <Adventure key={el.id} {...el} /> )
    }
  </section>
)*/
