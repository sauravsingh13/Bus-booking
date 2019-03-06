import React,{Component} from 'react'
import './SeatSelection.css'
import Seat from './Seat/Seat'
import { Button } from 'reactstrap';


// const seatSelection = (props) => {
//     const seatStatus=props.seatStatus.map((seat)=>(<Seat rowstatus={seat.status}>{seat.row}</Seat>))
//     return (
//         <div className="SeatSelection">
//         {seatStatus}
//         <Button color="warning">Confirm Seat</Button>
//         <Button color="success">Confirm Seat</Button>
//         </div>
      

//     )
// }
class seatSelection extends Component{
    state={
        seatBooking:[],
    }
    seatBookingArray=(seat)=>{
        let seatBooked=this.state.seatBooking.slice();
        if(!seatBooked.includes(seat)){
            seatBooked.push(seat)
        }
        else{
            seatBooked=seatBooked.filter((i)=>i!==seat)
        }
        this.setState({seatBooking:seatBooked})
    }
    

    render(){
       
        const seatStatus=this.props.seatStatus.map((seat)=>(<Seat booking={this.seatBookingArray} 
        rowstatus={seat.status} key={seat.row}>{seat.row}</Seat>))
        return(
            <div className="SeatSelection">
        {seatStatus}
        <Button color="warning" onClick={this.props.cancel}>Cancel</Button><br/><br/>
        <Button color="success" onClick={()=>this.props.confirmSeat(this.state.seatBooking)}>Confirm Seat</Button>
        </div>
        )
    }
}

export default seatSelection;