import React from "react";
import moment from 'moment';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import Datetime from 'react-datetime';
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";
import City from "@material-ui/icons/LocationCity";
import Location from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { FormControl, MenuItem, Select, Snackbar } from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import api from '../../api/index';
import { setUserInfo } from "store/actions/authActions";
import history from "store/router/history";
import { countries } from "helpers/infoHelpers";

import styles1 from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
const useStyles = makeStyles({ ...styles, ...styles1 });

 const RegisterPage = ({ setUserInfo }) => {
  // register form
  const [formData, setFormData] = React.useState({
    email: '',
    city: '',
    country: 'US',
    currency: 'EUR',
    fullName: '',
    zipcode: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    dob: '',
    phone: '',
  });
  const [formDataValidation, setFormDataValidation] = React.useState({
    email: '',
    city: '',
    country: 'success',
    currency: 'success',
    fullName: '',
    zipcode: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'success',
    dob: 'success',
    phone: '',
  })
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [notificationType, setNotificationType] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);
  const [registering, setRegistering] = React.useState(false);
  const datepickerHandler = (date) => {
    setFormData({...formData, dob: date.format('DD.MM.YYYY')})
  }
  const [userRegistered, setUserRegistered] = React.useState(false);
  const classes = useStyles();
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  
  // verifies if value is a valid URL
  const verifyUrl = value => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  const handleSimple = (event) => {
    setFormData({...formData, country: event.target.value})
  }
  const currencyList = ['EUR', 'USD', 'GBP'];
  const genderList = ["male", "female"];
  
  const register = async () => {
    let invalidForm = false;
    let newValidation = {...formDataValidation};
    for(const [key, value] of Object.entries(formDataValidation)){
      if(value !== 'success'){
        newValidation[key] = 'error';
        invalidForm = true;
      }
    } 
    setFormDataValidation(newValidation);
    if (invalidForm) return;

    const data = new FormData();
    data.set('fullName', formData.fullName);
    data.set('email', formData.email);
    data.set('password', formData.password);
    data.set('country', formData.country);
    data.set('city', formData.city);
    data.set('currency', formData.currency);
    data.set('sex', formData.gender);
    data.set('phoneNumber', formData.phone);
    data.set('dateOfBirth', formData.dob);
    data.set('address', formData.address);
    data.set('postalCode', formData.zipcode);

    try {
      setRegistering(true);
      const response = await api.isValidEmail(formData.email);
      if(response.data.isValid){
        const registerResponse = await api.register(data);
        triggerNotification('successfully registered!', 'info');
        setUserInfo(registerResponse.data.user, registerResponse.data.token);
        setUserRegistered(true);
      }
      else {
        triggerNotification('Email is already taken!', 'error');
      }
      setRegistering(false);
    } catch(error) {
      setRegistering(false);
      triggerNotification('Something went wrong, please try again', 'error');
    }
  }
  const triggerNotification = (msg, type) => {
    setNotificationMessage(msg);
    setNotificationType(type)
    setShowNotification(true);
    setTimeout(function() {
      setShowNotification(false);
    }, 6000);
  }
  const gotoDashboard = () => {
    history.replace('/dashboard/stocks');
  }
  return (
    <div className={classes.container}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={10}>
          <Card style={{marginTop: 0}} className={classes.cardSignup}>
            
            <CardBody>
              <GridContainer justify='center'>
              {userRegistered ? <React.Fragment>
                  <GridItem xs={12} sm={12} md={12}>
                    <h1>
                      Registration successful!
                    </h1>
                    <p className={classes.center}>
                      We have sent you a confirmation email to confirm your account. If you wish to proceed to the dashboard click the button below:
                    </p>
                    <div className={classes.center}>
                      <Button onClick={gotoDashboard} round color='primary'>
                        Go to dashboard
                      </Button>
                    </div>
                  </GridItem>
              </React.Fragment> : 
              <React.Fragment>
                <h2 className={classes.cardTitle} style={{color: 'white'}}>Register</h2>
                <GridItem xs={12} sm={12} md={5}>
                <form className={classes.form}>
                    <CustomInput
                      id="fullName"
                      labelText="Full Name*"
                      success={formDataValidation.fullName === "success"}
                      error={formDataValidation.fullName === "error"}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 4)) {
                            setFormDataValidation({...formDataValidation, fullName: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, fullName: "error"});
                          }
                          setFormData({...formData, fullName: event.target.value});
                        },
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Full Name...",
                      }}
                    />

                    <Snackbar
                      place="tr"
                      color={notificationType}
                     
                      message={notificationMessage}
                      open={showNotification}
                      closeNotification={() => setShowNotification(false)}
                      close
                    />
               
                    <CustomInput
                      labelText="Zipcode*"
                      id="registerconfirmpassword"
                      success={formDataValidation.zipcode === "success"}
                      error={formDataValidation.zipcode === "error"}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 2)) {
                            setFormDataValidation({...formDataValidation, zipcode: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, zipcode: "error"});
                          }
                          setFormData({...formData, zipcode: event.target.value});
                        },

                        autoComplete: "off",
                        placeholder: "Zipcode...",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Location className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Address*"
                      id="registerconfirmpassword"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={formDataValidation.address === "success"}
                      error={formDataValidation.address === "error"}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 2)) {
                            setFormDataValidation({...formDataValidation, address: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, address: "error"});
                          }
                          setFormData({...formData, address: event.target.value});
                        },

                        autoComplete: "off",
                        placeholder: "Address...",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Location className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                     
                      labelText="Email Address *"
                      id="registeremail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={formDataValidation.email === "success"}
                      error={formDataValidation.email === "error"}
                      inputProps={{
                        onChange: event => {
                          if (verifyEmail(event.target.value)) {
                            setFormDataValidation({...formDataValidation, email: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, email: "error"});
                          }
                          setFormData({...formData, email: event.target.value});
                        },
                        type: "email",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Email...",
                      }}
                    />
                    <CustomInput
                      labelText="Password *"
                      id="registerpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      success={formDataValidation.password === "success"}
                      error={formDataValidation.password === "error"}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 6)) {
                            setFormDataValidation({...formDataValidation, password: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, password: "error"});
                          }
                          setFormData({...formData, password: event.target.value});
                        },
                        type: "password",
                        autoComplete: "off",
                        placeholder: "Password...",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Confirm Password *"
                      id="registerconfirmpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      success={formDataValidation.confirmPassword === "success"}
                      error={formDataValidation.confirmPassword === "error"}
                      inputProps={{
                        onChange: event => {
                          if (formData.password === event.target.value) {
                            setFormDataValidation({...formDataValidation, confirmPassword: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, confirmPassword: "error"});
                          }
                          setFormData({...formData, confirmPassword: event.target.value});
                        },
                        type: "password",
                        autoComplete: "off",
                        placeholder: "Confirm Password...",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    </form>
                </GridItem>
                <GridItem xs={12} sm={8} md={5}>
                 <form className={classes.form}>
                 <CustomInput
                      
                      labelText="Phone*"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      success={formDataValidation.phone === "success"}
                      error={formDataValidation.phone === "error"}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 6) && verifyNumber(event.target.value)) {
                            setFormDataValidation({...formDataValidation, phone: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, phone: "error"});
                          }
                          setFormData({...formData, phone: event.target.value});
                        },
                  
                        autoComplete: "off",
                        placeholder: "Phone...",
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <Phone className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                         <CustomInput
                      labelText="City*"
                      id="city"
                  
                      formControlProps={{
                        fullWidth: true,
                      }}
                      success={formDataValidation.city === "success"}
                      error={formDataValidation.city === "error"}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 3)) {
                            setFormDataValidation({...formDataValidation, city: "success"});
                          } else {
                            setFormDataValidation({...formDataValidation, city: "error"});
                          }
                          setFormData({...formData, city: event.target.value});
                        },
                  
                        startAdornment: (
                          <InputAdornment
                            position='start'
                            className={classes.inputAdornment}
                          >
                            <City className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "City...",
                      }}
                    />
                    <FormControl style={{ marginBottom: '10px', marginTop: '10px' }} fullWidth className={classes.selectFormControl}>
                      <label style={{
                        top: '10px',
                        color: '#AAAAAA !important',
                        fontSize: '11px',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 400,
                        lineWeight: 1.42857,
                        letterSpacing: 'unset',
                      }}>
                        Date of birth*
                      </label>
                      <Datetime
                        onChange={datepickerHandler}
                        timeFormat={'DD.MM.YYYY'}
                        inputProps={{ placeholder: "Date of birth" }}
                        isValidDate={(current) => { return current.isBefore(new Date()); }}
                        value={formData.dob}
                        defaultValue={formData.dob}
                      />
                    </FormControl>
                    <FormControl fullWidth className={classes.selectFormControl} style={{ marginBottom: '10px' }} >
                      <label style={{
                        top: '10px',
                        color: '#AAAAAA !important',
                        fontSize: '11px',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 400,
                        lineWeight: 1.42857,
                        letterSpacing: 'unset',
                      }}>
                        Gender*
                      </label>
                      <Select
                        style={{ color: 'white', borderBottom: '1px solid darkgray' }}
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={formData.gender}
                        onChange={event => { setFormData({...formData, gender: event.target.value}) }}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          selected
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Select Currency
                      </MenuItem>
                        {genderList.map(gender => {
                          return <MenuItem
                            value={gender}
                            key={gender}
                            classes={{
                              root: classes.selectMenuItem
                            }}>
                            {gender}
                          </MenuItem>
                        })}


                      </Select>
                    </FormControl>
                    <FormControl style={{ marginBottom: '20px' }} fullWidth className={classes.selectFormControl}>
                      <label style={{
                        top: '10px',
                        color: '#AAAAAA !important',
                        fontSize: '11px',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 400,
                        lineWeight: 1.42857,
                        letterSpacing: 'unset',
                      }}>
                        Country*
                      </label>
                      <Select
style={{ color: 'white', borderBottom: '1px solid darkgray' }}
                        placeholder="Country..."

                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={formData.country}
                        onChange={handleSimple}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          selected
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Single Select
                      </MenuItem>
                        {countries.map(country => {
                          return <MenuItem
                            value={country.code}
                            key={country.code}
                            classes={{
                              root: classes.selectMenuItem
                            }}>
                            {country.name}
                          </MenuItem>
                        })}


                      </Select>
                    </FormControl>
                    <FormControl style={{ marginBottom: '20px' }} fullWidth className={classes.selectFormControl}>
                      <label style={{
                        top: '10px',
                        color: '#AAAAAA !important',
                        fontSize: '11px',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 400,
                        lineWeight: 1.42857,
                        letterSpacing: 'unset',
                      }}>
                        Currency*
                      </label>
                      <Select
                      style={{ color: 'white', borderBottom: '1px solid darkgray' }}
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={formData.currency}
                        onChange={event => { setFormData({...formData, currency: event.target.value}) }}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          selected
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Select Currency
                      </MenuItem>
                        {currencyList.map(currency => {
                          return <MenuItem
                            value={currency}
                            key={currency}
                            classes={{
                              root: classes.selectMenuItem
                            }}>
                            {currency}
                          </MenuItem>
                        })}


                      </Select>
                    </FormControl>
                   
                   
                  </form>
                </GridItem>
                <GridItem sm={12} md={12} xs={12}>
                <div style={{ textAlign: "center", display: 'block' }}>
                      <Link
                        to='/auth/login-page'
                        style={{ textAlign: "center", color: 'white' }}
                        >
                        Already have an account? Login now!
                        </Link>
                    </div>
                    <div className={classes.center}>
                      <Button disabled={registering} onClick={register} round color='indexvent'>
                        Get started
                      </Button>
                    </div>
                </GridItem>
              
              </React.Fragment>}  
              </GridContainer>
            </CardBody>
          </Card>
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
export default connect(connectState, connectDispatch)(RegisterPage);