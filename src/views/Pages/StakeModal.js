import React, { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { connect } from 'react-redux';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";
import Datetime from 'react-datetime';
import { FormControl } from "@material-ui/core";
// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Button from "components/CustomButtons/Button.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Instruction from "components/Instruction/Instruction.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import CustomInput from 'components/CustomInput/CustomInput';
import { storeUsers } from 'store/actions/authActions';
import api from 'api';
import moment from 'moment';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StakeModal = ({ currency, userId, isOpen, modalHandler, users, storeUsers, submitHandler, stakeId, investment }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ 
      min: investment.min ? investment.min : 0, 
      max: investment.max ? investment.max : 0, 
      profit: investment.profit ? investment.profit : 0, 
      nextVal: investment.nextVal ? investment.nextVal : 0, 
      date: investment.date ? moment(investment.date).format('DD.MM.yyyy') : new Date(), 
      userId: userId, 
      stakeInfoId: stakeId 
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setFormData({ 
            min: investment.min ? investment.min : 0, 
            max: investment.max ? investment.max : 0, 
            profit: investment.profit ? investment.profit : 0, 
            nextVal: investment.nextVal ? investment.nextVal : 0, 
            date: investment.date ? moment(investment.date).format('DD.MM.yyyy') : new Date(), 
            userId: userId, 
            stakeInfoId: stakeId 
          })
    }, [investment])
  const createInvestment = async () => {
    try {
        setLoading(true);
        const data = new FormData();
        data.set('userId', userId);
        data.set('profit', formData.profit);
        data.set('min', formData.min);
        data.set('max', formData.max);
        data.set('nextVal', formData.nextVal);
        data.set('date', formData.date);
        
        const response = await api.createUserInvestment(data);
        const newStake = response.data.stakeInfo; 
        modalHandler(false);
        setLoading(false);
        submitHandler(newStake);
    }catch(err){
        modalHandler(false);
        setLoading(false);
    }
  }
  const editInvestment = async () => {
    try {
        setLoading(true);
        const data = new FormData();
        data.set('profit', formData.profit);
        data.set('min', formData.min);
        data.set('max', formData.max);
        data.set('stakeInfoId', formData.stakeInfoId)
        const response = await api.editUserInvestment(data);
        const newStake = response.data.stakeInfo;
        modalHandler(false);  
        setLoading(false);
        submitHandler(newStake);
    }catch(err){
        modalHandler(false);
        setLoading(false);
    }
  }
  const datepickerHandler = (date) => {
    setFormData({...formData, date: date})
  }
  return (
    <Dialog
      classes={{
        root: classes.center + " " + classes.modalRoot,
        paper: classes.modal
      }}
      
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => modalHandler(false)}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
        style={{backgroundColor: '#121212'}}
      >
        <Button
          justIcon
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="transparent"
          onClick={() => modalHandler(false)}
        >
          <Close className={classes.modalClose} />
        </Button>
        <h4 style={{color: 'white'}} className={classes.modalTitle}>
          {investment.id ? 'Edit stake Info' : 'Create stake Info'}
        </h4>
      </DialogTitle>
      <DialogContent
      style={{backgroundColor: '#121212'}}
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Min"

              formControlProps={{
                fullWidth: true,
                style: {color: 'white'}
              }}
              inputProps={{
                onChange: event => {
                  setFormData({ ...formData, min: event.target.value });
                },
                value: formData.min,
                className: 'test',
              }}
            />
            <p style={{color: 'white', textAlign: 'left'}}>
              Set the minimum interval value to show on investment
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Max"

              formControlProps={{
                fullWidth: true,
                style: {color: 'white'}
              }}
              inputProps={{
                onChange: event => {
                  setFormData({ ...formData, max: event.target.value });
                },
                value: formData.max,
                className: 'test',
              }}
            />
            <p style={{color: 'white', textAlign: 'left'}}>
              Set the maximum interval value to show on investment
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Profit"

              formControlProps={{
                fullWidth: true,
                style: {color: 'white'}
              }}
              inputProps={{
                onChange: event => {
                  setFormData({ ...formData, profit: event.target.value });
                },
                value: formData.profit,
                className: 'test',
              }}
            />
            <p style={{color: 'white', textAlign: 'left'}}>
              Set the profit value to show on investment
            </p>
          </GridItem>
        <GridItem xs={12} md={12}>
        <FormControl style={{ marginBottom: '10px', marginTop: '10px' }} fullWidth className={classes.selectFormControl}>
            <label style={{
            top: '10px',
            color: '#AAAAAA !important',
            fontSize: '11px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            lineWeight: 1.42857,
            letterSpacing: 'unset',
            textAlign: 'left'
            }}>
            Date*
            </label>
            <Datetime
            onChange={datepickerHandler}
            timeFormat={'DD.MM.YYYY'}
            inputProps={{ placeholder: "Date" }}
            isValidDate={(current) => { return current.isAfter(new Date()); }}
            value={moment(formData.date).format('DD.MM.yyyy')}
            defaultValue={formData.date}
            className="test"
            />
            <p style={{color: 'white', textAlign: 'left'}}>
              Set the date this interval value and profit will apply to
            </p>
        </FormControl>
        </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions style={{backgroundColor: '#121212'}} className={classes.modalFooter}>
        {loading ? <h4 style={{color: 'white'}}>Loading...</h4> : <Button style={{color: 'white'}} onClick={investment.id ? editInvestment : createInvestment} color="transparent">
        {investment.id ? 'Edit Investment' : 'Create Investment'}
        </Button>}
        <Button
          onClick={() => modalHandler(false)}
          color="danger"
          simple
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const connectState = (state) => {
  return {
    users: state.auth.users
  }
}
const connectDispatch = (dispatch) => {
  return {
    storeUsers: (users) => { dispatch(storeUsers(users)) }
  }
}
export default connect(connectState, connectDispatch)(StakeModal);