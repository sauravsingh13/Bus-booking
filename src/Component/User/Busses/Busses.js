import React from 'react'
import Bus from './Bus/Bus'
import Aux from '../../../Hoc/Auxs/Auxs'
import './Busses.css'



const busses = (props) => {
    console.log(props)
    let bussesList=props.bussesList.map((bus)=>(
        <Bus busName={bus.name} 
    busDescription={bus.description} 
    sourceTime={bus.fromCityTime}
    destinationTime={bus.toCityTime}
    price={bus.price}
    key={bus._id}
    book={()=>props.book(bus._id)}
    source={bus.fromCity}
    destination={bus.toCity}
    duration={bus.duration}
    />
    ))
    return (
    <Aux>
        <div className="row BusHeading">
        <div className="col-md-3">
        
      </div>
      <div className="col-md-3 ">
      DEPARTURE
      </div><div className="col-md-2">
      ARIVAL
      </div><div className="col-md-2 ">
      DURATION
      </div><div className="col-md-2 Price">
      PRICE
      </div>
      
    </div>
        {props.bussesList.length > 0 ? bussesList : <span>No Bus Found</span>}
    </Aux>
    )
}

export default busses;