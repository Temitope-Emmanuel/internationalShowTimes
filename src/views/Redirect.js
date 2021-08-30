import React from "react"
import {useHistory,useLocation,useParams} from "react-router-dom"
import {Box,Typography} from "@material-ui/core"
import {useQuery} from "../utils/customHooks"
import useDropBoxService from '../utils/dropBoxContext'


const Redirect = () => {
    const path = useParams()
    const location = useLocation()
    const {isLoaded,isLoggedIn,...dropbox} = useDropBoxService()
    const query = useQuery()
    const history = useHistory()
    const returnHref = "returnHref"


    // Check if there exist a return href to redirect to
    React.useEffect(() => {
        const redirectLink = window.localStorage.getItem(returnHref)
        if(redirectLink){
            window.location.href = redirectLink
        }else{
            history.push("/dashboard")
        }
        return () => {
            window.localStorage.removeItem(returnHref)
        }
    },[])
    
    // Redirect back to dashboard
    React.useEffect(() => {
        const code = query.get("code")
        if(code){
            dropbox.checkUrl(code)
        }
        history.push("/dashboard")
    },[query])
    
    return(
        <Box>
            <Typography>
                Redirecting...
            </Typography>
        </Box>
    )
}

export default Redirect