import React,{Component} from 'react'

import './SeatView.css'

class Seat extends Component{
    state={
        classSeatStatus:this.props.rowstatus.slice(),
    }
    
    
    render(){
        return(
            <div className="SeatView">
        <div className={this.state.classSeatStatus[0]} >{this.props.children}1</div>
        <div className={this.state.classSeatStatus[1]} >{this.props.children}2</div>
        <div className={this.state.classSeatStatus[2]} >{this.props.children}3</div>
        <div className="Gap"></div>
        <div className={this.state.classSeatStatus[3]} >{this.props.children}4</div>
        <div className={this.state.classSeatStatus[4]} >{this.props.children}5</div>

    </div>
        )
    }
}
           


export default Seat;