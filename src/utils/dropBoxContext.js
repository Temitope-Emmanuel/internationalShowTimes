import React from "react"
import config from "./config"
import fetch from "isomorphic-fetch"
import {createGenericContext} from "."
import {Dropbox,DropboxAuth} from "dropbox" 
import {useHistory} from "react-router-dom"
import useAlertService from "../utils/alertContext"
import {saveRefreshToken,removeRefreshToken,getRefreshToken} from "../utils/auth"

  const [useDropBoxService,DropBoxContextProvider] = createGenericContext()
  

 export const DropBoxProvider = ({children}) => {
    const [isLoaded,setIsLoaded] = React.useState(false)
    const alert = useAlertService()
    const history = useHistory()
    const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    const {current:dbx} = React.useRef(new DropboxAuth({
        clientId:config.clientId,
        fetch
    }))
    const dropbox = React.useRef(null)
    const redirectUrl = `${process.env.REACT_APP_CLIENT_URL}/dashboard/redirect`
    const storageKey = "codeVerifier"
    const returnHref = "returnHref"

    React.useEffect(() => {
       const refreshToken = getRefreshToken()
       if(refreshToken && dbx){
           dbx.setRefreshToken(refreshToken)
           dropbox.current = new Dropbox({
               auth:dbx
           })
           console.log(dropbox.current.checkUser)
           dropbox.current.checkUser({
               query:"user"
           }).then((response => {
               if(response.status === 200){
                   setIsLoggedIn(true)
                   setIsLoaded(true)
               }else{
                   removeRefreshToken()
               }
           })).catch(err => {
               console.log("there's been an err",{err})
           })
        }
    },[dbx])

    // Get an authentication url
    const doAuth = () => {
        dbx.getAuthenticationUrl(redirectUrl, undefined, 'code', 'offline', undefined, undefined, true)
        .then(authUrl => {
            setIsLoaded(true)
            window.localStorage.setItem(storageKey,dbx.codeVerifier)
            window.localStorage.setItem(returnHref,authUrl)
            history.push("/dashboard/redirect")
        })
        .catch(err => {
        
        })
    }

    // Call this to get access to the signed in account
    const checkUrl = (argString) => {
        dbx.setCodeVerifier(window.localStorage.getItem(storageKey))
        
        dbx.getAccessTokenFromCode(redirectUrl,argString).then(response => {
            dbx.setAccessToken(response.result.access_token)
            saveRefreshToken(response.result.refresh_token)
            dropbox.current = new Dropbox({
                auth:dbx
            })
            setIsLoggedIn(true)
            setIsLoaded(true)
        }).catch(err => {
            console.log("this is the errr",{err})
        })
    }

    const getFolders = (path) => {
        if(isLoggedIn && dropbox.current){
            return dropbox.current.filesListFolder(path).then(response => {
                return response.result.entries
            }).catch(err => {
                console.log("this is the error",{err})
            })
        }else{
            alert({
                type:"info",
                message:`Request cannot be completed, please try again`,
                title:"Something went wrong"
            })
        }
    }
    const uploadLargeFiles = (files,path) => {
            // This approach is for file with size > 150MB
            // 8MB
            const maxBlob = 8 * 1000 * 1000
            const workItems = [];
            let offset = 0;
            let session_id;
            // Divide the data into workable chunk of max 8MB size
            while(offset < files.size){
                const chunkSize = Math.min(maxBlob,files.size - offset);
                workItems.push(files.slice(offset,offset + chunkSize));
                offset += chunkSize
            }
            console.log({workItems})
            const task = workItems.reduce((acc,blob,idx,items) => {
                console.log({session_id})
                // The session id needs to be stored for subsequent push
                if(idx === 0){
                    return acc.then(() => {
                        return dropbox.current.filesUploadSessionStart({
                            close:false,
                            contents:blob
                        }).then(resp => session_id = resp.result.session_id)
                    })
                }else if(idx < items.length - 1){
                    
                    return acc.then(sessionId => {
                        // Add the session id for subsequent chunk upload
                        const cursor = {
                            session_id,
                            offset:idx * maxBlob
                        }
                        console.log("this is the cursor",{cursor})
                        return dropbox.current.filesUploadSessionAppendV2({
                            cursor,
                            close:false,
                            contents:blob
                        }).then(() => sessionId)
                    })
                } else {
                    // For the last chunk of the data in workItems
                    return acc.then(sessionId => {
                        const cursor = {
                            session_id,
                            offset:files.size - blob.size
                        }
                        const commit = {
                            path,
                            mode:"add",
                            mute:false,
                            autorename:true
                        }
                        return dropbox.current.filesUploadSessionFinish({
                            cursor,
                            commit,
                            contents:blob
                        })
                    })
                }
                // The first argument to be called with
            },Promise.resolve())
            return task
    }
    const uploadFiles = (arg) => {
        return dropbox.current.filesUpload(arg)
    }
    const reAuthenticate = () => {

    }

    return(
        <DropBoxContextProvider
            value={{
                ...dbx,
                doAuth,
                checkUrl,
                isLoaded,
                isLoggedIn,
                getFolders,
                uploadFiles,
                reAuthenticate,
                uploadLargeFiles,
            }}
        >
            {children}
        </DropBoxContextProvider>
    )
  }


  export default useDropBoxService