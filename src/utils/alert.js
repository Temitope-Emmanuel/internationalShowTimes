import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';


function MuiAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}



const SnackbarComponent = ({message = "",title = "",type = "info",duration,open}) => {
 

  const alertMessage = () => {
    switch(type){
      case "error":
        return <MuiAlert severity="error">{message}</MuiAlert>;
      case "warning":
        return <MuiAlert severity="warning">{message}</MuiAlert>;
      case "info":
        return <MuiAlert severity="info">{message}</MuiAlert>;
      case "success":
        return <MuiAlert severity="success">{message}</MuiAlert>;
      default:
        return <MuiAlert severity="info">{message}</MuiAlert> 
    }
  }
  
  return (
      <Snackbar open={open} autoHideDuration={duration || 5000} >
        {
          alertMessage()
        }
      </Snackbar>
  );
}


export default SnackbarComponent