import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MsgBox } from '../Utility/MsgBox';
import Aux from '../../Hoc/Auxs/Auxs'

//Actions
import { findUser, findAdmin, clearUser } from '../../Store/action/login'; 

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            adUserName: '',
            adPassword: '',
            userClass:"nav-item nav-link active",
            adminClass:"nav-item nav-link",
            admin:false,
        };
        this.user = this.user.bind(this);
        this.register = this.register.bind(this);
        this.admin = this.admin.bind(this);
    }
    adminTab=()=>{
        this.setState({adminClass:"nav-item nav-link active",
        userClass:"nav-item nav-link",admin:true})
    }
    userTab=()=>{
      this.setState({adminClass:"nav-item nav-link",
      userClass:"nav-item nav-link active",admin:false})    }
    
    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    admin(){
        //this.setState({adminAccess:true});
        const { adUserName, adPassword } = this.state;
        this.props.checkAdmin({"username": adUserName, "password": adPassword});
    }
    user(){
        const { username, password } = this.state;
        this.props.checkUser({"username": username, "password": password});
        //this.setState({userAccess:true});
    }
    
    register(){
        this.props.history.push('/register');
    }

    componentWillMount(){
        console.log("login===>")
      //  this.props.logoutUser();
    }
    render(){
        const _props = {
            msg: "Username or Password are Invalid", 
            type: "Warning",
            className: "alert alert-warning"
        }
        if (this.props.user.hasOwnProperty("adminAccess") &&  this.props.user.adminAccess === true) {
            return <Redirect to='/admin' />
        }
        if (this.props.user.userAccess === true) {
            return <Redirect to='/user' />
        }
        const style = {
            
            marginTop:"20px"
        }
        const tab = {
            cursor:"pointer"
        }
        let adminUserToggle=null;
        if(!this.state.admin){
            adminUserToggle = (<Aux>
                <div className="offset-md-4 col-md-4 ">
            <input style={style} type="text" placeholder="User Name" 
             onChange={ (event) => this.handleUserInput(event)} name="username"className="form-control"/>
            </div>
            <div className="offset-md-4 col-md-4 ">
            <input  style={style} type="password" placeholder="Password" 
            name="password" className="form-control" onChange={ (event) => this.handleUserInput(event)} /><br/>
            <button type="button" style={{margin:"20px"}} onClick={this.register}  className="btn btn-primary">Register</button>
            <button type="button" style={{margin:"20px"}} onClick={this.user} className="btn btn-success">Login</button>
            <button type="button" style={{margin:"20px"}} className="btn btn-success">
            <a href="/login/google">Google+</a></button>
            { this.props.user.login  === "Failed" ?
                            <MsgBox {..._props}></MsgBox>
                        : null }
            </div>
            </Aux>  )
        }
        else{
            adminUserToggle = (<Aux>
                <div className="offset-md-4 col-md-4 ">
            <input style={style} type="text" placeholder="Admin Name" 
            name="adUserName" onChange={ (event) => this.handleUserInput(event)}className="form-control"/>
            </div>
            <div className="offset-md-4 col-md-4 ">
            <input  style={style} type="password" placeholder="Password" 
            name="adPassword" onChange={ (event) => this.handleUserInput(event)} className="form-control" /><br/>
            <button type="button" style={style}  onClick={this.admin} className="btn btn-primary">Secure Login</button>
            { this.props.user.login === "Failed" ?
                            <MsgBox {..._props}></MsgBox>
                        : null }
            </div>
            </Aux>  )
        }
        return(
            <Aux>
                <div className="row">
                <div className="offset-md-4 col-md-4 ">
                    <nav  style={style}>
                        <div className="nav nav-tabs">
                            <span className={this.state.userClass} style={tab} onClick={this.userTab}>User</span>
                            <span className={this.state.adminClass} style={tab} onClick={this.adminTab}>Admin</span>
                        </div>
                    </nav>               
                </div>
                </div>
                <div className="row">
                {adminUserToggle}
                </div>
            </Aux>
        )
        
    }
}

const mapStateToProps = (state) => ({
    "user" : state.user 
})
const mapDispatchToProps = dispatch => {
    return {
      checkUser: user => {
        dispatch(findUser(user));
      },
      checkAdmin: admin => {
          dispatch(findAdmin(admin));
      },
      logoutUser: () => {
        dispatch(clearUser());
      },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);