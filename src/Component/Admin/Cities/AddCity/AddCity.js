import React,{Component} from 'react'
import Aux from '../../../../Hoc/Auxs/Auxs'
import axios from 'axios';
import { MsgBox } from '../../../Utility/MsgBox';

export default class AddCity extends React.Component {
    state={
        cityName:'',
        cityDescription:'',
        msgProps: { 
            bool : false, 
            msg: "", 
            type: "",
            className: ""
        }
    }
    handleUserInput=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }
    clearCache(){
        this.setState({
            cityName:'',
            cityDescription:''               
        });
    }
    addCity=()=>{
        const { cityName,cityDescription } = this.state;
        axios.post("http://localhost:8080/city/addCity", {
            cityName:cityName, 
            cityDescription: cityDescription,
        })
        .then(response => {
            this.setState({msgProps : { bool : true, msg: "City Added", type: "Success", className: "alert alert-success"}});
            this.clearCache();
        })
        .catch(error => {
            this.setState({msgProps: { bool : true, msg: "Error", type: "Warning", className: "alert alert-warning"}});
            this.clearCache();
            throw(error);
        });
    }
    render(){
        
        return(
            
            <Aux>
            <div className="row">
            <div className="offset-md-4 col-md-4 ">
            <label htmlFor="cityName" >City Name:</label>
            <input type="text" required="" placeholder="City Name" 
            onChange={(event) => this.handleUserInput(event)} value={this.state.cityName} name="cityName" 
            className="form-control" />
            </div>
            <div className="offset-md-4 col-md-4 ">
            <label htmlFor="cityDescription" >Description:</label>
            <textarea onChange={(event) => this.handleUserInput(event)}
                value={this.state.cityDescription}
            className="form-control" rows="5" id="comment" name="cityDescription"></textarea>
            </div>
            </div>
            <button className="btn btn-primary" onClick={this.addCity} style={{margin:"10px"}}>Add</button>
            { this.state.msgProps.bool  == true ?
                                <MsgBox {...this.state.msgProps}></MsgBox>     
                            : null }

            </Aux>
        )
    }
}
