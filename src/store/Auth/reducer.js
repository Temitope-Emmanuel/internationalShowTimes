import { isEmpty } from "lodash"
import * as actions from "./actions"


const defaultState = {
    isAuthenticated:false,
    refreshToken:"",
    loading:false,
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
        case actions.IS_LOADING:{
            return{
                ...state,
                loading:true
            }
        }
        case actions.NOT_LOADING:{
            return{
                ...state,
                loading:false
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