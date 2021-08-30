import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import AuthReducer from "./Auth/reducer"

const reducer = combineReducers({
    customization: customizationReducer,
    auth:AuthReducer
});

export default reducer;
