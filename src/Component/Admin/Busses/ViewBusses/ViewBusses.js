import React from 'react'
import ViewBus from './ViewBus/ViewBus'



const viewBusses = (props) => props.busses.map((bus)=>{
    return (<ViewBus busName={bus.name} 
    busDescription={bus.description}
    source={bus.fromCity}
    destination={bus.toCity} 
    destinationTime={bus.fromCityTime}
    sourceTime={bus.toCityTime}
    price={bus.price}
    duration={bus.duration}
    seat={bus.totalSeats}
    key={bus._id}
    update={()=>props.update(bus._id)}
    delete={()=>props.delete(bus._id)}
    />)
})

export default viewBusses;