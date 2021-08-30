import React from "react"
import {Route,Redirect,RouteProps} from "react-router-dom"




const PrivateRoute = ({component:Component,isLoading,isAuthenticated,...rest}) => {

    return(
        <Route
        {...rest}
        render={() => 
        isLoading ? <div>loading...</div> :
        isAuthenticated ? (
            <Component/>
        ):(
            <Redirect to={{pathname:"/login"}} />
        )
    }
        />
    )
}


export default PrivateRoute