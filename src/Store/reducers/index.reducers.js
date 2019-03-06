import { combineReducers } from 'redux';
import user from './login';

const appReducers = combineReducers({
    "user": user
});

export default appReducers;