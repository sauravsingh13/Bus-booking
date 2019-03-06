import React from 'react'

import ViewCity from './ViewCity/ViewCity'

const viewCities = (props) => props.cities.map((city)=>{return(
    <ViewCity name={city.cityName} 
    description={city.cityDescription} update={()=>props.update(city._id)}
    delete={()=>props.delete(city._id)} key={city._id}/>
)})
   


export default viewCities;