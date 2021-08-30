import {createStore,combineReducers,applyMiddleware} from "redux"
import AuthReducer from "./Auth/reducer"
import {composeWithDevTools} from "redux-devtools-extension"
import logger from "redux-logger"
import CustomizationReducer from "./customizationReducer"

const rootReducer = combineReducers({
    auth:AuthReducer,
    customization:CustomizationReducer
})


export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(logger))
    )
    return store
}