import { isEmpty } from "lodash"
import * as actions from "./actions"


const defaultState = {
    isAuthenticated:false,
    refreshToken:"",
    profile:{
        username:"",
        id:0,
        email:""
    }
}


export default function authReducer(state = defaultState,action) {
    switch(action.type){
        case actions.LOGGED_IN:
            return{
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                profile:{
                    ...action.payload
                }
            }
        case actions.LOG_OUT:
            return{
                ...state,
                isAuthenticated:false,
                profile:defaultState.profile
            }
        default:
            return state
    }
}