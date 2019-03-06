import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './registration.css';
import { MsgBox } from '../Utility/MsgBox';
import { FormErrors } from '../Utility/FormErrors';

class Registration extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            username: '',
            email: '',
            mob:'',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            msgProps: { 
                bool : false, 
                msg: "", 
                type: "",
                className: ""
            }
        }
        this.addNewRegistrants = this.addNewRegistrants.bind(this);
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }
    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) });
    }
    addNewRegistrants(){
        const { fname, lname, password, mob, email, username } = this.state;
        axios.post("/addUsers", {
            firstname:fname, 
            lastname: lname,
            username: username,
            password: password,
            mobile_no: mob,
            email: email
        })
        .then(response => {
            this.setState({msgProps : { bool : true, msg: "Registration Done", type: "Success", className: "alert alert-success"}});
            this.clearCache();
        })
        .catch(error => {
            this.setState({msgProps: { bool : true, msg: "Registration Failed", type: "Warning", className: "alert alert-warning"}});
            this.clearCache();
            throw(error);
        });
    }
    
    clearCache(){
        this.setState({
            fname: '',
            lname: '',
            username: '',
            email: '',
            mob:'',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false                
        });
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 center-block">
                        <div className="form_main">
                            <h4 className="heading"><strong>Create </strong> Account <span></span></h4>
                            <div className="form">
                                <form id="contactFrm" name="contactFrm">
                                <div className="panel panel-default">
                                    <FormErrors formErrors={this.state.formErrors} />
                                </div>
                                    <input type="text" required="" placeholder="First Name" onChange={(event) => this.handleUserInput(event)} value={this.state.fname} name="fname" className="txt" />
                                    <input type="text" required="" placeholder="Last Name"  onChange={(event) => this.handleUserInput(event)} value={this.state.lname} name="lname" className="txt" />
                                    <input type="text" required="" placeholder="User Name"  onChange={(event) => this.handleUserInput(event)} value={this.state.username} name="username" className="txt" />
                                    <input type="password" required="" placeholder="Password" onChange={(event) => this.handleUserInput(event)} value={this.state.password} name="password" className="txt" />
                                    <input type="text" required="" placeholder="Mobile No" onChange={(event) => this.handleUserInput(event)} value={this.state.mob} name="mob" className="txt" />
                                    <input type="email" required="" placeholder="Email" onChange={(event) => this.handleUserInput(event)} value={this.state.email} name="email" className="txt" />
                                    <input type="button" disabled={!this.state.formValid} value="submit" name="submit" onClick={()=> this.addNewRegistrants()} className="subButton" />
                                    <Link className="subButton button__padding" to="/login">Back To Login</Link>
                                </form>
                            </div>
                            { this.state.msgProps.bool  == true ?
                                <MsgBox {...this.state.msgProps}></MsgBox>     
                            : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration