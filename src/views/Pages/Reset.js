import React from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';
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
const useStyles = makeStyles(styles);

const ResetPage = ({ setUserInfo }) => {
    // register form
    const [formData, setFormData] = React.useState({

        password: '',
        confirmPassword: '',

    });
    const [formDataValidation, setFormDataValidation] = React.useState({
        password: '',
        confirmPassword: '',
    })
    const [notificationMessage, setNotificationMessage] = React.useState('');
    const [notificationType, setNotificationType] = React.useState('');
    const [showNotification, setShowNotification] = React.useState(false);
    const [registering, setRegistering] = React.useState(false);

    const classes = useStyles();

    // function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
            return true;
        }
        return false;
    };


    const register = async () => {
        let invalidForm = false;
        let newValidation = { ...formDataValidation };
        for (const [key, value] of Object.entries(formDataValidation)) {
            if (value !== 'success') {
                newValidation[key] = 'error';
                invalidForm = true;
            }
        }
        setFormDataValidation(newValidation);
        if (invalidForm) return;

        const data = new FormData();
        const params = history.location.search.replace('?', '').split('&');

        if (params.length === 2) {

            const token = params[0].split('=')[1];
            const userId = params[1].split('=')[1];
            data.set('newPassword', formData.password);
            data.set('token', token);
            data.set('user', userId);
            try {
                setRegistering(true);
                const response = await api.resetPassword(data);
                triggerNotification('Password successfully changed!', 'success');
                history.replace('/auth/login-page')
                setRegistering(false);
            } catch (error) {
                setRegistering(false);
                triggerNotification('Something went wrong, please try again', 'error');
            }
        }
        else {
            triggerNotification('Invalid Url', 'error');
            history.push('/auth/login-page');
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
                <GridItem xs={12} sm={12} md={10}>
                    <Card style={{ marginTop: 0 }} className={classes.cardSignup}>
                        <h2 className={classes.cardTitle}>Register</h2>
                        <CardBody>
                            <GridContainer justify='center'>
                                <GridItem xs={12} sm={12} md={12}>
                                    <form className={classes.form}>

                                        <Snackbar
                                            place="tr"
                                            color={notificationType}

                                            message={notificationMessage}
                                            open={showNotification}
                                            closeNotification={() => setShowNotification(false)}
                                            close
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
                                                        setFormDataValidation({ ...formDataValidation, password: "success" });
                                                    } else {
                                                        setFormDataValidation({ ...formDataValidation, password: "error" });
                                                    }
                                                    setFormData({ ...formData, password: event.target.value });
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
                                                        setFormDataValidation({ ...formDataValidation, confirmPassword: "success" });
                                                    } else {
                                                        setFormDataValidation({ ...formDataValidation, confirmPassword: "error" });
                                                    }
                                                    setFormData({ ...formData, confirmPassword: event.target.value });
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

                                <GridItem sm={12} md={12} xs={12}>
                                    <div style={{ textAlign: "center", display: 'block' }}>
                                        <Link
                                            to='/auth/login-page'
                                            style={{ textAlign: "center" }}
                                        >
                                            Already have an account? Login now!
                        </Link>
                                    </div>
                                    <div className={classes.center}>
                                        <Button disabled={registering} onClick={register} round color='primary'>
                                            Reset Password
                      </Button>
                                    </div>
                                </GridItem>
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
export default connect(connectState, connectDispatch)(ResetPage);