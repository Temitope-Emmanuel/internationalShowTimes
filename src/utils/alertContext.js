import React from "react"
import Snackbar from "./alert"
import {createGenericContext} from "."

  
  const [useAlertService,AlertContextProvider] = createGenericContext()


  export const AlertServiceProvider = ({children}) => {
      const [confirmationState,setConfirmationState] = React.useState (null);
      const awaitPromisingRef = React.useRef()

      const openConfirmation = (options) => {
          setConfirmationState(options)
          return Promise.resolve()
      }
      React.useEffect(() => {
          if(confirmationState !== null){
              setTimeout(() => {
                  setConfirmationState(null)
              },confirmationState.duration || 5000)
          }
      },[confirmationState])
      return(
          <>
          <AlertContextProvider
            value={openConfirmation} children={children}
          />
          <Snackbar open={Boolean(confirmationState)} {...confirmationState} />
          </>
      )
  }

  export default useAlertService