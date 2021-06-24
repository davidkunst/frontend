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

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Snackbar } from "@material-ui/core";
import api from "api";
import { connect } from 'react-redux';
import { setUserInfo } from "store/actions/authActions";
import history from "store/router/history";
import styles1 from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
const useStyles = makeStyles(styles);

const ForgotPasswordPage = ({ setUserInfo }) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordValid, setPasswordValid] = React.useState('');
  const [emailValid, setEmailValid] = React.useState('');
  const [loggingIn, setLoggingIn] = React.useState(false);
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
  const classes = useStyles();
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  const login = async () => {
    if (!verifyEmail(email)) {
      setEmailValid('error');
    }
    if(!verifyEmail(email)) return;

    const data = new FormData();
    data.set('email', email);

    try {
      setLoggingIn(true);
      const response = await api.sendResetPassword(data);
      triggerNotification('Successfully sent the reset Email!', 'info');
      
      setLoggingIn(false);
    } catch (error) {
      setLoggingIn(false);
      triggerNotification('Something went wrong, please try again', 'error');
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
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
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
                <h4 className={classes.cardTitle} style={{margin: 'auto', color: 'white', paddingTop: '9px', fontWeight: 'bold'}}>
                    Reset Password
                </h4>
              <CardBody>
                <CustomInput
                  labelText='Email...'
                  id='email'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  success={emailValid === "success"}
                  error={emailValid === "error"}
                  inputProps={{
                    onChange: event => {
                      if (verifyEmail(event.target.value)) {
                        setEmailValid("success");
                      } else {
                        setEmailValid("error");
                      }
                      setEmail(event.target.value);
                    },
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                
              </CardBody>
              <Link to='/auth/login-page' style={{ textAlign: "center", color: 'whitesmoke' }}>
                Have an account? Login here!
              </Link>
              <CardFooter className={classes.justifyContentCenter}>
                <Button onClick={login} disabled={loggingIn} color='indexvent' size='lg' block>
                  Send Reset Email
                </Button>
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

  }
}
const connectDispatch = (dispatch) => {
  return {
    setUserInfo: (user, token) => { dispatch(setUserInfo(user, token)) }
  }
}
export default connect(connectState,connectDispatch)(ForgotPasswordPage);