import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Navbar from './Component/Navbar/navbar';
import Login from './Component/Login/Login';
import Admin from './Component/Admin/Admin';
import User from './Component/User/User';
import Registration from './Component/Register/Registration'
import { MsgBox } from './Component/Utility/MsgBox';
//Actions
import { getUser, loginUser } from './Store/action/login';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : null
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>{
      return (
        //rest.user.hasOwnProperty('admin') && rest.user.adminAccess ? (
        //rest.auth.hasOwnProperty('user') && rest.auth.user.length > 0 ? (
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      )
    }
      
    }
  />
);

class App extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    const searchParams = window.location.search;
    if(searchParams.indexOf('?token=') != -1 && searchParams.split('?token=')[1]){
      axios.get("/login/authUser", {
        params: {token: searchParams.split('?token=')[1]}
      })
      .then(response => {
          this.props.dispatch(loginUser(response.data));
      })
      .catch(error => {
          throw(error);
      });
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute path="/admin" {...this.props} component={Admin} />
              <PrivateRoute path='/user' {...this.props} component={User}/>
              <Route path='/register' component={Registration}/>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  "auth" : state.user
});

export default connect(mapStateToProps, null)(App);
