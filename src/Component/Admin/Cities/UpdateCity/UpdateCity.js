import React,{Component} from 'react'
import Aux from '../../../../Hoc/Auxs/Auxs'
import axios from 'axios';
import { MsgBox } from '../../../Utility/MsgBox';

export default class UpdateCity extends React.Component {
    state={
        cityName:this.props.update.cityName,
        cityDescription:this.props.update.cityDescription,
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
    updateCity=()=>{
        const { cityName,cityDescription } = this.state;
        axios.put('http://localhost:8080/city/update/' + this.props.update._id,{
            cityName:cityName, 
            cityDescription: cityDescription,
        })
        .then(response => {
            this.setState({msgProps : { bool : true, msg: "City Updated", type: "Success", className: "alert alert-success"}});
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
            <input type="text" required="" 
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
            <button className="btn btn-success" onClick={this.updateCity} style={{margin:"10px"}}>Update</button>
            { this.state.msgProps.bool  == true ?
                                <MsgBox {...this.state.msgProps}></MsgBox>     
                            : null }

            </Aux>
        )
    }
}
