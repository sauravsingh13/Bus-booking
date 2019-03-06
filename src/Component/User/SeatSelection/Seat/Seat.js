import React,{Component} from 'react'

import './Seat.css'

class Seat extends Component{
    state={
        classSeatStatus:this.props.rowstatus.slice(),
    }
    bookTicket=(i)=>{
        let status=this.state.classSeatStatus.slice();
        if(status[i]==='booking'){
            status[i]='unbooked';
            this.props.booking(this.props.children+(i+1))
        }
        else{

            if(status[i]==='unbooked')
            {
                status[i]='booking';
            this.props.booking(this.props.children+(i+1))
            }
            

        }
        
        this.setState({classSeatStatus:status})
    }
    
    render(){
        return(
            <div className="Seat">
        <div className={this.state.classSeatStatus[0]} onClick={()=>this.bookTicket(0)}>{this.props.children}1</div>
        <div className={this.state.classSeatStatus[1]} onClick={()=>this.bookTicket(1)}>{this.props.children}2</div>
        <div className={this.state.classSeatStatus[2]} onClick={()=>this.bookTicket(2)}>{this.props.children}3</div>
        <div className="Gap"></div>
        <div className={this.state.classSeatStatus[3]} onClick={()=>this.bookTicket(3)}>{this.props.children}4</div>
        <div className={this.state.classSeatStatus[4]} onClick={()=>this.bookTicket(4)}>{this.props.children}5</div>

    </div>
        )
    }
}
           


export default Seat;