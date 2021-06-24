import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from 'react-datetime';
import moment from 'moment';
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import api from '../../api';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import history from '../../store/router/history';
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "assets/img/default-avatar.png";
import { useState } from "react";
import { useEffect } from "react";
import { countries, roles } from "helpers/infoHelpers";
import { FormControl, MenuItem, Select, Snackbar } from "@material-ui/core";
import BalanceModal from '../Components/BalanceModal';
import { setUserInfo } from "store/actions/authActions";
import { connect } from 'react-redux';

import ReactTable from "components/ReactTable/ReactTable.js";
import { AccountBalance } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const UserProfile = ({ setUserInfo, user }) => {
  const [balance, setBalance] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [notificationType, setNotificationType] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);
  const [userData, setUserData] = React.useState({
    id: '',
    email: '',
    city: '',
    country: '',
    currency: 'EUR',
    fullName: '',
    zipcode: '',
    address: '',
    password: '',
    gender: 'male',
    dob: '',
    phone: '',
    walletId: '',
    isConfirmed: false,
    role: 'trader'
  });
  const [userDataValidation, setUserDataValidation] = React.useState({
    email: '',
    city: '',
    country: 'success',
    currency: 'success',
    fullName: '',
    zipcode: '',
    address: '',
    password: '',
    gender: 'success',
    dob: 'success',
    phone: '',
  })
  const [transactions, setTransactions] = React.useState(history.location.state && history.location.state.user ? history.location.state.user.transactions.map((transaction, key) => {
    const id = transaction.id;

    return {
      id: id,
      type: transaction.transactionType,
      createdAt: transaction.createdAt ? moment(transaction.createdAt).format('MMMM Do YYYY, h:mm a') : '',
      amount: transaction.amount ? parseFloat(transaction.amount).toFixed(2) : '',
      currency: transaction.currency ? transaction.currency.code : '',

    };
  }) : [])
  useEffect(() => {
    const usernew = history.location.state ? history.location.state.user : null;

    if (usernew) {
      setUserData({
        ...usernew,
        dob: usernew.dateOfBirth ? moment(usernew.dateOfBirth).format('DD.MM.YYYY') : '',
        zipcode: usernew.postalCode,
        country: usernew.country ? usernew.country.code : 'US',
        currency: usernew.currency ? usernew.currency.code : 'EUR',
        phone: usernew.phoneNumber,
        gender: usernew.sex,
        walletId: '',
        role: usernew.role ? usernew.role.name : 'trader'
      });
      setBalance(usernew.balance ? parseFloat(usernew.balance).toFixed(2) : 0)
    }

  }, [])
  const triggerNotification = (msg, type) => {
    setNotificationMessage(msg);
    setNotificationType(type)
    setShowNotification(true);
    setTimeout(function () {
      setShowNotification(false);
    }, 6000);
  }
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
  const datepickerHandler = (date) => {
    setUserData({ ...userData, dob: date.format('DD.MM.YYYY') })
  }
  const classes = useStyles();
  const currencyList = ['EUR', 'USD'];
  const genderList = ["male", "female"];

  const changeUserInfo = (user) => {
    history.replace({ pathname: '/dashboard/user-page', state: user })
  }
  const editUser = async () => {

    const data = new FormData();
    if (userData.fullName)
      data.set('fullName', userData.fullName);
    if (userData.password)
      data.set('password', userData.password);
    if (userData.country)
      data.set('countryCode', userData.country);
    if (userData.city)
      data.set('city', userData.city);
    if (userData.currency)
      data.set('currencyCode', userData.currency);
    if (userData.gender)
      data.set('sex', userData.gender);
    if (userData.phone)
      data.set('phoneNumber', userData.phone);
    if (userData.dob)
      data.set('dateOfBirth', userData.dob);
    if (userData.address)
      data.set('address', userData.address);
    if (userData.zipcode)
      data.set('postalCode', userData.zipcode);
    if (userData.walletId)
      data.set('walletId', userData.walletId);
    if (userData.role)
      data.set('role', userData.role);
    try {
      setUpdating(true);
      const response = await api.editUser(data, userData.id);
      triggerNotification('Successfully edited user!', 'info');
      setUserInfo(response.data.user);
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
      triggerNotification('Something went wrong, please try again', 'error');
    }
  }

  return (
    <div>
      <BalanceModal submitHandler={changeUserInfo} modalHandler={setOpenModal} isOpen={openModal} balance={balance} userId={userData.id} currency={userData.currency} />
      <GridContainer>
        <Snackbar
          place="tr"
          color={notificationType}

          message={notificationMessage}
          open={showNotification}
          closeNotification={() => setShowNotification(false)}
          close
        />
        <GridItem xs={12} sm={12} md={8}>
          <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important" }}>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 style={{ color: 'white' }} className={classes.cardIconTitle}>
                Edit Profile - <small>{userData.fullName}</small>
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Full Name"
                    success={userDataValidation.fullName === "success"}
                    error={userDataValidation.fullName === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 4)) {
                          setUserDataValidation({ ...userDataValidation, fullName: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, fullName: "error" });
                        }
                        setUserData({ ...userData, fullName: event.target.value });
                      },
                      value: userData.fullName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl style={{ marginTop: '10px' }} fullWidth className={classes.selectFormControl}>
                    <label style={{
                      top: '10px',
                      color: '#AAAAAA !important',
                      fontSize: '11px',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineWeight: 1.42857,
                      letterSpacing: 'unset',
                    }}>
                      Date of birth
                      </label>
                    <Datetime
                      onChange={datepickerHandler}
                      timeFormat={'DD.MM.YYYY'}
                      inputProps={{ placeholder: "Date of birth" }}
                      isValidDate={(current) => { return current.isBefore(new Date()); }}
                      value={userData.dob}
                      defaultValue={userData.dob}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: userData.email
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    success={userDataValidation.city === "success"}
                    error={userDataValidation.city === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 4)) {
                          setUserDataValidation({ ...userDataValidation, city: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, city: "error" });
                        }
                        setUserData({ ...userData, city: event.target.value });
                      },
                      value: userData.city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Address"
                    success={userDataValidation.address === "success"}
                    error={userDataValidation.address === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setUserDataValidation({ ...userDataValidation, address: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, address: "error" });
                        }
                        setUserData({ ...userData, address: event.target.value });
                      },
                      value: userData.address
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Postal Code"
                    success={userDataValidation.zipcode === "success"}
                    error={userDataValidation.zipcode === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 4)) {
                          setUserDataValidation({ ...userDataValidation, zipcode: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, zipcode: "error" });
                        }
                        setUserData({ ...userData, zipcode: event.target.value });
                      },
                      value: userData.zipcode
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Phone number"
                    success={userDataValidation.phone === "success"}
                    error={userDataValidation.phone === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 6) && verifyNumber(event.target.value)) {
                          setUserDataValidation({ ...userDataValidation, phone: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, phone: "error" });
                        }
                        setUserData({ ...userData, phone: event.target.value });
                      },
                      value: userData.phone
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ marginTop: '15px' }}>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <label style={{
                      top: '10px',
                      color: '#AAAAAA !important',
                      fontSize: '11px',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineWeight: 1.42857,
                      letterSpacing: 'unset',
                      marginBottom: '-10px'
                    }}>
                      Country
                      </label>
                    <Select
                      style={{ color: 'white', borderBottom: '1px solid white' }}
                      placeholder="Country..."

                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={userData.country}
                      onChange={(event) => { setUserData({ ...userData, country: event.target.value }) }}
                    >
                      <MenuItem
                        selected
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Select Country
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

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <label style={{
                      top: '10px',
                      color: '#AAAAAA !important',
                      fontSize: '11px',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineWeight: 1.42857,
                      letterSpacing: 'unset',
                      marginBottom: '-10px'
                    }}>
                      Currency
                      </label>
                    <Select
                      style={{ color: 'white', borderBottom: '1px solid white' }}
                      placeholder="Currency..."

                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={userData.currency}
                      onChange={(event) => { setUserData({ ...userData, currency: event.target.value }) }}
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
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <label style={{
                      top: '10px',
                      color: '#AAAAAA !important',
                      fontSize: '11px',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineWeight: 1.42857,
                      letterSpacing: 'unset',
                      marginBottom: '-10px'
                    }}>
                      Gender
                      </label>
                    <Select
                      style={{ color: 'white', borderBottom: '1px solid white' }}
                      placeholder="Gender..."

                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={userData.gender}
                      onChange={(event) => { setUserData({ ...userData, gender: event.target.value }) }}
                    >
                      <MenuItem
                        selected
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Select Gender
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
                </GridItem>

              </GridContainer>
              <GridContainer style={{ marginTop: '15px' }}>

                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <label style={{
                      top: '10px',
                      color: '#AAAAAA !important',
                      fontSize: '11px',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineWeight: 1.42857,
                      letterSpacing: 'unset',
                      marginBottom: '-14px',
                      marginTop: '10px'
                    }}>
                      Role
                      </label>
                    <Select
                      style={{ color: 'white', borderBottom: '1px solid white' }}
                      placeholder="Role..."

                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={userData.role}
                      onChange={(event) => { setUserData({ ...userData, role: event.target.value }) }}
                    >
                      <MenuItem
                        selected
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Select Role
                      </MenuItem>
                      {roles.map(role => {
                        return <MenuItem
                          value={role.id}
                          key={role.id}
                          classes={{
                            root: classes.selectMenuItem
                          }}>
                          {role.name}
                        </MenuItem>
                      })}


                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Wallet Id"
                    success={userDataValidation.walletId === "success"}
                    error={userDataValidation.walletId === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 1) && verifyNumber(event.target.value)) {
                          setUserDataValidation({ ...userDataValidation, walletId: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, walletId: "error" });
                        }
                        setUserData({ ...userData, walletId: event.target.value });
                      },
                      value: userData.walletId
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="New password"
                    success={userDataValidation.password === "success"}
                    error={userDataValidation.password === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyLength(event.target.value, 6)) {
                          setUserDataValidation({ ...userDataValidation, password: "success" });
                        } else {
                          setUserDataValidation({ ...userDataValidation, password: "error" });
                        }
                        setUserData({ ...userData, password: event.target.value });
                      },
                      value: userData.password
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button disabled={updating} onClick={editUser} color="rose" className={classes.updateProfileButton}>
                Update Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important" }}>
            <CardAvatar profile>
              <a href="#" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                {userData.isConfirmed ? <span style={{ color: 'green' }}>Confirmed user</span> : <span style={{ color: 'red' }}>Unconfirmed user</span>}
              </h6>
              <h4 style={{ color: 'white' }} className={classes.cardTitle}>{userData.fullName}</h4>
              <h5 className={classes.description}>
                User balance: {balance}
              </h5>
              <Button onClick={e => { setOpenModal(true) }} color="rose" round>
                Edit balance
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important" }}>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <AccountBalance />
              </CardIcon>
              <h4 style={{ color: 'white' }} className={classes.cardIconTitle}>Transactions</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "Creation Date",
                    accessor: "createdAt"
                  },
                  {
                    Header: "Type",
                    accessor: "type"
                  },


                  {
                    Header: "Amount",
                    accessor: "amount"
                  },
                  {
                    Header: "Currency",
                    accessor: "currency",
                    className: 'left',
                    canFilter: true
                  },
                ]}
                data={transactions}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
}
const connectState = (state) => {
  return {
    user: state.auth.user
  }
}
const connectDispatch = (dispatch) => {
  return {
    setUserInfo: (user) => { dispatch(setUserInfo(user)) }
  }
}
export default connect(connectState, connectDispatch)(UserProfile);