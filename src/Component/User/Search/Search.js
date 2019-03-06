import React,{Component} from 'react'
import { Button } from 'reactstrap';
import './Search.css'


class Search extends Component  {

    state={
        fromCity:'',
        toCity:'',
        cities:''
    }
    
    func=()=>{
        console.log(this.refs.leaving)
        this.props.search(this.refs.leavingFrom.value,this.refs.goingTo.value,this.refs.leavingDate.value)
    }
    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    
    render(){
        
        return(
            <div>                
                
                <input className="search" type="text"  onChange={(event) => this.handleUserInput(event)}
                value={this.state.fromCity}
                name="fromCity" placeholder=" &#x2197; Leaving From"></input><br/>
                <input className="search" type="text"  onChange={(event) => this.handleUserInput(event)}
                value={this.state.toCity}
                name="toCity" placeholder="&#x2199; Going To"></input><br/>
                <input className="search" ref="leavingDate"  placeholder="&#x2199; Going To" type="date"></input><br/><br/>
                <button className="btn btn-primary" onClick={()=>this.props.search(this.state.fromCity,this.state.toCity)} style={{margin:"10px"}}>Search</button>

            </div>
        )
    }
}

export default Search;