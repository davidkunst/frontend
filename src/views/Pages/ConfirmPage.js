import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Link } from 'react-router-dom';
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import { logout } from "store/actions/authActions";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Snackbar } from "@material-ui/core";
import api from "api";
import { connect } from 'react-redux';
import { setUserInfo } from "store/actions/authActions";
import history from "store/router/history";

const useStyles = makeStyles(styles);

const LoginPage = ({ setUserInfo, isLoggedIn, logout }) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [confirming, setConfirming] = React.useState(true);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [notificationType, setNotificationType] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);
  React.useEffect(() => {
  
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 200);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  React.useEffect(() => {
    confirmEmail()
  }, []);
  const classes = useStyles();
  const confirmEmail = async () => {
    const params = history.location.search.replace('?', '').split('&');
    
  
        try {
            const token = params[0].split('=')[1];
            const userId = params[1].split('=')[1];
            const data = new FormData();
            data.set('userId', userId);
            data.set('token', token);
            const response = await api.confirmEmail(data);
            if(response.data.success === true){
                triggerNotification('Successfully Confirmed Email!')
                logout();
                history.replace('/auth/login-page');
                
            } else {
                triggerNotification(response.data.error ? response.data.error : 'Email wasn\'t successfully confirmed, check if your token expired!');
                setConfirming(false);
            }
        } catch(err) {
            triggerNotification(err.data && err.data.error ? err.data.error : 'Looks like something went wrong! Please contact us!');
            if(err.data && err.data.error && err.data.error === 'Email already confirmed'){
                if(isLoggedIn){
                    history.replace('/dashboard/dashboard');
                } else {
                    history.replace('/auth/login-page');
                }
            }
            setConfirming(false);
        }

    
  }
 
  const triggerNotification = (msg, type) => {
    setNotificationMessage(msg);
    setNotificationType(type)
    setShowNotification(true);
    setTimeout(function () {
      setShowNotification(false);
    }, 6000);
  }
  
  return (
    <div className={classes.container}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Snackbar
              place="tr"
              color={notificationType}

              message={notificationMessage}
              open={showNotification}
              closeNotification={() => setShowNotification(false)}
              close
            />

            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color='rose'
              >
                <h4 className={classes.cardTitle}>
                    Confirming email...
                </h4>
              </CardHeader>
              <CardBody>
                
               <p style={{textAlign: 'center'}}>
                    {
                        confirming ? 
                        'Please wait while we are confirming your email!'  :
                        'Something went wrong, please contact us!'
                    }
               </p>
              </CardBody>
              
              <CardFooter className={classes.justifyContentCenter}>
            
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
const connectState = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}
const connectDispatch = (dispatch) => {
  return {
    setUserInfo: (user, token) => { dispatch(setUserInfo(user, token)) },
    logout: () => { dispatch(logout()) }
  }
}
export default connect(connectState,connectDispatch)(LoginPage);