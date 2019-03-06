const initialState = {
    userAccess: false,
    user: []
}
const user = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'LOGIN_USER':
        console.log("hiiiiiiiiii")
                payload.userAccess = payload.login === "LoggedIn" ? true : false;
                state = {...payload};
            return {
                ...state
            }
        case 'LOGOUT_USER':
        console.log("byrrrrrrrrr")
            state = {};
            return {
                ...state
            }
        case 'LOGIN_ADMIN' :
                payload.adminAccess = payload.login === "LoggedIn" ? true : false;
                state = {...payload};
            return {
                ...state
            }
        default:
            return state
    }
}
  
export default user