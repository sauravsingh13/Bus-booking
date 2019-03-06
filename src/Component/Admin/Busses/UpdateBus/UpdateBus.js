import React,{Component} from 'react'
import './UpdateBus.css'
import axios from 'axios';
import { MsgBox } from '../../../Utility/MsgBox';

class UpdateBus extends Component {
    state={
        cities:[],
        name:this.props.update.name,
        description:this.props.update.description,
        fromCity:this.props.update.fromCity,
        toCity:this.props.update.toCity,
        fromCityTime:this.props.update.fromCityTime,
        toCityTime:this.props.update.toCityTime,
        duration:this.props.update.duration,
        totalSeats:this.props.update.totalSeats,
        price:this.props.update.price,
        msgProps: { 
            bool : false, 
            msg: "", 
            type: "",
            className: ""
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8080/city/viewCity')
            .then(response => {
                
                this.setState({cities:response.data.cities})
            })
			.catch(error => {throw error})
    }
    
    handleUserInput(e){
        const name = e.target.name;
        let value = e.target.value;
        if(name==="totalSeats"){
            value=value*5;
        }
        this.setState({[name]: value});
    }
    updateBus=()=>{
        console.log(this.props.update._id)
        const { name,description,fromCity,toCity,fromCityTime,toCityTime,duration,totalSeats,price } = this.state;
        // console.log(this.state.description)
        axios.put("http://localhost:8080/bus/update/" + this.props.update._id, {
            name:name, 
            description: description,
            fromCity:fromCity,
            toCity:toCity,
            fromCityTime:fromCityTime,
            toCityTime:toCityTime,
            duration:duration,
            totalSeats:totalSeats,
            price:price
        })
        .then(response => {
            this.setState({msgProps : { bool : true, msg: "Bus Updated", type: "Success", className: "alert alert-success"}});
            this.clearCache();
        })
        .catch(error => {
            this.setState({msgProps: { bool : true, msg: "Error", type: "Warning", className: "alert alert-warning"}});
            this.clearCache();
            throw(error);
        });
    }
    
    clearCache(){
        this.setState({
            
            name:'',
            description:'',
            fromCity:'',
            toCity:'',
            fromCityTime:'',
            toCityTime:'',
            duration:0,
            totalSeats:0,
            price:0,              
        });
    }
    
    render(){
        let cities = this.state.cities.map((city)=>{
            return(<option value={city.cityName} key={city._id}>{city.cityName}</option>)
        });
        
        return (
            <div className="Updatebus">
                <label htmlFor="fromCity">From City:</label>
                <select  name="fromCity" 
                onChange={(event) => this.handleUserInput(event)} defaultValue={this.state.fromCity}>
                
                {cities}</select>
                <label htmlFor="toCity">To City:</label>
                <select  name="toCity" onChange={(event) => this.handleUserInput(event)}  defaultValue={this.state.toCity}>
                {cities}</select><br/>
                <label htmlFor="name">Bus Name:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.name}
                name="name"/>
                <label htmlFor="duration">Duration:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.duration}
                name="duration" placeholder="Duration Time"/><br/>
                <textarea onChange={(event) => this.handleUserInput(event)}
                value={this.state.description} placeholder="Description"
                className="form-control" rows="5" id="comment" name="description"></textarea>
                <label htmlFor="fromCityTime">Source Time:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.fromCityTime}
                name="fromCityTime" placeholder="Source Time"/>
                <label htmlFor="toCityTime">Destination Time:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.toCityTime}
                name="toCityTime" placeholder="Destination Time"/><br/>
                <label htmlFor="price">Price:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.price}
                name="price" placeholder="Price"/>
                <label htmlFor="totalSeats">Total row of seats in Bus:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.totalSeats/5}
                name="totalSeats" placeholder="Total row of seats in Bus"/><br/><br/>
                <button className="btn btn-success" onClick={this.updateBus} style={{margin:"10px"}}>Update Bus</button>
                { this.state.msgProps.bool  == true ?
                                <MsgBox {...this.state.msgProps}></MsgBox>     
                            : null }
            </div>
            
    
        )
    }

}

export default UpdateBus;