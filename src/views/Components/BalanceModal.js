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
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const BalanceModal = ({ currency, userId, isOpen, modalHandler, users, storeUsers, submitHandler }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ balance: 0 });

  const modifyBalance = async () => {
    const data = new FormData();
    data.set('id', userId);
    data.set('currency', currency);
    data.set('amount', formData.balance);
    data.set('type', 'deposit');
    const response = await api.editBalance(data);
    const newUser = response.data.user
    if(newUser){
      const newUsers = users.map((user) => {
        return user.id === newUser.id ? {...newUser } : user;
      });
      storeUsers(newUsers);
      if(submitHandler){
        submitHandler(newUser);
      }
    }
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
        style={{backgroundColor: '#1E234C'}}
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
          Change User Balance
        </h4>
      </DialogTitle>
      <DialogContent
      style={{backgroundColor: '#1E234C'}}
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              labelText="Balance"

              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                onChange: event => {
                  setFormData({ ...formData, balance: event.target.value });
                },
                value: formData.balance
              }}
            />
            <p style={{color: 'white'}}>
              Enter negative value to substract from total balance and positive to add more to the existing balance.
            </p>
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions style={{backgroundColor: '#1E234C'}} className={classes.modalFooter}>
        <Button style={{color: 'white'}} onClick={modifyBalance} color="transparent">Save balance</Button>
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
export default connect(connectState, connectDispatch)(BalanceModal);