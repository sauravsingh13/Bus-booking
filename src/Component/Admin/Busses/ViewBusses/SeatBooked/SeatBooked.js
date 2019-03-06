import React from 'react'
import './SeatBooked.css'
import Seat from './Seat/Seat'


const seatBooked = (props) => {
    const seatStatus=props.seatStatus.map((seat)=>(<Seat rowstatus={seat.status}>{seat.row}</Seat>))
    return (
        <div className="SeatBooked">
        {seatStatus}
        <button type="button" className="btn btn-warning"  onClick={props.cancel}>Cancel</button>
        <div class="alert alert-warning">
            <strong>Not Allowed!</strong> User had already booked the ticket in this bus.
        </div>
        </div>
      

    )
}


export default seatBooked;