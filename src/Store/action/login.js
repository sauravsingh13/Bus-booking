import react from 'react';
import axios from 'axios';

export const loginUser = (user) => {
    return {
      type: 'LOGIN_USER',
      payload: user
    }
};

export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
      payload: {}
    }
};

export const loginAdmin = (admin) => {
    return {
      type: 'LOGIN_ADMIN',
      payload: admin
    }
};

//Get User when login
export const getUser = (payload) => {
    return (dispatch) => {
        return axios.get("/login/authUser", {
            params: payload
        })
        .then(response => {
            dispatch(loginUser(response.data));
        })
        .catch(error => {
            throw(error);
        });
    }
}

//Find User when login
export const findUser = (credential) => {
    return (dispatch) => {
        return axios.get("/login/users", {
                params: credential
            }
        )
        .then(response => {
            dispatch(loginUser(response.data));
        })
        .catch(error => {
            throw(error);
        });
    }
}

export const clearUser = () => {
    return (dispatch) => {
        dispatch(logoutUser());
    }
}

//Find Admin when login 
export const findAdmin = (credential) => {
    return (dispatch) => {
        return axios.get("/login/admin", {
                params: credential
            }
        )
        .then(response => {
            dispatch(loginAdmin(response.data));
        })
        .catch(error => {
            throw(error);
        });
    }
}