import React from 'react'
import './Bus.css'
import Aux from '../../../../Hoc/Auxs/Auxs'


const bus = (props) =>{
  console.log(props)
  const style = {
    fontWeight:"normal",
    fontSize:"25px",
    margin:"auto"
  }
  return(
    <Aux>
    <div className="row bus">
      <div className="col-md-3"><p className="BusDetail">{props.busName}</p><p>{props.busDescription}</p></div>
      <div className="col-md-3 " style={{margin:"auto"}}>
        <p style={style}>{props.sourceTime}</p>
        <p>{props.source}</p>
      </div><div className="col-md-2" style={{margin:"auto"}}>
        <p style={style}>{props.destinationTime}</p>
        <p>{props.destination}</p>
      </div><div className="col-md-2" style={{margin:"auto"}}>
      {props.duration} hrs
      </div><div className="col-md-2 " style={{margin:"auto"}}>
      <p>₹ {props.price}</p>
      <button type="button" className="btn btn-success" onClick={props.book}>Book Now</button>
      </div>
    </div>
    
  </Aux>
  )
}




export default bus;