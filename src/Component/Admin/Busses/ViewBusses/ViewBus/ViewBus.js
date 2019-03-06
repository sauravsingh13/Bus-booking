import React from 'react'
import './ViewBus.css'
import Aux from '../../../../../Hoc/Auxs/Auxs'


const viewBus = (props) =>{
  console.log(props)
  const style = {
    fontWeight:"normal",
    fontSize:"25px",
    margin:"auto"
  }
  return(
    <Aux>

    <div className="row ViewBus">
      <div className="col-md-3"><p className="BusDetail">{props.busName}</p><p>{props.busDescription}</p></div>
      <div className="col-md-2 " style={{margin:"auto"}}>
        <p style={style}>{props.sourceTime}</p>
        <p>{props.source}</p>
      </div><div className="col-md-2" style={{margin:"auto"}}>
        <p style={style}>{props.destinationTime}</p>
        <p>{props.destination}</p>
      </div><div className="col-md-1" style={{margin:"auto",textAlign:"center"}}>
      <p style={{margin:"auto"}}>Duration:</p>
        <p>{props.duration} hrs</p>
      </div><div className="col-md-4 " style={{margin:"auto"}}>
      <p>Price:₹{props.price}</p>
      <p>Total Seats:{props.seat}</p>
      <button type="button" className="btn btn-success"  onClick={props.update}>Update</button>
      <button type="button" className="btn btn-warning"  onClick={props.delete}>Delete</button>

      </div>
    </div>
  </Aux>
  )
}




export default viewBus;